
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShoppingCart, MessageCircle, Eye } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { WHATSAPP_MSG } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const images = product.images?.length ? product.images : [product.imageUrl];

  useEffect(() => {
    if (images.length <= 1) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile && !isHovered) {
      setCurrentImg(0);
      return;
    }
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)
    : 0;

  return (
    <motion.div
      className="group relative flex h-[420px] w-[280px] min-w-[280px] max-w-[280px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Area */}
      <div
        className="relative flex h-52 items-center justify-center overflow-hidden p-4"
        style={{ backgroundColor: product.imageBg }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={images[currentImg]}
            alt={product.name}
            className="h-full max-h-40 w-auto object-contain"
            initial={images.length > 1 ? { opacity: 0 } : false}
            animate={{ opacity: 1, scale: isHovered ? 1.08 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>

        {/* Image Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImg(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentImg ? "w-4 bg-[#F5841F]" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        {/* Tag Badge */}
        {product.tag && (
          <div className="absolute left-3 top-3">
            <motion.span
              className={`inline-block rounded-full px-3 py-1 font-[Barlow_Condensed,sans-serif] text-xs font-bold uppercase tracking-wider text-white ${
                product.tag === "Mais Vendido"
                  ? "bg-[#0D2B5C]"
                  : product.tag === "Oferta"
                  ? "bg-red-500"
                  : "bg-[#F5841F]"
              }`}
              animate={
                product.tag === "Mais Vendido"
                  ? {
                      boxShadow: [
                        "0 0 0 0 rgba(13,43,92,0.4)",
                        "0 0 0 8px rgba(13,43,92,0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {product.tag}
            </motion.span>
          </div>
        )}

        {/* Discount Badge */}
        {hasDiscount && (
          <div
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-500 font-[Barlow_Condensed,sans-serif] text-xs font-black text-white shadow-md"
          >
            -{discountPercent}%
          </div>
        )}

        {/* Hover Overlay — barra compacta no rodapé */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-2 rounded-t-xl bg-[#0D2B5C]/90 px-3 py-2.5 backdrop-blur-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <motion.button
                className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 font-[Barlow_Condensed,sans-serif] text-xs font-bold uppercase tracking-wider text-[#0D2B5C] shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="h-3.5 w-3.5" />
                Detalhes
              </motion.button>

              <motion.a
                href={WHATSAPP_MSG(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-[#25D366] px-3 py-1.5 font-[Barlow_Condensed,sans-serif] text-xs font-bold uppercase tracking-wider text-white shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Area */}
      <div className="flex flex-1 flex-col p-4">
        <span className="mb-1 font-[Nunito,sans-serif] text-xs font-semibold uppercase tracking-wider text-gray-400">
          {product.brand} &middot; {product.spec}
        </span>
        <h4 className="mb-3 line-clamp-2 font-[Nunito,sans-serif] text-sm font-bold leading-snug text-[#0D2B5C]">
          {product.name}
        </h4>

        <div className="mt-auto flex items-end justify-between">
          <div>
            {hasDiscount && (
              <span className="block font-[Nunito,sans-serif] text-xs text-gray-400 line-through">
                R$ {product.oldPrice!.toFixed(2).replace(".", ",")}
              </span>
            )}
            <span className="font-[Barlow_Condensed,sans-serif] text-xl font-black text-[#F5841F]">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
            <span className="ml-1 font-[Nunito,sans-serif] text-xs text-gray-400">
              /{product.unit}
            </span>
          </div>

          <motion.button
            onClick={() => onAddToCart(product)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D2B5C] text-white shadow-md"
            whileHover={{ scale: 1.15, backgroundColor: "#F5841F" }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart className="h-4 w-4" />
          </motion.button>
        </div>

        {/* Buyers count */}
        {product.buyers > 0 && (
          <p className="mt-2 font-[Nunito,sans-serif] text-[10px] text-gray-400">
            {product.buyers} pessoas compraram recentemente
          </p>
        )}
      </div>
    </motion.div>
  );
}
