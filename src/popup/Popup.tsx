import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { ToastContainer, showToast } from '@/components/ui/toast'
import { useAppStore } from '@/store'
import { assetUrl } from '@/lib/assets'
import { LANGUAGE_OPTIONS, translate } from '@/lib/i18n'
import { UI_SCALE_OPTIONS, uiScaleStyle } from '@/lib/uiScale'
import type { AppSettings } from '@/types'
import {
  AtSign,
  BookOpen,
  ClipboardList,
  Download,
  ExternalLink,
  Languages,
  List,
  ListTodo,
  Moon,
  PanelTopOpen,
  Settings,
  Upload,
  ZoomIn,
} from 'lucide-react'

export function Popup() {
  const { settings, updateSettings, exportTemplates, importTemplates } = usePopupActions()
  const [currentHost, setCurrentHost] = React.useState('')
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const t = React.useCallback(
    (key: string, params?: Record<string, string | number>) => translate(settings.uiLanguage, key, params),
    [settings.uiLanguage]
  )

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

  const currentSiteEnabled = currentHost ? settings.enabledHosts.includes(currentHost) : false

  return (
    <div className="h-[590px] w-[460px] overflow-hidden bg-background p-4 text-foreground" style={uiScaleStyle(settings.uiScale)}>
      <header className="mb-3 flex items-center justify-between border-b pb-2">
        <h1 className="flex items-center gap-2 text-sm font-semibold">
          {settings.theme === 'dark' ? (
            <>
              <img src={assetUrl('icon-32.png')} alt="" className="h-7 w-7" />
              <span className="text-base font-bold text-foreground">{t('appName')}</span>
            </>
          ) : (
            <img src={assetUrl('assets/blobnote-logo.png')} alt={t('appName')} className="h-7 w-auto" />
          )}
          <span className="sr-only">{t('appName')}</span>
        </h1>
        <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium">v1.0</span>
      </header>

      <Tabs defaultValue="open" className="w-full">
        <TabsList className="mb-3 grid w-full grid-cols-2">
          <TabsTrigger value="open" className="text-xs">
            <List className="mr-1 h-3 w-3" />
            {t('base')}
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs">
            <Settings className="mr-1 h-3 w-3" />
            {t('settings')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="space-y-3">
          {!settings.onboardingCompleted && (
            <section className="rounded-lg border border-primary/30 bg-primary/10 p-3 text-xs shadow-sm">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-foreground">{t('onboardingTitle')}</h2>
                  <p className="mt-1 leading-relaxed text-muted-foreground">{t('onboardingSubtitle')}</p>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-7 shrink-0 px-2 text-[11px]"
                  onClick={() => updateSettings({ onboardingCompleted: true })}
                >
                  {t('gotIt')}
                </Button>
              </div>
              <div className="grid gap-1.5 leading-relaxed text-muted-foreground">
                <span>{t('onboardingStepBase')}</span>
                {settings.atMenuEnabled && <OnboardingSearchStep language={settings.uiLanguage} trigger={settings.searchTrigger} />}
                <span>{t('onboardingStepPanel')}</span>
              </div>
            </section>
          )}
          <Button className="h-12 w-full" onClick={() => openBaseOnCurrentPage(settings.uiLanguage)}>
            <PanelTopOpen className="mr-2 h-4 w-4" />
            {t('openBaseCurrent')}
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => chrome.tabs.create({ url: chrome.runtime.getURL('base.html') })}
          >
            <ExternalLink className="mr-2 h-3 w-3" />
            {t('openBaseTab')}
          </Button>
          <QuickInsertHint language={settings.uiLanguage} trigger={settings.searchTrigger} atMenuEnabled={settings.atMenuEnabled} />

          <div className="grid gap-3 text-xs">
            {settings.atMenuEnabled && (
              <section className="rounded-lg border bg-muted/20 p-3">
                <h3 className="mb-1 flex items-center gap-2 font-medium">
                  <span className="text-primary">{settings.searchTrigger}</span>
                  {t('triggerMenuTitle', { trigger: settings.searchTrigger })}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  <TriggerMenuHelp language={settings.uiLanguage} trigger={settings.searchTrigger} />
                </p>
              </section>
            )}
            <section className="rounded-lg border bg-muted/20 p-3">
              <h3 className="mb-1 font-medium">{t('floatingPanel')}</h3>
              <p className="leading-relaxed text-muted-foreground">{t('floatingPanelHelp')}</p>
            </section>
            {settings.showVariablesTab && (
              <section className="rounded-lg border bg-muted/20 p-3">
                <h3 className="mb-1 font-medium">{t('variables')}</h3>
                <p className="leading-relaxed text-muted-foreground">{t('variablesHelp', { example: '{{agent_name}}' })}</p>
              </section>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-3">
          <section className="space-y-2">
            <h3 className="border-l-2 border-primary pl-2 text-xs font-medium text-muted-foreground">{t('appearance')}</h3>
            <SelectRow
              icon={<Languages className="h-3.5 w-3.5" />}
              label={t('language')}
              value={settings.uiLanguage}
              onChange={(value) => updateSettings({ uiLanguage: value as AppSettings['uiLanguage'] })}
              options={LANGUAGE_OPTIONS}
            />
            <SwitchRow
              icon={<Moon className="h-3.5 w-3.5" />}
              label={t('darkTheme')}
              checked={settings.theme === 'dark'}
              onCheckedChange={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })}
            />
            <SelectRow
              icon={<ZoomIn className="h-3.5 w-3.5" />}
              label={t('interfaceScale')}
              value={settings.uiScale}
              onChange={(value) => updateSettings({ uiScale: value as AppSettings['uiScale'] })}
              options={UI_SCALE_OPTIONS}
            />
          </section>

          <section className="space-y-2">
            <h3 className="border-l-2 border-primary pl-2 text-xs font-medium text-muted-foreground">{t('behavior')}</h3>
            <SwitchRow
              label={t('allowlistOnly')}
              checked={settings.activationMode === 'allowlist'}
              onCheckedChange={(checked) => updateSettings({ activationMode: checked ? 'allowlist' : 'all' })}
            />
            {currentHost && (
              <div className="space-y-2 rounded-md border bg-muted/30 p-2">
                <div className="truncate text-[11px] text-muted-foreground">{currentHost}</div>
                <Button
                  size="sm"
                  variant={currentSiteEnabled ? 'outline' : 'default'}
                  className="w-full"
                  onClick={() => {
                    updateSettings({
                      enabledHosts: currentSiteEnabled
                        ? settings.enabledHosts.filter((host) => host !== currentHost)
                        : [...settings.enabledHosts, currentHost],
                    })
                  }}
                >
                  {currentSiteEnabled ? t('disableForSite') : t('enableForSite')}
                </Button>
              </div>
            )}
            <SelectRow
              icon={<AtSign className="h-3.5 w-3.5" />}
              label={t('trigger')}
              value={settings.searchTrigger}
              onChange={(value) => updateSettings({ searchTrigger: value as AppSettings['searchTrigger'] })}
              options={[{ value: '/', label: '/' }, { value: '@', label: '@' }]}
            />
            <SwitchRow
              label={t('atSearchInInput', { trigger: settings.searchTrigger })}
              checked={settings.atMenuEnabled}
              onCheckedChange={(checked) => updateSettings({ atMenuEnabled: checked })}
            />
            <SwitchRow
              icon={<PanelTopOpen className="h-3.5 w-3.5" />}
              label={t('floatingPanelNearField')}
              checked={settings.floatingPanelEnabled}
              onCheckedChange={(checked) => updateSettings({ floatingPanelEnabled: checked })}
            />
            <SwitchRow
              icon={<ClipboardList className="h-3.5 w-3.5" />}
              label={t('clipboardInPanel')}
              checked={settings.clipboardPanelEnabled}
              onCheckedChange={(checked) => updateSettings({ clipboardPanelEnabled: checked })}
            />
            <SwitchRow
              icon={<BookOpen className="h-3.5 w-3.5" />}
              label={t('variablesTab')}
              checked={settings.showVariablesTab}
              onCheckedChange={(checked) => updateSettings({ showVariablesTab: checked })}
            />
            <SwitchRow
              icon={<ListTodo className="h-3.5 w-3.5" />}
              label={t('tasksTab')}
              checked={settings.showTodoTab}
              onCheckedChange={(checked) => updateSettings({ showTodoTab: checked })}
            />
          </section>

          <section className="space-y-2">
            <h3 className="border-l-2 border-primary pl-2 text-xs font-medium text-muted-foreground">{t('dataManagement')}</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" onClick={exportTemplates}><Download className="mr-1 h-3 w-3" />{t('export')}</Button>
              <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}><Upload className="mr-1 h-3 w-3" />{t('import')}</Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) importTemplates(file)
              }}
            />
          </section>
        </TabsContent>
      </Tabs>

      <ToastContainer />
    </div>
  )
}

function SwitchRow({
  icon,
  label,
  checked,
  onCheckedChange,
}: {
  icon?: React.ReactNode
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span className="flex items-center gap-1.5 text-xs">{icon}{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  )
}

function SelectRow({
  icon,
  label,
  value,
  options,
  onChange,
}: {
  icon?: React.ReactNode
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
}) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-1.5 text-xs">{icon}{label}</span>
      <select className="h-8 rounded-md border bg-background px-2 text-xs" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  )
}

function openBaseOnCurrentPage(language: AppSettings['uiLanguage']) {
  chrome.runtime.sendMessage({ type: 'OPEN_BASE_MODAL_ACTIVE_TAB' }, (response) => {
    if (response?.success) window.close()
    else showToast(translate(language, 'openBaseFailed') + (response?.error || translate(language, 'refreshTab')), 'error')
  })
}

function usePopupActions() {
  const { templates, settings, updateSettings, importTemplates: importToStore } = useAppStore()

  const exportTemplates = React.useCallback(() => {
    const blob = new Blob([JSON.stringify(templates, null, 2)], { type: 'application/json' })
    const anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(blob)
    anchor.download = `blobnote_backup_${new Date().toISOString().slice(0, 10)}.json`
    anchor.click()
    showToast(translate(settings.uiLanguage, 'templatesExported'), 'success')
  }, [settings.uiLanguage, templates])

  const importTemplates = React.useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        if (Array.isArray(data)) {
          importToStore(data)
          showToast(translate(settings.uiLanguage, 'templatesImported'), 'success')
        }
      } catch {
        showToast(translate(settings.uiLanguage, 'jsonParseError'), 'error')
      }
    }
    reader.readAsText(file)
  }, [importToStore, settings.uiLanguage])

  return { settings, updateSettings, exportTemplates, importTemplates }
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mx-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border bg-muted px-1.5 text-[10px] font-semibold leading-none text-foreground shadow-sm">
      {children}
    </kbd>
  )
}

function Hotkey({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-0.5 whitespace-nowrap">
      {keys.map((key, index) => (
        <React.Fragment key={key}>
          {index > 0 && <span className="text-muted-foreground">+</span>}
          <Kbd>{key}</Kbd>
        </React.Fragment>
      ))}
    </span>
  )
}

function QuickInsertHint({
  language,
  trigger,
  atMenuEnabled,
}: {
  language: AppSettings['uiLanguage']
  trigger: AppSettings['searchTrigger']
  atMenuEnabled: boolean
}) {
  if (language === 'en') {
    return (
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Use the floating panel near the field, {atMenuEnabled && <><Kbd>{trigger}</Kbd> search, </>}
        or <Hotkey keys={['Ctrl', 'Space']} />. Open the base over a site with <Hotkey keys={['Ctrl', 'Shift', 'Space']} />.
      </p>
    )
  }

  return (
    <p className="text-[11px] leading-relaxed text-muted-foreground">
      Для быстрой вставки используйте плавающую панель у поля, {atMenuEnabled && <><Kbd>{trigger}</Kbd>-поиск, </>}
      или <Hotkey keys={['Ctrl', 'Space']} />. База поверх сайта открывается через <Hotkey keys={['Ctrl', 'Shift', 'Space']} />.
    </p>
  )
}

function TriggerMenuHelp({ language, trigger }: { language: AppSettings['uiLanguage']; trigger: AppSettings['searchTrigger'] }) {
  if (language === 'en') {
    return <>Type <Kbd>{trigger}</Kbd> in an input field and start typing a note title.</>
  }

  return <>Введите <Kbd>{trigger}</Kbd> в поле ввода и начните печатать название заметки.</>
}

function OnboardingSearchStep({ language, trigger }: { language: AppSettings['uiLanguage']; trigger: AppSettings['searchTrigger'] }) {
  if (language === 'en') {
    return <span>2. Type <Kbd>{trigger}</Kbd> in a message field to find a note without changing tabs.</span>
  }

  return <span>2. Введите <Kbd>{trigger}</Kbd> в поле сообщения, чтобы найти заметку без переключения вкладок.</span>
}
