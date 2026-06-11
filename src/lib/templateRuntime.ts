import type { AppSettings, CRMBinding, Template, TemplateVariable } from '@/types'
import { extractVariables, replaceDateVariable } from '@/lib/utils'
import { isLanguage } from '@/lib/i18n'
import { normalizeUiScale } from '@/lib/uiScale'

export type EditableElement = HTMLTextAreaElement | HTMLInputElement | HTMLElement

export type CRMConfig = {
  textarea: () => EditableElement | null
  sendBtn: () => HTMLElement | null
  isCustom?: boolean
}

export const DEFAULT_CRMS: Record<string, { textarea: string; sendBtn: string }> = {
  'opspost.ru': {
    textarea: '.chat__footer textarea[data-ng-model]',
    sendBtn: '.chat__footer button.btn-orange',
  },
  'kdiscont.ru': {
    textarea: 'form.styles-form__Dx4LY textarea[name="message"]',
    sendBtn: 'form.styles-form__Dx4LY button[type="submit"]',
  },
  'm1express.ru': {
    textarea: 'textarea',
    sendBtn: 'button.btn-primary',
  },
}

export type RuntimeSnapshot = {
  templates: Template[]
  bindings: CRMBinding[]
  variables: TemplateVariable[]
  theme: AppSettings['theme']
  uiLanguage: AppSettings['uiLanguage']
  uiScale: AppSettings['uiScale']
  atMenuEnabled: boolean
  floatingPanelEnabled: boolean
  clipboardPanelEnabled: boolean
  searchTrigger: AppSettings['searchTrigger']
  showVariablesTab: boolean
  activationMode: 'all' | 'allowlist'
  enabledHosts: string[]
}

let lastEditableElement: EditableElement | null = null
let cachedVariables: TemplateVariable[] = []
let cachedVariablesEnabled = true
let variableListenerAttached = false

type RawBinding = {
  textarea?: string
  sendBtn?: string | null
  textareaSelector?: string
  sendBtnSelector?: string | null
}

type RawSyncData = {
  templates: Partial<Template>[]
  variables: Partial<TemplateVariable>[]
  customBindings: Record<string, RawBinding>
  theme: AppSettings['theme']
  uiLanguage: AppSettings['uiLanguage']
  uiScale: AppSettings['uiScale']
  atMenuEnabled: boolean
  floatingPanelEnabled: boolean
  clipboardPanelEnabled: boolean
  searchTrigger: AppSettings['searchTrigger']
  showVariablesTab: boolean
  activationMode: 'all' | 'allowlist'
  enabledHosts: string[]
}

const defaults: RawSyncData = {
  templates: [],
  variables: [],
  customBindings: {},
  theme: 'light',
  uiLanguage: 'ru',
  uiScale: '100',
  atMenuEnabled: true,
  floatingPanelEnabled: true,
  clipboardPanelEnabled: false,
  searchTrigger: '/',
  showVariablesTab: true,
  activationMode: 'all',
  enabledHosts: [],
}

function hasChromeStorage() {
  return typeof chrome !== 'undefined' && Boolean(chrome.storage?.sync)
}

export function readRuntimeSnapshot(): Promise<RuntimeSnapshot> {
  attachVariableCacheListener()

  if (!hasChromeStorage()) {
    return Promise.resolve({
      templates: [],
      bindings: [],
      variables: cachedVariablesEnabled ? cachedVariables : [],
      theme: 'light',
      uiLanguage: 'ru',
      uiScale: '100',
      atMenuEnabled: true,
      floatingPanelEnabled: true,
      clipboardPanelEnabled: false,
      searchTrigger: '/',
      showVariablesTab: true,
      activationMode: 'all',
      enabledHosts: [],
    })
  }

  return new Promise((resolve) => {
    chrome.storage.sync.get(defaults, (items) => {
      const data = items as RawSyncData
      const variablesEnabled = data.showVariablesTab ?? true
      const variables = normalizeVariables(data.variables)
      cachedVariablesEnabled = variablesEnabled
      cachedVariables = variablesEnabled ? variables : []
      resolve({
        templates: normalizeTemplates(data.templates),
        bindings: bindingsFromMap(data.customBindings),
        variables: variablesEnabled ? variables : [],
        theme: data.theme === 'dark' ? 'dark' : 'light',
        uiLanguage: isLanguage(data.uiLanguage) ? data.uiLanguage : 'ru',
        uiScale: normalizeUiScale(data.uiScale),
        atMenuEnabled: data.atMenuEnabled ?? true,
        floatingPanelEnabled: data.floatingPanelEnabled ?? true,
        clipboardPanelEnabled: data.clipboardPanelEnabled ?? false,
        searchTrigger: data.searchTrigger === '@' ? '@' : '/',
        showVariablesTab: variablesEnabled,
        activationMode: data.activationMode || 'all',
        enabledHosts: Array.isArray(data.enabledHosts) ? data.enabledHosts : [],
      })
    })
  })
}

export function isHostEnabled(snapshot: Pick<RuntimeSnapshot, 'activationMode' | 'enabledHosts'>, host = window.location.hostname) {
  if (snapshot.activationMode === 'all') return true
  return snapshot.enabledHosts.includes(host)
}

function attachVariableCacheListener() {
  if (variableListenerAttached || typeof chrome === 'undefined' || !chrome.storage?.onChanged) return
  variableListenerAttached = true
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return
    if (changes.showVariablesTab) cachedVariablesEnabled = changes.showVariablesTab.newValue ?? true
    if (changes.variables || changes.showVariablesTab) {
      cachedVariables = cachedVariablesEnabled ? normalizeVariables(changes.variables?.newValue || cachedVariables) : []
    }
  })
}

export function normalizeTemplates(templates: Partial<Template>[] = []): Template[] {
  return templates.map((template, order) => ({
    id: template.id || `${Date.now()}-${order}`,
    title: String(template.title || '').trim() || 'Без названия',
    text: String(template.text || ''),
    tag: template.tag ? String(template.tag) : null,
    color: template.color ? String(template.color) : null,
    favorite: Boolean(template.favorite),
    createdAt: template.createdAt || new Date().toISOString(),
    updatedAt: template.updatedAt || new Date().toISOString(),
    order: typeof template.order === 'number' ? template.order : order,
  })).sort((a, b) => a.order - b.order)
}

function normalizeVariables(variables: Partial<TemplateVariable>[] = []): TemplateVariable[] {
  return variables.map((variable) => ({
    id: variable.id || `${Date.now()}-${variable.name || 'variable'}`,
    name: String(variable.name || '').trim(),
    value: String(variable.value || ''),
    createdAt: variable.createdAt || new Date().toISOString(),
    updatedAt: variable.updatedAt || new Date().toISOString(),
  })).filter((variable) => variable.name)
}

function bindingsFromMap(map: Record<string, RawBinding> = {}): CRMBinding[] {
  return Object.entries(map).map(([domain, binding]) => ({
    id: domain,
    domain,
    textareaSelector: binding.textareaSelector || binding.textarea || '',
    sendBtnSelector: binding.sendBtnSelector ?? binding.sendBtn ?? null,
    createdAt: new Date().toISOString(),
  })).filter((binding) => binding.textareaSelector)
}

export function resolveCRM(bindings: CRMBinding[]): CRMConfig | null {
  const host = window.location.hostname
  const custom = bindings.find((binding) => binding.domain === host)

  if (custom) {
    return {
      textarea: () => document.querySelector(custom.textareaSelector),
      sendBtn: () => custom.sendBtnSelector ? document.querySelector(custom.sendBtnSelector) : null,
      isCustom: true,
    }
  }

  const match = Object.entries(DEFAULT_CRMS).find(([domain]) => host.includes(domain))
  if (!match) return null

  const [, config] = match
  return {
    textarea: () => document.querySelector(config.textarea),
    sendBtn: () => document.querySelector(config.sendBtn),
    isCustom: false,
  }
}

export function isEditableElement(element: EventTarget | null): element is EditableElement {
  if (!(element instanceof HTMLElement)) return false
  if (element.tagName === 'TEXTAREA') return true
  if (element.tagName === 'INPUT') {
    const input = element as HTMLInputElement
    return ['text', 'search', 'email', 'tel', 'url', ''].includes(input.type)
  }
  return element.isContentEditable || element.getAttribute('contenteditable') === 'true'
}

export function isInsideExtensionUi(element: EventTarget | null) {
  if (!(element instanceof HTMLElement)) return false
  if (element.closest('#opspost-content-host, #opspost-content-root')) return true

  const root = element.getRootNode()
  return root instanceof ShadowRoot && root.host instanceof HTMLElement && root.host.id === 'opspost-content-host'
}

export function rememberEditableElement(element: EventTarget | null) {
  if (isInsideExtensionUi(element)) return
  if (isEditableElement(element)) lastEditableElement = element
}

export function getActiveEditableElement() {
  if (!isInsideExtensionUi(document.activeElement) && isEditableElement(document.activeElement)) {
    lastEditableElement = document.activeElement
    return document.activeElement
  }

  if (lastEditableElement && document.contains(lastEditableElement)) return lastEditableElement
  return null
}

export function installEditableTracker() {
  void readRuntimeSnapshot()
  const rememberFromEvent = (event: Event) => rememberEditableElement(event.target)
  const rememberSelection = () => rememberEditableElement(document.activeElement)

  document.addEventListener('focusin', rememberFromEvent, true)
  document.addEventListener('input', rememberFromEvent, true)
  document.addEventListener('selectionchange', rememberSelection, true)

  return () => {
    document.removeEventListener('focusin', rememberFromEvent, true)
    document.removeEventListener('input', rememberFromEvent, true)
    document.removeEventListener('selectionchange', rememberSelection, true)
  }
}

export function editableValue(element: EditableElement) {
  if ('value' in element) return element.value || ''
  return element.textContent || ''
}

export function editableSelection(element: EditableElement) {
  if ('selectionStart' in element && typeof element.selectionStart === 'number') {
    return {
      start: element.selectionStart || 0,
      end: element.selectionEnd || element.selectionStart || 0,
    }
  }

  const value = editableValue(element)
  return { start: value.length, end: value.length }
}

export function setNativeValue(element: EditableElement, value: string) {
  if ('value' in element) {
    const isTextArea = element.tagName === 'TEXTAREA'
    const proto = isTextArea ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype
    const valueSetter = Object.getOwnPropertyDescriptor(proto, 'value')?.set
    const previousValue = element.value

    if (valueSetter) valueSetter.call(element, value)
    else element.value = value

    const tracked = element as HTMLInputElement & { _valueTracker?: { setValue: (value: string) => void } }
    tracked._valueTracker?.setValue(previousValue)
  } else {
    element.textContent = value
  }

  element.dispatchEvent(new Event('input', { bubbles: true }))
  element.dispatchEvent(new Event('change', { bubbles: true }))
}

export function insertTextIntoEditable(element: EditableElement, text: string) {
  const currentValue = editableValue(element)
  const { start, end } = editableSelection(element)
  const nextValue = currentValue.substring(0, start) + text + currentValue.substring(end)
  setNativeValue(element, nextValue)

  const cursorPosition = start + text.length
  if ('setSelectionRange' in element) element.setSelectionRange(cursorPosition, cursorPosition)
  element.focus()
}

export function resolveTemplateText(text: string, variables: TemplateVariable[] | null = cachedVariables): string | null {
  if (!cachedVariablesEnabled || variables === null) return text

  let result = replaceDateVariable(text)
  const placeholders = Array.from(new Set(extractVariables(result)))

  for (const placeholder of placeholders) {
    const savedVariable = variables.find((variable) => variable.name.toLowerCase() === placeholder.toLowerCase())
    const value = savedVariable?.value || window.prompt(`Введите значение для "${placeholder}":`, '')
    if (value === null) return null
    result = result.replace(new RegExp(`\\{\\{\\s*${escapeRegExp(placeholder)}\\s*\\}\\}`, 'gi'), value)
  }

  return result
}

export function findLikelySendButton(element: EditableElement | null) {
  const root = element?.closest('form') || element?.parentElement
  const selectors = ['button[type="submit"]', 'input[type="submit"]', 'button:not([disabled])', '[role="button"]']

  for (const selector of selectors) {
    const button = root?.querySelector<HTMLElement>(selector)
    if (button) return button
  }

  return document.querySelector<HTMLElement>('button[type="submit"], input[type="submit"]')
}

export function insertTextToActiveField(text: string, autoSend = false) {
  const target = getActiveEditableElement()
  if (!target) return false

  insertTextIntoEditable(target, text)

  if (autoSend) {
    window.setTimeout(() => {
      const button = findLikelySendButton(target)
      if (button && !('disabled' in button && button.disabled)) button.click()
    }, 150)
  }

  return true
}

export function insertTemplate(template: Pick<Template, 'text'>, options: { autoSend?: boolean; crm?: CRMConfig | null } = {}) {
  const resolvedText = resolveTemplateText(template.text)
  if (resolvedText === null) return false

  const target = options.crm?.textarea() || getActiveEditableElement()
  if (!target) return false

  insertTextIntoEditable(target, resolvedText)

  if (options.autoSend) {
    window.setTimeout(() => {
      const button = options.crm?.sendBtn() || findLikelySendButton(target)
      if (button && !('disabled' in button && button.disabled)) button.click()
    }, 150)
  }

  return true
}

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
