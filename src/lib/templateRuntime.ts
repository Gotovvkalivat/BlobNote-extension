import type { AppSettings, CRMBinding, RecentInsertion, SendMethod, SiteSettings, Template, TemplateVariable } from '@/types'
import { extractVariables, replaceDateVariable } from '@/lib/utils'
import { isLanguage } from '@/lib/i18n'
import { normalizeTagColor } from '@/lib/tagColors'
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
  recentInsertions: RecentInsertion[]
  searchTrigger: AppSettings['searchTrigger']
  showVariablesTab: boolean
  activationMode: 'all' | 'allowlist'
  enabledHosts: string[]
  siteSettings: Record<string, SiteSettings>
}

let lastEditableElement: EditableElement | null = null
let cachedVariables: TemplateVariable[] = []
let cachedVariablesEnabled = false
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
  recentInsertions: Partial<RecentInsertion>[]
  searchTrigger: AppSettings['searchTrigger']
  showVariablesTab: boolean
  activationMode: 'all' | 'allowlist'
  enabledHosts: string[]
  siteSettings: Record<string, SiteSettings>
}

const defaults: RawSyncData = {
  templates: [],
  variables: [],
  customBindings: {},
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
  recentInsertions: [],
  searchTrigger: '/',
  showVariablesTab: false,
  activationMode: 'all',
  enabledHosts: [],
  siteSettings: {},
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
      recentInsertions: [],
      searchTrigger: '/',
      showVariablesTab: false,
      activationMode: 'all',
      enabledHosts: [],
      siteSettings: {},
    })
  }

  return new Promise((resolve) => {
    chrome.storage.sync.get(defaults, (items) => {
      const data = items as RawSyncData
      const variablesEnabled = data.showVariablesTab ?? false
      const variables = normalizeVariables(data.variables)
      const siteSettings = normalizeSiteSettings(data.siteSettings)
      const currentSiteSettings = siteSettings[window.location.hostname] || {}
      const safeSendDelay = data.safeSendEnabled ? normalizeSafeSendDelay(data.safeSendDelay) : 0
      cachedVariablesEnabled = variablesEnabled
      cachedVariables = variablesEnabled ? variables : []
      resolve({
        templates: normalizeTemplates(data.templates),
        bindings: bindingsFromMap(data.customBindings),
        variables: variablesEnabled ? variables : [],
        theme: data.theme === 'dark' ? 'dark' : 'light',
        uiLanguage: isLanguage(data.uiLanguage) ? data.uiLanguage : 'ru',
        uiScale: currentSiteSettings.uiScale || normalizeUiScale(data.uiScale),
        panelScale: currentSiteSettings.panelScale || normalizeUiScale(data.panelScale),
        panelPlacement: currentSiteSettings.panelPlacement || normalizePanelPlacement(data.panelPlacement),
        panelCompactMode: currentSiteSettings.panelCompactMode ?? data.panelCompactMode ?? false,
        safeSendEnabled: data.safeSendEnabled ?? false,
        safeSendDelay,
        sendMethod: currentSiteSettings.sendMethod || normalizeSendMethod(data.sendMethod),
        sendButtonSelector: currentSiteSettings.sendButtonSelector ?? normalizeSendButtonSelector(data.sendButtonSelector),
        atMenuEnabled: data.atMenuEnabled ?? false,
        floatingPanelEnabled: data.floatingPanelEnabled ?? true,
        clipboardPanelEnabled: data.clipboardPanelEnabled ?? false,
        recentInsertions: normalizeRecentInsertions(data.recentInsertions),
        searchTrigger: data.searchTrigger === '@' ? '@' : '/',
        showVariablesTab: variablesEnabled,
        activationMode: data.activationMode || 'all',
        enabledHosts: Array.isArray(data.enabledHosts) ? data.enabledHosts : [],
        siteSettings,
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
    if (changes.showVariablesTab) cachedVariablesEnabled = changes.showVariablesTab.newValue ?? false
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
    tagColor: normalizeTagColor(template.tagColor),
    color: template.color ? String(template.color) : null,
    favorite: Boolean(template.favorite),
    usageCount: typeof template.usageCount === 'number' && template.usageCount > 0 ? Math.floor(template.usageCount) : 0,
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

function normalizeRecentInsertions(items: Partial<RecentInsertion>[] = []): RecentInsertion[] {
  return items
    .map((item, index) => ({
      id: item.id || `${Date.now()}-${index}`,
      templateId: item.templateId ? String(item.templateId) : null,
      title: String(item.title || '').trim() || 'Шаблон',
      text: String(item.text || ''),
      tag: item.tag ? String(item.tag) : null,
      usedAt: item.usedAt || new Date(Date.now() - index).toISOString(),
      host: item.host ? String(item.host) : null,
    }))
    .filter((item) => item.text)
    .sort((a, b) => new Date(b.usedAt).getTime() - new Date(a.usedAt).getTime())
    .slice(0, 10)
}

function normalizePanelPlacement(value: unknown): AppSettings['panelPlacement'] {
  return value === 'above' || value === 'below' || value === 'top-right' || value === 'bottom-right' ? value : 'auto'
}

function normalizeSafeSendDelay(value: unknown) {
  const numeric = typeof value === 'number' ? value : parseInt(String(value || ''), 10)
  if (Number.isNaN(numeric) || numeric <= 0) return 0
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

export type SafeSendRequestDetail = {
  delaySeconds: number
  send: () => void
  handled?: boolean
}

type AutoSendSettings = {
  delaySeconds: number
  sendMethod: SendMethod
  sendButtonSelector: string | null
}

function readAutoSendSettings(): Promise<AutoSendSettings> {
  if (!hasChromeStorage()) {
    return Promise.resolve({
      delaySeconds: 0,
      sendMethod: 'auto',
      sendButtonSelector: null,
    })
  }

  return new Promise((resolve) => {
    chrome.storage.sync.get({
      safeSendEnabled: false,
      safeSendDelay: 0,
      sendMethod: 'auto',
      sendButtonSelector: null,
      siteSettings: {},
    }, (items) => {
      const siteSettings = normalizeSiteSettings(items.siteSettings)
      const currentSiteSettings = siteSettings[window.location.hostname] || {}
      const delaySeconds = items.safeSendEnabled ? normalizeSafeSendDelay(items.safeSendDelay) : 0
      resolve({
        delaySeconds,
        sendMethod: currentSiteSettings.sendMethod || normalizeSendMethod(items.sendMethod),
        sendButtonSelector: currentSiteSettings.sendButtonSelector ?? normalizeSendButtonSelector(items.sendButtonSelector),
      })
    })
  })
}

function clickSendButton(button: HTMLElement | null) {
  if (!button || ('disabled' in button && button.disabled)) return false
  button.click()
  return true
}

function findConfiguredSendButton(selector: string | null) {
  if (!selector) return null
  try {
    return document.querySelector<HTMLElement>(selector)
  } catch {
    return null
  }
}

function dispatchEnterSend(target: EditableElement, method: SendMethod) {
  target.focus()
  const init = {
    key: 'Enter',
    code: 'Enter',
    bubbles: true,
    cancelable: true,
    ctrlKey: method === 'ctrl-enter',
    shiftKey: method === 'shift-enter',
    altKey: method === 'alt-enter',
    keyCode: 13,
    which: 13,
  } as KeyboardEventInit & { keyCode: number; which: number }

  target.dispatchEvent(new KeyboardEvent('keydown', init))
  target.dispatchEvent(new KeyboardEvent('keypress', init))
  target.dispatchEvent(new KeyboardEvent('keyup', init))
}

function runConfiguredSend(target: EditableElement, crm: CRMConfig | null | undefined, settings: AutoSendSettings) {
  if (settings.sendMethod === 'button') {
    if (clickSendButton(findConfiguredSendButton(settings.sendButtonSelector))) return
    clickSendButton(crm?.sendBtn() || findLikelySendButton(target))
    return
  }

  if (settings.sendMethod !== 'auto') {
    dispatchEnterSend(target, settings.sendMethod)
    return
  }

  if (!clickSendButton(crm?.sendBtn() || findLikelySendButton(target))) {
    dispatchEnterSend(target, 'enter')
  }
}

function scheduleAutoSend(target: EditableElement, crm?: CRMConfig | null) {
  void readAutoSendSettings().then((settings) => {
    const send = () => runConfiguredSend(target, crm, settings)

    if (settings.delaySeconds <= 0) {
      window.setTimeout(send, 150)
      return
    }

    const detail: SafeSendRequestDetail = { delaySeconds: settings.delaySeconds, send, handled: false }
    window.dispatchEvent(new CustomEvent<SafeSendRequestDetail>('blobnote:safe-send', { detail }))
    if (!detail.handled) window.setTimeout(send, settings.delaySeconds * 1000)
  })
}

export function recordTemplateUse(template: Pick<Template, 'text'> & Partial<Pick<Template, 'id' | 'title' | 'tag'>>) {
  if (!template.id || !template.title || !hasChromeStorage()) return

  chrome.storage.sync.get({ templates: [], recentInsertions: [] }, (items) => {
    const now = new Date().toISOString()
    const templates = normalizeTemplates(items.templates || []).map((item) =>
      item.id === template.id ? { ...item, usageCount: (item.usageCount || 0) + 1, updatedAt: now } : item
    )
    const recentInsertions = normalizeRecentInsertions([
      {
        id: `${Date.now()}-${template.id}`,
        templateId: template.id,
        title: template.title,
        text: template.text,
        tag: template.tag || null,
        usedAt: now,
        host: window.location.hostname || null,
      },
      ...(items.recentInsertions || []).filter((item: Partial<RecentInsertion>) => item.templateId !== template.id),
    ])

    chrome.storage.sync.set({ templates, recentInsertions })
  })
}

export function insertTextToActiveField(text: string, autoSend = false) {
  const target = getActiveEditableElement()
  if (!target) return false

  insertTextIntoEditable(target, text)

  if (autoSend) {
    scheduleAutoSend(target)
  }

  return true
}

export function insertTemplate(
  template: Pick<Template, 'text'> & Partial<Pick<Template, 'id' | 'title' | 'tag'>>,
  options: { autoSend?: boolean; crm?: CRMConfig | null } = {}
) {
  const resolvedText = resolveTemplateText(template.text)
  if (resolvedText === null) return false

  const target = options.crm?.textarea() || getActiveEditableElement()
  if (!target) return false

  insertTextIntoEditable(target, resolvedText)
  recordTemplateUse(template)

  if (options.autoSend) {
    scheduleAutoSend(target, options.crm)
  }

  return true
}

export function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
