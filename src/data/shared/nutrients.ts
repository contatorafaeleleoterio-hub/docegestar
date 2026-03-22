// DoceGestar — Nutrientes Prioritários com Alimentos-Fonte (PRD 4.3)
// Cada semana seleciona 6 nutrientes de maior prioridade para o período

import type { NutrientEntry } from '../../types';

export const ALL_NUTRIENTS: NutrientEntry[] = [
  {
    name: 'Ácido Fólico',
    dose: '400–800 mcg/dia',
    foods: ['Espinafre', 'Brócolis', 'Feijão', 'Cereais integrais', 'Grão-de-bico'],
  },
  {
    name: 'Ferro',
    dose: '27 mg/dia',
    foods: ['Carne vermelha magra', 'Lentilha', 'Folhas escuras', 'Beterraba', 'Feijão-preto'],
  },
  {
    name: 'Vitamina C',
    dose: '85 mg/dia',
    foods: ['Laranja', 'Morango', 'Tomate', 'Mamão', 'Brócolis'],
  },
  {
    name: 'Zinco',
    dose: '11 mg/dia',
    foods: ['Carne bovina', 'Grão-de-bico', 'Castanhas', 'Cereais integrais', 'Sementes de abóbora'],
  },
  {
    name: 'Cálcio',
    dose: '1.000 mg/dia',
    foods: ['Leite integral', 'Iogurte natural', 'Couve', 'Gergelim', 'Sardinha'],
  },
  {
    name: 'Ômega-3 (DHA)',
    dose: '200–300 mg/dia',
    foods: ['Salmão', 'Sardinha', 'Linhaça', 'Chia', 'Nozes'],
  },
  {
    name: 'Vitamina D',
    dose: '600–800 UI/dia',
    foods: ['Sol (15 min/dia)', 'Gema de ovo', 'Salmão', 'Sardinha', 'Cogumelos'],
  },
  {
    name: 'Proteínas',
    dose: '71 g/dia',
    foods: ['Frango', 'Ovos', 'Feijão', 'Lentilha', 'Tofu'],
  },
  {
    name: 'Fibras',
    dose: '28 g/dia',
    foods: ['Aveia', 'Frutas com casca', 'Brócolis', 'Cenoura', 'Chia'],
  },
  {
    name: 'Vitamina B6',
    dose: '1,9 mg/dia',
    foods: ['Banana', 'Frango', 'Batata-doce', 'Abacate', 'Grão-de-bico'],
  },
  {
    name: 'Iodo',
    dose: '220 mcg/dia',
    foods: ['Sal iodado', 'Peixes marinhos', 'Leite', 'Iogurte', 'Ovos'],
  },
];

// Nutrientes por índice no array acima:
// 0 = Ácido Fólico, 1 = Ferro, 2 = Vitamina C, 3 = Zinco, 4 = Cálcio
// 5 = Ômega-3, 6 = Vitamina D, 7 = Proteínas, 8 = Fibras, 9 = Vitamina B6, 10 = Iodo

// Prioridade por trimestre (PRD 4.3):
// 1º Tri: Ácido Fólico(Alta), Zinco(Alta), Vit B6(Alta), Iodo(Alta), Vit C(Média), Ferro(Média)
// 2º Tri: Ferro(Alta), Cálcio(Alta), Ômega-3(Alta), Proteínas(Alta), Zinco(Média), Vit C(Média)
// 3º Tri: Ferro(Alta), Cálcio(Alta), Ômega-3(Alta), Proteínas(Alta), Vit D(Alta), Fibras(Alta)

export const NUTRIENTS_T1: NutrientEntry[] = [
  ALL_NUTRIENTS[0], // Ácido Fólico
  ALL_NUTRIENTS[3], // Zinco
  ALL_NUTRIENTS[9], // Vitamina B6
  ALL_NUTRIENTS[10], // Iodo
  ALL_NUTRIENTS[2], // Vitamina C
  ALL_NUTRIENTS[1], // Ferro
];

export const NUTRIENTS_T2: NutrientEntry[] = [
  ALL_NUTRIENTS[1], // Ferro
  ALL_NUTRIENTS[4], // Cálcio
  ALL_NUTRIENTS[5], // Ômega-3
  ALL_NUTRIENTS[7], // Proteínas
  ALL_NUTRIENTS[3], // Zinco
  ALL_NUTRIENTS[2], // Vitamina C
];

export const NUTRIENTS_T3: NutrientEntry[] = [
  ALL_NUTRIENTS[1], // Ferro
  ALL_NUTRIENTS[4], // Cálcio
  ALL_NUTRIENTS[5], // Ômega-3
  ALL_NUTRIENTS[7], // Proteínas
  ALL_NUTRIENTS[6], // Vitamina D
  ALL_NUTRIENTS[8], // Fibras
];
