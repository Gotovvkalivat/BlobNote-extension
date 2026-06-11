import React from 'react'
import { Button } from '@/components/ui/button'
import { ClipboardList, Database, Eraser, Send } from 'lucide-react'
import type { Template } from '@/types'
import { translate } from '@/lib/i18n'
import {
  getActiveEditableElement,
  insertTextIntoEditable,
  insertTemplate,
  isEditableElement,
  readRuntimeSnapshot,
  setNativeValue,
} from '@/lib/templateRuntime'

type FloatingPanelProps = {
  onOpenBase: () => void
}

export function FloatingPanel({ onOpenBase }: FloatingPanelProps) {
  const [visible, setVisible] = React.useState(false)
  const [favorites, setFavorites] = React.useState<Template[]>([])
  const [clipboardItems, setClipboardItems] = React.useState<string[]>([])
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 300 })
  const [enabled, setEnabled] = React.useState(true)
  const [clipboardEnabled, setClipboardEnabled] = React.useState(false)
  const [language, setLanguage] = React.useState<'ru' | 'en'>('ru')
  const panelRef = React.useRef<HTMLDivElement>(null)
  const t = React.useCallback((key: string) => translate(language, key), [language])

  React.useEffect(() => {
    let mounted = true

    const loadSnapshot = async () => {
      const snapshot = await readRuntimeSnapshot()
      if (!mounted) return
      setFavorites(snapshot.templates.filter((template) => template.favorite))
      setEnabled(snapshot.floatingPanelEnabled)
      setClipboardEnabled(snapshot.clipboardPanelEnabled)
      setLanguage(snapshot.uiLanguage)
      document.documentElement.classList.toggle('dark', snapshot.theme === 'dark')
    }

    void loadSnapshot()

    const handleStorage = (changes: Record<string, chrome.storage.StorageChange>, area: string) => {
      if (
        area === 'sync' &&
        (changes.templates || changes.theme || changes.floatingPanelEnabled || changes.clipboardPanelEnabled || changes.uiLanguage)
      ) {
        void loadSnapshot()
      }
    }

    chrome.storage?.onChanged?.addListener(handleStorage)
    return () => {
      mounted = false
      chrome.storage?.onChanged?.removeListener(handleStorage)
    }
  }, [])

  React.useEffect(() => {
    if (!enabled) {
      setVisible(false)
      return
    }

    const checkFocus = () => {
      const target = getActiveEditableElement()
      if (!target || !document.contains(target)) {
        setVisible(false)
        return
      }

      const panelHovered = Boolean(panelRef.current?.matches(':hover'))
      const editableFocused = isEditableElement(document.activeElement)

      if (editableFocused || panelHovered) {
        const rect = target.getBoundingClientRect()
        const estimatedHeight = panelRef.current?.offsetHeight || (favorites.length > 0 || clipboardItems.length > 0 ? 168 : 78)
        const placeAbove = rect.top > estimatedHeight + 12
        const top = placeAbove
          ? rect.top - estimatedHeight - 8
          : Math.min(window.innerHeight - estimatedHeight - 8, rect.bottom + 8)
        const width = Math.min(Math.max(320, rect.width), window.innerWidth - 16)
        const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8)

        setPosition({
          top: Math.max(8, top),
          left,
          width,
        })
        setVisible(true)
        return
      }

      window.setTimeout(() => {
        if (!panelRef.current?.matches(':hover')) setVisible(false)
      }, 150)
    }

    document.addEventListener('focusin', checkFocus, true)
    document.addEventListener('focusout', checkFocus, true)
    document.addEventListener('input', checkFocus, true)
    const interval = window.setInterval(checkFocus, 700)

    return () => {
      document.removeEventListener('focusin', checkFocus, true)
      document.removeEventListener('focusout', checkFocus, true)
      document.removeEventListener('input', checkFocus, true)
      window.clearInterval(interval)
    }
  }, [enabled, favorites.length, clipboardItems.length])

  React.useEffect(() => {
    if (!enabled || !clipboardEnabled) {
      setClipboardItems([])
      return
    }

    let cancelled = false
    let lastText = ''

    const readClipboard = async () => {
      try {
        const text = (await navigator.clipboard.readText()).trim()
        if (cancelled || !text || text === lastText) return
        lastText = text
        setClipboardItems((items) => [text, ...items.filter((item) => item !== text)].slice(0, 5))
      } catch {
        // Some pages still deny clipboard reads; the panel should remain usable.
      }
    }

    void readClipboard()
    const interval = window.setInterval(readClipboard, 1800)
    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [clipboardEnabled, enabled])

  if (!enabled || !visible) return null

  const target = getActiveEditableElement()

  return (
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        width: position.width,
        maxWidth: 'calc(100vw - 16px)',
        zIndex: 2147483640,
      }}
      className="overflow-hidden rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-2xl"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {t('quickReplies')}
        </span>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 text-xs text-destructive"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              if (target) {
                setNativeValue(target, '')
                target.focus()
              }
            }}
          >
            <Eraser className="mr-1 h-3 w-3" />
            {t('clear')}
          </Button>
          <Button
            size="sm"
            variant="default"
            className="h-6 text-xs"
            onMouseDown={(event) => event.preventDefault()}
            onClick={onOpenBase}
          >
            <Database className="mr-1 h-3 w-3" />
            {t('base')}
          </Button>
        </div>
      </div>

      <div className="flex max-h-[96px] flex-wrap gap-1 overflow-y-auto overflow-x-hidden pr-1">
        {favorites.length === 0 ? (
          <span className="text-[10px] italic text-muted-foreground">{t('noFavorites')}</span>
        ) : (
          favorites.map((template) => (
            <div key={template.id} className="flex gap-1">
              <Button
                size="sm"
                variant="outline"
                className="h-6 min-w-0 max-w-[180px] rounded-md text-[10px]"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => insertTemplate(template)}
                title={template.title}
              >
                <span className="block min-w-0 truncate">{template.title}</span>
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-6 w-6 rounded-md"
                title={t('insertAndSend')}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => insertTemplate(template, { autoSend: true })}
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          ))
        )}
      </div>

      {clipboardEnabled && (
        <div className="mt-2 border-t pt-2">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            <ClipboardList className="h-3 w-3" />
            {t('clipboardHistory')}
          </div>
          <div className="flex max-h-[112px] flex-col gap-1 overflow-y-auto overflow-x-hidden pr-1">
            {clipboardItems.length === 0 ? (
              <span className="text-[10px] italic text-muted-foreground">{t('clipboardEmpty')}</span>
            ) : (
              clipboardItems.slice(0, 5).map((item) => (
                <Button
                  key={item}
                  size="sm"
                  variant="outline"
                  className="h-7 w-full min-w-0 justify-start overflow-hidden rounded-md px-2 py-1 text-left text-[10px] leading-snug"
                  title={item}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    const activeTarget = getActiveEditableElement()
                    if (!activeTarget) return
                    insertTextIntoEditable(activeTarget, item)
                  }}
                >
                  <span className="block min-w-0 truncate">{item}</span>
                </Button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
