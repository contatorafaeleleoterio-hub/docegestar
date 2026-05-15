import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, typography } from '../src/theme';
import { DGIcon } from '../src/components/DGIcon';

type Photo = {
  id: string;
  uri: string;
  takenAt: string;
};

type FilterKey = 'all' | 'belly' | 'ultrasound' | 'milestone';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tudo' },
  { key: 'belly', label: 'Barriga' },
  { key: 'ultrasound', label: 'Ultrassom' },
  { key: 'milestone', label: 'Marcos' },
];

export default function AlbumScreen() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  async function pickImage() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        'Permissão necessária',
        'Para adicionar fotos ao álbum, autorize o acesso à galeria nas configurações do sistema.',
      );
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.85,
    });
    if (!res.canceled && res.assets[0]) {
      const asset = res.assets[0];
      setPhotos((prev) => [
        { id: String(Date.now()), uri: asset.uri, takenAt: new Date().toISOString() },
        ...prev,
      ]);
    }
  }

  const total = photos.length;

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <DGIcon name="chevronLeft" size="sm" color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerEyebrow}>
            {total} {total === 1 ? 'foto' : 'fotos'}
          </Text>
          <Text style={styles.headerTitle}>Meu álbum</Text>
        </View>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={pickImage}
          accessibilityRole="button"
          accessibilityLabel="Adicionar foto"
        >
          <DGIcon name="plus" size="md" color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filters}>
          {FILTERS.map((f) => {
            const active = f.key === activeFilter;
            return (
              <TouchableOpacity
                key={f.key}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setActiveFilter(f.key)}
                accessibilityRole="button"
                accessibilityLabel={`Filtro ${f.label}`}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {f.label}
                </Text>
                <Text style={[styles.chipCount, active && styles.chipCountActive]}>
                  {f.key === 'all' ? total : 0}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {photos.length === 0 ? (
          <>
            <View style={styles.emptyHero}>
              <LinearGradient
                colors={[colors.lav100, colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.emptyHeroGradient}
              >
                <Text style={styles.emptyEmoji}>📸</Text>
                <Text style={styles.emptyTitle}>Sua jornada em fotos</Text>
                <Text style={styles.emptyText}>
                  Registre cada semana, ultrassons e marcos especiais. Tudo guardado offline aqui no app.
                </Text>
                <TouchableOpacity
                  style={styles.emptyCta}
                  onPress={pickImage}
                  activeOpacity={0.9}
                  accessibilityRole="button"
                  accessibilityLabel="Adicionar primeira foto"
                >
                  <DGIcon name="camera" size="sm" color={colors.primary} />
                  <Text style={styles.emptyCtaText}>Adicionar primeira foto</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <View style={styles.milestoneStrip}>
              <LinearGradient
                colors={[colors.lav100, colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.milestoneInner}
              >
                <Text style={styles.milestoneEmoji}>🎉</Text>
                <View style={styles.milestoneText}>
                  <Text style={styles.milestoneTitle}>Marcos da gestação</Text>
                  <Text style={styles.milestoneSub}>
                    Salve um clique em cada momento especial
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </>
        ) : (
          <View style={styles.gridSection}>
            <Text style={styles.sectionEyebrow}>Recentes</Text>
            <View style={styles.grid}>
              {photos.map((p) => (
                <View key={p.id} style={styles.thumb}>
                  <Image source={{ uri: p.uri }} style={styles.thumbImg} />
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[2],
    paddingBottom: spacing[3],
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  headerText: { flex: 1 },
  headerEyebrow: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    color: colors.textSecondary,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    letterSpacing: -0.6,
    color: colors.text,
  },
  addBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 6,
  },
  scroll: { paddingBottom: spacing[10] },
  filters: {
    flexDirection: 'row',
    gap: 7,
    paddingHorizontal: spacing[5],
    marginBottom: spacing[4],
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  chipText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11.5,
    color: colors.text,
  },
  chipTextActive: { color: '#FFFFFF' },
  chipCount: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: colors.textSecondary,
    opacity: 0.6,
  },
  chipCountActive: { color: 'rgba(255,255,255,0.7)' },
  emptyHero: {
    paddingHorizontal: spacing[5],
  },
  emptyHeroGradient: {
    borderRadius: 26,
    padding: spacing[6],
    alignItems: 'center',
    gap: spacing[2],
  },
  emptyEmoji: { fontSize: 56 },
  emptyTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 20,
    letterSpacing: -0.6,
    color: colors.text,
    marginTop: spacing[2],
    textAlign: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: spacing[2],
  },
  emptyCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 48,
    paddingHorizontal: 22,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
    marginTop: spacing[3],
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 4,
  },
  emptyCtaText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 14,
    color: colors.primary,
  },
  milestoneStrip: {
    paddingHorizontal: spacing[5],
    marginTop: spacing[4],
  },
  milestoneInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  milestoneEmoji: { fontSize: 28 },
  milestoneText: { flex: 1 },
  milestoneTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 13,
    color: colors.text,
  },
  milestoneSub: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  gridSection: {
    paddingHorizontal: spacing[5],
  },
  sectionEyebrow: {
    ...typography.eyebrow,
    color: colors.primary,
    textTransform: 'uppercase',
    marginBottom: spacing[2],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  thumb: {
    width: '32%',
    aspectRatio: 1,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surfaceContainer,
  },
  thumbImg: {
    width: '100%',
    height: '100%',
  },
});
