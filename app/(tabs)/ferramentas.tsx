import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, shadows } from '../../src/theme';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
import { useBottomSpacing } from '../../src/hooks/useBottomSpacing';

interface ToolItem {
  id: string;
  title: string;
  description: string;
  icon: DGIconName;
  route: string;
  category: 'Monitoramento' | 'Saúde' | 'Memórias' | 'Suporte';
  color: string;
}

const TOOLS: ToolItem[] = [
  // Monitoramento
  {
    id: 'kick-counter',
    title: 'Contador de Chutes',
    description: 'Registre os movimentos do seu bebê',
    icon: 'heart',
    route: '/kick-counter',
    category: 'Monitoramento',
    color: '#E8A0BF',
  },
  {
    id: 'contraction-timer',
    title: 'Contrações',
    description: 'Monitore o intervalo das contrações',
    icon: 'activity',
    route: '/contraction-timer',
    category: 'Monitoramento',
    color: '#C8A2D0',
  },
  {
    id: 'symptoms',
    title: 'Sintomas',
    description: 'Rastreie como você se sente',
    icon: 'thermometer',
    route: '/symptoms',
    category: 'Monitoramento',
    color: '#A8D8B9',
  },
  // Saúde
  {
    id: 'appointments',
    title: 'Consultas',
    description: 'Sua agenda pré-natal',
    icon: 'stethoscope',
    route: '/appointments',
    category: 'Saúde',
    color: '#89C4E1',
  },
  {
    id: 'exams',
    title: 'Exames & Laudos',
    description: 'Seus resultados organizados',
    icon: 'fileText',
    route: '/exams',
    category: 'Saúde',
    color: '#F5D76E',
  },
  {
    id: 'meds',
    title: 'Vitaminas & Remédios',
    description: 'Lembretes de doses diárias',
    icon: 'pill',
    route: '/meds',
    category: 'Saúde',
    color: '#E88B8B',
  },
  // Memórias
  {
    id: 'album',
    title: 'Álbum de Fotos',
    description: 'Galeria da sua gestação',
    icon: 'camera',
    route: '/album',
    category: 'Memórias',
    color: '#E8A0BF',
  },
  {
    id: 'diario',
    title: 'Meu Diário',
    description: 'Notas e humor diários',
    icon: 'edit',
    route: '/diario',
    category: 'Memórias',
    color: '#C8A2D0',
  },
  {
    id: 'nursery',
    title: 'Enxoval',
    description: 'Checklist para o bebê',
    icon: 'baby',
    route: '/nursery',
    category: 'Memórias',
    color: '#A8D8B9',
  },
  // Suporte & Extras
  {
    id: 'birth-plan',
    title: 'Plano de Parto',
    description: 'Suas preferências para o parto',
    icon: 'flower',
    route: '/birth-plan',
    category: 'Saúde',
    color: '#FFD6E0',
  },
  {
    id: 'article',
    title: 'Biblioteca',
    description: 'Artigos e guias educativos',
    icon: 'book',
    route: '/article',
    category: 'Suporte',
    color: '#B5EAD7',
  },
  {
    id: 'chat',
    title: 'Chat Obstetriz',
    description: 'Suporte especializado Plus',
    icon: 'message',
    route: '/chat',
    category: 'Suporte',
    color: '#D4C5F9',
  },
];

export default function FerramentasScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const bottom = useBottomSpacing(true);

  const categories = ['Monitoramento', 'Saúde', 'Memórias', 'Suporte'] as const;

  const renderTool = ({ item }: { item: ToolItem }) => (
    <TouchableOpacity
      style={styles.toolCard}
      onPress={() => router.push(item.route as any)}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <DGIcon name={item.icon} size={24} color={item.color} />
      </View>
      <View style={styles.toolInfo}>
        <Text style={styles.toolTitle}>{item.title}</Text>
        <Text style={styles.toolDesc} numberOfLines={1}>{item.description}</Text>
      </View>
      <DGIcon name="chevronRight" size={18} color={colors.textLight} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.lav100, colors.background]}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <Text style={styles.screenTitle}>Ferramentas</Text>
        <Text style={styles.screenSub}>Tudo o que você precisa em um só lugar</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((cat) => {
          const items = TOOLS.filter((t) => t.category === cat);
          if (items.length === 0) return null;

          return (
            <View key={cat} style={styles.section}>
              <Text style={styles.sectionTitle}>{cat}</Text>
              <View style={styles.sectionList}>
                {items.map((item) => (
                  <React.Fragment key={item.id}>
                    {renderTool({ item })}
                  </React.Fragment>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  screenTitle: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 28,
    color: colors.text,
  },
  screenSub: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 4,
  },
  scroll: { flex: 1 },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionList: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 8,
    ...shadows.soft,
  },
  toolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolInfo: { flex: 1 },
  toolTitle: {
    ...typography.label,
    color: colors.text,
    fontSize: 15,
  },
  toolDesc: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
