import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ToastContainer, showToast } from '@/components/ui/toast'
import { useAppStore } from '@/store'
import { assetUrl } from '@/lib/assets'
import { translate } from '@/lib/i18n'
import type { AppSettings, Template } from '@/types'
import {
  BookOpen,
  ClipboardList,
  ExternalLink,
  FileText,
  Heart,
  Languages,
  Moon,
  PanelTopOpen,
  Plus,
  Search,
  Send,
  Settings,
  Slash,
  Sparkles,
  Star,
} from 'lucide-react'

type PopupTab = 'base' | 'settings'

export function PopupV2() {
  const { templates, recentInsertions, settings, updateSettings } = useAppStore()
  const [tab, setTab] = React.useState<PopupTab>('base')
  const [query, setQuery] = React.useState('')
  const [currentHost, setCurrentHost] = React.useState('')
  const language = settings.uiLanguage

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark')
  }, [settings.theme])

  React.useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url
      if (!url) return
      try {
        setCurrentHost(new URL(url).hostname)
      } catch {}
    })
  }, [])

  const orderedTemplates = React.useMemo(() => {
    const recentOrder = new Map(recentInsertions.map((item, index) => [item.templateId, index]))
    const search = query.trim().toLowerCase()

    return templates
      .filter((template) => {
        if (!search) return true
        return (
          template.title.toLowerCase().includes(search) ||
          template.text.toLowerCase().includes(search) ||
          Boolean(template.tag?.toLowerCase().includes(search))
        )
      })
      .sort((a, b) => {
        if (a.favorite !== b.favorite) return a.favorite ? -1 : 1
        const recentA = recentOrder.has(a.id) ? recentOrder.get(a.id)! : 999
        const recentB = recentOrder.has(b.id) ? recentOrder.get(b.id)! : 999
        if (recentA !== recentB) return recentA - recentB
        if ((a.usageCount || 0) !== (b.usageCount || 0)) return (b.usageCount || 0) - (a.usageCount || 0)
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
      .slice(0, 10)
  }, [query, recentInsertions, templates])

  const currentSiteEnabled = currentHost ? settings.enabledHosts.includes(currentHost) : false
  const currentSiteActive = !currentHost || settings.activationMode === 'all' || currentSiteEnabled

  const insertTemplate = (template: Template, autoSend = false) => {
    chrome.runtime.sendMessage({ type: 'INSERT_TEMPLATE_ACTIVE_TAB', template, autoSend }, (response) => {
      if (response?.success) {
        showToast(autoSend ? ui(language, 'Вставлено и отправлено', 'Inserted and sent') : ui(language, 'Вставлено', 'Inserted'), 'success')
        window.setTimeout(() => window.close(), autoSend ? 150 : 350)
        return
      }

      showToast(response?.error || translate(language, 'inputNotFound'), 'error')
    })
  }

  const openBaseOnCurrentPage = () => {
    chrome.runtime.sendMessage({ type: 'OPEN_BASE_MODAL_ACTIVE_TAB' }, (response) => {
      if (response?.success) window.close()
      else showToast(translate(language, 'openBaseFailed') + (response?.error || translate(language, 'refreshTab')), 'error')
    })
  }

  return (
    <div className="h-[560px] w-[420px] overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <header className="border-b bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={assetUrl('icon-48.png')} alt="" className="h-8 w-8" />
            <div>
              <div className="text-base font-bold">BlobNote</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">v2.0</div>
            </div>
          </div>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold dark:bg-slate-900">V2</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-900">
          <button type="button" className={tabClass(tab === 'base')} onClick={() => setTab('base')}>
            <BookOpen className="h-4 w-4" />
            {translate(language, 'base')}
          </button>
          <button type="button" className={tabClass(tab === 'settings')} onClick={() => setTab('settings')}>
            <Settings className="h-4 w-4" />
            {translate(language, 'settings')}
          </button>
        </div>
      </header>

      {tab === 'base' ? (
        <main className="flex h-[calc(560px-103px)] flex-col overflow-hidden p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              autoFocus
              className="h-9 rounded-lg bg-white pl-10 text-sm dark:border-slate-800 dark:bg-slate-900"
              placeholder={ui(language, 'Поиск шаблона...', 'Search template...')}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="mt-2 min-h-0 flex-1 overflow-y-auto rounded-xl border bg-white dark:border-slate-800 dark:bg-slate-900">
            {orderedTemplates.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                <Sparkles className="mb-3 h-8 w-8 text-primary" />
                <div className="font-semibold">{templates.length === 0 ? ui(language, 'Пока нет шаблонов', 'No templates yet') : translate(language, 'nothingFound')}</div>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{ui(language, 'Откройте базу и добавьте частые ответы.', 'Open the base and add frequent replies.')}</p>
              </div>
            ) : (
              <div className="divide-y dark:divide-slate-800">
                {orderedTemplates.map((template) => (
                  <TemplateRow key={template.id} template={template} language={language} onInsert={() => insertTemplate(template)} onSend={() => insertTemplate(template, true)} />
                ))}
              </div>
            )}
          </div>

          <div className="mt-2 grid gap-2">
            <Button className="h-9 w-full text-sm" onClick={openBaseOnCurrentPage}>
              <PanelTopOpen className="mr-2 h-4 w-4" />
              {translate(language, 'openBaseCurrent')}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-9 text-sm" onClick={() => chrome.tabs.create({ url: chrome.runtime.getURL('base.html') })}>
                <ExternalLink className="mr-2 h-4 w-4" />
                {ui(language, 'Вся база', 'All templates')}
              </Button>
              <Button variant="outline" className="h-9 text-sm" onClick={() => chrome.tabs.create({ url: chrome.runtime.getURL('base.html') })}>
                <Plus className="mr-2 h-4 w-4" />
                {translate(language, 'create')}
              </Button>
            </div>
          </div>

          <p className="mt-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            {ui(language, 'Быстрая вставка: ', 'Quick insert: ')}
            <Kbd>{settings.searchTrigger}</Kbd>
            {ui(language, ' в поле сообщения или ', ' in a message field or ')}
            <Kbd>Ctrl</Kbd> + <Kbd>Space</Kbd>.
          </p>
        </main>
      ) : (
        <main className="h-[calc(560px-103px)] overflow-y-auto p-3">
          <div className={`mb-3 rounded-xl border p-3 ${currentSiteActive ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30' : 'border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30'}`}>
            <div className="text-sm font-semibold">{currentSiteActive ? ui(language, 'BlobNote работает на этой странице', 'BlobNote is active on this page') : ui(language, 'BlobNote выключен на этой странице', 'BlobNote is off on this page')}</div>
            <div className="mt-1 truncate text-xs text-slate-600 dark:text-slate-300">{currentHost || ui(language, 'Текущая вкладка', 'Current tab')}</div>
          </div>

          <div className="space-y-2">
            <ToggleLine icon={<Moon />} label={translate(language, 'darkTheme')} checked={settings.theme === 'dark'} onCheckedChange={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })} />
            <SelectLine icon={<Languages />} label={translate(language, 'language')} value={settings.uiLanguage} onChange={(value) => updateSettings({ uiLanguage: value as AppSettings['uiLanguage'] })} options={[{ value: 'ru', label: 'RU' }, { value: 'en', label: 'EN' }]} />
            <SelectLine icon={<Slash />} label={translate(language, 'trigger')} value={settings.searchTrigger} onChange={(value) => updateSettings({ searchTrigger: value as AppSettings['searchTrigger'] })} options={[{ value: '/', label: '/' }, { value: '@', label: '@' }]} />
            <ToggleLine icon={<PanelTopOpen />} label={translate(language, 'floatingPanelNearField')} checked={settings.floatingPanelEnabled} onCheckedChange={(checked) => updateSettings({ floatingPanelEnabled: checked })} />
            <ToggleLine icon={<Search />} label={translate(language, 'atSearchInInput', { trigger: settings.searchTrigger })} checked={settings.atMenuEnabled} onCheckedChange={(checked) => updateSettings({ atMenuEnabled: checked })} />
            <ToggleLine icon={<ClipboardList />} label={translate(language, 'clipboardInPanel')} checked={settings.clipboardPanelEnabled} onCheckedChange={(checked) => updateSettings({ clipboardPanelEnabled: checked })} />
            <ToggleLine icon={<FileText />} label={translate(language, 'variablesTab')} checked={settings.showVariablesTab} onCheckedChange={(checked) => updateSettings({ showVariablesTab: checked })} />

            <label className="block rounded-2xl border bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-2 text-sm font-semibold">{translate(language, 'allowlistOnly')}</div>
              <div className="mb-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{translate(language, 'allowlistHint')}</div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm">{ui(language, 'Режим выбранных сайтов', 'Selected sites mode')}</span>
                <Switch checked={settings.activationMode === 'allowlist'} onCheckedChange={(checked) => updateSettings({ activationMode: checked ? 'allowlist' : 'all' })} />
              </div>
              {currentHost && settings.activationMode === 'allowlist' && (
                <Button
                  variant={currentSiteEnabled ? 'outline' : 'default'}
                  className="w-full"
                  onClick={() => updateSettings({
                    enabledHosts: currentSiteEnabled
                      ? settings.enabledHosts.filter((host) => host !== currentHost)
                      : [...settings.enabledHosts, currentHost],
                  })}
                >
                  {currentSiteEnabled ? translate(language, 'disableForSite') : translate(language, 'enableForSite')}
                </Button>
              )}
            </label>
          </div>
        </main>
      )}

      <ToastContainer />
    </div>
  )
}

function TemplateRow({ template, language, onInsert, onSend }: { template: Template; language: AppSettings['uiLanguage']; onInsert: () => void; onSend: () => void }) {
  return (
    <div className="group grid grid-cols-[1fr_auto] gap-2 p-2.5 transition hover:bg-slate-50 dark:hover:bg-slate-800/70">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {template.favorite ? <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-500" /> : <Heart className="h-3.5 w-3.5 shrink-0 text-slate-300" />}
          <div className="truncate text-sm font-semibold">{template.title}</div>
        </div>
        <div className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{template.text}</div>
        {template.tag && <div className="mt-1.5 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-300">{template.tag}</div>}
      </div>
      <div className="flex flex-col gap-1">
        <Button size="sm" className="h-7 px-2 text-xs" onClick={onInsert}>{translate(language, 'insert')}</Button>
        <Button size="icon" variant="outline" className="h-7 w-7" title={translate(language, 'insertAndSend')} onClick={onSend}>
          <Send className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}

function ToggleLine({ icon, label, checked, onCheckedChange }: { icon: React.ReactElement; label: string; checked: boolean; onCheckedChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl border bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900">
      <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
        {React.cloneElement(icon, { className: 'h-4 w-4 shrink-0 text-slate-500' })}
        <span className="min-w-0 truncate">{label}</span>
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  )
}

function SelectLine({ icon, label, value, options, onChange }: { icon: React.ReactElement; label: string; value: string; options: Array<{ value: string; label: string }>; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1.5 rounded-xl border bg-white p-2.5 dark:border-slate-800 dark:bg-slate-900">
      <span className="flex items-center gap-2 text-sm font-medium">
        {React.cloneElement(icon, { className: 'h-4 w-4 shrink-0 text-slate-500' })}
        {label}
      </span>
      <select className="h-8 rounded-lg border bg-white px-2 text-sm dark:border-slate-800 dark:bg-slate-950" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  )
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="mx-1 inline-flex min-w-6 items-center justify-center rounded-md border bg-white px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50">{children}</kbd>
}

function tabClass(active: boolean) {
  return `flex h-8 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition ${active ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-950 dark:text-white' : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'}`
}

function ui(language: AppSettings['uiLanguage'], ru: string, en: string) {
  return language === 'en' ? en : ru
}
