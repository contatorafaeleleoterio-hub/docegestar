import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { colors } from '../src/theme';
import { getProfile } from '../src/hooks/useUserProfile';
import { supabase } from '../src/utils/supabase';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      // 1. Checa sessão do Supabase (Login Social)
      const { data: { session } } = await supabase.auth.getSession();
      
      // 2. Checa perfil local (Visitante)
      const profile = await getProfile();

      if (!cancelled) {
        setHasSession(!!session);
        setHasProfile(profile !== null && !!profile.dueDate);
        setLoading(false);
      }
    }

    check();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Se estiver logado ou tiver perfil local, vai para o dashboard
  if (hasSession || hasProfile) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return <Redirect href="/welcome" />;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
