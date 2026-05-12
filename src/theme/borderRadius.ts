// Raios de borda — DoceGestar Design System "Moderno Suave"
// Escala nova: xs→pill. pill:100 substitui o antigo pill:32.
// AVISO: chaves antigas (default/lg/xl/2xl/3xl/bubble/full) foram removidas.
// Todos os usos nos 29 arquivos são corrigidos em DS-3.

export const borderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 26,
  xl: 36,
  pill: 100,
} as const;

export type BorderRadiusKey = keyof typeof borderRadius;
