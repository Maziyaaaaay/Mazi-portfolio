"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      // private mode — preference just won't persist
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={light}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      className="group relative h-8 w-[60px] overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--accent-gold)_35%,transparent)] transition-colors duration-300"
      style={{
        backgroundColor: "color-mix(in srgb, var(--accent-gold) 8%, transparent)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        boxShadow:
          "inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -1px 2px rgba(0,0,0,0.15)",
      }}
    >
      {/* faint track icons */}
      <Sun
        size={13}
        aria-hidden
        className="absolute left-2 top-1/2 -translate-y-1/2 text-gold/40"
      />
      <Moon
        size={12}
        aria-hidden
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gold/40"
      />

      {/* sliding glass knob */}
      <motion.span
        aria-hidden
        initial={false}
        animate={{ x: mounted && light ? 3 : 31 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        className="absolute top-1/2 flex h-[26px] w-[26px] -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          left: 0,
          background:
            "linear-gradient(145deg, color-mix(in srgb, var(--accent-gold) 90%, white), var(--accent-gold-dim))",
          boxShadow:
            "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.4)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {light ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="flex"
            >
              <Sun size={14} className="text-void" aria-hidden />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="flex"
            >
              <Moon size={13} className="text-void" aria-hidden />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
