
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/mock-data";
import { staggerContainerSlow, fadeInLeft } from "@/lib/animations";

interface CategoriesProps {
  onSelect: (categoryId: string) => void;
}

export function Categories({ onSelect }: CategoriesProps) {
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

        {/* Category Grid */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {CATEGORIES.map((category, index) => (
            <motion.button
              key={category.id}
              variants={fadeInLeft}
              onClick={() => onSelect(category.id)}
              className="group relative h-64 cursor-pointer overflow-hidden rounded-2xl border-none bg-transparent p-0 text-left sm:h-72 lg:h-80"
            >
              {/* Background Image */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
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
        </motion.div>
      </div>
    </section>
  );
}
