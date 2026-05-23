// Enxoval - modelo de dados e template de itens (Sessao E-1)
// Dados puros: sem imports de UI. Icones/cores ficam na camada de tela.

// Trilhas do enxoval: itens do bebe e itens da mae (mala/pos-parto/amamentacao)
export type EnxovalTrack = 'bebe' | 'mae';

export type EnxovalCategoryId =
  // --- Bebe ---
  | 'roupas'
  | 'higiene'
  | 'quarto'
  | 'alimentacao'
  | 'passeio'
  | 'farmacinha'
  // --- Mae ---
  | 'mala_maternidade'
  | 'pos_parto'
  | 'amamentacao_mae';

export type EnxovalStatus = 'desejado' | 'pesquisando' | 'comprado' | 'nao_preciso';
export type EnxovalPriority = 'essencial' | 'desejavel';

export interface EnxovalItem {
  id: string;
  category: EnxovalCategoryId;
  track: EnxovalTrack;
  name: string;
  status: EnxovalStatus;
  priority: EnxovalPriority;
  qty: number;
  priceTarget: number | null;
  pricePaid: number | null;
  isGift: boolean;
  delivered: boolean;
  store: string | null;
  link: string | null;
  note: string | null;
  isCustom: boolean;
  sortOrder: number;
}

export interface EnxovalSeedItem {
  id: string;
  category: EnxovalCategoryId;
  name: string;
  priority: EnxovalPriority;
  qty?: number;
}

export const ENXOVAL_CATEGORY_ORDER: EnxovalCategoryId[] = [
  // Bebe
  'roupas',
  'higiene',
  'quarto',
  'alimentacao',
  'passeio',
  'farmacinha',
  // Mae
  'mala_maternidade',
  'pos_parto',
  'amamentacao_mae',
];

export const ENXOVAL_CATEGORY_LABEL: Record<EnxovalCategoryId, string> = {
  roupas: 'Roupas RN',
  higiene: 'Higiene',
  quarto: 'Quarto/Sono',
  alimentacao: 'Alimentação',
  passeio: 'Passeio',
  farmacinha: 'Farmacinha',
  mala_maternidade: 'Mala da Maternidade',
  pos_parto: 'Pós-parto',
  amamentacao_mae: 'Amamentação',
};

// Trilha de cada categoria (bebe x mae)
export const ENXOVAL_CATEGORY_TRACK: Record<EnxovalCategoryId, EnxovalTrack> = {
  roupas: 'bebe',
  higiene: 'bebe',
  quarto: 'bebe',
  alimentacao: 'bebe',
  passeio: 'bebe',
  farmacinha: 'bebe',
  mala_maternidade: 'mae',
  pos_parto: 'mae',
  amamentacao_mae: 'mae',
};

export const ENXOVAL_TRACK_LABEL: Record<EnxovalTrack, string> = {
  bebe: 'Bebê',
  mae: 'Mãe',
};

export function categoriesForTrack(track: EnxovalTrack): EnxovalCategoryId[] {
  return ENXOVAL_CATEGORY_ORDER.filter((c) => ENXOVAL_CATEGORY_TRACK[c] === track);
}

export function isValidCategory(value: string): value is EnxovalCategoryId {
  return (ENXOVAL_CATEGORY_ORDER as string[]).includes(value);
}

export function trackOfCategory(category: EnxovalCategoryId): EnxovalTrack {
  return ENXOVAL_CATEGORY_TRACK[category];
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function seed(
  category: EnxovalCategoryId,
  name: string,
  priority: EnxovalPriority,
  qty = 1,
  id?: string,
): EnxovalSeedItem {
  return {
    id: id ?? slugify(`${category}-${name}`),
    category,
    name,
    priority,
    qty,
  };
}

export const ENXOVAL_SEED: EnxovalSeedItem[] = [
  // Roupas RN/P
  seed('roupas', 'Body manga curta (RN/P)', 'essencial', 6, 'body-curta'),
  seed('roupas', 'Body manga longa (RN/P)', 'essencial', 6, 'body-longa'),
  seed('roupas', 'Macacao / pijama (RN/P)', 'essencial', 4, 'macacao'),
  seed('roupas', 'Mijao / calca com pe', 'essencial', 6, 'mijao-pe'),
  seed('roupas', 'Meias (kit)', 'essencial', 1, 'meias'),
  seed('roupas', 'Touca e luvas (kit)', 'essencial', 1, 'touca-luvas'),
  seed('roupas', 'Casaco / blusa de la', 'desejavel', 2, 'casaco-leve'),
  seed('roupas', 'Saida de maternidade', 'desejavel', 1, 'saida-maternidade'),
  seed('roupas', 'Cueiro / manta leve', 'essencial', 2, 'cueiro-manta'),
  seed('roupas', 'Calca culote (RN/P)', 'essencial', 4),
  seed('roupas', 'Casaquinho de algodao', 'desejavel', 2),
  seed('roupas', 'Macacao mais quentinho', 'desejavel', 2),
  seed('roupas', 'Babita / pano de ombro', 'essencial', 6),
  seed('roupas', 'Toalha fralda', 'essencial', 4),
  seed('roupas', 'Fralda de pano extra', 'desejavel', 6),
  seed('roupas', 'Sapatinho macio', 'desejavel', 1),
  seed('roupas', 'Babador bandana', 'desejavel', 3),
  seed('roupas', 'Cobertor leve de passeio', 'desejavel', 1),

  // Higiene
  seed('higiene', 'Fralda descartavel (RN/P)', 'essencial', 2, 'fralda-rn'),
  seed('higiene', 'Algodao (pacote grande)', 'essencial', 1, 'algodao'),
  seed('higiene', 'Lenco umedecido', 'desejavel', 2, 'lenco-umedecido'),
  seed('higiene', 'Pomada antiassaduras', 'essencial', 1, 'pomada-assadura'),
  seed('higiene', 'Sabonete liquido neutro', 'essencial', 1, 'sabonete-neutro'),
  seed('higiene', 'Toalha com capuz', 'essencial', 2, 'toalha-capuz'),
  seed('higiene', 'Kit escova e pente', 'essencial', 1, 'escova-pente'),
  seed('higiene', 'Fralda de pano (boca)', 'essencial', 6, 'fralda-pano'),
  seed('higiene', 'Banheira', 'essencial', 1),
  seed('higiene', 'Suporte para banheira', 'desejavel', 1),
  seed('higiene', 'Termometro de banho', 'desejavel', 1),
  seed('higiene', 'Shampoo suave para bebe', 'desejavel', 1),
  seed('higiene', 'Escova dental de silicone', 'desejavel', 1),
  seed('higiene', 'Trocador de comoda', 'essencial', 1),
  seed('higiene', 'Porta-cotonete / organizador', 'desejavel', 1),
  seed('higiene', 'Saboneteira', 'desejavel', 1),
  seed('higiene', 'Kit manicure do bebe', 'essencial', 1),

  // Quarto/Sono
  seed('quarto', 'Berco ou moises', 'essencial', 1, 'berco'),
  seed('quarto', 'Colchao para berco', 'essencial', 1, 'colchao-berco'),
  seed('quarto', 'Lencol de elastico', 'essencial', 3, 'lencol-elastico'),
  seed('quarto', 'Protetor de colchao impermeavel', 'essencial', 1, 'protetor-colchao'),
  seed('quarto', 'Cobertor / edredom', 'desejavel', 1, 'cobertor'),
  seed('quarto', 'Cesto de roupas', 'desejavel', 1, 'cesto-roupa'),
  seed('quarto', 'Abajur / luz noturna', 'desejavel', 1, 'abajur'),
  seed('quarto', 'Ninho redutor', 'desejavel', 1),
  seed('quarto', 'Mosquiteiro para berco', 'desejavel', 1),
  seed('quarto', 'Baba eletronica', 'desejavel', 1),
  seed('quarto', 'Comoda / trocador', 'essencial', 1),
  seed('quarto', 'Organizador de gaveta', 'desejavel', 2),
  seed('quarto', 'Manta extra para berco', 'desejavel', 2),
  seed('quarto', 'Poltrona de amamentacao', 'desejavel', 1),
  seed('quarto', 'Cortina com blackout', 'desejavel', 1),

  // Alimentacao / amamentacao do bebe
  seed('alimentacao', 'Mamadeira anticolica', 'desejavel', 2, 'mamadeira'),
  seed('alimentacao', 'Escova para mamadeira', 'desejavel', 1, 'escova-mamadeira'),
  seed('alimentacao', 'Esterilizador', 'desejavel', 1, 'esterilizador'),
  seed('alimentacao', 'Babador', 'essencial', 6, 'babador'),
  seed('alimentacao', 'Almofada de amamentacao', 'desejavel', 1, 'almofada-amamentacao'),
  seed('alimentacao', 'Bomba tira-leite', 'desejavel', 1, 'bomba-tira-leite'),
  seed('alimentacao', 'Potes para armazenamento de leite', 'desejavel', 4),
  seed('alimentacao', 'Porta-leite / bolsa termica', 'desejavel', 1),
  seed('alimentacao', 'Prendedor de chupeta', 'desejavel', 2),
  seed('alimentacao', 'Chupeta', 'desejavel', 2),
  seed('alimentacao', 'Prato / colher para introducao alimentar', 'desejavel', 1),
  seed('alimentacao', 'Cadeira de alimentacao', 'desejavel', 1),
  seed('alimentacao', 'Pano de boca extra', 'essencial', 4),
  seed('alimentacao', 'Escorredor de mamadeiras', 'desejavel', 1),
  seed('alimentacao', 'Aquecedor de mamadeiras', 'desejavel', 1),

  // Passeio
  seed('passeio', 'Bebe conforto', 'essencial', 1, 'bebe-conforto'),
  seed('passeio', 'Carrinho de passeio', 'essencial', 1, 'carrinho'),
  seed('passeio', 'Trocador portatil', 'essencial', 1, 'trocador-portatil'),
  seed('passeio', 'Canguru / sling', 'desejavel', 1, 'canguru'),
  seed('passeio', 'Protetor solar para carro', 'desejavel', 1, 'protetor-solar-carro'),
  seed('passeio', 'Bolsa maternidade do bebe', 'essencial', 1),
  seed('passeio', 'Mochila maternidade', 'desejavel', 1),
  seed('passeio', 'Organizador de carrinho', 'desejavel', 1),
  seed('passeio', 'Capa de chuva para carrinho', 'desejavel', 1),
  seed('passeio', 'Rede de descanso para carro', 'desejavel', 1),
  seed('passeio', 'Manta para passeio', 'essencial', 1),
  seed('passeio', 'Kit trocas rapido', 'essencial', 1),
  seed('passeio', 'Porta-documentos do bebe', 'desejavel', 1),

  // Farmacinha / cuidados
  seed('farmacinha', 'Termometro digital', 'essencial', 1, 'termometro'),
  seed('farmacinha', 'Alcool 70% (umbigo)', 'essencial', 1, 'alcool-70'),
  seed('farmacinha', 'Soro fisiologico', 'essencial', 1, 'soro-fisiologico'),
  seed('farmacinha', 'Aspirador nasal', 'desejavel', 1, 'aspirador-nasal'),
  seed('farmacinha', 'Tesourinha / cortador de unha', 'essencial', 1, 'cortador-unha'),
  seed('farmacinha', 'Gaze e cotonete haste flexivel', 'essencial', 1, 'gaze-cotonete'),
  seed('farmacinha', 'Bolsa termica pequena', 'desejavel', 1),
  seed('farmacinha', 'Caixa organizadora de cuidados', 'desejavel', 1),
  seed('farmacinha', 'Seringa dosadora', 'desejavel', 1),
  seed('farmacinha', 'Escova para crosta lactea', 'desejavel', 1),
  seed('farmacinha', 'Protetor para umbigo / faixa leve', 'desejavel', 1),
  seed('farmacinha', 'Umidificador de ar', 'desejavel', 1),
  seed('farmacinha', 'Kit de primeiros cuidados', 'desejavel', 1),

  // ── MAE ──────────────────────────────────────────────────────────────
  // Mala da Maternidade
  // (ids antigos 'maternidade-*' preservados p/ migracao casar por id)
  seed('mala_maternidade', 'Mala / bolsa da maternidade', 'essencial', 1, 'mala-mae'),
  seed('mala_maternidade', 'Documentos e plano de parto', 'essencial', 1, 'documentos'),
  seed('mala_maternidade', 'Camisola com abertura', 'essencial', 2, 'camisola-abertura'),
  seed('mala_maternidade', 'Chinelo e roupao', 'desejavel', 1, 'chinelo-roupao'),
  seed('mala_maternidade', 'Necessaire de higiene da mae', 'desejavel', 1, 'necessaire-mae'),
  seed('mala_maternidade', 'Garrafa de agua grande', 'essencial', 1, 'maternidade-garrafa-de-agua-grande'),
  seed('mala_maternidade', 'Pijama confortavel', 'desejavel', 2, 'maternidade-pijama-confortavel'),
  seed('mala_maternidade', 'Toalha de banho para internacao', 'essencial', 1, 'maternidade-toalha-de-banho-para-internacao'),
  seed('mala_maternidade', 'Meias antiderrapantes', 'desejavel', 2, 'maternidade-meias-antiderrapantes'),
  seed('mala_maternidade', 'Kit lanche para maternidade', 'desejavel', 1, 'maternidade-kit-lanche-para-maternidade'),
  seed('mala_maternidade', 'Saco para roupas sujas', 'essencial', 1, 'maternidade-saco-para-roupas-sujas'),

  // Pos-parto
  seed('pos_parto', 'Absorvente pos-parto', 'essencial', 1, 'absorvente-pos-parto'),
  seed('pos_parto', 'Calcinha pos-parto', 'essencial', 4, 'maternidade-calcinha-pos-parto'),
  seed('pos_parto', 'Cinta pos-parto (se orientada)', 'desejavel', 1, 'maternidade-cinta-pos-parto-se-orientada'),
  seed('pos_parto', 'Bombinha de agua / higiene intima', 'desejavel', 1, 'maternidade-bombinha-de-agua-higiene-intima'),

  // Amamentacao (mae)
  seed('amamentacao_mae', 'Sutia de amamentacao', 'essencial', 2, 'sutia-amamentacao'),
  seed('amamentacao_mae', 'Concha de amamentacao', 'desejavel', 1, 'maternidade-concha-de-amamentacao'),
  seed('amamentacao_mae', 'Pomada para seios', 'desejavel', 1, 'maternidade-pomada-para-seios'),
  seed('amamentacao_mae', 'Absorvente de seios', 'desejavel', 2, 'maternidade-absorvente-de-seios'),
  seed('amamentacao_mae', 'Almofada extra para apoio', 'desejavel', 1, 'maternidade-almofada-extra-para-apoio'),
];

// v3: introduz trilha bebe/mae e divide 'maternidade' em 3 sub-categorias
export const ENXOVAL_TEMPLATE_VERSION = 3;

// Mapa id -> categoria (resolve itens legados gravados como 'maternidade')
const SEED_CATEGORY_BY_ID: Record<string, EnxovalCategoryId> = Object.fromEntries(
  ENXOVAL_SEED.map((s) => [s.id, s.category]),
) as Record<string, EnxovalCategoryId>;

/**
 * Resolve a categoria de um item lido do banco. Itens legados (categoria
 * 'maternidade' ou qualquer valor invalido) sao remapeados pela id; se
 * desconhecidos, caem em 'mala_maternidade'. Garante que nenhuma tela receba
 * categoria invalida mesmo sem migracao SQL (vale web + nativo).
 */
export function resolveCategory(id: string, rawCategory: string): EnxovalCategoryId {
  if (isValidCategory(rawCategory)) return rawCategory;
  return SEED_CATEGORY_BY_ID[id] ?? 'mala_maternidade';
}

export function seedToItem(s: EnxovalSeedItem, sortOrder: number): EnxovalItem {
  return {
    id: s.id,
    category: s.category,
    track: ENXOVAL_CATEGORY_TRACK[s.category],
    name: s.name,
    status: 'desejado',
    priority: s.priority,
    qty: s.qty ?? 1,
    priceTarget: null,
    pricePaid: null,
    isGift: false,
    delivered: false,
    store: null,
    link: null,
    note: null,
    isCustom: false,
    sortOrder,
  };
}
