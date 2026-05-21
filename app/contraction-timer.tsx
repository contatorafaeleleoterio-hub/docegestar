import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, shadows } from '../src/theme';
import { useCurrentWeek } from '../src/hooks/useCurrentWeek';
import { getDatabase } from '../src/db';
import { DGIcon } from '../src/components/DGIcon';
import { useBottomSpacing } from '../src/hooks/useBottomSpacing';

type ContractionIntensity = 'leve' | 'media' | 'forte';

interface ContractionRecord {
  id: number;
  duration_seconds: number;
  interval_seconds: number | null;
  intensity: ContractionIntensity | null;
  recorded_at: string;
}

function formatSeconds(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ContractionTimerScreen() {
  const router = useRouter();
  const week = useCurrentWeek();
  const bottom = useBottomSpacing(false);
  const [phase, setPhase] = useState<'idle' | 'contracting' | 'interval'>('idle');
  const [duration, setDuration] = useState(0);
  const [interval, setInterval_] = useState(0);
  const [intensity, setIntensity] = useState<ContractionIntensity>('media');
  const [history, setHistory] = useState<ContractionRecord[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastDuration = useRef(0);

  useEffect(() => {
    if (week !== null) loadHistory();
  }, [week]);

  useEffect(() => {
    if (phase === 'contracting') {
      setDuration(0);
      timerRef.current = setInterval(() => setDuration((d) => d + 1), 1000);
    } else if (phase === 'interval') {
      setInterval_(0);
      timerRef.current = setInterval(() => setInterval_((i) => i + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  async function loadHistory() {
    if (week === null) return;
    const db = await getDatabase();
    const rows = await db.getAllAsync<ContractionRecord>(
      'SELECT id, duration_seconds, interval_seconds, intensity, recorded_at FROM contraction_records WHERE week = ? ORDER BY recorded_at DESC LIMIT 10',
      [week]
    );
    setHistory(rows);
  }

  function handleStart() {
    setPhase('contracting');
  }

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
      'SELECT id FROM contraction_records WHERE week = ? ORDER BY recorded_at DESC LIMIT 1',
      [week]
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

  const isActive311 =
    history.length >= 3 &&
    history
      .slice(0, 3)
      .every((r) => r.duration_seconds >= 60 && (r.interval_seconds ?? 999) <= 300);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <DGIcon name="chevronLeft" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Temporizador</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.toolTitle}>Monitor de Contrações</Text>

          <View style={styles.intensityRow}>
            {INTENSITY_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.intensityBtn, intensity === opt.value && styles.intensityBtnActive]}
                onPress={() => setIntensity(opt.value)}
              >
                <Text style={[styles.intensityText, intensity === opt.value && styles.intensityTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.timerContainer}>
            {phase === 'contracting' ? (
              <Text style={styles.phaseLabel}>Contração em andamento...</Text>
            ) : phase === 'interval' ? (
              <Text style={styles.phaseLabel}>Intervalo...</Text>
            ) : null}
            <Text style={styles.timerText}>
              {phase === 'contracting' ? formatSeconds(duration) : formatSeconds(interval)}
            </Text>
          </View>

          {phase === 'idle' && (
            <TouchableOpacity onPress={handleStart} style={styles.primaryBtnWrapper}>
              <LinearGradient colors={[colors.primary, colors.primaryDeep]} style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Iniciar Contração</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {phase === 'contracting' && (
            <TouchableOpacity style={styles.stopBtn} onPress={handleStop}>
              <Text style={styles.stopBtnText}>Parar Contração</Text>
            </TouchableOpacity>
          )}

          {phase === 'interval' && (
            <>
              <TouchableOpacity onPress={handleNextContraction} style={styles.primaryBtnWrapper}>
                <LinearGradient colors={[colors.primary, colors.primaryDeep]} style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnText}>Nova Contração</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineBtn} onPress={() => setPhase('idle')}>
                <Text style={styles.outlineBtnText}>Encerrar Sessão</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {isActive311 && (
          <View style={styles.alert311}>
            <DGIcon name="activity" size={24} color="#ffffff" />
            <View style={{ flex: 1 }}>
              <Text style={styles.alert311Title}>Padrão 3-1-1 detectado</Text>
              <Text style={styles.alert311Text}>
                Suas contrações estão regulares. Considere entrar em contato com seu médico ou maternidade.
              </Text>
            </View>
          </View>
        )}

        {history.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>Últimas contrações</Text>
            {history.map((r) => (
              <View key={r.id} style={styles.historyRow}>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyDate}>{formatDate(r.recorded_at)}</Text>
                  <Text style={styles.historyValue}>
                    Duração: {formatSeconds(r.duration_seconds)}
                    {r.interval_seconds ? ` · Intervalo: ${formatSeconds(r.interval_seconds)}` : ''}
                  </Text>
                </View>
                <View style={[styles.intensityBadge, { backgroundColor: r.intensity === 'forte' ? colors.errorContainer : colors.lav50 }]}>
                  <Text style={[styles.intensityBadgeText, { color: r.intensity === 'forte' ? colors.error : colors.primary }]}>
                    {r.intensity}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.soft,
  },
  headerTitle: { ...typography.h3, color: colors.text },
  content: { padding: 20 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    ...shadows.soft,
  },
  toolTitle: { ...typography.h2, color: colors.text, textAlign: 'center', marginBottom: 20 },
  intensityRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  intensityBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
  },
  intensityBtnActive: { backgroundColor: colors.primary },
  intensityText: { ...typography.label, color: colors.textSecondary },
  intensityTextActive: { color: '#ffffff' },
  
  timerContainer: { alignItems: 'center', marginBottom: 32 },
  phaseLabel: { ...typography.bodySmall, color: colors.textSecondary, marginBottom: 8 },
  timerText: {
    fontSize: 64,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: colors.primary,
  },
  
  primaryBtnWrapper: { borderRadius: 16, overflow: 'hidden' },
  primaryBtn: { paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { ...typography.label, color: '#ffffff', fontSize: 16 },
  
  stopBtn: {
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.error,
    alignItems: 'center',
  },
  stopBtnText: { ...typography.label, color: '#ffffff', fontSize: 16 },
  
  outlineBtn: {
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
  },
  outlineBtnText: { ...typography.label, color: colors.textSecondary },
  
  alert311: {
    backgroundColor: colors.error,
    borderRadius: 20,
    padding: 20,
    marginTop: 24,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    ...shadows.error,
  },
  alert311Title: { ...typography.label, color: '#ffffff', fontSize: 16 },
  alert311Text: { ...typography.bodySmall, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
  
  historySection: { marginTop: 32 },
  historyTitle: { ...typography.h3, color: colors.text, marginBottom: 16 },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    ...shadows.soft,
  },
  historyInfo: { flex: 1 },
  historyDate: { ...typography.caption, color: colors.textSecondary },
  historyValue: { ...typography.label, color: colors.text, marginTop: 4 },
  intensityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  intensityBadgeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
});
