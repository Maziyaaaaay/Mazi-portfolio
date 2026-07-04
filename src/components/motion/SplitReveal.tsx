"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { EASE_CINE, VIEWPORT_ONCE } from "@/lib/animations";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

/**
 * Kinetic headline — each word rises out of an overflow mask with a
 * stagger. The viewport trigger lives on the wrapper tag (the masked
 * words are clipped, so they can never intersect on their own) and
 * the words inherit its variant switch. Full text stays in the SSR
 * HTML; the wrapper carries an aria-label so screen readers hear one
 * phrase. Reduced motion swaps the mask rise for a plain fade.
 */
export default function SplitReveal({
  text,
  as = "h2",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: keyof typeof TAGS;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const Tag = TAGS[as];
  const words = text.split(" ");

  const wordVariants = (i: number): Variants => ({
    hidden: reduced ? { opacity: 0 } : { y: "115%" },
    visible: {
      ...(reduced ? { opacity: 1 } : { y: "0%" }),
      transition: { duration: 0.8, delay: delay + i * 0.08, ease: EASE_CINE },
    },
  });

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden>
          <span className="inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span className="inline-block" variants={wordVariants(i)}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
