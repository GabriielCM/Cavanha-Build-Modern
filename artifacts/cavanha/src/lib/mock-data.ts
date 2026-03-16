// ─── MOCK DATA ──────────────────────────────────────────────────────────────

export const WHATSAPP_NUMBER = "5544999999999";
export const WHATSAPP_MSG = (product?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    product
      ? `Olá! Tenho interesse no produto: *${product}*. Podem me informar disponibilidade e prazo de entrega?`
      : "Olá! Gostaria de saber mais sobre os produtos da Cavanha Materiais de Construção."
  )}`;

// ─── TYPES ──────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  brand: string;
  spec: string;
  price: number;
  oldPrice?: number;
  unit: string;
  category: string;
  tag?: string;
  buyers: number;
  imageUrl: string;
  imageBg: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  count: number;
  color: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  stars: number;
  text: string;
  avatar: string;
  color: string;
  beforeImage: string;
  afterImage: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

// ─── CATEGORIES ─────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  {
    id: "pisos",
    label: "Pisos e Revestimentos",
    icon: "⬛",
    count: 234,
    color: "#1a4080",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop",
  },
  {
    id: "tintas",
    label: "Tintas e Pintura",
    icon: "🎨",
    count: 156,
    color: "#2d5a9e",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop",
  },
  {
    id: "cimento",
    label: "Cimento e Argamassa",
    icon: "🪨",
    count: 89,
    color: "#0D2B5C",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
  },
  {
    id: "hidraulica",
    label: "Hidraulica",
    icon: "🔧",
    count: 312,
    color: "#1a4080",
    image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop",
  },
  {
    id: "eletrica",
    label: "Eletrica",
    icon: "⚡",
    count: 198,
    color: "#2d5a9e",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop",
  },
  {
    id: "ferramentas",
    label: "Ferramentas",
    icon: "🔨",
    count: 267,
    color: "#0D2B5C",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600&h=400&fit=crop",
  },
];

// ─── PRODUCTS ───────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Semi Gres Splendore Polido Classico",
    brand: "Lume",
    spec: "62x119cm",
    price: 44.9,
    oldPrice: 59.9,
    unit: "m\u00b2",
    category: "pisos",
    tag: "Mais Vendido",
    buyers: 47,
    imageUrl:
      "https://acdn-us.mitiendanube.com/stores/001/973/835/products/62x119-splendore-pulido-2b263251e2f14eb1cf17278180502792-640-0.webp",
    imageBg: "#f5f5f5",
  },
  {
    id: 2,
    name: "Porcelanato Acetinado Travertino",
    brand: "Eliane",
    spec: "60x120cm",
    price: 52.9,
    oldPrice: 69.9,
    unit: "m\u00b2",
    category: "pisos",
    tag: "Oferta",
    buyers: 32,
    imageUrl:
      "https://lojasepa.vteximg.com.br/arquivos/ids/160416-1000-1000/624324560f069-500x500.png.png",
    imageBg: "#f0e4d0",
  },
  {
    id: 3,
    name: "Tinta Acrilica Premium Fosca 18L",
    brand: "Suvinil",
    spec: "18 litros",
    price: 289.9,
    oldPrice: 349.9,
    unit: "un",
    category: "tintas",
    tag: "Frete Gratis",
    buyers: 85,
    imageUrl:
      "https://digitalprdaddc4dsa.blob.core.windows.net/digital-products-img/products/303/image/display/34/1.webp",
    imageBg: "#e8f0fe",
  },
  {
    id: 4,
    name: "Tinta Latex Standard 18L",
    brand: "Coral",
    spec: "18 litros",
    price: 169.9,
    unit: "un",
    category: "tintas",
    buyers: 23,
    imageUrl:
      "https://casafernandes.fbitsstatic.net/img/p/tinta-latex-coral-rende-muito-18l-branco-71578/258409.jpg",
    imageBg: "#fff9e8",
  },
  {
    id: 5,
    name: "Cimento CP-II 50kg",
    brand: "Itambe",
    spec: "50kg",
    price: 34.9,
    oldPrice: 38.9,
    unit: "sc",
    category: "cimento",
    tag: "Mais Vendido",
    buyers: 156,
    imageUrl:
      "https://images.tcdn.com.br/img/img_prod/1188455/cimento_itambe_cp_ii_sc_50_kg_39213_1_b379d91c620cfd5814e35a6ad7e61b85.png",
    imageBg: "#ececec",
  },
  {
    id: 6,
    name: "Argamassa AC-III Porcelanato 20kg",
    brand: "Quartzolit",
    spec: "20kg",
    price: 42.5,
    oldPrice: 49.9,
    unit: "sc",
    category: "cimento",
    buyers: 64,
    imageUrl:
      "https://telhanorte.vteximg.com.br/arquivos/ids/1307916/Argamassa-Quartzolit-de-uso-Externo-e-Interno-AC3-Flexvel-20kg-Cinza-27073.jpg",
    imageBg: "#f0ece4",
  },
  {
    id: 7,
    name: "Piso Laminado Carvalho Natural",
    brand: "Durafloor",
    spec: "21x135cm",
    price: 62.9,
    oldPrice: 79.9,
    unit: "m\u00b2",
    category: "pisos",
    tag: "Oferta",
    buyers: 19,
    imageUrl:
      "https://telhanorte.vtexassets.com/arquivos/ids/1316158/2475332-Image-2.jpg",
    imageBg: "#f5e6c8",
  },
  {
    id: 8,
    name: "Rejunte Flexivel 5kg Cinza",
    brand: "Quartzolit",
    spec: "5kg",
    price: 28.9,
    unit: "un",
    category: "cimento",
    buyers: 38,
    imageUrl:
      "https://io.convertiez.com.br/m/cnr/shop/products/images/611/large/rejunte-flexivel-weber-cinza-platina-5kg-quartzolit_722.JPG",
    imageBg: "#e8e8e8",
  },
];

// ─── TESTIMONIALS ───────────────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Maria Souza",
    role: "Cliente desde 2022",
    stars: 5,
    text: "Reformei toda a minha cozinha com os produtos da Cavanha. Atendimento excelente, preco justo e entregaram tudo rapidinho aqui em Campo Mourao. Recomendo demais!",
    avatar: "MS",
    color: "#e8f4fd",
    beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&h=400&fit=crop",
  },
  {
    name: "Carlos Silva",
    role: "Mestre de Obra",
    stars: 5,
    text: "Como mestre de obra, preciso de fornecedor confiavel. A Cavanha nunca me deixou na mao - cimento, argamassa, rejunte, sempre tem em estoque e o preco bate com qualquer concorrente.",
    avatar: "CS",
    color: "#fff4e8",
    beforeImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
  },
  {
    name: "Ana Oliveira",
    role: "Arquiteta",
    stars: 4,
    text: "Otima variedade de porcelanatos e pisos para indicar aos meus clientes. O showroom e organizado e o pessoal entende bem do produto. Parceria garantida para meus projetos!",
    avatar: "AO",
    color: "#e8f9f0",
    beforeImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
  },
];

// ─── TIMELINE ───────────────────────────────────────────────────────────────

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2014",
    title: "Fundacao",
    description: "Nascemos em Campo Mourao com o sonho de oferecer materiais de qualidade para a regiao.",
    icon: "🏗️",
  },
  {
    year: "2016",
    title: "Primeira Entrega Regional",
    description: "Expandimos para Ubirata e Luiziana, levando nossos produtos para toda a regiao.",
    icon: "🚚",
  },
  {
    year: "2019",
    title: "1.000 Produtos",
    description: "Atingimos a marca de 1.000 produtos em catalogo, cobrindo todas as necessidades de obra.",
    icon: "📦",
  },
  {
    year: "2022",
    title: "Showroom Novo",
    description: "Inauguramos nosso showroom moderno com ambientes decorados para inspirar nossos clientes.",
    icon: "🏪",
  },
  {
    year: "2024",
    title: "Hoje",
    description: "Mais de 1.256 produtos, 12+ cidades atendidas e a confianca de milhares de clientes.",
    icon: "🚀",
  },
];

// ─── BRANDS ─────────────────────────────────────────────────────────────────

export const BRANDS = [
  "Suvinil", "Coral", "Portobello", "Eliane", "Tigre",
  "Tramontina", "Quartzolit", "Durafloor", "Itambe", "Votorantim",
  "Schneider", "Docol", "Deca", "Lorenzetti", "Fortlev",
];

// ─── DELIVERY CITIES ────────────────────────────────────────────────────────

export const DELIVERY_CITIES = [
  "Campo Mourao", "Ubirata", "Luiziana", "Barbosa Ferraz",
  "Peabiru", "Engenheiro Beltrao", "Araruna", "Janiópolis",
  "Farol", "Corumbatai do Sul", "Iretama", "Roncador",
];

// ─── SIDEBAR NAV ITEMS ──────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  section?: string;
  href?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Inicio", icon: "home", section: "hero" },
  { id: "produtos", label: "Produtos", icon: "shopping-bag", section: "produtos" },
  { id: "categorias", label: "Categorias", icon: "grid", section: "categorias" },
  { id: "obras", label: "Obras", icon: "image", section: "obras" },
  { id: "sobre", label: "Sobre", icon: "clock", section: "sobre" },
  { id: "contato", label: "Contato", icon: "message-circle", section: "contato" },
];
