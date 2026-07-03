"use client";

import { useEffect } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Site-wide animated backdrop: three slow-drifting gradient washes
 * (volt lime / electric cyan / ember) plus floating orbs that react to
 * scroll position and cursor. Sits at z-0 behind the z-10 content, so
 * every glass surface picks up its colour bleed.
 */
export default function Aurora() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // orbs ride scroll at different rates — cheap multi-speed parallax
  const o1 = useTransform(scrollY, (v) => v * -0.07);
  const o2 = useTransform(scrollY, (v) => v * 0.05);
  const o3 = useTransform(scrollY, (v) => v * -0.03);

  // …and lean gently toward the cursor
  const mx = useSpring(0, { stiffness: 35, damping: 20 });
  const my = useSpring(0, { stiffness: 35, damping: 20 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 44);
      my.set((e.clientY / window.innerHeight - 0.5) * 32);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mx, my]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />

      {/* floating orbs — outer layer takes scroll/cursor transforms,
          inner layer self-drifts via CSS so the two never conflict */}
      <motion.div
        style={reduced ? undefined : { y: o1, x: mx }}
        className="absolute right-[12%] top-[16%]"
      >
        <div
          className="aurora-orb h-56 w-56 md:h-80 md:w-80"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 70%)",
          }}
        />
      </motion.div>
      <motion.div
        style={reduced ? undefined : { y: o2, x: my }}
        className="absolute bottom-[24%] left-[4%]"
      >
        <div
          className="aurora-orb h-40 w-40 md:h-60 md:w-60"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, color-mix(in srgb, var(--accent-2) 22%, transparent), transparent 70%)",
            animationDuration: "28s",
            animationDelay: "-9s",
          }}
        />
      </motion.div>
      <motion.div
        style={reduced ? undefined : { y: o3 }}
        className="absolute left-[52%] top-[58%]"
      >
        <div
          className="aurora-orb h-28 w-28 md:h-44 md:w-44"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, color-mix(in srgb, var(--accent-3) 20%, transparent), transparent 70%)",
            animationDuration: "34s",
            animationDelay: "-17s",
          }}
        />
      </motion.div>
    </div>
  );
}
