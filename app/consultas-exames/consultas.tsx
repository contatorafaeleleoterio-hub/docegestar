import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { colors, spacing, typography, shadows } from '../../src/theme';
import { DGIcon } from '../../src/components/DGIcon';
import { BottomSheet } from '../../src/components/ui/BottomSheet';
import { FloatingLabelInput } from '../../src/components/ui/FloatingLabelInput';
import { FloatingLabelSelect } from '../../src/components/ui/FloatingLabelSelect';
import {
  usePrenatalAppointments,
  PrenatalAppointment,
  AppointmentType,
  AppointmentInput,
  ReminderOffset,
} from '../../src/hooks/usePrenatalAppointments';

const WEEKDAYS_SHORT = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

type FilterKey = 'proximas' | 'concluidas' | 'atrasadas';

const FILTERS: { id: FilterKey; label: string }[] = [
  { id: 'proximas', label: 'Próximas' },
  { id: 'concluidas', label: 'Concluídas' },
  { id: 'atrasadas', label: 'Atrasadas' },
];

const TYPE_OPTIONS: ReadonlyArray<{ label: string; value: AppointmentType }> = [
  { label: 'Obstetra', value: 'Obstetra' },
  { label: 'Ultrassom', value: 'Ultrassom' },
  { label: 'Nutricionista', value: 'Nutricionista' },
  { label: 'Exames', value: 'Exames' },
  { label: 'Outro', value: 'Outro' },
];

const REMINDER_OPTIONS: ReadonlyArray<{ label: string; value: ReminderOffset }> = [
  { label: '1 dia antes', value: '1day' },
  { label: '2 horas antes', value: '2hours' },
  { label: 'Na hora', value: 'ontime' },
];

// ── helpers de data/hora ──
function onlyDigits(s: string): string {
  return s.replace(/\D/g, '');
}
function maskDate(s: string): string {
  const d = onlyDigits(s).slice(0, 8);
  let out = d.slice(0, 2);
  if (d.length > 2) out += '/' + d.slice(2, 4);
  if (d.length > 4) out += '/' + d.slice(4, 8);
  return out;
}
function maskTime(s: string): string {
  const d = onlyDigits(s).slice(0, 4);
  let out = d.slice(0, 2);
  if (d.length > 2) out += ':' + d.slice(2, 4);
  return out;
}
function isValidDate(v: string): boolean {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
  if (!m) return false;
  const dd = +m[1], mm = +m[2], yyyy = +m[3];
  const dt = new Date(yyyy, mm - 1, dd);
  return dt.getFullYear() === yyyy && dt.getMonth() === mm - 1 && dt.getDate() === dd;
}
function isValidTime(v: string): boolean {
  const m = /^(\d{2}):(\d{2})$/.exec(v);
  if (!m) return false;
  return +m[1] < 24 && +m[2] < 60;
}
function toISO(v: string): string {
  const [dd, mm, yyyy] = v.split('/');
  return `${yyyy}-${mm}-${dd}`;
}
function fromISO(iso: string): string {
  const [yyyy, mm, dd] = iso.split('-');
  return `${dd}/${mm}/${yyyy}`;
}
function dateParts(iso: string): { weekday: string; day: number } {
  const dt = new Date(`${iso}T00:00:00`);
  return { weekday: WEEKDAYS_SHORT[dt.getDay()], day: dt.getDate() };
}

const EMPTY_FORM = {
  type: null as AppointmentType | null,
  specialty: '',
  professional: '',
  date: '',
  time: '',
  location: '',
  notes: '',
  reminder: '2hours' as ReminderOffset,
};

export default function ConsultasScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const {
    appointments,
    reload,
    addAppointment,
    updateAppointment,
    setStatus,
    deleteAppointment,
  } = usePrenatalAppointments();

  useFocusEffect(useCallback(() => { reload(); }, [reload]));

  const [filter, setFilter] = useState<FilterKey>('proximas');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<{ type?: string; date?: string; time?: string }>({});

  const filtered = useMemo(() => {
    const now = Date.now();
    return appointments.filter((a) => {
      const when = new Date(`${a.appointmentDate}T${a.appointmentTime}:00`).getTime();
      if (filter === 'concluidas') return a.status === 'concluida';
      if (filter === 'atrasadas') return a.status === 'agendada' && when < now;
      return a.status === 'agendada' && when >= now;
    });
  }, [appointments, filter]);

  function openNew() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setSheetOpen(true);
  }

  function openEdit(a: PrenatalAppointment) {
    setEditingId(a.id);
    setForm({
      type: a.type,
      specialty: a.specialty ?? '',
      professional: a.professional ?? '',
      date: fromISO(a.appointmentDate),
      time: a.appointmentTime,
      location: a.location ?? '',
      notes: a.notes ?? '',
      reminder: a.reminderOffset,
    });
    setErrors({});
    setSheetOpen(true);
  }

  async function save() {
    const next: typeof errors = {};
    if (!form.type) next.type = 'Selecione o tipo';
    if (!isValidDate(form.date)) next.date = 'Data inválida (DD/MM/AAAA)';
    if (!isValidTime(form.time)) next.time = 'Hora inválida (HH:MM)';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const input: AppointmentInput = {
      type: form.type as AppointmentType,
      appointmentDate: toISO(form.date),
      appointmentTime: form.time,
      notes: form.notes.trim() || null,
      specialty: form.specialty.trim() || null,
      professional: form.professional.trim() || null,
      location: form.location.trim() || null,
      reminderOffset: form.reminder,
    };

    if (editingId != null) {
      const current = appointments.find((a) => a.id === editingId);
      await updateAppointment(editingId, input, current?.status ?? 'agendada');
    } else {
      await addAppointment(input);
    }
    setSheetOpen(false);
  }

  const isOverdue = (a: PrenatalAppointment) =>
    a.status === 'agendada' &&
    new Date(`${a.appointmentDate}T${a.appointmentTime}:00`).getTime() < Date.now();

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
          <Text style={styles.headerEyebrow}>{appointments.length} no total</Text>
          <Text style={styles.headerTitle}>Consultas</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={openNew}
          accessibilityRole="button"
          accessibilityLabel="Adicionar consulta"
        >
          <DGIcon name="plus" size="md" color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        {FILTERS.map((f) => {
          const active = f.id === filter;
          return (
            <TouchableOpacity
              key={f.id}
              style={[styles.filterTab, active && styles.filterTabActive]}
              onPress={() => setFilter(f.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100, paddingTop: spacing[2] }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <DGIcon name="calendar" size="lg" color={colors.primary} />
            <Text style={styles.emptyTitle}>
              {filter === 'concluidas'
                ? 'Nenhuma consulta concluída'
                : filter === 'atrasadas'
                  ? 'Nenhuma consulta atrasada'
                  : 'Nenhuma consulta agendada'}
            </Text>
            <Text style={styles.emptyText}>
              Toque no + para adicionar uma consulta e receber lembretes.
            </Text>
          </View>
        ) : (
          filtered.map((a) => {
            const dp = dateParts(a.appointmentDate);
            const overdue = isOverdue(a);
            return (
              <TouchableOpacity
                key={a.id}
                style={styles.card}
                onPress={() => openEdit(a)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.cardDate,
                    a.status === 'concluida' && { backgroundColor: colors.successContainer },
                    overdue && { backgroundColor: colors.errorContainer },
                  ]}
                >
                  <Text style={styles.cardWeekday}>{dp.weekday}</Text>
                  <Text style={styles.cardDay}>{dp.day}</Text>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {a.specialty || a.type}
                  </Text>
                  <Text style={styles.cardMeta} numberOfLines={1}>
                    {a.appointmentTime}
                    {a.professional ? ` · ${a.professional}` : ''}
                  </Text>
                  {a.location ? (
                    <Text style={styles.cardMeta} numberOfLines={1}>📍 {a.location}</Text>
                  ) : null}
                  <View style={styles.cardActions}>
                    {a.status === 'concluida' ? (
                      <TouchableOpacity
                        style={styles.actionGhost}
                        onPress={() => setStatus(a.id, 'agendada')}
                      >
                        <Text style={styles.actionGhostText}>Reabrir</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.actionPrimary}
                        onPress={() => setStatus(a.id, 'concluida')}
                      >
                        <DGIcon name="check" size={13} color="#FFFFFF" />
                        <Text style={styles.actionPrimaryText}>Concluir</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={styles.actionGhost}
                      onPress={() => openEdit(a)}
                    >
                      <Text style={styles.actionGhostText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionIcon}
                      onPress={() => deleteAppointment(a.id)}
                      accessibilityLabel="Excluir consulta"
                    >
                      <DGIcon name="trash" size={15} color={colors.error} />
                    </TouchableOpacity>
                  </View>
                </View>
                {overdue ? (
                  <View style={styles.overdueDot} />
                ) : null}
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <BottomSheet visible={sheetOpen} onDismiss={() => setSheetOpen(false)}>
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>
            {editingId != null ? 'Editar consulta' : 'Nova consulta'}
          </Text>
          <TouchableOpacity onPress={() => setSheetOpen(false)} accessibilityLabel="Fechar">
            <DGIcon name="close" size="sm" color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.sheetScroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <FloatingLabelSelect
            label="Tipo"
            value={form.type}
            options={TYPE_OPTIONS}
            onChange={(v) => setForm((f) => ({ ...f, type: v }))}
            error={errors.type}
          />
          <FloatingLabelInput
            label="Especialidade (opcional)"
            value={form.specialty}
            onChangeText={(v) => setForm((f) => ({ ...f, specialty: v }))}
            autoCapitalize="sentences"
          />
          <FloatingLabelInput
            label="Profissional"
            value={form.professional}
            onChangeText={(v) => setForm((f) => ({ ...f, professional: v }))}
            autoCapitalize="words"
          />
          <FloatingLabelInput
            label="Data (DD/MM/AAAA)"
            value={form.date}
            onChangeText={(v) => setForm((f) => ({ ...f, date: maskDate(v) }))}
            keyboardType="number-pad"
            maxLength={10}
            error={errors.date}
          />
          <FloatingLabelInput
            label="Hora (HH:MM)"
            value={form.time}
            onChangeText={(v) => setForm((f) => ({ ...f, time: maskTime(v) }))}
            keyboardType="number-pad"
            maxLength={5}
            error={errors.time}
          />
          <FloatingLabelInput
            label="Local"
            value={form.location}
            onChangeText={(v) => setForm((f) => ({ ...f, location: v }))}
            autoCapitalize="sentences"
          />
          <FloatingLabelInput
            label="Observações"
            value={form.notes}
            onChangeText={(v) => setForm((f) => ({ ...f, notes: v }))}
            autoCapitalize="sentences"
          />
          <FloatingLabelSelect
            label="Lembrete"
            value={form.reminder}
            options={REMINDER_OPTIONS}
            onChange={(v) => setForm((f) => ({ ...f, reminder: v }))}
          />
          <TouchableOpacity style={styles.saveBtn} onPress={save} accessibilityRole="button">
            <Text style={styles.saveBtnText}>
              {editingId != null ? 'Salvar alterações' : 'Adicionar consulta'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </BottomSheet>
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
    ...shadows.soft,
  },
  headerText: { flex: 1 },
  headerEyebrow: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    color: colors.textSecondary,
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
    ...shadows.cta,
  },
  filters: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: spacing[5],
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTabActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  filterText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: colors.textSecondary,
  },
  filterTextActive: { color: '#FFFFFF' },
  empty: {
    marginHorizontal: spacing[5],
    marginTop: spacing[5],
    paddingVertical: spacing[8],
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
  card: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: spacing[5],
    marginTop: spacing[3],
    padding: 14,
    borderRadius: 20,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  cardDate: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWeekday: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 9.5,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  cardDay: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 20,
    color: colors.text,
    lineHeight: 22,
  },
  cardBody: { flex: 1, minWidth: 0 },
  cardTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14.5,
    color: colors.text,
  },
  cardMeta: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  actionPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  actionPrimaryText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  actionGhost: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainer,
  },
  actionGhostText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: colors.text,
  },
  actionIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.errorContainer,
    marginLeft: 'auto',
  },
  overdueDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginTop: 10,
    marginBottom: 6,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[3],
  },
  sheetTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 18,
    color: colors.text,
  },
  sheetScroll: {
    paddingHorizontal: spacing[5],
    maxHeight: 460,
  },
  saveBtn: {
    marginTop: spacing[2],
    marginBottom: spacing[4],
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    ...shadows.cta,
  },
  saveBtnText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
});
