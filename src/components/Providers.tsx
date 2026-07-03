"use client";

import { MotionConfig } from "framer-motion";
import SmoothScroll from "@/components/motion/SmoothScroll";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}
