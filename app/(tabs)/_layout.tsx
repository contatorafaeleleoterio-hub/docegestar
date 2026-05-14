import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DGIcon, DGIconName } from '../../src/components/DGIcon';
import { colors } from '../../src/theme';

const INK = '#1F1A2E';

const TABS: { name: string; title: string; icon: DGIconName }[] = [
  { name: 'dashboard',   title: 'Início',      icon: 'home'    },
  { name: 'explorar',    title: 'Explorar',    icon: 'compass' },
  { name: 'ferramentas', title: 'Ferramentas', icon: 'tool'    },
  { name: 'perfil',      title: 'Perfil',      icon: 'user'    },
];

type TabConfig = typeof TABS[number];

function TabItem({
  tab,
  isFocused,
  onPress,
}: {
  tab: TabConfig;
  isFocused: boolean;
  onPress: () => void;
}) {
  const anim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: false,
      tension: 300,
      friction: 22,
    }).start();
  }, [isFocused]);

  const bgColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(236,55,121,0)', colors.primary],
  });

  const paddingH = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 16],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityState={{ selected: isFocused }}
      accessibilityLabel={tab.title}
      style={styles.tabItemWrap}
    >
      <Animated.View
        style={[
          styles.tabPill,
          { backgroundColor: bgColor, paddingHorizontal: paddingH },
        ]}
      >
        <DGIcon
          name={tab.icon}
          size={18}
          color={isFocused ? '#FFFFFF' : 'rgba(255,255,255,0.55)'}
        />
        {isFocused && <Text style={styles.tabLabel}>{tab.title}</Text>}
      </Animated.View>
    </TouchableOpacity>
  );
}

function FloatingTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottomOffset = (insets.bottom > 0 ? insets.bottom : 12) + 10;

  return (
    <View pointerEvents="box-none" style={styles.tabBarOuter}>
      <View style={[styles.tabBar, { bottom: bottomOffset }]}>
        {state.routes.map((route, index) => {
          const tab = TABS.find((t) => t.name === route.name);
          if (!tab) return null;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TabItem
              key={route.key}
              tab={tab}
              isFocused={isFocused}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarOuter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    backgroundColor: INK,
    borderRadius: 32,
    padding: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 28,
    elevation: 12,
  },
  tabItemWrap: {
    flexGrow: 0,
  },
  tabPill: {
    height: 40,
    minWidth: 40,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  tabLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
});

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="explorar" />
      <Tabs.Screen name="ferramentas" />
      <Tabs.Screen name="perfil" />
      <Tabs.Screen name="bebe" options={{ href: null }} />
      <Tabs.Screen name="saude" options={{ href: null }} />
      <Tabs.Screen name="diario" options={{ href: null }} />
    </Tabs>
  );
}
