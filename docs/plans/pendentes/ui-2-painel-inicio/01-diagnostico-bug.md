# UI-2 · Diagnóstico do Bug — Comparação de Fruta

**Data:** 2026-05-16
**Sessão:** UI-2 (pesquisa)

## Problema

O card "Seu bebê hoje" da tela Início **não tem imagem de fruta nenhuma**.

O código em `app/(tabs)/dashboard.tsx:146` usa:

```
<DGIcon name="flower" size={36} color={colors.primary} />
```

Esse é um ícone decorativo fixo de florzinha que **nunca muda** — aparece igual
nas 40 semanas da gestação.

## Por que parece "bugado" e amador

- O texto da comparação ("Batata-doce") vem do dado real e está correto.
- Mas o visual ao lado é um ícone genérico — a comparação visual de tamanho
  do bebê simplesmente **não existe**.
- O dado da fruta já está pronto e validado nas 40 semanas
  (`baby.comparison` em `src/data/weeks/*.ts`). Só falta a **imagem**.

## Conclusão

Não é um erro de código quebrado — é uma feature visual ausente. A solução é
criar o set de imagens de fruta e renderizá-las por semana (ver documentos
`02-modelo-imagens-fruta.md` e `03-ferramenta-ia-prompt.md`).
