
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoriesProps {
  onSelect: (categoryId: string) => void;
}

const VISIBLE = 4;

export function Categories({ onSelect }: CategoriesProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const total = CATEGORIES.length;

  const prev = () => setStartIndex((i) => (i - 1 + total) % total);
  const next = () => setStartIndex((i) => (i + 1) % total);

  const visibleCategories = Array.from({ length: VISIBLE }, (_, i) =>
    CATEGORIES[(startIndex + i) % total]
  );

  return (
    <section className="w-full bg-gray-50 py-20 md:py-28" id="categorias">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <h2 className="font-[Barlow_Condensed,sans-serif] text-4xl font-black uppercase leading-none tracking-tight text-[#0D2B5C] md:text-5xl lg:text-6xl">
            Encontre por
            <br />
            <span className="text-[#F5841F]">Ambiente</span>
          </h2>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-[#F5841F]" />
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left arrow */}
          <AnimatePresence>
            {isHovering && (
              <motion.button
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                onClick={prev}
                className="absolute -left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110"
              >
                <ChevronLeft size={24} className="text-[#0D2B5C]" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Right arrow */}
          <AnimatePresence>
            {isHovering && (
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                onClick={next}
                className="absolute -right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110"
              >
                <ChevronRight size={24} className="text-[#0D2B5C]" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visibleCategories.map((category) => (
                <motion.button
                  key={category.id}
                  layout
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => onSelect(category.id)}
                  className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl border-none bg-transparent p-0 text-left sm:h-72 lg:h-80"
                >
                  {/* Background Image */}
                  <motion.div
                    className={`absolute inset-0 ${category.imageFit === "contain" ? "bg-contain bg-no-repeat" : "bg-cover"}`}
                    style={{ backgroundImage: `url(${category.image})`, backgroundColor: category.color, backgroundPosition: category.imagePosition || "center" }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors duration-500 group-hover:from-black/50 group-hover:via-black/10" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 flex flex-col p-6">
                    <motion.span
                      className="mb-1 font-[Nunito,sans-serif] text-sm font-semibold uppercase tracking-widest text-[#F5841F]"
                      initial={false}
                    >
                      {category.count} produtos
                    </motion.span>
                    <h3 className="font-[Barlow_Condensed,sans-serif] text-2xl font-black uppercase tracking-wide text-white transition-transform duration-500 group-hover:-translate-y-1 md:text-3xl">
                      {category.label}
                    </h3>

                    {/* Hover reveal bar */}
                    <div className="mt-3 h-0.5 w-0 rounded-full bg-[#F5841F] transition-all duration-500 group-hover:w-16" />
                  </div>

                  {/* Corner icon */}
                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                    {category.icon}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="mt-6 flex justify-center gap-2">
            {CATEGORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === startIndex
                    ? "w-6 bg-[#F5841F]"
                    : "w-2 bg-[#0D2B5C]/20 hover:bg-[#0D2B5C]/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
