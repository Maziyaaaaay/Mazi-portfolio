"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Clapperboard,
  GraduationCap,
  Play,
  Rocket,
  Trophy,
} from "lucide-react";
import { HERO } from "@/lib/constants";
import { EASE_CINE } from "@/lib/animations";
import FilmStrip from "@/components/ui/FilmStrip";
import Magnetic from "@/components/ui/Magnetic";
import VideoModal from "@/components/ui/VideoModal";
import ScrambleText from "@/components/motion/ScrambleText";

const ROLE_ICONS = [Clapperboard, Rocket, Trophy, GraduationCap];
const VISIBLE_PILLS = 3;

export default function HeroSection() {
  const [roleOffset, setRoleOffset] = useState(0);
  const [reelOpen, setReelOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  // cursor-driven parallax: layers drift on a weighted spring
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 220, damping: 26, mass: 0.4 });

  // scroll scrub: leaving the hero slides the strip sideways and
  // sinks/fades the text column — cursor and scroll share transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const stripX = useTransform(
    [sx, scrollYProgress],
    ([m, p]: number[]) => m * -28 + p * -160
  );
  const stripY = useTransform(
    [sy, scrollYProgress],
    ([m, p]: number[]) => m * -12 + p * 60
  );
  const headlineX = useTransform(sx, (v) => v * 7);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  useEffect(() => {
    const id = setInterval(
      () => setRoleOffset((v) => (v + 1) % HERO.roles.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  const visibleRoles = Array.from({ length: VISIBLE_PILLS }, (_, i) => {
    const idx = (roleOffset + i) % HERO.roles.length;
    return { role: HERO.roles[idx], Icon: ROLE_ICONS[idx] };
  });

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative flex min-h-dvh flex-col overflow-hidden"
      aria-label="Introduction"
    >
      {/* Ambient breathing glow — depth behind everything */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <div
          className="hero-aura"
          style={{
            left: "-10%",
            top: "10%",
            width: "55vw",
            height: "55vw",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent) 28%, transparent), transparent 70%)",
          }}
        />
        <div
          className="hero-aura"
          style={{
            right: "-15%",
            bottom: "0%",
            width: "45vw",
            height: "45vw",
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--accent-2) 20%, transparent), transparent 70%)",
            animationDelay: "-8s",
            animationDuration: "20s",
          }}
        />
      </div>

      {/* Ambient film flow — blended projected light, context not focus */}
      <motion.div
        style={{ x: stripX, y: stripY }}
        className="pointer-events-auto absolute left-0 top-1/2 z-0 w-full -translate-y-1/2 opacity-[0.85]"
      >
        <FilmStrip />
      </motion.div>
      {/* readability scrim — dark enough behind the headline, clears on the right */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-void from-12% via-void/50 to-void/5" />

      <div className="container-cine relative z-10 flex flex-1 items-center pb-16 pt-28 lg:pt-32">
        {/* ------------------------------------------------ text column */}
        <motion.div
          style={reducedMotion ? undefined : { y: textY, opacity: textFade }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_CINE }}
            className="mb-6 font-body text-xs font-medium uppercase tracking-[0.3em] text-gold md:text-sm"
          >
            {HERO.eyebrow}
          </motion.p>

          <motion.h1
            style={{ x: headlineX }}
            className="font-display leading-[0.88] text-cream"
          >
            {HERO.headline.map((line, i) => (
              <span
                key={line}
                className="block overflow-hidden text-[clamp(64px,13vw,160px)]"
              >
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.25 + i * 0.15,
                    ease: EASE_CINE,
                  }}
                >
                  {line}
                  {i === HERO.headline.length - 1 && (
                    <span className="text-gold">.</span>
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* role pills — a rotating window over the four roles */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE_CINE }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleRoles.map(({ role, Icon }) => (
                <motion.span
                  key={role}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: EASE_CINE }}
                  className="glass glass-light flex items-center gap-2 rounded-full px-4 py-1.5 font-body text-[13px] text-cream/85"
                >
                  <Icon size={14} className="text-gold" aria-hidden />
                  {role}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: EASE_CINE }}
            className="mt-6 max-w-md font-body text-lg text-muted"
          >
            {HERO.supporting}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: EASE_CINE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                className="group flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.12em] text-void transition-colors duration-300 hover:bg-cream"
              >
                See My Work
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={() => setReelOpen(true)}
                className="flex items-center gap-2 rounded-full border border-gold px-7 py-3.5 font-body text-sm font-semibold uppercase tracking-[0.12em] text-gold transition-colors duration-300 hover:bg-gold/10"
              >
                <Play size={15} aria-hidden />
                Watch Reel
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* ------------------------------------------------ stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3, ease: EASE_CINE }}
        className="relative z-10 border-t border-line"
      >
        <div className="container-cine flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-5 md:justify-between md:gap-x-2">
          {HERO.stats.map((stat, i) => (
            <span
              key={stat}
              className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:text-xs"
            >
              <ScrambleText text={stat} />
              {i < HERO.stats.length - 1 && (
                <span className="hidden text-gold md:inline" aria-hidden>
                  ·
                </span>
              )}
            </span>
          ))}
        </div>
      </motion.div>

      <VideoModal
        open={reelOpen}
        src={HERO.reelVideo}
        title={HERO.reelTitle}
        onClose={() => setReelOpen(false)}
      />
    </section>
  );
}
