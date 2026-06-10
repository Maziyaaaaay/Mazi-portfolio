"use client";

import { motion } from "framer-motion";
import { fadeLeft, VIEWPORT_ONCE } from "@/lib/animations";

export default function SectionLabel({ children }: { children: string }) {
  return (
    <motion.p
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="font-body text-xs font-medium uppercase tracking-[0.3em] text-gold"
    >
      —&nbsp;&nbsp;{children}
    </motion.p>
  );
}
