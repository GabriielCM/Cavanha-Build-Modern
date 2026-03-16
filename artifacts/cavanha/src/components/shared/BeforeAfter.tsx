
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = "Antes",
  afterLabel = "Depois",
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(Math.max((x / rect.width) * 100, 2), 98);
    setPosition(percent);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  return (
    <div
      ref={containerRef}
      className="relative h-56 w-full cursor-col-resize select-none overflow-hidden rounded-xl shadow-lg sm:h-64"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (full background) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
      />

      {/* After Label */}
      <span className="absolute bottom-3 right-3 rounded-full bg-green-500/90 px-3 py-1 font-[Barlow_Condensed,sans-serif] text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Before Image (clipped) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${beforeImage})`,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />

      {/* Before Label */}
      <span className="absolute bottom-3 left-3 rounded-full bg-[#0D2B5C]/90 px-3 py-1 font-[Barlow_Condensed,sans-serif] text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {beforeLabel}
      </span>

      {/* Divider Line */}
      <div
        className="absolute top-0 z-10 h-full w-0.5 bg-white shadow-md"
        style={{ left: `${position}%` }}
      />

      {/* Drag Handle */}
      <motion.div
        className="absolute top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-full border-2 border-white bg-[#0D2B5C] text-white shadow-lg"
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
      >
        <ArrowLeftRight className="h-4 w-4" />
      </motion.div>
    </div>
  );
}
