# Plano de Correção — Bug DPP + Replicação Design System

**Data:** 2026-05-12
**Autor:** GESTOR (sessão de planejamento)
**Status:** ⏳ Aguardando aprovação para execução na próxima sessão
**Salvar em:** `docs/plans/fix-dpp-bug-and-design-system-replication.md` (cópia para projeto na 1ª ação da execução)

---

## Context

Usuário testou o APK gerado via EAS Build (`build 2b2d9168...`) e reportou **dois problemas críticos**:

1. **Bug no fluxo de onboarding (DPP):** Ao selecionar a data estimada do parto e abrir o modal "Parabéns", o botão de avançar não funciona — o usuário descreveu como "o botão fechar não funcionou". Investigação confirmou: o `×` (canto sup. direito) e o botão "Ir para minha jornada →" usam o **mesmo handler** (`handleContinue`), que executa `saveOnboardingProfile`. Como o `try/finally` não tem `catch`, qualquer erro de save (ex: SQLite locked, validação, rede) é silenciado — modal aparenta não responder.

2. **Design System novo NÃO está 100% aplicado:** Apesar dos tokens canônicos (`#EC3779`, Plus Jakarta Sans, Fraunces) estarem definidos em `src/theme/`, **7 pontos críticos** ainda usam fontes/cores antigas (`NotoSerif`, `Manrope`, `#DB2777`, `#b30064`, `#ffffff` no splash). Resultado: o APK ainda renderiza com fontes do sistema (fallback) e cor de notificação antiga.

Esses dois problemas bloqueiam validação real do MVP. Próxima sessão deve corrigi-los e rebuildar o APK.

---

## Achados Detalhados

### Bug DPP — `CongratulationsSheet.tsx`

📄 **CongratulationsSheet.tsx**
📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\components\`

```
Linha 33-47: handleContinue (try/finally SEM catch — erros silenciados)
Linha 57-64: TouchableOpacity "×" com onPress={handleContinue}  ❌
              ↳ Deveria chamar onClose (fechar modal)
Linha 78-85: TouchableOpacity "Ir para minha jornada →" com onPress={handleContinue}
              ↳ Correto, mas sem feedback de loading visível
```

**Hipóteses do bug reportado** (ordem de probabilidade):
1. `saveOnboardingProfile` falha silenciosamente (SQLite, validação) → modal não navega → usuário acha que "botão não funciona"
2. UX ambígua: usuário clica `×` esperando fechar modal para corrigir, mas o `×` salva e tenta avançar
3. `saving=true` trava se a promise nunca resolve

### Design System — 7 pontos críticos

| # | Arquivo | Linha(s) | Problema | Correção |
|---|---------|----------|----------|----------|
| 1 | `app/(tabs)/dashboard.tsx` | 336, 342 | `NotoSerif_700Bold`, `NotoSerif_400Regular` | `PlusJakartaSans_800ExtraBold`, `PlusJakartaSans_500Medium` |
| 2 | `app/(tabs)/_layout.tsx` | 56 | `outputRange: ['rgba(179,0,100,0)', colors.primary]` (magenta antigo) | `['rgba(236,55,121,0)', colors.primary]` (pink500 alpha 0) |
| 3 | `app/(tabs)/_layout.tsx` | 189, 209 | `Manrope_500Medium`, `Manrope_700Bold` | `PlusJakartaSans_500Medium`, `PlusJakartaSans_700Bold` |
| 4 | `app/(tabs)/_layout.tsx` | 212 | `NotoSerif_700Bold` (headerTitle) | `PlusJakartaSans_800ExtraBold` |
| 5 | `app/onboarding/due-date.tsx` | 318 | `Manrope_400Regular` (dateInput) | `PlusJakartaSans_500Medium` |
| 6 | `src/components/ui/FloatingLabelInput.tsx` | refs `Manrope_*` | Fonte antiga | `PlusJakartaSans_*` correspondente |
| 7 | `src/components/ui/FloatingLabelSelect.tsx` | refs `Manrope_*` | Fonte antiga | `PlusJakartaSans_*` correspondente |
| 8 | `app.json` | 54 | `expo-notifications color: "#DB2777"` | `"#EC3779"` |
| 9 | `app.json` | 13 | `splash backgroundColor: "#ffffff"` | `"#FBF7FA"` |

---

## Stories (sequência de execução)

### FIX-1 — Bug DPP/Modal Parabéns (@dev)

**Arquivo:** `src/components/CongratulationsSheet.tsx`

**Mudanças:**
1. Linha 59: `onPress={handleContinue}` → `onPress={onClose}` no botão `×`
   (o `×` deve **fechar** o modal, não avançar)
2. Linha 33-47: Adicionar `catch` ao try/finally:
   ```tsx
   try {
     await saveOnboardingProfile({...});
     router.push('/onboarding/plans');
   } catch (err) {
     console.error('[CongratulationsSheet] Falha ao salvar perfil:', err);
     Alert.alert('Erro', 'Não foi possível salvar. Tente novamente.');
   } finally {
     setSaving(false);
   }
   ```
3. Linha 78-85: Adicionar feedback visual quando `saving=true`:
   ```tsx
   <Text style={styles.continueBtnText}>
     {saving ? 'Salvando...' : 'Ir para minha jornada →'}
   </Text>
   ```
4. Adicionar `import { Alert } from 'react-native'`

**Verificação:** Reabrir fluxo no preview web (`/onboarding/due-date`), preencher DPP, clicar "Confirmar data", testar tanto `×` quanto "Ir para minha jornada →".

**Modelo recomendado:** `claude-haiku-4-5`
**Justificativa:** Edição cirúrgica em arquivo conhecido com diff pequeno.
**Tokens estimados:** Baixo (~3K)

---

### FIX-2 — Replicar fontes do DS novo (@dev)

**Arquivos:**
- `app/(tabs)/dashboard.tsx` — substituir `NotoSerif_*` por `PlusJakartaSans_*` nas linhas 336, 342
- `app/(tabs)/_layout.tsx` — substituir `Manrope_*` e `NotoSerif_*` nas linhas 189, 209, 212
- `app/onboarding/due-date.tsx` — linha 318 `Manrope_400Regular` → `PlusJakartaSans_500Medium`
- `src/components/ui/FloatingLabelInput.tsx` — todas refs de `Manrope_*` → `PlusJakartaSans_*`
- `src/components/ui/FloatingLabelSelect.tsx` — todas refs de `Manrope_*` → `PlusJakartaSans_*`

**Mapeamento fonte antiga → nova:**
| Antiga | Nova |
|--------|------|
| `NotoSerif_700Bold` | `PlusJakartaSans_800ExtraBold` |
| `NotoSerif_400Regular` | `PlusJakartaSans_500Medium` |
| `Manrope_700Bold` | `PlusJakartaSans_700Bold` |
| `Manrope_500Medium` | `PlusJakartaSans_500Medium` |
| `Manrope_400Regular` | `PlusJakartaSans_500Medium` |

**Verificação:** `npm run typecheck` → zero erros. Reabrir preview web e checar header "DoceGestar", labels das tabs, input de data no onboarding.

**Modelo recomendado:** `claude-haiku-4-5`
**Justificativa:** Substituição mecânica de strings em 5 arquivos.
**Tokens estimados:** Baixo (~4K)

---

### FIX-3 — Replicar cores hardcoded (@dev)

**Arquivos:**
- `app/(tabs)/_layout.tsx` linha 56:
  ```
  outputRange: ['rgba(179,0,100,0)', colors.primary]
  →
  outputRange: ['rgba(236,55,121,0)', colors.primary]
  ```
- `app.json` linha 54: `"color": "#DB2777"` → `"color": "#EC3779"`
- `app.json` linha 13: `"backgroundColor": "#ffffff"` → `"backgroundColor": "#FBF7FA"`

**Verificação:** Visual no preview + leitura do `app.json` após edição.

**Modelo recomendado:** `claude-haiku-4-5`
**Justificativa:** 3 edições atômicas de string.
**Tokens estimados:** Baixo (~1K)

---

### FIX-4 — QA Visual + Typecheck (@qa)

**Checklist obrigatório (executar no preview web e mobile preview):**
- [ ] Header "DoceGestar" em Plus Jakarta Sans (não NotoSerif fallback)
- [ ] Labels das tabs (Início, Explorar, Ferramentas, Perfil) em Plus Jakarta Sans
- [ ] Onboarding: input de data em Plus Jakarta Sans
- [ ] Modal Parabéns: botão `×` fecha modal (não avança)
- [ ] Modal Parabéns: erro em save mostra Alert
- [ ] Tab bar animation: sem flash de cor errada
- [ ] Splash screen: cor `#FBF7FA` (rodar `npx expo start --clear`)
- [ ] `npm run typecheck` → 0 erros

**Verdict:** PASS antes de seguir para FIX-5.

**Modelo recomendado:** `claude-sonnet-4-6`
**Justificativa:** Checklist visual com múltiplos estados — requer inspeção.
**Tokens estimados:** Médio (~6K)

---

### FIX-5 — Rebuild APK (@devops)

**Comando:**
```powershell
cd C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto
eas build --platform android --profile preview --non-interactive
```

**Pré-requisitos confirmados:**
- Conta Expo (`@eusourafael`) já logada ✅
- `projectId` em `app.json` configurado ✅
- Keystore Android já gerada nos servidores Expo ✅
- eas-cli 18.11.0 instalado globalmente ✅

**Saída esperada:**
- Link de acompanhamento `https://expo.dev/accounts/eusourafael/projects/doce-gestar/builds/{id}`
- APK pronto em ~10-15 min após upload
- Reportar link ao usuário imediatamente após submissão

**Modelo recomendado:** `claude-haiku-4-5`
**Justificativa:** Execução de comando + monitoramento de log.
**Tokens estimados:** Baixo (~2K)

---

## Equipe AIOX acionada

| Agente | Story | Função |
|--------|-------|--------|
| @sm | — | Confirma a sequência (FIX-1..5 são micro-stories já especificadas) |
| @po | FIX-1..3 | Validate quick (3 pontos: AC clara, scope, AC testável) |
| @dev | FIX-1, FIX-2, FIX-3 | Implementação (Haiku para 2 e 3, Sonnet para 1 por causa do error handling) |
| @qa | FIX-4 | QA visual + typecheck |
| @devops | FIX-5 | EAS Build + push |

---

## Arquivos críticos (referência rápida)

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\components\`
  📄 **CongratulationsSheet.tsx** — FIX-1 (bug DPP)

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\app\(tabs)\`
  📄 **dashboard.tsx** — FIX-2 (NotoSerif)
  📄 **_layout.tsx** — FIX-2 (Manrope, NotoSerif) + FIX-3 (rgba antigo)

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\app\onboarding\`
  📄 **due-date.tsx** — FIX-2 (Manrope linha 318)

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\components\ui\`
  📄 **FloatingLabelInput.tsx** — FIX-2 (Manrope refs)
  📄 **FloatingLabelSelect.tsx** — FIX-2 (Manrope refs)

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\`
  📄 **app.json** — FIX-3 (linhas 13, 54)

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\src\theme\`
  📄 **colors.ts** — referência (tokens canônicos, NÃO modificar)
  📄 **typography.ts** — referência (tokens canônicos, NÃO modificar)

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\docs\design_system\`
  📄 **DESIGN-SYSTEM-ACTIVE.md** — referência canônica do DS

---

## Verificação End-to-End

1. **FIX-1..3 implementados** → `git diff --stat` mostra ~7 arquivos modificados
2. **Typecheck:** `npm run typecheck` → 0 erros
3. **Preview web:**
   - `npm run web` (porta 8081)
   - Abrir `mobile-preview.html` (Chrome)
   - Percorrer: dashboard → tabs → onboarding (3 steps) → modal parabéns
   - Confirmar fontes Plus Jakarta Sans em todos os pontos críticos
4. **Bug DPP:**
   - No fluxo onboarding/due-date, preencher data
   - Clicar `×` → modal fecha (não avança)
   - Clicar "Ir para minha jornada →" → avança normalmente
   - Forçar erro (ex: dropar internet) → Alert aparece com mensagem
5. **EAS Build:** APK download → instalar no dispositivo Android → repetir fluxo do bug → confirmar fontes + cores
6. **Commit + push:** @devops faz `git push` somente após QA PASS

---

## Notas operacionais

- **NÃO modificar** `src/theme/colors.ts` ou `src/theme/typography.ts` — são tokens canônicos validados
- Em caso de fonte faltando após replicação: verificar `app/_layout.tsx` — todas as variantes de `PlusJakartaSans_*` (500, 600, 700, 800) devem estar no `useFonts`
- Splash screen pode requerer `expo prebuild --clean` se o `#FBF7FA` não refletir após build
- O eas-cli 18.11.0 está OK — não precisa atualizar
