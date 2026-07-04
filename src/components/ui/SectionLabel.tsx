"use client";

import { motion } from "framer-motion";
import { fadeLeft, VIEWPORT_ONCE } from "@/lib/animations";
import ScrambleText from "@/components/motion/ScrambleText";

export default function SectionLabel({ children }: { children: string }) {
  return (
    <motion.p
      variants={fadeLeft}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-gold"
    >
      —&nbsp;&nbsp;
      <ScrambleText text={children} />
    </motion.p>
  );
}
