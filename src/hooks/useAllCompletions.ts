import { useState, useEffect } from 'react';
import { getDatabase } from '../db';

export function useAllCompletions() {
  const [completions, setCompletions] = useState<Record<number, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const db = await getDatabase();
      const rows = await db.getAllAsync<{ week: number; completed: number }>(
        'SELECT week, completed FROM week_completion'
      );
      if (!cancelled) {
        const map: Record<number, boolean> = {};
        for (const row of rows) map[row.week] = row.completed === 1;
        setCompletions(map);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return completions;
}
