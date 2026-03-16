
import { motion } from "framer-motion";
import { MessageCircle, MapPin } from "lucide-react";
import { DELIVERY_CITIES, WHATSAPP_MSG } from "@/lib/mock-data";
import { ShimmerButton } from "@/components/shared/ShimmerButton";
import { fadeInLeft, fadeInRight, svgDraw } from "@/lib/animations";

// City positions on SVG map (approximate relative positions for Parana region)
const CITY_POSITIONS: Record<string, { x: number; y: number }> = {
  "Campo Mourao": { x: 200, y: 180 },
  Ubirata: { x: 160, y: 140 },
  Luiziana: { x: 270, y: 200 },
  "Barbosa Ferraz": { x: 290, y: 230 },
  Peabiru: { x: 240, y: 210 },
  "Engenheiro Beltrao": { x: 230, y: 250 },
  Araruna: { x: 300, y: 170 },
  "Janiópolis": { x: 140, y: 190 },
  Farol: { x: 170, y: 210 },
  "Corumbatai do Sul": { x: 260, y: 160 },
  Iretama: { x: 250, y: 130 },
  Roncador: { x: 220, y: 110 },
};

export function DeliveryMap() {
  return (
    <section className="w-full bg-white py-20 md:py-28" id="entrega">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left Side: Text Content */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="font-[Barlow_Condensed,sans-serif] text-4xl font-black uppercase leading-none tracking-tight text-[#0D2B5C] md:text-5xl lg:text-6xl">
              Entregamos na
              <br />
              <span className="text-[#F5841F]">sua cidade</span>
            </h2>
            <div className="mt-4 h-1.5 w-20 rounded-full bg-[#F5841F]" />

            <p className="mt-6 max-w-lg font-[Nunito,sans-serif] text-base leading-relaxed text-gray-600">
              Levamos materiais de construcao para toda a regiao de Campo Mourao
              e arredores. Frota propria, entrega rapida e segura.
            </p>

            {/* City Chips */}
            <div className="mt-8 flex flex-wrap gap-2">
              {DELIVERY_CITIES.map((city, i) => (
                <motion.span
                  key={city}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-[Nunito,sans-serif] text-sm font-semibold ${
                    city === "Campo Mourao"
                      ? "bg-[#F5841F] text-white"
                      : "border border-gray-200 bg-white text-[#0D2B5C]"
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <MapPin className="h-3 w-3" />
                  {city}
                </motion.span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10">
              <a
                href={WHATSAPP_MSG()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShimmerButton
                  variant="orange"
                  size="lg"
                  icon={<MessageCircle className="h-5 w-5" />}
                >
                  Consultar Entrega
                </ShimmerButton>
              </a>
            </div>
          </motion.div>

          {/* Right Side: SVG Map */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <svg
              viewBox="0 0 420 360"
              className="h-auto w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background shape (Parana-like region) */}
              <motion.path
                d="M60 60 Q30 120 50 200 Q60 260 100 300 Q160 340 240 330 Q320 320 370 270 Q400 220 390 160 Q380 100 340 70 Q280 30 200 40 Q130 45 60 60Z"
                fill="#f0f4fa"
                stroke="#d1dae8"
                strokeWidth="1.5"
                variants={svgDraw}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />

              {/* Road paths connecting cities */}
              <motion.path
                d="M200 180 L160 140 M200 180 L270 200 M200 180 L240 210 M200 180 L170 210 M200 180 L220 110 M240 210 L290 230 M270 200 L300 170 M160 140 L140 190"
                stroke="#0D2B5C"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.3"
                variants={svgDraw}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />

              {/* Animated truck path */}
              <motion.path
                d="M200 180 Q230 160 270 200 Q280 210 290 230"
                stroke="#F5841F"
                strokeWidth="2.5"
                strokeLinecap="round"
                variants={svgDraw}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />

              {/* City dots */}
              {DELIVERY_CITIES.map((city, i) => {
                const pos = CITY_POSITIONS[city];
                if (!pos) return null;
                const isCenter = city === "Campo Mourao";

                return (
                  <g key={city}>
                    {/* Pulsing ring for center */}
                    {isCenter && (
                      <>
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r="20"
                          fill="none"
                          stroke="#F5841F"
                          strokeWidth="1.5"
                          animate={{
                            r: [15, 30, 15],
                            opacity: [0.6, 0, 0.6],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r="10"
                          fill="none"
                          stroke="#F5841F"
                          strokeWidth="1"
                          animate={{
                            r: [10, 22, 10],
                            opacity: [0.4, 0, 0.4],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeOut",
                            delay: 0.5,
                          }}
                        />
                      </>
                    )}

                    {/* City dot */}
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={isCenter ? 7 : 4}
                      fill={isCenter ? "#F5841F" : "#0D2B5C"}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.08, type: "spring" }}
                    />

                    {/* City label */}
                    <motion.text
                      x={pos.x}
                      y={pos.y - (isCenter ? 14 : 10)}
                      textAnchor="middle"
                      className="font-[Nunito,sans-serif]"
                      fontSize={isCenter ? "11" : "8"}
                      fontWeight={isCenter ? "800" : "600"}
                      fill={isCenter ? "#F5841F" : "#0D2B5C"}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + i * 0.08 }}
                    >
                      {city}
                    </motion.text>
                  </g>
                );
              })}

              {/* Animated truck icon (small) */}
              <motion.g
                animate={{
                  x: [0, 70, 90, 70, 0],
                  y: [0, 20, 50, 20, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <rect
                  x="195"
                  y="170"
                  width="14"
                  height="10"
                  rx="2"
                  fill="#F5841F"
                />
                <rect
                  x="207"
                  y="173"
                  width="6"
                  height="7"
                  rx="1"
                  fill="#e06b0a"
                />
              </motion.g>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
