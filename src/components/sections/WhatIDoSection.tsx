"use client";

import { motion } from "framer-motion";
import {
  Clapperboard,
  GraduationCap,
  PenTool,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { fadeUp, staggerChildren, VIEWPORT_ONCE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

const ICONS: Record<string, LucideIcon> = {
  clapperboard: Clapperboard,
  "graduation-cap": GraduationCap,
  zap: Zap,
  "pen-tool": PenTool,
};

export default function WhatIDoSection() {
  return (
    <section aria-label="Services">
      <div className="container-cine section-pad">
        <SectionLabel>Services</SectionLabel>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-6 font-display text-[clamp(48px,7vw,96px)] leading-none text-cream"
        >
          FOUR THINGS I DO
        </motion.h2>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {SERVICES.map((service) => {
            const Icon = ICONS[service.icon] ?? Zap;
            return (
              <motion.article
                key={service.id}
                variants={fadeUp}
                className="group rounded-sm border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 md:p-10"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-gold/10 text-gold shadow-[0_0_24px_rgba(200,169,110,0.18)]">
                  <Icon size={20} aria-hidden />
                </div>
                <h3 className="mt-7 font-display text-[28px] leading-none tracking-wide text-cream">
                  {service.title}
                </h3>
                <p className="mt-4 font-body text-base leading-relaxed text-muted">
                  {service.description}
                </p>
                <div className="mt-7 space-y-2 border-t border-line pt-5">
                  <p className="font-mono text-xs leading-relaxed text-faint">
                    <span className="text-gold-dim">TOOLS&nbsp;—&nbsp;</span>
                    {service.tools}
                  </p>
                  <p className="font-mono text-xs leading-relaxed text-faint">
                    <span className="text-gold-dim">WORK&nbsp;—&nbsp;</span>
                    {service.clients}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
