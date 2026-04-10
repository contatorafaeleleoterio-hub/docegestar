// Raios de borda — DoceGestar Design System
// Tudo arredondado: sem cantos vivos, sensação segura e orgânica.

export const borderRadius = {
  default: 4,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  pill: 32,
  bubble: 40,
  full: 9999,
} as const;

export type BorderRadiusKey = keyof typeof borderRadius;
