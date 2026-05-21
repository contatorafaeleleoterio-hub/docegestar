import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Vibration, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, shadows } from '../src/theme';
import { useCurrentWeek } from '../src/hooks/useCurrentWeek';
import { getDatabase } from '../src/db';
import { DGIcon } from '../src/components/DGIcon';
import { useBottomSpacing } from '../src/hooks/useBottomSpacing';

interface KickRecord {
  id: number;
  kick_count: number;
  duration_seconds: number;
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

export default function KickCounterScreen() {
  const router = useRouter();
  const week = useCurrentWeek();
  const bottom = useBottomSpacing(false);
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [history, setHistory] = useState<KickRecord[]>([]);
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (week !== null) loadHistory();
  }, [week]);

  useEffect(() => {
    if (active) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active]);

  async function loadHistory() {
    if (week === null) return;
    const db = await getDatabase();
    const rows = await db.getAllAsync<KickRecord>(
      'SELECT id, kick_count, duration_seconds, recorded_at FROM kick_records WHERE week = ? ORDER BY recorded_at DESC LIMIT 10',
      [week]
    );
    setHistory(rows);
  }

  function handleStart() {
    setCount(0);
    setElapsed(0);
    setSaved(false);
    setActive(true);
  }

  function handleKick() {
    if (!active) return;
    if (Platform.OS !== 'web') Vibration.vibrate(50);
    setCount((c) => c + 1);
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
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <DGIcon name="chevronLeft" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contador de Chutes</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {!active && !saved && (
            <View style={styles.intro}>
              <DGIcon name="heart" size={48} color={colors.primary} />
              <Text style={styles.introTitle}>Acompanhe os movimentos</Text>
              <Text style={styles.introText}>
                Escolha um momento tranquilo do dia para contar os chutes do seu bebê.
              </Text>
              <TouchableOpacity onPress={handleStart} style={styles.primaryBtnWrapper}>
                <LinearGradient colors={[colors.primary, colors.primaryDeep]} style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnText}>Iniciar Sessão</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {active && (
            <View style={styles.activeArea}>
              <Text style={styles.timerText}>{formatSeconds(elapsed)}</Text>
              <TouchableOpacity onPress={handleKick} activeOpacity={0.7} style={styles.kickBtnWrapper}>
                <LinearGradient colors={[colors.primary, colors.primaryDeep]} style={styles.kickBtn}>
                  <Text style={styles.kickBtnText}>{count}</Text>
                  <Text style={styles.kickBtnSub}>Toque ao sentir um chute</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              {count >= 10 && (
                <View style={styles.successBadge}>
                  <Text style={styles.successText}>✨ Ótimo! 10 movimentos registrados</Text>
                </View>
              )}
              
              <TouchableOpacity style={styles.stopBtn} onPress={handleStop}>
                <Text style={styles.stopBtnText}>Encerrar e Salvar</Text>
              </TouchableOpacity>
            </View>
          )}

          {saved && (
            <View style={styles.savedArea}>
              <View style={styles.savedBadge}>
                <Text style={styles.savedText}>
                  Sessão salva: {count} chutes em {formatSeconds(elapsed)}
                </Text>
              </View>
              <TouchableOpacity onPress={handleStart} style={styles.primaryBtnWrapper}>
                <LinearGradient colors={[colors.primary, colors.primaryDeep]} style={styles.primaryBtn}>
                  <Text style={styles.primaryBtnText}>Nova Sessão</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {history.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>Histórico desta semana</Text>
            {history.map((r) => (
              <View key={r.id} style={styles.historyRow}>
                <View>
                  <Text style={styles.historyDate}>{formatDate(r.recorded_at)}</Text>
                  <Text style={styles.historyValue}>
                    {r.kick_count} chutes · {formatSeconds(r.duration_seconds)}
                  </Text>
                </View>
                <DGIcon name="chevronRight" size={16} color={colors.textLight} />
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
    alignItems: 'center',
  },
  intro: { alignItems: 'center' },
  introTitle: { ...typography.h2, color: colors.text, marginTop: 16, textAlign: 'center' },
  introText: { ...typography.body, color: colors.textSecondary, textAlign: 'center', marginTop: 8, marginBottom: 24 },
  
  activeArea: { alignItems: 'center', width: '100%' },
  timerText: {
    fontSize: 48,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: colors.primary,
    marginVertical: 16,
  },
  kickBtnWrapper: { borderRadius: 100, overflow: 'hidden', ...shadows.primary },
  kickBtn: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  kickBtnText: {
    fontSize: 64,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#ffffff',
  },
  kickBtnSub: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
  
  primaryBtnWrapper: { borderRadius: 16, overflow: 'hidden', width: '100%' },
  primaryBtn: { paddingVertical: 16, alignItems: 'center' },
  primaryBtnText: { ...typography.label, color: '#ffffff', fontSize: 16 },
  
  stopBtn: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: colors.errorContainer,
  },
  stopBtnText: { ...typography.label, color: colors.error },
  
  successBadge: {
    backgroundColor: colors.accentLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    marginTop: 20,
  },
  successText: { ...typography.label, color: colors.success, fontSize: 12 },
  
  savedArea: { width: '100%', alignItems: 'center' },
  savedBadge: {
    backgroundColor: colors.primaryLight,
    padding: 16,
    borderRadius: 16,
    width: '100%',
    marginBottom: 20,
  },
  savedText: { ...typography.body, color: colors.primary, textAlign: 'center', fontWeight: '600' },
  
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
  historyDate: { ...typography.caption, color: colors.textSecondary },
  historyValue: { ...typography.label, color: colors.text, marginTop: 4 },
});
