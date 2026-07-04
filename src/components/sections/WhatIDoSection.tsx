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
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitReveal from "@/components/motion/SplitReveal";
import Tilt from "@/components/ui/Tilt";

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

        <SplitReveal
          text="FOUR THINGS I DO"
          className="mt-6 font-display text-[clamp(48px,7vw,96px)] leading-none text-cream"
        />

        {/* sticky stack — each card pins slightly lower than the last
            and the next one slides over it */}
        <div className="mt-14 flex flex-col gap-6">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Zap;
            return (
              <div
                key={service.id}
                className="sticky"
                style={{ top: `calc(14vh + ${i * 30}px)` }}
              >
                <Tilt max={3}>
                  <motion.article
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    onMouseMove={(e) => {
                      const el = e.currentTarget;
                      const r = el.getBoundingClientRect();
                      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
                      el.style.setProperty("--my", `${e.clientY - r.top}px`);
                    }}
                    className="group glass glass-heavy relative overflow-hidden rounded-lg p-8 md:p-12"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--bg-void) 78%, transparent)",
                    }}
                  >
                    <span className="glass-sheen" aria-hidden />
                    {/* cursor spotlight */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 10%, transparent), transparent 65%)",
                      }}
                    />

                    <div className="flex items-start justify-between gap-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-gold/10 text-gold">
                        <Icon size={20} aria-hidden />
                      </div>
                      <span className="font-mono text-sm tracking-[0.3em] text-faint">
                        0{i + 1} / 04
                      </span>
                    </div>

                    <h3 className="mt-8 font-display text-[clamp(34px,4.5vw,60px)] leading-none tracking-wide text-cream">
                      {service.title}
                    </h3>
                    <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-muted md:text-lg">
                      {service.description}
                    </p>

                    <div className="mt-8 border-t border-line pt-6">
                      <p className="font-mono text-xs leading-relaxed text-faint">
                        <span className="text-gold-dim">WORK&nbsp;—&nbsp;</span>
                        {service.clients}
                      </p>
                    </div>
                  </motion.article>
                </Tilt>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
