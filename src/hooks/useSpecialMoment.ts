import { useState, useEffect } from 'react';
import { getDatabase } from '../db';
import type { SpecialMoment } from '../types';

export function useSpecialMoment(week: number) {
  const [moment, setMoment] = useState<SpecialMoment | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const db = await getDatabase();
      const row = await db.getFirstAsync<{
        week: number; text_content: string | null; photo_uri: string | null; created_at: string;
      }>('SELECT week, text_content, photo_uri, created_at FROM special_moments WHERE week = ?', [week]);
      if (!cancelled) {
        setMoment(row ? {
          week: row.week,
          textContent: row.text_content ?? undefined,
          photoUri: row.photo_uri ?? undefined,
          createdAt: row.created_at,
        } : null);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [week]);

  async function saveMoment(textContent?: string, photoUri?: string) {
    const db = await getDatabase();
    await db.runAsync(
      `INSERT INTO special_moments (week, text_content, photo_uri) VALUES (?, ?, ?)
       ON CONFLICT(week) DO UPDATE SET text_content = excluded.text_content, photo_uri = excluded.photo_uri`,
      [week, textContent ?? null, photoUri ?? null]
    );
    setMoment({ week, textContent, photoUri, createdAt: new Date().toISOString() });
  }

  return { moment, saveMoment };
}
