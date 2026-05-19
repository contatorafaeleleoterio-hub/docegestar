# DoceGestar — Guia de Desenvolvimento

**Versão:** 2.0  
**Last updated:** 2026-05-13  
**Status:** Onboarding v2.1 ✅ completo

---

## 🚀 Quick Start

```bash
cd meu-projeto

# Instalar dependências
npm install

# Rodar dev server (web)
npm start -- --web

# Ou iOS
npm start -- --ios

# Ou Android
npm start -- --android

# Verificação de qualidade
npm run typecheck    # TypeScript
npm run test         # Jest
npm run lint         # ESLint
```

---

## 📋 Estrutura do Projeto

```
meu-projeto/
├── app/                           ← Rotas (expo-router)
│   ├── index.tsx                  ← Gate: perfil check
│   ├── _layout.tsx                ← Root stack
│   ├── onboarding/
│   │   ├── _layout.tsx            ← Onboarding stack + Provider
│   │   ├── index.tsx              ← Welcome
│   │   ├── profile.tsx            ← Dados pessoais
│   │   ├── due-date.tsx           ← Data estimada
│   │   ├── plans.tsx              ← Seleção plano
│   │   └── coming-soon.tsx        ← Stub
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── dashboard.tsx          ← Homepage
│       ├── explorar.tsx           ← Conteúdo semanas
│       ├── ferramentas.tsx        ← Consultas, sintomas
│       └── perfil.tsx             ← Editar perfil
│
├── src/
│   ├── components/
│   │   ├── ui/                    ← Reusable components
│   │   │   ├── BottomSheet.tsx
│   │   │   ├── GestationCounter.tsx
│   │   │   ├── FloatingLabelInput.tsx
│   │   │   ├── FloatingLabelSelect.tsx
│   │   │   ├── MethodCard.tsx
│   │   │   ├── ProgressDots.tsx
│   │   │   ├── PrimaryButton.tsx
│   │   │   ├── GradientButton.tsx
│   │   │   └── index.ts
│   │   ├── CongratulationsSheet.tsx
│   │   ├── DGIcon.tsx
│   │   ├── QuickLogFAB.tsx
│   │   └── ... (outros)
│   │
│   ├── context/
│   │   └── OnboardingContext.tsx  ← Draft state + actions
│   │
│   ├── hooks/
│   │   ├── useUserProfile.ts      ← getProfile + saveOnboardingProfile
│   │   ├── useCurrentWeek.ts
│   │   ├── useStreak.ts
│   │   ├── usePrenatalAppointments.ts
│   │   └── ... (outros)
│   │
│   ├── utils/
│   │   ├── dateUtils.ts           ← DPP calculations
│   │   ├── date.ts                ← Legacy parsers
│   │   └── ... (outros)
│   │
│   ├── data/
│   │   ├── weeks/                 ← Semanas 1-40
│   │   ├── planFeatures.ts        ← Features vazias (PO preenche)
│   │   └── index.ts
│   │
│   ├── db/
│   │   └── index.ts               ← SQLite connection
│   │
│   ├── theme/
│   │   └── index.ts               ← Colors, typography, spacing
│   │
│   └── types/
│       └── index.ts               ← TypeScript interfaces
│
├── __tests__/
│   └── dateUtils.test.ts          ← Jest tests
│
├── package.json
├── tsconfig.json
├── jest.config.js
├── ONBOARDING_V2.1_COMPLETE.md    ← Documentação sessões
└── SESSION_HANDOFF.md              ← Próximas ações
```

---

## 🎯 Fluxo de Onboarding v2.1

```
SEM PERFIL
    ↓
app/index.tsx (gate)
    ↓
/onboarding/welcome (Welcome screen)
    ↓
    "Explorar" → /onboarding/profile
    ou
    "Criar conta" → /onboarding/coming-soon
    ↓
/onboarding/profile (FloatingLabel + Select)
    ✓ name (opcional)
    ✓ relationship (obrigatório: mae/parceiro/outro)
    ✓ ProgressDots 1/3
    ↓
/onboarding/due-date (3 MethodCards)
    ✓ Método: DPP médico / LMP / Concepção
    ✓ Data input com validação
    ✓ Calcular DPP
    ✓ "Confirmar data" → Modal ou "Definir depois" → Plans
    ↓
Modal CongratulationsSheet (BottomSheet)
    ✓ GestationCounter (expandido)
    ✓ 3 info boxes
    ✓ "Ir para minha jornada" → Plans
    ↓
/onboarding/plans (Responsive)
    ✓ Card Free: "Continuar no gratuito"
    ✓ Card Premium: "Assinar Premium" (Alert "Em breve")
    ✓ Carrossel features (se houver)
    ↓
/(tabs)/dashboard (COM PERFIL)
    ✓ GestationCounter compact no Card 8
    ✓ Resto da app normal
```

---

## 🔧 Gate de Qualidade

Antes de commitar:

```bash
# 1. TypeScript
npm run typecheck
# Esperado: 0 erros

# 2. Testes
npm run test
# Esperado: ✓ dateUtils.test.ts pass

# 3. Lint (opcional)
npm run lint
# Esperado: 0 erros críticos

# 4. Visual check
npm start -- --web
# Testar 7 cenários em ONBOARDING_V2.1_COMPLETE.md
```

---

## 📦 Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| expo | ~55.0.23 | Runtime |
| expo-router | ~55.0.14 | Navigation |
| react | 19.2.0 | UI framework |
| react-native | 0.83.6 | Native components |
| expo-linear-gradient | ~55.0.13 | Gradients |
| expo-sqlite | ~55.0.15 | Local database |
| react-native-mask-input | ^1.2.3 | Date mask |
| jest | ~29.7.0 | Testing |
| jest-expo | ~55.0.17 | Jest config |
| typescript | ~5.9.2 | Type checking |

---

## 💾 Banco de Dados

**SQLite local** (expo-sqlite)

### Tabela: `user_profile`

```sql
CREATE TABLE IF NOT EXISTS user_profile (
  id INTEGER PRIMARY KEY,
  name TEXT,
  due_date TEXT,                 -- ISO: YYYY-MM-DD
  created_at TEXT NOT NULL,
  gestationType TEXT,            -- primeira, multipla, etc
  firstChild INTEGER,            -- 0=sim, 1=nao
  babyName TEXT,
  relationship TEXT,             -- mae, parceiro, outro
  plan TEXT DEFAULT 'free',      -- free, premium
  plan_expires_at TEXT           -- ISO: YYYY-MM-DD ou null
);
```

### Migrations

- **ONB-1:** Criou colunas relationship, plan, plan_expires_at
- ✅ **Aplicadas no banco**

---

## 🎨 Design System

**Cores (src/theme/index.ts):**

```typescript
colors = {
  primary: '#EC3779',              // Rosa principal
  primaryDeep: '#C8255F',          // Rosa escura
  primaryLight: '#FFF1F5',         // Rosa clara
  background: '#FBF7FA',           // Fundo
  surface: '#FFFFFF',              // Cards
  onPrimary: '#FFFFFF',            // Texto sobre primary
  text: '#1A1A1A',                 // Texto principal
  textSecondary: '#666666',        // Texto secundário
  error: '#B3261E',                // Erro
  border: '#E5E5E5',               // Bordas
  // ... mais
};
```

**Tipografia:**

```typescript
typography = {
  h1: { fontSize: 32, fontWeight: '700' },
  h2: { fontSize: 24, fontWeight: '700' },
  body: { fontSize: 16, fontWeight: '400' },
  label: { fontSize: 14, fontWeight: '600' },
  caption: { fontSize: 12, fontWeight: '400' },
  // ... mais
};
```

**Spacing (8px base):**

```typescript
spacing = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48];
// spacing[1] = 4px, spacing[6] = 24px, etc
```

---

## 🧪 Testes

**Jest configurado** com:

- preset: jest-expo
- Transform: expo/metro/transform.js
- testMatch: `**/__tests__/**/*.test.ts(x)`

**Arquivo de teste:**

```bash
__tests__/dateUtils.test.ts
```

**Rodar testes:**

```bash
npm run test                    # Uma vez
npm run test -- --watch        # Watch mode
npm run test -- --coverage     # Coverage report
```

---

## 📝 Próximos Passos

### Imediato (Design Refinement — DR)

**Plano:** `C:\Users\USUARIO\.claude\plans\refine-o-plano-que-quirky-matsumoto.md`

- DR-1: Logo real onboarding
- DR-2: Ícone explore
- DR-3: Dashboard avatar + greeting
- DR-4: Perfil avatar + stats
- DR-5: Ferramentas pill-tabs
- DR-6: Visual polish
- DR-7: SegmentedDateInput

### Médio prazo (Conteúdo)

- C-11 a C-17: Semanas 11-17
- C-19 a C-40: Semanas 19-40
- (Semana 18 já existe)

### Longo prazo (Gamificação)

- G-1 a G-40: Badges, streaks, achievements

---

## 🔗 Links Úteis

- **Plano master (histórico):** `C:\Users\USUARIO\.claude\plans\me-mostre-o-plano-cached-ocean.md`
- **Completude v2.1:** `ONBOARDING_V2.1_COMPLETE.md` (este projeto)
- **Handoff próxima sessão:** `SESSION_HANDOFF.md`
- **Expo docs:** https://docs.expo.dev
- **React Native docs:** https://reactnative.dev
- **TypeScript docs:** https://www.typescriptlang.org

---

## 🚨 Troubleshooting

### npm start não conecta

```bash
# Limpar cache
rm -rf node_modules .expo dist
npm install
npm start -- --web
```

### TypeScript erros

```bash
npm run typecheck
# Se houver erros, verifique tipos em src/types/index.ts
```

### Jest timeout

```bash
npm run test -- --detectOpenHandles
```

---

**Último commit:** (pendente 6 commits conforme ONBOARDING_V2.1_COMPLETE.md)

**Responsável:** @sm (Gerente de Story)

---

Qualquer dúvida? Verifique `ONBOARDING_V2.1_COMPLETE.md` para detalhes técnicos por story.
