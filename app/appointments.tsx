import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../src/theme';
import { DGIcon } from '../src/components/DGIcon';
import { useBottomSpacing } from '../src/hooks/useBottomSpacing';
import {
  usePrenatalAppointments,
  PrenatalAppointment,
} from '../src/hooks/usePrenatalAppointments';

const WEEKDAYS_SHORT = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
const MONTHS_SHORT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function parseAppointmentDate(dateStr: string, timeStr: string): Date {
  return new Date(`${dateStr}T${timeStr}:00`);
}

function daysUntil(target: Date): number {
  const now = new Date();
  const ms = target.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function formatDayShort(date: Date): { weekday: string; day: number } {
  return {
    weekday: WEEKDAYS_SHORT[date.getDay()],
    day: date.getDate(),
  };
}

function formatRelative(target: Date): string {
  const days = daysUntil(target);
  if (days < 0) return 'já passou';
  if (days === 0) return 'hoje';
  if (days === 1) return 'amanhã';
  return `em ${days} dias`;
}

function formatListDate(date: Date): string {
  return `${String(date.getDate()).padStart(2, '0')} ${MONTHS_SHORT[date.getMonth()]}`;
}

export default function AppointmentsScreen() {
  const router = useRouter();
  const bottom = useBottomSpacing(false);
  const { appointments, loading } = usePrenatalAppointments();

  const { next, upcoming } = useMemo(() => {
    const now = new Date();
    const future = appointments
      .map((a) => ({
        appt: a,
        when: parseAppointmentDate(a.appointmentDate, a.appointmentTime),
      }))
      .filter((x) => x.when.getTime() > now.getTime())
      .sort((a, b) => a.when.getTime() - b.when.getTime());
    return {
      next: future[0],
      upcoming: future.slice(1),
    };
  }, [appointments]);

  function goAdd() {
    Alert.alert(
      'Em breve! 🌸',
      'Adicionar consultas por aqui chega em uma próxima atualização. Por enquanto, use Ferramentas → Consultas.',
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <DGIcon name="chevronLeft" size="sm" color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerEyebrow}>
            {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </Text>
          <Text style={styles.headerTitle}>Consultas</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={goAdd}
          accessibilityRole="button"
          accessibilityLabel="Adicionar consulta"
        >
          <DGIcon name="plus" size="md" color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Carregando suas consultas…</Text>
          </View>
        ) : next ? (
          <View style={styles.section}>
            <Text style={styles.sectionEyebrow}>
              Próxima · {formatRelative(next.when)}
            </Text>
            <LinearGradient
              colors={[colors.lav100, colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.hero}
            >
              <View style={styles.heroRow}>
                <View style={styles.heroDate}>
                  <Text style={styles.heroDateWeekday}>
                    {formatDayShort(next.when).weekday}
                  </Text>
                  <Text style={styles.heroDateDay}>
                    {formatDayShort(next.when).day}
                  </Text>
                </View>
                <View style={styles.heroInfo}>
                  <Text style={styles.heroTime}>{next.appt.appointmentTime}</Text>
                  <Text style={styles.heroTitle}>{next.appt.type}</Text>
                  {next.appt.notes ? (
                    <Text style={styles.heroNotes} numberOfLines={1}>
                      {next.appt.notes}
                    </Text>
                  ) : null}
                </View>
              </View>
            </LinearGradient>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <DGIcon name="calendar" size="lg" color={colors.primary} />
            <Text style={styles.emptyTitle}>Nenhuma consulta marcada</Text>
            <Text style={styles.emptyText}>
              Adicione consultas em Ferramentas → Consultas para receber lembretes.
            </Text>
          </View>
        )}

        {upcoming.length > 0 ? (
          <View style={styles.listSection}>
            <View style={styles.listHeader}>
              <Text style={styles.listTitle}>Próximas</Text>
              <Text style={styles.listCount}>{upcoming.length}</Text>
            </View>

            {upcoming.map((item) => (
              <View key={item.appt.id} style={styles.listItem}>
                <View style={styles.itemAccent} />
                <View style={styles.itemBody}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.appt.type}
                  </Text>
                  {item.appt.notes ? (
                    <Text style={styles.itemNotes} numberOfLines={1}>
                      {item.appt.notes}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.itemDate}>
                  <Text style={styles.itemDateText}>{formatListDate(item.when)}</Text>
                  <Text style={styles.itemTimeText}>
                    {item.appt.appointmentTime}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  headerText: { flex: 1 },
  headerEyebrow: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    letterSpacing: -0.6,
    color: colors.text,
  },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 6,
  },
  scroll: {},
  section: { paddingHorizontal: spacing[5] },
  sectionEyebrow: {
    ...typography.eyebrow,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: spacing[2],
  },
  hero: {
    borderRadius: 26,
    padding: 18,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  heroDate: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  heroDateWeekday: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  heroDateDay: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    color: colors.text,
    lineHeight: 24,
  },
  heroInfo: { flex: 1 },
  heroTime: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 16,
    color: colors.text,
    marginTop: 2,
  },
  heroNotes: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11.5,
    color: colors.textSecondary,
    marginTop: 2,
  },
  emptyCard: {
    marginHorizontal: spacing[5],
    paddingVertical: spacing[6],
    paddingHorizontal: spacing[4],
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.border,
    alignItems: 'center',
    gap: spacing[2],
  },
  emptyTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: colors.text,
    marginTop: spacing[2],
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  listSection: {
    paddingHorizontal: spacing[5],
    marginTop: spacing[5],
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  listTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: colors.text,
  },
  listCount: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: colors.primary,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
    backgroundColor: colors.surface,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  itemAccent: {
    width: 4,
    height: 36,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  itemBody: { flex: 1, minWidth: 0 },
  itemTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 13,
    color: colors.text,
  },
  itemNotes: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  itemDate: { alignItems: 'flex-end' },
  itemDateText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 12,
    color: colors.text,
  },
  itemTimeText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
