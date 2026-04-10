import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Vibration, Platform, ActivityIndicator,
} from 'react-native';
import { colors, typography } from '../../src/theme';
import { useCurrentWeek } from '../../src/hooks/useCurrentWeek';
import { getDatabase } from '../../src/db';

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
        <TouchableOpacity style={styles.primaryBtn} onPress={handleStart}>
          <Text style={styles.primaryBtnText}>Iniciar Sessão</Text>
        </TouchableOpacity>
      )}

      {active && (
        <>
          <Text style={styles.timerText}>{formatSeconds(elapsed)}</Text>
          <TouchableOpacity style={styles.kickBtn} onPress={handleKick} activeOpacity={0.7}>
            <Text style={styles.kickBtnText}>{count}</Text>
            <Text style={styles.kickBtnSub}>Toque para registrar chute</Text>
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
          <TouchableOpacity style={styles.primaryBtn} onPress={handleStart}>
            <Text style={styles.primaryBtnText}>Nova Sessão</Text>
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
        <TouchableOpacity style={styles.primaryBtn} onPress={handleStart}>
          <Text style={styles.primaryBtnText}>Iniciar Contração</Text>
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
          <TouchableOpacity style={styles.primaryBtn} onPress={handleNextContraction}>
            <Text style={styles.primaryBtnText}>Iniciar Nova Contração</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.stopBtn, { marginTop: 8 }]} onPress={() => setPhase('idle')}>
            <Text style={styles.stopBtnText}>Encerrar</Text>
          </TouchableOpacity>
        </>
      )}

      {isActive311 && (
        <View style={[styles.successBadge, { backgroundColor: colors.errorContainer }]}>
          <Text style={[styles.successText, { color: colors.error }]}>
            Padrão 3-1-1 detectado — consulte seu médico
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

// ─── Tela Principal ───────────────────────────────────────────────────────────

export default function FerramentasScreen() {
  const currentWeek = useCurrentWeek();
  if (currentWeek === null) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.screenTitle}>Ferramentas</Text>
      <Text style={styles.screenSub}>Semana {currentWeek}</Text>
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
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 24, padding: 16, marginBottom: 16,
    shadowColor: '#1b1c1a', shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06, shadowRadius: 25, elevation: 3,
  },
  toolTitle: { ...typography.h3, color: colors.text, marginBottom: 14 },

  primaryBtn: {
    backgroundColor: colors.primary, borderRadius: 12,
    paddingVertical: 13, alignItems: 'center', marginTop: 8,
  },
  primaryBtnText: { ...typography.label, color: colors.onPrimary },

  stopBtn: {
    backgroundColor: colors.errorContainer, borderRadius: 12,
    paddingVertical: 13, alignItems: 'center', marginTop: 8,
  },
  stopBtnText: { ...typography.label, color: colors.error },

  timerText: { fontSize: 48, fontFamily: 'NotoSerif_700Bold', fontWeight: '700', color: colors.primary, textAlign: 'center', marginVertical: 8 },

  kickBtn: {
    backgroundColor: colors.primaryLight, borderRadius: 80,
    width: 160, height: 160, alignSelf: 'center',
    alignItems: 'center', justifyContent: 'center', marginVertical: 8,
  },
  kickBtnText: { fontSize: 56, fontFamily: 'NotoSerif_700Bold', fontWeight: '700', color: colors.primary },
  kickBtnSub: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },

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

  phaseLabel: { ...typography.label, color: colors.textSecondary, textAlign: 'center', marginBottom: 4 },
});
