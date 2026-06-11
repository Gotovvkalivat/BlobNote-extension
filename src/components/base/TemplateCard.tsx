import React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, FileText, Pencil, Star, Trash2 } from 'lucide-react'
import type { Template } from '@/types'

interface TemplateCardProps {
  template: Template
  onEdit: () => void
  onDelete: () => void
  onToggleFavorite: () => void
  onCopy: () => void
  onOpen: () => void
  showFullText?: boolean
  className?: string
  color?: string
  textColor?: string
  fontFamily?: string
  cardStyle?: React.CSSProperties
  draggable?: boolean
  onDragStart?: (event: React.DragEvent<HTMLDivElement>) => void
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void
}

export function TemplateCard({
  template,
  onEdit,
  onDelete,
  onToggleFavorite,
  onCopy,
  onOpen,
  showFullText = false,
  className,
  color,
  textColor,
  fontFamily,
  cardStyle,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
}: TemplateCardProps) {
  const paletteColor = {
    amber: '#fffbeb',
    green: '#ecfdf5',
    blue: '#eff6ff',
    rose: '#fff1f2',
    slate: '#f8fafc',
  }[template.color || '']
  const resolvedColor = color || paletteColor
  const accentColor = deriveCardAccent(resolvedColor)

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      style={{
        ...cardStyle,
        backgroundColor: resolvedColor,
        color: textColor || undefined,
        fontFamily: fontFamily === 'inherit' ? undefined : fontFamily,
        borderColor: accentColor || undefined,
      }}
      className={cn(
        'relative flex flex-col overflow-hidden rounded-lg border p-3 text-slate-900 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer',
        draggable && 'active:cursor-grabbing',
        className,
        !resolvedColor && template.favorite
          ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
          : !resolvedColor && 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
      )}
    >
      <div className="absolute inset-y-0 left-0 w-1.5 bg-primary/70" style={{ backgroundColor: accentColor || undefined }} />
      <div className="flex justify-between gap-2 mb-2 shrink-0 pl-1.5">
        <div className="flex items-center gap-1.5 min-w-0 opacity-80">
          <FileText className="h-3.5 w-3.5 shrink-0" />
          <span className="text-[10px] uppercase tracking-wide truncate">{template.tag || 'Заметка'}</span>
        </div>
        <div className="flex gap-1">
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={(event) => { event.stopPropagation(); onCopy() }}>
          <Copy className="h-3 w-3" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className={cn('h-6 w-6', template.favorite && 'text-amber-500')}
          onClick={(event) => { event.stopPropagation(); onToggleFavorite() }}
        >
          <Star className={cn('h-3 w-3', template.favorite && 'fill-current')} />
        </Button>
        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={(event) => { event.stopPropagation(); onEdit() }}>
          <Pencil className="h-3 w-3" />
        </Button>
        <Button size="icon" variant="ghost" className="h-6 w-6 hover:text-destructive" onClick={(event) => { event.stopPropagation(); onDelete() }}>
          <Trash2 className="h-3 w-3" />
        </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden pl-1.5" onClick={onOpen}>
        <div className="font-semibold text-sm mb-1 truncate">{template.title}</div>
        {template.tag && <Badge variant="secondary" className="text-[10px] py-0 mb-2">{template.tag}</Badge>}
        <div
          className={cn(
            'text-xs whitespace-pre-wrap leading-relaxed opacity-90',
            showFullText ? '' : 'line-clamp-4'
          )}
        >
          {template.text}
        </div>
      </div>
    </div>
  )
}

function deriveCardAccent(color?: string) {
  if (!color || !color.startsWith('#')) return undefined
  const hex = color.replace('#', '')
  const normalized = hex.length === 3 ? hex.split('').map((char) => char + char).join('') : hex
  if (normalized.length !== 6) return undefined

  const red = parseInt(normalized.slice(0, 2), 16)
  const green = parseInt(normalized.slice(2, 4), 16)
  const blue = parseInt(normalized.slice(4, 6), 16)
  if ([red, green, blue].some((value) => Number.isNaN(value))) return undefined

  const luminance = red * 0.299 + green * 0.587 + blue * 0.114
  const mix = luminance < 96
    ? (value: number) => Math.min(255, Math.round(value * 0.62 + 255 * 0.22))
    : (value: number) => Math.max(0, Math.round(value * 0.58))
  return `rgb(${mix(red)}, ${mix(green)}, ${mix(blue)})`
}
