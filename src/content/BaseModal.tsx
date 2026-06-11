import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { KnowledgeBase } from '@/base/KnowledgeBase'

type BaseModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BaseModal({ open, onOpenChange }: BaseModalProps) {
  React.useEffect(() => {
    if (!open) return

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false)
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[2147483646] animate-in fade-in bg-slate-950/45 p-4 text-foreground backdrop-blur-sm duration-150">
      <div className="relative h-full w-full animate-in zoom-in-95 overflow-hidden rounded-lg border bg-background shadow-2xl duration-150">
        <div className="absolute right-3 top-3 z-[2147483646]">
          <Button size="icon" variant="secondary" className="h-9 w-9 rounded-lg shadow" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <KnowledgeBase embedded onAfterInsert={(autoSend) => { if (autoSend) onOpenChange(false) }} />
      </div>
    </div>
  )
}
