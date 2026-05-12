// Escala de espaçamento — DoceGestar Design System
// Base 4px. Sem divisores de 1px: use padding 24-32px para separar itens.

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  24: 96,
} as const;

export type SpacingKey = keyof typeof spacing;
