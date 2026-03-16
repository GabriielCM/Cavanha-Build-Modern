
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

        {/* Scrolling Track */}
        <motion.div
          className="flex items-center gap-16 group-hover:[animation-play-state:paused]"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="flex h-16 min-w-[140px] items-center justify-center px-4"
            >
              <span className="whitespace-nowrap font-[Barlow_Condensed,sans-serif] text-2xl font-black uppercase tracking-wider text-gray-300 transition-colors duration-300 hover:text-[#0D2B5C]">
                {brand}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
