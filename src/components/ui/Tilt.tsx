"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * Perspective tilt toward the cursor, springing back on leave.
 * No-op on touch (mouse events never fire) and under reduced motion.
 */
export default function Tilt({
  children,
  max = 6,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 });
  const ry = useSpring(0, { stiffness: 180, damping: 18, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    ry.set(dx * max);
    rx.set(-dy * max);
  };

  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
