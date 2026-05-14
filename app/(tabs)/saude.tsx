import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DGIcon } from '../../src/components/DGIcon';
import { colors, typography } from '../../src/theme';

export default function SaudeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Sua saúde</Text>
          <Text style={styles.title}>Em construção</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <DGIcon name="stethoscope" size={28} color={colors.primary} />
          </View>
          <Text style={styles.cardTitle}>Registro de sintomas e consultas</Text>
          <Text style={styles.cardBody}>
            O acompanhamento clínico — sintomas, consultas pré-natais, chutes e contrações —
            está em <Text style={styles.bold}>Ferramentas</Text>, com persistência real e histórico.
          </Text>
          <TouchableOpacity
            style={styles.cta}
            activeOpacity={0.85}
            onPress={() => router.push('/(tabs)/ferramentas')}
          >
            <Text style={styles.ctaText}>Ir para Ferramentas →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 22, paddingBottom: 120 },
  header: { marginBottom: 18 },
  eyebrow: {
    fontSize: 11,
    color: colors.textSecondary,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    letterSpacing: -0.6,
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: 6,
  },
  cardBody: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  bold: {
    color: colors.text,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  cta: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: colors.primary,
  },
  ctaText: {
    color: colors.onPrimary,
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});
