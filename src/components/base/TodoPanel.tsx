import React from 'react'
import { AlarmClock, CalendarClock, CheckCircle2, Circle, Flag, ListTodo, Plus, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAppStore } from '@/store'
import { cn } from '@/lib/utils'
import { translate } from '@/lib/i18n'
import type { TodoItem } from '@/types'

type TodoFilter = 'all' | 'active' | 'due' | 'reminders' | 'done'

export function TodoPanel() {
  const todos = useAppStore((state) => state.todos)
  const language = useAppStore((state) => state.settings.uiLanguage)
  const addTodo = useAppStore((state) => state.addTodo)
  const updateTodo = useAppStore((state) => state.updateTodo)
  const toggleTodo = useAppStore((state) => state.toggleTodo)
  const deleteTodo = useAppStore((state) => state.deleteTodo)
  const clearDoneTodos = useAppStore((state) => state.clearDoneTodos)
  const [text, setText] = React.useState('')
  const [dueAt, setDueAt] = React.useState('')
  const [reminderAt, setReminderAt] = React.useState('')
  const [priority, setPriority] = React.useState<TodoItem['priority']>('normal')
  const [filter, setFilter] = React.useState<TodoFilter>('all')
  const [textError, setTextError] = React.useState('')
  const textRef = React.useRef<HTMLInputElement>(null)
  const t = React.useCallback((key: string) => translate(language, key), [language])

  const now = Date.now()
  const doneCount = todos.filter((todo) => todo.done).length
  const activeCount = todos.length - doneCount
  const dueCount = todos.filter((todo) => isOverdue(todo, now)).length
  const reminderCount = todos.filter((todo) => isReminderReady(todo, now)).length

  const sortedTodos = React.useMemo(() => {
    return [...todos].sort((left, right) => {
      if (left.done !== right.done) return left.done ? 1 : -1
      const leftDate = left.dueAt ? new Date(left.dueAt).getTime() : Number.POSITIVE_INFINITY
      const rightDate = right.dueAt ? new Date(right.dueAt).getTime() : Number.POSITIVE_INFINITY
      if (leftDate !== rightDate) return leftDate - rightDate
      return priorityWeight(right.priority) - priorityWeight(left.priority)
    })
  }, [todos])

  const filteredTodos = sortedTodos.filter((todo) => {
    if (filter === 'active') return !todo.done
    if (filter === 'due') return isOverdue(todo, now)
    if (filter === 'reminders') return isReminderReady(todo, now)
    if (filter === 'done') return todo.done
    return true
  })

  const handleAdd = () => {
    if (!text.trim()) {
      setTextError(t('textRequired'))
      textRef.current?.focus()
      return
    }

    addTodo({
      text,
      dueAt: dueAt || null,
      reminderAt: reminderAt || null,
      priority,
    })
    setText('')
    setDueAt('')
    setReminderAt('')
    setPriority('normal')
    setTextError('')
  }

  return (
    <div className="bg-background p-5">
      <div className="flex w-full flex-col gap-4">
        <section className="rounded-lg border bg-card p-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <ListTodo className="h-4 w-4 text-primary" />
                {t('todoTitle')}
              </h3>
              <p className="text-xs text-muted-foreground">{t('todoDescription')}</p>
            </div>
            <Button size="sm" variant="outline" onClick={clearDoneTodos} disabled={doneCount === 0}>
              {t('clearDone')}
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap items-start gap-2">
            <div className="min-w-[240px] flex-1">
              <Input
                ref={textRef}
                placeholder={t('todoPlaceholder')}
                value={text}
                onChange={(event) => {
                  setText(event.target.value)
                  if (textError) setTextError('')
                }}
                onKeyDown={(event) => { if (event.key === 'Enter') handleAdd() }}
                aria-invalid={Boolean(textError)}
                className={cn(textError && 'border-destructive ring-1 ring-destructive/40')}
              />
              {textError && <div className="mt-1 text-xs text-destructive">{textError}</div>}
            </div>
            <Input className="w-[180px]" type="datetime-local" value={dueAt} onChange={(event) => setDueAt(event.target.value)} title={t('deadline')} />
            <Input className="w-[180px]" type="datetime-local" value={reminderAt} onChange={(event) => setReminderAt(event.target.value)} title={t('remind')} />
            <select
              className="h-8 w-[132px] rounded-lg border border-input bg-background px-3 text-sm shadow-sm"
              value={priority}
              onChange={(event) => setPriority(event.target.value as TodoItem['priority'])}
            >
              <option value="low">{t('low')}</option>
              <option value="normal">{t('normal')}</option>
              <option value="high">{t('high')}</option>
            </select>
            <Button onClick={handleAdd}>
              <Plus className="mr-1 h-4 w-4" />
              {t('add')}
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>{t('all')}: {todos.length}</FilterButton>
            <FilterButton active={filter === 'active'} onClick={() => setFilter('active')}>{t('active')}: {activeCount}</FilterButton>
            <FilterButton active={filter === 'due'} danger={dueCount > 0} onClick={() => setFilter('due')}>{t('overdue')}: {dueCount}</FilterButton>
            <FilterButton active={filter === 'reminders'} onClick={() => setFilter('reminders')}>{t('reminders')}: {reminderCount}</FilterButton>
            <FilterButton active={filter === 'done'} onClick={() => setFilter('done')}>{t('done')}: {doneCount}</FilterButton>
          </div>
        </section>

        <section className="space-y-2">
          {filteredTodos.length === 0 ? (
            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              {t('todoEmpty')}
            </div>
          ) : (
            filteredTodos.map((todo) => {
              const overdue = isOverdue(todo, now)
              const reminderReady = isReminderReady(todo, now)

              return (
                <article
                  key={todo.id}
                  className={cn(
                    'rounded-lg border bg-card p-3 shadow-sm transition-colors',
                    overdue && 'border-destructive/50 bg-destructive/5',
                    reminderReady && !overdue && 'border-amber-500/50 bg-amber-500/5'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <button type="button" onClick={() => toggleTodo(todo.id)} className="mt-1 text-primary">
                      {todo.done ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                    </button>

                    <div className="min-w-0 flex-1 space-y-2">
                      <Input
                        value={todo.text}
                        onChange={(event) => updateTodo(todo.id, { text: event.target.value })}
                        className={cn('font-medium', todo.done && 'line-through text-muted-foreground')}
                      />

                      <div className="flex flex-wrap gap-2">
                        <Input className="w-[180px]" type="datetime-local" value={todo.dueAt || ''} onChange={(event) => updateTodo(todo.id, { dueAt: event.target.value || null })} title={t('deadline')} />
                        <Input className="w-[180px]" type="datetime-local" value={todo.reminderAt || ''} onChange={(event) => updateTodo(todo.id, { reminderAt: event.target.value || null })} title={t('remind')} />
                        <select
                          className="h-8 w-[132px] rounded-lg border border-input bg-background px-3 text-sm shadow-sm"
                          value={todo.priority}
                          onChange={(event) => updateTodo(todo.id, { priority: event.target.value as TodoItem['priority'] })}
                        >
                          <option value="low">{t('low')}</option>
                          <option value="normal">{t('normal')}</option>
                          <option value="high">{t('high')}</option>
                        </select>
                        <div className="flex min-w-[220px] flex-1 flex-wrap items-center gap-2">
                          <PriorityBadge priority={todo.priority} language={language} />
                          {todo.dueAt && (
                            <Badge variant={overdue ? 'destructive' : 'secondary'} className="gap-1">
                              <CalendarClock className="h-3 w-3" />
                              {overdue ? `${t('overdue')}: ` : `${t('deadline')}: `}
                              {formatDate(todo.dueAt, language)}
                            </Badge>
                          )}
                          {todo.reminderAt && (
                            <Badge variant={reminderReady ? 'default' : 'outline'} className="gap-1">
                              <AlarmClock className="h-3 w-3" />
                              {reminderReady ? t('reminderReady') : t('reminderAt')}
                              {formatDate(todo.reminderAt, language)}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => deleteTodo(todo.id)} title={t('deleteTask')}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              )
            })
          )}
        </section>
      </div>
    </div>
  )
}

function FilterButton({
  active,
  danger,
  onClick,
  children,
}: {
  active: boolean
  danger?: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 transition-colors',
        active ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-muted',
        danger && !active && 'border-destructive/50 text-destructive'
      )}
    >
      {children}
    </button>
  )
}

function PriorityBadge({ priority, language }: { priority: TodoItem['priority']; language: 'ru' | 'en' }) {
  const label = priority === 'high' ? translate(language, 'high') : priority === 'low' ? translate(language, 'low') : translate(language, 'normal')

  return (
    <Badge variant={priority === 'high' ? 'destructive' : 'outline'} className="gap-1">
      <Flag className="h-3 w-3" />
      {label}
    </Badge>
  )
}

function isOverdue(todo: TodoItem, now: number) {
  return Boolean(!todo.done && todo.dueAt && new Date(todo.dueAt).getTime() < now)
}

function isReminderReady(todo: TodoItem, now: number) {
  return Boolean(!todo.done && todo.reminderAt && new Date(todo.reminderAt).getTime() < now)
}

function priorityWeight(priority: TodoItem['priority']) {
  if (priority === 'high') return 3
  if (priority === 'normal') return 2
  return 1
}

function formatDate(value: string, language: 'ru' | 'en') {
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
