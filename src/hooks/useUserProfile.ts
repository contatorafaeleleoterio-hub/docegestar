import { getDatabase } from '../db';
import { UserProfile } from '../types';

export async function getProfile(): Promise<UserProfile | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{
    id: number;
    name: string | null;
    due_date: string | null;
    created_at: string;
  }>('SELECT id, name, due_date, created_at FROM user_profile WHERE id = 1');

  if (!row) return null;

  return {
    id: row.id,
    name: row.name ?? undefined,
    dueDate: row.due_date ?? undefined,
    createdAt: row.created_at,
  };
}

export async function saveProfile(name: string | null, dueDate: string): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO user_profile (id, name, due_date)
     VALUES (1, ?, ?)
     ON CONFLICT(id) DO UPDATE SET name = excluded.name, due_date = excluded.due_date`,
    [name, dueDate]
  );
}
