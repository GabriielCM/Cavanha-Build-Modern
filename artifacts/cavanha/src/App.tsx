import { useState, useEffect, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// ─── DATA ────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "5544999999999";
const WHATSAPP_MSG = (product?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    product
      ? `Olá! Tenho interesse no produto: *${product}*. Podem me informar disponibilidade e prazo de entrega?`
      : "Olá! Gostaria de saber mais sobre os produtos da Cavanha Materiais de Construção."
  )}`;

const CATEGORIES = [
  { id: "pisos", label: "Pisos e\nRevestimentos", icon: "⬛", count: 234, color: "#1a4080" },
  { id: "tintas", label: "Tintas e\nPintura", icon: "🎨", count: 156, color: "#2d5a9e" },
  { id: "cimento", label: "Cimento e\nArgamassa", icon: "🪨", count: 89, color: "#0D2B5C" },
  { id: "hidraulica", label: "Hidráulica", icon: "🔧", count: 312, color: "#1a4080" },
  { id: "eletrica", label: "Elétrica", icon: "⚡", count: 198, color: "#2d5a9e" },
  { id: "ferramentas", label: "Ferramentas", icon: "🔨", count: 267, color: "#0D2B5C" },
];

interface Product {
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
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Semi Gres Splendore Polido Clássico",
    brand: "Lume",
    spec: "62x119cm",
    price: 44.90,
    oldPrice: 59.90,
    unit: "m²",
    category: "pisos",
    tag: "Mais Vendido",
    buyers: 47,
    image: "tile-marble",
  },
  {
    id: 2,
    name: "Porcelanato Acetinado Travertino",
    brand: "Eliane",
    spec: "60x120cm",
    price: 52.90,
    oldPrice: 69.90,
    unit: "m²",
    category: "pisos",
    tag: "Oferta",
    buyers: 32,
    image: "tile-travertine",
  },
  {
    id: 3,
    name: "Tinta Acrílica Premium Fosca 18L",
    brand: "Suvinil",
    spec: "18 litros",
    price: 289.90,
    oldPrice: 349.90,
    unit: "un",
    category: "tintas",
    tag: "Frete Grátis",
    buyers: 85,
    image: "paint-white",
  },
  {
    id: 4,
    name: "Tinta Látex Standard 18L",
    brand: "Coral",
    spec: "18 litros",
    price: 169.90,
    unit: "un",
    category: "tintas",
    buyers: 23,
    image: "paint-standard",
  },
  {
    id: 5,
    name: "Cimento CP-II 50kg",
    brand: "Itambé",
    spec: "50kg",
    price: 34.90,
    oldPrice: 38.90,
    unit: "sc",
    category: "cimento",
    tag: "Mais Vendido",
    buyers: 156,
    image: "cement",
  },
  {
    id: 6,
    name: "Argamassa AC-III Porcelanato 20kg",
    brand: "Quartzolit",
    spec: "20kg",
    price: 42.50,
    oldPrice: 49.90,
    unit: "sc",
    category: "cimento",
    buyers: 64,
    image: "mortar",
  },
  {
    id: 7,
    name: "Piso Laminado Carvalho Natural",
    brand: "Durafloor",
    spec: "21x135cm",
    price: 62.90,
    oldPrice: 79.90,
    unit: "m²",
    category: "pisos",
    tag: "Oferta",
    buyers: 19,
    image: "floor-wood",
  },
  {
    id: 8,
    name: "Rejunte Flexível 5kg Cinza",
    brand: "Quartzolit",
    spec: "5kg",
    price: 28.90,
    unit: "un",
    category: "cimento",
    buyers: 38,
    image: "grout",
  },
];

const TESTIMONIALS = [
  {
    name: "Maria Souza",
    role: "Cliente desde 2022",
    stars: 5,
    text: "Reformei toda a minha cozinha com os produtos da Cavanha. Atendimento excelente, preço justo e entregaram tudo rapidinho aqui em Campo Mourão. Recomendo demais!",
    avatar: "MS",
    color: "#e8f4fd",
  },
  {
    name: "Carlos Silva",
    role: "Mestre de Obra",
    stars: 5,
    text: "Como mestre de obra, preciso de fornecedor confiável. A Cavanha nunca me deixou na mão — cimento, argamassa, rejunte, sempre tem em estoque e o preço bate com qualquer concorrente.",
    avatar: "CS",
    color: "#fff4e8",
  },
  {
    name: "Ana Oliveira",
    role: "Arquiteta",
    stars: 4,
    text: "Ótima variedade de porcelanatos e pisos para indicar aos meus clientes. O showroom é organizado e o pessoal entende bem do produto. Parceria garantida para meus projetos!",
    avatar: "AO",
    color: "#e8f9f0",
  },
];

// ─── LOGO SVG ─────────────────────────────────────────────────────────────────

function CavanhaLogo({ size = 44 }: { size?: number }) {
  return (
    <svg width={size * 2.8} height={size} viewBox="0 0 200 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House shape */}
      <g>
        {/* Roof */}
        <polygon points="36,8 68,32 4,32" fill="#F5841F" />
        {/* Roof stripes (brand accent) */}
        <polygon points="36,8 44,14 28,14" fill="#0D2B5C" opacity="0.4"/>
        {/* House body */}
        <rect x="10" y="32" width="52" height="28" rx="3" fill="#0D2B5C" />
        {/* Door */}
        <rect x="28" y="44" width="16" height="16" rx="3" fill="#F5841F" />
        {/* Window left */}
        <rect x="14" y="36" width="10" height="10" rx="2" fill="white" opacity="0.7" />
        {/* Window right */}
        <rect x="48" y="36" width="10" height="10" rx="2" fill="white" opacity="0.7" />
        {/* Chimney */}
        <rect x="50" y="16" width="8" height="16" rx="2" fill="#0D2B5C" />
        <rect x="48" y="14" width="12" height="4" rx="2" fill="#F5841F" />
      </g>
      {/* Text CAVANHA */}
      <text x="78" y="38" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="28" fill="#0D2B5C" letterSpacing="1">CAVANHA</text>
      {/* Subtitle */}
      <text x="79" y="54" fontFamily="Nunito, sans-serif" fontWeight="600" fontSize="11" fill="#F5841F" letterSpacing="0.5">MATERIAIS DE CONSTRUÇÃO</text>
    </svg>
  );
}

function CavanhaLogoWhite({ size = 44 }: { size?: number }) {
  return (
    <svg width={size * 2.8} height={size} viewBox="0 0 200 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <polygon points="36,8 68,32 4,32" fill="#F5841F" />
        <polygon points="36,8 44,14 28,14" fill="white" opacity="0.3"/>
        <rect x="10" y="32" width="52" height="28" rx="3" fill="white" opacity="0.15" />
        <rect x="28" y="44" width="16" height="16" rx="3" fill="#F5841F" />
        <rect x="14" y="36" width="10" height="10" rx="2" fill="white" opacity="0.6" />
        <rect x="48" y="36" width="10" height="10" rx="2" fill="white" opacity="0.6" />
        <rect x="50" y="16" width="8" height="16" rx="2" fill="white" opacity="0.3" />
        <rect x="48" y="14" width="12" height="4" rx="2" fill="#F5841F" />
      </g>
      <text x="78" y="38" fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="28" fill="white" letterSpacing="1">CAVANHA</text>
      <text x="79" y="54" fontFamily="Nunito, sans-serif" fontWeight="600" fontSize="11" fill="#F5841F" letterSpacing="0.5">MATERIAIS DE CONSTRUÇÃO</text>
    </svg>
  );
}

// ─── PRODUCT IMAGE PLACEHOLDER ────────────────────────────────────────────────

const PRODUCT_COLORS: Record<string, { bg: string; accent: string; icon: string }> = {
  "tile-marble": { bg: "#f8f8f8", accent: "#c8c8c8", icon: "⬛" },
  "tile-travertine": { bg: "#f5ede3", accent: "#c4a882", icon: "⬜" },
  "paint-white": { bg: "#e8f0fe", accent: "#4285F4", icon: "🪣" },
  "paint-standard": { bg: "#fef3e2", accent: "#FB8C00", icon: "🎨" },
  "cement": { bg: "#ececec", accent: "#888", icon: "🪨" },
  "mortar": { bg: "#f0ece4", accent: "#a09070", icon: "🏗️" },
  "floor-wood": { bg: "#f5e6c8", accent: "#8B4513", icon: "🪵" },
  "grout": { bg: "#e8e8e8", accent: "#666", icon: "🔲" },
};

function ProductImage({ type, className }: { type: string; className?: string }) {
  const style = PRODUCT_COLORS[type] || { bg: "#f0f0f0", accent: "#888", icon: "📦" };
  
  // Render actual patterns for tiles
  if (type === "tile-marble") {
    return (
      <div className={className} style={{ background: style.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <svg width="100%" height="100%" viewBox="0 0 120 120">
          <rect width="120" height="120" fill="#f9f9f9"/>
          <rect x="0" y="0" width="60" height="60" fill="#f2f2f2" stroke="#e0e0e0" strokeWidth="1"/>
          <rect x="60" y="0" width="60" height="60" fill="#ebebeb" stroke="#e0e0e0" strokeWidth="1"/>
          <rect x="0" y="60" width="60" height="60" fill="#ededee" stroke="#e0e0e0" strokeWidth="1"/>
          <rect x="60" y="60" width="60" height="60" fill="#f4f4f4" stroke="#e0e0e0" strokeWidth="1"/>
          <path d="M10 20 Q30 15 50 30 Q70 45 100 20" stroke="#d0d0d0" strokeWidth="0.8" fill="none"/>
          <path d="M5 50 Q35 40 65 55 Q80 62 115 45" stroke="#c8c8c8" strokeWidth="0.6" fill="none"/>
          <path d="M20 80 Q50 72 80 85 Q95 92 110 78" stroke="#d4d4d4" strokeWidth="0.7" fill="none"/>
        </svg>
      </div>
    );
  }

  if (type === "floor-wood") {
    return (
      <div className={className} style={{ background: style.bg, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <svg width="100%" height="100%" viewBox="0 0 120 120">
          <rect width="120" height="120" fill="#f5e6c8"/>
          {[0,1,2,3,4,5,6,7].map(i => (
            <g key={i}>
              <rect x={i % 2 === 0 ? 0 : 20} y={i * 15} width={i % 2 === 0 ? 75 : 95} height="14" rx="1" fill={i % 3 === 0 ? "#c9955c" : i % 3 === 1 ? "#b8864e" : "#d4a76a"} stroke="#8B5E3C" strokeWidth="0.5"/>
              {i % 2 === 0 && <rect x="80" y={i * 15} width="40" height="14" rx="1" fill="#bf8545" stroke="#8B5E3C" strokeWidth="0.5"/>}
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (type === "tile-travertine") {
    return (
      <div className={className} style={{ background: style.bg, overflow: "hidden" }}>
        <svg width="100%" height="100%" viewBox="0 0 120 120">
          <rect width="120" height="120" fill="#f0e4d0"/>
          <rect x="2" y="2" width="116" height="116" rx="2" fill="#ecdcc4" stroke="#c4a882" strokeWidth="1"/>
          <path d="M15 25 Q40 20 70 28 Q90 34 110 22" stroke="#c4a882" strokeWidth="1" fill="none" opacity="0.6"/>
          <path d="M8 50 Q30 45 60 52 Q80 57 112 46" stroke="#b89a70" strokeWidth="0.8" fill="none" opacity="0.5"/>
          <path d="M20 75 Q50 68 75 77 Q95 84 115 72" stroke="#c4a882" strokeWidth="0.9" fill="none" opacity="0.6"/>
          <path d="M5 95 Q35 88 65 96 Q85 102 115 90" stroke="#b89a70" strokeWidth="0.7" fill="none" opacity="0.4"/>
          <circle cx="35" cy="38" r="2" fill="#c4a882" opacity="0.4"/>
          <circle cx="78" cy="62" r="1.5" fill="#b89a70" opacity="0.4"/>
          <circle cx="55" cy="88" r="2.5" fill="#c4a882" opacity="0.3"/>
        </svg>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(135deg, ${style.bg} 0%, ${style.accent}22 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "3rem",
      }}
    >
      {style.icon}
    </div>
  );
}

// ─── TAG BADGE ────────────────────────────────────────────────────────────────

function TagBadge({ tag }: { tag: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    "Mais Vendido": { bg: "#0D2B5C", text: "white" },
    "Oferta": { bg: "#F5841F", text: "white" },
    "Frete Grátis": { bg: "#16a34a", text: "white" },
  };
  const c = colors[tag] || { bg: "#666", text: "white" };
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        fontSize: "0.65rem",
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: "999px",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {tag}
    </span>
  );
}

// ─── STAR RATING ─────────────────────────────────────────────────────────────

function Stars({ count, total = 5 }: { count: number; total?: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} style={{ color: i < count ? "#F5841F" : "#d1d5db", fontSize: "0.9rem" }}>★</span>
      ))}
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: Product }) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div
      className="product-card"
      style={{
        background: "white",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(13,43,92,0.08)",
        border: "1px solid rgba(13,43,92,0.08)",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative" }}>
        <ProductImage
          type={product.image}
          className="w-full"
          style={{ height: 180 }}
        />
        {product.tag && (
          <div style={{ position: "absolute", top: 10, left: 10 }}>
            <TagBadge tag={product.tag} />
          </div>
        )}
        {discount > 0 && (
          <div style={{
            position: "absolute",
            top: product.tag ? 34 : 10,
            left: 10,
            background: "#F5841F",
            color: "white",
            fontSize: "0.65rem",
            fontWeight: 800,
            padding: "2px 8px",
            borderRadius: 999,
            fontFamily: "Barlow Condensed, sans-serif",
            letterSpacing: "0.03em",
          }}>
            -{discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div style={{ fontSize: "0.72rem", color: "#F5841F", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "Nunito, sans-serif" }}>
          {product.brand}
        </div>
        <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#0D2B5C", lineHeight: 1.2, minHeight: "2.4em" }}>
          {product.name}
        </div>
        <div style={{ fontSize: "0.75rem", color: "#666", fontFamily: "Nunito, sans-serif" }}>
          {product.spec}
        </div>

        <div style={{ marginTop: 4 }}>
          {product.oldPrice && (
            <div style={{ fontSize: "0.78rem", color: "#999", textDecoration: "line-through", fontFamily: "Nunito, sans-serif" }}>
              R$ {product.oldPrice.toFixed(2).replace(".", ",")}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <span style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#0D2B5C" }}>
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
            <span style={{ fontSize: "0.72rem", color: "#888", fontFamily: "Nunito, sans-serif" }}>/{product.unit}</span>
          </div>
        </div>

        <div style={{ fontSize: "0.7rem", color: "#888", fontFamily: "Nunito, sans-serif", marginTop: 2 }}>
          👥 {product.buyers} pessoas compraram
        </div>

        <button
          className="btn-orange"
          onClick={() => window.open(WHATSAPP_MSG(product.name), "_blank")}
          style={{
            marginTop: "auto",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 16,
            paddingRight: 16,
            borderRadius: 12,
            border: "none",
            color: "white",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <WhatsappIcon size={16} />
          Pedir via WhatsApp
        </button>
      </div>
    </div>
  );
}

// ─── ICONS ────────────────────────────────────────────────────────────────────

function WhatsappIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function SearchIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

function MenuIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

function CloseIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.0 .2 2 2 0 012.02 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function MapPinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function TruckIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2"/>
      <path d="M16 8h4l3 3v5h-7V8z"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}

function ShieldIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function TagIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  );
}

function ChevronDownIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────

function Header({ onCategoryClick }: { onCategoryClick: (cat: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: "Produtos", action: () => { document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); } },
    { label: "Categorias", action: () => { document.getElementById("categorias")?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); } },
    { label: "Depoimentos", action: () => { document.getElementById("depoimentos")?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); } },
    { label: "Entrega", action: () => { document.getElementById("entrega")?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); } },
    { label: "Contato", action: () => window.open(WHATSAPP_MSG(), "_blank") },
  ];

  return (
    <>
      {/* Top bar */}
      <div style={{ background: "#0D2B5C", color: "white", fontSize: "0.75rem", padding: "6px 0", fontFamily: "Nunito, sans-serif" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <MapPinIcon size={12} /> Campo Mourão, PR — Entregamos na região!
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <PhoneIcon size={12} /> (44) 9999-9999
            </span>
            <span style={{ color: "#F5841F", fontWeight: 700 }}>Seg-Sex 7h–18h | Sáb 7h–13h</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className="sticky-header"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "white",
          boxShadow: scrolled ? "0 4px 20px rgba(13,43,92,0.12)" : "0 1px 0 rgba(13,43,92,0.08)",
          transition: "all 0.3s",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, height: 72 }}>
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}>
              <CavanhaLogo size={40} />
            </button>

            {/* Search - desktop */}
            <div style={{ flex: 1, maxWidth: 480, display: "none", position: "relative" }} className="md-search">
              <input
                type="text"
                placeholder="Buscar produtos, marcas, categorias..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  height: 44,
                  paddingLeft: 44,
                  paddingRight: 16,
                  borderRadius: 12,
                  border: "2px solid rgba(13,43,92,0.12)",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "0.9rem",
                  outline: "none",
                  background: "#f8fafc",
                  color: "#0D2B5C",
                }}
                onFocus={e => { e.target.style.borderColor = "#0D2B5C"; e.target.style.background = "white"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(13,43,92,0.12)"; e.target.style.background = "#f8fafc"; }}
              />
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#999" }}>
                <SearchIcon size={18} />
              </div>
            </div>

            {/* Nav - desktop */}
            <nav style={{ display: "flex", gap: 2, alignItems: "center" }}>
              {navLinks.slice(0, 4).map(link => (
                <button
                  key={link.label}
                  onClick={link.action}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: 8,
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    color: "#0D2B5C",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(13,43,92,0.06)"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = "none"; }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* WhatsApp CTA */}
            <button
              className="btn-orange"
              onClick={() => window.open(WHATSAPP_MSG(), "_blank")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 18,
                paddingRight: 18,
                borderRadius: 12,
                border: "none",
                color: "white",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <WhatsappIcon size={16} />
              <span style={{ display: "none" }} className="hide-xs">WhatsApp</span>
              <span>Falar</span>
            </button>

            {/* Mobile menu btn */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#0D2B5C", display: "flex", alignItems: "center", padding: 4 }}
              aria-label="Menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            background: "white",
            borderTop: "1px solid rgba(13,43,92,0.08)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}>
            {/* Mobile search */}
            <div style={{ position: "relative", marginBottom: 8 }}>
              <input
                type="text"
                placeholder="Buscar produtos..."
                style={{
                  width: "100%",
                  height: 44,
                  paddingLeft: 44,
                  paddingRight: 16,
                  borderRadius: 12,
                  border: "2px solid rgba(13,43,92,0.12)",
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "0.9rem",
                  outline: "none",
                  background: "#f8fafc",
                }}
              />
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#999" }}>
                <SearchIcon size={18} />
              </div>
            </div>
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={link.action}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "12px 16px",
                  borderRadius: 10,
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#0D2B5C",
                  textAlign: "left",
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(13,43,92,0.06)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.background = "none"; }}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      headline: "Tudo para\nsua obra",
      sub: "Os melhores materiais de construção com os melhores preços de Campo Mourão",
      cta: "Ver Promoções",
      ctaAction: () => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }),
      badge: "🏆 Mais de 1.256+ produtos",
    },
    {
      headline: "Pisos e\nRevestimentos",
      sub: "Semi gres, porcelanatos e pisos laminados com até 30% de desconto",
      cta: "Ver Pisos",
      ctaAction: () => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }),
      badge: "📦 234 produtos disponíveis",
    },
    {
      headline: "Entregamos\nna sua cidade",
      sub: "Campo Mourão e toda a região. Consulte prazo e frete pelo WhatsApp",
      cta: "Consultar Entrega",
      ctaAction: () => window.open(WHATSAPP_MSG("consulta de entrega"), "_blank"),
      badge: "🚚 Entrega para toda a região",
    },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(v => (v + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const s = slides[activeSlide];

  return (
    <section
      className="hero-gradient"
      style={{
        minHeight: "clamp(420px, 65vh, 640px)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative shapes */}
      <div style={{
        position: "absolute",
        right: "-80px",
        top: "-60px",
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "rgba(245,132,31,0.08)",
        pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute",
        right: "10%",
        bottom: "-40px",
        width: 280,
        height: 280,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.04)",
        pointerEvents: "none",
      }}/>
      {/* Grid pattern */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        pointerEvents: "none",
      }}/>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 20px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
        {/* Left */}
        <div style={{ zIndex: 1 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(245,132,31,0.15)",
            border: "1px solid rgba(245,132,31,0.3)",
            borderRadius: 999,
            padding: "6px 16px",
            marginBottom: 20,
          }}>
            <span style={{ fontSize: "0.8rem", color: "#F5841F", fontWeight: 700, fontFamily: "Nunito, sans-serif" }}>
              {s.badge}
            </span>
          </div>

          <h1 style={{
            fontFamily: "Barlow Condensed, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
            color: "white",
            lineHeight: 1.05,
            marginBottom: 20,
            whiteSpace: "pre-line",
          }}>
            {s.headline}
          </h1>

          <p style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.6,
            marginBottom: 32,
            maxWidth: 420,
          }}>
            {s.sub}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              className="btn-orange"
              onClick={s.ctaAction}
              style={{
                paddingTop: 14,
                paddingBottom: 14,
                paddingLeft: 28,
                paddingRight: 28,
                borderRadius: 14,
                border: "none",
                color: "white",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              {s.cta}
            </button>
            <button
              onClick={() => window.open(WHATSAPP_MSG(), "_blank")}
              style={{
                paddingTop: 14,
                paddingBottom: 14,
                paddingLeft: 28,
                paddingRight: 28,
                borderRadius: 14,
                border: "2px solid rgba(255,255,255,0.3)",
                color: "white",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                background: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                backdropFilter: "blur(4px)",
              }}
            >
              <WhatsappIcon size={18} />
              WhatsApp
            </button>
          </div>

          {/* Slide dots */}
          <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                style={{
                  width: i === activeSlide ? 24 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: i === activeSlide ? "#F5841F" : "rgba(255,255,255,0.3)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Right - Stats / Visual */}
        <div style={{ zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Store image */}
          <div style={{
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            border: "2px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            height: 220,
            position: "relative",
          }}>
            <img
              src="/store-front.jpg"
              alt="Loja Cavanha Materiais de Construção"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={e => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.style.background = "rgba(255,255,255,0.08)";
                (e.target as HTMLImageElement).parentElement!.innerHTML += `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(255,255,255,0.5);font-family:Barlow Condensed,sans-serif;font-size:1.2rem;">CAVANHA MATERIAIS</div>`;
              }}
            />
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(13,43,92,0.9) 0%, transparent 100%)",
              padding: "20px 16px 12px",
              color: "white",
              fontFamily: "Nunito, sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
            }}>
              📍 Campo Mourão, Paraná
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { number: "1.256+", label: "Produtos" },
              { number: "10 anos", label: "de experiência" },
              { number: "6", label: "Categorias" },
              { number: "Região", label: "Campo Mourão" },
            ].map(stat => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 14,
                  padding: "16px",
                  backdropFilter: "blur(4px)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#F5841F" }}>
                  {stat.number}
                </div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", marginTop: 2 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TRUST BAR ────────────────────────────────────────────────────────────────

function TrustBar() {
  const items = [
    { icon: <TruckIcon size={22} />, title: "Entrega na Região", sub: "Campo Mourão e cidades vizinhas" },
    { icon: <TagIcon size={22} />, title: "Melhor Preço", sub: "Garantia de menor preço" },
    { icon: <ShieldIcon size={22} />, title: "Produtos de Qualidade", sub: "Marcas líderes do mercado" },
    { icon: <WhatsappIcon size={22} />, title: "Atendimento no WhatsApp", sub: "Resposta rápida e eficiente" },
  ];

  return (
    <section style={{ background: "white", borderBottom: "1px solid rgba(13,43,92,0.08)", padding: "0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "20px 16px",
                borderRight: i < items.length - 1 ? "1px solid rgba(13,43,92,0.08)" : "none",
              }}
            >
              <div style={{ color: "#F5841F", flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#0D2B5C" }}>
                  {item.title}
                </div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.72rem", color: "#888", marginTop: 1 }}>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────

function Categories({ activeCategory, onSelect }: { activeCategory: string; onSelect: (cat: string) => void }) {
  return (
    <section id="categorias" style={{ padding: "60px 0 40px", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-block", background: "rgba(245,132,31,0.12)", borderRadius: 999, padding: "4px 16px", marginBottom: 12 }}>
            <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#F5841F", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Departamentos
            </span>
          </div>
          <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#0D2B5C", margin: 0 }}>
            Navegue por Categoria
          </h2>
          <p style={{ fontFamily: "Nunito, sans-serif", color: "#888", marginTop: 8, fontSize: "0.95rem" }}>
            Mais de 1.256 produtos organizados para você encontrar rapidinho
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
          {/* "All" button */}
          <button
            onClick={() => onSelect("")}
            style={{
              background: activeCategory === "" ? "linear-gradient(135deg, #0D2B5C, #1a4080)" : "white",
              border: `2px solid ${activeCategory === "" ? "#0D2B5C" : "rgba(13,43,92,0.1)"}`,
              borderRadius: 16,
              padding: "20px 12px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              boxShadow: activeCategory === "" ? "0 8px 20px rgba(13,43,92,0.25)" : "0 2px 8px rgba(13,43,92,0.06)",
              transform: activeCategory === "" ? "translateY(-3px)" : "none",
            }}
          >
            <span style={{ fontSize: "1.6rem" }}>🏪</span>
            <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.75rem", color: activeCategory === "" ? "white" : "#0D2B5C", textAlign: "center", lineHeight: 1.3 }}>
              Todos
            </span>
            <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.65rem", color: activeCategory === "" ? "rgba(255,255,255,0.7)" : "#F5841F", fontWeight: 700 }}>
              1.256+
            </span>
          </button>

          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              style={{
                background: activeCategory === cat.id ? "linear-gradient(135deg, #0D2B5C, #1a4080)" : "white",
                border: `2px solid ${activeCategory === cat.id ? "#0D2B5C" : "rgba(13,43,92,0.1)"}`,
                borderRadius: 16,
                padding: "20px 12px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                boxShadow: activeCategory === cat.id ? "0 8px 20px rgba(13,43,92,0.25)" : "0 2px 8px rgba(13,43,92,0.06)",
                transform: activeCategory === cat.id ? "translateY(-3px)" : "none",
              }}
              onMouseEnter={e => { if (activeCategory !== cat.id) { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 16px rgba(13,43,92,0.12)"; }}}
              onMouseLeave={e => { if (activeCategory !== cat.id) { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(13,43,92,0.06)"; }}}
            >
              <span style={{ fontSize: "1.6rem" }}>{cat.icon}</span>
              <span style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
                color: activeCategory === cat.id ? "white" : "#0D2B5C",
                textAlign: "center",
                lineHeight: 1.3,
                whiteSpace: "pre-line",
              }}>
                {cat.label}
              </span>
              <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.65rem", color: activeCategory === cat.id ? "rgba(255,255,255,0.7)" : "#F5841F", fontWeight: 700 }}>
                {cat.count} itens
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────

function PromoBanner() {
  return (
    <section style={{ background: "linear-gradient(135deg, #F5841F 0%, #e06b0a 100%)", padding: "32px 0", overflow: "hidden", position: "relative" }}>
      <div style={{
        position: "absolute",
        right: -60,
        top: -60,
        width: 240,
        height: 240,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
        pointerEvents: "none",
      }}/>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 900, fontSize: "clamp(1.4rem, 4vw, 2.2rem)", color: "white", letterSpacing: "0.02em" }}>
            🏗️ GRANDE LIQUIDAÇÃO DE PISOS — ATÉ 35% OFF
          </div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.9)", marginTop: 4 }}>
            Aproveite as melhores ofertas em pisos e revestimentos. Estoque limitado!
          </div>
        </div>
        <button
          className="btn-navy"
          onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            paddingTop: 12,
            paddingBottom: 12,
            paddingLeft: 28,
            paddingRight: 28,
            borderRadius: 12,
            border: "none",
            color: "white",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 800,
            fontSize: "0.95rem",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Ver Ofertas →
        </button>
      </div>
    </section>
  );
}

// ─── PRODUCTS SECTION ─────────────────────────────────────────────────────────

function ProductsSection({ activeCategory }: { activeCategory: string }) {
  const filtered = activeCategory
    ? PRODUCTS.filter(p => p.category === activeCategory)
    : PRODUCTS;

  return (
    <section id="produtos" style={{ padding: "60px 0", background: "white" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "inline-block", background: "rgba(13,43,92,0.07)", borderRadius: 999, padding: "4px 16px", marginBottom: 10 }}>
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#0D2B5C", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Produtos em Destaque
              </span>
            </div>
            <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#0D2B5C", margin: 0 }}>
              {activeCategory ? CATEGORIES.find(c => c.id === activeCategory)?.label.replace("\n", " ") || "Produtos" : "Mais Vendidos da Semana"}
            </h2>
            <p style={{ fontFamily: "Nunito, sans-serif", color: "#888", marginTop: 6, fontSize: "0.9rem" }}>
              {filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => window.open(WHATSAPP_MSG("catálogo completo"), "_blank")}
            style={{
              background: "none",
              border: "2px solid #0D2B5C",
              borderRadius: 10,
              padding: "10px 20px",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#0D2B5C",
              cursor: "pointer",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#0D2B5C"; (e.currentTarget as HTMLElement).style.color = "white"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = "#0D2B5C"; }}
          >
            Ver Catálogo Completo →
          </button>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>🔍</div>
            <p style={{ fontFamily: "Nunito, sans-serif", color: "#888", fontSize: "1rem" }}>
              Nenhum produto encontrado nessa categoria com dados mock. Entre em contato pelo WhatsApp para ver o catálogo completo!
            </p>
            <button
              className="btn-orange"
              onClick={() => window.open(WHATSAPP_MSG(), "_blank")}
              style={{ marginTop: 20, padding: "12px 24px", borderRadius: 12, border: "none", color: "white", fontFamily: "Nunito, sans-serif", fontWeight: 700, cursor: "pointer" }}
            >
              <WhatsappIcon size={16} /> Falar com a loja
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load more / catalog CTA */}
        <div style={{ marginTop: 48, background: "linear-gradient(135deg, #f8fafc, #f0f4ff)", borderRadius: 20, padding: "32px", textAlign: "center", border: "1px solid rgba(13,43,92,0.08)" }}>
          <h3 style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#0D2B5C", marginBottom: 8 }}>
            Não encontrou o que procura?
          </h3>
          <p style={{ fontFamily: "Nunito, sans-serif", color: "#888", fontSize: "0.9rem", marginBottom: 20 }}>
            Temos mais de 1.256 produtos. Fale conosco pelo WhatsApp e encontramos o que você precisa!
          </p>
          <button
            className="btn-orange"
            onClick={() => window.open(WHATSAPP_MSG(), "_blank")}
            style={{
              paddingTop: 14,
              paddingBottom: 14,
              paddingLeft: 32,
              paddingRight: 32,
              borderRadius: 14,
              border: "none",
              color: "white",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <WhatsappIcon size={20} />
            Falar com a Cavanha
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section id="depoimentos" style={{ padding: "60px 0", background: "#f8fafc" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", background: "rgba(245,132,31,0.12)", borderRadius: 999, padding: "4px 16px", marginBottom: 12 }}>
            <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#F5841F", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Depoimentos
            </span>
          </div>
          <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#0D2B5C", margin: 0 }}>
            O que nossos clientes dizem
          </h2>
          <p style={{ fontFamily: "Nunito, sans-serif", color: "#888", marginTop: 8, fontSize: "0.95rem" }}>
            Centenas de famílias e profissionais confiam na Cavanha
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              style={{
                background: "white",
                borderRadius: 20,
                padding: "28px",
                boxShadow: "0 4px 20px rgba(13,43,92,0.08)",
                border: "1px solid rgba(13,43,92,0.06)",
                position: "relative",
              }}
            >
              {/* Quote mark */}
              <div style={{
                position: "absolute",
                top: 20,
                right: 24,
                fontFamily: "Georgia, serif",
                fontSize: "4rem",
                color: "rgba(13,43,92,0.06)",
                lineHeight: 1,
                fontWeight: 900,
              }}>"</div>

              <Stars count={t.stars} />

              <p style={{
                fontFamily: "Nunito, sans-serif",
                fontSize: "0.92rem",
                color: "#555",
                lineHeight: 1.7,
                marginTop: 16,
                marginBottom: 24,
                fontStyle: "italic",
              }}>
                "{t.text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, #0D2B5C, #1a4080)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontFamily: "Barlow Condensed, sans-serif",
                  fontWeight: 800,
                  fontSize: "1rem",
                  flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "0.92rem", color: "#0D2B5C" }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.75rem", color: "#F5841F", fontWeight: 600 }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DELIVERY SECTION ─────────────────────────────────────────────────────────

function DeliverySection() {
  const cities = [
    "Campo Mourão", "Ubiratã", "Luiziana", "Barbosa Ferraz",
    "Araruna", "Engenheiro Beltrão", "Mamborê", "Corumbataí do Sul",
    "Iretama", "Roncador", "Mato Rico", "Peabiru",
  ];

  return (
    <section id="entrega" style={{ padding: "60px 0", background: "white" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        {/* Left */}
        <div>
          <div style={{ display: "inline-block", background: "rgba(13,43,92,0.07)", borderRadius: 999, padding: "4px 16px", marginBottom: 16 }}>
            <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#0D2B5C", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Área de Entrega
            </span>
          </div>
          <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#0D2B5C", marginBottom: 16 }}>
            Entregamos em<br /><span style={{ color: "#F5841F" }}>Campo Mourão</span><br />e Região
          </h2>
          <p style={{ fontFamily: "Nunito, sans-serif", color: "#666", lineHeight: 1.7, fontSize: "0.95rem", marginBottom: 24 }}>
            Nossa frota própria cobre toda a região de Campo Mourão com agilidade e segurança. Consulte prazo e valor do frete pelo WhatsApp!
          </p>

          <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
            <button
              className="btn-orange"
              onClick={() => window.open(WHATSAPP_MSG("consulta de frete e entrega"), "_blank")}
              style={{
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 24,
                paddingRight: 24,
                borderRadius: 12,
                border: "none",
                color: "white",
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <WhatsappIcon size={16} />
              Consultar Frete
            </button>
          </div>

          {/* City chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {cities.map(city => (
              <span
                key={city}
                style={{
                  background: city === "Campo Mourão" ? "#0D2B5C" : "rgba(13,43,92,0.06)",
                  color: city === "Campo Mourão" ? "white" : "#0D2B5C",
                  padding: "6px 14px",
                  borderRadius: 999,
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                }}
              >
                📍 {city}
              </span>
            ))}
          </div>
        </div>

        {/* Right - Map visual */}
        <div style={{
          background: "linear-gradient(135deg, #f0f4ff, #e8f0fe)",
          borderRadius: 24,
          padding: "40px",
          border: "1px solid rgba(13,43,92,0.08)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(13,43,92,0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            pointerEvents: "none",
          }}/>
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ position: "relative", zIndex: 1 }}>
            {/* Simplified Paraná map-ish shape */}
            <circle cx="100" cy="100" r="80" fill="rgba(13,43,92,0.06)" stroke="rgba(13,43,92,0.15)" strokeWidth="2"/>
            <circle cx="100" cy="100" r="50" fill="rgba(13,43,92,0.08)" stroke="rgba(13,43,92,0.2)" strokeWidth="1.5"/>
            {/* Location pin */}
            <circle cx="100" cy="100" r="18" fill="#0D2B5C"/>
            <path d="M100 82 C89 82 80 91 80 102 C80 115 100 125 100 125 C100 125 120 115 120 102 C120 91 111 82 100 82z" fill="#F5841F"/>
            <circle cx="100" cy="100" r="6" fill="white"/>
            {/* Radial lines */}
            {[0,45,90,135,180,225,270,315].map(angle => {
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={angle}
                  x1={100 + 20 * Math.cos(rad)}
                  y1={100 + 20 * Math.sin(rad)}
                  x2={100 + 75 * Math.cos(rad)}
                  y2={100 + 75 * Math.sin(rad)}
                  stroke="rgba(13,43,92,0.08)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })}
          </svg>
          <div style={{ position: "relative", zIndex: 1, marginTop: 16 }}>
            <div style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#0D2B5C" }}>
              Campo Mourão, PR
            </div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.82rem", color: "#666", marginTop: 4 }}>
              E toda a região do Paraná Central
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── INSTAGRAM CTA ────────────────────────────────────────────────────────────

function SocialCTA() {
  return (
    <section style={{ padding: "60px 0", background: "linear-gradient(135deg, #0D2B5C 0%, #1a4080 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        pointerEvents: "none",
      }}/>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "white", marginBottom: 16 }}>
          Nos siga nas Redes Sociais!
        </h2>
        <p style={{ fontFamily: "Nunito, sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "1rem", marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
          Acompanhe nossas promoções exclusivas, dicas de obra e novidades no Instagram e WhatsApp!
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://instagram.com/cavanhamateriais"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              borderRadius: 14,
              background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              color: "white",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(220,39,67,0.4)",
            }}
          >
            <InstagramIcon size={20} />
            @cavanhamateriais
          </a>
          <button
            className="btn-orange"
            onClick={() => window.open(WHATSAPP_MSG(), "_blank")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              borderRadius: 14,
              border: "none",
              color: "white",
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            <WhatsappIcon size={20} />
            WhatsApp Business
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "#060F1F", color: "white", padding: "48px 0 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, paddingBottom: 40 }}>
          {/* Brand column */}
          <div>
            <CavanhaLogoWhite size={38} />
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginTop: 16, maxWidth: 280 }}>
              Sua loja de materiais de construção em Campo Mourão. Aqui você encontra qualidade, variedade e o melhor preço da região!
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <a href="https://instagram.com/cavanhamateriais" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                <InstagramIcon size={16} />
              </a>
              <button onClick={() => window.open(WHATSAPP_MSG(), "_blank")}
                style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", border: "none", cursor: "pointer" }}>
                <WhatsappIcon size={16} />
              </button>
            </div>
          </div>

          {/* Departments */}
          <div>
            <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F5841F", marginBottom: 16, letterSpacing: "0.05em" }}>DEPARTAMENTOS</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {CATEGORIES.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => document.getElementById("categorias")?.scrollIntoView({ behavior: "smooth" })}
                    style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", cursor: "pointer", padding: 0, textAlign: "left" }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "white"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.65)"}
                  >
                    {cat.label.replace("\n", " ")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F5841F", marginBottom: 16, letterSpacing: "0.05em" }}>NAVEGAÇÃO</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Início", "Produtos", "Ofertas", "Sobre Nós", "Entrega", "Contato"].map(link => (
                <li key={link}>
                  <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", cursor: "pointer", padding: 0 }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "white"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.65)"}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "Barlow Condensed, sans-serif", fontWeight: 700, fontSize: "1rem", color: "#F5841F", marginBottom: 16, letterSpacing: "0.05em" }}>CONTATO</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", display: "flex", gap: 8, alignItems: "flex-start" }}>
                <MapPinIcon size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Campo Mourão, PR<br/>Paraná Central</span>
              </div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", display: "flex", gap: 8, alignItems: "center" }}>
                <PhoneIcon size={16} />
                <span>(44) 9999-9999</span>
              </div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                Seg-Sex: 7h às 18h<br/>Sábado: 7h às 13h
              </div>
              <button
                className="btn-orange"
                onClick={() => window.open(WHATSAPP_MSG(), "_blank")}
                style={{
                  marginTop: 8,
                  padding: "10px 16px",
                  borderRadius: 10,
                  border: "none",
                  color: "white",
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <WhatsappIcon size={14} />
                Chamar no WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>
            © {new Date().getFullYear()} Cavanha Materiais de Construção. Todos os direitos reservados.
          </p>
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", margin: 0 }}>
            Campo Mourão — Paraná, Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── WHATSAPP FLOAT ───────────────────────────────────────────────────────────

function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div
      className="float-wpp"
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 999,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s",
      }}
    >
      <button
        onClick={() => window.open(WHATSAPP_MSG(), "_blank")}
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #25d366, #128c7e)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          boxShadow: "0 8px 32px rgba(37,211,102,0.4), 0 2px 8px rgba(0,0,0,0.15)",
        }}
        title="Falar pelo WhatsApp"
      >
        <WhatsappIcon size={30} />
      </button>
      {/* Pulse ring */}
      <div style={{
        position: "absolute",
        inset: -8,
        borderRadius: "50%",
        border: "2px solid rgba(37,211,102,0.4)",
        animation: "pulse-badge 2s infinite",
        pointerEvents: "none",
      }}/>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function CavanhaApp() {
  const [activeCategory, setActiveCategory] = useState("");

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setTimeout(() => {
      document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <Header onCategoryClick={handleCategoryClick} />
      <main>
        <Hero />
        <TrustBar />
        <PromoBanner />
        <Categories activeCategory={activeCategory} onSelect={handleCategoryClick} />
        <ProductsSection activeCategory={activeCategory} />
        <Testimonials />
        <DeliverySection />
        <SocialCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CavanhaApp />
    </QueryClientProvider>
  );
}
