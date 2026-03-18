
import { motion } from "framer-motion";
import { BRANDS } from "@/lib/mock-data";

export function BrandsMarquee() {
  // Duplicate brands for seamless infinite loop
  const duplicatedBrands = [...BRANDS, ...BRANDS];

  return (
    <section className="w-full overflow-hidden border-t border-gray-100 bg-white py-12 md:py-16">
      <div className="mx-auto mb-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="text-center font-[Barlow_Condensed,sans-serif] text-sm font-bold uppercase tracking-[0.25em] text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Marcas que confiamos e trabalhamos
        </motion.p>
      </div>

      {/* Marquee Container */}
      <div className="group relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        {/* Scrolling Track — uses CSS marquee animation from index.css */}
        <div
          className="marquee-track flex items-center gap-16"
          style={{ width: "fit-content" }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex h-28 min-w-[200px] items-center justify-center px-4"
            >
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-28 w-[180px] object-contain transition-all duration-400 hover:scale-140"
                  style={brand.scale ? { transform: `scale(${brand.scale})` } : undefined}
                  loading="lazy"
                />
              ) : (
                <span className="whitespace-nowrap font-[Barlow_Condensed,sans-serif] text-3xl font-black uppercase tracking-wider text-gray-500 transition-all duration-400 hover:scale-140 hover:text-[#0D2B5C]">
                  {brand.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
