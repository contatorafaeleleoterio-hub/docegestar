import { Platform } from 'react-native';
import type { DatabaseAdapter } from './webStorage';

export type { DatabaseAdapter };

let _db: DatabaseAdapter | null = null;

export async function getDatabase(): Promise<DatabaseAdapter> {
  if (_db) return _db;
  let db: DatabaseAdapter;
  if (Platform.OS === 'web') {
    const { getWebDatabase } = await import('./webStorage');
    db = getWebDatabase();
  } else {
    const { getDatabase: getNativeDb } = await import('./schema');
    db = (await getNativeDb()) as unknown as DatabaseAdapter;
  }
  // v2 migrations: add new columns to user_profile (safe to run multiple times)
  for (const stmt of [
    'ALTER TABLE user_profile ADD COLUMN gestationType TEXT',
    'ALTER TABLE user_profile ADD COLUMN firstChild INTEGER',
    'ALTER TABLE user_profile ADD COLUMN babyName TEXT',
  ]) {
    try { await db.runAsync(stmt); } catch { /* column already exists — ignore */ }
  }
  _db = db;
  return _db;
}
