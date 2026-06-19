import type { Template, TodoItem } from '@/types'

const TOP_TEMPLATES_LIMIT = 10
const TODO_ALARM_PREFIX = 'ops-todo-reminder-'
type UiLanguage = 'ru' | 'en'

chrome.runtime.onInstalled.addListener(() => {
  updateContextMenu()
  scheduleTodoReminders()
})

chrome.runtime.onStartup.addListener(() => {
  scheduleTodoReminders()
})

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && (changes.templates || changes.uiLanguage)) updateContextMenu()
  if (area === 'sync' && changes.todos) scheduleTodoReminders()
})

chrome.alarms.onAlarm.addListener((alarm) => {
  if (!alarm.name.startsWith(TODO_ALARM_PREFIX)) return
  const todoId = alarm.name.slice(TODO_ALARM_PREFIX.length)

  chrome.storage.sync.get({ todos: [], uiLanguage: 'ru' }, (data) => {
    const todo = ((data.todos as TodoItem[]) || []).find((item) => item.id === todoId)
    if (!todo || todo.done) return
    const language = getLanguage(data.uiLanguage)

    chrome.notifications.create(`ops-todo-${todo.id}-${Date.now()}`, {
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icon-128.png'),
      title:
        language === 'en'
          ? todo.priority === 'high'
            ? 'BlobNote: important task'
            : 'BlobNote: reminder'
          : todo.priority === 'high'
            ? 'BlobNote: важная задача'
            : 'BlobNote: напоминание',
      message: todo.text,
      contextMessage: todo.dueAt
        ? `${language === 'en' ? 'Deadline' : 'Дедлайн'}: ${formatNotificationDate(todo.dueAt, language)}`
        : undefined,
      priority: todo.priority === 'high' ? 2 : 0,
    })
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'ops-more-templates') {
    openBasePage()
    return
  }

  if (!tab?.id || typeof info.menuItemId !== 'string' || !info.menuItemId.startsWith('ops-template-')) return

  const index = Number(info.menuItemId.replace('ops-template-', ''))
  chrome.storage.sync.get({ templates: [] }, (data) => {
    const template = (data.templates as Template[])[index]
    if (!template || !tab.id) return
    sendTemplateToTab(tab.id, template)
  })
})

chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0]?.id
    if (!tabId) return
    if (command === 'open-search') sendMessageToTab(tabId, { type: 'OPEN_SMART_SEARCH' })
    if (command === 'open-base-modal') sendMessageToTab(tabId, { type: 'OPEN_BASE_MODAL' })
  })
})

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === 'OPEN_BASE') {
    openBasePage()
    sendResponse({ success: true })
    return false
  }

  if (request.type === 'OPEN_BASE_MODAL_ACTIVE_TAB') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id
      if (!tabId) {
        sendResponse({ success: false, error: 'Активная вкладка не найдена' })
        return
      }

      sendMessageToTab(tabId, { type: 'OPEN_BASE_MODAL' }, sendResponse)
    })

    return true
  }

  if (request.type === 'INSERT_TEMPLATE_ACTIVE_TAB') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id
      if (!tabId || !request.template) {
        sendResponse({ success: false, error: 'Активная вкладка не найдена' })
        return
      }

      sendTemplateToTab(tabId, request.template, Boolean(request.autoSend), sendResponse)
    })

    return true
  }

  if (request.type === 'INSERT_TO_ACTIVE_TAB') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id
      if (!tabId) {
        sendResponse({ success: false, error: 'Активная вкладка не найдена' })
        return
      }

      sendTemplateToTab(tabId, { id: 'inline', title: 'Inline', text: request.text || '' } as Template, false, sendResponse)
    })

    return true
  }

  if (request.type === 'GOOGLE_SIGN_IN') {
    const identity = chrome.identity
    if (!identity?.getAuthToken) {
      sendResponse({ success: false, error: 'Google-вход пока не настроен для этой сборки' })
      return false
    }

    identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError || !token) {
        sendResponse({ success: false, error: chrome.runtime.lastError?.message || 'Не удалось войти через Google' })
        return
      }

      chrome.storage.sync.set(
        {
          googleDriveConnected: true,
          googleDriveConnectedAt: new Date().toISOString(),
        },
        () => sendResponse({ success: true })
      )
    })

    return true
  }

  return false
})

function updateContextMenu() {
  chrome.storage.sync.get({ templates: [], uiLanguage: 'ru' }, (data) => {
    const templates = (data.templates as Template[]) || []
    const language = getLanguage(data.uiLanguage)

    chrome.contextMenus.removeAll(() => {
      chrome.contextMenus.create({
        id: 'ops-templates-parent',
        title: language === 'en' ? 'BlobNote: notes' : 'BlobNote: заметки',
        contexts: ['editable'],
      })

      templates.slice(0, TOP_TEMPLATES_LIMIT).forEach((template, index) => {
        chrome.contextMenus.create({
          id: `ops-template-${index}`,
          parentId: 'ops-templates-parent',
          title: template.title.length > 50 ? `${template.title.slice(0, 47)}...` : template.title,
          contexts: ['editable'],
        })
      })

      chrome.contextMenus.create({
        id: 'ops-more-templates',
        parentId: 'ops-templates-parent',
        title:
          language === 'en'
            ? templates.length > TOP_TEMPLATES_LIMIT
              ? 'More... (open base)'
              : 'Open notes base'
            : templates.length > TOP_TEMPLATES_LIMIT
              ? 'Ещё... (открыть базу)'
              : 'Открыть базу',
        contexts: ['editable'],
      })
    })
  })
}

function openBasePage() {
  chrome.tabs.create({ url: chrome.runtime.getURL('base.html') })
}

function sendTemplateToTab(
  tabId: number,
  template: Template,
  autoSend = false,
  sendResponse?: (response?: { success: boolean; error?: string }) => void
) {
  sendMessageToTab(tabId, { type: 'INSERT_TEMPLATE', template, autoSend }, (response) => {
    if (!sendResponse) return
    sendResponse(response || { success: true })
  })
}

function sendMessageToTab(
  tabId: number,
  message: Record<string, unknown>,
  callback?: (response?: { success: boolean; error?: string }) => void,
  retried = false
) {
  chrome.tabs.sendMessage(tabId, message, (response) => {
    if (!chrome.runtime.lastError) {
      callback?.(response || { success: true })
      return
    }

    if (retried) {
      callback?.({ success: false, error: chrome.runtime.lastError.message })
      return
    }

    chrome.scripting.executeScript({ target: { tabId }, files: ['src/content/index.js'] }, () => {
      if (chrome.runtime.lastError) {
        callback?.({ success: false, error: chrome.runtime.lastError.message })
        return
      }

      setTimeout(() => sendMessageToTab(tabId, message, callback, true), 100)
    })
  })
}

function scheduleTodoReminders() {
  chrome.alarms.getAll((alarms) => {
    alarms
      .filter((alarm) => alarm.name.startsWith(TODO_ALARM_PREFIX))
      .forEach((alarm) => chrome.alarms.clear(alarm.name))

    chrome.storage.sync.get({ todos: [] }, (data) => {
      const todos = ((data.todos as TodoItem[]) || []).filter((todo) => !todo.done && todo.reminderAt)
      const now = Date.now()

      todos.forEach((todo) => {
        const when = new Date(todo.reminderAt as string).getTime()
        if (Number.isNaN(when) || when <= now) return
        chrome.alarms.create(`${TODO_ALARM_PREFIX}${todo.id}`, { when })
      })
    })
  })
}

function getLanguage(value: unknown): UiLanguage {
  return value === 'en' ? 'en' : 'ru'
}

function formatNotificationDate(value: string, language: UiLanguage) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}



