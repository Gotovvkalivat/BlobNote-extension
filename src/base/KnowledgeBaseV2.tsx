import React from 'react'
import { useAppStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ToastContainer } from '@/components/ui/toast'
import { TemplateCard } from '@/components/base/TemplateCard'
import { TemplateEditor } from '@/components/base/TemplateEditor'
import { TemplatePreviewModal } from '@/components/base/TemplatePreviewModal'
import { TodoPanel } from '@/components/base/TodoPanel'
import { VariablesPanel } from '@/components/base/VariablesPanel'
import { showToast as showToastEvent } from '@/components/ui/toast'
import { CARD_PRESETS, cardPresetFor } from '@/lib/cardPresets'
import { SCENARIO_PRESETS, type ScenarioPresetId } from '@/lib/scenarioPresets'
import { tagColorStyle } from '@/lib/tagColors'
import { uiScaleStyle } from '@/lib/uiScale'
import { translate } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { AppSettings, Template } from '@/types'
import {
  Archive,
  Braces,
  CheckSquare,
  ClipboardList,
  Copy,
  Download,
  Eye,
  Grid2X2,
  Heart,
  Info,
  LayoutList,
  ListTodo,
  LogIn,
  Palette,
  PanelTopOpen,
  Pencil,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react'

type KnowledgeBaseV2Props = {
  embedded?: boolean
  onAfterInsert?: (autoSend: boolean) => void
}

type ViewMode = 'cards' | 'table'
type MainFilter = 'all' | 'favorites' | 'recent'
type SortMode = 'updated' | 'usage' | 'title'
type ActiveTab = 'templates' | 'variables' | 'todo'
type TemplateWithFolder = Template & { folder?: string | null; deletedAt?: string | null }

const VIEW_STORAGE_KEY = 'blobnote-v2-view-mode'
const MASS_STORAGE_KEY = 'blobnote-v2-mass-mode'
const DEFAULT_FOLDER_RU = 'Без папки'
const DEFAULT_FOLDER_EN = 'No folder'

const PRESET_LABELS: Record<AppSettings['cardPreset'], { ru: string; en: string }> = {
  lagoon: { ru: 'Лагуна', en: 'Lagoon' },
  orchid: { ru: 'Орхидея', en: 'Orchid' },
  graphite: { ru: 'Графит', en: 'Graphite' },
  mint: { ru: 'Мята', en: 'Mint' },
  paper: { ru: 'Бумага', en: 'Paper' },
  berry: { ru: 'Ягода', en: 'Berry' },
  sunset: { ru: 'Закат', en: 'Sunset' },
  steel: { ru: 'Сталь', en: 'Steel' },
}

export function KnowledgeBaseV2({ embedded = false, onAfterInsert }: KnowledgeBaseV2Props = {}) {
  const {
    templates,
    variables,
    todos,
    recentInsertions,
    settings,
    updateSettings,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    toggleFavorite,
    importTemplates,
  } = useAppStore()

  const [searchQuery, setSearchQuery] = React.useState('')
  const [mainFilter, setMainFilter] = React.useState<MainFilter>('all')
  const [folderFilter, setFolderFilter] = React.useState<string | null>(null)
  const [tagFilters, setTagFilters] = React.useState<string[]>([])
  const [sortMode, setSortMode] = React.useState<SortMode>('updated')
  const [activeTab, setActiveTab] = React.useState<ActiveTab>(() => {
    const storedTab = readStorage('blobnote-v2-active-tab', 'templates')
    return storedTab === 'variables' || storedTab === 'todo' ? storedTab : 'templates'
  })
  const [viewMode, setViewMode] = React.useState<ViewMode>(() => readStorage(VIEW_STORAGE_KEY, 'cards') as ViewMode)
  const [massMode, setMassMode] = React.useState(() => readStorage(MASS_STORAGE_KEY, 'false') === 'true')
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])
  const [editingTemplate, setEditingTemplate] = React.useState<Template | null>(null)
  const [isCreating, setIsCreating] = React.useState(false)
  const [previewTemplate, setPreviewTemplate] = React.useState<Template | null>(null)
  const [settingsOpen, setSettingsOpen] = React.useState(false)
  const [scenarioPresetId, setScenarioPresetId] = React.useState<ScenarioPresetId>('support')
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const language = settings.uiLanguage
  const defaultFolder = ui(language, DEFAULT_FOLDER_RU, DEFAULT_FOLDER_EN)

  React.useEffect(() => {
    if (embedded) return
    document.documentElement.classList.toggle('dark', settings.theme === 'dark')
    return () => document.documentElement.classList.remove('dark')
  }, [embedded, settings.theme])

  React.useEffect(() => writeStorage(VIEW_STORAGE_KEY, viewMode), [viewMode])
  React.useEffect(() => writeStorage(MASS_STORAGE_KEY, String(massMode)), [massMode])
  const visibleTab = getVisibleBaseTab(activeTab, settings)
  React.useEffect(() => {
    if (visibleTab !== activeTab) setActiveTab(visibleTab)
    writeStorage('blobnote-v2-active-tab', visibleTab)
  }, [activeTab, visibleTab])

  const switchTab = (tab: ActiveTab) => {
    const nextTab = getVisibleBaseTab(tab, settings)
    setActiveTab(nextTab)
    writeStorage('blobnote-v2-active-tab', nextTab)
    updateSettings({ lastBaseTab: nextTab })
  }

  const activeTemplates = React.useMemo(() => {
    return (templates as TemplateWithFolder[])
      .filter((template) => !template.deletedAt)
      .slice()
      .sort(sortTemplates(sortMode))
  }, [sortMode, templates])

  const recentIds = React.useMemo(() => new Set(recentInsertions.map((item) => item.templateId).filter(Boolean)), [recentInsertions])

  const tagColorByTag = React.useMemo(() => {
    return activeTemplates.reduce<Record<string, string>>((acc, template) => {
      if (template.tag && template.tagColor && !acc[template.tag]) acc[template.tag] = template.tagColor
      return acc
    }, {})
  }, [activeTemplates])

  const allTags = React.useMemo(() => {
    return [...new Set(activeTemplates.map((template) => template.tag).filter(Boolean))] as string[]
  }, [activeTemplates])

  const sidebarTags = React.useMemo(() => {
    const source = folderFilter
      ? activeTemplates.filter((template) => getTemplateFolder(template, defaultFolder) === folderFilter)
      : activeTemplates
    return [...new Set(source.map((template) => template.tag).filter(Boolean))] as string[]
  }, [activeTemplates, defaultFolder, folderFilter])

  const folders = React.useMemo(() => {
    const counts = new Map<string, number>()
    activeTemplates.forEach((template) => {
      const folder = getTemplateFolder(template, defaultFolder)
      counts.set(folder, (counts.get(folder) || 0) + 1)
    })
    return Array.from(counts.entries())
      .map(([name, count]) => ({
        name,
        count,
        templates: activeTemplates.filter((template) => getTemplateFolder(template, defaultFolder) === name),
      }))
      .sort((a, b) => (a.name === defaultFolder ? 1 : b.name === defaultFolder ? -1 : a.name.localeCompare(b.name)))
  }, [activeTemplates, defaultFolder])

  const folderNames = React.useMemo(() => folders.map((folder) => folder.name).filter((folder) => folder !== defaultFolder), [defaultFolder, folders])

  const filteredTemplates = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return activeTemplates.filter((template) => {
      if (mainFilter === 'favorites' && !template.favorite) return false
      if (mainFilter === 'recent' && !recentIds.has(template.id)) return false
      if (folderFilter && getTemplateFolder(template, defaultFolder) !== folderFilter) return false
      if (tagFilters.length > 0 && (!template.tag || !tagFilters.includes(template.tag))) return false
      if (!query) return true
      const folder = getTemplateFolder(template, defaultFolder)
      return (
        template.title.toLowerCase().includes(query) ||
        template.text.toLowerCase().includes(query) ||
        Boolean(template.tag?.toLowerCase().includes(query)) ||
        folder.toLowerCase().includes(query)
      )
    })
  }, [activeTemplates, defaultFolder, folderFilter, mainFilter, recentIds, searchQuery, tagFilters])

  React.useEffect(() => {
    setSelectedIds((current) => current.filter((id) => filteredTemplates.some((template) => template.id === id)))
  }, [filteredTemplates])

  const selectedTemplates = React.useMemo(() => {
    const selected = new Set(selectedIds)
    return activeTemplates.filter((template) => selected.has(template.id))
  }, [activeTemplates, selectedIds])

  const editorOpen = isCreating || Boolean(editingTemplate)
  const allSelected = filteredTemplates.length > 0 && filteredTemplates.every((template) => selectedIds.includes(template.id))
  const tagFilterLabel = tagFilters.length === 0
    ? ui(language, 'С тегами', 'With tags')
    : tagFilters.length === 1
      ? `#${tagFilters[0]}`
      : ui(language, '{{count}} тегов', '{{count}} tags').replace('{{count}}', String(tagFilters.length))

  const toggleTagFilter = (tag: string) => {
    switchTab('templates')
    setMainFilter('all')
    setTagFilters((current) => current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag])
  }

  const handleSaveTemplate = (data: Omit<Template, 'id' | 'createdAt' | 'updatedAt' | 'order' | 'usageCount'>) => {
    if (editingTemplate) {
      updateTemplate(editingTemplate.id, data)
      showToastEvent(translate(language, 'noteUpdated'), 'success')
    } else {
      addTemplate(data)
      showToastEvent(translate(language, 'noteCreated'), 'success')
    }
    closeEditor()
  }

  const closeEditor = () => {
    setEditingTemplate(null)
    setIsCreating(false)
  }

  const createTemplate = () => {
    setIsCreating(true)
    setEditingTemplate(null)
  }

  const duplicateTemplate = (template: TemplateWithFolder) => {
    addTemplate({
      title: `${template.title} ${ui(language, 'копия', 'copy')}`,
      text: template.text,
      tag: template.tag,
      tagColor: template.tagColor,
      color: template.color,
      folder: template.folder || null,
      favorite: false,
    })
    showToastEvent(ui(language, 'Шаблон продублирован', 'Template duplicated'), 'success')
  }

  const exportTemplates = () => {
    const blob = new Blob([JSON.stringify(activeTemplates, null, 2)], { type: 'application/json' })
    const anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(blob)
    anchor.download = `blobnote_v2_${new Date().toISOString().slice(0, 10)}.json`
    anchor.click()
    URL.revokeObjectURL(anchor.href)
    showToastEvent(translate(language, 'templatesExported'), 'success')
  }

  const importFromFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        if (Array.isArray(data)) {
          importTemplates(data)
          showToastEvent(translate(language, 'templatesImported'), 'success')
        }
      } catch {
        showToastEvent(translate(language, 'jsonParseError'), 'error')
      }
    }
    reader.readAsText(file)
  }

  const addScenarioPreset = () => {
    const preset = SCENARIO_PRESETS.find((item) => item.id === scenarioPresetId)
    if (!preset) return
    preset.templates.forEach((template) => addTemplate(template))
    showToastEvent(translate(language, 'scenarioPresetAdded'), 'success')
  }

  const bulkFavorite = (favorite: boolean) => {
    selectedTemplates.forEach((template) => {
      if (template.favorite !== favorite) toggleFavorite(template.id)
    })
    setSelectedIds([])
  }

  const bulkDuplicate = () => {
    selectedTemplates.forEach(duplicateTemplate)
    setSelectedIds([])
  }

  const bulkDelete = () => {
    if (!confirm(ui(language, 'Удалить выбранные шаблоны?', 'Delete selected templates?'))) return
    selectedTemplates.forEach((template) => deleteTemplate(template.id))
    setSelectedIds([])
    showToastEvent(translate(language, 'noteDeleted'), 'success')
  }

  const handleGoogleSignIn = () => {
    if (typeof chrome === 'undefined' || !chrome.runtime?.sendMessage) {
      showToastEvent(ui(language, 'Google-вход доступен только в установленном расширении', 'Google sign-in is available only inside the installed extension'), 'info')
      return
    }

    chrome.runtime.sendMessage({ type: 'GOOGLE_SIGN_IN' }, (response) => {
      if (chrome.runtime.lastError) {
        showToastEvent(chrome.runtime.lastError.message || 'Google sign-in failed', 'error')
        return
      }
      if (response?.success) {
        showToastEvent(ui(language, 'Google-аккаунт подключен', 'Google account connected'), 'success')
      } else {
        showToastEvent(response?.error || ui(language, 'Google-вход пока не настроен', 'Google sign-in is not configured yet'), 'info')
      }
    })
  }

  const applyCardPreset = (preset: AppSettings['cardPreset']) => {
    updateSettings(cardPresetFor(settings.theme, preset))
  }

  return (
    <div
      className={cn(
        embedded ? 'h-full rounded-lg' : 'h-screen',
        settings.theme === 'dark' ? 'dark' : '',
        'flex overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50'
      )}
      style={uiScaleStyle(settings.uiScale)}
    >
      <aside className="hidden w-64 shrink-0 border-r bg-white/95 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/95 lg:flex lg:flex-col">
        <BrandBlock />

        <Button className="mb-4 h-10 w-full text-white shadow-sm" onClick={createTemplate}>
          <Plus className="mr-2 h-4 w-4" />
          {ui(language, 'Новый шаблон', 'New template')}
        </Button>

        <nav className="space-y-1">
          <SidebarButton active={visibleTab === 'templates' && mainFilter === 'all' && !folderFilter && tagFilters.length === 0} icon={<Archive />} label={ui(language, 'Все шаблоны', 'All templates')} count={activeTemplates.length} onClick={() => { switchTab('templates'); setMainFilter('all'); setFolderFilter(null); setTagFilters([]) }} />
          <SidebarButton active={visibleTab === 'templates' && mainFilter === 'favorites'} icon={<Heart />} label={translate(language, 'favorites')} count={activeTemplates.filter((template) => template.favorite).length} onClick={() => { switchTab('templates'); setMainFilter('favorites'); setFolderFilter(null); setTagFilters([]) }} />
          <SidebarButton active={visibleTab === 'templates' && mainFilter === 'recent'} icon={<ClipboardList />} label={ui(language, 'Недавние', 'Recent')} count={recentInsertions.length} onClick={() => { switchTab('templates'); setMainFilter('recent'); setFolderFilter(null); setTagFilters([]) }} />
          {settings.showVariablesTab && (
            <SidebarButton active={visibleTab === 'variables'} icon={<Braces />} label={ui(language, 'Переменные', 'Variables')} count={variables.length} onClick={() => switchTab('variables')} />
          )}
          {settings.showTodoTab && (
            <SidebarButton active={visibleTab === 'todo'} icon={<ListTodo />} label={ui(language, 'Задачи', 'Tasks')} count={todos.length} onClick={() => switchTab('todo')} />
          )}
        </nav>

        {sidebarTags.length > 0 && (
          <div className="mt-5 min-h-0">
            <SidebarTitle label={translate(language, 'tags')} />
            <div className="max-h-[56vh] overflow-y-auto pr-1">
              <div className="flex flex-wrap gap-2">
                {sidebarTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={cn(
                      'm-0.5 rounded-full border px-2.5 py-1 text-xs font-medium shadow-sm transition-colors hover:border-primary/60',
                      tagFilters.includes(tag) && 'border-primary bg-primary/10 text-primary shadow-primary/15'
                    )}
                    style={tagFilters.includes(tag) ? undefined : tagColorStyle(tagColorByTag[tag])}
                    onClick={() => toggleTagFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              {tagFilters.length > 0 && (
                <button
                  type="button"
                  className="mt-2 w-full rounded-lg border bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 shadow-sm transition hover:border-primary/50 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                  onClick={() => setTagFilters([])}
                >
                  {translate(language, 'clearAllTags')}
                </button>
              )}
            </div>
          </div>
        )}
      </aside>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className={cn('shrink-0 border-b bg-white/88 px-5 py-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/88', embedded && 'pr-20')}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="lg:hidden">
                <BrandBlock compact />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-2xl font-bold">{currentBaseTitle(language, visibleTab, mainFilter, folderFilter, tagFilters)}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {visibleTab === 'variables'
                    ? ui(language, '{{count}} переменных', '{{count}} variables').replace('{{count}}', String(variables.length))
                    : visibleTab === 'todo'
                      ? ui(language, '{{count}} задач', '{{count}} tasks').replace('{{count}}', String(todos.length))
                      : ui(language, '{{count}} шаблонов', '{{count}} templates').replace('{{count}}', String(filteredTemplates.length))}
                </p>
              </div>
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
              {visibleTab === 'templates' && (
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input className="h-11 rounded-xl bg-white pl-10 dark:bg-slate-900" placeholder={ui(language, 'Поиск шаблонов...', 'Search templates...')} value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                </div>
              )}
              <Button variant="outline" size="icon" onClick={() => setSettingsOpen(true)} title={translate(language, 'settings')}>
                <Settings2 className="h-4 w-4" />
              </Button>
              {visibleTab === 'templates' && (
                <>
                  <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === 'cards' ? 'table' : 'cards')} title={viewMode === 'cards' ? ui(language, 'Таблица', 'Table') : ui(language, 'Карточки', 'Cards')}>
                    {viewMode === 'cards' ? <LayoutList className="h-4 w-4" /> : <Grid2X2 className="h-4 w-4" />}
                  </Button>
                  <Button className="text-white shadow-sm" onClick={createTemplate}>
                    <Plus className="mr-2 h-4 w-4" />
                    {translate(language, 'createNote')}
                  </Button>
                </>
              )}
            </div>
          </div>

          {visibleTab === 'templates' && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <FilterButton active={mainFilter === 'all' && !folderFilter && tagFilters.length === 0} onClick={() => { setMainFilter('all'); setFolderFilter(null); setTagFilters([]) }}>{ui(language, 'Все', 'All')}</FilterButton>
              <FilterButton active={mainFilter === 'favorites'} onClick={() => { setMainFilter('favorites'); setFolderFilter(null); setTagFilters([]) }}>{translate(language, 'favorites')}</FilterButton>
              <FilterButton active={tagFilters.length > 0} onClick={() => setTagFilters([])}>{tagFilterLabel}</FilterButton>
              {tagFilters.length > 0 && (
                <Button variant="outline" className="h-10 rounded-xl" onClick={() => setTagFilters([])}>
                  <X className="mr-2 h-4 w-4" />
                  {translate(language, 'clearAllTags')}
                </Button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select className="h-10 rounded-xl border bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-900" value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
                <option value="updated">{ui(language, 'Сортировка: по дате изменения', 'Sort: last updated')}</option>
                <option value="usage">{ui(language, 'Сортировка: по использованию', 'Sort: usage')}</option>
                <option value="title">{ui(language, 'Сортировка: по названию', 'Sort: title')}</option>
              </select>
              {viewMode === 'cards' && (
                <>
                  <select className="h-10 rounded-xl border bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-900" value={String(settings.gridCols)} onChange={(event) => updateSettings({ gridCols: Math.max(1, Number(event.target.value) || 3) })}>
                    {[1, 2, 3, 4].map((value) => <option key={value} value={value}>{ui(language, `${value} колонки`, `${value} columns`)}</option>)}
                  </select>
                  <select className="h-10 rounded-xl border bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-900" value={settings.gridHeight} onChange={(event) => updateSettings({ gridHeight: event.target.value })}>
                    {['180px', '220px', '240px', '260px', '320px', 'masonry'].map((value) => <option key={value} value={value}>{value === 'masonry' ? ui(language, 'Авто', 'Auto') : value}</option>)}
                  </select>
                </>
              )}
              <Button variant={massMode ? 'default' : 'outline'} className={cn(massMode && 'text-white')} onClick={() => { setMassMode(!massMode); if (massMode) setSelectedIds([]) }}>
                <CheckSquare className="mr-2 h-4 w-4" />
                {ui(language, 'Массовые действия', 'Bulk actions')}
              </Button>
            </div>
          </div>
          )}
        </header>

        {selectedIds.length > 0 && (
          <div className="shrink-0 border-b bg-indigo-50 px-5 py-3 dark:border-indigo-900/60 dark:bg-indigo-950/40">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="mr-2 font-semibold">{ui(language, 'Выбрано: {{count}}', 'Selected: {{count}}').replace('{{count}}', String(selectedIds.length))}</span>
              <Button size="sm" variant="outline" onClick={() => bulkFavorite(true)}><Heart className="mr-1 h-3.5 w-3.5" />{ui(language, 'В избранное', 'Favorite')}</Button>
              <Button size="sm" variant="outline" onClick={() => bulkFavorite(false)}>{ui(language, 'Убрать избранное', 'Unfavorite')}</Button>
              <Button size="sm" variant="outline" onClick={bulkDuplicate}><Copy className="mr-1 h-3.5 w-3.5" />{ui(language, 'Дублировать', 'Duplicate')}</Button>
              <Button size="sm" variant="destructive" onClick={bulkDelete}><Trash2 className="mr-1 h-3.5 w-3.5" />{ui(language, 'Удалить', 'Delete')}</Button>
              <Button size="sm" variant="ghost" onClick={() => setSelectedIds([])}>{translate(language, 'cancel')}</Button>
            </div>
          </div>
        )}

        <section className="min-h-0 flex-1 overflow-y-auto p-5">
          {visibleTab === 'variables' ? (
            <VariablesPanel />
          ) : visibleTab === 'todo' ? (
            <TodoPanel />
          ) : filteredTemplates.length === 0 ? (
            <div className="mx-auto mt-20 max-w-md rounded-2xl border border-dashed bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Sparkles className="mx-auto mb-3 h-8 w-8 text-primary" />
              <div className="font-semibold">{activeTemplates.length === 0 ? translate(language, 'emptyBase') : translate(language, 'nothingFoundCriteria')}</div>
              {activeTemplates.length === 0 && (
                <Button className="mt-4 text-white" onClick={addScenarioPreset}>{translate(language, 'addStarterNotes')}</Button>
              )}
            </div>
          ) : viewMode === 'cards' ? (
            <div
              className={settings.gridHeight === 'masonry' ? 'gap-4 [column-fill:_balance]' : 'grid gap-4'}
              style={settings.gridHeight === 'masonry'
                ? { columnCount: Math.max(1, settings.gridCols || 3), columnGap: '1rem' }
                : { gridTemplateColumns: `repeat(${Math.max(1, settings.gridCols || 3)}, minmax(0, 1fr))` }}
            >
              {filteredTemplates.map((template) => (
                <div key={template.id} className={settings.gridHeight === 'masonry' ? 'mb-4 break-inside-avoid' : ''}>
                  <TemplateShell
                    massMode={massMode}
                    checked={selectedIds.includes(template.id)}
                    onCheckedChange={(checked) => toggleSelected(template.id, checked, setSelectedIds)}
                  >
                    <TemplateCard
                      template={template}
                      color={template.favorite ? settings.favoriteCardColor : settings.defaultCardColor}
                      textColor={settings.cardTextColor}
                      fontFamily={settings.cardFontFamily}
                      noteFontSize={settings.noteFontSize}
                      noteFontFamily={settings.noteFontFamily}
                      showFullText={settings.gridHeight === 'masonry'}
                      cardStyle={{ minHeight: settings.gridHeight === 'masonry' ? 180 : undefined, height: settings.gridHeight === 'masonry' ? 'auto' : settings.gridHeight }}
                      onOpen={() => setPreviewTemplate(template)}
                      onEdit={() => { setEditingTemplate(template); setIsCreating(false) }}
                      onDelete={() => { if (confirm(translate(language, 'deleteNoteQuestion', { title: template.title }))) deleteTemplate(template.id) }}
                      onToggleFavorite={() => toggleFavorite(template.id)}
                      onCopy={() => { navigator.clipboard.writeText(template.text); showToastEvent(translate(language, 'textCopied'), 'success') }}
                      usageLabel={template.usageCount > 0 ? translate(language, 'usageCount', { count: template.usageCount }) : undefined}
                    />
                  </TemplateShell>
                </div>
              ))}
            </div>
          ) : (
            <TemplateTable
              templates={filteredTemplates}
              selectedIds={selectedIds}
              allSelected={allSelected}
              tagColorByTag={tagColorByTag}
              defaultFolder={defaultFolder}
              language={language}
              onSelectAll={(checked) => setSelectedIds(checked ? filteredTemplates.map((template) => template.id) : [])}
              onSelect={(id, checked) => toggleSelected(id, checked, setSelectedIds)}
              onPreview={setPreviewTemplate}
              onEdit={(template) => { setEditingTemplate(template); setIsCreating(false) }}
              onDuplicate={duplicateTemplate}
              onDelete={(template) => { if (confirm(translate(language, 'deleteNoteQuestion', { title: template.title }))) deleteTemplate(template.id) }}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </section>
      </main>

      {settingsOpen && (
        <SettingsDrawer
          language={language}
          settings={settings}
          scenarioPresetId={scenarioPresetId}
          onScenarioPresetChange={setScenarioPresetId}
          onAddScenarioPreset={addScenarioPreset}
          onClose={() => setSettingsOpen(false)}
          onExport={exportTemplates}
          onImportClick={() => fileInputRef.current?.click()}
          onGoogleSignIn={handleGoogleSignIn}
          onSettingsChange={updateSettings}
          onApplyCardPreset={applyCardPreset}
        />
      )}

      <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) importFromFile(file) }} />

      {editorOpen && (
        <div className="fixed inset-0 z-[2147483630] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
          <div className="max-h-[calc(100vh-48px)] w-[min(760px,calc(100vw-32px))] overflow-y-auto rounded-2xl border bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4 flex items-center justify-between border-b pb-3 dark:border-slate-800">
              <div>
                <div className="font-semibold">{editingTemplate ? translate(language, 'editNote') : translate(language, 'newNote')}</div>
                <div className="text-xs text-slate-500">{translate(language, 'editorNoShift')}</div>
              </div>
              <Button size="icon" variant="ghost" onClick={closeEditor}><X className="h-4 w-4" /></Button>
            </div>
            <TemplateEditor
              template={editingTemplate}
              isNew={isCreating}
              onSave={handleSaveTemplate}
              onCancel={closeEditor}
              allTags={allTags}
              allFolders={folderNames}
              tagColorByTag={tagColorByTag}
              variables={settings.showVariablesTab ? variables : []}
              language={language}
            />
          </div>
        </div>
      )}

      <TemplatePreviewModal
        template={previewTemplate}
        variables={settings.showVariablesTab ? variables : null}
        language={language}
        allowInsert={embedded}
        onInserted={onAfterInsert}
        onClose={() => setPreviewTemplate(null)}
      />
      <ToastContainer />
    </div>
  )
}

function BrandBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('mb-6 flex items-center gap-3', compact && 'mb-0')}>
      <BlobMark />
      <div className={compact ? 'hidden sm:block' : ''}>
        <div className="text-lg font-bold">BlobNote</div>
        {!compact && <div className="text-xs text-slate-500 dark:text-slate-400">V2</div>}
      </div>
    </div>
  )
}

function BlobMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9 shrink-0 drop-shadow-sm" aria-hidden="true">
      <defs>
        <linearGradient id="blobnote-v2-mark" x1="7" y1="6" x2="41" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14c7f3" />
          <stop offset="0.55" stopColor="#2b75ff" />
          <stop offset="1" stopColor="#7c3cff" />
        </linearGradient>
      </defs>
      <path fill="url(#blobnote-v2-mark)" d="M25.3 4.2c6.9.6 8.6 5.3 12.6 9.4 4 4.2 7.6 7.9 6.7 14-.9 6.4-5.8 11.7-12 14.2-6 2.5-13 2.3-18.1-1.3-5.3-3.7-8.8-10.7-7.7-17 1.1-6.1 6.3-10.5 11.1-14.2 2.5-1.9 4.3-5.4 7.4-5.1Z" />
      <rect x="15" y="12" width="18" height="24" rx="5" fill="white" opacity="0.96" />
      <path d="M29 12v7.2c0 1 .8 1.8 1.8 1.8H33" fill="none" stroke="#22c7ef" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M20 22h8M20 27h8M20 32h6" stroke="#386cff" strokeWidth="2.7" strokeLinecap="round" />
      <circle cx="12" cy="37" r="2.5" fill="#7645ff" />
      <circle cx="36" cy="10" r="2.2" fill="#2f7cff" />
    </svg>
  )
}

function TemplateShell({ massMode, checked, onCheckedChange, children }: { massMode: boolean; checked: boolean; onCheckedChange: (checked: boolean) => void; children: React.ReactNode }) {
  return (
    <div className="relative">
      {massMode && (
        <label className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-xl border bg-white/92 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/92">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" checked={checked} onChange={(event) => onCheckedChange(event.target.checked)} />
        </label>
      )}
      {children}
    </div>
  )
}

function TemplateTable({
  templates,
  selectedIds,
  allSelected,
  tagColorByTag,
  defaultFolder,
  language,
  onSelectAll,
  onSelect,
  onPreview,
  onEdit,
  onDuplicate,
  onDelete,
  onToggleFavorite,
}: {
  templates: TemplateWithFolder[]
  selectedIds: string[]
  allSelected: boolean
  tagColorByTag: Record<string, string>
  defaultFolder: string
  language: AppSettings['uiLanguage']
  onSelectAll: (checked: boolean) => void
  onSelect: (id: string, checked: boolean) => void
  onPreview: (template: Template) => void
  onEdit: (template: Template) => void
  onDuplicate: (template: TemplateWithFolder) => void
  onDelete: (template: Template) => void
  onToggleFavorite: (id: string) => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <table className="w-full table-fixed text-sm">
        <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900 dark:text-slate-400">
          <tr>
            <th className="w-12 px-4 py-3"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" checked={allSelected} onChange={(event) => onSelectAll(event.target.checked)} /></th>
            <th className="w-[22%] px-4 py-3">{ui(language, 'Название', 'Title')}</th>
            <th className="px-4 py-3">{ui(language, 'Текст', 'Text')}</th>
            <th className="w-36 px-4 py-3">{ui(language, 'Папка', 'Folder')}</th>
            <th className="w-40 px-4 py-3">{translate(language, 'tags')}</th>
            <th className="w-28 px-4 py-3">{ui(language, 'Использован', 'Used')}</th>
            <th className="w-44 px-4 py-3 text-right">{ui(language, 'Действия', 'Actions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-slate-800">
          {templates.map((template) => (
            <tr key={template.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60">
              <td className="px-4 py-3"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" checked={selectedIds.includes(template.id)} onChange={(event) => onSelect(template.id, event.target.checked)} /></td>
              <td className="px-4 py-3">
                <button className="line-clamp-2 text-left font-semibold hover:text-primary" onClick={() => onPreview(template)}>{template.title}</button>
              </td>
              <td className="px-4 py-3">
                <button className="line-clamp-2 text-left text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white" onClick={() => onPreview(template)}>{template.text}</button>
              </td>
              <td className="px-4 py-3 text-slate-500">{getTemplateFolder(template, defaultFolder)}</td>
              <td className="px-4 py-3">
                {template.tag ? <Badge className="border" style={tagColorStyle(tagColorByTag[template.tag])}>{template.tag}</Badge> : <span className="text-slate-400">-</span>}
              </td>
              <td className="px-4 py-3 text-slate-500">{template.usageCount || 0}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-1">
                  <Button size="icon" variant="ghost" onClick={() => onToggleFavorite(template.id)}><Heart className={cn('h-4 w-4', template.favorite && 'fill-rose-400 text-rose-500')} /></Button>
                  <Button size="icon" variant="ghost" onClick={() => onPreview(template)}><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => onEdit(template)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => onDuplicate(template)}><Copy className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="hover:text-destructive" onClick={() => onDelete(template)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SettingsDrawer({
  language,
  settings,
  scenarioPresetId,
  onScenarioPresetChange,
  onAddScenarioPreset,
  onClose,
  onExport,
  onImportClick,
  onGoogleSignIn,
  onSettingsChange,
  onApplyCardPreset,
}: {
  language: AppSettings['uiLanguage']
  settings: AppSettings
  scenarioPresetId: ScenarioPresetId
  onScenarioPresetChange: (value: ScenarioPresetId) => void
  onAddScenarioPreset: () => void
  onClose: () => void
  onExport: () => void
  onImportClick: () => void
  onGoogleSignIn: () => void
  onSettingsChange: (settings: Partial<AppSettings>) => void
  onApplyCardPreset: (preset: AppSettings['cardPreset']) => void
}) {
  const presets = Object.keys(CARD_PRESETS[settings.theme]) as AppSettings['cardPreset'][]
  const sendDelayOptions = [0, ...Array.from({ length: 13 }, (_, index) => index + 3)].map((value) => ({
    value: String(value),
    label: `${value} ${translate(language, 'secondsShort')}`,
  }))
  const sendMethodOptions = [
    { value: 'auto', label: translate(language, 'sendAuto') },
    { value: 'button', label: translate(language, 'sendButton') },
    { value: 'enter', label: translate(language, 'sendEnter') },
    { value: 'ctrl-enter', label: translate(language, 'sendCtrlEnter') },
    { value: 'shift-enter', label: translate(language, 'sendShiftEnter') },
    { value: 'alt-enter', label: translate(language, 'sendAltEnter') },
  ]

  return (
    <div className="fixed inset-0 z-[2147483632] flex justify-end bg-slate-950/40 backdrop-blur-sm" onMouseDown={onClose}>
      <aside className="h-full w-[min(760px,100vw)] overflow-y-auto border-l bg-white p-5 shadow-2xl dark:border-slate-800 dark:bg-slate-950" onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold">{translate(language, 'settings')}</div>
            <p className="text-sm text-slate-500">{ui(language, 'Понятные настройки: внешний вид, панели, поиск, импорт и готовые наборы.', 'Clear settings: appearance, panels, search, import, and ready-made packs.')}</p>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>

        <TooltipProvider delayDuration={250}>
        <div className="grid items-start gap-3 xl:grid-cols-2">
          <SettingsBlock title={ui(language, 'Основное', 'Basics')}>
            <ToggleLine label={translate(language, 'darkTheme')} checked={settings.theme === 'dark'} onCheckedChange={(checked) => onSettingsChange({ theme: checked ? 'dark' : 'light', ...cardPresetFor(checked ? 'dark' : 'light', settings.cardPreset) })} />
            <SelectLine label={translate(language, 'language')} value={settings.uiLanguage} onChange={(value) => onSettingsChange({ uiLanguage: value as AppSettings['uiLanguage'] })} options={[{ value: 'ru', label: 'RU' }, { value: 'en', label: 'EN' }]} />
            <SelectLine label={translate(language, 'interfaceScale')} value={settings.uiScale} onChange={(value) => onSettingsChange({ uiScale: value as AppSettings['uiScale'] })} options={scaleOptions()} />
          </SettingsBlock>

          <SettingsBlock title={ui(language, 'Раскладка и карточки', 'Layout and cards')}>
              <SelectLine label={ui(language, 'Колонки', 'Columns')} value={String(settings.gridCols)} onChange={(value) => onSettingsChange({ gridCols: Math.max(1, Number(value) || 3) })} options={[1, 2, 3, 4].map((value) => ({ value: String(value), label: ui(language, `${value} колонки`, `${value} columns`) }))} />
            <SelectLine label={ui(language, 'Высота карточки', 'Card height')} value={settings.gridHeight} onChange={(value) => onSettingsChange({ gridHeight: value })} options={['180px', '220px', '240px', '260px', '320px', 'masonry'].map((value) => ({ value, label: value === 'masonry' ? ui(language, 'Авто', 'Auto') : value }))} />
            <SelectLine label={translate(language, 'noteTextSize')} value={settings.noteFontSize} onChange={(value) => onSettingsChange({ noteFontSize: value as AppSettings['noteFontSize'] })} options={['12', '13', '14', '15', '16', '18'].map((value) => ({ value, label: `${value}px` }))} />
            <SelectLine label={translate(language, 'noteFont')} value={settings.noteFontFamily} onChange={(value) => onSettingsChange({ noteFontFamily: value as AppSettings['noteFontFamily'] })} options={[
              { value: 'system', label: ui(language, 'Системный', 'System') },
              { value: 'arial', label: 'Arial' },
              { value: 'georgia', label: 'Georgia' },
              { value: 'mono', label: 'Mono' },
            ]} />
            <div className="rounded-xl bg-white p-3 shadow-sm dark:bg-slate-950">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium"><Palette className="h-4 w-4" />{ui(language, 'Цвет карточек', 'Card colors')}</div>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => {
                  const palette = CARD_PRESETS[settings.theme][preset]
                  return (
                    <button
                      key={preset}
                      type="button"
                      className={cn('rounded-xl border p-2 text-left text-xs transition hover:-translate-y-0.5', settings.cardPreset === preset && 'ring-2 ring-primary')}
                      onClick={() => onApplyCardPreset(preset)}
                    >
                      <span className="mb-2 block font-semibold">{ui(language, PRESET_LABELS[preset].ru, PRESET_LABELS[preset].en)}</span>
                      <span className="flex gap-1">
                        <span className="h-5 flex-1 rounded-md border" style={{ backgroundColor: palette.defaultCardColor }} />
                        <span className="h-5 flex-1 rounded-md border" style={{ backgroundColor: palette.favoriteCardColor }} />
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </SettingsBlock>

          <SettingsBlock title={ui(language, 'Плавающая панель', 'Floating panel')}>
            <ToggleLine label={translate(language, 'floatingPanelNearField')} checked={settings.floatingPanelEnabled} onCheckedChange={(checked) => onSettingsChange({ floatingPanelEnabled: checked })} hint={translate(language, 'floatingPanelHint')} />
            <SelectLine label={ui(language, 'Масштаб панели', 'Panel scale')} value={settings.panelScale} onChange={(value) => onSettingsChange({ panelScale: value as AppSettings['panelScale'] })} options={scaleOptions()} />
            <SelectLine label={ui(language, 'Положение панели', 'Panel position')} value={settings.panelPlacement} onChange={(value) => onSettingsChange({ panelPlacement: value as AppSettings['panelPlacement'] })} options={[
              { value: 'auto', label: ui(language, 'Авто', 'Auto') },
              { value: 'above', label: ui(language, 'Над полем', 'Above field') },
              { value: 'below', label: ui(language, 'Под полем', 'Below field') },
              { value: 'top-right', label: ui(language, 'Сверху справа', 'Top right') },
              { value: 'bottom-right', label: ui(language, 'Снизу справа', 'Bottom right') },
            ]} />
            <ToggleLine label={translate(language, 'clipboardInPanel')} checked={settings.clipboardPanelEnabled} onCheckedChange={(checked) => onSettingsChange({ clipboardPanelEnabled: checked })} hint={translate(language, 'clipboardHint')} />
            <ToggleLine label={ui(language, 'Показывать основные настройки в заголовке панели', 'Show main settings in panel header')} checked={settings.showHeaderControls} onCheckedChange={(checked) => onSettingsChange({ showHeaderControls: checked })} />
          </SettingsBlock>

          <SettingsBlock title={translate(language, 'sendSettings')}>
            <SelectLine
              label={translate(language, 'safeSendDelay')}
              value={String(settings.safeSendDelay)}
              onChange={(value) => {
                const delay = Number(value)
                onSettingsChange({ safeSendDelay: delay, safeSendEnabled: delay > 0 })
              }}
              options={sendDelayOptions}
              hint={translate(language, 'safeSendDelayHint')}
            />
            <SelectLine
              label={translate(language, 'sendMethod')}
              value={settings.sendMethod}
              onChange={(value) => onSettingsChange({ sendMethod: value as AppSettings['sendMethod'] })}
              options={sendMethodOptions}
              hint={translate(language, 'sendMethodHint')}
            />
            {settings.sendMethod === 'button' && (
              <label className="grid gap-1 rounded-xl bg-white p-3 text-sm shadow-sm dark:bg-slate-950">
                <span className="flex items-center gap-1 font-medium">
                  {translate(language, 'sendButtonSelector')}
                  <HintTooltip text={translate(language, 'sendButtonSelectorHint')} />
                </span>
                <Input
                  value={settings.sendButtonSelector || ''}
                  onChange={(event) => onSettingsChange({ sendButtonSelector: event.target.value.trim() || null })}
                  placeholder="button[type='submit']"
                />
              </label>
            )}
          </SettingsBlock>

          <SettingsBlock title={translate(language, 'searchAndModules')}>
            <SelectLine label={translate(language, 'trigger')} value={settings.searchTrigger} onChange={(value) => onSettingsChange({ searchTrigger: value as AppSettings['searchTrigger'] })} options={[{ value: '/', label: '/' }, { value: '@', label: '@' }]} />
            <ToggleLine label={translate(language, 'atSearchInInput', { trigger: settings.searchTrigger })} checked={settings.atMenuEnabled} onCheckedChange={(checked) => onSettingsChange({ atMenuEnabled: checked })} hint={translate(language, 'atSearchHint')} />
            <ToggleLine label={translate(language, 'variablesTab')} checked={settings.showVariablesTab} onCheckedChange={(checked) => onSettingsChange({ showVariablesTab: checked })} />
            <ToggleLine label={translate(language, 'tasksTab')} checked={settings.showTodoTab} onCheckedChange={(checked) => onSettingsChange({ showTodoTab: checked })} />
          </SettingsBlock>

          <SettingsBlock title={translate(language, 'scenarioPresets')}>
            <p className="text-xs leading-relaxed text-slate-500">{translate(language, 'scenarioPresetsHint')}</p>
            <div className="flex gap-2">
              <select className="h-9 min-w-0 flex-1 rounded-lg border bg-white px-2 text-sm dark:border-slate-800 dark:bg-slate-900" value={scenarioPresetId} onChange={(event) => onScenarioPresetChange(event.target.value as ScenarioPresetId)}>
                {SCENARIO_PRESETS.map((preset) => <option key={preset.id} value={preset.id}>{translate(language, preset.labelKey)}</option>)}
              </select>
              <Button className="text-white" onClick={onAddScenarioPreset}>{translate(language, 'addScenarioPreset')}</Button>
            </div>
          </SettingsBlock>

          <SettingsBlock title={translate(language, 'dataManagement')}>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={onExport}><Download className="mr-2 h-4 w-4" />{translate(language, 'export')}</Button>
              <Button variant="outline" onClick={onImportClick}><Upload className="mr-2 h-4 w-4" />{translate(language, 'import')}</Button>
            </div>
            <Button variant="outline" className="w-full justify-center" onClick={onGoogleSignIn}>
              <LogIn className="mr-2 h-4 w-4" />
              {ui(language, 'Войти через Google', 'Sign in with Google')}
            </Button>
            <p className="text-xs leading-relaxed text-slate-500">
              {ui(language, 'Кнопка готова для подключения Google-синхронизации. Когда будет OAuth-клиент, включим полноценную синхронизацию без ручного импорта.', 'The button is ready for Google sync. Once OAuth is configured, full sync can replace manual import.')}
            </p>
          </SettingsBlock>

          <SettingsBlock title={translate(language, 'featureGuide')}>
            <GuideLine icon={<PanelTopOpen />} title={translate(language, 'floatingPanel')} text={translate(language, 'floatingPanelGuide')} />
            <GuideLine icon={<Search />} title={translate(language, 'triggerMenuTitle', { trigger: settings.searchTrigger })} text={translate(language, 'searchGuide')} />
            <GuideLine icon={<Palette />} title={translate(language, 'tags')} text={ui(language, 'Выберите один или несколько тегов слева, чтобы быстро сузить список заметок. Цвет тега помогает визуально цепляться за нужный сценарий.', 'Select one or more tags on the left to narrow the template list. Tag colors make scenarios easier to scan.')} />
            <GuideLine icon={<CheckSquare />} title={ui(language, 'Массовые действия', 'Bulk actions')} text={ui(language, 'Нажмите «Массовые действия», выберите карточки и быстро удалите, продублируйте или добавьте их в избранное.', 'Turn on bulk actions, select cards, then delete, duplicate, or favorite them quickly.')} />
          </SettingsBlock>
        </div>
        </TooltipProvider>
      </aside>
    </div>
  )
}

function SidebarButton({ active, icon, label, count, onClick }: { active: boolean; icon: React.ReactElement; label: string; count: number; onClick: () => void }) {
  return (
    <button type="button" className={cn('flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-slate-100 dark:hover:bg-slate-900', active && 'bg-indigo-50 font-semibold text-primary dark:bg-indigo-950/60')} onClick={onClick}>
      {React.cloneElement(icon, { className: 'h-4 w-4 shrink-0' })}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-900 dark:text-slate-400">{count}</span>
    </button>
  )
}

function SidebarTitle({ label }: { label: string }) {
  return <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</div>
}

function FilterButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return <button type="button" className={cn('rounded-xl border bg-white px-4 py-2 text-sm shadow-sm transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900', active && 'border-primary/40 bg-primary/10 text-primary')} onClick={onClick}>{children}</button>
}

function SettingsBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/70">
      <h2 className="mb-2 font-semibold">{title}</h2>
      <div className="space-y-2.5">{children}</div>
    </section>
  )
}

function ToggleLine({ label, checked, onCheckedChange, hint }: { label: string; checked: boolean; onCheckedChange: (checked: boolean) => void; hint?: string }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-sm shadow-sm dark:bg-slate-950">
      <span>
        <span className="flex items-center gap-1 font-medium">
          {label}
          <HintTooltip text={hint} />
        </span>
        {hint && <span className="mt-1 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{hint}</span>}
      </span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  )
}

function SelectLine({ label, value, options, onChange, hint }: { label: string; value: string; options: Array<{ value: string; label: string }>; onChange: (value: string) => void; hint?: string }) {
  return (
    <label className="grid gap-1 rounded-xl bg-white p-3 text-sm shadow-sm dark:bg-slate-950">
      <span className="flex items-center gap-1 font-medium">
        {label}
        <HintTooltip text={hint} />
      </span>
      <select className="h-9 rounded-lg border bg-white px-2 dark:border-slate-800 dark:bg-slate-900" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  )
}

function HintTooltip({ text }: { text?: string }) {
  if (!text) return null
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="inline-flex h-4 w-4 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200" onClick={(event) => event.preventDefault()}>
          <Info className="h-3 w-3" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" align="start" sideOffset={6} collisionPadding={12} className="max-w-[260px] bg-slate-950 px-3 py-2 text-left leading-relaxed text-white dark:bg-white dark:text-slate-950">
        {text}
      </TooltipContent>
    </Tooltip>
  )
}

function GuideLine({ icon, title, text }: { icon: React.ReactElement; title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-xl bg-white p-3 text-sm shadow-sm dark:bg-slate-950">
      <span className="mt-0.5 text-primary">{React.cloneElement(icon, { className: 'h-4 w-4' })}</span>
      <span>
        <span className="block font-semibold">{title}</span>
        <span className="mt-1 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{text}</span>
      </span>
    </div>
  )
}

function toggleSelected(id: string, checked: boolean, setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>) {
  setSelectedIds((current) => checked ? [...new Set([...current, id])] : current.filter((item) => item !== id))
}

function sortTemplates(sortMode: SortMode) {
  return (a: Template, b: Template) => {
    if (sortMode === 'title') return a.title.localeCompare(b.title)
    if (sortMode === 'usage') return (b.usageCount || 0) - (a.usageCount || 0)
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  }
}

function scaleOptions() {
  return ['70', '80', '90', '100', '110', '120', '130'].map((value) => ({ value, label: `${value}%` }))
}

function getTemplateFolder(template: TemplateWithFolder, fallback: string) {
  return typeof template.folder === 'string' && template.folder.trim() ? template.folder.trim() : fallback
}

function getVisibleBaseTab(tab: ActiveTab, settings: AppSettings): ActiveTab {
  if (tab === 'variables' && !settings.showVariablesTab) return 'templates'
  if (tab === 'todo' && !settings.showTodoTab) return 'templates'
  return tab
}

function currentBaseTitle(language: AppSettings['uiLanguage'], tab: ActiveTab, mainFilter: MainFilter, folderFilter: string | null, tagFilters: string[]) {
  if (tab === 'variables') return ui(language, 'Переменные', 'Variables')
  if (tab === 'todo') return ui(language, 'Задачи', 'Tasks')
  return currentTitle(language, mainFilter, folderFilter, tagFilters)
}

function currentTitle(language: AppSettings['uiLanguage'], mainFilter: MainFilter, folderFilter: string | null, tagFilters: string[]) {
  const tagTitle = tagFilters.length === 0
    ? ''
    : tagFilters.length === 1
      ? `#${tagFilters[0]}`
      : ui(language, '{{count}} тега', '{{count}} tags').replace('{{count}}', String(tagFilters.length))
  if (folderFilter && tagTitle) return `${folderFilter} · ${tagTitle}`
  if (folderFilter) return folderFilter
  if (tagTitle) return tagTitle
  if (mainFilter === 'favorites') return translate(language, 'favorites')
  if (mainFilter === 'recent') return ui(language, 'Недавние', 'Recent')
  return ui(language, 'Все шаблоны', 'All templates')
}

function readStorage(key: string, fallback: string) {
  try {
    return window.localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}

function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {}
}

function ui(language: AppSettings['uiLanguage'], ru: string, en: string) {
  return language === 'en' ? en : ru
}
