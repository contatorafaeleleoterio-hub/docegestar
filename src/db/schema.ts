import * as SQLite from 'expo-sqlite';

const DB_NAME = 'docegestar.db';

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  await runMigrations(db);
  return db;
}

async function runMigrations(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    -- Perfil da usuaria
    CREATE TABLE IF NOT EXISTS user_profile (
      id INTEGER PRIMARY KEY DEFAULT 1,
      name TEXT,
      due_date TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- Tracking semanal pessoal (Modulo 3.8)
    CREATE TABLE IF NOT EXISTS weekly_tracking (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      week INTEGER NOT NULL,
      weight_kg REAL,
      sleep_hours REAL,
      nausea TEXT CHECK(nausea IN ('sem','leve','media','forte')),
      humor TEXT CHECK(humor IN ('bem','oscilando','dificil')),
      appetite TEXT CHECK(appetite IN ('normal','pouco','muito')),
      date_filled TEXT,
      updated_at TEXT DEFAULT (datetime('now')),
      UNIQUE(week)
    );

    -- Checkboxes de sintomas (Modulo 3.4)
    CREATE TABLE IF NOT EXISTS symptom_checks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      week INTEGER NOT NULL,
      symptom_key TEXT NOT NULL,
      checked INTEGER DEFAULT 0,
      UNIQUE(week, symptom_key)
    );

    -- Checkboxes de cuidados (Modulo 3.5)
    CREATE TABLE IF NOT EXISTS care_checks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      week INTEGER NOT NULL,
      care_key TEXT NOT NULL,
      checked INTEGER DEFAULT 0,
      UNIQUE(week, care_key)
    );

    -- Conclusao da semana (Modulo 3.1)
    CREATE TABLE IF NOT EXISTS week_completion (
      week INTEGER PRIMARY KEY,
      completed INTEGER DEFAULT 0,
      date_label TEXT
    );

    -- Momentos especiais (Modulo 3.9)
    CREATE TABLE IF NOT EXISTS special_moments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      week INTEGER NOT NULL,
      text_content TEXT,
      photo_uri TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      UNIQUE(week)
    );

    -- Historico de chutes (Modulo 3.11)
    CREATE TABLE IF NOT EXISTS kick_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      week INTEGER NOT NULL,
      kick_count INTEGER NOT NULL,
      duration_seconds INTEGER NOT NULL,
      recorded_at TEXT DEFAULT (datetime('now'))
    );

    -- Historico de contracoes (Modulo 3.11)
    CREATE TABLE IF NOT EXISTS contraction_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      week INTEGER NOT NULL,
      duration_seconds INTEGER NOT NULL,
      interval_seconds INTEGER,
      intensity TEXT CHECK(intensity IN ('leve','media','forte')),
      recorded_at TEXT DEFAULT (datetime('now'))
    );

    -- Rastreamento de migrations (ONB-1)
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      version INTEGER UNIQUE,
      applied_at TEXT
    );
  `);

  // Migration v2: add relationship, plan, plan_expires_at to user_profile
  const v2Applied = await db.getFirstAsync<{ version: number }>(
    'SELECT version FROM migrations WHERE version = 2'
  );

  if (!v2Applied) {
    const columns = await db.getAllAsync<{ name: string }>(
      'PRAGMA table_info(user_profile)'
    );
    const colNames = columns.map(c => c.name);

    if (!colNames.includes('relationship')) {
      await db.execAsync(
        `ALTER TABLE user_profile ADD COLUMN relationship TEXT CHECK(relationship IN ('mae','parceiro','outro'))`
      );
    }
    if (!colNames.includes('plan')) {
      await db.execAsync(
        `ALTER TABLE user_profile ADD COLUMN plan TEXT DEFAULT 'free' CHECK(plan IN ('free','premium'))`
      );
    }
    if (!colNames.includes('plan_expires_at')) {
      await db.execAsync(
        `ALTER TABLE user_profile ADD COLUMN plan_expires_at TEXT`
      );
    }

    await db.runAsync(
      `INSERT INTO migrations (version, applied_at) VALUES (?, datetime('now'))`,
      [2]
    );
  }
}
