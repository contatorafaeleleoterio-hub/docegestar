# Google Login — Plano de Implementação (Pendente)

> **Status:** ⏳ Pausado — configuração externa concluída, implementação revertida para revisão  
> **Data:** 2026-04-19  
> **Motivo da pausa:** APK com login não abria no dispositivo Android — causa raiz não identificada

---

## O Que Já Está Configurado (não precisa refazer)

### Google Cloud Console ✅
| Item | Valor |
|------|-------|
| Projeto | DoceGestar |
| Conta | contatorafaeleleoterio@gmail.com |
| Tela OAuth | Externa, domínios: vqxpmybnycxwknlmmuzo.supabase.co + docegestar.com.br |
| Web Client ID | `562125016823-i56f1t1mom25m02k3gbfftkg8go4bbhj.apps.googleusercontent.com` |
| Android Client ID | `562125016823-6nbngno7komh4q9sjqqt6m37pimdp4h9.apps.googleusercontent.com` |
| Android Package | `com.docegestar.app` |
| SHA-1 (keystore EAS) | `09:8E:78:77:FA:BC:56:BE:91:05:AF:9E:9D:D6:AF:7F:92:E8:F9:C0` |
| Redirect URI cadastrado | `https://vqxpmybnycxwknlmmuzo.supabase.co/auth/v1/callback` |

### Supabase Dashboard ✅
| Item | Valor |
|------|-------|
| Projeto | vqxpmybnycxwknlmmuzo |
| Google Provider | Habilitado |
| Client ID | Web ID + Android ID (separados por vírgula) |
| Client Secret | *(salvo no Supabase Dashboard — não armazenar aqui)* |
| Skip Nonce Check | Ativado |
| Site URL | https://docegestar.com.br |
| Redirect URL 1 | `docegestar://` |
| Redirect URL 2 | `https://vqxpmybnycxwknlmmuzo.supabase.co/auth/v1/callback` |

### Arquivos no Repositório ✅
Estes arquivos já estão no branch master (commit `2182bf7`) e não precisam ser recriados:

| Arquivo | O que faz |
|---------|-----------|
| `app/welcome.tsx` | Tela de boas-vindas com botão "Entrar com Google" + "Modo Visitante" |
| `src/utils/supabase.ts` | Cliente Supabase com AsyncStorage e autoRefreshToken |

### Dependências já instaladas ✅
```json
"@supabase/supabase-js": "^2.103.3",
"expo-auth-session": "^55.0.14",
"expo-crypto": "^55.0.14",
"expo-web-browser": "^14.x",
"react-native-url-polyfill": "^3.0.0"
```

### .env já configurado ✅
```
EXPO_PUBLIC_SUPABASE_URL=https://vqxpmybnycxwknlmmuzo.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_r-cu6mSyT3BUS-Vrxpfb2Q__YVHiQ2f
```

---

## O Que Está Revertido (precisa refazer ao implementar)

### `app/index.tsx` — Roteamento de entrada
O arquivo foi revertido para o fluxo SQLite original.  
Para reativar o Google Login, substituir o conteúdo por:

```typescript
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
      const { data: { session } } = await supabase.auth.getSession();
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
```

---

## Problemas Identificados (investigar antes de reimplementar)

### 1. APK não abria após instalação
- **Sintoma:** APK instalado com sucesso no Android mas não abria
- **Build afetado:** `31b87c2b-6fba-4f7f-a7b9-0bde0648f285`
- **Causa raiz:** Não identificada — possíveis hipóteses:
  - Conflito ao instalar sobre APK antigo sem desinstalar antes
  - Crash no startup causado por `react-native-url-polyfill/auto` importado em `supabase.ts`
  - Problema com `AsyncStorage` de versão incompatível
  - Erro silencioso na inicialização do cliente Supabase

### 2. SHA-1 de produção pendente
- O Android Client ID atual usa o SHA-1 do keystore EAS (preview)
- Para produção na Play Store, o Google re-assina com SHA-1 diferente (Play App Signing)
- **Ação necessária quando publicar:**
  1. Play Console → App → Versão → Configuração → Integridade do app → copiar SHA-1
  2. Google Cloud → nova credencial Android com esse SHA-1
  3. Supabase → adicionar novo Android Client ID no campo Client IDs

---

## Checklist para Reimplementar

- [ ] Investigar causa do crash no APK — verificar logs via `adb logcat` ou Expo Dev Tools
- [ ] Testar `supabase.ts` isoladamente (importar e verificar inicialização)
- [ ] Considerar migrar de `expo-auth-session` para `@react-native-google-signin/google-signin`
  (abordagem mais nativa, recomendada pelo Expo em 2025)
- [ ] Restaurar `app/index.tsx` com o código acima
- [ ] Gerar novo APK preview e testar em device limpo (sem APK anterior)
- [ ] Implementar botão Logout em `config.tsx`
- [ ] Implementar sincronização SQLite → Supabase `profiles` (DT-007)
- [ ] Registrar SHA-1 do Play App Signing após primeira publicação

---

## Referências

- [Expo Google Auth Docs](https://docs.expo.dev/guides/google-authentication/)
- [Supabase Google Login](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [signInWithIdToken](https://supabase.com/docs/reference/javascript/auth-signinwithidtoken)
- [Native Mobile Auth — Supabase Blog](https://supabase.com/blog/native-mobile-auth)
- Google Cloud Console: console.cloud.google.com → Projeto DoceGestar → Credenciais
- Supabase Dashboard: supabase.com/dashboard/project/vqxpmybnycxwknlmmuzo/auth/providers
