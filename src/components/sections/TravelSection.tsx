"use client";

import { motion } from "framer-motion";
import { TRAVEL } from "@/lib/constants";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations";

/**
 * Interstitial band — a breath of personal identity between the
 * professional sections, not a full section.
 */
export default function TravelSection() {
  return (
    <section
      className="relative overflow-hidden border-y border-line"
      aria-label="Travel"
    >
      {/* abstract route map, barely visible */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]"
        viewBox="0 0 1400 360"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern id="dots" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#f2ede8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
        <path
          d="M 120 250 Q 400 60 720 190 T 1300 120"
          fill="none"
          stroke="#c8a96e"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <circle cx="120" cy="250" r="4" fill="#c8a96e" />
        <circle cx="720" cy="190" r="4" fill="#c8a96e" />
        <circle cx="1300" cy="120" r="4" fill="#c8a96e" />
      </svg>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="container-cine relative flex flex-col gap-4 py-20 md:flex-row md:items-end md:justify-between md:py-24"
      >
        <div>
          <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-cream">
            {TRAVEL.heading}
          </h2>
          <p className="mt-3 font-body italic text-muted">{TRAVEL.sub}</p>
        </div>
        <div className="md:text-right">
          <p className="max-w-sm font-body text-sm leading-relaxed text-muted md:ml-auto">
            {TRAVEL.line}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
            {TRAVEL.note}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
