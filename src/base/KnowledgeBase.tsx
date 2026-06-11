import React from 'react'
import { useAppStore } from '@/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToastContainer } from '@/components/ui/toast'
import { TemplateCard } from '@/components/base/TemplateCard'
import { TemplateEditor } from '@/components/base/TemplateEditor'
import { TagFilter } from '@/components/base/TagFilter'
import { TemplatePreviewModal } from '@/components/base/TemplatePreviewModal'
import { TodoPanel } from '@/components/base/TodoPanel'
import { VariablesPanel } from '@/components/base/VariablesPanel'
import { showToast as showToastEvent } from '@/components/ui/toast'
import {
  AtSign,
  BookOpen,
  ClipboardList,
  Download,
  FileText,
  LayoutGrid,
  Languages,
  Moon,
  Palette,
  PanelTopOpen,
  Plus,
  RotateCcw,
  Search,
  Star,
  Tags,
  Upload,
  X,
  ZoomIn,
} from 'lucide-react'
import type { AppSettings, Template } from '@/types'
import { CARD_PRESETS, type CardPreset } from '@/lib/cardPresets'
import { LANGUAGE_OPTIONS, translate } from '@/lib/i18n'
import { UI_SCALE_OPTIONS, uiScaleStyle } from '@/lib/uiScale'

const CARD_PRESET_NAMES: Record<AppSettings['cardPreset'], string> = {
  lagoon: 'presetLagoon',
  orchid: 'presetOrchid',
  graphite: 'presetGraphite',
}

type KnowledgeBaseProps = {
  embedded?: boolean
  onAfterInsert?: (autoSend: boolean) => void
}

export function KnowledgeBase({ embedded = false, onAfterInsert }: KnowledgeBaseProps = {}) {
  const {
    templates,
    variables,
    settings,
    updateSettings,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    reorderTemplates,
    toggleFavorite,
    importTemplates,
  } = useAppStore()

  const [searchQuery, setSearchQuery] = React.useState('')
  const [showFavorites, setShowFavorites] = React.useState(false)
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])
  const [editingTemplate, setEditingTemplate] = React.useState<Template | null>(null)
  const [isCreating, setIsCreating] = React.useState(false)
  const [draggingTemplateId, setDraggingTemplateId] = React.useState<string | null>(null)
  const [previewTemplate, setPreviewTemplate] = React.useState<Template | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const t = React.useCallback(
    (key: string, params?: Record<string, string | number>) => translate(settings.uiLanguage, key, params),
    [settings.uiLanguage]
  )

  const activeTab = getVisibleTab(settings)
  const editorOpen = isCreating || Boolean(editingTemplate)

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark')
  }, [settings.theme])

  React.useEffect(() => {
    const nextTab = getVisibleTab(settings)
    if (nextTab !== settings.lastBaseTab) updateSettings({ lastBaseTab: nextTab })
  }, [settings, updateSettings])

  const allTags = React.useMemo(() => {
    return [...new Set(templates.map((template) => template.tag).filter(Boolean))] as string[]
  }, [templates])

  const filteredTemplates = React.useMemo(() => {
    return templates
      .filter((template) => {
        if (showFavorites && !template.favorite) return false
        if (selectedTags.length > 0 && (!template.tag || !selectedTags.includes(template.tag))) return false
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          return (
            template.title.toLowerCase().includes(query) ||
            template.text.toLowerCase().includes(query) ||
            Boolean(template.tag?.toLowerCase().includes(query))
          )
        }
        return true
      })
      .sort((a, b) => a.order - b.order)
  }, [templates, searchQuery, showFavorites, selectedTags])

  const masonryColumns = React.useMemo(() => {
    const columnCount = Math.max(1, settings.gridCols)
    const columns = Array.from({ length: columnCount }, () => ({ height: 0, items: [] as Template[] }))

    filteredTemplates.forEach((template) => {
      const shortestColumn = columns.reduce((shortest, column, index) => column.height < columns[shortest].height ? index : shortest, 0)
      columns[shortestColumn].items.push(template)
      columns[shortestColumn].height += 120 + template.text.length * 0.45 + template.title.length * 0.8
    })

    return columns.map((column) => column.items)
  }, [filteredTemplates, settings.gridCols])

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(templates, null, 2)], { type: 'application/json' })
    const anchor = document.createElement('a')
    anchor.href = URL.createObjectURL(blob)
    anchor.download = `blobnote_backup_${new Date().toISOString().slice(0, 10)}.json`
    anchor.click()
    showToastEvent(t('templatesExported'), 'success')
  }

  const handleImport = (file: File) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string)
        if (Array.isArray(data)) {
          importTemplates(data)
          showToastEvent(t('templatesImported'), 'success')
        }
      } catch {
        showToastEvent(t('jsonParseError'), 'error')
      }
    }
    reader.readAsText(file)
  }

  const handleDropTemplate = (targetId: string) => {
    if (!draggingTemplateId || draggingTemplateId === targetId) return

    const templateIds = filteredTemplates.map((template) => template.id)
    const fromIndex = templateIds.indexOf(draggingTemplateId)
    const toIndex = templateIds.indexOf(targetId)
    if (fromIndex === -1 || toIndex === -1) return

    const nextIds = [...templateIds]
    const [movedId] = nextIds.splice(fromIndex, 1)
    nextIds.splice(toIndex, 0, movedId)
    reorderTemplates(nextIds)
    setDraggingTemplateId(null)
  }

  const handleSaveTemplate = (data: Omit<Template, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
    if (editingTemplate) {
      updateTemplate(editingTemplate.id, data)
      showToastEvent(t('noteUpdated'), 'success')
    } else {
      addTemplate(data)
      showToastEvent(t('noteCreated'), 'success')
    }
    closeEditor()
  }

  const closeEditor = () => {
    setEditingTemplate(null)
    setIsCreating(false)
  }

  const addStarterTemplates = () => {
    [
      {
        title: 'Приветствие',
        tag: 'Старт',
        favorite: true,
        color: 'blue',
        text: 'Здравствуйте! Меня зовут {{agent_name}}. Уже смотрю ваш вопрос и скоро вернусь с ответом.',
      },
      {
        title: 'Уточнение данных',
        tag: 'Поддержка',
        favorite: true,
        color: 'amber',
        text: 'Подскажите, пожалуйста, номер заказа и телефон, который был указан при оформлении. Так я быстрее найду информацию.',
      },
      {
        title: 'Пауза на проверку',
        tag: 'Поддержка',
        favorite: false,
        color: 'slate',
        text: 'Спасибо, взял(а) в работу. Мне понадобится несколько минут, чтобы всё проверить.',
      },
      {
        title: 'Завершение',
        tag: 'Финал',
        favorite: false,
        color: 'green',
        text: 'Рад(а), что удалось помочь. Если появятся ещё вопросы, напишите нам в любое время.',
      },
    ].forEach((template) => addTemplate(template))
    showToastEvent(t('starterAdded'), 'success')
  }

  const applyPreset = (preset: CardPreset) => {
    updateSettings({
      cardPreset: preset.cardPreset,
      defaultCardColor: preset.defaultCardColor,
      favoriteCardColor: preset.favoriteCardColor,
      cardTextColor: preset.cardTextColor,
      cardFontFamily: preset.cardFontFamily,
    })
  }

  const resetAppearance = () => applyPreset(CARD_PRESETS[settings.theme].lagoon)

  return (
    <div
      className={`${embedded ? 'h-full' : 'h-screen'} ${settings.theme === 'dark' ? 'dark' : ''} flex flex-col overflow-hidden bg-background text-foreground`}
      style={uiScaleStyle(settings.uiScale)}
    >
      <header className={`z-30 flex shrink-0 flex-wrap items-center justify-between gap-4 border-b bg-background px-4 py-2 shadow-sm ${embedded ? 'pr-16' : ''}`}>
        <h1 className="flex shrink-0 items-center gap-3 text-sm font-semibold">
          <BrandLogo title={t('appName')} />
          <span className="sr-only">{t('appName')}</span>
          <span className="hidden whitespace-nowrap text-muted-foreground sm:inline">{t('baseSubtitle')}</span>
        </h1>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <SettingSelect
            icon={<Languages className="h-3.5 w-3.5" />}
            label={t('language')}
            value={settings.uiLanguage}
            onChange={(value) => updateSettings({ uiLanguage: value as AppSettings['uiLanguage'] })}
            options={LANGUAGE_OPTIONS}
          />
          <SettingSwitch icon={<Moon className="h-3.5 w-3.5" />} label={t('darkTheme')} checked={settings.theme === 'dark'} onCheckedChange={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })} />
          <SettingSelect
            icon={<ZoomIn className="h-3.5 w-3.5" />}
            label={t('interfaceScale')}
            value={settings.uiScale}
            onChange={(value) => updateSettings({ uiScale: value as AppSettings['uiScale'] })}
            options={UI_SCALE_OPTIONS}
          />
          <SettingSelect
            icon={<AtSign className="h-3.5 w-3.5" />}
            label={t('trigger')}
            value={settings.searchTrigger}
            onChange={(value) => updateSettings({ searchTrigger: value as AppSettings['searchTrigger'] })}
            options={[{ value: '/', label: '/' }, { value: '@', label: '@' }]}
          />
          <SettingSwitch icon={<AtSign className="h-3.5 w-3.5" />} label={`${settings.searchTrigger}-${t('atSearch')}`} checked={settings.atMenuEnabled} onCheckedChange={(checked) => updateSettings({ atMenuEnabled: checked })} />
          <SettingSwitch icon={<PanelTopOpen className="h-3.5 w-3.5" />} label={t('panel')} checked={settings.floatingPanelEnabled} onCheckedChange={(checked) => updateSettings({ floatingPanelEnabled: checked })} />
          <SettingSwitch icon={<ClipboardList className="h-3.5 w-3.5" />} label={t('clipboard')} checked={settings.clipboardPanelEnabled} onCheckedChange={(checked) => updateSettings({ clipboardPanelEnabled: checked })} />
          <SettingSwitch icon={<BookOpen className="h-3.5 w-3.5" />} label={t('variables')} checked={settings.showVariablesTab} onCheckedChange={(checked) => updateSettings({ showVariablesTab: checked })} />
          <SettingSwitch icon={<FileText className="h-3.5 w-3.5" />} label={t('tasks')} checked={settings.showTodoTab} onCheckedChange={(checked) => updateSettings({ showTodoTab: checked })} />

          <select className="h-8 rounded-md border bg-background px-2 text-xs" value={settings.gridCols} onChange={(event) => updateSettings({ gridCols: parseInt(event.target.value, 10) })} title={t('columnsCount')}>
            <option value={2}>{t('gridCols2')}</option>
            <option value={3}>{t('gridCols3')}</option>
            <option value={4}>{t('gridCols4')}</option>
            <option value={5}>{t('gridCols5')}</option>
          </select>

          <select className="h-8 rounded-md border bg-background px-2 text-xs" value={settings.gridHeight} onChange={(event) => updateSettings({ gridHeight: event.target.value })} title={t('cardHeight')}>
            <option value="180px">180px</option>
            <option value="240px">240px</option>
            <option value="320px">320px</option>
            <option value="max-content">{t('auto')}</option>
          </select>

          <Button size="icon" variant="outline" onClick={handleExport} title={t('export')}><Download className="h-3.5 w-3.5" /></Button>
          <Button size="icon" variant="outline" onClick={() => fileInputRef.current?.click()} title={t('import')}><Upload className="h-3.5 w-3.5" /></Button>
          <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={(event) => { const file = event.target.files?.[0]; if (file) handleImport(file) }} />
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <Tabs value={activeTab} onValueChange={(value) => updateSettings({ lastBaseTab: value as AppSettings['lastBaseTab'] })} className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="z-20 shrink-0 border-b bg-background px-5 py-3 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <TabsList>
                <TabsTrigger value="templates"><FileText className="mr-1.5 h-3.5 w-3.5" />{t('notesAndTemplates')}</TabsTrigger>
                {settings.showVariablesTab && <TabsTrigger value="variables"><BookOpen className="mr-1.5 h-3.5 w-3.5" />{t('variables')}</TabsTrigger>}
                {settings.showTodoTab && <TabsTrigger value="todo"><LayoutGrid className="mr-1.5 h-3.5 w-3.5" />{t('tasks')}</TabsTrigger>}
              </TabsList>

              <div className="flex flex-wrap items-center gap-2">
                <PresetStrip theme={settings.theme} language={settings.uiLanguage} onApply={applyPreset} />
                <Button size="sm" variant="outline" onClick={resetAppearance} title={t('resetCards')}>
                  <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                  {t('resetCards')}
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="templates" className="m-0 flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="shrink-0 border-b bg-background px-5 py-3 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[260px] flex-1 max-w-xl">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder={t('searchNotesPlaceholder')} className="pl-9" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                </div>

                <TagFilter tags={allTags} selected={selectedTags} language={settings.uiLanguage} onChange={setSelectedTags} />

                <Button size="sm" variant={showFavorites ? 'accent' : 'outline'} onClick={() => setShowFavorites(!showFavorites)}>
                  <Star className={`mr-1.5 h-3.5 w-3.5 ${showFavorites ? 'fill-current' : ''}`} />
                  {t('favorites')}
                </Button>

                <Button size="sm" onClick={() => { setIsCreating(true); setEditingTemplate(null) }}>
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  {t('createNote')}
                </Button>
              </div>

              {selectedTags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setSelectedTags([])}>
                    {t('clearAllTags')}
                  </Button>
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground" onClick={() => setSelectedTags(selectedTags.filter((item) => item !== tag))}>
                      <Tags className="mr-1 h-3 w-3" />
                      {tag}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              {filteredTemplates.length === 0 ? (
                <div className="mx-auto mt-16 max-w-md rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                  <div>{templates.length === 0 ? t('emptyBase') : t('nothingFoundCriteria')}</div>
                  {templates.length === 0 && (
                    <Button size="sm" variant="outline" className="mt-4" onClick={addStarterTemplates}>{t('addStarterNotes')}</Button>
                  )}
                </div>
              ) : settings.gridHeight === 'max-content' ? (
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${settings.gridCols}, minmax(0, 1fr))` }}>
                  {masonryColumns.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex min-w-0 flex-col gap-4">
                      {column.map((template) => renderTemplateCard(template, true))}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${settings.gridCols}, minmax(0, 1fr))` }}>
                  {filteredTemplates.map((template) => renderTemplateCard(template, false))}
                </div>
              )}
            </div>
          </TabsContent>

          {settings.showVariablesTab && (
            <TabsContent value="variables" className="m-0 min-h-0 flex-1 overflow-y-auto bg-background">
              <VariablesPanel />
            </TabsContent>
          )}

          {settings.showTodoTab && (
            <TabsContent value="todo" className="m-0 min-h-0 flex-1 overflow-y-auto bg-background">
              <TodoPanel />
            </TabsContent>
          )}
        </Tabs>
      </main>

      {editorOpen && (
        <div className="fixed inset-0 z-[2147483630] flex animate-in fade-in items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm duration-150">
          <div className="max-h-[calc(100vh-48px)] w-[min(760px,calc(100vw-32px))] animate-in zoom-in-95 overflow-y-auto rounded-lg border bg-background p-5 text-foreground shadow-2xl duration-150">
            <div className="mb-4 flex items-center justify-between gap-3 border-b pb-3">
              <div>
                <div className="text-sm font-semibold">{editingTemplate ? t('editNote') : t('newNote')}</div>
                <div className="text-xs text-muted-foreground">{t('editorNoShift')}</div>
              </div>
              <Button size="icon" variant="ghost" onClick={closeEditor}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <TemplateEditor
              template={editingTemplate}
              isNew={isCreating}
              onSave={handleSaveTemplate}
              onCancel={closeEditor}
              allTags={allTags}
              variables={settings.showVariablesTab ? variables : []}
              language={settings.uiLanguage}
            />
          </div>
        </div>
      )}

      <TemplatePreviewModal
        template={previewTemplate}
        variables={settings.showVariablesTab ? variables : null}
        language={settings.uiLanguage}
        allowInsert={embedded}
        onInserted={onAfterInsert}
        onClose={() => setPreviewTemplate(null)}
      />
      <ToastContainer />
    </div>
  )

  function renderTemplateCard(template: Template, showFullText: boolean) {
    return (
      <TemplateCard
        key={template.id}
        template={template}
        color={template.favorite ? settings.favoriteCardColor : settings.defaultCardColor}
        textColor={settings.cardTextColor}
        fontFamily={settings.cardFontFamily}
        showFullText={showFullText}
        onOpen={() => setPreviewTemplate(template)}
        onEdit={() => { setEditingTemplate(template); setIsCreating(false) }}
        onDelete={() => { if (confirm(t('deleteNoteQuestion', { title: template.title }))) { deleteTemplate(template.id); showToastEvent(t('noteDeleted'), 'success') } }}
        onToggleFavorite={() => toggleFavorite(template.id)}
        onCopy={() => { navigator.clipboard.writeText(template.text); showToastEvent(t('textCopied'), 'success') }}
        cardStyle={showFullText ? undefined : { height: settings.gridHeight }}
        draggable={!showFullText}
        onDragStart={() => setDraggingTemplateId(template.id)}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => { event.preventDefault(); handleDropTemplate(template.id) }}
      />
    )
  }
}

function BrandLogo({ title }: { title: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-foreground">
      <svg
        aria-hidden="true"
        className="h-8 w-8 shrink-0"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blobnote-mark-gradient" x1="10" y1="8" x2="54" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor="#09B8F5" />
            <stop offset="0.55" stopColor="#2C6DF6" />
            <stop offset="1" stopColor="#7037F4" />
          </linearGradient>
          <linearGradient id="blobnote-line-gradient" x1="22" y1="28" x2="43" y2="43" gradientUnits="userSpaceOnUse">
            <stop stopColor="#16B7F3" />
            <stop offset="1" stopColor="#6E3DF4" />
          </linearGradient>
        </defs>
        <path
          d="M12.5 38.5C7.8 28.7 12.7 15.3 23.4 10.2C32 6.1 42.7 8.3 48.9 15.7C54.8 22.8 56.2 34.8 50.8 43.6C44.7 53.5 30.9 57.8 20.9 52.4C14.9 49.2 10.8 43.6 12.5 38.5Z"
          fill="url(#blobnote-mark-gradient)"
        />
        <circle cx="51.5" cy="14.5" r="4.5" fill="#2D74F7" />
        <circle cx="11" cy="50" r="3.8" fill="#6D38F3" />
        <path
          d="M21 19.5C21 16.5 23.5 14 26.5 14H38.5L48 23.5V41.5C48 45.1 45.1 48 41.5 48H26.5C23.5 48 21 45.5 21 42.5V19.5Z"
          fill="white"
        />
        <path d="M38.5 14V23.5H48" fill="#C9F3FF" />
        <path d="M38.5 14V21.5C38.5 22.6 39.4 23.5 40.5 23.5H48" stroke="#18AEEB" strokeWidth="2" strokeLinejoin="round" />
        <path d="M27 29.5H38.5" stroke="url(#blobnote-line-gradient)" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M27 36H42" stroke="url(#blobnote-line-gradient)" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M27 42.5H37" stroke="url(#blobnote-line-gradient)" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
      <span className="text-base font-bold leading-none text-foreground">{title}</span>
    </span>
  )
}

function SettingSwitch({
  icon,
  label,
  checked,
  onCheckedChange,
}: {
  icon: React.ReactNode
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <label className="flex h-8 min-w-[150px] shrink-0 items-center justify-between gap-2 rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground shadow-sm">
      {icon}
      <span className="min-w-0 truncate">{label}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </label>
  )
}

function SettingSelect({
  icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: React.ReactNode
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
}) {
  return (
    <label className="flex h-8 min-w-[170px] shrink-0 items-center justify-between gap-2 rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground shadow-sm">
      {icon}
      <span className="min-w-0 truncate">{label}</span>
      <select className="h-6 min-w-[48px] rounded border bg-background px-1 text-xs text-foreground" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  )
}

function PresetStrip({
  theme,
  language,
  onApply,
}: {
  theme: AppSettings['theme']
  language: AppSettings['uiLanguage']
  onApply: (preset: CardPreset) => void
}) {
  return (
    <div className="flex items-center gap-1 rounded-md border bg-background px-2 py-1" title={translate(language, 'cardPresets')}>
      <Palette className="h-3.5 w-3.5 text-muted-foreground" />
      {Object.values(CARD_PRESETS[theme]).map((preset) => (
        <button
          key={preset.cardPreset}
          type="button"
          className="h-6 rounded-md border px-2 text-[11px] hover:bg-muted"
          onClick={() => onApply(preset)}
          style={{ background: preset.defaultCardColor, color: preset.cardTextColor }}
        >
          {translate(language, CARD_PRESET_NAMES[preset.cardPreset])}
        </button>
      ))}
    </div>
  )
}

function getVisibleTab(settings: AppSettings): AppSettings['lastBaseTab'] {
  if (settings.lastBaseTab === 'variables' && !settings.showVariablesTab) return 'templates'
  if (settings.lastBaseTab === 'todo' && !settings.showTodoTab) return 'templates'
  return settings.lastBaseTab
}
