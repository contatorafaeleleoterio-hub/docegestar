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
  // v8 migrations: enxoval_items + enxoval_settings (Sessão E-1 — Enxoval Completo)
  try {
    await db.runAsync(
      'CREATE TABLE IF NOT EXISTS enxoval_items (id TEXT PRIMARY KEY, category TEXT NOT NULL, name TEXT NOT NULL, status TEXT DEFAULT "desejado", priority TEXT DEFAULT "desejavel", qty_user INTEGER DEFAULT 1, price_target REAL, price_paid REAL, is_gift INTEGER DEFAULT 0, delivered INTEGER DEFAULT 0, store TEXT, link TEXT, note TEXT, is_custom INTEGER DEFAULT 0, sort_order INTEGER, updated_at INTEGER NOT NULL)'
    );
  } catch {}
  try { await db.runAsync('CREATE INDEX IF NOT EXISTS idx_enxoval_category ON enxoval_items(category, sort_order)'); } catch {}
  try { await db.runAsync('CREATE TABLE IF NOT EXISTS enxoval_settings (key TEXT PRIMARY KEY, value TEXT)'); } catch {}
  // v9 migrations: coluna track (Sessão E-1-FIX — aba Mãe). Itens legados de
  // 'maternidade' são remapeados na leitura (resolveCategory), aqui só garante
  // a coluna no schema nativo. O shim web persiste track no JSON do upsert.
  try { await db.runAsync("ALTER TABLE enxoval_items ADD COLUMN track TEXT NOT NULL DEFAULT 'bebe'"); } catch {}
  // v10 migrations: symptom_logs + symptom_day_notes (Sintomas 2.0 — registro diário com intensidade)
  try {
    await db.runAsync(
      "CREATE TABLE IF NOT EXISTS symptom_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, log_date TEXT NOT NULL, week INTEGER NOT NULL, symptom_key TEXT NOT NULL, intensity TEXT CHECK(intensity IN ('leve','media','forte')), updated_at TEXT DEFAULT (datetime('now')), UNIQUE(log_date, symptom_key))"
    );
  } catch {}
  try { await db.runAsync('CREATE INDEX IF NOT EXISTS idx_symptom_logs_week ON symptom_logs(week)'); } catch {}
  try {
    await db.runAsync(
      "CREATE TABLE IF NOT EXISTS symptom_day_notes (log_date TEXT PRIMARY KEY, week INTEGER NOT NULL, note TEXT, no_symptoms INTEGER DEFAULT 0, updated_at TEXT DEFAULT (datetime('now')))"
    );
  } catch {}
  // v11 migrations: Painel Consultas & Exames (CE-1)
  // 11a — campos ricos em prenatal_appointments (especialidade, profissional, local, status)
  for (const stmt of [
    'ALTER TABLE prenatal_appointments ADD COLUMN specialty TEXT',
    'ALTER TABLE prenatal_appointments ADD COLUMN professional TEXT',
    'ALTER TABLE prenatal_appointments ADD COLUMN location TEXT',
    "ALTER TABLE prenatal_appointments ADD COLUMN status TEXT DEFAULT 'agendada'",
  ]) {
    try { await db.runAsync(stmt); } catch { /* coluna já existe — ignore */ }
  }
  // 11b — prenatal_exams (timeline gestacional semeada de EXAM_SCHEDULE + status do usuário)
  try {
    await db.runAsync(
      "CREATE TABLE IF NOT EXISTS prenatal_exams (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, trimester INTEGER NOT NULL, week_start INTEGER, week_end INTEGER, notes TEXT, status TEXT DEFAULT 'pendente', scheduled_date TEXT, result_uri TEXT, created_at TEXT)"
    );
  } catch {}
  try { await db.runAsync('CREATE INDEX IF NOT EXISTS idx_prenatal_exams_trim ON prenatal_exams(trimester, week_start)'); } catch {}
  _db = db;
  return _db;
}
