import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '../../src/theme';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';

export default function ComingSoonScreen() {
  const router = useRouter();

  function notReady() {
    Alert.alert(
      'Em breve! 🌸',
      'Login com conta chegará em uma próxima atualização. Por enquanto, explore gratuitamente sem cadastro.',
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <DGIcon name="chevronLeft" size="sm" color={colors.text} />
        </TouchableOpacity>

        <Text style={styles.title}>Olá de novo 👋</Text>
        <Text style={styles.subtitle}>
          Entre para continuar acompanhando sua jornada.
        </Text>

        <View style={styles.fields}>
          <Field label="Email" placeholder="seu@email.com" icon="mail" />
          <Field
            label="Senha"
            placeholder="••••••••••"
            icon="lock"
            trailingIcon="eye"
          />
          <Text style={styles.forgot}>Esqueci minha senha</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={notReady}
          activeOpacity={0.9}
          accessibilityRole="button"
          accessibilityLabel="Entrar (em breve)"
        >
          <Text style={styles.primaryBtnText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>ou</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.social}>
          <SocialButton label="Continuar com Google" onPress={notReady} />
          <SocialButton label="Continuar com Apple" onPress={notReady} />
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Primeira vez? </Text>
          <Text
            style={styles.bottomLink}
            onPress={() => router.replace('/onboarding')}
          >
            Criar conta grátis
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Field({
  label,
  placeholder,
  icon,
  trailingIcon,
}: {
  label: string;
  placeholder: string;
  icon: DGIconName;
  trailingIcon?: DGIconName;
}) {
  return (
    <View>
      <Text style={fieldStyles.label}>{label}</Text>
      <View style={fieldStyles.box}>
        <DGIcon name={icon} size="sm" color={colors.textSecondary} />
        <Text style={fieldStyles.value}>{placeholder}</Text>
        {trailingIcon ? (
          <DGIcon name={trailingIcon} size="sm" color={colors.inkSubtle} />
        ) : null}
      </View>
    </View>
  );
}

function SocialButton({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={socialStyles.btn}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={socialStyles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[3],
    paddingBottom: spacing[10],
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginTop: spacing[8],
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing[1],
  },
  fields: {
    gap: spacing[3],
    marginTop: spacing[6],
  },
  forgot: {
    ...typography.bodySmall,
    color: colors.primary,
    fontFamily: 'PlusJakartaSans_700Bold',
    textAlign: 'right',
    marginTop: -spacing[1],
  },
  primaryBtn: {
    height: 56,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing[5],
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 8,
  },
  primaryBtnText: {
    ...typography.label,
    fontSize: 15,
    color: colors.onPrimary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: spacing[5],
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.inkSubtle,
    letterSpacing: 0.3,
  },
  social: { gap: spacing[2] },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing[8],
  },
  bottomText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  bottomLink: {
    ...typography.bodySmall,
    color: colors.primary,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});

const fieldStyles = StyleSheet.create({
  label: {
    ...typography.caption,
    color: colors.text,
    marginBottom: 6,
  },
  box: {
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 10,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  value: {
    flex: 1,
    ...typography.body,
    color: colors.text,
  },
});

const socialStyles = StyleSheet.create({
  btn: {
    height: 54,
    borderRadius: 999,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  text: {
    ...typography.body,
    color: colors.text,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
});
