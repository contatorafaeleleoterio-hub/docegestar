// Design System: DoceGestar — "Moderno Suave" (Paleta v3 canônica)
// Fonte: design_handoff_docegestar — primary #EC3779, lavanda #C9B8E8, bg #FBF7FA

export const colors = {
  // --- Primary (pink) ---
  primary: '#EC3779',               // pink500
  primaryDeep: '#C8255F',           // pink600 — pressed state, gradiente base
  primaryLight: '#FFF1F5',          // pink50 — lavagem de fundo
  primaryContainer: '#FFD9E4',      // pink100
  primaryTint: '#FFF1F5',           // pink50 — tint ultra-suave
  onPrimary: '#FFFFFF',

  // --- Pink scale ---
  pink200: '#F9A8C9',
  pink300: '#F472A8',
  pink400: '#EC5C93',
  pink500: '#EC3779',

  // --- Secondary / Lavanda ---
  secondary: '#C9B8E8',             // lav400
  secondaryContainer: '#F4F0FB',    // lav50
  secondaryFixed: '#F4F0FB',        // lav50
  onSecondary: '#3B2D6E',

  // --- Lavanda scale ---
  lav50: '#F4F0FB',
  lav100: '#E8DFFA',
  lav200: '#C9B8E8',

  // --- Accent ---
  inkSubtle: '#8A7FA0',             // texto terciário / placeholders
  surfaceAlt: '#F0EBF8',            // superfície alternativa lavanda suave

  // --- Superfícies ---
  background: '#FBF7FA',            // bg — creme rosado
  surface: '#FFFFFF',
  surfaceBright: '#FFFFFF',
  surfaceDim: '#F4F0FB',            // lav50

  // --- Hierarquia de containers ---
  surfaceContainerLowest: '#FFFFFF',
  surfaceContainerLow: '#FBF7FA',
  surfaceContainer: '#F4F0FB',      // lav50
  surfaceContainerHigh: '#EDE7F3',  // hairline
  surfaceContainerHighest: '#F4F0FB',
  surfaceVariant: '#F4F0FB',

  // --- Texto ---
  text: '#1F1A2E',                  // ink
  textSecondary: '#5E5870',         // inkMuted
  textLight: '#5E5870',             // inkMuted

  // --- Bordas / Contornos ---
  border: '#EDE7F3',                // hairline
  outline: '#5E5870',               // inkMuted

  // --- Semânticos ---
  success: '#3DB57E',
  warning: '#F0A23A',
  error: '#E15858',
  errorContainer: '#FDDEDE',
  successContainer: '#DCFCE7',
  onError: '#FFFFFF',
  info: '#1D4ED8',

  // --- UI utilitários ---
  card: '#FFFFFF',
  divider: '#EDE7F3',               // hairline
  disabled: '#F4F0FB',              // lav50
  overlay: 'rgba(31, 26, 46, 0.5)', // ink em 50%

  // --- Trimestres ---
  trimester1: '#FFF1F5',            // pink50 (rosa suave)
  trimester2: '#F4F0FB',            // lav50 (lavanda suave)
  trimester3: '#FBF7FA',            // bg (ultra-suave)
} as const;

export type ColorKey = keyof typeof colors;
