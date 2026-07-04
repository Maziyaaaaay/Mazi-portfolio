"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_CINE } from "@/lib/animations";

/**
 * Film-leader preloader: a 0→100 counter over ~1.2s, then a curtain
 * wipe up into the hero. Shows once per session (pre-paint script in
 * layout hides it on repeat visits before hydration), never under
 * reduced motion, and a pure-CSS fallback fades it away for no-JS
 * visitors (see #preloader rules in globals.css).
 */
export default function Preloader() {
  const reduced = useReducedMotion();
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState<"count" | "wipe" | "done">("count");

  useEffect(() => {
    if (reduced || sessionStorage.getItem("mz-preloaded")) {
      setPhase("done");
      return;
    }
    const t0 = performance.now();
    const DURATION = 1200;
    let raf = requestAnimationFrame(function tick(t) {
      const p = Math.min(1, (t - t0) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("mz-preloaded", "1");
        setPhase("wipe");
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  if (phase === "done") return null;

  return (
    <motion.div
      id="preloader"
      initial={{ clipPath: "inset(0 0 0% 0)" }}
      animate={
        phase === "wipe"
          ? { clipPath: "inset(0 0 100% 0)" }
          : { clipPath: "inset(0 0 0% 0)" }
      }
      transition={{ duration: 0.75, ease: EASE_CINE }}
      onAnimationComplete={() => {
        if (phase === "wipe") setPhase("done");
      }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      aria-hidden
    >
      <p className="font-display text-[clamp(120px,24vw,320px)] leading-none text-cream">
        {pct}
      </p>
      <div className="absolute inset-x-0 bottom-10 flex items-center justify-between px-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:px-16">
        <span>Mazin KP · 24FPS</span>
        <span className="text-gold">
          TC 00:00:{String(pct).padStart(3, "0")}
        </span>
      </div>
      <div className="absolute inset-x-8 bottom-6 h-px bg-elevated md:inset-x-16">
        <div
          className="h-full bg-gold transition-[width] duration-100 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>
    </motion.div>
  );
}
