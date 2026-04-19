import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { colors, typography } from '../src/theme';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { supabase } from '../src/utils/supabase';

WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // Configuração do Google Auth
  // IMPORTANTE: Substitua pelos seus Client IDs do Google Cloud Console
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: '562125016823-i56f1t1mom25m02k3gbfftkg8go4bbhj.apps.googleusercontent.com',
    androidClientId: '562125016823-6nbngno7komh4q9sjqqt6m37pimdp4h9.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleSignInWithGoogle(id_token);
    }
  }, [response]);

  async function handleSignInWithGoogle(idToken: string) {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) throw error;

      if (data.session) {
        // Login bem-sucedido! Redireciona para o dashboard
        router.replace('/(tabs)/dashboard');
      }
    } catch (error: any) {
      Alert.alert('Erro no Login', error.message || 'Não foi possível entrar com o Google.');
    } finally {
      setLoading(false);
    }
  }

  const handleGuestEntry = () => {
    router.push('/onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="heart" size={64} color={colors.primary} />
          </View>
          <Text style={styles.title}>DoceGestar</Text>
          <Text style={styles.subtitle}>
            Acompanhe sua jornada mágica com doçura e cuidado.
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.googleButton, (loading || !request) && styles.disabledButton]} 
            onPress={() => promptAsync()}
            disabled={loading || !request}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <>
                <Ionicons name="logo-google" size={20} color="#4285F4" style={styles.buttonIcon} />
                <Text style={styles.googleButtonText}>Entrar com Google</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleGuestEntry}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Começar como Visitante</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Ao continuar, você concorda com nossos termos e privacidade.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: 12,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  actions: {
    width: '100%',
    gap: 16,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  googleButtonText: {
    ...typography.h3,
    color: colors.text,
    marginLeft: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    ...typography.h3,
    color: colors.surface,
  },
  buttonIcon: {
    marginRight: 4,
  },
  footerText: {
    ...typography.caption,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

