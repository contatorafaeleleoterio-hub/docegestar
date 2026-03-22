import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { colors, typography } from '../../src/theme';

export default function WeekDetailScreen() {
  const { week } = useLocalSearchParams<{ week: string }>();
  const weekNum = parseInt(week ?? '1', 10);

  return (
    <>
      <Stack.Screen options={{ title: `Semana ${weekNum}` }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Semana {weekNum} da Gestacao</Text>
        <Text style={styles.placeholder}>
          Card completo com os 10 modulos sera renderizado aqui.
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, alignItems: 'center', paddingTop: 20 },
  title: { ...typography.h2, color: colors.text, marginBottom: 12 },
  placeholder: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
});
