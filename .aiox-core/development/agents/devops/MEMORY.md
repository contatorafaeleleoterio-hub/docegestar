# DevOps Agent Memory (Gage)

## Active Patterns
<!-- Current, verified patterns used by this agent -->

### Local App Health Check — Token-Efficient Protocol

**Regra:** NUNCA usar screenshot (`State-Tool use_vision=true`) para verificar se o app local está rodando.

**Método correto (zero tokens de visão):**
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:8081
# Retorna: "200" (online) ou "000" (offline)
```

**Protocolo de uso ao fim/início de sessão:**
1. Rodar `npm run web` em background (`run_in_background: true`)
2. Aguardar 20s para o Metro compilar
3. Executar o curl acima — custo: ~5 tokens
4. Se retornar `200`: informar ao usuário "App online em http://localhost:8081"
5. Se retornar `000`: aguardar mais 15s e repetir (máx. 2 tentativas)
6. Se falhar 2x: reportar erro e sugerir verificação manual

**Por que não screenshot:** `State-Tool use_vision=true` consome centenas de tokens por imagem. O curl resolve com < 10 tokens totais.

**Plataforma:** Usar sempre via `Bash` (não PowerShell — Node não está no PATH do PS no Windows).

### Mobile Preview Protocol — Seletor de Dispositivos (zero tokens de visão)

**Após confirmar que o app está online (curl = 200), abrir Mobile Preview:**

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --new-window \
  --window-size=900,820 \
  --window-position=100,0 \
  "file:///C:/Users/USUARIO/Desktop/GESTANTE/meu-projeto/mobile-preview.html"
```

**O que é `mobile-preview.html`:**
- Arquivo HTML estático na raiz do projeto
- Mostra o app em iframe com frame de celular
- Toolbar com botões de troca rápida de dispositivo
- Auto-escala para caber na tela sem overflow
- Badge de status online/offline (sem curl manual)

**Dispositivos disponíveis:** iPhone SE · 14 · 14 Pro · 14 Max / S24 · S24 Ultra · Pixel 8

**Após lançar:** informar ao usuário "Mobile Preview aberto — use os botões na toolbar para trocar entre dispositivos."

**NUNCA:** tirar screenshot, usar State-Tool vision, ou qualquer verificação visual pelo assistente.

### Exclusive Authority
- ONLY agent authorized for `git push`, `gh pr create`, `gh pr merge`
- ONLY agent for MCP infrastructure management
- Pre-push quality gates are MANDATORY

### Quality Gates (Pre-Push)
1. `npm run lint` — ESLint must PASS
2. `npm test` — Jest must PASS
3. CodeRabbit review — 0 CRITICAL issues
4. Story status = "Done" or "Ready for Review"
5. No uncommitted changes, no merge conflicts

### Git Conventions
- Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:`
- Branch patterns: `feat/*`, `fix/*`, `docs/*`
- Semantic versioning: MAJOR.MINOR.PATCH

### MCP Infrastructure
- Docker MCP Gateway on port 8080
- Servers: context7, desktop-commander, playwright, exa
- Config: `~/.docker/mcp/catalogs/docker-mcp.yaml`
- Known bug: Docker MCP secrets don't interpolate (use hardcoded values)

### Repository Detection
- Uses `repository-detector.js` for dynamic context
- Framework-dev vs project-dev mode detection

## Promotion Candidates
<!-- Patterns seen across 3+ agents — candidates for CLAUDE.md or .claude/rules/ -->
<!-- Format: - **{pattern}** | Source: {agent} | Detected: {YYYY-MM-DD} -->

## Archived
<!-- Patterns no longer relevant — kept for history -->
<!-- Format: - ~~{pattern}~~ | Archived: {YYYY-MM-DD} | Reason: {reason} -->
