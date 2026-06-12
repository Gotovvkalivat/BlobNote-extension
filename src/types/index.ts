export interface Template {
  id: string
  title: string
  text: string
  tag: string | null
  tagColor: string | null
  color: string | null
  favorite: boolean
  usageCount: number
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

export type SendMethod = 'auto' | 'button' | 'enter' | 'ctrl-enter' | 'shift-enter' | 'alt-enter'
export type NoteFontSize = '12' | '13' | '14' | '15' | '16' | '18'
export type NoteFontFamily = 'system' | 'arial' | 'georgia' | 'mono'

export interface AppSettings {
  theme: 'light' | 'dark'
  uiLanguage: 'ru' | 'en'
  uiScale: '70' | '80' | '90' | '100' | '110' | '120' | '130'
  panelScale: '70' | '80' | '90' | '100' | '110' | '120' | '130'
  panelPlacement: 'auto' | 'above' | 'below' | 'top-right' | 'bottom-right'
  panelCompactMode: boolean
  safeSendEnabled: boolean
  safeSendDelay: number
  sendMethod: SendMethod
  sendButtonSelector: string | null
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
  noteFontSize: NoteFontSize
  noteFontFamily: NoteFontFamily
  showHeaderControls: boolean
  showVariablesTab: boolean
  showTodoTab: boolean
  lastBaseTab: 'templates' | 'variables' | 'todo' | 'settings'
  gridCols: number
  gridHeight: string
  onboardingCompleted: boolean
  siteSettings: Record<string, SiteSettings>
}

export interface SiteSettings {
  uiScale?: AppSettings['uiScale']
  panelScale?: AppSettings['panelScale']
  panelPlacement?: AppSettings['panelPlacement']
  panelCompactMode?: boolean
  sendMethod?: SendMethod
  sendButtonSelector?: string | null
}

export interface RecentInsertion {
  id: string
  templateId: string | null
  title: string
  text: string
  tag: string | null
  usedAt: string
  host: string | null
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
