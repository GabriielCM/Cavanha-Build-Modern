
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/shared/ShimmerButton";
import { ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-28">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #F5841F 0%, #e06b0a 40%, #c75a00 100%)",
            "linear-gradient(135deg, #e06b0a 0%, #F5841F 40%, #ff9a3c 100%)",
            "linear-gradient(135deg, #c75a00 0%, #e06b0a 40%, #F5841F 100%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Decorative Floating Shapes */}
      <motion.div
        className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10"
        animate={{ y: [0, 30, 0], x: [0, 15, 0], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-16 right-10 h-48 w-48 rotate-45 rounded-3xl bg-white/5"
        animate={{ y: [0, -25, 0], rotate: [45, 135, 45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute right-1/3 top-10 h-32 w-32 rounded-full bg-white/5"
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-10 left-1/4 h-24 w-24 rotate-12 rounded-2xl bg-white/5"
        animate={{ rotate: [12, 72, 12], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="mb-4 font-[Nunito,sans-serif] text-sm font-bold uppercase tracking-[0.3em] text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Oferta por tempo limitado
          </motion.p>

          <h2 className="font-[Barlow_Condensed,sans-serif] text-5xl font-black uppercase leading-none tracking-tight text-white md:text-7xl lg:text-8xl">
            Grande Liquidacao
            <br />
            <span className="relative inline-block">
              de Pisos
              {/* Underline decoration */}
              <motion.div
                className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-white/30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
              />
            </span>
          </h2>

          <motion.p
            className="mx-auto mt-6 max-w-xl font-[Barlow_Condensed,sans-serif] text-3xl font-black uppercase text-white/90 md:text-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Ate{" "}
            <span className="relative inline-block text-[#0D2B5C]">
              35% OFF
              <motion.div
                className="absolute -inset-2 -z-10 rounded-lg bg-white"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              />
            </span>
          </motion.p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <ShimmerButton
              variant="navy"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Ver Ofertas
            </ShimmerButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
