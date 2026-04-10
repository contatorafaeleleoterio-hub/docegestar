// Sistema de sombras — DoceGestar Design System
// Nunca use sombras Material Design tradicionais. Use sombras ambiente suaves.
// No React Native: shadowColor + shadowOffset + shadowOpacity + shadowRadius (iOS)
//                  + elevation (Android)

import { Platform, ViewStyle } from 'react-native';

// Sombra editorial: elementos flutuantes leves (cards, seções)
export const shadowEditorial: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#1b1c1a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 25,
  },
  android: {
    elevation: 3,
  },
  default: {
    shadowColor: '#1b1c1a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 25,
  },
}) as ViewStyle;

// Sombra tátil: elementos interativos de maior destaque
export const shadowTactile: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#1b1c1a',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
  },
  android: {
    elevation: 6,
  },
  default: {
    shadowColor: '#1b1c1a',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.04,
    shadowRadius: 40,
  },
}) as ViewStyle;

// Sombra ambiente: elementos fixos / overlay
export const shadowAmbient: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#1b1c1a',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
  },
  android: {
    elevation: 2,
  },
  default: {
    shadowColor: '#1b1c1a',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
  },
}) as ViewStyle;

export const shadows = {
  editorial: shadowEditorial,
  tactile: shadowTactile,
  ambient: shadowAmbient,
} as const;
