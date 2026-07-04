"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";

/* The page reads as a 90-second reel at 24fps. */
const REEL_SECONDS = 90;
const FPS = 24;

/**
 * Fixed scroll-progress indicator styled as a film timecode readout
 * with a fill bar. Purely scroll-driven — no autonomous motion.
 */
export default function ScrollTimecode() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  const [tc, setTc] = useState("00:00:00");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const frames = Math.max(0, Math.round(v * REEL_SECONDS * FPS));
    const s = Math.floor(frames / FPS);
    const f = frames % FPS;
    const m = Math.floor(s / 60);
    setTc(
      `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}:${String(
        f
      ).padStart(2, "0")}`
    );
  });

  return (
    <div
      className="pointer-events-none fixed bottom-5 right-5 z-[100] hidden items-center gap-3 rounded-full glass glass-light px-4 py-2 sm:flex"
      aria-hidden
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
        TC <span className="text-gold">{tc}</span>
      </span>
      <span className="relative h-px w-16 overflow-hidden bg-elevated">
        <motion.span
          style={{ scaleX: bar }}
          className="absolute inset-0 origin-left bg-gold"
        />
      </span>
    </div>
  );
}
