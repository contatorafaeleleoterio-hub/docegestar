import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../theme/spacing';

export const TAB_BAR_HEIGHT = 64;

/**
 * Folga inferior para conteúdo rolável não ficar atrás da tab bar flutuante
 * nem da barra de navegação do Android.
 * @param withTabBar true para telas em app/(tabs)/, false para rotas empilhadas.
 */
export function useBottomSpacing(withTabBar: boolean): number {
  const insets = useSafeAreaInsets();
  return withTabBar
    ? insets.bottom + TAB_BAR_HEIGHT + spacing[6]
    : insets.bottom + spacing[8];
}
