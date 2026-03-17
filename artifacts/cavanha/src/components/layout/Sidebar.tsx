import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, ShoppingBag, Grid3X3, Image, Clock, MessageCircle, Search, ShoppingCart,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/mock-data";
import { useScrollSection } from "@/hooks/use-scroll-section";
import { MagneticButton } from "@/components/shared/MagneticButton";

const ICON_MAP: Record<string, React.ElementType> = {
  home: Home,
  "shopping-bag": ShoppingBag,
  grid: Grid3X3,
  image: Image,
  clock: Clock,
  "message-circle": MessageCircle,
};

interface SidebarProps {
  onSearchClick: () => void;
  onCartClick: () => void;
  cartCount: number;
}

export function Sidebar({ onSearchClick, onCartClick, cartCount }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { activeSection, scrollTo } = useScrollSection();

  return (
    <motion.aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      animate={{ width: isExpanded ? 200 : 64 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 top-0 h-screen z-50 flex flex-col items-center py-6 gap-2"
      style={{
        background: "rgba(13, 43, 92, 0.95)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Logo */}
      <div className="mb-2 flex items-center justify-center w-full px-3">
        <motion.div
          className="flex items-center gap-2 overflow-hidden"
          animate={{ justifyContent: isExpanded ? "flex-start" : "center" }}
        >
          <motion.img
            src="/logo-cavanha.png"
            alt="Cavanha"
            className="flex-shrink-0 rounded-lg object-contain"
            animate={{ width: isExpanded ? 112 : 48, height: isExpanded ? 112 : 48 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-white font-bold text-sm font-[Barlow_Condensed,sans-serif] tracking-wider whitespace-nowrap overflow-hidden"
              >
                CAVANHA
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-1 w-full px-2">
        {NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon] || Home;
          const isActive = activeSection === item.section;

          return (
            <MagneticButton key={item.id} strength={0.15}>
              <motion.button
                onClick={() => item.section && scrollTo(item.section)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer border-none relative overflow-hidden"
                style={{
                  background: isActive
                    ? "rgba(245, 132, 31, 0.2)"
                    : "transparent",
                  color: isActive ? "#F5841F" : "rgba(255,255,255,0.6)",
                }}
                whileHover={{
                  backgroundColor: isActive
                    ? "rgba(245, 132, 31, 0.25)"
                    : "rgba(255,255,255,0.08)",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ background: "#F5841F" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={20} className="flex-shrink-0" />
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium font-[Nunito,sans-serif] whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </MagneticButton>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-1 w-full px-2 mb-2">
        {/* Search */}
        <motion.button
          onClick={onSearchClick}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer border-none"
          style={{ background: "transparent", color: "rgba(255,255,255,0.6)" }}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <Search size={20} className="flex-shrink-0" />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium font-[Nunito,sans-serif] whitespace-nowrap overflow-hidden"
              >
                Buscar
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Cart */}
        <motion.button
          onClick={onCartClick}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer border-none relative"
          style={{ background: "transparent", color: "rgba(255,255,255,0.6)" }}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="relative flex-shrink-0">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: "#F5841F" }}
              >
                {cartCount}
              </motion.div>
            )}
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium font-[Nunito,sans-serif] whitespace-nowrap overflow-hidden"
              >
                Carrinho
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.aside>
  );
}
