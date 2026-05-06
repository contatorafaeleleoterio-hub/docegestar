# DOCEGESTAR — TECHNICAL REFERENCE DOCUMENT
**Versão:** 2.0 | **Data:** 2026-05-05
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
| Banco de dados | expo-sqlite | ~55.0.15 |
| Galeria de fotos | expo-image-picker | ~55.0.18 |
| Notificações | expo-notifications | ~55.0.19 |
| Gestos | react-native-gesture-handler | ~2.25.0 |
| Safe area | react-native-safe-area-context | 5.4.0 |
| Navegação nativa | react-native-screens | ~4.11.1 |
| Web support | react-native-web | ^0.21.0 |
| Storage async | @react-native-async-storage/async-storage | 2.1.2 |
| Gradiente | expo-linear-gradient | — |

---

## 2. ESTRUTURA COMPLETA DE ARQUIVOS

```
meu-projeto/
│
├── app/                           (Expo Router — todas as telas)
│   ├── _layout.tsx                Root layout + providers
│   ├── index.tsx                  Gate: onboarding vs dashboard
│   ├── onboarding.tsx             Tela de primeiro acesso (5 steps)
│   │
│   ├── (tabs)/                    Navegação em abas (4 abas)
│   │   ├── _layout.tsx            Custom tab bar animado
│   │   ├── dashboard.tsx          Aba 1: Início — resumo + WeekPeekCard
│   │   ├── explorar.tsx           Aba 2: Revista — FlatList de RevistaCard
│   │   ├── ferramentas.tsx        Aba 3: Kick Counter + Contrações + Tracker
│   │   └── perfil.tsx             Aba 4: Editar perfil + configurações
│   │
│   ├── semana/
│   │   └── [week].tsx             Deep link: semana específica
│   ├── semana-detail.tsx          Semana atual (atalho do dashboard)
│   └── timeline-detail.tsx        Timeline expandida
│
├── src/
│   ├── components/
│   │   ├── WeekCard.tsx           Card completo da semana (10 módulos)
│   │   ├── RevistaCard.tsx        Feed card com 6 layouts (519 linhas)
│   │   ├── WeekPeekCard.tsx       Preview da revista no dashboard
│   │   └── QuickLogFAB.tsx        FAB de registro rápido
│   │
│   ├── utils/
│   │   ├── revistaAdapter.ts      buildRevistaFeed(WeekContent) → RevistaCard[]
│   │   ├── fruitEmoji.ts          getFruitEmoji(comparison) → emoji
│   │   ├── date.ts                parseDateBR, toISO, isDateOutOfRange
│   │   ├── supabase.ts            Supabase client (nativo)
│   │   └── supabase.web.ts        Supabase client (web fallback)
│   │
│   ├── data/
│   │   ├── index.ts               getWeek, getTrimester, getTrimesterProgress,
│   │   │                          getCurrentWeek, getCurrentDayInWeek,
│   │   │                          getWeeksByTrimester, getExamsForWeek
│   │   ├── weeks/
│   │   │   ├── weeks-01-13.ts     Semanas 1–13 (T1)
│   │   │   ├── weeks-14-27.ts     Semanas 14–27 (T2)
│   │   │   └── weeks-28-40.ts     Semanas 28–40 (T3)
│   │   └── shared/
│   │       ├── avoidFoods.ts      Alimentos a evitar
│   │       ├── care.ts            Cuidados por trimestre + DAILY_TIPS
│   │       ├── exams.ts           Agenda de exames
│   │       ├── nutrients.ts       Nutrientes prioritários
│   │       └── symptoms.ts        Bancos de sintomas T1/T2/T3
│   │
│   ├── db/
│   │   ├── index.ts               getDatabase() + migrações v1–v6
│   │   ├── schema.ts              CREATE TABLE (base — v2+ em index.ts)
│   │   └── webStorage.ts          Fallback AsyncStorage para web
│   │
│   ├── hooks/
│   │   ├── useUserProfile.ts      getProfile(), saveProfile()
│   │   ├── useCurrentWeek.ts      useCurrentWeek() → number | null
│   │   ├── useWeekData.ts         useWeekData(n) → WeekContent | undefined
│   │   ├── useWeekCompletion.ts   toggleCompletion, dateLabel
│   │   ├── useSymptomChecks.ts    checks, toggleSymptom
│   │   ├── useCareChecks.ts       checks, toggleCare
│   │   ├── useWeekTracking.ts     tracking, saveTracking
│   │   ├── useSpecialMoment.ts    moment, saveMoment
│   │   ├── useAllCompletions.ts   Record<number, boolean> (40 semanas)
│   │   ├── useStreak.ts           streak, isMilestone
│   │   ├── useNotifications.ts    scheduleNotification, requestPermission
│   │   ├── useNotificationSettings.ts  settings, saveSettings
│   │   ├── usePrenatalAppointments.ts  appointments, saveAppointment
│   │   └── useContextualPush.ts   push contextual baseado em semana
│   │
│   ├── theme/
│   │   ├── colors.ts              Paleta completa (primary #DB2777)
│   │   ├── typography.ts          h1–h3, body, bodySmall, caption, label
│   │   ├── spacing.ts             Escala numérica {1:4, 2:8, 3:12...}
│   │   ├── borderRadius.ts        {xl:12, '2xl':16, full:9999...}
│   │   ├── shadows.ts             shadowEditorial, shadowTactile, shadowAmbient
│   │   └── index.ts               Export centralizado
│   │
│   └── types/
│       └── index.ts               Todas as interfaces TypeScript
│
├── docs/                          Documentação do projeto
├── vercel.json                    Config deploy web (buildCommand: expo export -p web)
├── eas.json                       Config EAS Build (dev/preview/production)
├── app.json                       Expo config (web.output: "single")
├── package.json                   scripts: start, build:web, deploy, typecheck
└── tsconfig.json                  strict: true
```

---

## 3. ABAS (TABS)

| Nome | Título | Ícone | Descrição |
|------|--------|-------|-----------|
| dashboard | Início | home | Resumo semanal + WeekPeekCard + Streak |
| explorar | Explorar | compass | Revista Feed — FlatList de RevistaCard |
| ferramentas | Ferramentas | construct | Kick Counter + Contrações + Sintomas |
| perfil | Perfil | person | Editar nome/DPP + Configurações |

> **Nota:** `semana.tsx`, `config.tsx` e `timeline.tsx` existem mas não são abas ativas no `_layout.tsx` atual.

---

## 4. BANCO DE DADOS — SCHEMA + MIGRAÇÕES

**Schema base** (`src/db/schema.ts`) + **migrações** (`src/db/index.ts`):

```sql
-- v1 (schema base)
user_profile      (id, name, due_date, created_at)
weekly_tracking   (id, week, weight_kg, sleep_hours, nausea, humor, appetite, date_filled, updated_at)
symptom_checks    (id, week, symptom_key, checked)
care_checks       (id, week, care_key, checked)
week_completion   (week, completed, date_label)
special_moments   (id, week, text_content, photo_uri, created_at)
kick_records      (id, week, kick_count, duration_seconds, recorded_at)
contraction_records (id, week, duration_seconds, interval_seconds, intensity, recorded_at)

-- v2 (ALTER TABLE — colunas adicionadas ao user_profile)
gestationType TEXT        -- 'única' | 'gêmeos' | 'trigêmeos'
firstChild    INTEGER     -- 1 = sim, 0 = não
babyName      TEXT

-- v3
saved_tips (id, week, tip_text, category, saved_at)

-- v4
notification_settings (id, type TEXT UNIQUE, enabled INTEGER, default_time TEXT)

-- v5
prenatal_appointments (id, type, appointment_date, appointment_time, notes, reminder_offset, created_at)

-- v6
daily_logs (log_date TEXT PRIMARY KEY)
```

---

## 5. TIPOS TYPESCRIPT PRINCIPAIS

```typescript
// Tipos primitivos
type Trimester = 1 | 2 | 3
type BabyStage = 'embrião' | 'feto'
type NauseaLevel = 'sem' | 'leve' | 'media' | 'forte'
type HumorLevel = 'bem' | 'oscilando' | 'dificil'
type AppetiteLevel = 'normal' | 'pouco' | 'muito'
type RevistaCardLayout = 'hero' | 'stat' | 'lista' | 'checklist' | 'pergunta' | 'faq'

// Conteúdo enriquecido de uma semana
interface WeekContent {
  weekNumber: number; trimester: Trimester
  baby: BabyDevelopment       // sizeCm, weightG, comparison, heartbeatBpm, milestones
  symptoms: string[]
  care: string[]
  nutrients: NutrientEntry[]  // name, dose?, foods[]
  exams: ExamEntry[]
  curiosities: string[]
  weeklyTip: string; motivationalPhrase: string
  // campos enriquecidos (opcionais)
  maternalChanges?: string[]
  warningSignals?: WarningSigns[]   // description, severity: 'urgent'|'monitor'
  dailyFocus?: DailyFocus[]         // day, title, tip
  weeklyChecklist?: string[]
  mythBuster?: MythBuster           // myth, fact
}

// Perfil expandido
interface UserProfile {
  id: number; name?: string; dueDate?: string; createdAt: string
  gestationType?: string | null   // 'única' | 'gêmeos' | 'trigêmeos'
  firstChild?: number | null      // 1 = sim, 0 = não
  babyName?: string | null
}

// Card da Revista
interface RevistaCard {
  id: string; layout: RevistaCardLayout
  chapter: string; chapterColor: string; title: string
  subtitle?: string; items?: string[]; question?: string
  myth?: string; fact?: string
  statValue?: string; statLabel?: string
  emoji?: string; cta?: string
}
```

---

## 6. HELPER FUNCTIONS — src/data/index.ts

```typescript
getWeek(n: number): WeekContent | undefined
getWeeksByTrimester(t: Trimester): WeekContent[]
getTrimester(n: number): Trimester          // 1-13→1, 14-27→2, 28-40→3
getCurrentWeek(dueDateISO: string): number  // clamped 1–40
getCurrentDayInWeek(dueDateISO: string): number  // 0–6
getTrimesterProgress(n: number): number     // 0–100

// src/utils/revistaAdapter.ts
buildRevistaFeed(week: WeekContent): RevistaCard[]  // 10–11 cards
```

---

## 7. DEPLOY

### Web (Vercel)
```bash
npm run build:web        # npx expo export -p web → dist/
# vercel.json configurado: buildCommand, outputDirectory, SPA rewrites
```

### Mobile (EAS)
```bash
eas build --profile preview     # APK interno (Android)
eas build --profile production  # App Bundle → Play Store
eas submit --platform android   # Submit automático
```

---

## 8. CONVENÇÕES DE CÓDIGO

```typescript
// spacing usa chaves numéricas: spacing[4] = 16px, spacing[6] = 24px
// NÃO usar spacing.lg, spacing.md etc. — não existem

// Arquivos com (tabs) no path — usar bash para escrever, não o Edit tool
// (parênteses causam truncamento no Write tool)

// Pattern cancelamento async em hooks:
useEffect(() => {
  let cancelled = false
  async function load() { const d = await fetch(); if (!cancelled) setState(d) }
  load()
  return () => { cancelled = true }
}, [dep])

// UPSERT obrigatório para dados únicos por semana:
INSERT INTO t (week, col) VALUES (?,?) ON CONFLICT(week) DO UPDATE SET col=excluded.col
```

---

## 9. PONTOS DE ATENÇÃO

1. **`src/db/index.ts` — NÃO ALTERAR a ordem das migrações.** Acrescentar sempre ao final como v7, v8 etc.
2. **`useCurrentWeek()` retorna `null`** durante loading (não `1` como na v1). Telas devem tratar `null`.
3. **Arquivos em `app/(tabs)/`** — usar `bash` para escrita direta; o Edit/Write tool trunca arquivos com parênteses no path.
4. **`webStorage.ts`** — o fallback web usa AsyncStorage. Funciona para demo; não suporta queries complexas com JOIN.
5. **`expo-notifications`** — no-op na web (sem crash). Não bloquear UX por ausência de permissão.
