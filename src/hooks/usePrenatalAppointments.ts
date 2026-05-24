import { useState, useEffect, useCallback } from 'react';
import { getDatabase } from '../db';
import { scheduleNotification, cancelNotification } from './useNotifications';

export type AppointmentType =
  | 'Obstetra'
  | 'Ultrassom'
  | 'Nutricionista'
  | 'Exames'
  | 'Outro';
export type AppointmentStatus = 'agendada' | 'concluida';
export type ReminderOffset = '1day' | '2hours' | 'ontime';

export interface PrenatalAppointment {
  id: number;
  type: AppointmentType;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
  notes: string | null;
  specialty: string | null;
  professional: string | null;
  location: string | null;
  status: AppointmentStatus;
  reminderOffset: ReminderOffset;
  createdAt: string;
}

export interface AppointmentInput {
  type: AppointmentType;
  appointmentDate: string;
  appointmentTime: string;
  notes: string | null;
  specialty: string | null;
  professional: string | null;
  location: string | null;
  reminderOffset: ReminderOffset;
}

interface AppointmentRow {
  id: number;
  type: string;
  appointment_date: string;
  appointment_time: string;
  notes: string | null;
  specialty: string | null;
  professional: string | null;
  location: string | null;
  status: string | null;
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
    specialty: row.specialty ?? null,
    professional: row.professional ?? null,
    location: row.location ?? null,
    status: (row.status as AppointmentStatus) ?? 'agendada',
    reminderOffset: row.reminder_offset as ReminderOffset,
    createdAt: row.created_at,
  };
}

export function appointmentToInput(a: PrenatalAppointment): AppointmentInput {
  return {
    type: a.type,
    appointmentDate: a.appointmentDate,
    appointmentTime: a.appointmentTime,
    notes: a.notes,
    specialty: a.specialty,
    professional: a.professional,
    location: a.location,
    reminderOffset: a.reminderOffset,
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

async function scheduleFor(id: number, input: AppointmentInput): Promise<void> {
  const triggerDate = buildAppointmentTriggerDate(
    input.appointmentDate,
    input.appointmentTime,
    input.reminderOffset
  );
  if (triggerDate > new Date()) {
    const offsetLabel =
      input.reminderOffset === '1day'
        ? 'amanhã'
        : input.reminderOffset === '2hours'
          ? 'em 2 horas'
          : 'agora';
    await scheduleNotification({
      id: `appointment-${id}`,
      title: `Consulta: ${input.type}`,
      body: `Lembrete de consulta de ${input.type} — ${offsetLabel} às ${input.appointmentTime}.`,
      trigger: { date: triggerDate } as Parameters<typeof scheduleNotification>[0]['trigger'],
    });
  }
}

export function usePrenatalAppointments() {
  const [appointments, setAppointments] = useState<PrenatalAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const db = await getDatabase();
    const rows = await db.getAllAsync<AppointmentRow>(
      'SELECT id, type, appointment_date, appointment_time, notes, specialty, professional, location, status, reminder_offset, created_at ' +
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

  const addAppointment = useCallback(async (input: AppointmentInput): Promise<void> => {
    const db = await getDatabase();
    await db.runAsync(
      'INSERT INTO prenatal_appointments (type, appointment_date, appointment_time, notes, reminder_offset, specialty, professional, location, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        input.type,
        input.appointmentDate,
        input.appointmentTime,
        input.notes,
        input.reminderOffset,
        input.specialty,
        input.professional,
        input.location,
        'agendada',
        new Date().toISOString(),
      ]
    );
    const last = await db.getFirstAsync<{ id: number }>(
      'SELECT id FROM prenatal_appointments ORDER BY id DESC LIMIT 1'
    );
    const id = last?.id ?? 0;
    await scheduleFor(id, input);
    await load();
  }, [load]);

  const updateAppointment = useCallback(async (
    id: number,
    input: AppointmentInput,
    status: AppointmentStatus
  ): Promise<void> => {
    const db = await getDatabase();
    await db.runAsync(
      'UPDATE prenatal_appointments SET type = ?, appointment_date = ?, appointment_time = ?, notes = ?, reminder_offset = ?, specialty = ?, professional = ?, location = ?, status = ? WHERE id = ?',
      [
        input.type,
        input.appointmentDate,
        input.appointmentTime,
        input.notes,
        input.reminderOffset,
        input.specialty,
        input.professional,
        input.location,
        status,
        id,
      ]
    );
    await cancelNotification(`appointment-${id}`);
    if (status === 'agendada') await scheduleFor(id, input);
    await load();
  }, [load]);

  const setStatus = useCallback(async (
    id: number,
    status: AppointmentStatus
  ): Promise<void> => {
    const appt = appointments.find((a) => a.id === id);
    if (!appt) return;
    await updateAppointment(id, appointmentToInput(appt), status);
  }, [appointments, updateAppointment]);

  const reschedule = useCallback(async (
    id: number,
    appointmentDate: string,
    appointmentTime: string
  ): Promise<void> => {
    const appt = appointments.find((a) => a.id === id);
    if (!appt) return;
    await updateAppointment(
      id,
      { ...appointmentToInput(appt), appointmentDate, appointmentTime },
      appt.status
    );
  }, [appointments, updateAppointment]);

  const deleteAppointment = useCallback(async (id: number): Promise<void> => {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM prenatal_appointments WHERE id = ?', [id]);
    await cancelNotification(`appointment-${id}`);
    await load();
  }, [load]);

  return {
    appointments,
    loading,
    reload: load,
    addAppointment,
    updateAppointment,
    setStatus,
    reschedule,
    deleteAppointment,
  };
}
