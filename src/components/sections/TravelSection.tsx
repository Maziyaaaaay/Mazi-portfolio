"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { TRAVEL } from "@/lib/constants";
import { asset } from "@/lib/asset";
import { fadeUp, VIEWPORT_ONCE } from "@/lib/animations";

const DECK_TILTS = [0, -3.5, 3, -1.5];

/**
 * Draggable postcard deck — throw the top photo and it tucks to the
 * back with a spring. Reduced motion falls back to a static fanned
 * stack (drag disabled).
 */
function TravelDeck() {
  const [order, setOrder] = useState(TRAVEL.photos.map((_, i) => i));
  const reduced = useReducedMotion();
  const top = TRAVEL.photos[order[0]];

  const sendToBack = () => setOrder((o) => [...o.slice(1), o[0]]);

  return (
    <div className="w-full max-w-sm">
      <div
        className="relative aspect-[3/4] w-full"
        style={{ touchAction: "pan-y" }}
      >
        {order.map((photoIdx, pos) => {
          const photo = TRAVEL.photos[photoIdx];
          const isTop = pos === 0;
          return (
            <motion.figure
              key={photo.src}
              className="absolute inset-0 overflow-hidden rounded-md border border-line bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
              style={{ zIndex: order.length - pos }}
              animate={{
                scale: 1 - pos * 0.05,
                y: pos * 16,
                rotate: isTop ? 0 : DECK_TILTS[photoIdx % DECK_TILTS.length],
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              drag={isTop && !reduced}
              dragSnapToOrigin
              dragElastic={0.5}
              whileDrag={{ scale: 1.04 }}
              onDragEnd={(_, info) => {
                const thrown =
                  Math.hypot(info.offset.x, info.offset.y) > 140 ||
                  Math.hypot(info.velocity.x, info.velocity.y) > 800;
                if (thrown) sendToBack();
              }}
            >
              <Image
                src={asset(photo.src)}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 384px, 90vw"
                className="pointer-events-none select-none object-cover"
                draggable={false}
                loading="lazy"
              />
            </motion.figure>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]">
        <span className="flex items-center gap-1.5 text-faint">
          <span className="inline-block h-1 w-1 rounded-full bg-gold" aria-hidden />
          {top.caption}
        </span>
        {!reduced && <span className="text-gold-dim">Drag to shuffle</span>}
      </div>
    </div>
  );
}

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
          style={{ stroke: "var(--accent)" }}
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <circle cx="120" cy="250" r="4" style={{ fill: "var(--accent)" }} />
        <circle cx="720" cy="190" r="4" style={{ fill: "var(--accent)" }} />
        <circle cx="1300" cy="120" r="4" style={{ fill: "var(--accent)" }} />
      </svg>

      <div className="container-cine relative py-20 md:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-24">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <h2 className="font-display text-[clamp(44px,6vw,80px)] leading-none text-cream">
              {TRAVEL.heading}
            </h2>
            <p className="mt-3 font-body italic text-muted">{TRAVEL.sub}</p>
            <p className="mt-8 max-w-sm font-body text-sm leading-relaxed text-muted">
              {TRAVEL.line}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gold-dim">
              {TRAVEL.note}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="flex justify-center lg:justify-end"
          >
            <TravelDeck />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
