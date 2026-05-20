# 01 — DoceGestar | Visão do Produto

> Versão **resumo executivo** (2026-05-20). Estado real do app, sem entrar no técnico. Para detalhes técnicos ver `02-TECHNICAL-REFERENCE.md`.

---

## Proposta de valor

**App gestacional brasileiro, em PT-BR nativo, gratuito, offline-first, com conteúdo editorial verificado das 40 semanas.**

Diferenciais vs. concorrentes (Gravidez+, BabyCenter, Ovia, Canguru):

- Conteúdo 100% em português brasileiro (não traduzido)
- Fruta 3D ilustrada para cada semana (assets próprios)
- Feed estilo revista digital (snap scroll, com bookmark + nota por card)
- Onboarding personalizado (tipo de gestação, parceiro, primeiro filho, nome do bebê)
- Glassmorphism + paleta magenta + lavanda — visual diferenciado
- Sem login obrigatório, sem paywall, sem anúncios (no MVP)

---

## Público-alvo

| Persona | Perfil |
|---------|--------|
| **Mãe primeira viagem** | 25–35 anos, ansiosa, quer conteúdo curado e confiável semana a semana |
| **Mãe veterana** | 28–40 anos, já passou por gestação, quer ferramentas práticas (kick counter, contrações, consultas) |
| **Parceiro(a)** | Quer acompanhar e interagir — onboarding inclui opção "parceiro" |

---

## Navegação — 4 abas + telas empilhadas

**Tab bar flutuante (pílula escura no rodapé, animação spring):**

| # | Aba | O que entrega |
|---|-----|---------------|
| 1 | 🏠 **Início** | Painel diário: fruta 3D da semana, marco clínico, carrossel, ações rápidas |
| 2 | 🧭 **Explorar** | Feed revista digital — cards snap scroll (hero, stat, lista, checklist, pergunta, faq) por semana |
| 3 | 🔧 **Ferramentas** | Kick counter, timer de contrações, sintomas (visual + gráfico) |
| 4 | 👤 **Perfil** | Diário, plano de parto, álbum, enxoval, consultas, exames, vitaminas, configurações |

**Telas empilhadas (acessadas a partir das abas):**
- Bebê semanal (3D + marcos)
- Saúde da mãe
- Diário (mood + texto + foto)
- Plano de parto, Enxoval, Consultas, Exames, Vitaminas
- Álbum (fotos da barriga), Artigos, Chat
- Kick Counter, Timer de Contrações, Sintomas
- Timeline 40 semanas

---

## Features implementadas (✅ Done no MVP)

### Conteúdo editorial
- ✅ Conteúdo semana a semana (40 semanas), reference docs verificados
- ✅ Feed Explorar com cards snap (~10 cards/semana: hero, 2 stats, marcos, sintomas, nutrientes, alerta, checklist, pergunta, FAQ)
- ✅ Fruta 3D 1:1 com cada semana (S3–S40) + célula (S1–S2)
- ✅ Bookmark + nota por card (persistido em SQLite)
- ✅ Marco clínico em destaque no Painel Início

### Ferramentas
- ✅ Kick Counter (start/stop, histórico, vibração)
- ✅ Timer de contrações (duração, intervalo, intensidade, detecção 3-1-1)
- ✅ Tracker de sintomas (checkboxes + gráfico 4 semanas)

### Saúde e organização
- ✅ Consultas pré-natais (CRUD + lembrete via notificação local)
- ✅ Vitaminas / medicamentos (lista persistida)
- ✅ Exames laboratoriais
- ✅ Plano de parto editável
- ✅ Enxoval com checklist
- ✅ Diário (mood picker + texto + foto)
- ✅ Álbum (foto da barriga)
- ✅ Timeline visual das 40 semanas (3 trimestres)

### Onboarding
- ✅ Welcome + login (Google/Apple opcional)
- ✅ Profile (nome, parceiro/mãe, primeiro filho)
- ✅ Due date (DPP por Naegele ou manual)
- ✅ Plans stub (free / premium — sem cobrança no MVP)
- ✅ Modal de parabéns com confete

### Infraestrutura
- ✅ Offline-first (SQLite nativo + Web Storage no preview web)
- ✅ Notificações locais (Expo Notifications)
- ✅ Push contextual (lembretes por estado do app)
- ✅ Daily streak counter (engajamento)
- ✅ Multiplataforma — Android (foco), iOS (futuro), Web (preview)

---

## Features no backlog (pós-lançamento)

| Feature | Por quê deixar para depois |
|---------|----------------------------|
| Comunidade/fórum de mães | Backend pesado, moderação complica |
| Chat com profissional | Requer rede de profissionais + monetização |
| Visualização 3D fetal interativa | Custo alto de criação dos assets |
| Rastreamento de peso | Pode entrar v1.1 — baixo custo |
| Busca de nomes de bebê | Nice-to-have |
| Suporte pós-parto | Outro app praticamente |
| Notificações de marcos gestacionais | Backlog |
| Agendamento automático de exames por trimestre | Backlog |
| Paywall + in-app purchase | Pós-validação de demanda |

---

## Estado do lançamento

| Etapa | Status |
|-------|--------|
| Conta Google Play Developer | ✅ Criada |
| EAS Build Android (APK preview) | ✅ Gerado e testado |
| Bugs de boot/crash | ✅ Resolvidos (FX-1, FX-2) |
| Responsividade + safe-area | ✅ Resolvido |
| Conteúdo 40 semanas | ⏳ S25–S40 em geração via Manus IA (16 restantes) |
| Store listing (screenshots + textos) | ✅ Pronto |
| Privacy policy hospedada | ⏳ docegestar.com.br (DNS ativo) |
| Submit AAB para revisão Play Store | ⏳ Agendado para 2026-06-01 (cota EAS Free renova) |

**Lançamento estimado:** 1ª semana de junho/2026.

---

## Débitos técnicos conhecidos (não-bloqueantes)

- ESLint não instalado (typecheck cobre o essencial)
- ~22 erros de tipo pré-existentes em GestationCounter / DGIcon / ferramentas / perfil (estilísticos, não quebram runtime)
- Algumas telas (enxoval, plano de parto) ainda em `useState` — promover para SQLite quando houver demanda

---

## Métricas de sucesso pós-lançamento

| Métrica | Meta v1 |
|---------|---------|
| Downloads no 1º mês | 1.000+ |
| Rating Play Store | ≥ 4.3 |
| DAU/MAU | ≥ 25% |
| Retenção D7 | ≥ 30% |
| Conclusão do onboarding | ≥ 70% |
| Streak de 3+ dias | ≥ 15% dos usuários |
