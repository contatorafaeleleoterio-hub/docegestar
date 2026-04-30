import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  NotoSerif_400Regular,
  NotoSerif_600SemiBold,
  NotoSerif_700Bold,
} from '@expo-google-fonts/noto-serif';
import {
  useFonts as useManropeFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
} from '@expo-google-fonts/manrope';
import { colors } from '../src/theme';
import { useContextualPush } from '../src/hooks/useContextualPush';

// SplashScreen não funciona na web — guard obrigatório
if (Platform.OS !== 'web') {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  useContextualPush();

  const [notoLoaded] = useFonts({
    NotoSerif_400Regular,
    NotoSerif_600SemiBold,
    NotoSerif_700Bold,
  });

  const [manropeLoaded] = useManropeFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
  });

  const fontsLoaded = notoLoaded && manropeLoaded;

  useEffect(() => {
    if (fontsLoaded && Platform.OS !== 'web') {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Na web: renderiza imediatamente (fontes carregam de forma assíncrona sem bloquear)
  if (!fontsLoaded && Platform.OS !== 'web') return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
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
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: '600',
            fontFamily: 'NotoSerif_600SemiBold',
          },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="onboarding"
          options={{ headerShown: false, presentation: 'modal' }}
        />
        <Stack.Screen
          name="semana/[week]"
          options={{ title: 'Semana', headerBackTitle: 'Voltar' }}
        />
      </Stack>
    </>
  );
}
