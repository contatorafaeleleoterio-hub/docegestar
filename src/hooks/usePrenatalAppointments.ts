import { useState, useEffect, useCallback } from 'react';
import { getDatabase } from '../db';
import { scheduleNotification, cancelNotification } from './useNotifications';

export type AppointmentType = 'Obstetra' | 'Ultrassom' | 'Exames' | 'Outro';
export type ReminderOffset = '1day' | '2hours' | 'ontime';

export interface PrenatalAppointment {
  id: number;
  type: AppointmentType;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
  notes: string | null;
  reminderOffset: ReminderOffset;
  createdAt: string;
}

interface AppointmentRow {
  id: number;
  type: string;
  appointment_date: string;
  appointment_time: string;
  notes: string | null;
  reminder_offset: string;
  created_at: string;
}

function rowToAppointment(row: AppointmentRow): PrenatalAppointment {
  return {
    id: row.id,
    type: row.type as AppointmentType,
    appointmentDate: row.appointment_date,
    appointmentTime: row.appointment_time,
    notes: row.notes,
    reminderOffset: row.reminder_offset as ReminderOffset,
    createdAt: row.created_at,
  };
}

export function buildAppointmentTriggerDate(
  date: string,
  time: string,
  offset: ReminderOffset
): Date {
  const dt = new Date(`${date}T${time}:00`);
  if (offset === '1day') dt.setDate(dt.getDate() - 1);
  else if (offset === '2hours') dt.setHours(dt.getHours() - 2);
  return dt;
}

export function usePrenatalAppointments() {
  const [appointments, setAppointments] = useState<PrenatalAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const db = await getDatabase();
    const rows = await db.getAllAsync<AppointmentRow>(
      'SELECT id, type, appointment_date, appointment_time, notes, reminder_offset, created_at ' +
      'FROM prenatal_appointments ORDER BY appointment_date ASC, appointment_time ASC'
    );
    setAppointments(rows.map(rowToAppointment));
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    load().then(() => { if (cancelled) setLoading(true); });
    return () => { cancelled = true; };
  }, [load]);

  const addAppointment = useCallback(async (
    type: AppointmentType,
    appointmentDate: string,
    appointmentTime: string,
    notes: string | null,
    reminderOffset: ReminderOffset
  ): Promise<void> => {
    const db = await getDatabase();
    await db.runAsync(
      'INSERT INTO prenatal_appointments (type, appointment_date, appointment_time, notes, reminder_offset, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [type, appointmentDate, appointmentTime, notes, reminderOffset, new Date().toISOString()]
    );
    const last = await db.getFirstAsync<{ id: number }>(
      'SELECT id FROM prenatal_appointments ORDER BY id DESC LIMIT 1'
    );
    const id = last?.id ?? 0;
    const triggerDate = buildAppointmentTriggerDate(appointmentDate, appointmentTime, reminderOffset);
    if (triggerDate > new Date()) {
      const offsetLabel =
        reminderOffset === '1day' ? 'amanhã' :
        reminderOffset === '2hours' ? 'em 2 horas' : 'agora';
      await scheduleNotification({
        id: `appointment-${id}`,
        title: `Consulta: ${type}`,
        body: `Lembrete de consulta de ${type} — ${offsetLabel} às ${appointmentTime}.`,
        trigger: { date: triggerDate } as Parameters<typeof scheduleNotification>[0]['trigger'],
      });
    }
    await load();
  }, [load]);

  const deleteAppointment = useCallback(async (id: number): Promise<void> => {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM prenatal_appointments WHERE id = ?', [id]);
    await cancelNotification(`appointment-${id}`);
    await load();
  }, [load]);

  return { appointments, loading, addAppointment, deleteAppointment };
}
