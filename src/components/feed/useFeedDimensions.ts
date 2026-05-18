import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_HEIGHT } from '../../hooks/useBottomSpacing';
import { spacing } from '../../theme/spacing';

const HEADER_H = 68;

export interface FeedDimensions {
  availH: number;
  cardH: number;
  peekH: number;
  itemH: number;
  gap: number;
}

/**
 * Calcula as dimensoes do feed snap com base na viewport util.
 * Formula conforme §03 do conceito-1-feed-revista-snap.md.
 * Recalcula automaticamente em rotacao via useWindowDimensions.
 */
export function useFeedDimensions(): FeedDimensions {
  const { height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const gap = spacing[4]; // 16
  const tabBarH = insets.bottom + TAB_BAR_HEIGHT;
  const availH = screenH - insets.top - HEADER_H - tabBarH;
  const cardH = Math.round(availH * 0.87);
  const peekH = availH - cardH;
  const itemH = cardH + gap;

  return { availH, cardH, peekH, itemH, gap };
}
