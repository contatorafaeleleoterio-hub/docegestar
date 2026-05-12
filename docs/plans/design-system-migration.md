# Plano de Migração — Design System (Claude Design → DoceGestar)

**Data:** 2026-05-12  
**Revisão AIOX:** 2026-05-12 — Aprovado por @architect, @dev, @qa, @po, @sm  
**Status:** ⏳ Aguardando execução  
**Handoff source:** `docs/design_system/design_handoff_docegestar/`

---

## Contexto

Design system novo criado via Claude Design (claude.ai/design) e entregue como handoff bundle com 17 telas hi-fi + documentação completa. O app atual usa um design system diferente (NotoSerif + Manrope, rose-gold palette). Este plano substitui tudo pelo novo sistema "Moderno Suave" (Plus Jakarta Sans + Fraunces, pink + lavanda).

---

## Análise: Atual vs. Novo

| Camada | Atual | Novo |
|--------|-------|------|
| Cor primária | `#DB2777` | `#EC3779` (pink500) |
| Cor secundária | `#D4927A` (rose-gold) | `#C9B8E8` (lavanda) |
| Background | `#FFFFFF` | `#FBF7FA` (creme rosado) |
| Texto | `#111827` | `#1F1A2E` (ink) |
| Acento | Rose-gold `#D4927A` | Lavanda `#F4F0FB / #C9B8E8` |
| Fonte headline | Noto Serif | Plus Jakarta Sans (800) |
| Fonte body | Manrope | Plus Jakarta Sans (500) |
| Acento editorial | — | Fraunces (italic) |
| Border radius | default:4 → pill:32 | xs:8 → pill:100 |
| Sombras | Genéricas escuras (RN nativo) | Pink-tinted dual-layer (CSS → converter para RN) |
| Espaçamento | Falta 20, 40, 56 | 4·8·12·16·20·24·32·40·56 |

---

## Impacto da Migração

- **29 arquivos** importam de `src/theme/` e serão afetados
- **4 fonts** novas vs. 6 atuais (mais leve)
- **36 ícones** SVG customizados a criar
- **Pill 32→100px** — mudança visual significativa em botões

---

## Stories do Plano

### DS-1 — Token Layer ⏳

**Arquivos:** `src/theme/colors.ts`, `spacing.ts`, `borderRadius.ts`, `shadows.ts`  
**Estratégia:** Manter chaves semânticas existentes → atualizar valores. Adicionar aliases novos.

**colors.ts — mapeamento:**
- `primary` → `#EC3779` (pink500)
- `primaryDeep` → `#C8255F` (pink600)
- `primaryLight` → `#FFF1F5` (pink50)
- `primaryContainer` → `#FFD9E4` (pink100)
- `primaryTint` → `#FFF1F5` (pink50)
- `background` → `#FBF7FA` (bg)
- `surface` → `#FFFFFF`
- `text` → `#1F1A2E` (ink)
- `textSecondary` → `#5E5870` (inkMuted)
- `border` → `#EDE7F3` (hairline)
- `success` → `#3DB57E`
- `warning` → `#F0A23A`
- `error` → `#E15858`
- Adicionar: pink200..pink500, lav50..lav200, inkSubtle, surfaceAlt
- Remover: secondary rose-gold (substituir por lavanda)

**borderRadius.ts — nova escala:**
```ts
xs: 8, sm: 12, md: 18, lg: 26, xl: 36, pill: 100
// NÃO manter backward compat — migrar todos os usos de uma vez em DS-3
```

**spacing.ts — adicionar:**
```ts
5: 20, 10: 40, 14: 56
```

**shadows.ts — conversão CSS → React Native (CRÍTICO):**

O handoff usa notação CSS (`box-shadow`) que é incompatível com React Native. Converter para formato platform-specific:

```ts
// iOS: shadowColor, shadowOffset, shadowOpacity, shadowRadius
// Android: elevation

soft: {
  // CSS original: 0 2px 8px rgba(40,20,60,0.04), 0 16px 40px rgba(236,55,121,0.06)
  shadowColor: 'rgba(236,55,121,1)',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 16,
  elevation: 2,
}

card: {
  // CSS original: 0 1px 2px rgba(40,20,60,0.04), 0 8px 28px rgba(40,20,60,0.06)
  shadowColor: 'rgba(40,20,60,1)',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.06,
  shadowRadius: 14,
  elevation: 3,
}

cta: {
  // CSS original: 0 12px 28px rgba(236,55,121,0.4)
  shadowColor: '#EC3779',
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.4,
  shadowRadius: 14,
  elevation: 6,
}
```

**Modelo recomendado:** `claude-sonnet-4-6`  
**Justificativa:** Edições cirúrgicas com lógica de conversão shadows  
**Tokens estimados:** Médio (~8K)

---

### DS-2 — Fontes (pacotes + _layout.tsx) ⏳

**Pacotes a instalar:**
```bash
npx expo install @expo-google-fonts/plus-jakarta-sans @expo-google-fonts/fraunces
```

**Pacotes a remover:**
```bash
npm uninstall @expo-google-fonts/noto-serif @expo-google-fonts/manrope
```

**typography.ts — nova escala:**
```ts
display:  { fontFamily: 'PlusJakartaSans_800ExtraBold', fontSize: 56, letterSpacing: -2 }
h1:       { fontFamily: 'PlusJakartaSans_800ExtraBold', fontSize: 32, letterSpacing: -1.2 }
h2:       { fontFamily: 'PlusJakartaSans_800ExtraBold', fontSize: 22, letterSpacing: -0.6 }
h3:       { fontFamily: 'PlusJakartaSans_700Bold',      fontSize: 18, letterSpacing: -0.2 }
body:     { fontFamily: 'PlusJakartaSans_500Medium',    fontSize: 14 }
caption:  { fontFamily: 'PlusJakartaSans_600SemiBold',  fontSize: 12 }
eyebrow:  { fontFamily: 'PlusJakartaSans_700Bold',      fontSize: 11, letterSpacing: 1.2 }
editorial:{ fontFamily: 'Fraunces_500Medium_Italic',    fontSize: 18 }  // pull quotes
```

**_layout.tsx:** substituir imports NotoSerif/Manrope → PlusJakartaSans/Fraunces.  
**Nota:** 4 fonts no total (PJS 500, 700, 800 + Fraunces 500i) vs. 6 atuais — mais leve.

**Modelo recomendado:** `claude-sonnet-4-6`  
**Justificativa:** Integração entre módulos (fonts → layout → theme)  
**Tokens estimados:** Médio (~8K)

---

### DS-3 — Typecheck + Correção de Quebras + QA Visual ⏳

- `npm run typecheck` — zero erros
- Corrigir todos os erros de chaves inexistentes nos 29 arquivos
- Migrar TODOS os usos de `pill` (32→100) de uma vez
- Testar `npm run web` — verificar visual

**Checklist de Verificação Visual (obrigatório):**
- [ ] Dashboard/Home
- [ ] Explorar
- [ ] Ferramentas
- [ ] Perfil
- [ ] Onboarding Welcome
- [ ] Onboarding Profile
- [ ] Onboarding Due Date
- [ ] Onboarding Plans
- [ ] Onboarding Coming Soon
- [ ] WeekCard / WeekPeek
- [ ] Testar body text (14px) em viewport 320px — verificar legibilidade

**Critério:** zero erros TypeScript + visual aprovado em todas as telas.

**Modelo recomendado:** `claude-sonnet-4-6`  
**Justificativa:** Debug + refactor multi-arquivo  
**Tokens estimados:** Alto (~15K)

---

### DS-4 — Componente DGIcon ⏳

**Arquivo:** `src/components/DGIcon.tsx`  
**Fonte:** `docs/design_system/design_handoff_docegestar/design-system/ds-icons.jsx`  
**Dependência:** `react-native-svg` (já instalado)

- 36 ícones customizados (converter JSX web → React Native SVG components)
- Grid 24×24, strokeWidth 1.75, strokeLinecap round, fill none
- Tamanhos: xs:12, sm:16, md:20, lg:24, xl:32
- Variantes: outline (padrão), tinted, solid (white em pink500), premium (gradient dourado)
- Banir emojis de UI funcional nos componentes existentes

**Nota:** Esta é a maior story. Executar separadamente após DS-1..DS-3.

**Modelo recomendado:** `claude-sonnet-4-6`  
**Justificativa:** Componente com múltiplos estados e variants  
**Tokens estimados:** Alto (~20K)

---

### DS-5 — Arquivo e Limpeza ⏳

Executar após DS-4 concluído e validado.

**Mover para arquivo:**
```
docs/design_system/_archived/design_handoff_docegestar/  ← handoff (já lido, não precisa mais)
docs/design_system/_archived/DESIGN-v2.md               ← design antigo
```

**Criar:**
```
docs/design_system/DESIGN-SYSTEM-ACTIVE.md  ← aponta apenas para o novo sistema
```

**Atualizar CLAUDE.md:** linha de Design → `Primary #EC3779 | Lavanda | Plus Jakarta Sans`

**Modelo recomendado:** `claude-haiku-4-5`  
**Justificativa:** Operações mecânicas de move/rename  
**Tokens estimados:** Baixo (~2K)

---

## Ordem de Execução

```
DS-1 (tokens) → DS-2 (fontes) → DS-3 (typecheck + QA visual) → DS-4 (ícones) → DS-5 (arquivo)
```

DS-1 + DS-2 + DS-3 = Sessão 1  
DS-4 = Sessão 2  
DS-5 = Final da Sessão 2

---

## Riscos Identificados (Revisão AIOX 2026-05-12)

| # | Risco | Severidade | Mitigação |
|---|-------|-----------|-----------|
| 1 | Shadows CSS incompatível com RN | CRÍTICO | Conversão platform-specific em DS-1 (detalhada acima) |
| 2 | 29 arquivos afetados pela mudança de tokens | ALTO | Manter chaves semânticas, trocar só valores |
| 3 | Pill 32→100px muda visual de botões | ALTO | Migrar todos usos em DS-3, sem backward compat |
| 4 | Body text 16→14px pode afetar legibilidade | MÉDIO | Testar em viewport 320px |
| 5 | 36 ícones SVG precisam de conversão web→RN | MÉDIO | Gerar via react-native-svg do JSX do handoff |
| 6 | Regressão visual em telas não verificadas | MÉDIO | Checklist visual obrigatório em DS-3 |

---

## Referências

📁 `C:\Users\USUARIO\Desktop\GESTANTE\meu-projeto\docs\design_system\design_handoff_docegestar\`  
📄 **README.md** — spec completa do design system  
📄 **tokens.jsx** — todos os tokens  
📄 **ds-icons.jsx** — 36 ícones  
📄 **DoceGestar.html** — 17 telas hi-fi (abrir no browser)  
📄 **DesignSystem.html** — documentação visual interativa
