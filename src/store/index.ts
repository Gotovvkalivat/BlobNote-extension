import { create } from 'zustand'
import type { Template, CRMBinding, AppSettings, Toast, TemplateVariable, TodoItem } from '@/types'
import { generateId } from '@/lib/utils'
import { cardPresetFor, normalizeCardPreset } from '@/lib/cardPresets'
import { isLanguage } from '@/lib/i18n'
import { normalizeUiScale } from '@/lib/uiScale'

interface AppState {
  templates: Template[]
  bindings: CRMBinding[]
  variables: TemplateVariable[]
  todos: TodoItem[]
  settings: AppSettings
  toasts: Toast[]
  hydrated: boolean

  hydrate: () => Promise<void>

  addTemplate: (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void
  updateTemplate: (id: string, updates: Partial<Template>) => void
  deleteTemplate: (id: string) => void
  reorderTemplates: (templateIds: string[]) => void
  toggleFavorite: (id: string) => void

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
  customBindings: RawBindingMap
  theme: AppSettings['theme']
  uiLanguage: AppSettings['uiLanguage']
  uiScale: AppSettings['uiScale']
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
}

const defaultSettings: AppSettings = {
  theme: 'light',
  uiLanguage: 'ru',
  uiScale: '100',
  atMenuEnabled: true,
  floatingPanelEnabled: true,
  clipboardPanelEnabled: false,
  searchTrigger: '/',
  activationMode: 'all',
  enabledHosts: [],
  ...cardPresetFor('light', 'lagoon'),
  showVariablesTab: true,
  showTodoTab: true,
  lastBaseTab: 'templates',
  gridCols: 3,
  gridHeight: '240px',
  onboardingCompleted: false,
}

const defaultSnapshot: SyncSnapshot = {
  templates: [],
  variables: [],
  todos: [],
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
    color: template.color ? String(template.color) : null,
    favorite: Boolean(template.favorite),
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
    bindings: bindingsFromMap(snapshot.customBindings),
    settings: {
      theme,
      uiLanguage: isLanguage(snapshot.uiLanguage) ? snapshot.uiLanguage : defaultSettings.uiLanguage,
      uiScale: normalizeUiScale(snapshot.uiScale),
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
      searchTrigger: settings.searchTrigger === '@' ? '@' : settings.searchTrigger === '/' ? '/' : state.settings.searchTrigger,
      ...cardPresetFor(theme, cardPreset),
    }

    chromeSet({
      theme: nextSettings.theme,
      uiLanguage: nextSettings.uiLanguage,
      uiScale: nextSettings.uiScale,
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
