"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/—";

/**
 * Timecode-style decode effect: characters flicker through a glyph set
 * and resolve left-to-right when the element scrolls into view. SSR
 * and reduced-motion render the plain text.
 */
export default function ScrambleText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView || reduced) return;
    let frame = 0;
    const total = Math.max(14, Math.round(text.length * 1.6));
    const id = setInterval(() => {
      frame++;
      const solved = Math.floor((frame / total) * text.length);
      setDisplay(
        text
          .split("")
          .map((c, i) =>
            i < solved || c === " "
              ? c
              : CHARS[(Math.random() * CHARS.length) | 0]
          )
          .join("")
      );
      if (frame >= total) {
        setDisplay(text);
        clearInterval(id);
      }
    }, 28);
    return () => clearInterval(id);
  }, [inView, reduced, text]);

  return (
    <span ref={ref} className={className}>
      {/* real text for AT; the scramble is decorative */}
      <span className="sr-only">{text}</span>
      <span aria-hidden>{display}</span>
    </span>
  );
}
