import React from 'react'
import { Button } from '@/components/ui/button'
import { ClipboardList, Clock3, Database, Eraser, Minimize2, Pin, PinOff, Save, Send, Settings2, Trash2, X } from 'lucide-react'
import type { AppSettings, RecentInsertion, SendMethod, SiteSettings, Template } from '@/types'
import { translate } from '@/lib/i18n'
import { showToast } from '@/components/ui/toast'
import { uiScaleFactor } from '@/lib/uiScale'
import {
  getActiveEditableElement,
  insertTextIntoEditable,
  insertTextToActiveField,
  insertTemplate,
  isEditableElement,
  readRuntimeSnapshot,
  setNativeValue,
} from '@/lib/templateRuntime'
import type { EditableElement } from '@/lib/templateRuntime'

type FloatingPanelProps = {
  uiScale: AppSettings['uiScale']
  onOpenBase: () => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), Math.max(min, max))
}

function BlobNoteMark({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blobnote-panel-mark" x1="10" y1="8" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#09B8F5" />
          <stop offset="0.55" stopColor="#2C6DF6" />
          <stop offset="1" stopColor="#7037F4" />
        </linearGradient>
        <linearGradient id="blobnote-panel-lines" x1="22" y1="28" x2="43" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16B7F3" />
          <stop offset="1" stopColor="#6E3DF4" />
        </linearGradient>
      </defs>
      <path d="M12.5 38.5C7.8 28.7 12.7 15.3 23.4 10.2C32 6.1 42.7 8.3 48.9 15.7C54.8 22.8 56.2 34.8 50.8 43.6C44.7 53.5 30.9 57.8 20.9 52.4C14.9 49.2 10.8 43.6 12.5 38.5Z" fill="url(#blobnote-panel-mark)" />
      <circle cx="51.5" cy="14.5" r="4.5" fill="#2D74F7" />
      <path d="M21 19.5C21 16.5 23.5 14 26.5 14H38.5L48 23.5V41.5C48 45.1 45.1 48 41.5 48H26.5C23.5 48 21 45.5 21 42.5V19.5Z" fill="white" />
      <path d="M38.5 14V21.5C38.5 22.6 39.4 23.5 40.5 23.5H48" fill="#C9F3FF" stroke="#18AEEB" strokeWidth="2" strokeLinejoin="round" />
      <path d="M27 29.5H38.5" stroke="url(#blobnote-panel-lines)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M27 36H42" stroke="url(#blobnote-panel-lines)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M27 42.5H37" stroke="url(#blobnote-panel-lines)" strokeWidth="3.2" strokeLinecap="round" />
    </svg>
  )
}

const PANEL_SCALE_VALUES: AppSettings['panelScale'][] = ['70', '80', '90', '100', '110', '120', '130']

function stepPanelScale(value: AppSettings['panelScale'], direction: -1 | 1): AppSettings['panelScale'] {
  const index = Math.max(0, PANEL_SCALE_VALUES.indexOf(value))
  return PANEL_SCALE_VALUES[clamp(index + direction, 0, PANEL_SCALE_VALUES.length - 1)]
}

function stepDelay(value: number, direction: -1 | 1) {
  if (direction > 0) return value <= 0 ? 3 : Math.min(15, value + 1)
  return value <= 3 ? 0 : Math.max(0, value - 1)
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
  const [panelScale, setPanelScale] = React.useState<AppSettings['panelScale']>(uiScale)
  const [placement, setPlacement] = React.useState<AppSettings['panelPlacement']>('auto')
  const [showRecentInsertions, setShowRecentInsertions] = React.useState(false)
  const [pinnedInputSelector, setPinnedInputSelector] = React.useState('')
  const [safeSendDelay, setSafeSendDelay] = React.useState(0)
  const [sendMethod, setSendMethod] = React.useState<SendMethod>('auto')
  const [sendButtonSelector, setSendButtonSelector] = React.useState('')
  const [editingTemplate, setEditingTemplate] = React.useState<Template | null>(null)
  const [draftTitle, setDraftTitle] = React.useState('')
  const [draftText, setDraftText] = React.useState('')
  const panelRef = React.useRef<HTMLDivElement>(null)
  const targetRef = React.useRef<EditableElement | null>(null)
  const t = React.useCallback((key: string) => translate(language, key), [language])
  const text = React.useCallback((ru: string, en: string) => (language === 'en' ? en : ru), [language])
  const scale = uiScaleFactor(panelScale)

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
      setPanelScale(snapshot.panelScale)
      setPlacement(snapshot.panelPlacement)
      setShowRecentInsertions(snapshot.panelCompactMode)
      setSafeSendDelay(snapshot.safeSendDelay)
      setSendMethod(snapshot.sendMethod)
      setSendButtonSelector(snapshot.sendButtonSelector || '')
      setPinnedInputSelector(snapshot.siteSettings[window.location.hostname]?.pinnedInputSelector || '')
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
          changes.panelScale ||
          changes.panelPlacement ||
          changes.panelCompactMode ||
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

      if (pinnedInputSelector && !matchesPinnedInput(target, pinnedInputSelector)) {
        setVisible(false)
        return
      }

      const panelHovered = Boolean(panelRef.current?.matches(':hover'))
      const panelRoot = panelRef.current?.getRootNode()
      const panelFocused = Boolean(
        panelRef.current &&
        panelRoot instanceof ShadowRoot &&
        panelRoot.activeElement instanceof Element &&
        panelRef.current.contains(panelRoot.activeElement)
      )
      const panelActive = panelHovered || panelFocused || settingsOpen
      const editableFocused = isEditableElement(document.activeElement)

      if (editableFocused || panelActive) {
        const rect = target.getBoundingClientRect()
        if (collapsed) {
          const visualSize = 40 * scale
          setPosition({
            top: clamp(rect.bottom - visualSize - 4, 8, window.innerHeight - visualSize - 8),
            left: clamp(rect.right - visualSize - 4, 8, window.innerWidth - visualSize - 8),
            width: 40,
          })
          setVisible(true)
          return
        }

        const layoutHeight = panelRef.current?.offsetHeight || (favorites.length > 0 || clipboardItems.length > 0 ? 168 : 78)
        const visualHeight = layoutHeight * scale
        const visualWidth = Math.min(Math.max(320, rect.width), window.innerWidth - 16)
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
        const root = panelRef.current?.getRootNode()
        const focused = Boolean(
          panelRef.current &&
          root instanceof ShadowRoot &&
          root.activeElement instanceof Element &&
          panelRef.current.contains(root.activeElement)
        )
        if (!panelRef.current?.matches(':hover') && !focused && !settingsOpen) setVisible(false)
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
  }, [clipboardItems.length, collapsed, enabled, favorites.length, pinnedInputSelector, placement, scale, settingsOpen])

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

  const activeTarget = getActiveEditableElement()
  if (activeTarget) targetRef.current = activeTarget
  const target = activeTarget || targetRef.current
  const updateSiteSettings = (patch: SiteSettings) => {
    const host = window.location.hostname
    if (typeof chrome === 'undefined' || !chrome.storage?.sync) return

    const globalPatch: Partial<AppSettings> = {}
    if (patch.panelScale) globalPatch.panelScale = patch.panelScale
    if (patch.panelPlacement) globalPatch.panelPlacement = patch.panelPlacement
    if (typeof patch.panelCompactMode === 'boolean') globalPatch.panelCompactMode = patch.panelCompactMode
    if (patch.sendMethod) globalPatch.sendMethod = patch.sendMethod
    if ('sendButtonSelector' in patch) globalPatch.sendButtonSelector = patch.sendButtonSelector ?? null
    if (!host) {
      chrome.storage.sync.set(globalPatch)
      return
    }

    chrome.storage.sync.get({ siteSettings: {} }, (items) => {
      const siteSettings = items.siteSettings || {}
      chrome.storage.sync.set({
        ...globalPatch,
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

  const clearActiveField = () => {
    if (!target) return
    setNativeValue(target, '')
    target.focus()
  }

  const pinCurrentField = () => {
    if (!target) return
    const selector = createInputSelector(target)
    setPinnedInputSelector(selector)
    updateSiteSettings({ pinnedInputSelector: selector })
    showToast(text('Панель привязана к этому полю', 'Panel pinned to this field'), 'success')
  }

  const unpinField = () => {
    setPinnedInputSelector('')
    updateSiteSettings({ pinnedInputSelector: null })
    showToast(text('Привязка панели сброшена', 'Panel pin cleared'), 'success')
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
          color: '#ffffff',
        }}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-slate-950 text-white shadow-[0_18px_42px_rgba(2,6,23,.42),0_0_0_1px_rgba(255,255,255,.14)] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_20px_46px_rgba(2,6,23,.52),0_0_0_1px_rgba(255,255,255,.2)] active:scale-95"
        title={t('showPanel')}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setCollapsed(false)}
      >
        <BlobNoteMark className="h-6 w-6 shrink-0" />
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
            variant={pinnedInputSelector ? 'secondary' : 'ghost'}
            className="h-6 w-6"
            disabled={!target}
            title={pinnedInputSelector
              ? text('Панель привязана к этому полю. Нажмите, чтобы снова показывать ее у любых полей.', 'Panel is pinned to this field. Click to show it near any field again.')
              : text('Привязать к текущему полю. Панель и /-поиск будут открываться только у этого поля.', 'Pin to the current field. The panel and / search will open only for this field.')}
            onMouseDown={(event) => event.preventDefault()}
            onClick={pinnedInputSelector ? unpinField : pinCurrentField}
          >
            {pinnedInputSelector ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-6 w-6 text-destructive"
            title={t('clear')}
            onMouseDown={(event) => event.preventDefault()}
            onClick={clearActiveField}
          >
            <Eraser className="h-3 w-3" />
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
            size="icon"
            variant="default"
            className="h-6 w-6 text-white"
            title={t('base')}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onOpenBase}
          >
            <Database className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {settingsOpen && (
        <div className="mb-2 grid gap-3 rounded-lg border bg-background/95 p-3 text-[11px] shadow-sm">
          <div className="grid gap-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t('panelDisplay')}</div>
            <div className="grid grid-cols-2 gap-2">
              <label className="grid gap-1">
                <span className="text-muted-foreground">{t('panelScale')}</span>
                <PanelStepper
                  value={`${panelScale}%`}
                  onDecrease={() => {
                    const value = stepPanelScale(panelScale, -1)
                    setPanelScale(value)
                    updateSiteSettings({ panelScale: value })
                  }}
                  onIncrease={() => {
                    const value = stepPanelScale(panelScale, 1)
                    setPanelScale(value)
                    updateSiteSettings({ panelScale: value })
                  }}
                />
              </label>
              <label className="grid gap-1">
                <span className="text-muted-foreground">{t('panelPosition')}</span>
                <PanelChoiceGrid
                  value={placement}
                  options={[
                    { value: 'auto', label: t('auto') },
                    { value: 'above', label: t('aboveField') },
                    { value: 'below', label: t('belowField') },
                    { value: 'top-right', label: t('topRight') },
                    { value: 'bottom-right', label: t('bottomRight') },
                  ]}
                  onChange={(value) => {
                    const nextValue = value as AppSettings['panelPlacement']
                    setPlacement(nextValue)
                    updateSiteSettings({ panelPlacement: nextValue })
                  }}
                />
              </label>
            </div>
            <label className="flex items-center gap-2 rounded-md border bg-muted/30 px-2 py-1.5">
              <input
                type="checkbox"
                checked={showRecentInsertions}
                onChange={(event) => {
                  setShowRecentInsertions(event.target.checked)
                  updateSiteSettings({ panelCompactMode: event.target.checked })
                }}
              />
              <span>{t('compactPanel')}</span>
            </label>
            <div className="grid gap-1 rounded-md border bg-muted/30 px-2 py-1.5">
              <div className="text-muted-foreground">{text('Привязка к полю', 'Field pin')}</div>
              <div className="grid grid-cols-2 gap-1">
                <button
                  type="button"
                  className="inline-flex min-w-0 items-center justify-center gap-1 rounded-md border bg-background px-2 py-1 text-[10px] font-medium hover:bg-muted"
                  title={text('Показывать панель только у текущего поля ввода', 'Show the panel only near the current input field')}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={pinCurrentField}
                >
                  <Pin className="h-3 w-3" />
                  <span className="truncate">{text('Привязать', 'Pin')}</span>
                </button>
                <button
                  type="button"
                  className="inline-flex min-w-0 items-center justify-center gap-1 rounded-md border bg-background px-2 py-1 text-[10px] font-medium hover:bg-muted"
                  title={text('Снова показывать панель у любых полей ввода', 'Show the panel near any input field again')}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={unpinField}
                >
                  <PinOff className="h-3 w-3" />
                  <span className="truncate">{text('Сбросить', 'Clear')}</span>
                </button>
              </div>
              {pinnedInputSelector && <div className="truncate text-[10px] text-muted-foreground" title={pinnedInputSelector}>{pinnedInputSelector}</div>}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t('sendSettings')}</div>
            <label className="grid gap-1">
              <span className="text-muted-foreground">{t('safeSendDelay')}</span>
              <PanelStepper
                value={`${safeSendDelay} ${t('secondsShort')}`}
                onDecrease={() => {
                  const value = stepDelay(safeSendDelay, -1)
                  setSafeSendDelay(value)
                  chrome.storage?.sync?.set({ safeSendDelay: value, safeSendEnabled: value > 0 })
                }}
                onIncrease={() => {
                  const value = stepDelay(safeSendDelay, 1)
                  setSafeSendDelay(value)
                  chrome.storage?.sync?.set({ safeSendDelay: value, safeSendEnabled: value > 0 })
                }}
              />
            </label>
            <label className="grid gap-1">
              <span className="text-muted-foreground">{t('sendMethod')}</span>
              <PanelChoiceGrid
                value={sendMethod}
                options={[
                  { value: 'auto', label: t('sendAuto') },
                  { value: 'button', label: t('sendButton') },
                  { value: 'enter', label: t('sendEnter') },
                  { value: 'ctrl-enter', label: t('sendCtrlEnter') },
                  { value: 'shift-enter', label: t('sendShiftEnter') },
                  { value: 'alt-enter', label: t('sendAltEnter') },
                ]}
                onChange={(value) => {
                  const nextValue = value as SendMethod
                  setSendMethod(nextValue)
                  updateSiteSettings({ sendMethod: nextValue })
                }}
              />
            </label>
            {sendMethod === 'button' && (
              <label className="grid gap-1">
                <span className="text-muted-foreground">{t('sendButtonSelector')}</span>
                <input
                  className="h-8 min-w-0 rounded-md border bg-background px-2 text-xs"
                  value={sendButtonSelector}
                  onChange={(event) => {
                    setSendButtonSelector(event.target.value)
                    updateSiteSettings({ sendButtonSelector: event.target.value.trim() || null })
                  }}
                  placeholder="button[type='submit']"
                />
              </label>
            )}
          </div>
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

      {recentInsertions.length > 0 && showRecentInsertions && (
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

function PanelStepper({
  value,
  onDecrease,
  onIncrease,
}: {
  value: string
  onDecrease: () => void
  onIncrease: () => void
}) {
  return (
    <div className="flex h-8 overflow-hidden rounded-md border bg-background text-xs shadow-sm">
      <button
        type="button"
        className="w-8 border-r text-muted-foreground hover:bg-muted hover:text-foreground"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onDecrease}
      >
        -
      </button>
      <span className="flex min-w-0 flex-1 items-center justify-center px-2 font-semibold text-foreground">{value}</span>
      <button
        type="button"
        className="w-8 border-l text-muted-foreground hover:bg-muted hover:text-foreground"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  )
}

function PanelChoiceGrid({
  value,
  options,
  onChange,
}: {
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`min-w-0 rounded-md border px-2 py-1 text-[10px] font-medium transition-colors ${
            option.value === value
              ? 'border-primary bg-primary text-white shadow-sm'
              : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
          }`}
          title={option.label}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onChange(option.value)}
        >
          <span className="block truncate">{option.label}</span>
        </button>
      ))}
    </div>
  )
}

function cssEscape(value: string) {
  if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(value)
  return value.replace(/["\\#.:,[\]>+~*^$|=]/g, '\\$&')
}

function createInputSelector(element: Element) {
  const tag = element.tagName.toLowerCase()
  const id = element.getAttribute('id')
  if (id) return `#${cssEscape(id)}`

  const stableAttributes = ['name', 'aria-label', 'placeholder', 'data-testid', 'data-test', 'data-qa', 'data-role']
  for (const attribute of stableAttributes) {
    const value = element.getAttribute(attribute)
    if (value) return `${tag}[${attribute}="${cssEscape(value)}"]`
  }

  const parent = element.parentElement
  if (!parent) return tag
  const siblings = Array.from(parent.children).filter((item) => item.tagName === element.tagName)
  const index = Math.max(1, siblings.indexOf(element) + 1)
  return `${parent.tagName.toLowerCase()} > ${tag}:nth-of-type(${index})`
}

function matchesPinnedInput(element: Element, selector: string) {
  try {
    return element.matches(selector) || document.querySelector(selector) === element
  } catch {
    return false
  }
}
