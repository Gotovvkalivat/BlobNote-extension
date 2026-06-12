import { create } from 'zustand'
import type { Template, CRMBinding, AppSettings, Toast, TemplateVariable, TodoItem, RecentInsertion, SendMethod, SiteSettings } from '@/types'
import { generateId } from '@/lib/utils'
import { cardPresetFor, normalizeCardPreset } from '@/lib/cardPresets'
import { isLanguage } from '@/lib/i18n'
import { normalizeTagColor } from '@/lib/tagColors'
import { normalizeUiScale } from '@/lib/uiScale'

interface AppState {
  templates: Template[]
  bindings: CRMBinding[]
  variables: TemplateVariable[]
  todos: TodoItem[]
  recentInsertions: RecentInsertion[]
  settings: AppSettings
  toasts: Toast[]
  hydrated: boolean

  hydrate: () => Promise<void>

  addTemplate: (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt' | 'order' | 'usageCount' | 'tagColor'> & { tagColor?: string | null }) => void
  updateTemplate: (id: string, updates: Partial<Template>) => void
  deleteTemplate: (id: string) => void
  reorderTemplates: (templateIds: string[]) => void
  toggleFavorite: (id: string) => void
  recordTemplateUse: (template: Pick<Template, 'id' | 'title' | 'text' | 'tag'>) => void

  addVariable: (variable: Omit<TemplateVariable, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateVariable: (id: string, updates: Partial<TemplateVariable>) => void
  deleteVariable: (id: string) => void

  addTodo: (todo: string | { text: string; dueAt?: string | null; reminderAt?: string | null; priority?: TodoItem['priority'] }) => void
  updateTodo: (id: string, updates: Partial<TodoItem>) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  clearDoneTodos: () => void

  addBinding: (binding: Omit<CRMBinding, 'id' | 'createdAt'>) => void
  deleteBinding: (id: string) => void

  updateSettings: (settings: Partial<AppSettings>) => void

  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void

  importTemplates: (templates: Partial<Template>[]) => void
}

type RawBinding = {
  textarea?: string
  sendBtn?: string | null
  textareaSelector?: string
  sendBtnSelector?: string | null
}

type RawBindingMap = Record<string, RawBinding>

type SyncSnapshot = {
  templates: Partial<Template>[]
  variables: Partial<TemplateVariable>[]
  todos: Partial<TodoItem>[]
  recentInsertions: Partial<RecentInsertion>[]
  customBindings: RawBindingMap
  theme: AppSettings['theme']
  uiLanguage: AppSettings['uiLanguage']
  uiScale: AppSettings['uiScale']
  panelScale: AppSettings['panelScale']
  panelPlacement: AppSettings['panelPlacement']
  panelCompactMode: boolean
  safeSendEnabled: boolean
  safeSendDelay: number
  sendMethod: SendMethod
  sendButtonSelector: string | null
  atMenuEnabled: boolean
  floatingPanelEnabled: boolean
  clipboardPanelEnabled: boolean
  searchTrigger: AppSettings['searchTrigger']
  cardPreset: AppSettings['cardPreset']
  activationMode: AppSettings['activationMode']
  enabledHosts: string[]
  defaultCardColor: string
  favoriteCardColor: string
  cardTextColor: string
  cardFontFamily: string
  showVariablesTab: boolean
  showTodoTab: boolean
  lastBaseTab: AppSettings['lastBaseTab']
  gridCols: number
  gridHeight: string
  onboardingCompleted: boolean
  siteSettings: Record<string, SiteSettings>
}

const defaultSettings: AppSettings = {
  theme: 'light',
  uiLanguage: 'ru',
  uiScale: '100',
  panelScale: '100',
  panelPlacement: 'auto',
  panelCompactMode: false,
  safeSendEnabled: false,
  safeSendDelay: 0,
  sendMethod: 'auto',
  sendButtonSelector: null,
  atMenuEnabled: false,
  floatingPanelEnabled: true,
  clipboardPanelEnabled: false,
  searchTrigger: '/',
  activationMode: 'all',
  enabledHosts: [],
  ...cardPresetFor('light', 'lagoon'),
  showVariablesTab: false,
  showTodoTab: false,
  lastBaseTab: 'templates',
  gridCols: 3,
  gridHeight: '240px',
  onboardingCompleted: false,
  siteSettings: {},
}

const defaultSnapshot: SyncSnapshot = {
  templates: [],
  variables: [],
  todos: [],
  recentInsertions: [],
  customBindings: {},
  ...defaultSettings,
}

let storageListenerAttached = false
let initialHydrateStarted = false

function hasChromeStorage() {
  return typeof chrome !== 'undefined' && Boolean(chrome.storage?.sync)
}

function chromeGet<T extends Record<string, unknown>>(defaults: T): Promise<T> {
  if (!hasChromeStorage()) return Promise.resolve(defaults)

  return new Promise((resolve) => {
    chrome.storage.sync.get(defaults, (items) => {
      resolve(items as T)
    })
  })
}

function chromeSet(items: Record<string, unknown>) {
  if (!hasChromeStorage()) return
  chrome.storage.sync.set(items)
}

function normalizeTemplate(template: Partial<Template>, index: number): Template {
  const now = new Date().toISOString()

  return {
    id: template.id || generateId(),
    title: String(template.title || '').trim() || 'Без названия',
    text: String(template.text || ''),
    tag: template.tag ? String(template.tag) : null,
    tagColor: normalizeTagColor(template.tagColor),
    color: template.color ? String(template.color) : null,
    favorite: Boolean(template.favorite),
    usageCount: typeof template.usageCount === 'number' && template.usageCount > 0 ? Math.floor(template.usageCount) : 0,
    createdAt: template.createdAt || now,
    updatedAt: template.updatedAt || now,
    order: typeof template.order === 'number' ? template.order : index,
  }
}

function normalizeTemplates(templates: Partial<Template>[] = []) {
  return templates.map(normalizeTemplate).sort((a, b) => a.order - b.order)
}

function normalizeVariable(variable: Partial<TemplateVariable>): TemplateVariable {
  const now = new Date().toISOString()

  return {
    id: variable.id || generateId(),
    name: String(variable.name || '').trim(),
    value: String(variable.value || ''),
    createdAt: variable.createdAt || now,
    updatedAt: variable.updatedAt || now,
  }
}

function normalizeVariables(variables: Partial<TemplateVariable>[] = []) {
  return variables.map(normalizeVariable).filter((variable) => variable.name)
}

function normalizeTodo(todo: Partial<TodoItem>): TodoItem {
  return {
    id: todo.id || generateId(),
    text: String(todo.text || '').trim(),
    done: Boolean(todo.done),
    dueAt: todo.dueAt ? String(todo.dueAt) : null,
    reminderAt: todo.reminderAt ? String(todo.reminderAt) : null,
    priority: todo.priority === 'low' || todo.priority === 'high' ? todo.priority : 'normal',
    createdAt: todo.createdAt || new Date().toISOString(),
  }
}

function normalizeTodos(todos: Partial<TodoItem>[] = []) {
  return todos.map(normalizeTodo).filter((todo) => todo.text)
}

function normalizeRecentInsertion(item: Partial<RecentInsertion>, index: number): RecentInsertion {
  return {
    id: item.id || generateId(),
    templateId: item.templateId ? String(item.templateId) : null,
    title: String(item.title || '').trim() || 'Шаблон',
    text: String(item.text || ''),
    tag: item.tag ? String(item.tag) : null,
    usedAt: item.usedAt || new Date(Date.now() - index).toISOString(),
    host: item.host ? String(item.host) : null,
  }
}

function normalizeRecentInsertions(items: Partial<RecentInsertion>[] = []) {
  return items
    .map(normalizeRecentInsertion)
    .filter((item) => item.text)
    .sort((a, b) => new Date(b.usedAt).getTime() - new Date(a.usedAt).getTime())
    .slice(0, 10)
}

function normalizePanelPlacement(value: unknown): AppSettings['panelPlacement'] {
  return value === 'above' || value === 'below' || value === 'top-right' || value === 'bottom-right' ? value : 'auto'
}

function normalizeSafeSendDelay(value: unknown) {
  const numeric = typeof value === 'number' ? value : parseInt(String(value || ''), 10)
  if (Number.isNaN(numeric)) return defaultSettings.safeSendDelay
  if (numeric <= 0) return 0
  return Math.min(15, Math.max(3, numeric))
}

function normalizeSendMethod(value: unknown): SendMethod {
  return value === 'button' || value === 'enter' || value === 'ctrl-enter' || value === 'shift-enter' || value === 'alt-enter'
    ? value
    : 'auto'
}

function normalizeSendButtonSelector(value: unknown) {
  const selector = typeof value === 'string' ? value.trim() : ''
  return selector || null
}

function normalizeSiteSettings(value: unknown): Record<string, SiteSettings> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  return Object.entries(value as Record<string, Partial<SiteSettings>>).reduce<Record<string, SiteSettings>>((acc, [host, settings]) => {
    if (!host || !settings || typeof settings !== 'object') return acc
    const next: SiteSettings = {}
    if (settings.uiScale) next.uiScale = normalizeUiScale(settings.uiScale)
    if (settings.panelScale) next.panelScale = normalizeUiScale(settings.panelScale)
    if (settings.panelPlacement) next.panelPlacement = normalizePanelPlacement(settings.panelPlacement)
    if (typeof settings.panelCompactMode === 'boolean') next.panelCompactMode = settings.panelCompactMode
    if (settings.sendMethod) next.sendMethod = normalizeSendMethod(settings.sendMethod)
    if ('sendButtonSelector' in settings) next.sendButtonSelector = normalizeSendButtonSelector(settings.sendButtonSelector)
    if (Object.keys(next).length > 0) acc[host] = next
    return acc
  }, {})
}

function bindingsFromMap(map: RawBindingMap = {}): CRMBinding[] {
  return Object.entries(map).map(([domain, binding]) => ({
    id: domain,
    domain,
    textareaSelector: binding.textareaSelector || binding.textarea || '',
    sendBtnSelector: binding.sendBtnSelector ?? binding.sendBtn ?? null,
    createdAt: new Date().toISOString(),
  })).filter((binding) => binding.textareaSelector)
}

function mapFromBindings(bindings: CRMBinding[]): RawBindingMap {
  return bindings.reduce<RawBindingMap>((acc, binding) => {
    acc[binding.domain] = {
      textarea: binding.textareaSelector,
      sendBtn: binding.sendBtnSelector,
    }
    return acc
  }, {})
}

function snapshotToState(snapshot: SyncSnapshot) {
  const theme: AppSettings['theme'] = snapshot.theme === 'dark' ? 'dark' : 'light'
  const cardPreset: AppSettings['cardPreset'] = normalizeCardPreset(snapshot.cardPreset)
  const searchTrigger: AppSettings['searchTrigger'] = snapshot.searchTrigger === '@' ? '@' : '/'

  return {
    templates: normalizeTemplates(snapshot.templates),
    variables: normalizeVariables(snapshot.variables),
    todos: normalizeTodos(snapshot.todos),
    recentInsertions: normalizeRecentInsertions(snapshot.recentInsertions),
    bindings: bindingsFromMap(snapshot.customBindings),
    settings: {
      theme,
      uiLanguage: isLanguage(snapshot.uiLanguage) ? snapshot.uiLanguage : defaultSettings.uiLanguage,
      uiScale: normalizeUiScale(snapshot.uiScale),
      panelScale: normalizeUiScale(snapshot.panelScale),
      panelPlacement: normalizePanelPlacement(snapshot.panelPlacement),
      panelCompactMode: snapshot.panelCompactMode ?? defaultSettings.panelCompactMode,
      safeSendEnabled: snapshot.safeSendEnabled ?? defaultSettings.safeSendEnabled,
      safeSendDelay: snapshot.safeSendEnabled ? normalizeSafeSendDelay(snapshot.safeSendDelay) : 0,
      sendMethod: normalizeSendMethod(snapshot.sendMethod),
      sendButtonSelector: normalizeSendButtonSelector(snapshot.sendButtonSelector),
      atMenuEnabled: snapshot.atMenuEnabled ?? defaultSettings.atMenuEnabled,
      floatingPanelEnabled: snapshot.floatingPanelEnabled ?? defaultSettings.floatingPanelEnabled,
      clipboardPanelEnabled: snapshot.clipboardPanelEnabled ?? defaultSettings.clipboardPanelEnabled,
      searchTrigger,
      activationMode: snapshot.activationMode || defaultSettings.activationMode,
      enabledHosts: Array.isArray(snapshot.enabledHosts) ? snapshot.enabledHosts : defaultSettings.enabledHosts,
      ...cardPresetFor(theme, cardPreset),
      showVariablesTab: snapshot.showVariablesTab ?? defaultSettings.showVariablesTab,
      showTodoTab: snapshot.showTodoTab ?? defaultSettings.showTodoTab,
      lastBaseTab: snapshot.lastBaseTab || defaultSettings.lastBaseTab,
      gridCols: snapshot.gridCols || defaultSettings.gridCols,
      gridHeight: snapshot.gridHeight || defaultSettings.gridHeight,
      onboardingCompleted: snapshot.onboardingCompleted ?? defaultSettings.onboardingCompleted,
      siteSettings: normalizeSiteSettings(snapshot.siteSettings),
    },
    hydrated: true,
  }
}

function attachStorageListener() {
  if (storageListenerAttached || typeof chrome === 'undefined' || !chrome.storage?.onChanged) return
  storageListenerAttached = true

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return

    const state = useAppStore.getState()
    const nextSettings = { ...state.settings }
    let settingsChanged = false
    const patch: Partial<AppState> = {}

    if (changes.templates) patch.templates = normalizeTemplates(changes.templates.newValue || [])
    if (changes.variables) patch.variables = normalizeVariables(changes.variables.newValue || [])
    if (changes.todos) patch.todos = normalizeTodos(changes.todos.newValue || [])
    if (changes.recentInsertions) patch.recentInsertions = normalizeRecentInsertions(changes.recentInsertions.newValue || [])
    if (changes.customBindings) patch.bindings = bindingsFromMap(changes.customBindings.newValue || {})

    let cardPresetChanged = false

    if (changes.theme) {
      nextSettings.theme = changes.theme.newValue === 'dark' ? 'dark' : 'light'
      settingsChanged = true
      cardPresetChanged = true
    }

    if (changes.uiLanguage) {
      nextSettings.uiLanguage = isLanguage(changes.uiLanguage.newValue) ? changes.uiLanguage.newValue : defaultSettings.uiLanguage
      settingsChanged = true
    }

    if (changes.uiScale) {
      nextSettings.uiScale = normalizeUiScale(changes.uiScale.newValue)
      settingsChanged = true
    }

    if (changes.panelScale) {
      nextSettings.panelScale = normalizeUiScale(changes.panelScale.newValue)
      settingsChanged = true
    }

    if (changes.panelPlacement) {
      nextSettings.panelPlacement = normalizePanelPlacement(changes.panelPlacement.newValue)
      settingsChanged = true
    }

    if (changes.panelCompactMode) {
      nextSettings.panelCompactMode = Boolean(changes.panelCompactMode.newValue)
      settingsChanged = true
    }

    if (changes.safeSendEnabled) {
      nextSettings.safeSendEnabled = Boolean(changes.safeSendEnabled.newValue)
      settingsChanged = true
    }

    if (changes.safeSendDelay) {
      nextSettings.safeSendDelay = normalizeSafeSendDelay(changes.safeSendDelay.newValue)
      settingsChanged = true
    }

    if (changes.sendMethod) {
      nextSettings.sendMethod = normalizeSendMethod(changes.sendMethod.newValue)
      settingsChanged = true
    }

    if (changes.sendButtonSelector) {
      nextSettings.sendButtonSelector = normalizeSendButtonSelector(changes.sendButtonSelector.newValue)
      settingsChanged = true
    }

    if (changes.atMenuEnabled) {
      nextSettings.atMenuEnabled = changes.atMenuEnabled.newValue ?? defaultSettings.atMenuEnabled
      settingsChanged = true
    }

    if (changes.floatingPanelEnabled) {
      nextSettings.floatingPanelEnabled = changes.floatingPanelEnabled.newValue ?? defaultSettings.floatingPanelEnabled
      settingsChanged = true
    }

    if (changes.clipboardPanelEnabled) {
      nextSettings.clipboardPanelEnabled = changes.clipboardPanelEnabled.newValue ?? defaultSettings.clipboardPanelEnabled
      settingsChanged = true
    }

    if (changes.searchTrigger) {
      nextSettings.searchTrigger = changes.searchTrigger.newValue === '@' ? '@' : '/'
      settingsChanged = true
    }

    if (changes.cardPreset) {
      nextSettings.cardPreset = normalizeCardPreset(changes.cardPreset.newValue)
      settingsChanged = true
      cardPresetChanged = true
    }

    if (changes.activationMode) {
      nextSettings.activationMode = changes.activationMode.newValue || defaultSettings.activationMode
      settingsChanged = true
    }

    if (changes.enabledHosts) {
      nextSettings.enabledHosts = Array.isArray(changes.enabledHosts.newValue) ? changes.enabledHosts.newValue : []
      settingsChanged = true
    }

    if (changes.defaultCardColor) {
      nextSettings.defaultCardColor = changes.defaultCardColor.newValue || defaultSettings.defaultCardColor
      settingsChanged = true
    }

    if (changes.favoriteCardColor) {
      nextSettings.favoriteCardColor = changes.favoriteCardColor.newValue || defaultSettings.favoriteCardColor
      settingsChanged = true
    }

    if (changes.cardTextColor) {
      nextSettings.cardTextColor = changes.cardTextColor.newValue || defaultSettings.cardTextColor
      settingsChanged = true
    }

    if (changes.cardFontFamily) {
      nextSettings.cardFontFamily = changes.cardFontFamily.newValue || defaultSettings.cardFontFamily
      settingsChanged = true
    }

    if (changes.showVariablesTab) {
      nextSettings.showVariablesTab = changes.showVariablesTab.newValue ?? defaultSettings.showVariablesTab
      settingsChanged = true
    }

    if (changes.showTodoTab) {
      nextSettings.showTodoTab = changes.showTodoTab.newValue ?? defaultSettings.showTodoTab
      settingsChanged = true
    }

    if (changes.lastBaseTab) {
      nextSettings.lastBaseTab = changes.lastBaseTab.newValue || defaultSettings.lastBaseTab
      settingsChanged = true
    }

    if (changes.gridCols) {
      nextSettings.gridCols = changes.gridCols.newValue || defaultSettings.gridCols
      settingsChanged = true
    }

    if (changes.gridHeight) {
      nextSettings.gridHeight = changes.gridHeight.newValue || defaultSettings.gridHeight
      settingsChanged = true
    }

    if (changes.onboardingCompleted) {
      nextSettings.onboardingCompleted = Boolean(changes.onboardingCompleted.newValue)
      settingsChanged = true
    }

    if (changes.siteSettings) {
      nextSettings.siteSettings = normalizeSiteSettings(changes.siteSettings.newValue)
      settingsChanged = true
    }

    if (cardPresetChanged) Object.assign(nextSettings, cardPresetFor(nextSettings.theme, nextSettings.cardPreset))

    if (settingsChanged) patch.settings = nextSettings
    if (Object.keys(patch).length > 0) useAppStore.setState(patch)
  })
}

async function hydrateFromStorage() {
  attachStorageListener()
  const snapshot = await chromeGet(defaultSnapshot)
  useAppStore.setState(snapshotToState(snapshot))
}

export const useAppStore = create<AppState>()((set, get) => ({
  templates: [],
  bindings: [],
  variables: [],
  todos: [],
  recentInsertions: [],
  settings: defaultSettings,
  toasts: [],
  hydrated: false,

  hydrate: async () => {
    await hydrateFromStorage()
  },

  addTemplate: (template) => set((state) => {
    const templates = [...state.templates, {
      ...template,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      order: state.templates.length,
      usageCount: 0,
      tagColor: normalizeTagColor(template.tagColor),
    }]
    chromeSet({ templates })
    return { templates }
  }),

  updateTemplate: (id, updates) => set((state) => {
    const templates = state.templates.map((template) =>
      template.id === id ? { ...template, ...updates, updatedAt: new Date().toISOString() } : template
    )
    chromeSet({ templates })
    return { templates }
  }),

  deleteTemplate: (id) => set((state) => {
    const templates = state.templates
      .filter((template) => template.id !== id)
      .map((template, order) => ({ ...template, order }))
    chromeSet({ templates })
    return { templates }
  }),

  reorderTemplates: (templateIds) => set((state) => {
    const reordered = templateIds
      .map((id, order) => {
        const template = state.templates.find((item) => item.id === id)
        return template ? { ...template, order } : null
      })
      .filter(Boolean) as Template[]

    const rest = state.templates.filter((template) => !templateIds.includes(template.id))
    const templates = [...reordered, ...rest].map((template, order) => ({ ...template, order }))
    chromeSet({ templates })
    return { templates }
  }),

  toggleFavorite: (id) => set((state) => {
    const templates = state.templates.map((template) =>
      template.id === id ? { ...template, favorite: !template.favorite, updatedAt: new Date().toISOString() } : template
    )
    chromeSet({ templates })
    return { templates }
  }),

  recordTemplateUse: (template) => set((state) => {
    const now = new Date().toISOString()
    const host = typeof window !== 'undefined' && window.location?.hostname ? window.location.hostname : null
    const templates = state.templates.map((item) =>
      item.id === template.id ? { ...item, usageCount: (item.usageCount || 0) + 1, updatedAt: now } : item
    )
    const recentInsertions = [
      {
        id: generateId(),
        templateId: template.id || null,
        title: template.title,
        text: template.text,
        tag: template.tag,
        usedAt: now,
        host,
      },
      ...state.recentInsertions.filter((item) => item.templateId !== template.id),
    ].slice(0, 10)

    chromeSet({ templates, recentInsertions })
    return { templates, recentInsertions }
  }),

  addVariable: (variable) => set((state) => {
    const now = new Date().toISOString()
    const variables = [...state.variables, { ...variable, id: generateId(), createdAt: now, updatedAt: now }]
    chromeSet({ variables })
    return { variables }
  }),

  updateVariable: (id, updates) => set((state) => {
    const variables = state.variables.map((variable) =>
      variable.id === id ? { ...variable, ...updates, updatedAt: new Date().toISOString() } : variable
    )
    chromeSet({ variables })
    return { variables }
  }),

  deleteVariable: (id) => set((state) => {
    const variables = state.variables.filter((variable) => variable.id !== id)
    chromeSet({ variables })
    return { variables }
  }),

  addTodo: (todo) => set((state) => {
    const payload = typeof todo === 'string' ? { text: todo } : todo
    const trimmed = payload.text.trim()
    if (!trimmed) return {}
    const todos = [
      ...state.todos,
      {
        id: generateId(),
        text: trimmed,
        done: false,
        dueAt: payload.dueAt || null,
        reminderAt: payload.reminderAt || null,
        priority: payload.priority || 'normal',
        createdAt: new Date().toISOString(),
      },
    ]
    chromeSet({ todos })
    return { todos }
  }),

  updateTodo: (id, updates) => set((state) => {
    const todos = state.todos.map((todo) => todo.id === id ? { ...todo, ...updates } : todo)
    chromeSet({ todos })
    return { todos }
  }),

  toggleTodo: (id) => set((state) => {
    const todos = state.todos.map((todo) => todo.id === id ? { ...todo, done: !todo.done } : todo)
    chromeSet({ todos })
    return { todos }
  }),

  deleteTodo: (id) => set((state) => {
    const todos = state.todos.filter((todo) => todo.id !== id)
    chromeSet({ todos })
    return { todos }
  }),

  clearDoneTodos: () => set((state) => {
    const todos = state.todos.filter((todo) => !todo.done)
    chromeSet({ todos })
    return { todos }
  }),

  addBinding: (binding) => set((state) => {
    const nextBinding: CRMBinding = {
      ...binding,
      id: binding.domain,
      createdAt: new Date().toISOString(),
    }
    const bindings = [
      ...state.bindings.filter((item) => item.domain !== binding.domain),
      nextBinding,
    ]
    chromeSet({ customBindings: mapFromBindings(bindings) })
    return { bindings }
  }),

  deleteBinding: (id) => set((state) => {
    const bindings = state.bindings.filter((binding) => binding.id !== id && binding.domain !== id)
    chromeSet({ customBindings: mapFromBindings(bindings) })
    return { bindings }
  }),

  updateSettings: (settings) => set((state) => {
    const theme = settings.theme === 'dark' ? 'dark' : settings.theme === 'light' ? 'light' : state.settings.theme
    const cardPreset = normalizeCardPreset(settings.cardPreset ?? state.settings.cardPreset)
    const nextSettings = {
      ...state.settings,
      ...settings,
      theme,
      uiLanguage: isLanguage(settings.uiLanguage) ? settings.uiLanguage : state.settings.uiLanguage,
      uiScale: normalizeUiScale(settings.uiScale ?? state.settings.uiScale),
      panelScale: normalizeUiScale(settings.panelScale ?? state.settings.panelScale),
      panelPlacement: normalizePanelPlacement(settings.panelPlacement ?? state.settings.panelPlacement),
      panelCompactMode: settings.panelCompactMode ?? state.settings.panelCompactMode,
      safeSendEnabled: settings.safeSendEnabled ?? state.settings.safeSendEnabled,
      safeSendDelay: normalizeSafeSendDelay(settings.safeSendDelay ?? state.settings.safeSendDelay),
      sendMethod: normalizeSendMethod(settings.sendMethod ?? state.settings.sendMethod),
      sendButtonSelector: normalizeSendButtonSelector(settings.sendButtonSelector ?? state.settings.sendButtonSelector),
      siteSettings: normalizeSiteSettings(settings.siteSettings ?? state.settings.siteSettings),
      searchTrigger: settings.searchTrigger === '@' ? '@' : settings.searchTrigger === '/' ? '/' : state.settings.searchTrigger,
      ...cardPresetFor(theme, cardPreset),
    }

    chromeSet({
      theme: nextSettings.theme,
      uiLanguage: nextSettings.uiLanguage,
      uiScale: nextSettings.uiScale,
      panelScale: nextSettings.panelScale,
      panelPlacement: nextSettings.panelPlacement,
      panelCompactMode: nextSettings.panelCompactMode,
      safeSendEnabled: nextSettings.safeSendEnabled,
      safeSendDelay: nextSettings.safeSendDelay,
      sendMethod: nextSettings.sendMethod,
      sendButtonSelector: nextSettings.sendButtonSelector,
      atMenuEnabled: nextSettings.atMenuEnabled,
      floatingPanelEnabled: nextSettings.floatingPanelEnabled,
      clipboardPanelEnabled: nextSettings.clipboardPanelEnabled,
      searchTrigger: nextSettings.searchTrigger,
      cardPreset: nextSettings.cardPreset,
      activationMode: nextSettings.activationMode,
      enabledHosts: nextSettings.enabledHosts,
      defaultCardColor: nextSettings.defaultCardColor,
      favoriteCardColor: nextSettings.favoriteCardColor,
      cardTextColor: nextSettings.cardTextColor,
      cardFontFamily: nextSettings.cardFontFamily,
      showVariablesTab: nextSettings.showVariablesTab,
      showTodoTab: nextSettings.showTodoTab,
      lastBaseTab: nextSettings.lastBaseTab,
      gridCols: nextSettings.gridCols,
      gridHeight: nextSettings.gridHeight,
      onboardingCompleted: nextSettings.onboardingCompleted,
      siteSettings: nextSettings.siteSettings,
    })
    return { settings: nextSettings }
  }),

  addToast: (toast) => {
    const id = generateId()
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }))
    window.setTimeout(() => get().removeToast(id), 4000)
  },

  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((toast) => toast.id !== id),
  })),

  importTemplates: (incomingTemplates) => set((state) => {
    const existingTitles = new Set(state.templates.map((template) => template.title.toLowerCase()))
    const normalized = normalizeTemplates(incomingTemplates)
    const newTemplates = normalized.filter((template) => !existingTitles.has(template.title.toLowerCase()))
    const templates = [...state.templates, ...newTemplates].map((template, order) => ({ ...template, order }))
    chromeSet({ templates })
    return { templates }
  }),
}))

export function hydrateStoreOnce() {
  if (!initialHydrateStarted) {
    initialHydrateStarted = true
    void hydrateFromStorage()
  }
}

hydrateStoreOnce()
