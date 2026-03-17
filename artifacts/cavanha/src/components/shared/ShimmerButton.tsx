import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "orange" | "navy" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
}

export function ShimmerButton({
  children,
  onClick,
  variant = "orange",
  size = "md",
  className,
  icon,
}: ShimmerButtonProps) {
  const baseColors = {
    orange: "from-[#F5841F] to-[#e06b0a]",
    navy: "from-[#0D2B5C] to-[#1a4080]",
    white: "from-white to-gray-100",
  };

  const textColors = {
    orange: "text-white",
    navy: "text-white",
    white: "text-[#0D2B5C]",
  };

  const shadowColors = {
    orange: "shadow-[0_4px_20px_rgba(245,132,31,0.4)]",
    navy: "shadow-[0_4px_20px_rgba(13,43,92,0.3)]",
    white: "shadow-[0_4px_20px_rgba(0,0,0,0.1)]",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-10 py-4.5 text-lg",
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-full font-bold font-[Barlow_Condensed,sans-serif] uppercase tracking-wider",
        "bg-gradient-to-r",
        baseColors[variant],
        textColors[variant],
        shadowColors[variant],
        sizes[size],
        "flex items-center gap-2 cursor-pointer border-none",
        className
      )}
    >
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: ["200% 0", "-200% 0"],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.button>
  );
}
