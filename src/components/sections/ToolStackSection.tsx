"use client";

import { motion } from "framer-motion";
import { PIPELINE, PIPELINE_NOTE } from "@/lib/constants";
import { EASE_CINE, fadeUp, VIEWPORT_ONCE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

function StageContent({
  stage,
  tool,
  description,
}: {
  stage: string;
  tool: string;
  description: string;
}) {
  return (
    <>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
        {stage}
      </p>
      <p className="mt-2 font-mono text-sm leading-snug text-cream">{tool}</p>
      <p className="mt-2 font-body text-xs leading-relaxed text-muted">
        {description}
      </p>
    </>
  );
}

export default function ToolStackSection() {
  return (
    <section className="bg-surface" aria-label="Production pipeline">
      <div className="container-cine section-pad">
        <SectionLabel>The Pipeline</SectionLabel>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-6 font-display text-[clamp(44px,6vw,84px)] leading-none text-cream"
        >
          HOW I BUILD A BRAND FILM
        </motion.h2>

        {/* ------------------------------------------- desktop: horizontal */}
        <div className="relative mt-20 hidden lg:block">
          {/* base rail + animated gold fill */}
          <div className="absolute left-0 right-0 top-[3px] h-px bg-line" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 2.2, ease: EASE_CINE }}
            className="absolute left-0 right-0 top-[3px] h-px origin-left bg-gold-dim"
          />
          <ol className="relative grid grid-cols-7 gap-5">
            {PIPELINE.map((node, i) => (
              <motion.li
                key={node.stage}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: 0.25 * i,
                  ease: EASE_CINE,
                }}
                className="relative pt-8"
              >
                <span className="absolute left-0 top-0 h-[7px] w-[7px] rounded-full border border-gold bg-void" />
                <StageContent {...node} />
              </motion.li>
            ))}
          </ol>
        </div>

        {/* ------------------------------------------- mobile: vertical */}
        <div className="relative mt-14 lg:hidden">
          <div className="absolute bottom-2 left-[3px] top-2 w-px bg-line" />
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 2.2, ease: EASE_CINE }}
            className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-gold-dim"
          />
          <ol className="space-y-10">
            {PIPELINE.map((node, i) => (
              <motion.li
                key={node.stage}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE_CINE }}
                className="relative pl-8"
              >
                <span className="absolute left-0 top-1 h-[7px] w-[7px] rounded-full border border-gold bg-void" />
                <StageContent {...node} />
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-16 max-w-2xl font-body text-sm italic leading-relaxed text-muted"
        >
          {PIPELINE_NOTE}
        </motion.p>
      </div>
    </section>
  );
}
