// DoceGestar — Mapa de imagens 3D (semana gestacional → fruta/legume)
// require() exige caminho literal estático no React Native — 40 entradas explícitas.
// Semanas 1–2: aglomerado de células (sem fruta). Semanas 3–40: fruta da semana.

import type { ImageSourcePropType } from 'react-native';

const FRUIT_IMAGES: Record<number, ImageSourcePropType> = {
  1: require('../../assets/fruits/celula.png'),
  2: require('../../assets/fruits/celula.png'),
  3: require('../../assets/fruits/fruta-03.png'),
  4: require('../../assets/fruits/fruta-04.png'),
  5: require('../../assets/fruits/fruta-05.png'),
  6: require('../../assets/fruits/fruta-06.png'),
  7: require('../../assets/fruits/fruta-07.png'),
  8: require('../../assets/fruits/fruta-08.png'),
  9: require('../../assets/fruits/fruta-09.png'),
  10: require('../../assets/fruits/fruta-10.png'),
  11: require('../../assets/fruits/fruta-11.png'),
  12: require('../../assets/fruits/fruta-12.png'),
  13: require('../../assets/fruits/fruta-13.png'),
  14: require('../../assets/fruits/fruta-14.png'),
  15: require('../../assets/fruits/fruta-15.png'),
  16: require('../../assets/fruits/fruta-16.png'),
  17: require('../../assets/fruits/fruta-17.png'),
  18: require('../../assets/fruits/fruta-18.png'),
  19: require('../../assets/fruits/fruta-19.png'),
  20: require('../../assets/fruits/fruta-20.png'),
  21: require('../../assets/fruits/fruta-21.png'),
  22: require('../../assets/fruits/fruta-22.png'),
  23: require('../../assets/fruits/fruta-23.png'),
  24: require('../../assets/fruits/fruta-24.png'),
  25: require('../../assets/fruits/fruta-25.png'),
  26: require('../../assets/fruits/fruta-26.png'),
  27: require('../../assets/fruits/fruta-27.png'),
  28: require('../../assets/fruits/fruta-28.png'),
  29: require('../../assets/fruits/fruta-29.png'),
  30: require('../../assets/fruits/fruta-30.png'),
  31: require('../../assets/fruits/fruta-31.png'),
  32: require('../../assets/fruits/fruta-32.png'),
  33: require('../../assets/fruits/fruta-33.png'),
  34: require('../../assets/fruits/fruta-34.png'),
  35: require('../../assets/fruits/fruta-35.png'),
  36: require('../../assets/fruits/fruta-36.png'),
  37: require('../../assets/fruits/fruta-37.png'),
  38: require('../../assets/fruits/fruta-38.png'),
  39: require('../../assets/fruits/fruta-39.png'),
  40: require('../../assets/fruits/fruta-40.png'),
};

// Retorna a imagem 3D da semana (1–40). Fora do intervalo → célula (fallback seguro).
export function getFruitImage(week: number): ImageSourcePropType {
  return FRUIT_IMAGES[week] ?? FRUIT_IMAGES[1];
}
