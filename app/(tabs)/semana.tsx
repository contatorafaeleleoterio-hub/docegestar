import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, typography } from '../../src/theme';

export default function SemanaScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Card da Semana</Text>
      <Text style={styles.placeholder}>
        Os 10 modulos do card semanal serao implementados aqui.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, alignItems: 'center', paddingTop: 40 },
  title: { ...typography.h2, color: colors.text, marginBottom: 12 },
  placeholder: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
});
