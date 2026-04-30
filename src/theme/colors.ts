// Design System: DoceGestar — Paleta v2 (canônica)
// Fonte: DESIGN-v2.md — primary #DB2777, secondary #D4927A (rose-gold)

export const colors = {
  // --- Primary (pink) ---
  primary: '#DB2777',
  primaryDeep: '#9D174D',          // pressed state, gradiente base
  primaryLight: '#FCE7F3',         // primary-soft — lavagem de fundo
  primaryContainer: '#FCE7F3',     // primary-soft
  primaryFixedDim: '#9D174D',      // primary-deep
  primaryTint: '#FFF5FA',          // tint ultra-suave
  onPrimary: '#FFFFFF',

  // --- Secondary (rose-gold) ---
  secondary: '#D4927A',
  secondaryContainer: '#F9EDE8',   // secondary-soft
  secondaryFixed: '#F9EDE8',       // secondary-soft
  secondaryFixedDim: '#2C1810',    // on-secondary
  onSecondary: '#2C1810',

  // --- Accent ---
  accent: '#BC7B6A',               // accent-mauve
  accentContainer: '#F0BAB0',      // accent-blush
  accentLight: '#F9EDE8',          // secondary-soft
  accentDim: '#7A3E2E',            // on-secondary-soft
  onAccent: '#2C1810',

  // --- Superfícies ---
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceBright: '#FFFFFF',
  surfaceDim: '#F9FAFB',           // surface-muted

  // --- Hierarquia de containers ---
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#F9FAFB',  // surface-muted
  surfaceContainer: '#F3F4F6',     // outline-variant
  surfaceContainerHigh: '#E5E7EB', // outline
  surfaceContainerHighest: '#F9FAFB',
  surfaceVariant: '#F9FAFB',

  // --- Texto ---
  text: '#111827',                 // on-surface
  textSecondary: '#6B7280',        // on-surface-variant
  textLight: '#6B7280',            // on-surface-variant

  // --- Bordas / Contornos ---
  border: '#E5E7EB',               // outline
  outline: '#6B7280',              // on-surface-variant

  // --- Semânticos ---
  success: '#166534',
  warning: '#92400E',
  error: '#B91C1C',
  errorContainer: '#FEE2E2',       // error-soft
  onError: '#FFFFFF',
  info: '#1D4ED8',

  // --- UI utilitários ---
  card: '#FFFFFF',
  divider: '#F3F4F6',              // outline-variant
  disabled: '#F9FAFB',             // surface-muted
  overlay: 'rgba(17, 24, 39, 0.5)', // on-surface em 50%

  // --- Trimestres ---
  trimester1: '#FCE7F3',           // primary-soft (rosa suave)
  trimester2: '#F9EDE8',           // secondary-soft (rose-gold suave)
  trimester3: '#FFF5FA',           // primary-tint (ultra-suave)
} as const;

export type ColorKey = keyof typeof colors;
