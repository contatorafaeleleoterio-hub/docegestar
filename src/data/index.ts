// DoceGestar — Export Centralizado de Dados
// Ponto único de acesso a todos os dados estáticos e tipos

export type { WeekContent, BabyDevelopment, NutrientEntry, ExamEntry, WeeklyTracking, UserProfile, SpecialMoment, WeekCompletion, Trimester, BabyStage, NauseaLevel, HumorLevel, AppetiteLevel } from '../types';

// Dados compartilhados
export { AVOID_FOODS } from './shared/avoidFoods';
export { SYMPTOMS_T1, SYMPTOMS_T2, SYMPTOMS_T3 } from './shared/symptoms';
export { ALL_NUTRIENTS, NUTRIENTS_T1, NUTRIENTS_T2, NUTRIENTS_T3 } from './shared/nutrients';
export { CARE_BASE, CARE_T1, CARE_T2, CARE_T3, DAILY_TIPS } from './shared/care';
export type { TipCategory, CareTip } from './shared/care';
export { EXAM_SCHEDULE, RECURRING_EXAMS, getExamsForWeek } from './shared/exams';
export type { ExamPeriod } from './shared/exams';

// Dados das semanas
import { weeks01to13 } from './weeks/weeks-01-13';
import { weeks14to27 } from './weeks/weeks-14-27';
import { weeks28to40 } from './weeks/weeks-28-40';
import type { WeekContent, Trimester } from '../types';

export const ALL_WEEKS: WeekContent[] = [
  ...weeks01to13,
  ...weeks14to27,
  ...weeks28to40,
];

// Busca uma semana pelo número (1–40)
export function getWeek(weekNumber: number): WeekContent | undefined {
  return ALL_WEEKS.find(w => w.weekNumber === weekNumber);
}

// Retorna todas as semanas de um trimestre
export function getWeeksByTrimester(trimester: Trimester): WeekContent[] {
  return ALL_WEEKS.filter(w => w.trimester === trimester);
}

// Calcula o trimestre a partir do número da semana
export function getTrimester(weekNumber: number): Trimester {
  if (weekNumber <= 13) return 1;
  if (weekNumber <= 27) return 2;
  return 3;
}

// Calcula a semana atual baseado na DPP (Data Prevista do Parto)
export function getCurrentWeek(dueDateISO: string): number {
  const dueDate = new Date(dueDateISO);
  const today = new Date();
  const diffMs = dueDate.getTime() - today.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeksRemaining = Math.ceil(diffDays / 7);
  const currentWeek = 40 - weeksRemaining;
  return Math.max(1, Math.min(40, currentWeek));
}

// Calcula porcentagem de progresso dentro do trimestre atual
export function getTrimesterProgress(weekNumber: number): number {
  if (weekNumber <= 13) {
    return Math.round(((weekNumber - 1) / 12) * 100);
  }
  if (weekNumber <= 27) {
    return Math.round(((weekNumber - 14) / 13) * 100);
  }
  return Math.round(((weekNumber - 28) / 12) * 100);
}
