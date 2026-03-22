import { Redirect } from 'expo-router';

export default function Index() {
  // TODO: Verificar se onboarding foi concluído (AsyncStorage)
  // Se não, redirecionar para onboarding
  // Por enquanto, vai direto para as tabs
  return <Redirect href="/(tabs)/dashboard" />;
}
