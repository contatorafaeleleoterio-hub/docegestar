// Sistema de sombras — DoceGestar Design System "Moderno Suave"
// Sombras pink-tinted (iOS: shadow* props | Android: elevation)
// Fonte: design_handoff_docegestar — convertido de CSS box-shadow para RN

import { Platform, ViewStyle } from 'react-native';
import { colors } from './colors';

// Soft: cards e seções flutuantes leves
// CSS original: 0 2px 8px rgba(40,20,60,0.04), 0 16px 40px rgba(236,55,121,0.06)
export const shadowSoft: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#EC3779',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
  android: {
    elevation: 2,
  },
  default: {
    shadowColor: '#EC3779',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
  },
}) as ViewStyle;

// Card: elementos interativos com profundidade moderada
// CSS original: 0 1px 2px rgba(40,20,60,0.04), 0 8px 28px rgba(40,20,60,0.06)
export const shadowCard: ViewStyle = Platform.select({
  ios: {
    shadowColor: 'rgba(40,20,60,1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
  },
  android: {
    elevation: 3,
  },
  default: {
    shadowColor: 'rgba(40,20,60,1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
  },
}) as ViewStyle;

// CTA: botões primários e elementos de chamada para ação
// CSS original: 0 12px 28px rgba(236,55,121,0.4)
export const shadowCta: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#EC3779',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
  },
  android: {
    elevation: 6,
  },
  default: {
    shadowColor: '#EC3779',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
  },
}) as ViewStyle;

// Card grande: cards de destaque flutuantes (marco da semana, CTA)
// CSS: 0 8px 28px rgba(31,26,46,0.06)
export const shadowCardLg: ViewStyle = Platform.select({
  ios: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
  },
  android: {
    elevation: 2,
  },
  default: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
  },
}) as ViewStyle;

// Card médio: cards leves (carrossel da semana, ações rápidas)
// CSS: 0 6px 20px rgba(31,26,46,0.05)
export const shadowCardMd: ViewStyle = Platform.select({
  ios: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
  android: {
    elevation: 2,
  },
  default: {
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
  },
}) as ViewStyle;

export const shadows = {
  soft: shadowSoft,
  card: shadowCard,
  cardLg: shadowCardLg,
  cardMd: shadowCardMd,
  cta: shadowCta,
  primary: shadowCta,
  error: shadowSoft,
} as const;
