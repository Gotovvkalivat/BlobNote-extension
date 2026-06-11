import type { AppSettings } from '@/types'
import type { CSSProperties } from 'react'

export const UI_SCALE_OPTIONS: Array<{ value: AppSettings['uiScale']; label: string }> = [
  { value: '70', label: '70%' },
  { value: '80', label: '80%' },
  { value: '90', label: '90%' },
  { value: '100', label: '100%' },
  { value: '110', label: '110%' },
  { value: '120', label: '120%' },
  { value: '130', label: '130%' },
]

export function normalizeUiScale(value: unknown): AppSettings['uiScale'] {
  return value === '70' || value === '80' || value === '90' || value === '110' || value === '120' || value === '130'
    ? value
    : '100'
}

export function uiScaleZoom(value: AppSettings['uiScale']) {
  return Number(value) / 100
}

export function uiScaleStyle(value: AppSettings['uiScale']) {
  return { zoom: uiScaleZoom(value) } as CSSProperties
}
