# FX-2 — Guia de Verificação (Próxima Sessão)

> **Status:** Implementado em 2026-05-15 — aguardando commit + validação visual no Redmi Note 9
> **Objetivo deste documento:** Checklist completo para verificar se tudo foi implementado corretamente

---

## 1. O que foi implementado

### Novo arquivo criado
| Arquivo | Descrição |
|---------|-----------|
| `src/hooks/useBottomSpacing.ts` | Hook central — calcula `paddingBottom` dinâmico usando `useSafeAreaInsets()` + constante `TAB_BAR_HEIGHT = 64` |

### Arquivos modificados (13 arquivos)
| Arquivo | O que mudou |
|---------|-------------|
| `app/_layout.tsx` | `SafeAreaProvider` envolvendo tudo na raiz + `maxFontSizeMultiplier = 1.3` em `Text` e `TextInput` globalmente |
| `app/(tabs)/dashboard.tsx` | `paddingBottom` estático 120 → `useBottomSpacing(true)` dinâmico |
| `app/(tabs)/explorar.tsx` | `paddingBottom` estático 40 (FlatList) → `useBottomSpacing(true)` dinâmico |
| `app/(tabs)/bebe.tsx` | `paddingBottom` estático 120 → `useBottomSpacing(true)` dinâmico |
| `app/(tabs)/perfil.tsx` | `insets.bottom + 120` → `useBottomSpacing(true)` dinâmico |
| `app/(tabs)/diario.tsx` | `insets.bottom + 120` → `useBottomSpacing(true)` dinâmico |
| `app/(tabs)/ferramentas.tsx` | `paddingBottom` estático 40 → `useBottomSpacing(true)` dinâmico |
| `app/birth-plan.tsx` | `paddingBottom` estático `spacing[10]` → `useBottomSpacing(false)` + `flexShrink: 1` no título (previne overflow) |
| `app/nursery.tsx` | `paddingBottom` estático `spacing[10]` → `useBottomSpacing(false)` |
| `app/appointments.tsx` | `paddingBottom` estático `spacing[10]` → `useBottomSpacing(false)` |
| `app/meds.tsx` | `paddingBottom` estático + `numberOfLines={1}` no nome do medicamento + `flexShrink: 1` no container → `useBottomSpacing(false)` |
| `app/exams.tsx` | `paddingBottom` estático `spacing[10]` → `useBottomSpacing(false)` |

---

## 2. Verificação Técnica (rodar antes de qualquer outra coisa)

### Typecheck
```bash
cd C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto
npx tsc --noEmit 2>&1 | tail -20
```
**Critério PASS:** Exatamente 15 erros pré-existentes (landing + GestationCounter + CongratulationsSheet). Qualquer erro novo = FAIL — investigar antes do commit.

### Verificar hook criado
```bash
type src\hooks\useBottomSpacing.ts
```
**Critério PASS:** Arquivo existe e exporta `TAB_BAR_HEIGHT = 64` e `useBottomSpacing(withTabBar: boolean): number`.

---

## 3. Verificação Visual no Redmi Note 9

Gerar APK → instalar → testar cada tela:

### Telas com tab bar (withTabBar: true)
| Tela | O que verificar | PASS | FAIL |
|------|----------------|------|------|
| **Dashboard** | Scroll chega ao final; último card não escondido atrás da tab bar | Conteúdo visível | Conteúdo cortado |
| **Explorar** | FlatList rola até o último item; tab bar não cobre | Último item visível | Item cortado |
| **Bebê** | Scroll completo sem corte | Tudo visível | Conteúdo cortado |
| **Perfil** | Lista de opções completa; tab bar não esconde última opção | Tudo visível | Última opção escondida |
| **Diário** | Scroll completo; FAB não esconde conteúdo abaixo | Tudo visível | FAB bloqueando |
| **Ferramentas** | Grid de ferramentas completo sem corte | Tudo visível | Grid cortado |

### Telas de stack (withTabBar: false)
| Tela | O que verificar | PASS | FAIL |
|------|----------------|------|------|
| **Plano de Parto** | Scroll até o final; CTA "Salvar" visível | Botão visível | Botão escondido |
| **Enxoval** | Lista de itens completa | Tudo visível | Lista cortada |
| **Consultas** | Lista completa; botão "Nova Consulta" visível | Botão visível | Botão cortado |
| **Medicamentos** | Nome do medicamento em 1 linha (sem overflow); lista completa | Nome truncado | Nome quebrando |
| **Exames** | Lista completa sem corte | Tudo visível | Lista cortada |

### Verificação de fonte (MIUI font scaling)
| O que verificar | PASS | FAIL |
|----------------|------|------|
| Ir em Configurações MIUI → Exibição → Tamanho de fonte → Aumentar para máximo | Textos maiores mas não estourando o layout | Textos saindo da tela |
| Títulos longos (ex: Plano de Parto) | Texto truncado com `...` se muito longo | Texto saindo do card |
| Nome de medicamento longo | Uma linha com `...` no final | Texto quebrando para 2 linhas |

---

## 4. Commit (após validação PASS)

```bash
cd C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto
git add src/hooks/useBottomSpacing.ts app/_layout.tsx app/(tabs)/dashboard.tsx app/(tabs)/explorar.tsx app/(tabs)/bebe.tsx app/(tabs)/perfil.tsx app/(tabs)/diario.tsx app/(tabs)/ferramentas.tsx app/birth-plan.tsx app/nursery.tsx app/appointments.tsx app/meds.tsx app/exams.tsx
git commit -m "fix: responsividade e safe-area Redmi Note 9 [FX-2]"
```

---

## 5. EAS Build (após commit)

```bash
eas build --platform android --profile preview
```
Aguardar URL do APK → instalar no Redmi Note 9 → executar checklist da seção 3.

---

## 6. Decisões tomadas (não reverter sem justificativa)

| Decisão | Motivo |
|---------|--------|
| `(Text as any).defaultProps` em vez de `@ts-expect-error` | `@ts-expect-error` suprime só a linha seguinte; cast `as any` cobre todos os acessos sem encadear múltiplos supressores |
| `nursery.tsx` mantém `SafeAreaView` do `react-native` | Refatorar para `safe-area-context` é escopo maior; double-counting (~32px extra) é harmless |
| `withTabBar: false` nas rotas de stack | Rotas de stack não têm tab bar flutuante — só precisam de folga do safe-area inferior |
| `maxFontSizeMultiplier = 1.3` global (não por tela) | Aplicar por tela seria propenso a esquecimentos; root-level garante cobertura total |

---

## 7. Próximos passos após FX-2 validado

1. ✅ Commit FX-2
2. ✅ EAS Build → APK
3. ✅ Validar no Redmi Note 9
4. ⏭️ Retomar **C-11** (conteúdo semana 11) — pipeline validado em C-1..C-10
5. ⏸️ **G-7** (publicação) — desuspender após C-40 concluído
