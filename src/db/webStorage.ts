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

async function getSymptomLogs(
  week: number
): Promise<{ log_date: string; symptom_key: string; intensity: string }[]> {
  return (
    (await getJson<{ log_date: string; symptom_key: string; intensity: string }[]>(
      `${P}:symptom_logs:${week}`
    )) ?? []
  );
}

async function getSymptomDayNotes(
  week: number
): Promise<{ log_date: string; note: string | null; no_symptoms: number }[]> {
  const map =
    (await getJson<Record<string, { note: string | null; no_symptoms: number }>>(
      `${P}:symptom_day_notes:${week}`
    )) ?? {};
  return Object.entries(map).map(([log_date, v]) => ({
    log_date,
    note: v.note ?? null,
    no_symptoms: v.no_symptoms ?? 0,
  }));
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

    if (n.includes('from enxoval_items')) {
      const arr = (await getJson<Row[]>(`${P}:enxoval_items`)) ?? [];
      if (n.includes('count(')) return ({ c: arr.length } as unknown) as T;
      if (n.includes('where id')) {
        const found = arr.find((r) => r.id === params[0]);
        return (found as T) ?? null;
      }
      return (arr[0] as T) ?? null;
    }

    if (n.includes('from enxoval_settings')) {
      const obj = (await getJson<Record<string, string>>(`${P}:enxoval_settings`)) ?? {};
      const key = params[0] as string;
      return key in obj ? (({ value: obj[key] } as unknown) as T) : null;
    }

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

    if (n.includes('from prenatal_appointments')) {
      const arr = (await getJson<Row[]>(`${P}:prenatal_appointments`)) ?? [];
      if (n.includes('where id')) return ((arr.find((r) => r.id === params[0]) as T) ?? null);
      if (n.includes('order by id desc')) {
        const sorted = [...arr].sort((a, b) => (b.id as number) - (a.id as number));
        return (sorted[0] as T) ?? null;
      }
      return (arr[0] as T) ?? null;
    }

    if (n.includes('from prenatal_exams')) {
      const arr = (await getJson<Row[]>(`${P}:prenatal_exams`)) ?? [];
      if (n.includes('count(')) return ({ c: arr.length } as unknown) as T;
      if (n.includes('where id')) return ((arr.find((r) => r.id === params[0]) as T) ?? null);
      return (arr[0] as T) ?? null;
    }

    return null;
  }

  async getAllAsync<T = unknown>(sql: string, params: BindValue[] = []): Promise<T[]> {
    const n = sql.replace(/\s+/g, ' ').trim().toLowerCase();

    if (n.includes('from enxoval_items')) {
      return ((await getJson<Row[]>(`${P}:enxoval_items`)) ?? []) as T[];
    }

    if (n.includes('from symptom_checks')) {
      return (await getSymptomChecks(params[0] as number)) as T[];
    }

    if (n.includes('from symptom_logs')) {
      return (await getSymptomLogs(params[0] as number)) as T[];
    }

    if (n.includes('from symptom_day_notes')) {
      return (await getSymptomDayNotes(params[0] as number)) as T[];
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

    if (n.includes('from prenatal_appointments')) {
      const arr = (await getJson<Row[]>(`${P}:prenatal_appointments`)) ?? [];
      return [...arr].sort((a, b) => {
        const ka = `${a.appointment_date} ${a.appointment_time}`;
        const kb = `${b.appointment_date} ${b.appointment_time}`;
        return ka < kb ? -1 : ka > kb ? 1 : 0;
      }) as T[];
    }

    if (n.includes('from prenatal_exams')) {
      const arr = (await getJson<Row[]>(`${P}:prenatal_exams`)) ?? [];
      return [...arr].sort(
        (a, b) => ((a.week_start as number) ?? 0) - ((b.week_start as number) ?? 0)
      ) as T[];
    }

    return [];
  }

  async runAsync(sql: string, params: BindValue[] = []): Promise<void> {
    const n = sql.replace(/\s+/g, ' ').trim().toLowerCase();
    const now = new Date().toISOString();

    // enxoval_items upsert (params na ordem das COLUMNS do enxovalRepo)
    if (n.includes('into enxoval_items')) {
      const [id, category, name, status, priority, qty_user, price_target, price_paid, is_gift, delivered, store, link, note, is_custom, sort_order, track, updated_at] = params;
      const arr = (await getJson<Row[]>(`${P}:enxoval_items`)) ?? [];
      const row: Row = { id, category, name, status, priority, qty_user, price_target, price_paid, is_gift, delivered, store, link, note, is_custom, sort_order, track, updated_at };
      const idx = arr.findIndex((r) => r.id === id);
      if (idx === -1) arr.push(row); else arr[idx] = row;
      await setJson(`${P}:enxoval_items`, arr);
      return;
    }

    // enxoval_items delete
    if (n.includes('delete from enxoval_items')) {
      const arr = (await getJson<Row[]>(`${P}:enxoval_items`)) ?? [];
      await setJson(`${P}:enxoval_items`, arr.filter((r) => r.id !== params[0]));
      return;
    }

    // enxoval_settings upsert
    if (n.includes('into enxoval_settings')) {
      const obj = (await getJson<Record<string, string>>(`${P}:enxoval_settings`)) ?? {};
      obj[params[0] as string] = params[1] as string;
      await setJson(`${P}:enxoval_settings`, obj);
      return;
    }

    // user_profile upsert
    if (n.includes('into user_profile')) {
      const existing = (await getUserProfile()) ?? {};
      await setJson(`${P}:user_profile`, {
        ...existing,
        id: 1,
        name: params[0] ?? null,
        due_date: params[1] ?? null,
        gestationType: params[2] !== undefined ? params[2] : (existing.gestationType ?? null),
        firstChild: params[3] !== undefined ? params[3] : (existing.firstChild ?? null),
        babyName: params[4] !== undefined ? params[4] : (existing.babyName ?? null),
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

    // symptom_logs upsert (params: log_date, week, symptom_key, intensity)
    if (n.includes('into symptom_logs')) {
      const [log_date, week, symptom_key, intensity] = params;
      const arr = (await getJson<Row[]>(`${P}:symptom_logs:${week}`)) ?? [];
      const idx = arr.findIndex(
        (r) => r.log_date === log_date && r.symptom_key === symptom_key
      );
      const row: Row = { log_date, week, symptom_key, intensity, updated_at: now };
      if (idx === -1) arr.push(row);
      else arr[idx] = row;
      await setJson(`${P}:symptom_logs:${week}`, arr);
      return;
    }

    // symptom_logs delete — por sintoma (week, log_date, symptom_key)
    // ou o dia inteiro (week, log_date) quando symptom_key vem undefined
    if (n.includes('delete from symptom_logs')) {
      const [week, log_date, symptom_key] = params;
      const arr = (await getJson<Row[]>(`${P}:symptom_logs:${week}`)) ?? [];
      const filtered =
        symptom_key === undefined
          ? arr.filter((r) => r.log_date !== log_date)
          : arr.filter((r) => !(r.log_date === log_date && r.symptom_key === symptom_key));
      await setJson(`${P}:symptom_logs:${week}`, filtered);
      return;
    }

    // symptom_day_notes upsert (params: log_date, week, note, no_symptoms)
    if (n.includes('into symptom_day_notes')) {
      const [log_date, week, note, no_symptoms] = params;
      const map =
        (await getJson<Record<string, { note: BindValue; no_symptoms: BindValue }>>(
          `${P}:symptom_day_notes:${week}`
        )) ?? {};
      map[log_date as string] = { note: note ?? null, no_symptoms: no_symptoms ?? 0 };
      await setJson(`${P}:symptom_day_notes:${week}`, map);
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

    // prenatal_appointments insert
    if (n.includes('into prenatal_appointments')) {
      const [type, appointment_date, appointment_time, notes, reminder_offset, specialty, professional, location, status, created_at] = params;
      const id = await nextId('prenatal_appointments');
      const arr = (await getJson<Row[]>(`${P}:prenatal_appointments`)) ?? [];
      arr.push({ id, type, appointment_date, appointment_time, notes, reminder_offset, specialty, professional, location, status, created_at });
      await setJson(`${P}:prenatal_appointments`, arr);
      return;
    }

    // prenatal_appointments update (full row)
    if (n.includes('update prenatal_appointments')) {
      const [type, appointment_date, appointment_time, notes, reminder_offset, specialty, professional, location, status, id] = params;
      const arr = (await getJson<Row[]>(`${P}:prenatal_appointments`)) ?? [];
      const idx = arr.findIndex((r) => r.id === id);
      if (idx !== -1) {
        arr[idx] = { ...arr[idx], type, appointment_date, appointment_time, notes, reminder_offset, specialty, professional, location, status };
        await setJson(`${P}:prenatal_appointments`, arr);
      }
      return;
    }

    // prenatal_appointments delete
    if (n.includes('delete from prenatal_appointments')) {
      const arr = (await getJson<Row[]>(`${P}:prenatal_appointments`)) ?? [];
      await setJson(`${P}:prenatal_appointments`, arr.filter((r) => r.id !== params[0]));
      return;
    }

    // prenatal_exams insert (seed + cadastro do usuário)
    if (n.includes('into prenatal_exams')) {
      const [name, trimester, week_start, week_end, notes, status, scheduled_date, result_uri, created_at] = params;
      const id = await nextId('prenatal_exams');
      const arr = (await getJson<Row[]>(`${P}:prenatal_exams`)) ?? [];
      arr.push({ id, name, trimester, week_start, week_end, notes, status, scheduled_date, result_uri, created_at });
      await setJson(`${P}:prenatal_exams`, arr);
      return;
    }

    // prenatal_exams update (full row)
    if (n.includes('update prenatal_exams')) {
      const [name, trimester, week_start, week_end, notes, status, scheduled_date, result_uri, id] = params;
      const arr = (await getJson<Row[]>(`${P}:prenatal_exams`)) ?? [];
      const idx = arr.findIndex((r) => r.id === id);
      if (idx !== -1) {
        arr[idx] = { ...arr[idx], name, trimester, week_start, week_end, notes, status, scheduled_date, result_uri };
        await setJson(`${P}:prenatal_exams`, arr);
      }
      return;
    }

    // prenatal_exams delete
    if (n.includes('delete from prenatal_exams')) {
      const arr = (await getJson<Row[]>(`${P}:prenatal_exams`)) ?? [];
      await setJson(`${P}:prenatal_exams`, arr.filter((r) => r.id !== params[0]));
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
