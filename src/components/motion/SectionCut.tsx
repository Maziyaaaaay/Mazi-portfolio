"use client";

import { motion } from "framer-motion";
import { EASE_CINE } from "@/lib/animations";

/**
 * Edit-cut divider between major sections — a slate line that draws
 * itself as it enters, bracketed by scene metadata in the timecode
 * voice.
 */
export default function SectionCut({
  scene,
  label,
}: {
  scene: string;
  label: string;
}) {
  return (
    <div
      className="container-cine flex items-center gap-5 py-3"
      aria-hidden
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
        SC&nbsp;{scene}
      </span>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.9, ease: EASE_CINE }}
        className="h-px flex-1 origin-left bg-line"
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
        {label} · 24FPS
      </span>
    </div>
  );
}
