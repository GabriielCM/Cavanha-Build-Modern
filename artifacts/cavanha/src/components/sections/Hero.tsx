import { useRef } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { ShimmerButton } from "@/components/shared/ShimmerButton";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { WHATSAPP_MSG } from "@/lib/mock-data";
import { fadeInUp, staggerContainer, staggerChild } from "@/lib/animations";
import { MessageCircle, ChevronDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Parallax layers based on mouse
  const layer1X = useTransform(mouseX, [-500, 500], [15, -15]);
  const layer1Y = useTransform(mouseY, [-300, 300], [10, -10]);
  const layer2X = useTransform(mouseX, [-500, 500], [25, -25]);
  const layer2Y = useTransform(mouseY, [-300, 300], [15, -15]);
  const layer3X = useTransform(mouseX, [-500, 500], [8, -8]);
  const layer3Y = useTransform(mouseY, [-300, 300], [5, -5]);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    mouseX.set(e.clientX - rect.left - centerX);
    mouseY.set(e.clientY - rect.top - centerY);
  };

  return (
    <motion.section
      ref={containerRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden flex items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0D2B5C 0%, #0f3470 40%, #1a4080 70%, #0D2B5C 100%)",
      }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Parallax Layer 1 — Geometric shapes (back) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: layer1X, y: layer1Y }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            right: "-120px",
            top: "-100px",
            background: "radial-gradient(circle, rgba(245,132,31,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            left: "10%",
            bottom: "-50px",
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 200,
            height: 200,
            right: "25%",
            bottom: "20%",
            background: "radial-gradient(circle, rgba(245,132,31,0.06) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Parallax Layer 2 — Floating elements (mid) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: layer2X, y: layer2Y }}
      >
        {/* Logo decorativa */}
        <img
          src="/logo-cavanha.png"
          alt=""
          className="absolute top-[8%] right-[8%] opacity-15 rounded-3xl"
          style={{ width: 220, height: 220 }}
        />
        <svg className="absolute bottom-[20%] left-[8%] opacity-10" width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" fill="none" stroke="#F5841F" strokeWidth="1" />
        </svg>
        {/* Small dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/10"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Main Content — Parallax Layer 3 (front) */}
      <motion.div
        className="relative z-10 max-w-[1200px] mx-auto px-6 w-full"
        style={{ x: layer3X, y: layer3Y, translateY: scrollY }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left — Text */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={staggerChild}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{
                background: "rgba(245,132,31,0.15)",
                border: "1px solid rgba(245,132,31,0.3)",
              }}
            >
              <span className="text-[#F5841F] font-bold text-sm font-[Nunito,sans-serif]">
                Mais de 1.256+ produtos
              </span>
            </motion.div>

            <motion.h1
              variants={staggerChild}
              className="font-[Barlow_Condensed,sans-serif] font-black text-white leading-[0.95] mb-6"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Sua obra
              <br />
              <span className="text-[#F5841F]">merece</span>
              <br />
              o melhor
            </motion.h1>

            <motion.p
              variants={staggerChild}
              className="font-[Nunito,sans-serif] text-white/70 leading-relaxed mb-10 max-w-[440px]"
              style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)" }}
            >
              Materiais de construcao com qualidade, preco justo e entrega rapida em toda a regiao de Campo Mourao.
            </motion.p>

            <motion.div variants={staggerChild} className="flex gap-4 flex-wrap">
              <ShimmerButton
                onClick={() => document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" })}
                size="lg"
              >
                Ver Produtos
              </ShimmerButton>
              <ShimmerButton
                variant="white"
                onClick={() => window.open(WHATSAPP_MSG(), "_blank")}
                size="lg"
                icon={<MessageCircle size={18} />}
              >
                Fale Conosco
              </ShimmerButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerChild}
              className="grid grid-cols-3 gap-6 mt-14"
            >
              {[
                { target: 1256, suffix: "+", label: "Produtos" },
                { target: 10, suffix: " anos", label: "Experiencia" },
                { target: 12, suffix: "+", label: "Cidades" },
              ].map((stat) => (
                <div key={stat.label}>
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    className="font-[Barlow_Condensed,sans-serif] font-black text-[#F5841F] text-3xl lg:text-4xl"
                  />
                  <div className="font-[Nunito,sans-serif] text-white/50 text-xs mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Visual Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            {/* Main image card */}
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 25px 80px rgba(0,0,0,0.4)",
                border: "2px solid rgba(255,255,255,0.1)",
                height: 420,
              }}
            >
              <img
                src="/fachada.png"
                alt="Fachada Cavanha"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(13,43,92,0.8) 0%, transparent 50%)",
                }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="font-[Barlow_Condensed,sans-serif] font-bold text-white text-xl">
                  Cavanha Materiais
                </div>
                <div className="font-[Nunito,sans-serif] text-white/60 text-sm mt-1">
                  Campo Mourao, Parana
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <motion.div
              className="absolute -left-8 top-12 rounded-2xl px-5 py-4"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="font-[Barlow_Condensed,sans-serif] font-black text-[#F5841F] text-2xl">
                35% OFF
              </div>
              <div className="font-[Nunito,sans-serif] text-white/60 text-xs">
                em pisos selecionados
              </div>
            </motion.div>

            <motion.div
              className="absolute -right-4 bottom-20 rounded-2xl px-5 py-4"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-[Nunito,sans-serif] text-white/80 text-sm font-semibold">
                  Entrega rapida
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-[Nunito,sans-serif] text-white/30 text-xs uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown size={20} className="text-white/30" />
      </motion.div>
    </motion.section>
  );
}
