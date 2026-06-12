import type React from 'react'

export const TAG_COLORS = [
  { value: '#2563eb', bg: '#dbeafe', text: '#1e3a8a', border: '#93c5fd' },
  { value: '#0891b2', bg: '#cffafe', text: '#164e63', border: '#67e8f9' },
  { value: '#059669', bg: '#d1fae5', text: '#064e3b', border: '#6ee7b7' },
  { value: '#65a30d', bg: '#ecfccb', text: '#365314', border: '#bef264' },
  { value: '#d97706', bg: '#fef3c7', text: '#78350f', border: '#fcd34d' },
  { value: '#ea580c', bg: '#ffedd5', text: '#7c2d12', border: '#fdba74' },
  { value: '#dc2626', bg: '#fee2e2', text: '#7f1d1d', border: '#fca5a5' },
  { value: '#db2777', bg: '#fce7f3', text: '#831843', border: '#f9a8d4' },
  { value: '#7c3aed', bg: '#ede9fe', text: '#4c1d95', border: '#c4b5fd' },
  { value: '#475569', bg: '#f1f5f9', text: '#0f172a', border: '#cbd5e1' },
] as const

export type TagColorValue = typeof TAG_COLORS[number]['value']

export function normalizeTagColor(value: unknown): TagColorValue | null {
  return TAG_COLORS.find((color) => color.value === value)?.value || null
}

export function tagColorStyle(value: string | null | undefined): React.CSSProperties | undefined {
  const color = TAG_COLORS.find((item) => item.value === value)
  if (!color) return undefined

  return {
    backgroundColor: color.bg,
    borderColor: color.border,
    color: color.text,
  }
}
