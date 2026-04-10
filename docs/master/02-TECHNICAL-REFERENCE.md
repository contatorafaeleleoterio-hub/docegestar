# DOCEGESTAR — TECHNICAL REFERENCE DOCUMENT
**Versão:** 1.0 | **Data:** 2026-04-09
**Stack:** React Native + Expo + SQLite + TypeScript

---

## 1. STACK TÉCNICA COMPLETA

| Camada | Tecnologia | Versão |
|---|---|---|
| Runtime | React Native | 0.83.2 |
| Framework UI | React | 19.2.0 |
| Plataforma | Expo | ~55.0.8 |
| Roteamento | Expo Router | ~5.1.0 |
| Linguagem | TypeScript | ~5.9.2 (strict mode) |
| Banco de dados | expo-sqlite | ~16.0.3 |
| Galeria de fotos | expo-image-picker | ~16.1.4 |
| Sistema de arquivos | expo-file-system | ~19.0.2 |
| Gestos | react-native-gesture-handler | ~2.25.0 |
| Safe area | react-native-safe-area-context | 5.4.0 |
| Navegação nativa | react-native-screens | ~4.11.1 |
| Web support | react-native-web | ^0.21.0 |
| Storage async | @react-native-async-storage/async-storage | 2.1.2 |

---

## 2. ESTRUTURA COMPLETA DE ARQUIVOS

```
meu-projeto/
│
├── app/                           (Expo Router — todas as telas)
│   ├── _layout.tsx                Root layout + providers
│   ├── index.tsx                  Gate: onboarding vs dashboard
│   ├── onboarding.tsx             Tela de primeiro acesso
│   │
│   ├── (tabs)/                    Navegação em abas
│   │   ├── _layout.tsx            Configuração das 5 abas + ícones
│   │   ├── dashboard.tsx          Aba 1: Resumo da semana atual
│   │   ├── semana.tsx             Aba 2: Card completo da semana atual
│   │   ├── timeline.tsx           Aba 3: Grade visual 40 semanas
│   │   ├── ferramentas.tsx        Aba 4: Kick Counter + Contrações
│   │   └── config.tsx             Aba 5: Editar nome e DPP
│   │
│   └── semana/
│       └── [week].tsx             Deep link: semana específica (params: week)
│
├── src/
│   │
│   ├── components/
│   │   └── WeekCard.tsx           Componente principal (~535 linhas)
│   │                              Props: { weekNumber: number }
│   │                              Renderiza os 10 módulos do card semanal
│   │
│   ├── data/
│   │   ├── index.ts               Exports centralizados + helper functions
│   │   │                          getWeek(n), getWeeksByTrimester(t),
│   │   │                          getTrimester(n), getCurrentWeek(iso),
│   │   │                          getTrimesterProgress(n)
│   │   │
│   │   ├── weeks/
│   │   │   ├── weeks-01-13.ts     Dados das semanas 1-13 (T1) ~23 KB
│   │   │   ├── weeks-14-27.ts     Dados das semanas 14-27 (T2) ~25 KB
│   │   │   └── weeks-28-40.ts     Dados das semanas 28-40 (T3) ~24 KB
│   │   │
│   │   └── shared/
│   │       ├── avoidFoods.ts      9 alimentos a evitar (todas semanas)
│   │       ├── care.ts            Cuidados por trimestre + base
│   │       ├── exams.ts           Agenda de exames + getExamsForWeek(n)
│   │       ├── nutrients.ts       11 nutrientes com dosagens e fontes
│   │       └── symptoms.ts        Bancos de sintomas por trimestre
│   │
│   ├── db/
│   │   ├── index.ts               getDatabase() + runMigrations() — NÃO ALTERAR
│   │   ├── schema.ts              CREATE TABLE statements das 8 tabelas
│   │   └── webStorage.ts          Fallback para plataforma web
│   │
│   ├── hooks/
│   │   ├── useUserProfile.ts      CRUD user_profile
│   │   ├── useCurrentWeek.ts      Calcula semana atual via DPP
│   │   ├── useWeekData.ts         Wrapper: getWeek(n) → WeekContent
│   │   ├── useWeekCompletion.ts   Toggle semana concluída
│   │   ├── useSymptomChecks.ts    Checkboxes de sintomas
│   │   ├── useCareChecks.ts       Checkboxes de cuidados
│   │   ├── useWeekTracking.ts     Peso, sono, náusea, humor, apetite
│   │   ├── useSpecialMoment.ts    Texto + foto do momento especial
│   │   └── useAllCompletions.ts   Todas as 40 semanas de uma vez (Timeline)
│   │
│   ├── theme/
│   │   ├── colors.ts              Paleta completa (ver Documento 3)
│   │   ├── typography.ts          Escalas tipográficas (ver Documento 3)
│   │   └── index.ts               export { colors, typography }
│   │
│   └── types/
│       └── index.ts               Todas as interfaces TypeScript
│
├── docs/
│   ├── master/                    Documentação mestre (este diretório)
│   ├── stories/
│   │   ├── 2.1.story.md          Story: Onboarding (Done)
│   │   ├── 2.2.story.md          Story: WeekCard 10 módulos (Done)
│   │   ├── 2.3.story.md          Story: Timeline (Done)
│   │   └── 2.4.story.md          Story: Ferramentas (Done)
│   └── SESSION-HANDOFF.md        Handoff entre sessões de desenvolvimento
│
├── __tests__/                     Diretório existe mas vazio (DT-001)
├── assets/                        Ícones, splash screen
├── app.json                       Configuração Expo (name, slug, version)
├── package.json                   Dependências e scripts
├── tsconfig.json                  TypeScript config (strict: true)
└── .env / .env.example            Variáveis de ambiente (futuro)
```

---

## 3. BANCO DE DADOS — SCHEMA COMPLETO

**Arquivo:** `src/db/schema.ts`
**Banco:** `docegestar.db` (SQLite local)
**Inicialização:** `runMigrations()` executa em cada `getDatabase()` (idempotente)

```sql
-- Perfil do usuário (sempre 1 registro, id fixo = 1)
CREATE TABLE IF NOT EXISTS user_profile (
  id INTEGER PRIMARY KEY DEFAULT 1,
  name TEXT,
  due_date TEXT,                          -- ISO: YYYY-MM-DD
  created_at TEXT DEFAULT (datetime('now'))
);

-- Acompanhamento semanal (1 registro por semana, UPSERT)
CREATE TABLE IF NOT EXISTS weekly_tracking (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  week INTEGER NOT NULL,
  weight_kg REAL,
  sleep_hours REAL,
  nausea TEXT CHECK(nausea IN ('sem','leve','media','forte')),
  humor TEXT CHECK(humor IN ('bem','oscilando','dificil')),
  appetite TEXT CHECK(appetite IN ('normal','pouco','muito')),
  date_filled TEXT,
  updated_at TEXT DEFAULT (datetime('now')),
  UNIQUE(week)
);

-- Checkboxes de sintomas (1 linha por sintoma por semana)
CREATE TABLE IF NOT EXISTS symptom_checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  week INTEGER NOT NULL,
  symptom_key TEXT NOT NULL,
  checked INTEGER DEFAULT 0,
  UNIQUE(week, symptom_key)
);

-- Checkboxes de cuidados (1 linha por cuidado por semana)
CREATE TABLE IF NOT EXISTS care_checks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  week INTEGER NOT NULL,
  care_key TEXT NOT NULL,
  checked INTEGER DEFAULT 0,
  UNIQUE(week, care_key)
);

-- Conclusão de semana (PK = week)
CREATE TABLE IF NOT EXISTS week_completion (
  week INTEGER PRIMARY KEY,
  completed INTEGER DEFAULT 0,
  date_label TEXT
);

-- Momento especial (1 por semana, UPSERT)
CREATE TABLE IF NOT EXISTS special_moments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  week INTEGER NOT NULL,
  text_content TEXT,
  photo_uri TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  UNIQUE(week)
);

-- Sessões de contador de chutes
CREATE TABLE IF NOT EXISTS kick_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  week INTEGER NOT NULL,
  kick_count INTEGER NOT NULL,
  duration_seconds INTEGER NOT NULL,
  recorded_at TEXT DEFAULT (datetime('now'))
);

-- Registros de contrações
CREATE TABLE IF NOT EXISTS contraction_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  week INTEGER NOT NULL,
  duration_seconds INTEGER NOT NULL,
  interval_seconds INTEGER,
  intensity TEXT CHECK(intensity IN ('leve','media','forte')),
  recorded_at TEXT DEFAULT (datetime('now'))
);
```

**Convenção:** snake_case no banco → camelCase no TypeScript
**Persistência:** Sempre UPSERT com `ON CONFLICT` onde aplicável

---

## 4. TIPOS TYPESCRIPT COMPLETOS

**Arquivo:** `src/types/index.ts`

```typescript
// Tipos primitivos
export type Trimester = 1 | 2 | 3
export type BabyStage = 'embrião' | 'feto'
export type NauseaLevel = 'sem' | 'leve' | 'media' | 'forte'
export type HumorLevel = 'bem' | 'oscilando' | 'dificil'
export type AppetiteLevel = 'normal' | 'pouco' | 'muito'

// Dados estáticos do bebê por semana
export interface BabyDevelopment {
  stage: BabyStage
  sizeCm: string         // ex: "6.5" ou "—" se não disponível
  weightG: string        // ex: "14" ou "—"
  comparison: string     // ex: "Uva", "Abacate"
  heartbeatBpm: string   // ex: "140-160" ou "—"
  milestones: string[]   // 5-7 marcos de desenvolvimento
}

// Nutriente com dosagem e fontes
export interface NutrientEntry {
  name: string           // ex: "Ácido Fólico"
  dose?: string          // ex: "400-800 mcg/dia"
  foods: string[]        // ex: ["Feijão", "Brócolis", "Lentilha"]
}

// Exame do pré-natal
export interface ExamEntry {
  name: string           // ex: "Ultrassom morfológico"
  notes?: string         // ex: "Entre 11-14 semanas"
}

// Conteúdo completo de uma semana (dados estáticos)
export interface WeekContent {
  weekNumber: number     // 1-40
  trimester: Trimester
  baby: BabyDevelopment
  symptoms: string[]     // 6-8 sintomas selecionados do banco do trimestre
  care: string[]         // cuidados base + específicos do trimestre
  nutrients: NutrientEntry[]  // 6 nutrientes prioritários
  exams: ExamEntry[]
  curiosities: string[]  // 3 fatos curiosos
  weeklyTip: string      // dica prática da semana
  motivationalPhrase: string
}

// Dados pessoais da gestante por semana (persistidos)
export interface WeeklyTracking {
  week: number
  weightKg?: number
  sleepHours?: number
  nausea?: NauseaLevel
  humor?: HumorLevel
  appetite?: AppetiteLevel
  dateFilled?: string
}

// Perfil do usuário
export interface UserProfile {
  id: number
  name?: string
  dueDate?: string       // ISO: YYYY-MM-DD
  createdAt: string
}

// Momento especial da semana
export interface SpecialMoment {
  week: number
  textContent?: string
  photoUri?: string      // URI local da foto
  createdAt: string
}

// Status de conclusão de uma semana
export interface WeekCompletion {
  week: number
  completed: boolean
  dateLabel?: string
}
```

---

## 5. HOOKS — CONTRATOS E RESPONSABILIDADES

```typescript
// ─── Perfil e semana atual ─────────────────────────────────────────

// Retorna número da semana atual (1-40) baseado na DPP do SQLite
// ATENÇÃO: retorna 1 durante loading (DT-004)
useCurrentWeek(): number

// CRUD do perfil do usuário
useUserProfile(): {
  profile: UserProfile | null,
  saveProfile: (name: string | null, dueDateISO: string) => Promise<void>
}

// ─── Conteúdo semanal ──────────────────────────────────────────────

// Retorna dados estáticos da semana N (do src/data/)
useWeekData(weekNumber: number): WeekContent | undefined

// ─── Persistência por semana ───────────────────────────────────────

// Toggle de conclusão da semana
useWeekCompletion(week: number): {
  completed: boolean,
  toggleCompletion: (state: boolean) => void
}

// Checkboxes de sintomas — chave = texto do sintoma
useSymptomChecks(week: number): {
  checks: Record<string, boolean>,
  toggleSymptom: (key: string, state: boolean) => void
}

// Checkboxes de cuidados — chave = texto do cuidado
useCareChecks(week: number): {
  checks: Record<string, boolean>,
  toggleCare: (key: string, state: boolean) => void
}

// Métricas pessoais da semana
useWeekTracking(week: number): {
  tracking: WeeklyTracking | null,
  saveTracking: (data: Partial<WeeklyTracking>) => Promise<void>
}

// Momento especial (texto + foto)
useSpecialMoment(week: number): {
  moment: SpecialMoment | null,
  saveMoment: (text: string, photoUri: string | null) => Promise<void>
}

// ─── Timeline ──────────────────────────────────────────────────────

// Busca completion de todas as 40 semanas de uma vez
useAllCompletions(): Record<number, boolean>  // { 1: false, 2: true, ... }
```

---

## 6. HELPER FUNCTIONS — src/data/index.ts

```typescript
// Retorna dados de uma semana específica
getWeek(weekNumber: number): WeekContent | undefined

// Retorna todas as semanas de um trimestre
getWeeksByTrimester(trimester: Trimester): WeekContent[]

// Retorna o trimestre de uma semana (1: 1-13, 2: 14-27, 3: 28-40)
getTrimester(weekNumber: number): Trimester

// Calcula semana atual a partir de DPP ISO
// Formula: 40 - Math.round((dueDate - today) / (7 * 24 * 60 * 60 * 1000))
// Clamp: min 1, max 40
getCurrentWeek(dueDateISO: string): number

// Retorna progresso dentro do trimestre (0-100)
getTrimesterProgress(weekNumber: number): number
```

---

## 7. CONVENÇÕES DE CÓDIGO

```typescript
// Imports do tema
import { colors, typography } from '../src/theme'

// SQL sempre parametrizado (nunca interpolação de strings)
db.runAsync('INSERT INTO table (col) VALUES (?)', [value])

// Pattern de cancelamento em hooks async
useEffect(() => {
  let cancelled = false
  async function load() {
    const data = await fetchData()
    if (!cancelled) setState(data)
  }
  load()
  return () => { cancelled = true }
}, [week])

// UPSERT com ON CONFLICT (nunca INSERT simples para dados únicos)
INSERT INTO weekly_tracking (week, weight_kg) VALUES (?, ?)
ON CONFLICT(week) DO UPDATE SET weight_kg = excluded.weight_kg

// snake_case no banco → camelCase no TypeScript
// banco: due_date, weight_kg
// TS:    dueDate, weightKg
```

---

## 8. SCRIPTS E COMANDOS

```bash
# Desenvolvimento
npm start                          # Inicia Expo dev server
npm run android                    # Abre no emulador Android
npm run ios                        # Abre no simulador iOS
npm run web                        # Abre no navegador

# Qualidade
npm run typecheck                  # tsc --noEmit (deve passar com zero erros)
npm run lint                       # ESLint (não configurado — DT-002)
npm run test                       # Jest (não configurado — DT-001)

# Deploy (via @devops)
npx expo export --platform web    # Gera a pasta dist/ para deploy
# Push no master → Cloudflare auto-deploy
```

---

## 9. CONFIGURAÇÃO EXPO (app.json)

```json
{
  "expo": {
    "name": "DoceGestar",
    "slug": "doce-gestar",
    "version": "1.0.0",
    "assetBundlePatterns": ["**/*"],
    "plugins": ["expo-router"],
    "scheme": "docegestar"
  }
}
```

---

## 10. PONTOS DE ATENÇÃO TÉCNICA

1. **src/db/index.ts — NÃO ALTERAR:** `runMigrations()` é idempotente e roda em cada inicialização. Alterar pode quebrar dados existentes de usuários.

2. **useCurrentWeek default=1:** Durante o carregamento assíncrono do SQLite, o hook retorna 1. Telas que dependem dele devem renderizar estado de loading até o valor real chegar.

3. **Expo Router 5 com tabs:** A estrutura `(tabs)` é obrigatória para o layout de abas funcionar. Não mover arquivos sem entender o file-based routing.

4. **SQLite no web (webStorage.ts):** A plataforma web não suporta SQLite nativo. O arquivo `webStorage.ts` provê um fallback. O deploy no Cloudflare usa esta camada.

5. **Photo URI persistence:** `expo-image-picker` retorna URIs temporárias em alguns dispositivos. O `useSpecialMoment` salva a URI, mas em builds de produção pode ser necessário copiar o arquivo para um local permanente via `expo-file-system`.

---

> **Nota de Atualização:** Atualizar sempre que houver mudanças de stack, novas tabelas no banco, novos hooks, ou decisões técnicas relevantes.
