
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforePosition?: string;
  afterPosition?: string;
}

export function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  beforePosition = "center",
  afterPosition = "center",
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

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setPosition((p) => Math.max(2, p - 2));
    } else if (e.key === "ArrowRight") {
      setPosition((p) => Math.min(98, p + 2));
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-56 w-full cursor-col-resize select-none overflow-hidden rounded-xl shadow-lg touch-none sm:h-64"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* After Image (full background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: afterPosition }}
        draggable={false}
      />

      {/* After Label */}
      <span className="absolute bottom-3 right-3 z-[5] rounded-full bg-green-500/90 px-3 py-1 font-[Barlow_Condensed,sans-serif] text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Before Image (clipped) */}
      <img
        src={beforeImage}
        alt={beforeLabel}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: beforePosition, clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />

      {/* Before Label */}
      <span className="absolute bottom-3 left-3 z-[5] rounded-full bg-[#0D2B5C]/90 px-3 py-1 font-[Barlow_Condensed,sans-serif] text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
        {beforeLabel}
      </span>

      {/* Divider Line */}
      <div
        className="absolute top-0 z-10 h-full w-0.5 bg-white shadow-md"
        style={{ left: `${position}%` }}
      />

      {/* Drag Handle */}
      <motion.div
        className="absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-col-resize items-center justify-center rounded-full border-2 border-white bg-[#0D2B5C] text-white shadow-lg"
        style={{ left: `${position}%` }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
        role="slider"
        aria-label="Comparação antes e depois"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <ArrowLeftRight className="h-4 w-4" />
      </motion.div>
    </div>
  );
}
