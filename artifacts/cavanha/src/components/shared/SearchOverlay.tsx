import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/lib/mock-data";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !isOpen) {
        e.preventDefault();
        // parent should open
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const filteredProducts = query.length > 1
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh]"
          style={{
            background: "rgba(13, 43, 92, 0.85)",
            backdropFilter: "blur(20px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="relative">
              <Search
                size={28}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50"
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar produtos, marcas, categorias..."
                className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 pl-16 pr-14 text-xl text-white placeholder:text-white/40 font-[Nunito,sans-serif] outline-none focus:border-[#F5841F]/50 focus:bg-white/15 transition-all"
              />
              <button
                onClick={onClose}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer bg-transparent border-none"
              >
                <X size={24} />
              </button>
            </div>

            {/* Results */}
            {query.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden max-h-[50vh] overflow-y-auto"
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                      className="flex items-center gap-4 px-6 py-4 cursor-pointer border-b border-white/5 last:border-b-0"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                        style={{ background: product.imageBg }}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-sm truncate font-[Barlow_Condensed,sans-serif]">
                          {product.name}
                        </div>
                        <div className="text-white/50 text-xs font-[Nunito,sans-serif]">
                          {product.brand} · {product.spec}
                        </div>
                      </div>
                      <div className="text-[#F5841F] font-bold font-[Barlow_Condensed,sans-serif]">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="px-6 py-8 text-center text-white/40 font-[Nunito,sans-serif]">
                    Nenhum produto encontrado para "{query}"
                  </div>
                )}
              </motion.div>
            )}

            {/* Popular Categories */}
            {query.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-6"
              >
                <div className="text-white/40 text-sm mb-3 font-[Nunito,sans-serif] px-1">
                  Categorias populares
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setQuery(cat.label)}
                      className="px-4 py-2 rounded-full bg-white/10 text-white/70 text-sm font-[Nunito,sans-serif] hover:bg-white/20 hover:text-white transition-all cursor-pointer border-none"
                    >
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Keyboard hint */}
            <div className="mt-4 text-center text-white/20 text-xs font-[Nunito,sans-serif]">
              Pressione <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-white/40">ESC</kbd> para fechar
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
