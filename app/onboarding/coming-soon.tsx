import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '../../src/theme';
import { PrimaryButton } from '../../src/components/ui';

export default function ComingSoonScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.emoji}>🌸</Text>
          <Text style={styles.title}>Cadastro de conta{'\n'}chegando em breve!</Text>
          <Text style={styles.body}>
            Por enquanto, explore o DoceGestar gratuitamente — sem necessidade de conta.
          </Text>
        </View>
        <PrimaryButton
          label="Voltar"
          variant="outline"
          onPress={() => router.back()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing[6],
    justifyContent: 'center',
    gap: spacing[6],
  },
  card: {
    backgroundColor: colors.primaryLight,
    borderRadius: 24,
    padding: spacing[6],
    alignItems: 'center',
    gap: spacing[3],
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    ...typography.h2,
    color: colors.text,
    textAlign: 'center',
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
