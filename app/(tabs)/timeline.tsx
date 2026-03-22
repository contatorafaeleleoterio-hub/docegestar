import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../../src/theme';

export default function TimelineScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timeline</Text>
      <Text style={styles.placeholder}>
        Grid com as 40 semanas sera implementado aqui.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', paddingTop: 40 },
  title: { ...typography.h2, color: colors.text, marginBottom: 12 },
  placeholder: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
});
