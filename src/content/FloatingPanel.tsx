import React from 'react'
import { Button } from '@/components/ui/button'
import { ClipboardList, Clock3, Database, Eraser, Maximize2, Minimize2, Pencil, Save, Send, Settings2, Trash2, X } from 'lucide-react'
import type { AppSettings, RecentInsertion, SendMethod, SiteSettings, Template } from '@/types'
import { translate } from '@/lib/i18n'
import { showToast } from '@/components/ui/toast'
import { UI_SCALE_OPTIONS, uiScaleFactor } from '@/lib/uiScale'
import {
  getActiveEditableElement,
  insertTextIntoEditable,
  insertTextToActiveField,
  insertTemplate,
  isEditableElement,
  readRuntimeSnapshot,
  setNativeValue,
} from '@/lib/templateRuntime'

type FloatingPanelProps = {
  uiScale: AppSettings['uiScale']
  onOpenBase: () => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max))
}

export function FloatingPanel({ uiScale, onOpenBase }: FloatingPanelProps) {
  const [visible, setVisible] = React.useState(false)
  const [templates, setTemplates] = React.useState<Template[]>([])
  const [favorites, setFavorites] = React.useState<Template[]>([])
  const [recentInsertions, setRecentInsertions] = React.useState<RecentInsertion[]>([])
  const [clipboardItems, setClipboardItems] = React.useState<string[]>([])
  const [position, setPosition] = React.useState({ top: 0, left: 0, width: 300 })
  const [enabled, setEnabled] = React.useState(true)
  const [clipboardEnabled, setClipboardEnabled] = React.useState(false)
  const [language, setLanguage] = React.useState<'ru' | 'en'>('ru')
  const [collapsed, setCollapsed] = React.useState(false)
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [placement, setPlacement] = React.useState<AppSettings['panelPlacement']>('auto')
  const [compactMode, setCompactMode] = React.useState(false)
  const [safeSendEnabled, setSafeSendEnabled] = React.useState(false)
  const [safeSendDelay, setSafeSendDelay] = React.useState(5)
  const [sendMethod, setSendMethod] = React.useState<SendMethod>('auto')
  const [sendButtonSelector, setSendButtonSelector] = React.useState('')
  const [editingTemplate, setEditingTemplate] = React.useState<Template | null>(null)
  const [draftTitle, setDraftTitle] = React.useState('')
  const [draftText, setDraftText] = React.useState('')
  const panelRef = React.useRef<HTMLDivElement>(null)
  const targetRef = React.useRef<Element | null>(null)
  const t = React.useCallback((key: string) => translate(language, key), [language])
  const scale = uiScaleFactor(uiScale)

  React.useEffect(() => {
    let mounted = true

    const loadSnapshot = async () => {
      const snapshot = await readRuntimeSnapshot()
      if (!mounted) return
      setTemplates(snapshot.templates)
      setFavorites(snapshot.templates.filter((template) => template.favorite))
      setRecentInsertions(snapshot.recentInsertions)
      setEnabled(snapshot.floatingPanelEnabled)
      setClipboardEnabled(snapshot.clipboardPanelEnabled)
      setLanguage(snapshot.uiLanguage)
      setPlacement(snapshot.panelPlacement)
      setCompactMode(snapshot.panelCompactMode)
      setSafeSendEnabled(snapshot.safeSendEnabled)
      setSafeSendDelay(snapshot.safeSendDelay)
      setSendMethod(snapshot.sendMethod)
      setSendButtonSelector(snapshot.sendButtonSelector || '')
    }

    void loadSnapshot()

    const handleStorage = (changes: Record<string, chrome.storage.StorageChange>, area: string) => {
      if (
        area === 'sync' &&
        (
          changes.templates ||
          changes.recentInsertions ||
          changes.floatingPanelEnabled ||
          changes.clipboardPanelEnabled ||
          changes.uiLanguage ||
          changes.panelPlacement ||
          changes.panelCompactMode ||
          changes.safeSendEnabled ||
          changes.safeSendDelay ||
          changes.sendMethod ||
          changes.sendButtonSelector ||
          changes.siteSettings
        )
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
        setCollapsed(false)
        return
      }

      if (targetRef.current !== target) {
        targetRef.current = target
        setCollapsed(false)
      }

      const panelHovered = Boolean(panelRef.current?.matches(':hover'))
      const editableFocused = isEditableElement(document.activeElement)

      if (editableFocused || panelHovered) {
        const rect = target.getBoundingClientRect()
        const layoutHeight = panelRef.current?.offsetHeight || (favorites.length > 0 || clipboardItems.length > 0 ? 168 : 78)
        const visualHeight = layoutHeight * scale
        const visualWidth = compactMode ? Math.min(Math.max(260, rect.width), window.innerWidth - 16) : Math.min(Math.max(320, rect.width), window.innerWidth - 16)
        const layoutWidth = visualWidth / scale
        const availableAbove = rect.top - 8
        const availableBelow = window.innerHeight - rect.bottom - 8
        const placeAbove = placement === 'above' || (placement === 'auto' && availableAbove >= visualHeight + 8 && availableAbove > availableBelow)
        const top = placement === 'top-right'
          ? 16
          : placement === 'bottom-right'
            ? window.innerHeight - visualHeight - 16
            : placeAbove
              ? rect.top - visualHeight - 8
              : rect.bottom + 8
        const left = placement === 'top-right' || placement === 'bottom-right'
          ? window.innerWidth - visualWidth - 16
          : clamp(rect.left, 8, window.innerWidth - visualWidth - 8)

        setPosition({
          top: clamp(top, 8, window.innerHeight - visualHeight - 8),
          left,
          width: layoutWidth,
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
  }, [clipboardItems.length, compactMode, enabled, favorites.length, placement, scale])

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
  const updateSiteSettings = (patch: SiteSettings) => {
    const host = window.location.hostname
    if (!host || typeof chrome === 'undefined' || !chrome.storage?.sync) return

    chrome.storage.sync.get({ siteSettings: {} }, (items) => {
      const siteSettings = items.siteSettings || {}
      chrome.storage.sync.set({
        siteSettings: {
          ...siteSettings,
          [host]: {
            ...(siteSettings[host] || {}),
            ...patch,
          },
        },
      })
    })
  }

  const startEditing = (template: Template) => {
    setEditingTemplate(template)
    setDraftTitle(template.title)
    setDraftText(template.text)
    setSettingsOpen(false)
  }

  const saveEditing = () => {
    if (!editingTemplate || !draftTitle.trim() || !draftText.trim() || typeof chrome === 'undefined' || !chrome.storage?.sync) return
    chrome.storage.sync.get({ templates: [] }, (items) => {
      const updated = (items.templates || []).map((template: Template) =>
        template.id === editingTemplate.id
          ? { ...template, title: draftTitle.trim(), text: draftText.trim(), updatedAt: new Date().toISOString() }
          : template
      )
      chrome.storage.sync.set({ templates: updated }, () => {
        setEditingTemplate(null)
        showToast(t('noteUpdated'), 'success')
      })
    })
  }

  const insertRecent = (item: RecentInsertion, autoSend = false) => {
    const template = item.templateId ? templates.find((candidate) => candidate.id === item.templateId) : null
    if (template) {
      insertTemplate(template, { autoSend })
      return
    }

    insertTextToActiveField(item.text, autoSend)
  }

  if (collapsed) {
    return (
      <button
        type="button"
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          zIndex: 2147483640,
        }}
        className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-popover px-2 text-[10px] font-semibold text-popover-foreground shadow-2xl transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
        title={t('showPanel')}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setCollapsed(false)}
      >
        <Maximize2 className="h-3 w-3" />
        BlobNote
      </button>
    )
  }

  return (
    <div
      ref={panelRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        width: position.width,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        zIndex: 2147483640,
      }}
      className="animate-in fade-in overflow-hidden rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-2xl duration-150"
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
          {t('quickReplies')}
        </span>
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            title={t('panelSettings')}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setSettingsOpen((value) => !value)}
          >
            <Settings2 className="h-3 w-3" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6"
            title={t('hidePanel')}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setCollapsed(true)}
          >
            <Minimize2 className="h-3 w-3" />
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

      {settingsOpen && (
        <div className="mb-2 grid gap-2 rounded-md border bg-muted/30 p-2 text-[10px]">
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center justify-between gap-2">
              <span>{t('panelScale')}</span>
              <select
                className="h-6 rounded border bg-background px-1"
                value={uiScale}
                onChange={(event) => updateSiteSettings({ panelScale: event.target.value as AppSettings['panelScale'] })}
              >
                {UI_SCALE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </label>
            <label className="flex items-center justify-between gap-2">
              <span>{t('panelPosition')}</span>
              <select
                className="h-6 rounded border bg-background px-1"
                value={placement}
                onChange={(event) => updateSiteSettings({ panelPlacement: event.target.value as AppSettings['panelPlacement'] })}
              >
                <option value="auto">{t('auto')}</option>
                <option value="above">{t('aboveField')}</option>
                <option value="below">{t('belowField')}</option>
                <option value="top-right">{t('topRight')}</option>
                <option value="bottom-right">{t('bottomRight')}</option>
              </select>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-1.5">
              <input type="checkbox" checked={compactMode} onChange={(event) => updateSiteSettings({ panelCompactMode: event.target.checked })} />
              <span>{t('compactPanel')}</span>
            </label>
            <label className="flex items-center gap-1.5">
              <input
                type="checkbox"
                checked={safeSendEnabled}
                onChange={(event) => chrome.storage?.sync?.set({ safeSendEnabled: event.target.checked })}
              />
              <span>{t('safeSend')}</span>
            </label>
          </div>
          <label className="flex items-center justify-between gap-2">
            <span>{t('safeSendDelay')}</span>
            <select
              className="h-6 rounded border bg-background px-1"
              value={safeSendDelay}
              onChange={(event) => chrome.storage?.sync?.set({ safeSendDelay: parseInt(event.target.value, 10) })}
            >
              {Array.from({ length: 13 }, (_, index) => index + 3).map((value) => <option key={value} value={value}>{value} c</option>)}
            </select>
          </label>
          <label className="flex items-center justify-between gap-2">
            <span>{t('sendMethod')}</span>
            <select
              className="h-6 rounded border bg-background px-1"
              value={sendMethod}
              onChange={(event) => {
                const value = event.target.value as SendMethod
                setSendMethod(value)
                updateSiteSettings({ sendMethod: value })
              }}
            >
              <option value="auto">{t('sendAuto')}</option>
              <option value="button">{t('sendButton')}</option>
              <option value="enter">{t('sendEnter')}</option>
              <option value="ctrl-enter">{t('sendCtrlEnter')}</option>
              <option value="shift-enter">{t('sendShiftEnter')}</option>
              <option value="alt-enter">{t('sendAltEnter')}</option>
            </select>
          </label>
          {sendMethod === 'button' && (
            <label className="grid gap-1">
              <span>{t('sendButtonSelector')}</span>
              <input
                className="h-7 min-w-0 rounded border bg-background px-2 text-[10px]"
                value={sendButtonSelector}
                onChange={(event) => {
                  setSendButtonSelector(event.target.value)
                  updateSiteSettings({ sendButtonSelector: event.target.value.trim() || null })
                }}
                placeholder="button[type='submit']"
              />
            </label>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="h-6 justify-start text-[10px] text-destructive"
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
        </div>
      )}

      {editingTemplate && (
        <div className="mb-2 rounded-md border bg-muted/30 p-2">
          <input
            className="mb-1 h-7 w-full rounded border bg-background px-2 text-xs"
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
          />
          <textarea
            className="max-h-32 min-h-20 w-full resize-y rounded border bg-background px-2 py-1 text-xs"
            value={draftText}
            onChange={(event) => setDraftText(event.target.value)}
          />
          <div className="mt-1 flex gap-1">
            <Button size="sm" className="h-6 flex-1 text-[10px]" onClick={saveEditing}>
              <Save className="mr-1 h-3 w-3" />
              {t('save')}
            </Button>
            <Button size="sm" variant="outline" className="h-6 flex-1 text-[10px]" onClick={() => setEditingTemplate(null)}>
              <X className="mr-1 h-3 w-3" />
              {t('cancel')}
            </Button>
          </div>
        </div>
      )}

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
              {!compactMode && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 rounded-md"
                  title={t('editNote')}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => startEditing(template)}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              )}
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

      {recentInsertions.length > 0 && !compactMode && (
        <div className="mt-2 border-t pt-2">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            <Clock3 className="h-3 w-3" />
            <span className="min-w-0 flex-1 truncate">{t('recentInsertions')}</span>
          </div>
          <div className="flex max-h-[84px] flex-col gap-1 overflow-y-auto overflow-x-hidden pr-1">
            {recentInsertions.slice(0, 5).map((item) => (
              <div key={item.id} className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 min-w-0 flex-1 justify-start rounded-md px-2 text-left text-[10px]"
                  title={item.title}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => insertRecent(item)}
                >
                  <span className="block min-w-0 truncate">{item.title}</span>
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-7 w-7 rounded-md"
                  title={t('insertAndSend')}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => insertRecent(item, true)}
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {clipboardEnabled && (
        <div className="mt-2 border-t pt-2">
          <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            <ClipboardList className="h-3 w-3" />
            <span className="min-w-0 flex-1 truncate">{t('clipboardHistory')}</span>
            {clipboardItems.length > 0 && (
              <Button
                size="icon"
                variant="ghost"
                className="h-5 w-5 text-muted-foreground hover:text-destructive"
                title={t('clearClipboardHistory')}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setClipboardItems([])
                  showToast(t('clipboardCleared'), 'success')
                }}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
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
