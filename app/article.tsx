import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '../src/theme';
import { DGIcon } from '../src/components/DGIcon';

const SIGNS = [
  'Movimentos regulares do bebê',
  'Ganho de peso saudável',
  'Pressão estável',
  'Sono e energia em equilíbrio',
  'Conexão emocional com a gestação',
];

export default function ArticleScreen() {
  const router = useRouter();

  function comingSoon() {
    Alert.alert(
      'Em breve! 🌸',
      'A biblioteca de artigos Plus chega em uma próxima atualização. Por ora, este é um preview do que vem por aí.',
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.hero}>
        <LinearGradient
          colors={[colors.lav200, colors.pink400]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'transparent', 'transparent', 'rgba(0,0,0,0.6)']}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView edges={['top']} style={styles.heroSafe}>
          <View style={styles.heroNav}>
            <TouchableOpacity
              style={styles.glassBtn}
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <DGIcon name="chevronLeft" size="sm" color={colors.text} />
            </TouchableOpacity>
            <View style={styles.heroNavRight}>
              <TouchableOpacity
                style={styles.glassBtn}
                onPress={comingSoon}
                accessibilityRole="button"
                accessibilityLabel="Favoritar"
              >
                <DGIcon name="heart" size="sm" color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.glassBtn}
                onPress={comingSoon}
                accessibilityRole="button"
                accessibilityLabel="Compartilhar"
              >
                <DGIcon name="share" size="sm" color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.heroTitleArea}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>✨ PLUS · 2º TRIMESTRE</Text>
            </View>
            <Text style={styles.heroTitle}>
              Os 5 sinais de que tudo está indo bem (mesmo quando você duvida)
            </Text>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.metaRow}>
          <LinearGradient
            colors={[colors.lav200, colors.pink400]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.metaAvatar}
          >
            <Text style={styles.metaAvatarText}>R</Text>
          </LinearGradient>
          <View style={styles.metaText}>
            <Text style={styles.metaName}>Renata Castro · obstetriz</Text>
            <Text style={styles.metaSub}>5 min de leitura · revisado em mai</Text>
          </View>
          <TouchableOpacity
            style={styles.listenChip}
            onPress={comingSoon}
            accessibilityRole="button"
            accessibilityLabel="Ouvir artigo"
          >
            <Text style={styles.listenText}>🎧 Ouvir</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.paragraph}>
          É comum, no segundo trimestre, oscilar entre a alegria de sentir o bebê mexer e a preocupação silenciosa de que algo possa estar errado. Esses sentimentos convivem.
        </Text>

        <View style={styles.pullQuote}>
          <Text style={styles.pullQuoteText}>
            "Confie no seu corpo — ele já sabe o que fazer."
          </Text>
        </View>

        <Text style={styles.paragraph}>
          Os sinais abaixo, juntos, mostram que sua gestação está dentro do esperado. Eles não substituem o acompanhamento médico, mas servem como referência para você acolher essa fase com mais tranquilidade.
        </Text>

        <View style={styles.checklistCard}>
          <Text style={styles.checklistTitle}>Os 5 sinais</Text>
          {SIGNS.map((sign, i) => (
            <View key={i} style={styles.checklistRow}>
              <View style={styles.checklistNum}>
                <Text style={styles.checklistNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.checklistText}>{sign}</Text>
            </View>
          ))}
        </View>

        <View style={styles.previewNote}>
          <DGIcon name="sparkles" size="sm" color={colors.primary} />
          <Text style={styles.previewNoteText}>
            Esse é um preview da biblioteca <Text style={styles.previewNoteBold}>Plus</Text>. Em breve você terá acesso a vídeos, podcasts e e-books exclusivos.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  hero: { height: 280, position: 'relative' },
  heroSafe: {
    flex: 1,
    paddingHorizontal: spacing[5],
    justifyContent: 'space-between',
    paddingBottom: spacing[3],
  },
  heroNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing[2],
  },
  heroNavRight: { flexDirection: 'row', gap: 8 },
  glassBtn: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitleArea: { gap: spacing[2] },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  heroBadgeText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 10,
    color: '#FFFFFF',
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.6,
    color: '#FFFFFF',
  },
  body: { flex: 1 },
  bodyContent: {
    paddingHorizontal: spacing[5],
    paddingTop: spacing[4],
    paddingBottom: spacing[10],
    gap: spacing[4],
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaAvatarText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  metaText: { flex: 1 },
  metaName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11.5,
    color: colors.text,
  },
  metaSub: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 10,
    color: colors.textSecondary,
  },
  listenChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.lav50,
  },
  listenText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 10.5,
    color: colors.primary,
  },
  paragraph: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13.5,
    lineHeight: 22,
    color: colors.text,
  },
  pullQuote: {
    paddingLeft: 14,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  pullQuoteText: {
    fontFamily: 'Fraunces_500Medium_Italic',
    fontSize: 18,
    lineHeight: 26,
    color: colors.text,
  },
  checklistCard: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
    gap: spacing[1],
  },
  checklistTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing[1],
  },
  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  checklistNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checklistNumText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 11,
    color: '#FFFFFF',
  },
  checklistText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    color: colors.text,
    flex: 1,
  },
  previewNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: colors.lav50,
    borderWidth: 1,
    borderColor: colors.lav100,
  },
  previewNoteText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    lineHeight: 17,
    color: colors.textSecondary,
  },
  previewNoteBold: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: colors.primary,
  },
});
