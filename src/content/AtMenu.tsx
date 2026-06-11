import React from 'react'
import { cn } from '@/lib/utils'
import type { EditableElement } from '@/lib/templateRuntime'
import type { AppSettings, Template } from '@/types'
import {
  editableValue,
  isEditableElement,
  isInsideExtensionUi,
  readRuntimeSnapshot,
  resolveTemplateText,
  setNativeValue,
} from '@/lib/templateRuntime'

export function AtMenu() {
  const [active, setActive] = React.useState(false)
  const [templates, setTemplates] = React.useState<Template[]>([])
  const [filtered, setFiltered] = React.useState<Template[]>([])
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [inputElement, setInputElement] = React.useState<EditableElement | null>(null)
  const [triggerPos, setTriggerPos] = React.useState(-1)
  const [searchText, setSearchText] = React.useState('')
  const [position, setPosition] = React.useState<{ top: number; left: number; placement: 'above' | 'below' }>({
    top: 0,
    left: 0,
    placement: 'above',
  })
  const [enabled, setEnabled] = React.useState(true)
  const [trigger, setTrigger] = React.useState<AppSettings['searchTrigger']>('/')

  React.useEffect(() => {
    let mounted = true

    const loadData = async () => {
      const snapshot = await readRuntimeSnapshot()
      if (!mounted) return
      setTemplates(snapshot.templates)
      setEnabled(snapshot.atMenuEnabled)
      setTrigger(snapshot.searchTrigger)
    }

    void loadData()

    const handleStorage = (changes: Record<string, chrome.storage.StorageChange>, area: string) => {
      if (area === 'sync' && (changes.templates || changes.atMenuEnabled || changes.searchTrigger)) void loadData()
    }

    chrome.storage?.onChanged?.addListener(handleStorage)
    return () => {
      mounted = false
      chrome.storage?.onChanged?.removeListener(handleStorage)
    }
  }, [])

  React.useEffect(() => {
    const handleInput = (event: Event) => {
      if (isInsideExtensionUi(event.target)) return
      if (!enabled || !isEditableElement(event.target)) return

      const input = event.target
      const value = editableValue(input)
      const cursorPos = 'selectionStart' in input && typeof input.selectionStart === 'number'
        ? input.selectionStart || 0
        : value.length

      let triggerPosition = -1
      for (let index = cursorPos - 1; index >= 0; index -= 1) {
        if (value.slice(index, index + trigger.length) === trigger) {
          triggerPosition = index
          break
        }
        if (/\s/.test(value[index])) break
      }

      if (triggerPosition === -1) {
        setActive(false)
        return
      }

      const search = value.substring(triggerPosition + trigger.length, cursorPos)
      if (search.includes(' ')) {
        setActive(false)
        return
      }

      const matching = templates.filter((template) => {
        const query = search.toLowerCase()
        return template.title.toLowerCase().includes(query) || Boolean(template.tag?.toLowerCase().includes(query))
      })

      if (matching.length === 0) {
        setActive(false)
        return
      }

      const rect = input.getBoundingClientRect()
      setInputElement(input)
      setTriggerPos(triggerPosition)
      setSearchText(search)
      setFiltered(matching)
      setSelectedIndex(0)
      const estimatedHeight = Math.min(250, Math.max(44, matching.length * 34))
      const placeAbove = rect.top > estimatedHeight + 12
      const menuWidth = 240

      setPosition({
        top: placeAbove ? rect.top - 8 : Math.min(window.innerHeight - estimatedHeight - 8, rect.bottom + 8),
        left: Math.min(Math.max(8, rect.left), window.innerWidth - menuWidth - 8),
        placement: placeAbove ? 'above' : 'below',
      })
      setActive(true)
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (!active) return

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelectedIndex((index) => (index + 1) % filtered.length)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelectedIndex((index) => (index - 1 + filtered.length) % filtered.length)
      } else if (event.key === 'Enter') {
        event.preventDefault()
        const template = filtered[selectedIndex]
        if (template) insertAtTemplate(template)
      } else if (event.key === 'Escape') {
        event.preventDefault()
        setActive(false)
      }
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (active && !target?.closest('[data-opspost-at-menu]')) setActive(false)
    }

    document.addEventListener('input', handleInput)
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('input', handleInput)
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('click', handleClick)
    }
  }, [active, enabled, filtered, selectedIndex, templates, trigger])

  const insertAtTemplate = (template: Template) => {
    if (!inputElement) return

    const resolvedText = resolveTemplateText(template.text)
    if (resolvedText === null) return

    const value = editableValue(inputElement)
    const before = value.substring(0, triggerPos)
    const after = value.substring(triggerPos + trigger.length + searchText.length)
    const newValue = before + resolvedText + after
    setNativeValue(inputElement, newValue)

    const cursorPosition = before.length + resolvedText.length
    if ('setSelectionRange' in inputElement) inputElement.setSelectionRange(cursorPosition, cursorPosition)

    inputElement.focus()
    setActive(false)
  }

  if (!active || !enabled) return null

  return (
    <div
      data-opspost-at-menu
      className="fixed z-[2147483647] max-h-[250px] min-w-[220px] overflow-y-auto rounded-lg border border-border bg-popover text-popover-foreground shadow-2xl"
      style={{
        top: position.top,
        left: position.left,
        transform: position.placement === 'above' ? 'translateY(-100%)' : 'none',
      }}
    >
      {filtered.map((template, index) => (
        <button
          key={template.id}
          type="button"
          className={cn(
            'flex w-full items-center justify-between px-2 py-1.5 cursor-pointer text-xs border-b last:border-b-0 text-left',
            index === selectedIndex ? 'bg-muted' : 'hover:bg-muted'
          )}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => insertAtTemplate(template)}
        >
          <span className="font-medium">{template.title}</span>
          {template.tag && <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded ml-2">{template.tag}</span>}
        </button>
      ))}
    </div>
  )
}


