import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  id?: string;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function SectionReveal({
  children,
  variants = defaultVariants,
  className,
  delay = 0,
  id,
}: SectionRevealProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        ...variants,
        visible: {
          ...((variants.visible as Record<string, unknown>) || {}),
          transition: {
            ...((
              (variants.visible as Record<string, unknown>)?.transition as Record<string, unknown>
            ) || {}),
            delay,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
}
