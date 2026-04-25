import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../src/theme';

// ---------------------------------------------------------------------------
// Tab config
// ---------------------------------------------------------------------------
const TABS = [
  { name: 'dashboard',    title: 'Início',      icon: 'home-outline',      iconActive: 'home'      },
  { name: 'semana',       title: 'Semana',       icon: 'calendar-outline',  iconActive: 'calendar'  },
  { name: 'timeline',     title: 'Timeline',     icon: 'time-outline',      iconActive: 'time'      },
  { name: 'ferramentas',  title: 'Ferramentas',  icon: 'construct-outline', iconActive: 'construct' },
  { name: 'config',       title: 'Config',       icon: 'settings-outline',  iconActive: 'settings'  },
] as const;

type TabConfig = typeof TABS[number];

// ---------------------------------------------------------------------------
// Animated tab item
// ---------------------------------------------------------------------------
function TabItem({
  tab,
  isFocused,
  onPress,
  showDot,
  badge,
}: {
  tab: TabConfig;
  isFocused: boolean;
  onPress: () => void;
  showDot?: boolean;
  badge?: number | string;
}) {
  const anim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: false,
      tension: 300,
      friction: 20,
    }).start();
  }, [isFocused]);

  const bgColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(179,0,100,0)', colors.primary],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.tabItem}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={tab.title}
    >
      <Animated.View style={[styles.tabIconPill, { backgroundColor: bgColor }]}>
        <Ionicons
          name={isFocused ? tab.iconActive : tab.icon}
          size={22}
          color={isFocused ? '#ffffff' : colors.textLight}
        />
        {showDot && <View style={styles.tabDot} />}
        {badge && <View style={styles.tabBadge}><Text style={styles.tabBadgeText}>{badge}</Text></View>}
      </Animated.View>
      <Text
        style={[
          styles.tabLabel,
          { color: isFocused ? colors.primary : colors.textSecondary },
        ]}
        numberOfLines={1}
      >
        {tab.title}
      </Text>
    </TouchableOpacity>
  );
}

// ---------------------------------------------------------------------------
// Custom tab bar
// ---------------------------------------------------------------------------
function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [semanaDotSeen, setSemanaDotSeen] = useState(false);

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom > 0 ? insets.bottom : 8 }]}>
      {state.routes.map((route, index) => {
        const tab = TABS.find((t) => t.name === route.name) ?? TABS[0];
        const isFocused = state.index === index;
        const showDot = route.name === 'semana' && !semanaDotSeen && !isFocused;

        const onPress = () => {
          if (route.name === 'semana') setSemanaDotSeen(true);
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const badge = route.name === 'ferramentas' && !isFocused ? '1' : undefined;

        return (
          <TabItem key={route.key} tab={tab} isFocused={isFocused} onPress={onPress} showDot={showDot} badge={badge} />
        );
      })}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Header components
// ---------------------------------------------------------------------------
function HeaderTitle() {
  return (
    <Text style={styles.headerTitle}>DoceGestar</Text>
  );
}

function HeaderRight() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push('/(tabs)/config')}
      style={styles.headerRightBtn}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityLabel="Perfil"
      accessibilityRole="button"
    >
      <Ionicons name="person-circle-outline" size={28} color={colors.primary} />
    </TouchableOpacity>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
      },
      android: { elevation: 8 },
    }),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  tabIconPill: {
    width: 44,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'Manrope_500Medium',
    lineHeight: 14,
  },
  tabDot: {
    position: 'absolute',
    top: 4,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    borderWidth: 1.5,
    borderColor: colors.surfaceContainerLowest,
  },
  tabBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.error,
    borderWidth: 1.5,
    borderColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
  },
  headerTitle: {
    fontFamily: 'NotoSerif_700Bold',
    fontSize: 18,
    color: colors.primary,
    letterSpacing: -0.3,
  },
  headerRightBtn: {
    marginRight: 12,
  },
});

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surfaceContainerLowest,
          ...Platform.select({
            ios: {
              shadowColor: colors.text,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 8,
            },
            android: { elevation: 4 },
          }),
        },
        headerTitleAlign: 'center',
        headerTitle: () => <HeaderTitle />,
        headerRight: () => <HeaderRight />,
        headerTintColor: colors.primary,
      }}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="semana" />
      <Tabs.Screen name="timeline" />
      <Tabs.Screen name="ferramentas" />
      <Tabs.Screen name="config" />
    </Tabs>
  );
}
