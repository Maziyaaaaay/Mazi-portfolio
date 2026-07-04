"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ACHIEVEMENTS } from "@/lib/constants";
import { EASE_CINE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitReveal from "@/components/motion/SplitReveal";

/**
 * Director's timeline — the recognition list reads like a video
 * timeline: a rail with frame ticks, a playhead fill scrubbed by
 * scroll, and each entry slated with a scene/timecode marker.
 */
export default function AchievementsSection() {
  const railRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.35"],
  });
  const playhead = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });

  return (
    <section aria-label="Achievements and recognition">
      <div className="container-cine section-pad">
        <SectionLabel>Recognition</SectionLabel>

        <SplitReveal
          text="EARNED, NOT CLAIMED"
          className="mt-6 font-display text-[clamp(48px,7vw,96px)] leading-none text-cream"
        />

        <ol ref={railRef} className="relative mt-16 space-y-4 pl-8 md:pl-12">
          {/* rail with frame ticks */}
          <span
            aria-hidden
            className="absolute bottom-0 left-0 top-0 w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, var(--border-subtle) 0 10px, transparent 10px 14px)",
            }}
          />
          {/* scrubbed playhead fill */}
          <motion.span
            aria-hidden
            style={{ scaleY: playhead }}
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gold shadow-[0_0_12px_color-mix(in_srgb,var(--accent)_60%,transparent)]"
          />

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
              <div className="group flex flex-col gap-1 rounded-sm border border-line bg-surface px-6 py-5 transition-colors duration-300 hover:border-gold/25 md:flex-row md:items-baseline md:gap-8 md:px-8 md:py-6">
                <p className="w-32 shrink-0 font-mono text-sm text-gold">
                  <span className="text-faint">
                    SC {String(i + 1).padStart(2, "0")} ·{" "}
                  </span>
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
