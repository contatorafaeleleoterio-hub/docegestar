import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../src/theme';

export default function FerramentasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ferramentas</Text>
      <Text style={styles.placeholder}>
        Contador de Chutes e Timer de Contracoes serao implementados aqui.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', paddingTop: 40 },
  title: { ...typography.h2, color: colors.text, marginBottom: 12 },
  placeholder: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
});
