"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_CINE, VIEWPORT_ONCE } from "@/lib/animations";

/** The house scroll-reveal — fade-up on viewport entry, once. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.7, delay, ease: EASE_CINE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
