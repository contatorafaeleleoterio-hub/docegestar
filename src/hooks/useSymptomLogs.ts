import { useState, useEffect, useCallback, useMemo } from 'react';
import { getDatabase } from '../db';
import { getProfile } from './useUserProfile';

export type Intensity = 'leve' | 'media' | 'forte';

export const INTENSITY_WEIGHT: Record<Intensity, number> = { leve: 1, media: 2, forte: 3 };
export const INTENSITY_LABEL: Record<Intensity, string> = {
  leve: 'Leve',
  media: 'Moderado',
  forte: 'Forte',
};

// Cores da escala de intensidade (chaves da paleta em src/theme/colors)
export const INTENSITY_COLOR_KEY: Record<Intensity, 'pink200' | 'pink400' | 'primaryDeep'> = {
  leve: 'pink200',
  media: 'pink400',
  forte: 'primaryDeep',
};

const WEEKDAY_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function toLocalISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function weekdayShort(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return WEEKDAY_SHORT[new Date(y, m - 1, d).getDay()];
}

export function dayOfMonth(iso: string): number {
  return Number(iso.split('-')[2]);
}

// Os 7 dias-calendário que compõem a semana gestacional selecionada.
// O corte da semana cai num dia fixo (definido pela due date), então alinhar
// a faixa à semana gestacional mantém o registro sempre dentro de um único `week`.
export function gestationalWeekDays(dueDateISO: string, week: number): string[] {
  const due = new Date(dueDateISO);
  due.setHours(0, 0, 0, 0);

  // A data de vencimento (due date) representa o fim de 40 semanas de gestação (280 dias).
  // Portanto, a semana W começa em due - ((40 - W) * 7 + 6) dias e termina em due - (40 - W) * 7.
  const daysToSubtract = (40 - week) * 7 + 6;
  const start = new Date(due);
  start.setDate(due.getDate() - daysToSubtract);

  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(toLocalISO(d));
  }
  return days;
}

export interface DayTotal {
  date: string;
  total: number; // soma ponderada das intensidades
  count: number; // nº de sintomas registrados
  maxLevel: Intensity | null; // maior intensidade do dia (cor da bolinha)
  noSymptoms: boolean; // indica se o dia foi marcado como "sem sintomas"
}

const CYCLE: (Intensity | null)[] = [null, 'leve', 'media', 'forte'];

export function useSymptomLogs(week: number) {
  const [days, setDays] = useState<string[]>([]);
  const [todayISO, setTodayISO] = useState('');
  const [logsByDay, setLogsByDay] = useState<Record<string, Record<string, Intensity>>>({});
  const [notesByDay, setNotesByDay] = useState<
    Record<string, { note: string | null; noSymptoms: boolean }>
  >({});

  const reload = useCallback(async () => {
    const db = await getDatabase();
    const logs = await db.getAllAsync<{ log_date: string; symptom_key: string; intensity: Intensity }>(
      'SELECT log_date, symptom_key, intensity FROM symptom_logs WHERE week = ?',
      [week]
    );
    const byDay: Record<string, Record<string, Intensity>> = {};
    for (const r of logs) {
      if (!r.intensity) continue;
      (byDay[r.log_date] ??= {})[r.symptom_key] = r.intensity;
    }
    setLogsByDay(byDay);

    const notes = await db.getAllAsync<{ log_date: string; note: string | null; no_symptoms: number }>(
      'SELECT log_date, note, no_symptoms FROM symptom_day_notes WHERE week = ?',
      [week]
    );
    const noteMap: Record<string, { note: string | null; noSymptoms: boolean }> = {};
    for (const r of notes) noteMap[r.log_date] = { note: r.note ?? null, noSymptoms: r.no_symptoms === 1 };
    setNotesByDay(noteMap);
  }, [week]);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      const t = new Date();
      t.setHours(0, 0, 0, 0);
      if (!cancelled) setTodayISO(toLocalISO(t));
      const profile = await getProfile();
      if (cancelled) return;
      if (profile?.dueDate) setDays(gestationalWeekDays(profile.dueDate, week));
      await reload();
    }
    init();
    return () => {
      cancelled = true;
    };
  }, [week, reload]);

  const persistDayNote = useCallback(
    async (date: string, note: string | null, noSymptoms: boolean) => {
      const db = await getDatabase();
      await db.runAsync(
        `INSERT INTO symptom_day_notes (log_date, week, note, no_symptoms) VALUES (?, ?, ?, ?)
         ON CONFLICT(log_date) DO UPDATE SET note = excluded.note, no_symptoms = excluded.no_symptoms, week = excluded.week, updated_at = datetime('now')`,
        [date, week, note, noSymptoms ? 1 : 0]
      );
      setNotesByDay((prev) => ({ ...prev, [date]: { note, noSymptoms } }));
    },
    [week]
  );

  const setIntensity = useCallback(
    async (date: string, symptomKey: string, intensity: Intensity | null) => {
      const db = await getDatabase();
      if (intensity === null) {
        await db.runAsync(
          'DELETE FROM symptom_logs WHERE week = ? AND log_date = ? AND symptom_key = ?',
          [week, date, symptomKey]
        );
      } else {
        await db.runAsync(
          `INSERT INTO symptom_logs (log_date, week, symptom_key, intensity) VALUES (?, ?, ?, ?)
           ON CONFLICT(log_date, symptom_key) DO UPDATE SET intensity = excluded.intensity, week = excluded.week, updated_at = datetime('now')`,
          [date, week, symptomKey, intensity]
        );
      }
      setLogsByDay((prev) => {
        const dayMap = { ...(prev[date] ?? {}) };
        if (intensity === null) delete dayMap[symptomKey];
        else dayMap[symptomKey] = intensity;
        return { ...prev, [date]: dayMap };
      });
      // registrar um sintoma desfaz o "sem sintomas" do dia
      if (intensity !== null && notesByDay[date]?.noSymptoms) {
        await persistDayNote(date, notesByDay[date]?.note ?? null, false);
      }
    },
    [week, notesByDay, persistDayNote]
  );

  const cycleIntensity = useCallback(
    (date: string, symptomKey: string) => {
      const cur = logsByDay[date]?.[symptomKey] ?? null;
      const next = CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length];
      return setIntensity(date, symptomKey, next);
    },
    [logsByDay, setIntensity]
  );

  const markNoSymptoms = useCallback(
    async (date: string) => {
      const db = await getDatabase();
      const currentNoSymptoms = notesByDay[date]?.noSymptoms ?? false;
      const nextNoSymptoms = !currentNoSymptoms;

      if (nextNoSymptoms) {
        await db.runAsync('DELETE FROM symptom_logs WHERE week = ? AND log_date = ?', [week, date]);
        setLogsByDay((prev) => ({ ...prev, [date]: {} }));
      }
      await persistDayNote(date, notesByDay[date]?.note ?? null, nextNoSymptoms);
    },
    [week, persistDayNote, notesByDay]
  );

  const setDayNote = useCallback(
    (date: string, note: string) => {
      const trimmed = note.trim();
      return persistDayNote(date, trimmed.length ? trimmed : null, notesByDay[date]?.noSymptoms ?? false);
    },
    [persistDayNote, notesByDay]
  );

  const weeklyTotals: DayTotal[] = useMemo(
    () =>
      days.map((date) => {
        const dayMap = logsByDay[date] ?? {};
        const values = Object.values(dayMap);
        let total = 0;
        let maxW = 0;
        let maxLevel: Intensity | null = null;
        for (const lvl of values) {
          total += INTENSITY_WEIGHT[lvl];
          if (INTENSITY_WEIGHT[lvl] > maxW) {
            maxW = INTENSITY_WEIGHT[lvl];
            maxLevel = lvl;
          }
        }
        const noSymptoms = notesByDay[date]?.noSymptoms ?? false;
        return { date, total, count: values.length, maxLevel, noSymptoms };
      }),
    [days, logsByDay, notesByDay]
  );

  const strongestDay: DayTotal | null = useMemo(() => {
    const withData = weeklyTotals.filter((d) => d.total > 0);
    if (!withData.length) return null;
    return withData.reduce((a, b) => (b.total > a.total ? b : a));
  }, [weeklyTotals]);

  return {
    days,
    todayISO,
    logsByDay,
    notesByDay,
    weeklyTotals,
    strongestDay,
    cycleIntensity,
    setIntensity,
    markNoSymptoms,
    setDayNote,
    reload,
  };
}
