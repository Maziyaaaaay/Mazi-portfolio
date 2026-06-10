"use client";

import { motion } from "framer-motion";
import { MANIFESTO } from "@/lib/constants";
import { fadeUp, staggerChildren, VIEWPORT_ONCE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import CounterStat from "@/components/ui/CounterStat";

export default function ManifestoSection() {
  return (
    <section id="about" className="bg-surface" aria-label="Manifesto">
      <div className="container-cine section-pad">
        <SectionLabel>{MANIFESTO.eyebrow}</SectionLabel>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 max-w-4xl font-body text-[22px] leading-[1.6] text-cream lg:text-2xl"
        >
          {MANIFESTO.paragraph.map((segment, i) =>
            "gold" in segment && segment.gold ? (
              <strong key={i} className="font-semibold text-gold">
                {segment.text}
              </strong>
            ) : (
              <span key={i}>{segment.text}</span>
            )
          )}
        </motion.p>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-line pt-14 md:grid-cols-4"
        >
          {MANIFESTO.stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <CounterStat
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
