
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import type { CartItem } from "@/lib/mock-data";
import { WHATSAPP_NUMBER } from "@/lib/mock-data";
import { ShimmerButton } from "@/components/shared/ShimmerButton";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { MessageCircle } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: number, newQty: number) => void;
  onRemove: (productId: number) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemove,
}: CartDrawerProps) {
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  const handleWhatsAppCheckout = () => {
    const lines = items.map(
      (item) =>
        `- ${item.product.name} (x${item.qty}) = R$ ${(
          item.product.price * item.qty
        )
          .toFixed(2)
          .replace(".", ",")}`
    );
    const message = `Ola! Gostaria de finalizar meu pedido:\n\n${lines.join(
      "\n"
    )}\n\n*Total: R$ ${total.toFixed(2).replace(".", ",")}*`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-[#0D2B5C]" />
                <h2 className="font-[Barlow_Condensed,sans-serif] text-xl font-black uppercase tracking-wide text-[#0D2B5C]">
                  Meu Carrinho
                </h2>
                {items.length > 0 && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5841F] font-[Nunito,sans-serif] text-xs font-bold text-white">
                    {items.length}
                  </span>
                )}
              </div>
              <motion.button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500"
                whileHover={{ scale: 1.1, backgroundColor: "#fee2e2" }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <motion.div
                  className="flex h-full flex-col items-center justify-center text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
                    <ShoppingBag className="h-10 w-10 text-gray-300" />
                  </div>
                  <h3 className="mb-2 font-[Barlow_Condensed,sans-serif] text-lg font-bold uppercase text-[#0D2B5C]">
                    Carrinho vazio
                  </h3>
                  <p className="max-w-xs font-[Nunito,sans-serif] text-sm text-gray-400">
                    Adicione produtos ao carrinho para finalizar seu pedido via
                    WhatsApp
                  </p>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40, height: 0 }}
                      transition={{ type: "spring", damping: 25 }}
                      className="mb-4 flex gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                    >
                      {/* Thumbnail */}
                      <div
                        className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: item.product.imageBg }}
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="h-12 w-12 object-contain"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <h4 className="line-clamp-1 font-[Nunito,sans-serif] text-sm font-bold text-[#0D2B5C]">
                            {item.product.name}
                          </h4>
                          <motion.button
                            onClick={() => onRemove(item.product.id)}
                            className="ml-2 flex-shrink-0 text-gray-300 hover:text-red-500"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.8 }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </motion.button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Qty Controls */}
                          <div className="flex items-center gap-2">
                            <motion.button
                              onClick={() =>
                                onUpdateQty(
                                  item.product.id,
                                  Math.max(1, item.qty - 1)
                                )
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus className="h-3 w-3" />
                            </motion.button>
                            <span className="w-6 text-center font-[Barlow_Condensed,sans-serif] text-sm font-bold text-[#0D2B5C]">
                              {item.qty}
                            </span>
                            <motion.button
                              onClick={() =>
                                onUpdateQty(item.product.id, item.qty + 1)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus className="h-3 w-3" />
                            </motion.button>
                          </div>

                          {/* Price */}
                          <span className="font-[Barlow_Condensed,sans-serif] text-base font-black text-[#F5841F]">
                            R${" "}
                            {(item.product.price * item.qty)
                              .toFixed(2)
                              .replace(".", ",")}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                className="border-t border-gray-100 px-6 py-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Total */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-[Barlow_Condensed,sans-serif] text-base font-bold uppercase tracking-wide text-gray-500">
                    Total
                  </span>
                  <span className="font-[Barlow_Condensed,sans-serif] text-2xl font-black text-[#0D2B5C]">
                    R$ {total.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                {/* WhatsApp Checkout */}
                <ShimmerButton
                  onClick={handleWhatsAppCheckout}
                  variant="orange"
                  size="lg"
                  icon={<MessageCircle className="h-5 w-5" />}
                  className="w-full justify-center"
                >
                  Finalizar via WhatsApp
                </ShimmerButton>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
