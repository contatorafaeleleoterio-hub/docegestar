// Cálculos gestacionais — DoceGestar
// Regra de Naegele: LMP + 280 dias | Concepção + 266 dias
// Convenções: UTC com T00:00:00 (sem drift de fuso); Math.floor para semanas (convenção clínica); clamp 0..280.

const GESTATION_DAYS = 280;
const LMP_TO_DPP_DAYS = 280;
const CONCEPTION_TO_DPP_DAYS = 266;
const MS_PER_DAY = 86_400_000;

const DPP_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function parseISO(input: string): Date {
  if (typeof input !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(input)) {
    throw new Error(`Invalid date: ${input}`);
  }
  const date = new Date(`${input}T00:00:00`);
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date: ${input}`);
  }
  return date;
}

function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function startOfToday(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calcula DPP a partir da data da última menstruação (Regra de Naegele).
 */
export function calcDPPFromLMP(lmpISO: string): string {
  const lmp = parseISO(lmpISO);
  const dpp = new Date(lmp.getTime() + LMP_TO_DPP_DAYS * MS_PER_DAY);
  return toISO(dpp);
}

/**
 * Calcula DPP a partir da data de concepção.
 */
export function calcDPPFromConception(concISO: string): string {
  const conc = parseISO(concISO);
  const dpp = new Date(conc.getTime() + CONCEPTION_TO_DPP_DAYS * MS_PER_DAY);
  return toISO(dpp);
}

export interface GestationMetrics {
  dppFormatted: string;
  weeksElapsed: number;
  daysElapsed: number;
  weeksRemaining: number;
  daysRemaining: number;
}

/**
 * Métricas gestacionais a partir da DPP.
 * Clamp 0..280 garante que DPP passada ou LMP futura não retornem negativos.
 */
export function calcGestationMetrics(dueISO: string): GestationMetrics {
  const due = parseISO(dueISO);
  const today = startOfToday();
  const daysToDue = Math.round((due.getTime() - today.getTime()) / MS_PER_DAY);
  const rawDaysElapsed = GESTATION_DAYS - daysToDue;
  const daysElapsed = clamp(rawDaysElapsed, 0, GESTATION_DAYS);
  const daysRemaining = GESTATION_DAYS - daysElapsed;

  return {
    dppFormatted: DPP_FORMATTER.format(due),
    weeksElapsed: Math.floor(daysElapsed / 7),
    daysElapsed,
    weeksRemaining: Math.floor(daysRemaining / 7),
    daysRemaining,
  };
}
