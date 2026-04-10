// DoceGestar — Interfaces TypeScript
// Tipos centrais para todo o domínio da aplicação

export type Trimester = 1 | 2 | 3;
export type BabyStage = 'embrião' | 'feto';
export type NauseaLevel = 'sem' | 'leve' | 'media' | 'forte';
export type HumorLevel = 'bem' | 'oscilando' | 'dificil';
export type AppetiteLevel = 'normal' | 'pouco' | 'muito';

export interface BabyDevelopment {
  stage: BabyStage;
  sizeCm: string;          // ex: "~5,4 cm" | "—" nas primeiras semanas
  weightG: string;         // ex: "~14g" | "< 1g"
  comparison: string;      // ex: "Ameixa" | "—"
  heartbeatBpm: string;    // ex: "150–170 bpm" | "—"
  milestones: string[];    // 5–7 marcos do desenvolvimento
}

export interface NutrientEntry {
  name: string;            // ex: "Ácido Fólico"
  dose?: string;           // ex: "400–800 mcg/dia"
  foods: string[];         // 4–5 alimentos-fonte concretos
}

export interface ExamEntry {
  name: string;
  notes?: string;
}

export interface WeekContent {
  weekNumber: number;         // 1–40
  trimester: Trimester;
  baby: BabyDevelopment;
  symptoms: string[];         // 6–8 sintomas selecionados do banco do trimestre
  care: string[];             // cuidados base + adições do trimestre
  nutrients: NutrientEntry[]; // 6 nutrientes prioritários da semana
  exams: ExamEntry[];         // exames recomendados (pode ser [])
  curiosities: string[];      // 3 fatos curtos e acolhedores
  weeklyTip: string;          // dica prática da semana
  motivationalPhrase: string; // frase motivacional
}

// Tipo para tracking pessoal (vinculado ao banco SQLite)
export interface WeeklyTracking {
  week: number;
  weightKg?: number;
  sleepHours?: number;
  nausea?: NauseaLevel;
  humor?: HumorLevel;
  appetite?: AppetiteLevel;
  dateFilled?: string;
}

// Tipo para perfil da usuária
export interface UserProfile {
  id: number;
  name?: string;
  dueDate?: string;          // ISO date string (YYYY-MM-DD)
  createdAt: string;
  gestationType?: string | null;   // 'única' | 'gêmeos' | 'trigêmeos'
  firstChild?: number | null;      // 1 = sim, 0 = não
  babyName?: string | null;        // nome escolhido do bebê (opcional)
}

// Tipo para momentos especiais
export interface SpecialMoment {
  week: number;
  textContent?: string;
  photoUri?: string;
  createdAt: string;
}

// Tipo para conclusão de semana
export interface WeekCompletion {
  week: number;
  completed: boolean;
  dateLabel?: string;
}
