import { useState, useEffect } from 'react';
import { getDatabase } from '../db';

export function useSymptomChecks(week: number) {
  const [checks, setChecks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const db = await getDatabase();
      const rows = await db.getAllAsync<{ symptom_key: string; checked: number }>(
        'SELECT symptom_key, checked FROM symptom_checks WHERE week = ?',
        [week]
      );
      if (!cancelled) {
        const map: Record<string, boolean> = {};
        for (const row of rows) map[row.symptom_key] = row.checked === 1;
        setChecks(map);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [week]);

  async function toggleSymptom(symptomKey: string, checked: boolean) {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO symptom_checks (week, symptom_key, checked) VALUES (?, ?, ?)
       ON CONFLICT(week, symptom_key) DO UPDATE SET checked = excluded.checked`,
      [week, symptomKey, checked ? 1 : 0]
    );
    setChecks(prev => ({ ...prev, [symptomKey]: checked }));
  }

  return { checks, toggleSymptom };
}
