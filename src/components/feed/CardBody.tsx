import React from 'react';
import { View, StyleSheet } from 'react-native';
import type { RevistaCard } from '../../types';
import {
  HeroMiolo,
  StatMiolo,
  ListaMiolo,
  PerguntaMiolo,
  FaqMiolo,
} from '../RevistaCard';
import { FeedChecklistMiolo } from '../FeedChecklistCard';
import { colors, spacing } from '../../theme';

interface CardBodyProps {
  card: RevistaCard;
}

/**
 * Despacha os 6 layouts para o miolo correspondente.
 * flex:1 para preencher o espaco do CardShell entre cabecalho e barra de acoes.
 * overflow:hidden para truncar conteudo longo sem transbordar o card.
 */
export const CardBody = React.memo(function CardBody({ card }: CardBodyProps) {
  return (
    <View style={styles.body}>
      {card.layout === 'hero' && <HeroMiolo card={card} />}
      {card.layout === 'stat' && <StatMiolo card={card} />}
      {card.layout === 'lista' && <ListaMiolo card={card} />}
      {card.layout === 'checklist' && <FeedChecklistMiolo card={card} />}
      {card.layout === 'pergunta' && <PerguntaMiolo card={card} />}
      {card.layout === 'faq' && <FaqMiolo card={card} />}
    </View>
  );
});

const styles = StyleSheet.create({
  body: {
    flex: 1,
    overflow: 'hidden',
    padding: spacing[4],
    backgroundColor: colors.surface,
  },
});
