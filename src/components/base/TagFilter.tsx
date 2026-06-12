import React from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { translate } from '@/lib/i18n'
import type { AppSettings } from '@/types'
import { tagColorStyle } from '@/lib/tagColors'

interface TagFilterProps {
  tags: string[]
  selected: string[]
  tagColors?: Record<string, string>
  language: AppSettings['uiLanguage']
  onChange: (tags: string[]) => void
}

export function TagFilter({ tags, selected, tagColors = {}, language, onChange }: TagFilterProps) {
  const [open, setOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const t = React.useCallback((key: string) => translate(language, key), [language])

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const path = event.composedPath()
      if (dropdownRef.current && !path.includes(dropdownRef.current)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  if (tags.length === 0) return null

  return (
    <div ref={dropdownRef} className="relative">
      <Button size="sm" variant="outline" onClick={() => setOpen((value) => !value)}>
        {t('tags')}
        {selected.length > 0 && (
          <span className="ml-1.5 rounded bg-primary px-1.5 py-0.5 text-[10px] text-primary-foreground">
            {selected.length}
          </span>
        )}
        <ChevronDown className="ml-1 h-3 w-3" />
      </Button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-[220px] min-w-[200px] overflow-y-auto rounded-lg border bg-popover text-popover-foreground shadow-xl">
          {selected.length > 0 && (
            <button
              type="button"
              className="w-full border-b px-3 py-2 text-left text-xs font-medium text-destructive hover:bg-muted"
              onClick={() => onChange([])}
            >
              {t('clearTagFilter')}
            </button>
          )}

          {tags.map((tag) => {
            const active = selected.includes(tag)

            return (
              <button
                key={tag}
                type="button"
                className={cn(
                  'flex w-full items-center gap-2 px-3 py-2 text-left text-xs hover:bg-muted',
                  active && 'bg-muted'
                )}
                onClick={() => {
                  onChange(active ? selected.filter((item) => item !== tag) : [...selected, tag])
                }}
              >
                <span
                  className={cn(
                    'flex h-3.5 w-3.5 items-center justify-center rounded border',
                    active && 'ring-1 ring-primary'
                  )}
                  style={tagColorStyle(tagColors[tag])}
                >
                  {active && <Check className="h-2.5 w-2.5" />}
                </span>
                <span className="min-w-0 truncate">{tag}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
