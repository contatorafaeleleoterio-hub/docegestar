import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { colors } from '../src/theme';
import { getProfile } from '../src/hooks/useUserProfile';
import { rescheduleIfNeeded } from '../src/hooks/useNotifications';
import { getDatabase } from '../src/db';
import { buildAppointmentTriggerDate } from '../src/hooks/usePrenatalAppointments';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const profile = await getProfile();
      if (!cancelled) {
        setHasProfile(profile !== null && !!profile.dueDate);
        setLoading(false);
      }
      // Reagendar notificações de consultas que ainda não dispararam
      try {
        const db = await getDatabase();
        const rows = await db.getAllAsync<{
          id: number; type: string;
          appointment_date: string; appointment_time: string; reminder_offset: string;
        }>('SELECT id, type, appointment_date, appointment_time, reminder_offset FROM prenatal_appointments');
        const now = new Date();
        const toReschedule = rows
          .map(r => ({
            id: `appointment-${r.id}`,
            title: `Consulta: ${r.type}`,
            body: `Lembrete de consulta de ${r.type} às ${r.appointment_time}.`,
            trigger: {
              date: buildAppointmentTriggerDate(
                r.appointment_date,
                r.appointment_time,
                r.reminder_offset as 'ontime' | '1day' | '2hours'
              ),
            } as Parameters<typeof rescheduleIfNeeded>[0][0]['trigger'],
          }))
          .filter(item => (item.trigger as { date: Date }).date > now);
        await rescheduleIfNeeded(toReschedule);
      } catch { /* tabela pode não existir em versões anteriores — ignorar */ }
    }

    check();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (hasProfile) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return <Redirect href="/onboarding" />;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
