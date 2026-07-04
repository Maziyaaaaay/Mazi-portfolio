"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CLIENTS } from "@/lib/constants";

/**
 * Slow client-name marquee in the timecode voice. Names only — no
 * fabricated logos. Static wrap under reduced motion.
 */
export default function LogoMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  const sequence = [...CLIENTS, ...CLIENTS];

  return (
    <div className="relative overflow-hidden" aria-label="Clients and collaborations">
      <div ref={trackRef} className="flex w-max items-center gap-12 py-6">
        {sequence.map((name, i) => (
          <span
            key={`${name}-${i}`}
            aria-hidden={i >= CLIENTS.length}
            className="flex shrink-0 items-center gap-12 font-mono text-xs uppercase tracking-[0.3em] text-faint"
          >
            {name}
            <span className="inline-block h-1 w-1 rounded-full bg-gold/50" aria-hidden />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
