// Design System: "The Ethereal Cradle" — DoceGestar
// Source: docs/design_system/Design_Tokens_DoceGesta.txt

export const colors = {
  // --- Primary (ferrugem quente) ---
  primary: '#9a442d',
  primaryLight: '#ffdbd2',       // primary_fixed — lavagem de fundo
  primaryContainer: '#e07a5f',   // primary_container
  primaryFixedDim: '#ffb4a1',
  onPrimary: '#ffffff',

  // --- Secondary (âmbar profundo) ---
  secondary: '#8e4e14',
  secondaryContainer: '#ffab69',
  secondaryFixed: '#ffdcc4',
  secondaryFixedDim: '#ffb780',
  onSecondary: '#ffffff',

  // --- Tertiary / Accent (teal) ---
  accent: '#436370',             // tertiary_base
  accentContainer: '#7b9baa',    // tertiary_container
  accentLight: '#c6e8f8',        // tertiary_fixed
  accentDim: '#abcbdb',          // tertiary_fixed_dim
  onAccent: '#ffffff',

  // --- Neutros de superfície ---
  background: '#fbf9f5',         // creme perolado
  surface: '#fbf9f5',
  surfaceBright: '#fbf9f5',
  surfaceDim: '#dbdad6',

  // --- Hierarquia de containers ---
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f5f3ef',
  surfaceContainer: '#efeeea',
  surfaceContainerHigh: '#eae8e4',
  surfaceContainerHighest: '#e4e2de',
  surfaceVariant: '#e4e2de',

  // --- Texto ---
  text: '#1b1c1a',               // on_surface — nunca preto puro
  textSecondary: '#55423e',      // on_surface_variant
  textLight: '#88726d',          // outline

  // --- Bordas / Contornos ---
  border: '#dbc1ba',             // outline_variant — "ghost border"
  outline: '#88726d',

  // --- Semânticos ---
  success: '#436370',            // usa teal como sucesso
  warning: '#ffab69',
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  info: '#7b9baa',

  // --- UI utilitários ---
  card: '#ffffff',               // surfaceContainerLowest
  divider: '#efeeea',            // surfaceContainer — sem bordas 1px sólidas
  disabled: '#e4e2de',           // surfaceContainerHighest
  overlay: 'rgba(27, 28, 26, 0.5)', // on_surface em 50%

  // --- Trimestres (mantidos para compatibilidade) ---
  trimester1: '#ffb4a1',         // primary_fixed_dim
  trimester2: '#abcbdb',         // tertiary_fixed_dim
  trimester3: '#c6e8f8',         // tertiary_fixed
} as const;

export type ColorKey = keyof typeof colors;
