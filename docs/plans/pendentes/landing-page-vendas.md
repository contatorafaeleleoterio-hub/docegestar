# Plano — Página de Vendas DoceGestar

**Status:** PENDENTE — Aprovado, aguardando execução  
**Data de criação:** 2026-04-16  
**Prioridade:** Alta — executar em paralelo com G-5 (Play Store setup)

---

## Context

O domínio `docegestar.com.br` está ativo e servindo o build web do Expo, fazendo o visitante cair direto no onboarding. Com a publicação na Play Store se aproximando, o domínio principal deve exibir uma landing page de marketing profissional.

**Objetivo:** Trocar a raiz de `docegestar.com.br` de app/onboarding → página de vendas. Quando o app estiver publicado, basta adicionar o link da Play Store.

---

## Estratégia

Criar `landing/` com HTML estático independente. Cloudflare Pages passa a servir `landing/` em vez de `dist/`. O app Expo continua intacto em `dist/` para testes via `docegestar.pages.dev`.

---

## Arquivos a Criar/Modificar

| Arquivo | Ação |
|---------|------|
| `meu-projeto/landing/index.html` | CRIAR — página de vendas completa |
| Cloudflare Pages → Build output directory | ALTERAR — de `dist` para `landing` (via Windows MCP) |

---

## Conteúdo da Landing Page

### Estrutura

```
─ <head>   Meta SEO + OG + fonts (Google Fonts: Nunito)
─ <nav>    Logo DoceGestar + espaço para botão Play Store (futuro)
─ HERO     Headline + subtítulo + mockup + CTA
─ FEATURES 5 cards (acompanhamento, bebê, notificações, ferramentas, dicas)
─ FOOTER   Copyright + Política de Privacidade | Contato
```

### Textos chave

- **Headline:** "Acompanhe cada momento da sua gravidez"
- **Subtítulo:** "Semana a semana, com dicas personalizadas, lembretes de consultas e ferramentas pensadas para você e seu bebê."
- **CTA (agora):** "Em breve no Google Play" (badge cinza/desabilitado)
- **CTA (pós-lançamento):** Badge clicável com link real da Play Store

### Design

- Primary: `#b30064` | Secondary: `#00637f` | BG: `#fbf9f5`
- Glassmorphism nos cards de features
- Font: Nunito (Google Fonts, weights 400 / 600 / 700 / 800)
- Totalmente responsiva (mobile-first)
- Sem JavaScript — HTML + CSS puro

---

## Execução — Passos

### Passo 1 — @dev: Criar `landing/index.html`
Arquivo estático completo com todas as seções, inline CSS, fontes Google Fonts, conteúdo em PT-BR.

### Passo 2 — @devops: Push para GitHub
```bash
git add landing/
git commit -m "feat: landing page de vendas docegestar.com.br"
git push
```

### Passo 3 — GESTOR: Atualizar Cloudflare Pages (via Windows MCP)
1. Navegar: `https://dash.cloudflare.com/6b8c90369455a504e560d9fac74eea0c/pages/view/docegestar/settings/builds-and-deployments`
2. Alterar **"Build output directory"** de `dist` → `landing`
3. Trigger novo deploy
4. Verificar `https://docegestar.com.br` mostrando a landing page

---

## Verificação

1. `https://docegestar.com.br` → exibe a landing page (não o onboarding)
2. `https://docegestar.pages.dev` → ainda serve o app Expo
3. Mobile → layout responsivo funciona
4. Badge "Em breve no Google Play" visível no hero

---

## Pós-lançamento Play Store

Editar `landing/index.html`: substituir badge desabilitado pelo link real da Play Store — 1 linha.
