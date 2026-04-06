import { useState, useEffect } from 'react';
import { getDatabase } from '../db';

export function useWeekCompletion(week: number) {
  const [completed, setCompleted] = useState(false);
  const [dateLabel, setDateLabel] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const db = await getDatabase();
      const row = await db.getFirstAsync<{ completed: number; date_label: string | null }>(
        'SELECT completed, date_label FROM week_completion WHERE week = ?',
        [week]
      );
      if (!cancelled && row) {
        setCompleted(row.completed === 1);
        setDateLabel(row.date_label ?? undefined);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [week]);

  async function toggleCompletion(value: boolean, label?: string) {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO week_completion (week, completed, date_label) VALUES (?, ?, ?)
       ON CONFLICT(week) DO UPDATE SET completed = excluded.completed, date_label = excluded.date_label`,
      [week, value ? 1 : 0, label ?? null]
    );
    setCompleted(value);
    setDateLabel(label);
  }

  return { completed, dateLabel, toggleCompletion };
}
