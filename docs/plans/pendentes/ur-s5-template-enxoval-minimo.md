# Plano UR-S5 — Template Enxoval Mínimo (Onda 1)

**Data:** 2026-05-21
**Story:** UR-S5 (Onda 1, item 2)
**Status:** Aguardando execução
**Objetivo:** Popular a tela de Enxoval com 30 itens essenciais para garantir que o app não pareça vazio no lançamento G-7.

## Escopo

- [ ] Criar `src/data/enxovalTemplate.ts` com ~30 itens divididos nas 4 categorias atuais (`roupas`, `higiene`, `quarto`, `saida`).
- [ ] Atualizar `app/nursery.tsx` para carregar esses itens como estado inicial.
- [ ] Garantir que a funcionalidade de marcar/desmarcar itens funcione corretamente.
- [ ] Manter o alerta "Em breve" para adição de novos itens (escopo da Onda 2).

## Itens por Categoria (Sugestão de 30 itens)

### Roupas (8 itens)
1. Body manga curta (RN/P) — **Essencial**
2. Body manga longa (RN/P) — **Essencial**
3. Macacão (RN/P) — **Essencial**
4. Mijão/Calça com pé — **Essencial**
5. Meias (kit) — **Essencial**
6. Touca e Luvas (kit) — **Essencial**
7. Saída de maternidade — **Especial**
8. Cueiro / Manta leve — **Essencial**

### Higiene (10 itens)
1. Fralda descartável (RN/P) — **Essencial**
2. Algodão (pacote grande) — **Essencial**
3. Lenço umedecido (pele sensível)
4. Pomada antiassaduras — **Essencial**
5. Álcool 70% (umbigo) — **Essencial**
6. Sabonete líquido neutro — **Essencial**
7. Toalha com capuz (2un) — **Essencial**
8. Kit escova e pente — **Essencial**
9. Tesourinha de unha sem ponta — **Essencial**
10. Termômetro digital — **Essencial**

### Quarto (6 itens)
1. Berço (ou moisés) — **Essencial**
2. Colchão para berço — **Essencial**
3. Lençol de elástico (3un) — **Essencial**
4. Fronha macia — **Essencial**
5. Protetor de colchão impermeável — **Essencial**
6. Cesto de roupas sujas

### Saída/Passeio (6 itens)
1. Bebê conforto (car seat) — **Essencial**
2. Carrinho de passeio — **Essencial**
3. Bolsa de maternidade / Mochila — **Essencial**
4. Trocador portátil — **Essencial**
5. Protetor solar para carro
6. Espelho retrovisor para bebê

## Implementação Detalhada

### 1. Definição de Dados
📄 `src/data/enxovalTemplate.ts`
Criar o arquivo com a estrutura de dados baseada nos itens acima.

### 2. Refatoração da Tela
📄 `app/nursery.tsx`
Substituir o mock manual de `INITIAL_ITEMS` pelo template centralizado. Garantir que a lógica de progresso (círculo no topo) reflita a nova quantidade de itens.

### 3. Verificação
- ✅ Navegar até Ferramentas -> Enxoval.
- ✅ Alternar entre as 4 categorias e ver os itens.
- ✅ Marcar itens e ver o progresso subir.
- ✅ Confirmar que o layout não quebra com listas maiores.

---

**Nota:** A persistência em SQLite e a adição de itens personalizados serão tratadas na Sessão E-1 (Onda 2), após o lançamento G-7.
