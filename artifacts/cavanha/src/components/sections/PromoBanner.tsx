import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/shared/ShimmerButton";
import { ArrowRight, Truck, MessageCircle } from "lucide-react";
import { WHATSAPP_MSG } from "@/lib/mock-data";
import { staggerContainer, staggerChild } from "@/lib/animations";

export function PromoBanner() {
  return (
    <section className="relative w-full overflow-hidden py-14 md:py-20 lg:py-28">
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

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              variants={staggerChild}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <span className="font-[Nunito,sans-serif] text-white font-bold text-sm uppercase tracking-[0.15em]">
                Oferta por tempo limitado
              </span>
            </motion.div>

            <motion.h2
              variants={staggerChild}
              className="font-[Barlow_Condensed,sans-serif] font-black uppercase leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              Grande Liquidacao
              <br />
              <span className="relative inline-block">
                de Pisos
                <motion.div
                  className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-white/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.h2>

            <motion.p
              variants={staggerChild}
              className="mt-6 font-[Barlow_Condensed,sans-serif] text-3xl md:text-4xl font-black uppercase text-white/90"
            >
              Ate{" "}
              <span className="relative inline-block rounded-lg bg-white px-3 py-1 text-[#0D2B5C] promo-badge-glow">
                35% OFF
              </span>
            </motion.p>

            <motion.div
              variants={staggerChild}
              className="mt-10 flex gap-4 flex-wrap justify-center lg:justify-start"
            >
              <ShimmerButton
                variant="navy"
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver Ofertas
              </ShimmerButton>
              <ShimmerButton
                variant="white"
                size="lg"
                icon={<MessageCircle size={18} />}
                onClick={() => window.open(WHATSAPP_MSG(), "_blank")}
              >
                Fale Conosco
              </ShimmerButton>
            </motion.div>
          </motion.div>

          {/* Right — Image composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 60 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2 mx-auto lg:mx-0 max-w-[280px] lg:max-w-none"
          >
            {/* Main image card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 25px 80px rgba(0,0,0,0.3)",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              <img
                src="/porcelanato.png"
                alt="Porcelanato polido em ambiente elegante"
                className="w-full h-48 lg:h-[420px] object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 40%)",
                }}
              />
            </div>

            {/* Floating card — Price */}
            <motion.div
              className="hidden lg:block absolute -left-8 top-8 rounded-2xl px-5 py-4"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="font-[Barlow_Condensed,sans-serif] font-black text-white text-2xl">
                R$ 39,90
                <span className="text-sm font-semibold text-white/70">/m²</span>
              </div>
              <div className="font-[Nunito,sans-serif] text-white/70 text-xs">
                a partir de
              </div>
            </motion.div>

            {/* Floating card — Free shipping */}
            <motion.div
              className="hidden lg:block absolute -right-4 bottom-16 rounded-2xl px-5 py-3"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-white" />
                <span className="font-[Nunito,sans-serif] text-white font-semibold text-sm">
                  Frete Gratis
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
