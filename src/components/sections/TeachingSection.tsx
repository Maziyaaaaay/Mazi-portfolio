"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { TEACHING } from "@/lib/constants";
import { EASE_CINE, fadeUp, VIEWPORT_ONCE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

export default function TeachingSection() {
  return (
    <section id="teaching" className="bg-surface" aria-label="Teaching">
      <div className="container-cine section-pad">
        <SectionLabel>{TEACHING.eyebrow}</SectionLabel>

        <div className="mt-6 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* left — narrative */}
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="font-display text-[clamp(44px,6vw,84px)] leading-[0.95] text-cream"
            >
              {TEACHING.heading}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="mt-8 max-w-xl font-body text-lg leading-relaxed text-muted"
            >
              {TEACHING.paragraph}
            </motion.p>

            <ul className="mt-8 space-y-3">
              {TEACHING.highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 * i,
                    ease: EASE_CINE,
                  }}
                  className="flex items-start gap-3 font-body text-sm text-cream/85"
                >
                  <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* right — course card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.8, ease: EASE_CINE }}
            whileHover={{ rotate: 0 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div
              className="absolute -inset-6 rounded-full bg-gold/5 blur-2xl"
              aria-hidden
            />
            <div className="relative rounded-sm border border-gold/30 bg-void p-10 shadow-[0_0_60px_rgba(200,169,110,0.08)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
                {TEACHING.coursePlatform} · Course
              </p>
              <p className="mt-6 font-display text-[clamp(44px,5vw,64px)] leading-[0.95] text-gold">
                {TEACHING.courseTitle}
              </p>
              <p className="mt-3 font-body text-sm text-muted">
                {TEACHING.courseBy}
              </p>

              <div className="mt-8 space-y-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                <p>Real client briefs</p>
                <p>Full AI production pipeline</p>
                <p>Output: commercialized AI ads</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
