
import { motion } from "framer-motion";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { ShimmerButton } from "@/components/shared/ShimmerButton";
import { WHATSAPP_MSG } from "@/lib/mock-data";
import { staggerContainer, staggerChild } from "@/lib/animations";

const SOCIALS = [
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@cavanha.cm",
    followers: 4820,
    href: "https://instagram.com/cavanha.cm",
    color: "from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    hoverBg: "hover:bg-[#E1306C]",
  },
  {
    icon: Facebook,
    label: "Facebook",
    handle: "/cavanhamateriais",
    followers: 3250,
    href: "https://facebook.com/cavanhamateriais",
    color: "from-[#1877F2] to-[#1877F2]",
    hoverBg: "hover:bg-[#1877F2]",
  },
];

export function SocialCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0D2B5C] via-[#0a2249] to-[#060F1F] py-20 md:py-28">
      {/* Subtle decorative elements */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full bg-[#F5841F]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-[#F5841F]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <h2 className="font-[Barlow_Condensed,sans-serif] text-4xl font-black uppercase leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
            Siga o{" "}
            <span className="text-[#F5841F]">Cavanha</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-[Nunito,sans-serif] text-base text-gray-300">
            Acompanhe novidades, ofertas exclusivas e dicas de construcao e reforma
          </p>
        </motion.div>

        {/* Social Cards */}
        <motion.div
          className="mx-auto flex max-w-2xl flex-col gap-6 sm:flex-row sm:justify-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {SOCIALS.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerChild}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group flex flex-1 flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/15"
            >
              {/* Icon with gradient background */}
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${social.color} shadow-lg`}
              >
                <social.icon className="h-8 w-8 text-white" />
              </div>

              <div className="text-center">
                <h3 className="font-[Barlow_Condensed,sans-serif] text-xl font-bold uppercase tracking-wide text-white">
                  {social.label}
                </h3>
                <p className="mt-1 font-[Nunito,sans-serif] text-sm text-gray-300">
                  {social.handle}
                </p>
              </div>

              {/* Follower Count */}
              <div className="flex flex-col items-center">
                <AnimatedCounter
                  target={social.followers}
                  suffix="+"
                  className="font-[Barlow_Condensed,sans-serif] text-3xl font-black text-[#F5841F]"
                />
                <span className="font-[Nunito,sans-serif] text-xs uppercase tracking-wider text-gray-400">
                  seguidores
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a href={WHATSAPP_MSG()} target="_blank" rel="noopener noreferrer">
            <ShimmerButton
              variant="orange"
              size="lg"
              icon={<MessageCircle className="h-5 w-5" />}
            >
              Fale Conosco no WhatsApp
            </ShimmerButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
