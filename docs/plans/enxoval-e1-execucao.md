# Enxoval Completo - Plano de Execucao E-1

**Data:** 2026-05-22  
**Status:** Em execucao - base funcional entregue em 2026-05-22  
**Origem:** 6 prototipos hi-fi HTML (`code1`-`code6`) + `handoff_modulo_enxoval_claude_code.md`  
**Supersede:** `docs/plans/pendentes/enxoval-completo-spec.md`

---

## 1. Objetivo

Transformar a tela unica `app/nursery.tsx` no modulo **Enxoval** completo, com persistencia SQLite real, navegacao em stack e cobertura das 6 telas principais do fluxo.

## 2. Mapa Prototipo -> Tela do app

| Prototipo | Tela | Rota |
|-----------|------|------|
| `code6.html` | Hub principal | `app/enxoval/index.tsx` |
| `code3.html` | Detalhe do item | `app/enxoval/item/[id].tsx` |
| `code1.html` | Adicionar item | `app/enxoval/add.tsx` |
| `code5.html` | Guia pratico | `app/enxoval/guide.tsx` |
| `code4.html` | Financas | `app/enxoval/finances.tsx` |
| `code2.html` | Compartilhar | `app/enxoval/share.tsx` |

## 3. Estado atual do modulo

- `app/enxoval/index.tsx` ativo como hub principal do modulo.
- `app/enxoval/add.tsx` funcional com criacao de item no SQLite.
- `app/enxoval/item/[id].tsx` funcional com edicao, exclusao e abertura de link.
- `app/enxoval/guide.tsx` funcional com accordion por categoria e acoes sobre itens existentes.
- `app/enxoval/finances.tsx` funcional com orcamento persistido e metricas derivadas.
- `app/enxoval/share.tsx` funcional para compartilhamento de texto via `Share.share`.
- `app/nursery.tsx` mantido como shim de compatibilidade apontando para o modulo novo.
- `app/(tabs)/ferramentas.tsx` agora abre `'/enxoval'`.

## 4. Arquitetura entregue

```text
app/enxoval/
  _layout.tsx
  index.tsx
  add.tsx
  guide.tsx
  finances.tsx
  share.tsx
  item/[id].tsx

src/db/
  index.ts
  enxovalRepo.ts

src/data/
  enxovalTemplate.ts
```

## 5. Modelo de dados e persistencia

O modulo usa a migration v8 em `src/db/index.ts` com:

- tabela `enxoval_items`
- tabela `enxoval_settings`

O repositorio `src/db/enxovalRepo.ts` implementa:

- leitura geral de itens
- leitura por ID
- upsert
- delete
- orcamento em `enxoval_settings`
- sincronizacao incremental do template

### Decisao importante de seguranca

O seed nao e mais "popular so se vazio". Agora ele funciona em modo incremental:

- mantem itens ja existentes da usuaria
- nao sobrescreve edicoes feitas em itens antigos
- adiciona apenas os IDs ausentes do template
- grava `template_version` em `enxoval_settings`

Isso permite expandir o catalogo sem duplicar nem perder dados locais.

## 6. Template expandido

`src/data/enxovalTemplate.ts` foi ampliado para um conjunto bem maior de itens, cobrindo melhor:

- roupas RN/P
- higiene
- quarto/sono
- alimentacao
- passeio
- farmacinha
- maternidade / pos-parto

Ponto critico preservado: os itens antigos mantiveram os mesmos IDs legados para evitar duplicacao em instalacoes ja existentes.

## 7. Status por sessao

### Sessao E-1.1 - Fundacao de dados + Hub

**Status:** concluida

Entregue:

- migration v8
- `src/db/enxovalRepo.ts`
- `app/enxoval/index.tsx`
- ligacao da aba Ferramentas para o modulo novo
- shim de compatibilidade em `app/nursery.tsx`

### Sessao E-1.2 - Detalhe + Adicionar

**Status:** concluida

Entregue:

- `app/enxoval/add.tsx`
- `app/enxoval/item/[id].tsx`
- CRUD real no SQLite

### Sessao E-1.3 - Guia pratico

**Status:** concluida

Entregue:

- accordion por categoria
- leitura do template e do estado atual do banco
- acao de abrir item
- acao de marcar `nao_preciso` / restaurar

### Sessao E-1.4 - Financas

**Status:** concluida

Entregue:

- orcamento total editavel
- gasto acumulado
- restante
- economia
- lista de compras mais caras

### Sessao E-1.5 - Compartilhar

**Status:** parcialmente concluida

Entregue:

- compartilhamento de texto via `Share.share`
- preview do texto
- resumo de pendencias e lista completa

Pendente:

- share visual por imagem
- exportacao PDF

Dependencias ainda necessarias:

- `react-native-view-shot`
- `expo-sharing`

### Task paralela - Expansao do template

**Status:** concluida

Entregue:

- template expandido
- estrategia segura de sincronizacao incremental

## 8. Riscos remanescentes

| Risco | Mitigacao |
|-------|-----------|
| Share visual ainda depende de libs nativas | Separado como proxima etapa |
| Volume maior de itens pode exigir refinamento visual | Validar UX no app rodando e ajustar filtros se necessario |
| Fluxos antigos ainda podem apontar para `nursery` | Shim mantido para compatibilidade |

## 9. Criterio de pronto atual

- 6 telas presentes e navegaveis
- persistencia SQLite real
- CRUD completo
- filtros, status e financas funcionais
- compartilhamento de texto funcional
- template expandido com migracao segura
- `npm run typecheck` sem erros

## 10. Proxima etapa recomendada

1. Implementar share visual por imagem/PDF com libs nativas.
2. Validar UX do catalogo expandido em dispositivo real e web.
3. Refinar filtros ou agrupamentos se a lista ficar longa demais.
