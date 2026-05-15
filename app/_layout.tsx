import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
  useFonts as useFrauncesFonts,
  Fraunces_500Medium_Italic,
} from '@expo-google-fonts/fraunces';
import { colors } from '../src/theme';
import { useContextualPush } from '../src/hooks/useContextualPush';

// SplashScreen não funciona na web — guard obrigatório
if (Platform.OS !== 'web') {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  useContextualPush();

  const [pjsLoaded] = useFonts({
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const [frauncesLoaded] = useFrauncesFonts({
    Fraunces_500Medium_Italic,
  });

  const fontsLoaded = pjsLoaded && frauncesLoaded;

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
            fontFamily: 'PlusJakartaSans_600SemiBold',
          },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="birth-plan" options={{ headerShown: false }} />
        <Stack.Screen name="nursery" options={{ headerShown: false }} />
        <Stack.Screen name="appointments" options={{ headerShown: false }} />
        <Stack.Screen name="meds" options={{ headerShown: false }} />
        <Stack.Screen name="exams" options={{ headerShown: false }} />
        <Stack.Screen name="album" options={{ headerShown: false }} />
        <Stack.Screen name="article" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
        <Stack.Screen
          name="semana/[week]"
          options={{ title: 'Semana', headerBackTitle: 'Voltar' }}
        />
      </Stack>
    </>
  );
}
