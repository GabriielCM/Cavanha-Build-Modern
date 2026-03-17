
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock-data";
import { BeforeAfter } from "@/components/shared/BeforeAfter";
import { staggerContainerSlow, staggerChild } from "@/lib/animations";

export function Testimonials() {
  return (
    <section className="w-full bg-gray-50 py-20 md:py-28" id="obras">
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
            O que nossos clientes
            <br />
            <span className="text-[#F5841F]">dizem</span>
          </h2>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-[#F5841F]" />
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={staggerChild}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
            >
              {/* Before/After Slider */}
              <BeforeAfter
                beforeImage={testimonial.beforeImage}
                afterImage={testimonial.afterImage}
              />

              {/* Content */}
              <div className="p-6">
                {/* Stars */}
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.stars
                          ? "fill-[#F5841F] text-[#F5841F]"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-5 font-[Nunito,sans-serif] text-sm leading-relaxed text-gray-600">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full font-[Barlow_Condensed,sans-serif] text-sm font-bold text-[#0D2B5C]"
                    style={{ backgroundColor: testimonial.color }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-[Barlow_Condensed,sans-serif] text-sm font-bold uppercase tracking-wide text-[#0D2B5C]">
                      {testimonial.name}
                    </p>
                    <p className="font-[Nunito,sans-serif] text-xs text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
