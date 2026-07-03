"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Scroll-linked parallax. `speed` is a rate offset: positive drifts
 * against the scroll (feels farther away), negative drifts with it.
 * Zeroed out under reduced motion.
 */
export default function Parallax({
  children,
  speed = 0.15,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);

  return (
    <motion.div ref={ref} style={{ y: reduced ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}
