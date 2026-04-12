// DoceGestar — Cuidados por Trimestre (PRD 4.4)

export type TipCategory = 'sono' | 'alimentação' | 'movimento' | 'emocional';

export interface CareTip {
  text: string;
  category: TipCategory;
}

export const DAILY_TIPS: CareTip[] = [
  { text: 'Priorizar qualidade do sono', category: 'sono' },
  { text: 'Dormir de lado (preferencialmente lado esquerdo)', category: 'sono' },
  { text: 'Descansar nos momentos de enjoo intenso', category: 'sono' },
  { text: 'Beber pelo menos 2L de água por dia', category: 'alimentação' },
  { text: 'Alimentação natural e variada', category: 'alimentação' },
  { text: 'Evitar cafeína em excesso (máx. 200mg/dia)', category: 'alimentação' },
  { text: 'Tomar vitaminas prescritas pelo médico', category: 'alimentação' },
  { text: 'Tomar ácido fólico diariamente', category: 'alimentação' },
  { text: 'Evitar álcool e tabaco completamente', category: 'alimentação' },
  { text: 'Exercício leve (caminhada ou alongamento)', category: 'movimento' },
  { text: 'Fazer exercícios pélvicos (Kegel)', category: 'movimento' },
  { text: 'Monitorar os movimentos do bebê diariamente', category: 'movimento' },
  { text: 'Momentos de relaxamento e descanso', category: 'emocional' },
  { text: 'Hidratar a barriga com creme ou óleo', category: 'emocional' },
  { text: 'Usar protetor solar para prevenir melasma', category: 'emocional' },
  { text: 'Iniciar preparação para o parto', category: 'emocional' },
  { text: 'Montar a mala da maternidade', category: 'emocional' },
  { text: 'Considerar curso de amamentação', category: 'emocional' },
  { text: 'Elaborar o plano de parto', category: 'emocional' },
  { text: 'Ter atenção especial a medicamentos (consultar médico)', category: 'emocional' },
];

// Cuidados base (todos os trimestres)
export const CARE_BASE: string[] = [
  'Tomar vitaminas prescritas pelo médico',
  'Beber pelo menos 2L de água por dia',
  'Exercício leve (caminhada ou alongamento)',
  'Evitar cafeína em excesso (máx. 200mg/dia)',
  'Alimentação natural e variada',
  'Momentos de relaxamento e descanso',
  'Priorizar qualidade do sono',
];

// Cuidados adicionais do 1º trimestre (semanas 1–13)
export const CARE_T1: string[] = [
  'Tomar ácido fólico diariamente',
  'Evitar álcool e tabaco completamente',
  'Ter atenção especial a medicamentos (consultar médico)',
  'Descansar nos momentos de enjoo intenso',
];

// Cuidados adicionais do 2º trimestre (semanas 14–27)
export const CARE_T2: string[] = [
  'Fazer exercícios pélvicos (Kegel)',
  'Usar protetor solar para prevenir melasma',
  'Hidratar a barriga com creme ou óleo',
  'Dormir de lado (preferencialmente lado esquerdo)',
];

// Cuidados adicionais do 3º trimestre (semanas 28–40)
export const CARE_T3: string[] = [
  'Iniciar preparação para o parto',
  'Montar a mala da maternidade',
  'Considerar curso de amamentação',
  'Monitorar os movimentos do bebê diariamente',
  'Elaborar o plano de parto',
];
