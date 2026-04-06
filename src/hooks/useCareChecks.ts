import { useState, useEffect } from 'react';
import { getDatabase } from '../db';

export function useCareChecks(week: number) {
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const db = await getDatabase();
      const rows = await db.getAllAsync<{ care_key: string; checked: number }>(
        'SELECT care_key, checked FROM care_checks WHERE week = ?',
        [week]
      );
      if (!cancelled) {
        const map: Record<string, boolean> = {};
        for (const row of rows) map[row.care_key] = row.checked === 1;
        setChecks(map);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [week]);

  async function toggleCare(careKey: string, checked: boolean) {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO care_checks (week, care_key, checked) VALUES (?, ?, ?)
       ON CONFLICT(week, care_key) DO UPDATE SET checked = excluded.checked`,
      [week, careKey, checked ? 1 : 0]
    );
    setChecks(prev => ({ ...prev, [careKey]: checked }));
  }

  return { checks, toggleCare };
}
