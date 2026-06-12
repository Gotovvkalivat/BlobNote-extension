import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, X } from 'lucide-react'
import type { AppSettings, Template, TemplateVariable } from '@/types'
import { translate } from '@/lib/i18n'

interface TemplateEditorProps {
  template: Template | null
  isNew: boolean
  onSave: (data: Omit<Template, 'id' | 'createdAt' | 'updatedAt' | 'order' | 'usageCount'>) => void
  onCancel: () => void
  allTags: string[]
  variables: TemplateVariable[]
  language: AppSettings['uiLanguage']
}

export function TemplateEditor({
  template,
  isNew,
  onSave,
  onCancel,
  allTags,
  variables,
  language,
}: TemplateEditorProps) {
  const [title, setTitle] = React.useState(template?.title || '')
  const [text, setText] = React.useState(template?.text || '')
  const [tag, setTag] = React.useState(template?.tag || '')
  const [showTagDropdown, setShowTagDropdown] = React.useState(false)
  const [errors, setErrors] = React.useState<{ title?: string; text?: string }>({})
  const titleRef = React.useRef<HTMLInputElement>(null)
  const textRef = React.useRef<HTMLTextAreaElement>(null)
  const t = React.useCallback((key: string) => translate(language, key), [language])

  React.useEffect(() => {
    if (isNew || template) {
      setTitle(template?.title || '')
      setText(template?.text || '')
      setTag(template?.tag || '')
      setErrors({})
      window.setTimeout(() => titleRef.current?.focus(), 100)
    }
  }, [template, isNew])

  if (!isNew && !template) {
    return (
      <div className="py-6 text-center text-xs text-muted-foreground">
        {t('selectedNoteHint')}
      </div>
    )
  }

  const handleSubmit = () => {
    const nextErrors = {
      title: title.trim() ? undefined : t('titleRequired'),
      text: text.trim() ? undefined : t('textRequired'),
    }
    setErrors(nextErrors)
    if (nextErrors.title || nextErrors.text) {
      const ref = nextErrors.title ? titleRef.current : textRef.current
      ref?.focus()
      return
    }
    onSave({
      title: title.trim(),
      text: text.trim(),
      tag: tag.trim() || null,
      color: null,
      favorite: template?.favorite || false,
    })
  }

  const filteredTags = allTags.filter((item) => item.toLowerCase().includes(tag.toLowerCase()))

  const insertVariableAtCursor = (variableName: string) => {
    const token = `{{${variableName}}}`
    const textarea = textRef.current
    if (!textarea) {
      setText((current) => `${current}${current.endsWith(' ') || current.length === 0 ? '' : ' '}${token}`)
      return
    }

    const start = textarea.selectionStart ?? text.length
    const end = textarea.selectionEnd ?? start
    const nextText = text.slice(0, start) + token + text.slice(end)
    setText(nextText)

    window.requestAnimationFrame(() => {
      textarea.focus()
      const cursor = start + token.length
      textarea.setSelectionRange(cursor, cursor)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {isNew ? t('newNote') : t('editNote')}
        </h3>
        {template && (
          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onCancel}>
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div>
          <Input
            ref={titleRef}
            placeholder={t('noteTitlePlaceholder')}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              if (errors.title) setErrors((current) => ({ ...current, title: undefined }))
            }}
            maxLength={50}
            aria-invalid={Boolean(errors.title)}
            className={`h-10 text-base ${errors.title ? 'border-destructive ring-1 ring-destructive/40' : ''}`}
          />
          <div className="mt-0.5 flex items-center justify-between gap-2 text-[10px]">
            <span className={errors.title ? 'text-destructive' : 'text-muted-foreground'}>{errors.title || t('requiredField')}</span>
            <span className="text-muted-foreground">{50 - title.length} {t('charsShort')}</span>
          </div>
        </div>

        <div className="relative">
          <Input
            placeholder={t('tagPlaceholder')}
            value={tag}
            onChange={(event) => {
              setTag(event.target.value)
              setShowTagDropdown(true)
            }}
            onFocus={() => setShowTagDropdown(true)}
            onBlur={() => window.setTimeout(() => setShowTagDropdown(false), 200)}
            className="h-10 text-base"
          />
          {showTagDropdown && filteredTags.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-[120px] overflow-y-auto rounded-md border bg-background shadow-lg">
              {filteredTags.map((item) => (
                <button
                  key={item}
                  className="w-full px-2 py-1.5 text-left text-xs hover:bg-muted"
                  onMouseDown={() => {
                    setTag(item)
                    setShowTagDropdown(false)
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <Textarea
          ref={textRef}
          placeholder={t('noteTextPlaceholder')}
          value={text}
          onChange={(event) => {
            setText(event.target.value)
            if (errors.text) setErrors((current) => ({ ...current, text: undefined }))
          }}
          rows={14}
          aria-invalid={Boolean(errors.text)}
          className={`min-h-[300px] resize-y text-base leading-relaxed ${errors.text ? 'border-destructive ring-1 ring-destructive/40' : ''}`}
        />
        {errors.text && <div className="text-[10px] text-destructive">{errors.text}</div>}

        {variables.length > 0 && (
          <div className="rounded-md border bg-muted/30 p-2">
            <div className="mb-2 text-[10px] uppercase tracking-wide text-muted-foreground">
              {t('insertVariable')}
            </div>
            <div className="flex flex-wrap gap-1">
              {variables.map((variable) => (
                <Button
                  key={variable.id}
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-6 text-[11px]"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => insertVariableAtCursor(variable.name)}
                >
                  {`{{${variable.name}}}`}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={handleSubmit}>
            <Save className="mr-1 h-3 w-3" />
            {isNew ? t('create') : t('save')}
          </Button>
          {template && (
            <Button size="sm" variant="outline" onClick={onCancel}>
              {t('cancel')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
