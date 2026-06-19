import React from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { AppSettings, Template } from '@/types'
import { insertTemplate, readRuntimeSnapshot } from '@/lib/templateRuntime'
import { cn } from '@/lib/utils'
import { translate } from '@/lib/i18n'
import { tagColorStyle } from '@/lib/tagColors'
import { uiScaleFactor } from '@/lib/uiScale'

type SmartSearchProps = {
  uiScale: AppSettings['uiScale']
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SmartSearch({ uiScale, open, onOpenChange }: SmartSearchProps) {
  const [templates, setTemplates] = React.useState<Template[]>([])
  const [language, setLanguage] = React.useState<'ru' | 'en'>('ru')
  const [query, setQuery] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (!open) return

    let mounted = true
    readRuntimeSnapshot().then((snapshot) => {
      if (!mounted) return
      setTemplates(snapshot.templates)
      setLanguage(snapshot.uiLanguage)
      setSelectedIndex(0)
      window.setTimeout(() => inputRef.current?.focus(), 0)
    })

    return () => {
      mounted = false
    }
  }, [open])

  const filtered = React.useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim()
    return templates.filter((template) => {
      if (!normalizedQuery) return true
      return (
        template.title.toLowerCase().includes(normalizedQuery) ||
        template.text.toLowerCase().includes(normalizedQuery) ||
        Boolean(template.tag?.toLowerCase().includes(normalizedQuery))
      )
    })
  }, [query, templates])

  React.useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  if (!open) return null
  const t = (key: string) => translate(language, key)
  const scale = uiScaleFactor(uiScale)
  const width = Math.min(720, window.innerWidth - 32) / scale

  const chooseTemplate = async (template: Template, autoSend = false) => {
    insertTemplate(template, { autoSend })
    onOpenChange(false)
  }

  return (
    <div className="fixed inset-0 z-[2147483646] flex items-start justify-center bg-slate-950/35 pt-[12vh] text-foreground backdrop-blur-sm">
      <div
        className="overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-2xl"
        style={{ width, transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <div className="font-semibold text-sm flex-1">{t('smartSearchTitle')}</div>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          <Input
            ref={inputRef}
            value={query}
            placeholder={t('smartSearchPlaceholder')}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                event.stopPropagation()
                setSelectedIndex((index) => (index + 1) % Math.max(filtered.length, 1))
              } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                event.stopPropagation()
                setSelectedIndex((index) => (index - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1))
              } else if (event.key === 'Enter') {
                event.preventDefault()
                event.stopPropagation()
                const template = filtered[selectedIndex]
                if (template) void chooseTemplate(template, event.ctrlKey)
              } else if (event.key === 'Escape') {
                event.preventDefault()
                event.stopPropagation()
                onOpenChange(false)
              }
            }}
          />

          <div className="mt-3 max-h-[380px] overflow-y-auto rounded-lg border">
            {filtered.length === 0 ? (
              <div className="py-10 text-center text-sm text-muted-foreground">{t('nothingFound')}</div>
            ) : (
              filtered.map((template, index) => (
                <button
                  key={template.id}
                  type="button"
                  className={cn(
                    'w-full text-left px-3 py-2 border-b last:border-b-0 hover:bg-muted transition-colors',
                    index === selectedIndex && 'bg-muted'
                  )}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => void chooseTemplate(template)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium truncate">{template.title}</span>
                    {template.tag && (
                      <Badge variant="secondary" className="shrink-0 border text-[10px]" style={tagColorStyle(template.tagColor)}>
                        {template.tag}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground line-clamp-2 whitespace-pre-wrap">
                    {template.text}
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-muted">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-muted">↓</kbd>
            <span>{t('navigation')}</span>
            <kbd className="px-1.5 py-0.5 rounded bg-muted">Enter</kbd>
            <span>{t('insertVerb')}</span>
            <kbd className="px-1.5 py-0.5 rounded bg-muted">Ctrl+Enter</kbd>
            <span>{t('insertAndSendVerb')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
