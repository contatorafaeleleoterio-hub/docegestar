import { useState, useEffect } from 'react';
import { getDatabase } from '../db';

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function useStreak() {
  const [streak, setStreak] = useState(0);
  const [isMilestone, setIsMilestone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      const db = await getDatabase();
      const today = todayISO();
      await db.runAsync(
        'INSERT OR IGNORE INTO daily_logs (log_date) VALUES (?)',
        [today]
      );
      // Count consecutive days ending today
      const rows = await db.getAllAsync<{ log_date: string }>(
        'SELECT log_date FROM daily_logs ORDER BY log_date DESC'
      );
      let count = 0;
      let expected = today;
      for (const row of rows) {
        if (row.log_date === expected) {
          count++;
          const d = new Date(expected);
          d.setDate(d.getDate() - 1);
          expected = d.toISOString().slice(0, 10);
        } else {
          break;
        }
      }
      if (!cancelled) {
        setStreak(count);
        setIsMilestone(count === 7 || count === 14 || count === 30);
      }
    }
    init();
    return () => { cancelled = true; };
  }, []);

  return { streak, isMilestone };
}
