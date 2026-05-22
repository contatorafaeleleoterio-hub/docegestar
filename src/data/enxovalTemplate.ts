// Enxoval - modelo de dados e template de itens (Sessao E-1)
// Dados puros: sem imports de UI. Icones/cores ficam na camada de tela.

export type EnxovalCategoryId =
  | 'roupas'
  | 'higiene'
  | 'quarto'
  | 'alimentacao'
  | 'passeio'
  | 'farmacinha'
  | 'maternidade';

export type EnxovalStatus = 'desejado' | 'pesquisando' | 'comprado' | 'nao_preciso';
export type EnxovalPriority = 'essencial' | 'desejavel';

export interface EnxovalItem {
  id: string;
  category: EnxovalCategoryId;
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
  'roupas',
  'higiene',
  'quarto',
  'alimentacao',
  'passeio',
  'farmacinha',
  'maternidade',
];

export const ENXOVAL_CATEGORY_LABEL: Record<EnxovalCategoryId, string> = {
  roupas: 'Roupas RN',
  higiene: 'Higiene',
  quarto: 'Quarto/Sono',
  alimentacao: 'Alimentacao',
  passeio: 'Passeio',
  farmacinha: 'Farmacinha',
  maternidade: 'Maternidade',
};

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

  // Maternidade / mae / pos-parto
  seed('maternidade', 'Mala / bolsa da maternidade', 'essencial', 1, 'mala-mae'),
  seed('maternidade', 'Documentos e plano de parto', 'essencial', 1, 'documentos'),
  seed('maternidade', 'Camisola com abertura', 'essencial', 2, 'camisola-abertura'),
  seed('maternidade', 'Sutia de amamentacao', 'essencial', 2, 'sutia-amamentacao'),
  seed('maternidade', 'Absorvente pos-parto', 'essencial', 1, 'absorvente-pos-parto'),
  seed('maternidade', 'Chinelo e roupao', 'desejavel', 1, 'chinelo-roupao'),
  seed('maternidade', 'Necessaire de higiene da mae', 'desejavel', 1, 'necessaire-mae'),
  seed('maternidade', 'Calcinha pos-parto', 'essencial', 4),
  seed('maternidade', 'Concha de amamentacao', 'desejavel', 1),
  seed('maternidade', 'Pomada para seios', 'desejavel', 1),
  seed('maternidade', 'Absorvente de seios', 'desejavel', 2),
  seed('maternidade', 'Garrafa de agua grande', 'essencial', 1),
  seed('maternidade', 'Almofada extra para apoio', 'desejavel', 1),
  seed('maternidade', 'Pijama confortavel', 'desejavel', 2),
  seed('maternidade', 'Toalha de banho para internacao', 'essencial', 1),
  seed('maternidade', 'Meias antiderrapantes', 'desejavel', 2),
  seed('maternidade', 'Kit lanche para maternidade', 'desejavel', 1),
  seed('maternidade', 'Saco para roupas sujas', 'essencial', 1),
  seed('maternidade', 'Cinta pos-parto (se orientada)', 'desejavel', 1),
  seed('maternidade', 'Bombinha de agua / higiene intima', 'desejavel', 1),
];

export const ENXOVAL_TEMPLATE_VERSION = 2;

export function seedToItem(s: EnxovalSeedItem, sortOrder: number): EnxovalItem {
  return {
    id: s.id,
    category: s.category,
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
