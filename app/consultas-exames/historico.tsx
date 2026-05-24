import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, shadows } from '../../src/theme';
import { DGIcon } from '../../src/components/DGIcon';

export default function HistoricoScreen() {
  const router = useRouter();

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
          <Text style={styles.headerTitle}>Histórico</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.iconWrap}>
          <DGIcon name="clock" size="lg" color={colors.primary} />
        </View>
        <Text style={styles.title}>Histórico em breve</Text>
        <Text style={styles.text}>
          Aqui ficarão suas consultas e exames concluídos, a evolução da gestação e suas anotações
          rápidas (peso, pressão, sintomas).
        </Text>
      </View>
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
  headerTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    letterSpacing: -0.6,
    color: colors.text,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[8],
  },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 28,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  title: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing[2],
  },
  text: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
