import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../src/theme';

export default function ConfigScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuracoes</Text>
      <Text style={styles.placeholder}>
        Data prevista, perfil e preferencias serao configurados aqui.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', paddingTop: 40 },
  title: { ...typography.h2, color: colors.text, marginBottom: 12 },
  placeholder: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
});
