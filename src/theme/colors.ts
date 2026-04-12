// Design System: "The Doce Redesign" — DoceGestar
// Source: docegestar.zip → src/index.css (CSS @theme variables)
// Redesign Visual — Sessão 1 (Story M.1)

export const colors = {
  // --- Primary (magenta) ---
  primary: '#b30064',
  primaryLight: '#ff6ea9',        // primary_container — lavagem de fundo
  primaryContainer: '#ff6ea9',    // primary_container
  primaryFixedDim: '#4b0027',     // on_primary_container
  onPrimary: '#ffeff2',

  // --- Secondary (teal) ---
  secondary: '#00637f',
  secondaryContainer: '#8cdcff',
  secondaryFixed: '#e4f5ff',
  secondaryFixedDim: '#004e64',   // on_secondary_container
  onSecondary: '#e4f5ff',

  // --- Tertiary / Accent (âmbar quente) ---
  accent: '#785500',              // tertiary_base
  accentContainer: '#feb700',     // tertiary_container
  accentLight: '#fff1de',         // on_tertiary
  accentDim: '#533a00',           // on_tertiary_container
  onAccent: '#fff1de',

  // --- Neutros de superfície ---
  background: '#f3f7fb',          // surface — tom frio/neutro
  surface: '#f3f7fb',
  surfaceBright: '#f3f7fb',
  surfaceDim: '#d7dee3',

  // --- Hierarquia de containers ---
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#ecf1f6',
  surfaceContainer: '#e3e9ee',
  surfaceContainerHigh: '#dde3e8',
  surfaceContainerHighest: '#d7dee3',
  surfaceVariant: '#d7dee3',

  // --- Texto ---
  text: '#2a2f32',                // on_surface — nunca preto puro
  textSecondary: '#575c60',       // on_surface_variant
  textLight: '#575c60',           // outline

  // --- Bordas / Contornos ---
  border: '#dde3e8',              // outline_variant — "ghost border"
  outline: '#575c60',

  // --- Semânticos ---
  success: '#00637f',             // secondary (teal) como sucesso
  warning: '#feb700',             // tertiary_container
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  info: '#8cdcff',                // secondary_container

  // --- UI utilitários ---
  card: '#ffffff',                // surfaceContainerLowest
  divider: '#e3e9ee',             // surfaceContainer — sem bordas 1px sólidas
  disabled: '#d7dee3',            // surfaceContainerHighest
  overlay: 'rgba(42, 47, 50, 0.5)', // on_surface em 50%

  // --- Trimestres (mantidos para compatibilidade) ---
  trimester1: '#ff6ea9',          // primary_container — magenta suave
  trimester2: '#8cdcff',          // secondary_container — teal suave
  trimester3: '#fff1de',          // on_tertiary — âmbar claro
} as const;

export type ColorKey = keyof typeof colors;
