import { useEffect, useRef } from "react";

export function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.003;
      const { width, height } = canvas;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Base background
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, width, height);

      // Blob 1 — Navy
      const x1 = width * 0.3 + Math.sin(time * 0.7) * width * 0.1;
      const y1 = height * 0.3 + Math.cos(time * 0.5) * height * 0.1;
      const gradient1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, width * 0.4);
      gradient1.addColorStop(0, "rgba(13, 43, 92, 0.06)");
      gradient1.addColorStop(1, "rgba(13, 43, 92, 0)");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);

      // Blob 2 — Orange
      const x2 = width * 0.7 + Math.cos(time * 0.6) * width * 0.12;
      const y2 = height * 0.6 + Math.sin(time * 0.8) * height * 0.1;
      const gradient2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, width * 0.35);
      gradient2.addColorStop(0, "rgba(245, 132, 31, 0.05)");
      gradient2.addColorStop(1, "rgba(245, 132, 31, 0)");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      // Blob 3 — Light blue
      const x3 = width * 0.5 + Math.sin(time * 0.4) * width * 0.15;
      const y3 = height * 0.8 + Math.cos(time * 0.3) * height * 0.08;
      const gradient3 = ctx.createRadialGradient(x3, y3, 0, x3, y3, width * 0.3);
      gradient3.addColorStop(0, "rgba(26, 64, 128, 0.04)");
      gradient3.addColorStop(1, "rgba(26, 64, 128, 0)");
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
