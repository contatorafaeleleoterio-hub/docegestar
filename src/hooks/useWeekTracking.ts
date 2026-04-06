import { useState, useEffect } from 'react';
import { getDatabase } from '../db';
import type { WeeklyTracking, NauseaLevel, HumorLevel, AppetiteLevel } from '../types';

export function useWeekTracking(week: number) {
  const [tracking, setTracking] = useState<WeeklyTracking | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const db = await getDatabase();
      const row = await db.getFirstAsync<{
        week: number;
        weight_kg: number | null;
        sleep_hours: number | null;
        nausea: string | null;
        humor: string | null;
        appetite: string | null;
        date_filled: string | null;
      }>('SELECT * FROM weekly_tracking WHERE week = ?', [week]);
      if (!cancelled) {
        setTracking(row ? {
          week: row.week,
          weightKg: row.weight_kg ?? undefined,
          sleepHours: row.sleep_hours ?? undefined,
          nausea: (row.nausea as NauseaLevel) ?? undefined,
          humor: (row.humor as HumorLevel) ?? undefined,
          appetite: (row.appetite as AppetiteLevel) ?? undefined,
          dateFilled: row.date_filled ?? undefined,
        } : null);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [week]);

  async function saveTracking(data: Partial<WeeklyTracking>) {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO weekly_tracking (week, weight_kg, sleep_hours, nausea, humor, appetite, date_filled)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(week) DO UPDATE SET
         weight_kg = excluded.weight_kg,
         sleep_hours = excluded.sleep_hours,
         nausea = excluded.nausea,
         humor = excluded.humor,
         appetite = excluded.appetite,
         date_filled = excluded.date_filled,
         updated_at = datetime('now')`,
      [week, data.weightKg ?? null, data.sleepHours ?? null, data.nausea ?? null, data.humor ?? null, data.appetite ?? null, data.dateFilled ?? null]
    );
    setTracking(prev => ({ week, ...prev, ...data }));
  }

  return { tracking, saveTracking };
}
