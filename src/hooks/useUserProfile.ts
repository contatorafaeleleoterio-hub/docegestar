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
    photo_uri: string | null;
    relationship: string | null;
    plan: string | null;
    plan_expires_at: string | null;
  }>('SELECT id, name, due_date, created_at, gestationType, firstChild, babyName, photo_uri, relationship, plan, plan_expires_at FROM user_profile WHERE id = 1');

  if (!row) return null;

  return {
    id: row.id,
    name: row.name ?? undefined,
    dueDate: row.due_date ?? undefined,
    createdAt: row.created_at,
    gestationType: row.gestationType,
    firstChild: row.firstChild,
    babyName: row.babyName,
    photoUri: row.photo_uri,
    relationship: (row.relationship as UserProfile['relationship']) ?? null,
    plan: (row.plan as UserProfile['plan']) ?? 'free',
    planExpiresAt: row.plan_expires_at ?? undefined,
  };
}

export async function saveOnboardingProfile({
  name,
  relationship,
  dueDate,
  plan,
}: {
  name: string | null;
  relationship: 'mae' | 'parceiro' | 'outro' | null;
  dueDate: string | null;
  plan: 'free' | 'premium';
}): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO user_profile (id, name, due_date, relationship, plan)
     VALUES (1, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       name = excluded.name,
       due_date = excluded.due_date,
       relationship = excluded.relationship,
       plan = excluded.plan`,
    [name, dueDate, relationship, plan]
  );
}

export async function saveProfile(
  name: string | null,
  dueDate: string,
  gestationType: string | null = null,
  firstChild: number | null = null,
  babyName: string | null = null,
  photoUri: string | null = null,
): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO user_profile (id, name, due_date, gestationType, firstChild, babyName, photo_uri)
     VALUES (1, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       name = excluded.name,
       due_date = excluded.due_date,
       gestationType = excluded.gestationType,
       firstChild = excluded.firstChild,
       babyName = excluded.babyName,
       photo_uri = excluded.photo_uri`,
    [name, dueDate, gestationType, firstChild, babyName, photoUri]
  );
}
