import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { DGIcon, type DGIconName } from '../../src/components/DGIcon';
import { colors, spacing, borderRadius, typography } from '../../src/theme';
import { useBottomSpacing } from '../../src/hooks/useBottomSpacing';

interface PlusCardProps {
  title: string;
  subtitle: string;
  icon: DGIconName;
  onPress: () => void;
  gradient: [string, string];
}

function PlusCard({ title, subtitle, icon, onPress, gradient }: PlusCardProps) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <View style={styles.cardContent}>
          <View style={styles.iconCircle}>
            <DGIcon name={icon} size={24} color={colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
          </View>
          <DGIcon name="chevronRight" size={20} color={colors.textSecondary} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function ExplorarScreen() {
  const router = useRouter();
  const bottom = useBottomSpacing(true);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottom }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Biblioteca Plus</Text>
          <Text style={styles.subtitle}>Conteúdos extras para você</Text>
        </View>

        <View style={styles.grid}>
          <PlusCard
            title="Álbum da Gestação"
            subtitle="Guarde seus momentos especiais"
            icon="camera"
            gradient={['#FFFFFF', '#FDF2F8']}
            onPress={() => router.push('/album')}
          />

          <PlusCard
            title="Artigos"
            subtitle="Leituras essenciais para sua fase"
            icon="book"
            gradient={['#FFFFFF', '#F0FDFA']}
            onPress={() => router.push('/article')}
          />

          <PlusCard
            title="Chat com Especialista"
            subtitle="Tire suas dúvidas agora"
            icon="message"
            gradient={['#FFFFFF', '#F5F3FF']}
            onPress={() => router.push('/chat')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[4],
  },
  header: {
    marginBottom: spacing[6],
  },
  title: {
    ...(typography.h2 as object),
    color: colors.text,
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 28,
  },
  subtitle: {
    ...(typography.body as object),
    color: colors.textSecondary,
    marginTop: 4,
  },
  grid: {
    gap: spacing[4],
  },
  cardContainer: {
    borderRadius: borderRadius.xl,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  cardGradient: {
    padding: spacing[4],
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(219, 39, 119, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    ...(typography.h3 as object),
    color: colors.text,
    fontWeight: '700',
  },
  cardSubtitle: {
    ...(typography.caption as object),
    color: colors.textSecondary,
    marginTop: 2,
  },
});
