
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { CATEGORIES } from "@/lib/mock-data";
import { ProductCard } from "@/components/sections/ProductCard";
import { fadeInUp, staggerContainer, staggerChild } from "@/lib/animations";

interface ProductCarouselProps {
  products: Product[];
  activeCategory: string;
  onAddToCart: (product: Product) => void;
}

function CarouselRow({
  title,
  products,
  onAddToCart,
}: {
  title: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      className="mb-12"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Row Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-[Barlow_Condensed,sans-serif] text-2xl font-black uppercase tracking-wide text-[#0D2B5C] md:text-3xl">
          {title}
        </h3>
        <div className="flex gap-2">
          <motion.button
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#0D2B5C] shadow-sm"
            whileHover={{ scale: 1.1, backgroundColor: "#0D2B5C", color: "#fff" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#0D2B5C] shadow-sm"
            whileHover={{ scale: 1.1, backgroundColor: "#0D2B5C", color: "#fff" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Scrollable Row */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div key={product.id} className="snap-start">
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function ProductCarousel({
  products,
  activeCategory,
  onAddToCart,
}: ProductCarouselProps) {
  // Group products by category
  const groupedProducts = products.reduce<Record<string, Product[]>>((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  // Get categories to display (filter by activeCategory if not "all")
  const categoriesToShow =
    activeCategory === "all" || !activeCategory
      ? Object.keys(groupedProducts)
      : [activeCategory].filter((cat) => groupedProducts[cat]);

  const getCategoryLabel = (id: string) =>
    CATEGORIES.find((c) => c.id === id)?.label || id;

  return (
    <section className="w-full bg-white py-16 md:py-24" id="produtos">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <h2 className="font-[Barlow_Condensed,sans-serif] text-4xl font-black uppercase leading-none tracking-tight text-[#0D2B5C] md:text-5xl lg:text-6xl">
            Nossos{" "}
            <span className="text-[#F5841F]">Produtos</span>
          </h2>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-[#F5841F]" />
        </motion.div>

        {categoriesToShow.map((categoryId) => (
          <CarouselRow
            key={categoryId}
            title={getCategoryLabel(categoryId)}
            products={groupedProducts[categoryId]}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
