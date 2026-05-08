import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import type { RevistaCard as RevistaCardType } from '../types';

// ─────────────────────────────────────────────────────────────────
// PerguntaCard — sub-componente com estado "já refleti" persistido
// ─────────────────────────────────────────────────────────────────
function PerguntaCard({ card, style }: { card: RevistaCardType; style?: any }) {
  const storageKey = `feed_reflexao_s${card.weekNumber ?? 0}`;
  const [reflected, setReflected] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(storageKey).then((val) => {
      if (val === 'true') setReflected(true);
    });
  }, [storageKey]);

  const handleToggle = async () => {
    const next = !reflected;
    setReflected(next);
    await AsyncStorage.setItem(storageKey, next ? 'true' : 'false');
  };

  return (
    <View style={[styles.container, style]}>
      {card.emoji ? <Text style={styles.emoji}>{card.emoji}</Text> : null}
      <Text style={styles.cardTitle}>{card.title}</Text>
      {(card.question ?? card.content) ? (
        <Text style={styles.perguntaContent}>{card.question ?? card.content}</Text>
      ) : null}
      <TouchableOpacity
        style={[styles.reflectBtn, reflected && styles.reflectBtnDone]}
        onPress={handleToggle}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel={reflected ? 'Reflexão já feita' : 'Marcar como já refleti'}
      >
        <Text style={[styles.reflectBtnText, reflected && styles.reflectBtnTextDone]}>
          {reflected ? '✅ Reflexão feita' : '💭 Já refleti'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

interface RevistaCardProps {
  card: RevistaCardType;
  onPress?: () => void;
  style?: any;
}

export const RevistaCard: React.FC<RevistaCardProps> = ({ card, onPress, style }) => {
  const containerStyle = [styles.container, style];

  if (card.layout === 'stat') {
    return (
      <View style={containerStyle}>
        <View style={styles.statContent}>
          {card.emoji && <Text style={styles.emoji}>{card.emoji}</Text>}
          <Text style={styles.statTitle}>{card.title}</Text>
          {card.statValue && (
            <Text style={styles.statValue}>{card.statValue}</Text>
          )}
          {card.statLabel && (
            <Text style={styles.statLabel}>{card.statLabel}</Text>
          )}
        </View>
      </View>
    );
  }

  if (card.layout === 'lista') {
    return (
      <View style={containerStyle}>
        {card.emoji && <Text style={styles.emoji}>{card.emoji}</Text>}
        <Text style={styles.cardTitle}>{card.title}</Text>
        {card.items && card.items.length > 0 && (
          <View style={styles.listContent}>
            {card.items.map((item, idx) => (
              <View key={idx} style={styles.listItem}>
                <Text style={styles.listItemLabel}>• {item}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }

  if (card.layout === 'checklist') {
    return (
      <View style={containerStyle}>
        {card.emoji && <Text style={styles.emoji}>{card.emoji}</Text>}
        <Text style={styles.cardTitle}>{card.title}</Text>
        {card.items && card.items.length > 0 && (
          <View style={styles.checklistContent}>
            {card.items.map((item, idx) => (
              <TouchableOpacity key={idx} style={styles.checklistItem}>
                <View style={styles.checkbox} />
                <Text style={styles.checklistLabel}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }

  if (card.layout === 'pergunta') {
    return <PerguntaCard card={card} style={style} />;
  }

  if (card.layout === 'faq') {
    const isMito = card.title.toLowerCase().includes('mito');
    const bgColor = isMito ? colors.errorContainer : colors.successContainer;

    return (
      <View style={[containerStyle, { backgroundColor: bgColor }]}>
        {card.emoji && <Text style={styles.emoji}>{card.emoji}</Text>}
        <Text style={styles.cardTitle}>{card.title}</Text>
        {card.content && (
          <Text style={styles.faqContent}>{card.content}</Text>
        )}
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    ...shadows.editorial,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    padding: spacing[4],
    marginBottom: spacing[3],
  },

  // ─────────────────────────────────────────
  // STAT
  // ─────────────────────────────────────────
  statContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing[4],
  },
  statTitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  statValue: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing[1],
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // ─────────────────────────────────────────
  // LISTA
  // ─────────────────────────────────────────
  listContent: {
    marginTop: spacing[3],
  },
  listItem: {
    paddingVertical: spacing[2],
  },
  listItemLabel: {
    ...typography.body,
    color: colors.text,
    lineHeight: 24,
  },

  // ─────────────────────────────────────────
  // CHECKLIST
  // ─────────────────────────────────────────
  checklistContent: {
    marginTop: spacing[3],
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: spacing[3],
  },
  checklistLabel: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },

  // ─────────────────────────────────────────
  // PERGUNTA
  // ─────────────────────────────────────────
  perguntaContent: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing[2],
    lineHeight: 22,
    marginBottom: spacing[3],
  },
  reflectBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },
  reflectBtnDone: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  reflectBtnText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  reflectBtnTextDone: {
    color: '#ffffff',
  },

  // ─────────────────────────────────────────
  // FAQ
  // ─────────────────────────────────────────
  faqContent: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing[2],
    lineHeight: 22,
  },

  // ─────────────────────────────────────────
  // SHARED
  // ─────────────────────────────────────────
  emoji: {
    fontSize: 48,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
  cardTitle: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '600',
  },
});
