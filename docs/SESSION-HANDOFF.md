# Session Handoff — DoceGestar

> Documento atualizado ao final de cada sessão. Fonte de verdade para retomar o trabalho.
> **Último update:** 2026-04-19 | **Agente:** Gemini CLI — Módulo de Autenticação (Supabase + Google)

---

## 🎯 Estado Atual (Sessão de Autenticação)

| Item | Status | Observação |
|------|--------|------------|
| Tela de Boas-Vindas (`welcome.tsx`) | ✅ Done | Login com Google + Modo Visitante |
| Integração Supabase | ✅ Done | Configurado em `src/utils/supabase.ts` |
| Roteamento de Entrada | ✅ Done | Atualizado em `app/index.tsx` |
| Dependências de Auth | ✅ Done | supabase-js, expo-auth-session, expo-crypto |
| Configuração de Ambiente | ✅ Done | Arquivo `.env` criado com chaves reais |

### Working tree
- **Novo Fluxo:** Welcome -> (Google Login OR Onboarding) -> Dashboard.
- **Backend:** Supabase ativo (vqxpmybnycxwknlmmuzo.supabase.co).

---

## ⚡ PRÓXIMAS AÇÕES (Para o Claude Code / Próxima Sessão)

### 1. Finalizar Google Login Nativo (Android/iOS)
**Contexto:** O código em `app/welcome.tsx` já possui a estrutura, mas os Client IDs estão como placeholders.
- **Ação:** Criar IDs no Google Cloud Console (Tipo Web e Android).
- **Redirecionamento:** O Redirect URI do Supabase deve ser cadastrado no Google Cloud: `https://vqxpmybnycxwknlmmuzo.supabase.co/auth/v1/callback`.

### 2. Sincronização de Dados (Fase 2)
**Contexto:** O app salva dados no SQLite local (`src/db`).
- **Ação:** Criar lógica para que, ao logar com o Google, os dados do SQLite sejam enviados para a tabela `profiles` no Supabase (e vice-versa ao trocar de aparelho).

---

## 🛠️ Detalhes Técnicos Adicionados nesta Sessão

### Novas Dependências
- `@supabase/supabase-js`: Cliente do banco de dados/auth.
- `expo-auth-session` & `expo-crypto`: Fluxo de login seguro.
- `react-native-url-polyfill`: Necessário para o Supabase funcionar no mobile.

### Arquivos Criados/Alterados
- `meu-projeto/app/welcome.tsx`: Nova porta de entrada do app.
- `meu-projeto/app/index.tsx`: Agora valida sessão do Supabase antes do redirecionamento.
- `meu-projeto/src/utils/supabase.ts`: Instância global do cliente Supabase.
- `meu-projeto/.env`: Contém `EXPO_PUBLIC_SUPABASE_URL` e `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

### Configuração do Supabase
- **URL:** `https://vqxpmybnycxwknlmmuzo.supabase.co`
- **Key (Publishable):** `sb_publishable_r-cu6mSyT3BUS-Vrxpfb2Q__YVHiQ2f`
- **Segurança:** Row Level Security (RLS) deve ser configurado no painel do Supabase para a tabela `profiles`.

---

## ⚠️ Bloqueios / Pendências
- **Google Client IDs:** O usuário está no processo de criar os IDs no Google Cloud Console. Sem eles, o botão "Entrar com Google" não funcionará (retornará erro de configuração).
- **Testes Android:** O usuário pretende testar via APK/Build Android. Lembre-se que para builds nativos, o SHA-1 deve estar cadastrado no Google Cloud.

---

## Débitos Técnicos (Atualizado)

| ID | Descrição | Status |
|----|-----------|--------|
| DT-007 | Migração SQLite -> Supabase | Pendente |
| DT-008 | Logout funcional | Pendente (adicionar botão em Configurações) |
| DT-009 | Validação de sessão expirada | Automático via Supabase-js |
