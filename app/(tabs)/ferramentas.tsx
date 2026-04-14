import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Vibration, Platform, ActivityIndicator, Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { getDatabase } from '../../src/db';
import { getWeek } from '../../src/data';
import { useSymptomChecks } from '../../src/hooks/useSymptomChecks';

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
          <View style={styles.chartBars}>
            {weekHistory.map(h => {
              const barHeight = maxCount > 0 ? Math.max(4, (h.count / maxCount) * BAR_MAX_HEIGHT) : 4;
              return (
                <View key={h.week} style={styles.chartBarCol}>
                  <Text style={styles.chartBarCount}>{h.count}</Text>
                  <View style={styles.chartBarTrack}>
                    <View style={[styles.chartBarFill, { height: barHeight }]} />
                  </View>
                  <Text style={styles.chartBarLabel}>S{h.week}</Text>
                </View>
              );
            })}
          </View>
          {topSymptom && (
            <Text style={styles.topSymptomText}>
              Sintoma mais frequente: <Text style={styles.topSymptomHighlight}>{topSymptom}</Text>
            </Text>
          )}
        </View>
      )}
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
    alignItems: 'center', justifyContent: 'center',
  },
  symptomToggleActive: { backgroundColor: colors.primary },
  symptomToggleMark: { color: colors.onPrimary, fontSize: 13, fontWeight: '700' },
  symptomLabel: { ...typography.body, color: colors.text, flex: 1 },
  symptomLabelActive: { color: colors.textLight, textDecorationLine: 'line-through' },

  chartSection: { marginTop: 16 },
  chartBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginVertical: 8 },
  chartBarCol: { flex: 1, alignItems: 'center', gap: 4 },
  chartBarCount: { ...typography.caption, color: colors.textSecondary },
  chartBarTrack: { width: '100%', height: 60, justifyContent: 'flex-end' },
  chartBarFill: { width: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  chartBarLabel: { ...typography.caption, color: colors.textSecondary },
  topSymptomText: { ...typography.bodySmall, color: colors.textSecondary, marginTop: 8 },
  topSymptomHighlight: { color: colors.primary, fontWeight: '700' },
});
