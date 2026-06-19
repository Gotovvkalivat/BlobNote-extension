import React from 'react'
import ReactDOM from 'react-dom/client'
import { FloatingPanel } from './FloatingPanel'
import { AtMenu } from './AtMenu'
import { SmartSearch } from './SmartSearch'
import { BaseModal } from './BaseModal'
import { insertTemplate, installEditableTracker, isHostEnabled, readRuntimeSnapshot, type SafeSendRequestDetail } from '@/lib/templateRuntime'
import type { AppSettings, Template } from '@/types'
import { ToastContainer } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { translate } from '@/lib/i18n'

const SHADOW_THEME_STYLE = `
  :host {
    all: initial;
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
    width: 0 !important;
    height: 0 !important;
    overflow: visible !important;
    z-index: 2147483647 !important;
    display: block !important;
    isolation: isolate;
    font-size: 16px !important;
    line-height: normal !important;
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 202 100% 36%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215 18% 34%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214 24% 86%;
    --input: 214 24% 86%;
    --ring: 204 94% 38%;
    --radius: 0.5rem;
    color-scheme: light;
  }

  #opspost-content-root {
    all: initial;
    color: hsl(var(--foreground));
    display: block;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 14px !important;
    line-height: 1.5 !important;
    text-align: initial;
    text-transform: none;
    letter-spacing: 0;
    direction: ltr;
  }

  #opspost-content-root .dark {
    --background: 222 44% 7%;
    --foreground: 210 40% 98%;
    --card: 222 38% 8%;
    --card-foreground: 210 40% 98%;
    --popover: 222 38% 8%;
    --popover-foreground: 210 40% 98%;
    --primary: 199 96% 48%;
    --primary-foreground: 210 40% 98%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217 28% 18%;
    --muted-foreground: 214 24% 74%;
    --accent: 217 28% 18%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217 26% 24%;
    --input: 217 26% 24%;
    --ring: 199 96% 48%;
    color-scheme: dark;
  }

  #opspost-content-root *,
  #opspost-content-root *::before,
  #opspost-content-root *::after {
    box-sizing: border-box;
  }

  #opspost-content-root * {
    letter-spacing: 0 !important;
  }

  #opspost-content-root button,
  #opspost-content-root input,
  #opspost-content-root select,
  #opspost-content-root textarea {
    color: inherit;
    font: inherit;
    letter-spacing: 0;
  }
`

function configureHost(host: HTMLElement) {
  host.style.setProperty('all', 'initial', 'important')
  host.style.setProperty('position', 'fixed', 'important')
  host.style.setProperty('left', '0', 'important')
  host.style.setProperty('top', '0', 'important')
  host.style.setProperty('width', '0', 'important')
  host.style.setProperty('height', '0', 'important')
  host.style.setProperty('overflow', 'visible', 'important')
  host.style.setProperty('display', 'block', 'important')
  host.style.setProperty('z-index', '2147483647', 'important')
  host.style.setProperty('isolation', 'isolate', 'important')
  host.style.setProperty('font-size', '16px', 'important')
  host.style.setProperty('line-height', 'normal', 'important')
}

function createRootContainer(id: string) {
  let host = document.getElementById(id)
  if (!host) {
    host = document.createElement('div')
    host.id = id
  }

  const parent = document.documentElement || document.body
  if (host.parentElement !== parent) parent.appendChild(host)

  configureHost(host)

  const shadow = host.shadowRoot || host.attachShadow({ mode: 'open' })

  if (!shadow.querySelector('style[data-blobnote-shadow-theme]')) {
    const style = document.createElement('style')
    style.dataset.blobnoteShadowTheme = 'true'
    style.textContent = SHADOW_THEME_STYLE
    shadow.appendChild(style)
  }

  if (!shadow.querySelector('link[data-opspost-styles]')) {
    const link = document.createElement('link')
    link.dataset.opspostStyles = 'true'
    link.rel = 'stylesheet'
    link.href = chrome.runtime.getURL('assets/globals.css')
    shadow.appendChild(link)
  }

  let root = shadow.getElementById('opspost-content-root')
  if (!root) {
    root = document.createElement('div')
    root.id = 'opspost-content-root'
    shadow.appendChild(root)
  }

  return root
}

function ContentApp() {
  const [showSmartSearch, setShowSmartSearch] = React.useState(false)
  const [showBase, setShowBase] = React.useState(false)
  const [enabledForHost, setEnabledForHost] = React.useState(true)
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')
  const [language, setLanguage] = React.useState<AppSettings['uiLanguage']>('ru')
  const [panelScale, setPanelScale] = React.useState<AppSettings['panelScale']>('100')
  const [pendingSend, setPendingSend] = React.useState<{
    id: number
    delaySeconds: number
    send: () => void
  } | null>(null)

  React.useEffect(() => {
    const uninstallTracker = installEditableTracker()

    const loadActivation = async () => {
      const snapshot = await readRuntimeSnapshot()
      setEnabledForHost(isHostEnabled(snapshot))
      setTheme(snapshot.theme)
      setLanguage(snapshot.uiLanguage)
      setPanelScale(snapshot.panelScale)
    }

    void loadActivation()

    const handleStorage = (changes: Record<string, chrome.storage.StorageChange>, area: string) => {
      if (
        area === 'sync' &&
        (changes.activationMode || changes.enabledHosts || changes.theme || changes.uiLanguage || changes.panelScale || changes.siteSettings)
      ) {
        void loadActivation()
      }
    }

    const handleSafeSend = (event: Event) => {
      const detail = (event as CustomEvent<SafeSendRequestDetail>).detail
      if (!detail?.send) return
      detail.handled = true
      setPendingSend({
        id: Date.now(),
        delaySeconds: detail.delaySeconds,
        send: detail.send,
      })
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === 'Space') {
        event.preventDefault()
        setShowBase(true)
        return
      }

      if (!enabledForHost) return
      if (event.ctrlKey && event.code === 'Space') {
        event.preventDefault()
        setShowSmartSearch(true)
      }
    }

    const handleMessage = (
      request: { type?: string; template?: Template; autoSend?: boolean },
      _sender: chrome.runtime.MessageSender,
      sendResponse: (response?: { success: boolean; error?: string }) => void
    ) => {
      if (request.type === 'OPEN_SMART_SEARCH' || request.type === 'OPEN_MEGA_MODAL') {
        setShowSmartSearch(true)
        sendResponse({ success: true })
        return true
      }

      if (request.type === 'OPEN_BASE_MODAL') {
        setShowBase(true)
        sendResponse({ success: true })
        return true
      }

      if (request.type === 'INSERT_TEMPLATE' && request.template) {
        const success = insertTemplate(request.template, { autoSend: Boolean(request.autoSend) })
        sendResponse(success ? { success: true } : { success: false, error: 'Поле ввода не найдено' })
        return true
      }

      return false
    }

    document.addEventListener('keydown', handleKeydown)
    window.addEventListener('blobnote:safe-send', handleSafeSend)
    chrome.storage?.onChanged?.addListener(handleStorage)
    chrome.runtime?.onMessage?.addListener(handleMessage)

    return () => {
      uninstallTracker()
      document.removeEventListener('keydown', handleKeydown)
      window.removeEventListener('blobnote:safe-send', handleSafeSend)
      chrome.storage?.onChanged?.removeListener(handleStorage)
      chrome.runtime?.onMessage?.removeListener(handleMessage)
    }
  }, [enabledForHost])

  return (
    <React.StrictMode>
      <div className={theme === 'dark' ? 'dark' : ''}>
        {enabledForHost && <FloatingPanel uiScale={panelScale} onOpenBase={() => setShowBase(true)} />}
        {enabledForHost && <AtMenu uiScale={panelScale} />}
        {enabledForHost && <SmartSearch uiScale={panelScale} open={showSmartSearch} onOpenChange={setShowSmartSearch} />}
        <BaseModal open={showBase} onOpenChange={setShowBase} />
        <SafeSendPrompt language={language} pending={pendingSend} onClose={() => setPendingSend(null)} />
        <ToastContainer />
      </div>
    </React.StrictMode>
  )
}

function SafeSendPrompt({
  language,
  pending,
  onClose,
}: {
  language: AppSettings['uiLanguage']
  pending: { id: number; delaySeconds: number; send: () => void } | null
  onClose: () => void
}) {
  const [left, setLeft] = React.useState(0)
  const t = React.useCallback((key: string, params?: Record<string, string | number>) => translate(language, key, params), [language])

  React.useEffect(() => {
    if (!pending) return
    setLeft(pending.delaySeconds)
    const startedAt = Date.now()
    const interval = window.setInterval(() => {
      const nextLeft = Math.max(0, pending.delaySeconds - Math.floor((Date.now() - startedAt) / 1000))
      setLeft(nextLeft)
    }, 250)
    const timeout = window.setTimeout(() => {
      pending.send()
      onClose()
    }, pending.delaySeconds * 1000)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timeout)
    }
  }, [onClose, pending])

  if (!pending) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-[2147483647] w-[min(420px,calc(100vw-32px))] -translate-x-1/2 rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-2xl">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold">{t('safeSendTitle')}</div>
          <div className="text-xs text-muted-foreground">{t('safeSendCountdown', { seconds: left })}</div>
        </div>
        <div className="text-lg font-semibold tabular-nums text-primary">{left}</div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1"
          onClick={() => {
            pending.send()
            onClose()
          }}
        >
          {t('sendNow')}
        </Button>
        <Button size="sm" variant="outline" className="flex-1" onClick={onClose}>
          {t('cancelSend')}
        </Button>
      </div>
    </div>
  )
}

function init() {
  const root = createRootContainer('opspost-content-host')
  if (root.dataset.reactMounted === 'true') return
  root.dataset.reactMounted = 'true'
  ReactDOM.createRoot(root).render(<ContentApp />)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
