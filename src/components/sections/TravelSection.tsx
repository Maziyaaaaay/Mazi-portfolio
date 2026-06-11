"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TRAVEL } from "@/lib/constants";
import { asset } from "@/lib/asset";
import { EASE_CINE, fadeUp, VIEWPORT_ONCE } from "@/lib/animations";

const FRAME_TILTS = [-1.5, 1.2, -1, 1.6];

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
            <circle cx="2" cy="2" r="1" style={{ fill: "var(--text-primary)" }} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
        <path
          d="M 120 250 Q 400 60 720 190 T 1300 120"
          fill="none"
          style={{ stroke: "var(--accent-gold)" }}
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <circle cx="120" cy="250" r="4" style={{ fill: "var(--accent-gold)" }} />
        <circle cx="720" cy="190" r="4" style={{ fill: "var(--accent-gold)" }} />
        <circle cx="1300" cy="120" r="4" style={{ fill: "var(--accent-gold)" }} />
      </svg>

      <div className="container-cine relative py-20 md:py-24">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
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

        {/* photo strip — film frames from the road */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {TRAVEL.photos.map((photo, i) => (
            <motion.figure
              key={photo.src}
              initial={{ opacity: 0, y: 32, rotate: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: FRAME_TILTS[i % FRAME_TILTS.length],
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.08 * i, ease: EASE_CINE }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="group"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm border border-line bg-surface">
                <Image
                  src={asset(photo.src)}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover saturate-[0.9] transition-transform duration-[400ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                <span className="inline-block h-1 w-1 rounded-full bg-gold" aria-hidden />
                {photo.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
