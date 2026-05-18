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
// PerguntaCard — sub-componente com estado "ja refleti" persistido
// ─────────────────────────────────────────────────────────────────
function PerguntaCard({ card, style }: { card: RevistaCardType; style?: object }) {
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
    <View style={style}>
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
        accessibilityLabel={reflected ? 'Reflexao ja feita' : 'Marcar como ja refleti'}
      >
        <Text style={[styles.reflectBtnText, reflected && styles.reflectBtnTextDone]}>
          {reflected ? 'Reflexao feita' : 'Ja refleti'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────
// HeroCard — abertura narrativa do feed com frase motivacional
// ─────────────────────────────────────────────────────────────────
function HeroCard({ card, style }: { card: RevistaCardType; style?: object }) {
  return (
    <View style={[heroStyles.container, style]}>
      <Text style={heroStyles.weekLabel}>Semana {card.weekNumber}</Text>
      <Text style={heroStyles.phrase}>{card.content}</Text>
    </View>
  );
}

const heroStyles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    padding: spacing[6],
    marginBottom: spacing[3],
    ...shadows.soft,
  },
  weekLabel: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: spacing[2],
  },
  phrase: {
    ...typography.h3,
    color: '#ffffff',
    fontWeight: '600',
    lineHeight: 28,
  },
});

// ─────────────────────────────────────────────────────────────────
// Miolos — corpo puro sem invólucro (usados pelo CardBody no feed snap)
// ─────────────────────────────────────────────────────────────────

export function HeroMiolo({ card }: { card: RevistaCardType }) {
  return (
    <View style={miolo.heroInner}>
      <Text style={heroStyles.weekLabel}>Semana {card.weekNumber}</Text>
      <Text style={[heroStyles.phrase, { numberOfLines: 5 } as object]} numberOfLines={5}>
        {card.content}
      </Text>
    </View>
  );
}

export function StatMiolo({ card }: { card: RevistaCardType }) {
  return (
    <View style={miolo.statContent}>
      {card.emoji && <Text style={miolo.emoji}>{card.emoji}</Text>}
      <Text style={styles.statTitle}>{card.title}</Text>
      {card.statValue && (
        <Text style={styles.statValue}>{card.statValue}</Text>
      )}
      {card.statLabel && (
        <Text style={styles.statLabel}>{card.statLabel}</Text>
      )}
    </View>
  );
}

export function ListaMiolo({ card }: { card: RevistaCardType }) {
  return (
    <View>
      {card.emoji && <Text style={miolo.emoji}>{card.emoji}</Text>}
      <Text style={styles.cardTitle}>{card.title}</Text>
      {card.items && card.items.length > 0 && (
        <View style={styles.listContent}>
          {card.items.map((item, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.listItemLabel} numberOfLines={3}>
                {'•'} {item}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export function PerguntaMiolo({ card }: { card: RevistaCardType }) {
  return <PerguntaCard card={card} />;
}

export function FaqMiolo({ card }: { card: RevistaCardType }) {
  const isMito = card.title.toLowerCase().includes('mito');
  const bgColor = isMito ? colors.errorContainer : colors.successContainer;

  return (
    <View style={{ backgroundColor: bgColor, flex: 1, padding: spacing[4], borderRadius: borderRadius.md }}>
      {card.emoji && <Text style={miolo.emoji}>{card.emoji}</Text>}
      <Text style={styles.cardTitle}>{card.title}</Text>
      {card.content && (
        <Text style={styles.faqContent} numberOfLines={8}>{card.content}</Text>
      )}
    </View>
  );
}

// Miolo de checklist estatico (sem estado — o FeedChecklistMiolo tem estado)
export function ChecklistMiolo({ card }: { card: RevistaCardType }) {
  return (
    <View>
      {card.emoji && <Text style={miolo.emoji}>{card.emoji}</Text>}
      <Text style={styles.cardTitle}>{card.title}</Text>
      {card.items && card.items.length > 0 && (
        <View style={styles.checklistContent}>
          {card.items.map((item, idx) => (
            <TouchableOpacity key={idx} style={styles.checklistItem}>
              <View style={styles.checkbox} />
              <Text style={styles.checklistLabel} numberOfLines={2}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────
// RevistaCard — componente legado com invólucro (mantido para compatibilidade)
// ─────────────────────────────────────────────────────────────────

interface RevistaCardProps {
  card: RevistaCardType;
  onPress?: () => void;
  style?: object;
}

export const RevistaCard: React.FC<RevistaCardProps> = ({ card, onPress, style }) => {
  const containerStyle = [styles.container, style];

  if (card.layout === 'hero') {
    return <HeroCard card={card} style={style} />;
  }

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
                <Text style={styles.listItemLabel}>{'•'} {item}</Text>
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
    return <PerguntaCard card={card} style={containerStyle as object} />;
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

// ─────────────────────────────────────────────────────────────────
// Estilos de miolos (sem container)
// ─────────────────────────────────────────────────────────────────
const miolo = StyleSheet.create({
  heroInner: {
    flex: 1,
    padding: spacing[4],
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  statContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: spacing[4],
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing[2],
    textAlign: 'center',
  },
});

// ─────────────────────────────────────────────────────────────────
// Estilos legados (mantidos para o RevistaCard com invólucro)
// ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    ...shadows.soft,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    padding: spacing[4],
    marginBottom: spacing[3],
  },

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

  faqContent: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing[2],
    lineHeight: 22,
  },

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
