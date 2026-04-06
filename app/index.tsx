import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { colors } from '../src/theme';
import { getProfile } from '../src/hooks/useUserProfile';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function check() {
      const profile = await getProfile();
      if (!cancelled) {
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

  if (hasProfile) {
    return <Redirect href="/(tabs)/dashboard" />;
  }

  return <Redirect href="/onboarding" />;
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
