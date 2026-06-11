import type { AppSettings } from '@/types'

export type CardPreset = Pick<AppSettings, 'cardPreset' | 'defaultCardColor' | 'favoriteCardColor' | 'cardTextColor' | 'cardFontFamily'>

export const CARD_PRESETS: Record<AppSettings['theme'], Record<AppSettings['cardPreset'], CardPreset>> = {
  light: {
    lagoon: {
      cardPreset: 'lagoon',
      defaultCardColor: '#eef7ff',
      favoriteCardColor: '#e9f9f1',
      cardTextColor: '#102033',
      cardFontFamily: 'inherit',
    },
    orchid: {
      cardPreset: 'orchid',
      defaultCardColor: '#f7f0ff',
      favoriteCardColor: '#e8f7ff',
      cardTextColor: '#221835',
      cardFontFamily: 'Trebuchet MS, sans-serif',
    },
    graphite: {
      cardPreset: 'graphite',
      defaultCardColor: '#f6f7f9',
      favoriteCardColor: '#edf6f2',
      cardTextColor: '#111827',
      cardFontFamily: 'Georgia, serif',
    },
  },
  dark: {
    lagoon: {
      cardPreset: 'lagoon',
      defaultCardColor: '#172338',
      favoriteCardColor: '#173529',
      cardTextColor: '#f3f8ff',
      cardFontFamily: 'inherit',
    },
    orchid: {
      cardPreset: 'orchid',
      defaultCardColor: '#251c33',
      favoriteCardColor: '#173044',
      cardTextColor: '#f8f4ff',
      cardFontFamily: 'Trebuchet MS, sans-serif',
    },
    graphite: {
      cardPreset: 'graphite',
      defaultCardColor: '#171b22',
      favoriteCardColor: '#1c2c28',
      cardTextColor: '#f8fafc',
      cardFontFamily: 'Georgia, serif',
    },
  },
}

export function normalizeCardPreset(value: unknown): AppSettings['cardPreset'] {
  return value === 'orchid' || value === 'graphite' ? value : 'lagoon'
}

export function cardPresetFor(theme: AppSettings['theme'], preset: unknown): CardPreset {
  return CARD_PRESETS[theme][normalizeCardPreset(preset)]
}
