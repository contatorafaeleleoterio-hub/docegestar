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
  // v3 migrations: saved_tips table (Story 4.5)
  try {
    await db.runAsync(
      'CREATE TABLE IF NOT EXISTS saved_tips (id INTEGER PRIMARY KEY AUTOINCREMENT, week INTEGER, tip_text TEXT, category TEXT, saved_at TEXT)'
    );
  } catch { /* ignore */ }
  // v4 migrations: notification_settings (Story 3.1)
  try {
    await db.runAsync(
      'CREATE TABLE IF NOT EXISTS notification_settings (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT UNIQUE, enabled INTEGER DEFAULT 0, default_time TEXT DEFAULT "08:00")'
    );
  } catch { /* ignore */ }
  // v5 migrations: prenatal_appointments (Story 3.3)
  try {
    await db.runAsync(
      'CREATE TABLE IF NOT EXISTS prenatal_appointments (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, appointment_date TEXT, appointment_time TEXT, notes TEXT, reminder_offset TEXT DEFAULT "2hours", created_at TEXT)'
    );
  } catch { /* ignore */ }
  _db = db;
  return _db;
}
