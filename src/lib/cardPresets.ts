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
    mint: {
      cardPreset: 'mint',
      defaultCardColor: '#effbf3',
      favoriteCardColor: '#e8f7ff',
      cardTextColor: '#10251b',
      cardFontFamily: 'inherit',
    },
    paper: {
      cardPreset: 'paper',
      defaultCardColor: '#fffaf0',
      favoriteCardColor: '#f1f7ed',
      cardTextColor: '#221a12',
      cardFontFamily: 'Georgia, serif',
    },
    berry: {
      cardPreset: 'berry',
      defaultCardColor: '#fff1f6',
      favoriteCardColor: '#f3f0ff',
      cardTextColor: '#2a1320',
      cardFontFamily: 'Trebuchet MS, sans-serif',
    },
    sunset: {
      cardPreset: 'sunset',
      defaultCardColor: '#fff3e7',
      favoriteCardColor: '#fff8d8',
      cardTextColor: '#2a1808',
      cardFontFamily: 'inherit',
    },
    steel: {
      cardPreset: 'steel',
      defaultCardColor: '#eef3f8',
      favoriteCardColor: '#edf7f4',
      cardTextColor: '#111827',
      cardFontFamily: 'inherit',
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
    mint: {
      cardPreset: 'mint',
      defaultCardColor: '#143025',
      favoriteCardColor: '#143245',
      cardTextColor: '#f4fff9',
      cardFontFamily: 'inherit',
    },
    paper: {
      cardPreset: 'paper',
      defaultCardColor: '#2c261a',
      favoriteCardColor: '#233020',
      cardTextColor: '#fff8ec',
      cardFontFamily: 'Georgia, serif',
    },
    berry: {
      cardPreset: 'berry',
      defaultCardColor: '#32192a',
      favoriteCardColor: '#252044',
      cardTextColor: '#fff5fb',
      cardFontFamily: 'Trebuchet MS, sans-serif',
    },
    sunset: {
      cardPreset: 'sunset',
      defaultCardColor: '#352011',
      favoriteCardColor: '#332c12',
      cardTextColor: '#fff8ee',
      cardFontFamily: 'inherit',
    },
    steel: {
      cardPreset: 'steel',
      defaultCardColor: '#182332',
      favoriteCardColor: '#172f2b',
      cardTextColor: '#f7fbff',
      cardFontFamily: 'inherit',
    },
  },
}

export function normalizeCardPreset(value: unknown): AppSettings['cardPreset'] {
  return value === 'orchid' ||
    value === 'graphite' ||
    value === 'mint' ||
    value === 'paper' ||
    value === 'berry' ||
    value === 'sunset' ||
    value === 'steel'
    ? value
    : 'lagoon'
}

export function cardPresetFor(theme: AppSettings['theme'], preset: unknown): CardPreset {
  return CARD_PRESETS[theme][normalizeCardPreset(preset)]
}
