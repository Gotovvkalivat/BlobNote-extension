import React from 'react'
import { Braces, CheckCircle2, Plus, Search, Trash2, Wand2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'
import { translate } from '@/lib/i18n'

type FoundVariable = {
  name: string
  count: number
}

export function VariablesPanel() {
  const templates = useAppStore((state) => state.templates)
  const variables = useAppStore((state) => state.variables)
  const language = useAppStore((state) => state.settings.uiLanguage)
  const addVariable = useAppStore((state) => state.addVariable)
  const updateVariable = useAppStore((state) => state.updateVariable)
  const deleteVariable = useAppStore((state) => state.deleteVariable)
  const [name, setName] = React.useState('')
  const [value, setValue] = React.useState('')
  const t = React.useCallback(
    (key: string, params?: Record<string, string | number>) => translate(language, key, params),
    [language]
  )

  const savedNames = React.useMemo(
    () => new Set(variables.map((variable) => variable.name.toLowerCase())),
    [variables]
  )

  const foundVariables = React.useMemo(() => {
    const map = new Map<string, FoundVariable>()
    const variablePattern = /\{\{\s*([\w.-]+)\s*\}\}/g

    templates.forEach((template) => {
      for (const match of template.text.matchAll(variablePattern)) {
        const rawName = match[1]?.trim()
        if (!rawName || rawName.toLowerCase() === 'date') continue
        const key = rawName.toLowerCase()
        const existing = map.get(key)
        map.set(key, {
          name: existing?.name || rawName,
          count: (existing?.count || 0) + 1,
        })
      }
    })

    return [...map.values()].sort((left, right) => left.name.localeCompare(right.name))
  }, [templates])

  const missingVariables = foundVariables.filter((variable) => !savedNames.has(variable.name.toLowerCase()))

  const handleAdd = (nextName = name, nextValue = value) => {
    const normalizedName = nextName.trim().replace(/\s+/g, '_')
    if (!normalizedName) return
    addVariable({ name: normalizedName, value: nextValue })
    setName('')
    setValue('')
  }

  return (
    <div className="bg-background p-5">
      <div className="flex w-full flex-col gap-4">
        <section className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Braces className="h-4 w-4 text-primary" />
                {t('variablesTitle')}
              </h3>
              <p className="text-xs text-muted-foreground">
                {t('variablesDescription', { example: '{{agent_name}}' })}
              </p>
            </div>
            <Badge variant={missingVariables.length > 0 ? 'destructive' : 'secondary'}>
              {t('found')}: {foundVariables.length}
            </Badge>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Input className="min-w-[180px] flex-1" placeholder="agent_name" value={name} onChange={(event) => setName(event.target.value)} />
            <Input className="min-w-[220px] flex-[1.4]" placeholder={t('variableValuePlaceholder')} value={value} onChange={(event) => setValue(event.target.value)} />
            <Button onClick={() => handleAdd()}>
              <Plus className="mr-1 h-4 w-4" />
              {t('add')}
            </Button>
          </div>
        </section>

        <section className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Search className="h-4 w-4 text-primary" />
                {t('variablesFoundTitle')}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">{t('variablesFoundDescription')}</p>
            </div>
            {missingVariables.length > 0 && (
              <Button size="sm" variant="outline" onClick={() => missingVariables.forEach((variable) => handleAdd(variable.name, ''))}>
                <Wand2 className="mr-1.5 h-3.5 w-3.5" />
                {t('createMissing')}
              </Button>
            )}
          </div>

          {foundVariables.length === 0 ? (
            <div className="rounded-lg border border-dashed p-5 text-center text-sm text-muted-foreground">
              {t('noVariablesInNotes', { example: '{{agent_name}}' })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {foundVariables.map((variable) => {
                const saved = savedNames.has(variable.name.toLowerCase())
                return (
                  <button
                    key={variable.name}
                    type="button"
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors',
                      saved ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-amber-500/10 border-amber-500/40 hover:bg-amber-500/20'
                    )}
                    onClick={() => {
                      if (!saved) handleAdd(variable.name, '')
                    }}
                  >
                    {saved ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Plus className="h-3.5 w-3.5 text-amber-500" />}
                    <span>{`{{${variable.name}}}`}</span>
                    <span className="text-muted-foreground">x{variable.count}</span>
                  </button>
                )
              })}
            </div>
          )}
        </section>

        <section className="space-y-2">
          {variables.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              {t('noSavedVariables')}
            </div>
          ) : (
            variables.map((variable) => (
              <div key={variable.id} className="flex flex-wrap gap-2 rounded-lg border bg-card p-3 shadow-sm">
                <Input className="min-w-[180px] flex-1" value={variable.name} onChange={(event) => updateVariable(variable.id, { name: event.target.value.trim().replace(/\s+/g, '_') })} />
                <Input className="min-w-[220px] flex-[1.4]" value={variable.value} onChange={(event) => updateVariable(variable.id, { value: event.target.value })} />
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteVariable(variable.id)} title={t('deleteVariable')}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  )
}
