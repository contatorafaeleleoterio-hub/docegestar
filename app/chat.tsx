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

export default function ChatScreen() {
  const router = useRouter();

  function comingSoon() {
    Alert.alert(
      'Em breve! 🌸',
      'O Chat com obstetriz faz parte do plano Plus, que chegará em uma próxima atualização. Por enquanto, esta tela é apenas uma prévia.',
    );
  }

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

        <LinearGradient
          colors={[colors.lav200, colors.pink400]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>R</Text>
          <View style={styles.statusDot} />
        </LinearGradient>

        <View style={styles.headerText}>
          <Text style={styles.headerName}>Renata · obstetriz</Text>
          <Text style={styles.headerStatus}>● online · responde em 5min</Text>
        </View>

        <View style={styles.bellBtn}>
          <DGIcon name="bell" size="sm" color={colors.primary} />
        </View>
      </View>

      <ScrollView
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.timestamp}>HOJE</Text>

        <View style={styles.receivedRow}>
          <LinearGradient
            colors={[colors.lav200, colors.pink400]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bubbleAvatar}
          >
            <Text style={styles.bubbleAvatarText}>R</Text>
          </LinearGradient>
          <View style={styles.bubbleReceived}>
            <Text style={styles.bubbleReceivedText}>
              Oi! Aqui é a Renata, sua obstetriz virtual. Quando o plano Plus estiver disponível, você poderá tirar dúvidas comigo a qualquer hora — em até 5 minutos. 💕
            </Text>
          </View>
        </View>

        <View style={styles.receivedRow}>
          <LinearGradient
            colors={[colors.lav200, colors.pink400]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bubbleAvatar}
          >
            <Text style={styles.bubbleAvatarText}>R</Text>
          </LinearGradient>
          <View style={styles.cardBlock}>
            <View style={styles.cardBlockBubble}>
              <Text style={styles.bubbleReceivedText}>
                Esta é uma prévia da feature. Veja como será a experiência completa:
              </Text>
            </View>
            <View style={styles.cardBlockTip}>
              <View style={styles.cardBlockTipHeader}>
                <View style={styles.cardBlockTipIcon}>
                  <DGIcon name="sparkles" size="xs" color={colors.primary} />
                </View>
                <Text style={styles.cardBlockTipTitle}>Conteúdo personalizado</Text>
              </View>
              <Text style={styles.cardBlockTipText}>
                Respostas baseadas na sua semana gestacional, histórico e exames.
              </Text>
              <Text style={styles.cardBlockTipLink}>Ver detalhes do Plus →</Text>
            </View>
          </View>
        </View>

        <View style={styles.previewBanner}>
          <Text style={styles.previewBannerEmoji}>✨</Text>
          <Text style={styles.previewBannerText}>
            Prévia do plano Plus — chat indisponível por enquanto
          </Text>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.composerWrap}>
        <View style={styles.composer}>
          <TouchableOpacity
            style={styles.composerIcon}
            onPress={comingSoon}
            accessibilityRole="button"
            accessibilityLabel="Adicionar anexo (em breve)"
          >
            <DGIcon name="plus" size="sm" color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.composerInput}
            onPress={comingSoon}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Escrever mensagem (em breve)"
          >
            <Text style={styles.composerPlaceholder}>Disponível no Plus…</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.composerSend}
            onPress={comingSoon}
            accessibilityRole="button"
            accessibilityLabel="Enviar (em breve)"
          >
            <DGIcon name="arrowRight" size="sm" color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  statusDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  headerText: { flex: 1 },
  headerName: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
    color: colors.text,
  },
  headerStatus: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 11,
    color: colors.success,
    marginTop: 2,
  },
  bellBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messages: { flex: 1 },
  messagesContent: {
    padding: spacing[4],
    gap: spacing[3],
  },
  timestamp: {
    ...typography.caption,
    fontSize: 10.5,
    color: colors.inkSubtle,
    textAlign: 'center',
    letterSpacing: 0.5,
    marginVertical: spacing[1],
  },
  receivedRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  bubbleAvatar: {
    width: 28,
    height: 28,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleAvatarText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    color: '#FFFFFF',
  },
  bubbleReceived: {
    maxWidth: '78%',
    backgroundColor: colors.surface,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  bubbleReceivedText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    lineHeight: 18,
    color: colors.text,
  },
  cardBlock: { maxWidth: '78%', gap: 6 },
  cardBlockBubble: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardBlockTip: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardBlockTipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  cardBlockTipIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: colors.lav50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBlockTipTitle: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 12,
    color: colors.text,
  },
  cardBlockTipText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textSecondary,
  },
  cardBlockTipLink: {
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 11,
    color: colors.primary,
    marginTop: 6,
  },
  previewBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: colors.lav50,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.lav100,
    marginTop: spacing[3],
  },
  previewBannerEmoji: { fontSize: 18 },
  previewBannerText: {
    flex: 1,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    fontSize: 12,
    color: colors.textSecondary,
  },
  composerWrap: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: spacing[4],
    paddingVertical: 12,
  },
  composerIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  composerInput: {
    flex: 1,
    height: 42,
    borderRadius: 999,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  composerPlaceholder: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 13,
    color: colors.inkSubtle,
  },
  composerSend: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 6,
  },
});
