import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../src/theme';

export default function DiarioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diário</Text>
      <Text style={styles.sub}>Em construção — RD-3</Text>
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
