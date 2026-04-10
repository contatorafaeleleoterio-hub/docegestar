import { TextStyle } from 'react-native';

// Tipografia — DoceGestar Design System "The Ethereal Cradle"
// Headlines: Noto Serif (editorial, atemporal)
// Body/Label: Manrope (funcional, moderno)
// Fontes carregadas em app/_layout.tsx via @expo-google-fonts

export const typography = {
  // --- Headlines (Noto Serif) ---
  displayLg: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 56,
    letterSpacing: -0.96, // -0.02em para sensação premium
  } as TextStyle,

  h1: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.56,
  } as TextStyle,

  h2: {
    fontFamily: 'NotoSerif_600SemiBold',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  } as TextStyle,

  h3: {
    fontFamily: 'NotoSerif_600SemiBold',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  } as TextStyle,

  // --- Body (Manrope) ---
  body: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  } as TextStyle,

  bodySmall: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  } as TextStyle,

  // --- Labels / Metadados (Manrope) ---
  label: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  } as TextStyle,

  labelMd: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  } as TextStyle,

  caption: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  } as TextStyle,
} as const;
