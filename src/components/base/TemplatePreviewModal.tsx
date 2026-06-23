import React from 'react'
import { Copy, Maximize2, Minimize2, Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { showToast } from '@/components/ui/toast'
import type { AppSettings, Template, TemplateVariable } from '@/types'
import { translate } from '@/lib/i18n'
import { insertTextToActiveField, recordTemplateUse, resolveTemplateText } from '@/lib/templateRuntime'

type TemplatePreviewModalProps = {
  template: Template | null
  variables: TemplateVariable[] | null
  language: AppSettings['uiLanguage']
  allowInsert: boolean
  onInserted?: (autoSend: boolean) => void
  onClose: () => void
}

export function TemplatePreviewModal({ template, variables, language, allowInsert, onInserted, onClose }: TemplatePreviewModalProps) {
  const [text, setText] = React.useState('')
  const [fullSize, setFullSize] = React.useState(false)
  const t = React.useCallback((key: string) => translate(language, key), [language])

  React.useEffect(() => {
    if (!template) return
    const resolved = resolveTemplateText(template.text, variables)
    setText(resolved ?? template.text)
    setFullSize(false)
  }, [template, variables])

  if (!template) return null

  const copyText = () => {
    navigator.clipboard.writeText(text)
    showToast(t('textCopied'), 'success')
  }

  const insertText = (autoSend = false) => {
    const success = insertTextToActiveField(text, autoSend)
    if (!success) {
      showToast(t('inputNotFound'), 'error')
      return
    }

    recordTemplateUse({ id: template.id, title: template.title, text, tag: template.tag })
    onClose()
    onInserted?.(autoSend)
  }

  return (
    <div className="fixed inset-0 z-[2147483630] flex animate-in fade-in items-center justify-center bg-slate-950/40 p-4 text-foreground backdrop-blur-sm duration-150">
      <div className={`flex animate-in zoom-in-95 flex-col overflow-hidden rounded-lg border bg-background shadow-2xl duration-150 ${
        fullSize
          ? 'h-[80vh] max-h-[calc(100vh-48px)] w-[80vw] max-w-[calc(100vw-48px)]'
          : 'max-h-[calc(100vh-48px)] w-[min(760px,calc(100vw-32px))]'
      }`}>
        <div className="flex items-center gap-3 border-b px-4 py-3">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">{template.title}</div>
            <div className="text-[11px] text-muted-foreground">{t('previewHint')}</div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            title={fullSize ? (language === 'en' ? 'Compact view' : 'Обычный размер') : (language === 'en' ? 'Full size' : 'На весь экран')}
            onClick={() => setFullSize((value) => !value)}
          >
            {fullSize ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden p-4">
          <Textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            className={`text-base leading-relaxed ${fullSize ? 'h-full min-h-0 resize-none' : 'min-h-[320px] max-h-[60vh] resize-y'}`}
          />
        </div>

        <div className="flex items-center justify-between gap-2 border-t px-4 py-3">
          <Button variant="outline" onClick={copyText}>
            <Copy className="h-4 w-4 mr-2" />
            {t('copy')}
          </Button>
          {allowInsert && (
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => insertText(false)}>{t('insert')}</Button>
              <Button onClick={() => insertText(true)}>
                <Send className="h-4 w-4 mr-2" />
                {t('insertAndSend')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
