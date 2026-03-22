export const colors = {
  // Paleta minimalista pastel - DoceGestar
  primary: '#E8A0BF',       // Rosa pastel (principal)
  primaryLight: '#FFF0F5',   // Rosa lavanda (backgrounds)
  secondary: '#C8A2D0',     // Lilás pastel
  accent: '#A8D8B9',        // Verde menta pastel
  accentLight: '#E8F5ED',   // Verde menta claro

  // Trimestres
  trimester1: '#FFD6E0',    // Rosa suave - 1º trimestre
  trimester2: '#D4C5F9',    // Lilás suave - 2º trimestre
  trimester3: '#B5EAD7',    // Verde suave - 3º trimestre

  // Neutros
  background: '#FEFCFD',    // Branco rosado
  surface: '#FFFFFF',
  text: '#4A3B47',          // Cinza escuro com tom quente
  textSecondary: '#8B7D87', // Cinza médio
  textLight: '#B8A9B4',     // Cinza claro

  // Semânticos
  success: '#7BC8A4',
  warning: '#F5D76E',
  error: '#E88B8B',
  info: '#89C4E1',

  // UI
  border: '#F0E4EC',
  divider: '#F5EEF2',
  disabled: '#E0D6DC',
  card: '#FFFFFF',
  overlay: 'rgba(74, 59, 71, 0.5)',
} as const;

export type ColorKey = keyof typeof colors;
