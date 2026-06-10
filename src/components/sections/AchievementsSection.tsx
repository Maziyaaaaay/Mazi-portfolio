"use client";

import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/constants";
import { EASE_CINE, fadeUp, VIEWPORT_ONCE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

export default function AchievementsSection() {
  return (
    <section aria-label="Achievements and recognition">
      <div className="container-cine section-pad">
        <SectionLabel>Recognition</SectionLabel>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-6 font-display text-[clamp(48px,7vw,96px)] leading-none text-cream"
        >
          EARNED, NOT CLAIMED
        </motion.h2>

        <ol className="relative mt-16 space-y-4 border-l border-line pl-8 md:pl-12">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.li
              key={`${item.year}-${item.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE_CINE }}
              className="relative"
            >
              <span
                className="absolute -left-[37px] top-7 h-[7px] w-[7px] rounded-full border border-gold bg-void md:-left-[53px]"
                aria-hidden
              />
              <div className="flex flex-col gap-1 rounded-sm border border-line bg-surface px-6 py-5 transition-colors duration-300 hover:border-gold/25 md:flex-row md:items-baseline md:gap-8 md:px-8 md:py-6">
                <p className="w-20 shrink-0 font-mono text-sm text-gold">
                  {item.year}
                </p>
                <div>
                  <h3 className="font-body text-base font-semibold text-cream md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-body text-sm leading-relaxed text-muted">
                    {item.context}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
