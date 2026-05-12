import { TextStyle } from 'react-native';

// Tipografia — DoceGestar Design System "Moderno Suave"
// Headlines/UI: Plus Jakarta Sans (800/700/600/500)
// Editorial (pull quotes): Fraunces 500 Italic
// Fontes carregadas em app/_layout.tsx via @expo-google-fonts

export const typography = {
  // --- Display ---
  display: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 56,
    lineHeight: 64,
    letterSpacing: -2,
  } as TextStyle,

  // --- Headlines (Plus Jakarta Sans) ---
  h1: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -1.2,
  } as TextStyle,

  h2: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.6,
  } as TextStyle,

  h3: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.2,
  } as TextStyle,

  // --- Body (Plus Jakarta Sans 500) ---
  body: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    lineHeight: 22,
  } as TextStyle,

  bodySmall: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    lineHeight: 20,
  } as TextStyle,

  // --- Labels / Metadados ---
  label: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,

  labelMd: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,

  caption: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
  } as TextStyle,

  eyebrow: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 1.2,
  } as TextStyle,

  // --- Editorial (Fraunces italic — pull quotes, destaques emocionais) ---
  editorial: {
    fontFamily: 'Fraunces_500Medium_Italic',
    fontSize: 18,
    lineHeight: 26,
  } as TextStyle,
} as const;
