"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeUp, staggerChildren } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

/**
 * Social-proof scaffold. Renders nothing until TESTIMONIALS in
 * constants has real quotes — no fabricated praise, ever.
 */
export default function TestimonialsSection() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section aria-label="Testimonials">
      <div className="container-cine section-pad">
        <SectionLabel>What clients say</SectionLabel>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <motion.blockquote
              key={`${t.name}-${t.role}`}
              variants={fadeUp}
              className="glass rounded-md p-8"
            >
              <span className="glass-sheen" aria-hidden />
              <p className="font-body text-base leading-relaxed text-cream/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6 border-t border-line pt-4">
                <p className="font-body text-sm font-semibold text-cream">
                  {t.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-faint">
                  {t.role}
                </p>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
