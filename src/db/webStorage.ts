import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Types ────────────────────────────────────────────────────────────────────

type BindValue = string | number | null | boolean;

export interface DatabaseAdapter {
  getFirstAsync<T = unknown>(sql: string, params?: BindValue[]): Promise<T | null>;
  getAllAsync<T = unknown>(sql: string, params?: BindValue[]): Promise<T[]>;
  runAsync(sql: string, params?: BindValue[]): Promise<void>;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const P = '@docegestar';

async function getJson<T>(key: string): Promise<T | null> {
  const val = await AsyncStorage.getItem(key);
  return val ? (JSON.parse(val) as T) : null;
}

async function setJson(key: string, data: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(data));
}

async function nextId(table: string): Promise<number> {
  const key = `${P}:next_id:${table}`;
  const val = await AsyncStorage.getItem(key);
  const id = val ? parseInt(val, 10) + 1 : 1;
  await AsyncStorage.setItem(key, String(id));
  return id;
}

// ─── Table accessors ──────────────────────────────────────────────────────────

type Row = Record<string, unknown>;

async function getUserProfile(): Promise<Row | null> {
  return getJson<Row>(`${P}:user_profile`);
}

async function getWeeklyTracking(week: number): Promise<Row | null> {
  return getJson<Row>(`${P}:weekly_tracking:${week}`);
}

async function getSymptomChecks(week: number): Promise<{ symptom_key: string; checked: number }[]> {
  const data = await getJson<Record<string, number>>(`${P}:symptom_checks:${week}`);
  if (!data) return [];
  return Object.entries(data).map(([symptom_key, checked]) => ({ symptom_key, checked }));
}

async function getCareChecks(week: number): Promise<{ care_key: string; checked: number }[]> {
  const data = await getJson<Record<string, number>>(`${P}:care_checks:${week}`);
  if (!data) return [];
  return Object.entries(data).map(([care_key, checked]) => ({ care_key, checked }));
}

async function getWeekCompletion(week: number): Promise<Row | null> {
  return getJson<Row>(`${P}:week_completion:${week}`);
}

async function getAllWeekCompletions(): Promise<{ week: number; completed: number }[]> {
  const keys = await AsyncStorage.getAllKeys();
  const prefix = `${P}:week_completion:`;
  const wcKeys = (keys as string[]).filter((k) => k.startsWith(prefix));
  if (!wcKeys.length) return [];
  const pairs = await AsyncStorage.multiGet(wcKeys);
  return pairs
    .filter(([, v]) => v !== null)
    .map(([k, v]) => {
      const data = JSON.parse(v!) as Row;
      return {
        week: parseInt(k.replace(prefix, ''), 10),
        completed: (data.completed as number) ?? 0,
      };
    });
}

async function getSpecialMoment(week: number): Promise<Row | null> {
  return getJson<Row>(`${P}:special_moments:${week}`);
}

async function getKickRecords(week: number): Promise<Row[]> {
  return (await getJson<Row[]>(`${P}:kick_records:${week}`)) ?? [];
}

async function getContractionRecords(week: number): Promise<Row[]> {
  return (await getJson<Row[]>(`${P}:contraction_records:${week}`)) ?? [];
}

// ─── WebDatabase ──────────────────────────────────────────────────────────────

class WebDatabase implements DatabaseAdapter {
  async getFirstAsync<T = unknown>(sql: string, params: BindValue[] = []): Promise<T | null> {
    const n = sql.replace(/\s+/g, ' ').trim().toLowerCase();

    if (n.includes('from user_profile')) {
      return (await getUserProfile()) as T | null;
    }

    if (n.includes('from weekly_tracking')) {
      return (await getWeeklyTracking(params[0] as number)) as T | null;
    }

    if (n.includes('from week_completion') && params.length > 0) {
      return (await getWeekCompletion(params[0] as number)) as T | null;
    }

    if (n.includes('from special_moments')) {
      return (await getSpecialMoment(params[0] as number)) as T | null;
    }

    if (n.includes('from contraction_records')) {
      const records = await getContractionRecords(params[0] as number);
      if (!records.length) return null;
      const sorted = [...records].sort((a, b) =>
        String(b.recorded_at).localeCompare(String(a.recorded_at))
      );
      return sorted[0] as T;
    }

    return null;
  }

  async getAllAsync<T = unknown>(sql: string, params: BindValue[] = []): Promise<T[]> {
    const n = sql.replace(/\s+/g, ' ').trim().toLowerCase();

    if (n.includes('from symptom_checks')) {
      return (await getSymptomChecks(params[0] as number)) as T[];
    }

    if (n.includes('from care_checks')) {
      return (await getCareChecks(params[0] as number)) as T[];
    }

    if (n.includes('from week_completion')) {
      return (await getAllWeekCompletions()) as T[];
    }

    if (n.includes('from kick_records')) {
      const records = await getKickRecords(params[0] as number);
      const sorted = [...records].sort((a, b) =>
        String(b.recorded_at).localeCompare(String(a.recorded_at))
      );
      return sorted.slice(0, 5) as T[];
    }

    if (n.includes('from contraction_records')) {
      const records = await getContractionRecords(params[0] as number);
      const sorted = [...records].sort((a, b) =>
        String(b.recorded_at).localeCompare(String(a.recorded_at))
      );
      return sorted.slice(0, 5) as T[];
    }

    return [];
  }

  async runAsync(sql: string, params: BindValue[] = []): Promise<void> {
    const n = sql.replace(/\s+/g, ' ').trim().toLowerCase();
    const now = new Date().toISOString();

    // user_profile upsert
    if (n.includes('into user_profile')) {
      const existing = (await getUserProfile()) ?? {};
      await setJson(`${P}:user_profile`, {
        ...existing,
        id: 1,
        name: params[0] ?? null,
        due_date: params[1] ?? null,
        created_at: (existing.created_at as string) ?? now,
      });
      return;
    }

    // weekly_tracking upsert
    if (n.includes('into weekly_tracking')) {
      const [week, weight_kg, sleep_hours, nausea, humor, appetite, date_filled] = params;
      await setJson(`${P}:weekly_tracking:${week}`, {
        week,
        weight_kg,
        sleep_hours,
        nausea,
        humor,
        appetite,
        date_filled,
        updated_at: now,
      });
      return;
    }

    // symptom_checks upsert
    if (n.includes('into symptom_checks')) {
      const [week, symptom_key, checked] = params;
      const data = (await getJson<Record<string, number>>(`${P}:symptom_checks:${week}`)) ?? {};
      data[symptom_key as string] = checked as number;
      await setJson(`${P}:symptom_checks:${week}`, data);
      return;
    }

    // care_checks upsert
    if (n.includes('into care_checks')) {
      const [week, care_key, checked] = params;
      const data = (await getJson<Record<string, number>>(`${P}:care_checks:${week}`)) ?? {};
      data[care_key as string] = checked as number;
      await setJson(`${P}:care_checks:${week}`, data);
      return;
    }

    // week_completion upsert
    if (n.includes('into week_completion')) {
      const [week, completed, date_label] = params;
      await setJson(`${P}:week_completion:${week}`, { week, completed, date_label });
      return;
    }

    // special_moments upsert
    if (n.includes('into special_moments')) {
      const [week, text_content, photo_uri] = params;
      const existing = (await getSpecialMoment(week as number)) ?? {};
      await setJson(`${P}:special_moments:${week}`, {
        ...existing,
        week,
        text_content,
        photo_uri,
        created_at: (existing.created_at as string) ?? now,
      });
      return;
    }

    // kick_records insert (append)
    if (n.includes('into kick_records')) {
      const [week, kick_count, duration_seconds] = params;
      const id = await nextId('kick_records');
      const records = await getKickRecords(week as number);
      records.push({ id, week, kick_count, duration_seconds, recorded_at: now });
      await setJson(`${P}:kick_records:${week}`, records);
      return;
    }

    // contraction_records insert (append)
    if (n.includes('into contraction_records')) {
      const [week, duration_seconds, interval_seconds, intensity] = params;
      const id = await nextId('contraction_records');
      const records = await getContractionRecords(week as number);
      records.push({ id, week, duration_seconds, interval_seconds, intensity, recorded_at: now });
      await setJson(`${P}:contraction_records:${week}`, records);
      return;
    }

    // contraction_records update interval_seconds by id
    if (n.includes('update contraction_records')) {
      const [interval_seconds, id] = params;
      const allKeys = await AsyncStorage.getAllKeys();
      const prefix = `${P}:contraction_records:`;
      const crKeys = (allKeys as string[]).filter((k) => k.startsWith(prefix));
      for (const key of crKeys) {
        const raw = await AsyncStorage.getItem(key);
        if (!raw) continue;
        const records: Row[] = JSON.parse(raw);
        const idx = records.findIndex((r) => r.id === id);
        if (idx !== -1) {
          records[idx] = { ...records[idx], interval_seconds };
          await AsyncStorage.setItem(key, JSON.stringify(records));
          return;
        }
      }
      return;
    }
  }
}

// ─── Singleton ────────────────────────────────────────────────────────────────

let _webDb: WebDatabase | null = null;

export function getWebDatabase(): WebDatabase {
  if (!_webDb) _webDb = new WebDatabase();
  return _webDb;
}
