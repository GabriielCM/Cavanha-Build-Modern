
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TIMELINE_EVENTS } from "@/lib/mock-data";
import { staggerContainerSlow, staggerChild, svgDraw } from "@/lib/animations";

export function Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-[#0D2B5C] py-20 md:py-28" id="sobre">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex items-end justify-between"
        >
          <div>
            <h2 className="font-[Barlow_Condensed,sans-serif] text-4xl font-black uppercase leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
              Nossa
              <br />
              <span className="text-[#F5841F]">Historia</span>
            </h2>
            <div className="mt-4 h-1.5 w-20 rounded-full bg-[#F5841F]" />
          </div>

          <div className="hidden gap-2 md:flex">
            <motion.button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
              whileHover={{ scale: 1.1, borderColor: "#F5841F" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
              whileHover={{ scale: 1.1, borderColor: "#F5841F" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Connecting Line SVG */}
          <div className="absolute left-0 right-0 top-[60px] z-0 hidden md:block">
            <svg
              className="h-[2px] w-full"
              viewBox="0 0 1200 2"
              preserveAspectRatio="none"
            >
              <motion.line
                x1="0"
                y1="1"
                x2="1200"
                y2="1"
                stroke="#F5841F"
                strokeWidth="2"
                variants={svgDraw}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </svg>
          </div>

          {/* Scrollable Events */}
          <motion.div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 md:gap-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {TIMELINE_EVENTS.map((event, index) => (
              <motion.div
                key={event.year}
                variants={staggerChild}
                className="relative min-w-[260px] max-w-[300px] flex-shrink-0 snap-start"
              >
                {/* Year */}
                <motion.div
                  className="mb-6 flex h-[120px] items-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="font-[Barlow_Condensed,sans-serif] text-7xl font-black leading-none text-[#F5841F] md:text-8xl">
                    {event.year}
                  </span>
                </motion.div>

                {/* Dot on timeline */}
                <div className="relative mb-6 hidden md:block">
                  <motion.div
                    className="h-4 w-4 rounded-full border-[3px] border-[#F5841F] bg-[#0D2B5C]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                  />
                </div>

                {/* Card */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <span className="mb-3 block text-3xl">{event.icon}</span>
                  <h3 className="mb-2 font-[Barlow_Condensed,sans-serif] text-xl font-bold uppercase tracking-wide text-white">
                    {event.title}
                  </h3>
                  <p className="font-[Nunito,sans-serif] text-sm leading-relaxed text-gray-400">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
