// DoceGestar — Calendário de Exames por Período (PRD 4.5)

import type { ExamEntry } from '../../types';

export interface ExamPeriod {
  weekStart: number;
  weekEnd: number;
  exams: ExamEntry[];
}

// Exames recorrentes em toda consulta pré-natal
export const RECURRING_EXAMS: ExamEntry[] = [
  { name: 'Aferição de pressão arterial' },
  { name: 'Medição da altura uterina' },
  { name: 'Verificação de peso' },
  { name: 'Avaliação de edema' },
];

// Calendário de exames específicos por período
export const EXAM_SCHEDULE: ExamPeriod[] = [
  {
    weekStart: 5,
    weekEnd: 8,
    exams: [
      { name: 'Ultrassom inicial', notes: 'Confirmar gestação e batimentos cardíacos' },
      { name: 'Beta-hCG quantitativo' },
      { name: 'Tipagem sanguínea (ABO/Rh)' },
      { name: 'Hemograma completo' },
      { name: 'Glicemia de jejum' },
      { name: 'Sorologias', notes: 'Toxoplasmose, rubéola, HIV, sífilis, hepatite B e C' },
      { name: 'Urina tipo I' },
      { name: 'Urocultura' },
    ],
  },
  {
    weekStart: 11,
    weekEnd: 13,
    exams: [
      { name: 'Ultrassom de translucência nucal' },
      { name: 'Duplo teste bioquímico' },
      { name: 'Sexagem fetal (opcional)', notes: 'Pode ser feita a partir de 8 semanas por sangue' },
    ],
  },
  {
    weekStart: 16,
    weekEnd: 16,
    exams: [
      { name: 'Amniocentese', notes: 'Se indicada por risco genético' },
    ],
  },
  {
    weekStart: 18,
    weekEnd: 22,
    exams: [
      { name: 'Ultrassom morfológico', notes: 'Avaliação completa da anatomia do bebê' },
    ],
  },
  {
    weekStart: 24,
    weekEnd: 28,
    exams: [
      { name: 'TOTG 75g', notes: 'Rastreio de diabetes gestacional' },
      { name: 'Hemograma de controle' },
      { name: 'Coombs indireto', notes: 'Se mãe Rh negativo' },
    ],
  },
  {
    weekStart: 28,
    weekEnd: 28,
    exams: [
      { name: 'Imunoglobulina anti-D', notes: 'Se mãe Rh negativo e pai Rh positivo' },
    ],
  },
  {
    weekStart: 32,
    weekEnd: 32,
    exams: [
      { name: 'Ultrassom de crescimento fetal', notes: 'Peso estimado, líquido amniótico e placenta' },
    ],
  },
  {
    weekStart: 35,
    weekEnd: 37,
    exams: [
      { name: 'Cultura para Streptococcus do grupo B (GBS)', notes: 'Swab vaginal e retal' },
    ],
  },
  {
    weekStart: 36,
    weekEnd: 40,
    exams: [
      { name: 'Consultas semanais com obstetra' },
      { name: 'Cardiotocografia (CTG)', notes: 'Se indicado pelo médico' },
    ],
  },
  {
    weekStart: 37,
    weekEnd: 40,
    exams: [
      { name: 'Avaliação de maturidade fetal' },
      { name: 'Avaliação de bem-estar fetal' },
      { name: 'Discussão sobre indução do parto', notes: 'Se necessário após 40 semanas' },
    ],
  },
];

// Função auxiliar: retorna exames específicos para uma semana
export function getExamsForWeek(weekNumber: number): ExamEntry[] {
  const exams: ExamEntry[] = [];
  for (const period of EXAM_SCHEDULE) {
    if (weekNumber >= period.weekStart && weekNumber <= period.weekEnd) {
      exams.push(...period.exams);
    }
  }
  // Remove duplicatas por nome
  const seen = new Set<string>();
  return exams.filter(e => {
    if (seen.has(e.name)) return false;
    seen.add(e.name);
    return true;
  });
}
