import { useState, useEffect, useCallback } from 'react';
import { getDatabase } from '../db';

export type NotificationType =
  | 'prenatal_appointments'
  | 'weekly_milestones'
  | 'kick_counter'
  | 'contractions';

export interface NotificationSetting {
  type: NotificationType;
  enabled: boolean;
  defaultTime: string;
}

const DEFAULT_SETTINGS: NotificationSetting[] = [
  { type: 'prenatal_appointments', enabled: false, defaultTime: '08:00' },
  { type: 'weekly_milestones', enabled: false, defaultTime: '08:00' },
  { type: 'kick_counter', enabled: false, defaultTime: '08:00' },
  { type: 'contractions', enabled: false, defaultTime: '08:00' },
];

export function useNotificationSettings() {
  const [settings, setSettings] = useState<NotificationSetting[]>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const db = await getDatabase();
      const rows = await db.getAllAsync<{ type: string; enabled: number; default_time: string }>(
        'SELECT type, enabled, default_time FROM notification_settings'
      );
      if (cancelled) return;
      if (rows.length > 0) {
        setSettings(
          DEFAULT_SETTINGS.map(def => {
            const row = rows.find(r => r.type === def.type);
            return row
              ? { type: def.type, enabled: row.enabled === 1, defaultTime: row.default_time }
              : def;
          })
        );
      }
      setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const updateSetting = useCallback(
    async (type: NotificationType, enabled: boolean, defaultTime?: string) => {
      const db = await getDatabase();
      const current = settings.find(s => s.type === type);
      const time = defaultTime ?? current?.defaultTime ?? '08:00';
      await db.runAsync(
        'INSERT INTO notification_settings (type, enabled, default_time) VALUES (?, ?, ?) ' +
        'ON CONFLICT(type) DO UPDATE SET enabled = excluded.enabled, default_time = excluded.default_time',
        [type, enabled ? 1 : 0, time]
      );
      setSettings(prev =>
        prev.map(s => (s.type === type ? { ...s, enabled, defaultTime: time } : s))
      );
    },
    [settings]
  );

  const getSetting = useCallback(
    (type: NotificationType) => settings.find(s => s.type === type),
    [settings]
  );

  return { settings, loading, updateSetting, getSetting };
}
