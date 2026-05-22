export type EnxovalCategoryId = 'roupas' | 'higiene' | 'quarto' | 'saida';

export type EnxovalPriority = 'essencial' | 'especial' | null;

export type EnxovalItem = {
  id: string;
  label: string;
  price: string;
  priority: EnxovalPriority;
  done: boolean;
};

export const ENXOVAL_TEMPLATE: Record<EnxovalCategoryId, EnxovalItem[]> = {
  roupas: [
    { id: 'body-curta-rn-p', label: 'Body manga curta · 6un · RN/P', price: '', priority: 'essencial', done: false },
    { id: 'body-longa-rn-p', label: 'Body manga longa · 6un · RN/P', price: '', priority: 'essencial', done: false },
    { id: 'macacao-rn-p', label: 'Macacão · 4un · RN/P', price: '', priority: 'essencial', done: false },
    { id: 'mijao-pe', label: 'Mijão / calça com pé · 6un', price: '', priority: 'essencial', done: false },
    { id: 'meias-kit', label: 'Meias · kit', price: '', priority: 'essencial', done: false },
    { id: 'touca-luvas-kit', label: 'Touca e luvas · kit', price: '', priority: 'essencial', done: false },
    { id: 'saida-maternidade', label: 'Saída de maternidade', price: '', priority: 'especial', done: false },
    { id: 'cueiro-manta', label: 'Cueiro / manta leve · 2un', price: '', priority: 'essencial', done: false },
  ],
  higiene: [
    { id: 'fralda-rn-p', label: 'Fralda descartável · RN/P', price: '', priority: 'essencial', done: false },
    { id: 'algodao-pacote', label: 'Algodão · pacote grande', price: '', priority: 'essencial', done: false },
    { id: 'lenco-umedecido', label: 'Lenço umedecido · pele sensível', price: '', priority: null, done: false },
    { id: 'pomada-assaduras', label: 'Pomada antiassaduras', price: '', priority: 'essencial', done: false },
    { id: 'alcool-70', label: 'Álcool 70% · umbigo', price: '', priority: 'essencial', done: false },
    { id: 'sabonete-neutro', label: 'Sabonete líquido neutro', price: '', priority: 'essencial', done: false },
    { id: 'toalha-capuz', label: 'Toalha com capuz · 2un', price: '', priority: 'essencial', done: false },
    { id: 'escova-pente', label: 'Kit escova e pente', price: '', priority: 'essencial', done: false },
    { id: 'tesourinha', label: 'Tesourinha de unha sem ponta', price: '', priority: 'essencial', done: false },
    { id: 'termometro', label: 'Termômetro digital', price: '', priority: 'essencial', done: false },
  ],
  quarto: [
    { id: 'berco-moises', label: 'Berço ou moisés', price: '', priority: 'essencial', done: false },
    { id: 'colchao-berco', label: 'Colchão para berço', price: '', priority: 'essencial', done: false },
    { id: 'lencol-elastico', label: 'Lençol de elástico · 3un', price: '', priority: 'essencial', done: false },
    { id: 'fronha-macia', label: 'Fronha macia', price: '', priority: 'essencial', done: false },
    { id: 'protetor-colchao', label: 'Protetor de colchão impermeável', price: '', priority: 'essencial', done: false },
    { id: 'cesto-roupa', label: 'Cesto de roupas sujas', price: '', priority: null, done: false },
  ],
  saida: [
    { id: 'bebe-conforto', label: 'Bebê conforto', price: '', priority: 'essencial', done: false },
    { id: 'carrinho', label: 'Carrinho de passeio', price: '', priority: 'essencial', done: false },
    { id: 'bolsa-maternidade', label: 'Bolsa de maternidade / mochila', price: '', priority: 'essencial', done: false },
    { id: 'trocador-portatil', label: 'Trocador portátil', price: '', priority: 'essencial', done: false },
    { id: 'protetor-solar-carro', label: 'Protetor solar para carro', price: '', priority: null, done: false },
    { id: 'espelho-retrovisor', label: 'Espelho retrovisor para bebê', price: '', priority: null, done: false },
  ],
};

export function createEnxovalInitialState(): Record<EnxovalCategoryId, EnxovalItem[]> {
  return Object.fromEntries(
    Object.entries(ENXOVAL_TEMPLATE).map(([categoryId, items]) => [
      categoryId,
      items.map((item) => ({ ...item })),
    ]),
  ) as Record<EnxovalCategoryId, EnxovalItem[]>;
}
