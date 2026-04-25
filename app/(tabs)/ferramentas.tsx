import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Vibration, Platform, ActivityIndicator, Pressable,
  Modal, TextInput, Alert,
} from 'react-native';
import MaskInput, { Masks } from 'react-native-mask-input';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { getDatabase } from '../../src/db';
import { getWeek } from '../../src/data';
import { useSymptomChecks } from '../../src/hooks/useSymptomChecks';
import { usePrenatalAppointments, type AppointmentType, type ReminderOffset } from '../../src/hooks/usePrenatalAppointments';
import { parseDateBR, toISO } from '../../src/utils/date';

// ─── Tipos ────────────────────────────────────────────────────────────────────

type ContractionIntensity = 'leve' | 'media' | 'forte';

interface KickRecord { id: number; kick_count: number; duration_seconds: number; recorded_at: string; }
interface ContractionRecord { id: number; duration_seconds: number; interval_seconds: number | null; intensity: ContractionIntensity | null; recorded_at: string; }

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatSeconds(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
}

// ─── Kick Counter ─────────────────────────────────────────────────────────────

function KickCounter({ week }: { week: number }) {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [history, setHistory] = useState<KickRecord[]>([]);
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    loadHistory();
  }, [week]);

  useEffect(() => {
    if (active) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active]);

  async function loadHistory() {
    const db = await getDatabase();
    const rows = await db.getAllAsync<KickRecord>(
      'SELECT id, kick_count, duration_seconds, recorded_at FROM kick_records WHERE week = ? ORDER BY recorded_at DESC LIMIT 5',
      [week]
    );
    setHistory(rows);
  }

  function handleStart() {
    setCount(0); setElapsed(0); setSaved(false); setActive(true);
  }

  function handleKick() {
    if (!active) return;
    if (Platform.OS !== 'web') Vibration.vibrate(50);
    setCount(c => c + 1);
  }

  async function handleStop() {
    setActive(false);
    const db = await getDatabase();
    await db.runAsync(
      'INSERT INTO kick_records (week, kick_count, duration_seconds) VALUES (?, ?, ?)',
      [week, count, elapsed]
    );
    setSaved(true);
    loadHistory();
  }

  return (
    <View style={styles.card}>
      <Text style={styles.toolTitle}>Contador de Chutes</Text>

      {!active && !saved && (
        <TouchableOpacity onPress={handleStart} style={styles.primaryBtnWrapper}>
          <LinearGradient colors={[colors.primary, '#7a2d5a']} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Iniciar Sessão</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {active && (
        <>
          <Text style={styles.timerText}>{formatSeconds(elapsed)}</Text>
          <TouchableOpacity onPress={handleKick} activeOpacity={0.7} style={styles.kickBtnWrapper}>
            <LinearGradient colors={[colors.primary, '#7a2d5a']} style={styles.kickBtn}>
              <Text style={styles.kickBtnText}>{count}</Text>
              <Text style={styles.kickBtnSub}>Toque para registrar chute</Text>
            </LinearGradient>
          </TouchableOpacity>
          {count >= 10 && (
            <View style={styles.successBadge}>
              <Text style={styles.successText}>Ótimo! 10 movimentos registrados</Text>
            </View>
          )}
          <TouchableOpacity style={styles.stopBtn} onPress={handleStop}>
            <Text style={styles.stopBtnText}>Encerrar Sessão</Text>
          </TouchableOpacity>
        </>
      )}

      {saved && (
        <>
          <View style={styles.savedBadge}>
            <Text style={styles.savedText}>Sessão salva: {count} chutes em {formatSeconds(elapsed)}</Text>
          </View>
          <TouchableOpacity onPress={handleStart} style={styles.primaryBtnWrapper}>
            <LinearGradient colors={[colors.primary, '#7a2d5a']} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Nova Sessão</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      )}

      {history.length > 0 && (
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Últimas sessões</Text>
          {history.map(r => (
            <View key={r.id} style={styles.historyRow}>
              <Text style={styles.historyDate}>{formatDate(r.recorded_at)}</Text>
              <Text style={styles.historyValue}>{r.kick_count} chutes · {formatSeconds(r.duration_seconds)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Contraction Timer ────────────────────────────────────────────────────────

function ContractionTimer({ week }: { week: number }) {
  const [phase, setPhase] = useState<'idle' | 'contracting' | 'interval'>('idle');
  const [duration, setDuration] = useState(0);
  const [interval, setInterval_] = useState(0);
  const [intensity, setIntensity] = useState<ContractionIntensity>('media');
  const [history, setHistory] = useState<ContractionRecord[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastDuration = useRef(0);

  useEffect(() => {
    loadHistory();
  }, [week]);

  useEffect(() => {
    if (phase === 'contracting') {
      setDuration(0);
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } else if (phase === 'interval') {
      setInterval_(0);
      timerRef.current = setInterval(() => setInterval_(i => i + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  async function loadHistory() {
    const db = await getDatabase();
    const rows = await db.getAllAsync<ContractionRecord>(
      'SELECT id, duration_seconds, interval_seconds, intensity, recorded_at FROM contraction_records WHERE week = ? ORDER BY recorded_at DESC LIMIT 5',
      [week]
    );
    setHistory(rows);
  }

  function handleStart() { setPhase('contracting'); }

  async function handleStop() {
    lastDuration.current = duration;
    setPhase('interval');
    const db = await getDatabase();
    await db.runAsync(
      'INSERT INTO contraction_records (week, duration_seconds, interval_seconds, intensity) VALUES (?, ?, ?, ?)',
      [week, duration, null, intensity]
    );
    loadHistory();
  }

  async function handleNextContraction() {
    const db = await getDatabase();
    const last = await db.getFirstAsync<{ id: number }>(
      'SELECT id FROM contraction_records WHERE week = ? ORDER BY recorded_at DESC LIMIT 1', [week]
    );
    if (last) {
      await db.runAsync(
        'UPDATE contraction_records SET interval_seconds = ? WHERE id = ?',
        [interval, last.id]
      );
    }
    loadHistory();
    setPhase('contracting');
  }

  const INTENSITY_OPTIONS: { value: ContractionIntensity; label: string }[] = [
    { value: 'leve', label: 'Leve' },
    { value: 'media', label: 'Média' },
    { value: 'forte', label: 'Forte' },
  ];

  const isActive311 = history.length >= 3
    && history.slice(0, 3).every(r => r.duration_seconds >= 60 && (r.interval_seconds ?? 999) <= 300);

  return (
    <View style={styles.card}>
      <Text style={styles.toolTitle}>Temporizador de Contrações</Text>

      <View style={styles.intensityRow}>
        <Text style={styles.intensityLabel}>Intensidade:</Text>
        {INTENSITY_OPTIONS.map(opt => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.optionBtn, intensity === opt.value && styles.optionBtnActive]}
            onPress={() => setIntensity(opt.value)}
          >
            <Text style={[styles.optionText, intensity === opt.value && styles.optionTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {phase === 'idle' && (
        <TouchableOpacity onPress={handleStart} style={styles.primaryBtnWrapper}>
          <LinearGradient colors={[colors.primary, '#7a2d5a']} style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Iniciar Contração</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {phase === 'contracting' && (
        <>
          <Text style={styles.phaseLabel}>Contração em andamento</Text>
          <Text style={styles.timerText}>{formatSeconds(duration)}</Text>
          <TouchableOpacity style={styles.stopBtn} onPress={handleStop}>
            <Text style={styles.stopBtnText}>Parar Contração</Text>
          </TouchableOpacity>
        </>
      )}

      {phase === 'interval' && (
        <>
          <Text style={styles.phaseLabel}>Intervalo entre contrações</Text>
          <Text style={styles.timerText}>{formatSeconds(interval)}</Text>
          <Text style={styles.savedText}>Última duração: {formatSeconds(lastDuration.current)}</Text>
          <TouchableOpacity onPress={handleNextContraction} style={styles.primaryBtnWrapper}>
            <LinearGradient colors={[colors.primary, '#7a2d5a']} style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>Iniciar Nova Contração</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.stopBtn, { marginTop: 8 }]} onPress={() => setPhase('idle')}>
            <Text style={styles.stopBtnText}>Encerrar</Text>
          </TouchableOpacity>
        </>
      )}

      {isActive311 && (
        <View style={styles.badge311}>
          <Text style={styles.badge311Text}>
            ⚠️ Padrão 3-1-1 detectado — consulte seu médico
          </Text>
        </View>
      )}

      {history.length > 0 && (
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Últimas contrações</Text>
          {history.map(r => (
            <View key={r.id} style={styles.historyRow}>
              <Text style={styles.historyDate}>{formatDate(r.recorded_at)}</Text>
              <Text style={styles.historyValue}>
                {formatSeconds(r.duration_seconds)}
                {r.interval_seconds ? ` · intervalo: ${formatSeconds(r.interval_seconds)}` : ''}
                {r.intensity ? ` · ${r.intensity}` : ''}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Symptom Tracker ──────────────────────────────────────────────────────────

interface WeekSymptomCount { week: number; count: number; }

function SymptomTracker({ week }: { week: number }) {
  const weekData = getWeek(week);
  const { checks, toggleSymptom } = useSymptomChecks(week);
  const [weekHistory, setWeekHistory] = useState<WeekSymptomCount[]>([]);
  const [topSymptom, setTopSymptom] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, [week]);

  async function loadHistory() {
    const db = await getDatabase();
    const fromWeek = Math.max(1, week - 3);

    const rows = await db.getAllAsync<{ week: number; count: number }>(
      'SELECT week, COUNT(*) as count FROM symptom_checks WHERE week >= ? AND week <= ? AND checked = 1 GROUP BY week',
      [fromWeek, week]
    );

    const history: WeekSymptomCount[] = [];
    for (let w = fromWeek; w <= week; w++) {
      const found = rows.find(r => r.week === w);
      history.push({ week: w, count: found ? found.count : 0 });
    }
    setWeekHistory(history);

    const top = await db.getFirstAsync<{ symptom_key: string }>(
      'SELECT symptom_key, COUNT(*) as freq FROM symptom_checks WHERE week >= ? AND week <= ? AND checked = 1 GROUP BY symptom_key ORDER BY freq DESC LIMIT 1',
      [fromWeek, week]
    );
    setTopSymptom(top ? top.symptom_key : null);
  }

  if (!weekData) return null;

  const maxCount = Math.max(...weekHistory.map(h => h.count), 1);
  const BAR_MAX_HEIGHT = 60;

  return (
    <View style={styles.card}>
      <Text style={styles.toolTitle}>Meu Corpo esta Semana</Text>

      {weekData.symptoms.map(symptom => {
        const checked = checks[symptom] ?? false;
        return (
          <Pressable key={symptom} style={styles.symptomRow} onPress={() => toggleSymptom(symptom, !checked)}>
            <View style={[styles.symptomToggle, checked && styles.symptomToggleActive]}>
              {checked && <Text style={styles.symptomToggleMark}>✓</Text>}
            </View>
            <Text style={[styles.symptomLabel, checked && styles.symptomLabelActive]}>{symptom}</Text>
          </Pressable>
        );
      })}

      {weekHistory.length > 0 && (
        <View style={styles.chartSection}>
          <Text style={styles.historyTitle}>Últimas {weekHistory.length} semanas</Text>
          {maxCount <= 1 && weekHistory.every(h => h.count === 0) ? (
            <Text style={styles.chartEmptyText}>Nenhum sintoma registrado ainda. Marque sintomas acima para ver seu histórico.</Text>
          ) : (
            <>
              <View style={styles.chartContainer}>
                {/* Y-axis labels */}
                <View style={styles.yAxis}>
                  <Text style={styles.yAxisLabel}>{maxCount}</Text>
                  <Text style={styles.yAxisLabel}>{Math.ceil(maxCount / 2)}</Text>
                  <Text style={styles.yAxisLabel}>0</Text>
                </View>

                {/* Bars with tooltip */}
                <View style={styles.chartBars}>
                  {weekHistory.map(h => {
                    const barHeight = maxCount > 0 ? Math.max(4, (h.count / maxCount) * BAR_MAX_HEIGHT) : 4;
                    return (
                      <Pressable key={h.week} style={styles.chartBarCol} onPress={() => {}}>
                        <Text style={styles.chartBarCount}>{h.count > 0 ? h.count : ''}</Text>
                        <View style={styles.chartBarTrack}>
                          <View style={[styles.chartBarFill, h.count === 0 && styles.chartBarFillEmpty, { height: barHeight }]} />
                        </View>
                        <Text style={styles.chartBarLabel}>Sem {h.week}</Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
              {topSymptom && (
                <Text style={styles.topSymptomText}>
                  Sintoma mais frequente: <Text style={styles.topSymptomHighlight}>{topSymptom}</Text>
                </Text>
              )}
            </>
          )}
        </View>
      )}
    </View>
  );
}

// ─── Prenatal Appointments ────────────────────────────────────────────────────

const APPOINTMENT_TYPES: AppointmentType[] = ['Obstetra', 'Ultrassom', 'Exames', 'Outro'];
const REMINDER_OFFSETS: { value: ReminderOffset; label: string }[] = [
  { value: '1day', label: '1 dia antes' },
  { value: '2hours', label: '2h antes' },
  { value: 'ontime', label: 'Na hora' },
];

function formatAppointmentDate(date: string, time: string): string {
  const [y, m, d] = date.split('-');
  return `${d}/${m} às ${time}`;
}

function PrenatalAppointments() {
  const { appointments, loading, addAppointment, deleteAppointment } = usePrenatalAppointments();
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState<AppointmentType>('Obstetra');
  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [notes, setNotes] = useState('');
  const [reminderOffset, setReminderOffset] = useState<ReminderOffset>('2hours');
  const [saving, setSaving] = useState(false);

  function resetForm() {
    setType('Obstetra'); setDateInput(''); setTimeInput('');
    setNotes(''); setReminderOffset('2hours');
  }

  function handleOpen() { resetForm(); setShowModal(true); }
  function handleClose() { setShowModal(false); }

  function formatTimeInput(text: string): string {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}:${digits.slice(2)}`;
    return digits;
  }

  async function handleSave() {
    const parsed = parseDateBR(dateInput);
    if (!parsed) { Alert.alert('Erro', 'Data inválida. Use DD/MM/AAAA.'); return; }
    if (!/^\d{2}:\d{2}$/.test(timeInput)) { Alert.alert('Erro', 'Hora inválida. Use HH:MM.'); return; }
    setSaving(true);
    try {
      await addAppointment(type, toISO(parsed), timeInput, notes.trim() || null, reminderOffset);
      setShowModal(false);
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar a consulta.');
    } finally {
      setSaving(false);
    }
  }

  function handleDelete(id: number) {
    Alert.alert('Remover consulta', 'Deseja remover esta consulta e seu lembrete?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => deleteAppointment(id) },
    ]);
  }

  return (
    <View style={styles.card}>
      <View style={styles.apptHeader}>
        <Text style={styles.toolTitle}>Consultas Pré-Natais</Text>
        <TouchableOpacity onPress={handleOpen} style={styles.apptAddBtn}>
          <Text style={styles.apptAddBtnText}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : appointments.length === 0 ? (
        <Text style={styles.apptEmpty}>Nenhuma consulta agendada.</Text>
      ) : (
        appointments.map(appt => (
          <View key={appt.id} style={styles.apptRow}>
            <View style={styles.apptInfo}>
              <Text style={styles.apptType}>{appt.type}</Text>
              <Text style={styles.apptDate}>{formatAppointmentDate(appt.appointmentDate, appt.appointmentTime)}</Text>
              {appt.notes ? <Text style={styles.apptNotes}>{appt.notes}</Text> : null}
            </View>
            <TouchableOpacity onPress={() => handleDelete(appt.id)} style={styles.apptDeleteBtn}>
              <Text style={styles.apptDeleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <Modal visible={showModal} animationType="slide" presentationStyle="pageSheet" onRequestClose={handleClose}>
        <ScrollView style={styles.modalContainer} contentContainerStyle={styles.modalContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.modalTitle}>Nova Consulta</Text>

          <Text style={styles.apptFormLabel}>Tipo</Text>
          <View style={styles.apptTypeRow}>
            {APPOINTMENT_TYPES.map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.apptTypeBtn, type === t && styles.apptTypeBtnActive]}
                onPress={() => setType(t)}
              >
                <Text style={[styles.apptTypeBtnText, type === t && styles.apptTypeBtnTextActive]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.apptFormLabel}>Data <Text style={{ color: colors.error }}>*</Text></Text>
          <MaskInput
            style={styles.apptInput}
            value={dateInput}
            onChangeText={(masked) => setDateInput(masked)}
            mask={Masks.DATE_DDMMYYYY}
            placeholder="DD/MM/AAAA"
            placeholderTextColor={colors.textLight}
            keyboardType="numeric"
          />

          <Text style={styles.apptFormLabel}>Horário <Text style={{ color: colors.error }}>*</Text></Text>
          <TextInput
            style={styles.apptInput}
            value={timeInput}
            onChangeText={text => setTimeInput(formatTimeInput(text))}
            placeholder="HH:MM"
            placeholderTextColor={colors.textLight}
            keyboardType="numeric"
            maxLength={5}
          />

          <Text style={styles.apptFormLabel}>Observação (opcional)</Text>
          <TextInput
            style={[styles.apptInput, styles.apptNotesInput]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Ex: Dr. João, UBS Central..."
            placeholderTextColor={colors.textLight}
            multiline
            numberOfLines={3}
          />

          <Text style={styles.apptFormLabel}>Lembrete</Text>
          <View style={styles.apptTypeRow}>
            {REMINDER_OFFSETS.map(opt => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.apptTypeBtn, reminderOffset === opt.value && styles.apptTypeBtnActive]}
                onPress={() => setReminderOffset(opt.value)}
              >
                <Text style={[styles.apptTypeBtnText, reminderOffset === opt.value && styles.apptTypeBtnTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.primaryBtnWrapper, saving && { opacity: 0.6 }]}
            onPress={handleSave}
            disabled={saving}
          >
            <LinearGradient colors={[colors.primary, '#7a2d5a']} style={styles.primaryBtn}>
              {saving ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryBtnText}>Salvar Consulta</Text>}
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.stopBtn, { marginTop: 12 }]} onPress={handleClose}>
            <Text style={styles.stopBtnText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
}

// ─── Tela Principal ───────────────────────────────────────────────────────────

export default function FerramentasScreen() {
  const currentWeek = useCurrentWeek();
  if (currentWeek === null) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.screenTitle}>Ferramentas</Text>
      <Text style={styles.screenSub}>Semana {currentWeek}</Text>
      <PrenatalAppointments />
      <SymptomTracker week={currentWeek} />
      <KickCounter week={currentWeek} />
      <ContractionTimer week={currentWeek} />
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 40 },
  screenTitle: { ...typography.h2, color: colors.text, marginBottom: 2 },
  screenSub: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: 16 },

  card: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 24, padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.6)',
    shadowColor: '#1b1c1a', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.10, shadowRadius: 30, elevation: 4,
  },
  toolTitle: { ...typography.h3, color: colors.text, marginBottom: 14 },

  primaryBtnWrapper: { marginTop: 8, borderRadius: 12, overflow: 'hidden' },
  primaryBtn: {
    borderRadius: 12,
    paddingVertical: 13, alignItems: 'center',
  },
  primaryBtnText: { ...typography.label, color: '#ffffff' },

  stopBtn: {
    backgroundColor: colors.errorContainer, borderRadius: 12,
    paddingVertical: 13, alignItems: 'center', marginTop: 8,
  },
  stopBtnText: { ...typography.label, color: colors.error },

  timerText: { fontSize: 48, fontFamily: 'NotoSerif_700Bold', fontWeight: '700', color: colors.primary, textAlign: 'center', marginVertical: 8 },

  kickBtnWrapper: { alignSelf: 'center', marginVertical: 8, borderRadius: 80, overflow: 'hidden' },
  kickBtn: {
    borderRadius: 80,
    width: 160, height: 160,
    alignItems: 'center', justifyContent: 'center',
  },
  kickBtnText: { fontSize: 56, fontFamily: 'NotoSerif_700Bold', fontWeight: '700', color: '#ffffff' },
  kickBtnSub: { ...typography.caption, color: 'rgba(255,255,255,0.85)', textAlign: 'center' },

  successBadge: {
    backgroundColor: colors.accentLight, borderRadius: 12, padding: 10, marginTop: 10,
  },
  successText: { ...typography.bodySmall, color: colors.accent, textAlign: 'center' },

  savedBadge: { backgroundColor: colors.primaryLight, borderRadius: 12, padding: 10, marginVertical: 8 },
  savedText: { ...typography.bodySmall, color: colors.primary, textAlign: 'center' },

  historySection: {
    backgroundColor: colors.surfaceContainerLow, borderRadius: 12,
    padding: 12, marginTop: 12,
  },
  historyTitle: { ...typography.label, color: colors.textSecondary, marginBottom: 8 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  historyDate: { ...typography.caption, color: colors.textSecondary },
  historyValue: { ...typography.caption, color: colors.text },

  intensityRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  intensityLabel: { ...typography.label, color: colors.text },
  optionBtn: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
    backgroundColor: colors.surfaceContainerHigh,
  },
  optionBtnActive: { backgroundColor: colors.primary },
  optionText: { ...typography.caption, color: colors.textSecondary },
  optionTextActive: { color: colors.onPrimary },

  badge311: {
    backgroundColor: colors.error, borderRadius: 12, padding: 10, marginTop: 10,
  },
  badge311Text: { ...typography.bodySmall, color: '#ffffff', textAlign: 'center', fontWeight: '700' },

  phaseLabel: { ...typography.label, color: colors.textSecondary, textAlign: 'center', marginBottom: 4 },

  symptomRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  symptomToggle: {
    width: 22, height: 22, borderRadius: 6,
    backgroundColor: colors.surfaceContainerHigh,
    borderWidth: 2, borderColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  symptomToggleActive: { backgroundColor: colors.primary },
  symptomToggleMark: { color: colors.onPrimary, fontSize: 13, fontWeight: '700' },
  symptomLabel: { ...typography.body, color: colors.text, flex: 1 },
  symptomLabelActive: { color: colors.textLight, textDecorationLine: 'line-through' },

  chartSection: { marginTop: 16 },
  chartContainer: { flexDirection: 'row', gap: 8 },
  yAxis: { width: 20, justifyContent: 'space-between', alignItems: 'flex-end' },
  yAxisLabel: { ...typography.caption, color: colors.textSecondary, fontSize: 10 },
  chartBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginVertical: 8, flex: 1 },
  chartBarCol: { flex: 1, alignItems: 'center', gap: 4 },
  chartBarCount: { ...typography.caption, color: colors.textSecondary },
  chartBarTrack: { width: '100%', height: 60, justifyContent: 'flex-end' },
  chartBarFill: { width: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  chartBarFillEmpty: { backgroundColor: colors.surfaceContainerHigh },
  chartBarLabel: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },
  chartEmptyText: { ...typography.bodySmall, color: colors.textSecondary, textAlign: 'center', paddingVertical: 16, fontStyle: 'italic' },
  topSymptomText: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 8 },
  topSymptomHighlight: { color: colors.primary, fontWeight: '700' },

  // Prenatal Appointments
  apptHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  apptAddBtn: {
    backgroundColor: colors.primaryLight, borderRadius: 10,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  apptAddBtnText: { ...typography.label, color: colors.primary },
  apptEmpty: { ...typography.bodySmall, color: colors.textSecondary, textAlign: 'center', paddingVertical: 12 },
  apptRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 10, padding: 12, marginBottom: 8,
  },
  apptInfo: { flex: 1 },
  apptType: { ...typography.label, color: colors.text },
  apptDate: { ...typography.bodySmall, color: colors.primary, marginTop: 2 },
  apptNotes: { ...typography.caption, color: colors.textSecondary, marginTop: 2 },
  apptDeleteBtn: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: colors.errorContainer,
    alignItems: 'center', justifyContent: 'center', marginLeft: 8,
  },
  apptDeleteText: { ...typography.label, color: colors.error },
  modalContainer: { flex: 1, backgroundColor: colors.background },
  modalContent: { padding: 24, paddingBottom: 48 },
  modalTitle: { ...typography.h2, color: colors.text, marginBottom: 20 },
  apptFormLabel: { ...typography.label, color: colors.text, marginBottom: 8, marginTop: 16 },
  apptInput: {
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14,
    ...typography.body, color: colors.text,
    borderWidth: 1, borderColor: colors.border,
  },
  apptNotesInput: { height: 80, textAlignVertical: 'top' },
  apptTypeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  apptTypeBtn: {
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 10, backgroundColor: colors.surfaceContainerHigh,
  },
  apptTypeBtnActive: { backgroundColor: colors.primary },
  apptTypeBtnText: { ...typography.caption, color: colors.textSecondary },
  apptTypeBtnTextActive: { color: '#ffffff', fontWeight: '700' },
});
