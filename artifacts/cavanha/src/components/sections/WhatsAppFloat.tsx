
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_MSG } from "@/lib/mock-data";

interface WhatsAppFloatProps {
  activeSection?: string;
}

const TOOLTIPS: Record<string, string> = {
  hero: "Ola! Posso ajudar?",
  produtos: "Duvida sobre um produto?",
  categorias: "Procurando algo especifico?",
  obras: "Quer um orcamento?",
  sobre: "Conheca nossa loja!",
  contato: "Fale conosco agora!",
  entrega: "Consulte a entrega!",
  default: "Fale conosco!",
};

export function WhatsAppFloat({ activeSection }: WhatsAppFloatProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-show tooltip periodically
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      setShowTooltip(true);
      const hideTimer = setTimeout(() => setShowTooltip(false), 4000);
      return () => clearTimeout(hideTimer);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isVisible, activeSection]);

  const tooltipText =
    TOOLTIPS[activeSection || ""] || TOOLTIPS.default;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-40 flex items-end gap-3"
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.8 }}
          transition={{ type: "spring", damping: 20 }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="mb-2 max-w-[180px] rounded-xl bg-white px-4 py-2.5 shadow-lg"
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
              >
                <p className="font-[Nunito,sans-serif] text-sm font-semibold text-[#0D2B5C]">
                  {tooltipText}
                </p>
                {/* Triangle */}
                <div className="absolute -right-1.5 bottom-4 h-3 w-3 rotate-45 bg-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <motion.a
            href={WHATSAPP_MSG()}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, -6, 0] }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <MessageCircle className="h-7 w-7" />

            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#25D366]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-[#25D366]"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.4,
              }}
            />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
