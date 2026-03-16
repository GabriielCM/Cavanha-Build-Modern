
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";
import { CATEGORIES, NAV_ITEMS, WHATSAPP_MSG } from "@/lib/mock-data";
import { staggerContainer, staggerChild, fadeInUp } from "@/lib/animations";

export function MegaFooter() {
  return (
    <footer className="w-full bg-[#060F1F] pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Brand Column */}
          <motion.div variants={staggerChild}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5841F] font-[Barlow_Condensed,sans-serif] text-xl font-black text-white">
                C
              </div>
              <div>
                <span className="font-[Barlow_Condensed,sans-serif] text-lg font-black uppercase tracking-wider text-white">
                  Cavanha
                </span>
                <span className="block font-[Nunito,sans-serif] text-[10px] uppercase tracking-[0.2em] text-gray-500">
                  Materiais de Construcao
                </span>
              </div>
            </div>
            <p className="mb-6 font-[Nunito,sans-serif] text-sm leading-relaxed text-gray-500">
              Construindo sonhos em Campo Mourao e regiao desde 2014. Qualidade, preco
              justo e atendimento que faz a diferenca.
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://instagram.com/cavanha.cm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-500 transition-colors hover:bg-[#E1306C] hover:text-white"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://facebook.com/cavanhamateriais"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-500 transition-colors hover:bg-[#1877F2] hover:text-white"
                whileHover={{ scale: 1.1 }}
              >
                <Facebook className="h-4 w-4" />
              </motion.a>
              <motion.a
                href={WHATSAPP_MSG()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-500 transition-colors hover:bg-[#25D366] hover:text-white"
                whileHover={{ scale: 1.1 }}
              >
                <MessageCircle className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Departamentos Column */}
          <motion.div variants={staggerChild}>
            <h4 className="mb-5 font-[Barlow_Condensed,sans-serif] text-sm font-bold uppercase tracking-[0.2em] text-[#F5841F]">
              Departamentos
            </h4>
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="group inline-flex items-center font-[Nunito,sans-serif] text-sm text-gray-500 transition-colors hover:text-white"
                  >
                    <span className="relative">
                      {cat.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#F5841F] transition-all duration-300 group-hover:w-full" />
                    </span>
                    <span className="ml-2 font-[Nunito,sans-serif] text-xs text-gray-700">
                      ({cat.count})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Navegacao Column */}
          <motion.div variants={staggerChild}>
            <h4 className="mb-5 font-[Barlow_Condensed,sans-serif] text-sm font-bold uppercase tracking-[0.2em] text-[#F5841F]">
              Navegacao
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.section ? `#${item.section}` : item.href || "#"}
                    className="group inline-flex items-center font-[Nunito,sans-serif] text-sm text-gray-500 transition-colors hover:text-white"
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#F5841F] transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contato Column */}
          <motion.div variants={staggerChild}>
            <h4 className="mb-5 font-[Barlow_Condensed,sans-serif] text-sm font-bold uppercase tracking-[0.2em] text-[#F5841F]">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F5841F]" />
                <div>
                  <p className="font-[Nunito,sans-serif] text-sm font-semibold text-white">
                    (44) 99999-9999
                  </p>
                  <p className="font-[Nunito,sans-serif] text-xs text-gray-500">
                    WhatsApp &amp; Ligacoes
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F5841F]" />
                <div>
                  <p className="font-[Nunito,sans-serif] text-sm text-gray-400">
                    Av. Irmãos Pereira, 1500
                  </p>
                  <p className="font-[Nunito,sans-serif] text-sm text-gray-400">
                    Campo Mourao - PR
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#F5841F]" />
                <div>
                  <p className="font-[Nunito,sans-serif] text-sm text-gray-400">
                    Seg - Sex: 7:30 - 18:00
                  </p>
                  <p className="font-[Nunito,sans-serif] text-sm text-gray-400">
                    Sab: 8:00 - 12:00
                  </p>
                </div>
              </li>
            </ul>

            {/* Map Placeholder */}
            <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-[#0a1a36] border border-white/5">
              <div className="text-center">
                <MapPin className="mx-auto mb-1 h-6 w-6 text-[#F5841F]/50" />
                <span className="font-[Nunito,sans-serif] text-xs text-gray-600">
                  Google Maps
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-16 border-t border-white/5 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="font-[Nunito,sans-serif] text-xs text-gray-600">
              &copy; {new Date().getFullYear()} Cavanha Materiais de Construcao. Todos os
              direitos reservados.
            </p>
            <p className="font-[Nunito,sans-serif] text-xs text-gray-700">
              CNPJ: 00.000.000/0001-00
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
