export interface Template {
  id: string
  title: string
  text: string
  tag: string | null
  color: string | null
  favorite: boolean
  createdAt: string
  updatedAt: string
  order: number
}

export interface CRMBinding {
  id: string
  domain: string
  textareaSelector: string
  sendBtnSelector: string | null
  createdAt: string
}

export interface AppSettings {
  theme: 'light' | 'dark'
  uiLanguage: 'ru' | 'en'
  atMenuEnabled: boolean
  floatingPanelEnabled: boolean
  clipboardPanelEnabled: boolean
  searchTrigger: '/' | '@'
  cardPreset: 'lagoon' | 'orchid' | 'graphite'
  activationMode: 'all' | 'allowlist'
  enabledHosts: string[]
  defaultCardColor: string
  favoriteCardColor: string
  cardTextColor: string
  cardFontFamily: string
  showVariablesTab: boolean
  showTodoTab: boolean
  lastBaseTab: 'templates' | 'variables' | 'todo'
  gridCols: number
  gridHeight: string
  onboardingCompleted: boolean
}

export interface TemplateVariable {
  id: string
  name: string
  value: string
  createdAt: string
  updatedAt: string
}

export interface TodoItem {
  id: string
  text: string
  done: boolean
  dueAt: string | null
  reminderAt: string | null
  priority: 'low' | 'normal' | 'high'
  createdAt: string
}

export interface User {
  id: string
  email: string
  createdAt: string
}

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}
