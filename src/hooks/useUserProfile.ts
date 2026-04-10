import { getDatabase } from '../db';
import { UserProfile } from '../types';

export async function getProfile(): Promise<UserProfile | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<{
    id: number;
    name: string | null;
    due_date: string | null;
    created_at: string;
    gestationType: string | null;
    firstChild: number | null;
    babyName: string | null;
  }>('SELECT id, name, due_date, created_at, gestationType, firstChild, babyName FROM user_profile WHERE id = 1');

  if (!row) return null;

  return {
    id: row.id,
    name: row.name ?? undefined,
    dueDate: row.due_date ?? undefined,
    createdAt: row.created_at,
    gestationType: row.gestationType,
    firstChild: row.firstChild,
    babyName: row.babyName,
  };
}

export async function saveProfile(
  name: string | null,
  dueDate: string,
  gestationType: string | null = null,
  firstChild: number | null = null,
  babyName: string | null = null,
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO user_profile (id, name, due_date, gestationType, firstChild, babyName)
     VALUES (1, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       name = excluded.name,
       due_date = excluded.due_date,
       gestationType = excluded.gestationType,
       firstChild = excluded.firstChild,
       babyName = excluded.babyName`,
    [name, dueDate, gestationType, firstChild, babyName]
  );
}
