
import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const COLORS = ["#0D2B5C", "#F5841F", "#1a4080", "#ff9535"];

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef<number>(0);
  const isRunningRef = useRef(false);
  const [isTouchDevice] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches
  );

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticles = () => {
      const dx = mouseRef.current.x - prevMouseRef.current.x;
      const dy = mouseRef.current.y - prevMouseRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 3) {
        const count = Math.min(Math.floor(speed / 8), 3);
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 8,
            y: mouseRef.current.y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5,
            life: 1,
            maxLife: 1,
            size: Math.random() * 3 + 1.5,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
          });
        }
      }

      prevMouseRef.current = { ...mouseRef.current };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      spawnParticles();

      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life -= 0.02;

        const alpha = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0, p.size * alpha), 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }

      // Stop the loop when idle (no particles left)
      if (particlesRef.current.length > 0) {
        animationIdRef.current = requestAnimationFrame(draw);
      } else {
        isRunningRef.current = false;
      }
    };

    const startLoop = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animationIdRef.current = requestAnimationFrame(draw);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      startLoop();
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
