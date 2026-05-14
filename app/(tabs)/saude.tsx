import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../src/theme';

export default function SaudeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saúde</Text>
      <Text style={styles.sub}>Em construção — RD-2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { ...typography.h1, color: colors.text },
  sub: { ...typography.body, color: colors.textSecondary, marginTop: 8 },
});
