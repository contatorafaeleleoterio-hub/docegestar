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
    'ALTER TABLE user_profile ADD COLUMN photo_uri TEXT',
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
  // v6 migrations: daily_logs (Daily Streak feature)
  try {
    await db.runAsync(
      'CREATE TABLE IF NOT EXISTS daily_logs (log_date TEXT PRIMARY KEY)'
    );
  } catch { /* ignore */ }
  // v7 migrations: bookmarks + card_notes (Feed Revista Snap)
  try { await db.runAsync('CREATE TABLE IF NOT EXISTS bookmarks (card_id TEXT PRIMARY KEY, created_at INTEGER NOT NULL)'); } catch {}
  try { await db.runAsync('CREATE TABLE IF NOT EXISTS card_notes (card_id TEXT PRIMARY KEY, note TEXT NOT NULL, updated_at INTEGER NOT NULL)'); } catch {}
  try { await db.runAsync('CREATE INDEX IF NOT EXISTS idx_bookmarks_created ON bookmarks(created_at DESC)'); } catch {}
  _db = db;
  return _db;
}
