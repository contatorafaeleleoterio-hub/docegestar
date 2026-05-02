import { useState, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Animated, Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, typography, shadows, spacing } from '../theme';

type QuickAction = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  caption: string;
  route: string;
};

const ACTIONS: QuickAction[] = [
  { icon: 'fitness-outline', label: 'Sintomas', caption: 'Como você está hoje?', route: '/(tabs)/ferramentas' },
  { icon: 'radio-button-on-outline', label: 'Chutes', caption: 'Contar movimentos', route: '/(tabs)/ferramentas' },
  { icon: 'timer-outline', label: 'Contrações', caption: 'Cronometrar', route: '/(tabs)/ferramentas' },
  { icon: 'calendar-outline', label: 'Consulta', caption: 'Agendar pré-natal', route: '/(tabs)/ferramentas' },
];

export function QuickLogFAB() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotate, {
      toValue: open ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [open, rotate]);

  const rotation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const handleAction = (route: string) => {
    setOpen(false);
    router.push(route as Parameters<typeof router.push>[0]);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setOpen(true)}
        activeOpacity={0.85}
        accessibilityLabel="Registro rápido"
        accessibilityRole="button"
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryDeep]}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Animated.View style={{ transform: [{ rotate: rotation }] }}>
            <Ionicons name="add" size={32} color="#ffffff" />
          </Animated.View>
        </LinearGradient>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Registro rápido</Text>
            <Text style={styles.sheetCaption}>O que você quer registrar agora?</Text>

            <View style={styles.actions}>
              {ACTIONS.map((a) => (
                <TouchableOpacity
                  key={a.label}
                  style={styles.actionBtn}
                  onPress={() => handleAction(a.route)}
                  activeOpacity={0.75}
                >
                  <View style={styles.actionIcon}>
                    <Ionicons name={a.icon} size={24} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.actionLabel}>{a.label}</Text>
                    <Text style={styles.actionCaption}>{a.caption}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={() => setOpen(false)} style={styles.cancelBtn} activeOpacity={0.7}>
              <Text style={styles.cancelText}>Fechar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: spacing[4],
    bottom: spacing[6],
    width: 60,
    height: 60,
    borderRadius: 30,
    ...shadows.editorial,
    elevation: 8,
  },
  fabGradient: {
    flex: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[6],
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.surfaceContainerHigh,
    alignSelf: 'center',
    marginBottom: spacing[3],
  },
  sheetTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing[1],
  },
  sheetCaption: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing[4],
  },
  actions: {
    gap: spacing[2],
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: spacing[3],
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  actionCaption: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cancelBtn: {
    marginTop: spacing[4],
    alignItems: 'center',
    paddingVertical: spacing[3],
  },
  cancelText: {
    ...typography.label,
    color: colors.textSecondary,
  },
});
