
import { motion } from "framer-motion";
import { Truck, Tag, Shield, MessageCircle } from "lucide-react";
import { staggerContainer, staggerChild, hoverGlow } from "@/lib/animations";

const FEATURES = [
  {
    icon: Truck,
    title: "Entrega Regional",
    description: "Entregamos em 12+ cidades da regiao de Campo Mourao",
    accent: "#F5841F",
  },
  {
    icon: Tag,
    title: "Melhor Preco",
    description: "Precos competitivos com garantia de menor preco da regiao",
    accent: "#0D2B5C",
  },
  {
    icon: Shield,
    title: "Qualidade Garantida",
    description: "Trabalhamos apenas com marcas lideres do mercado",
    accent: "#F5841F",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Direto",
    description: "Tire duvidas e faca pedidos pelo WhatsApp em segundos",
    accent: "#25D366",
  },
];

export function TrustBar() {
  return (
    <motion.section
      className="w-full bg-white py-12 md:py-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={staggerChild}
              whileHover={hoverGlow}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-[rgba(245,132,31,0.08)]"
            >
              {/* Accent top border */}
              <div
                className="absolute left-0 top-0 h-1 w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: feature.accent }}
              />

              {/* Glow background on hover */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
                style={{ background: feature.accent }}
              />

              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300"
                style={{ backgroundColor: `${feature.accent}15` }}
              >
                <feature.icon
                  className="h-6 w-6 transition-colors duration-300"
                  style={{ color: feature.accent }}
                />
              </div>

              <h3 className="mb-1.5 font-[Barlow_Condensed,sans-serif] text-lg font-black uppercase tracking-wide text-[#0D2B5C]">
                {feature.title}
              </h3>
              <p className="font-[Nunito,sans-serif] text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
