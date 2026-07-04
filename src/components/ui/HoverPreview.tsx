"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { asset } from "@/lib/asset";

/* Cap simultaneously-playing previews site-wide; the oldest one is
   paused when the cap is hit. */
const MAX_PLAYING = 3;
const pool = new Set<HTMLVideoElement>();

function requestPlay(el: HTMLVideoElement) {
  if (!pool.has(el) && pool.size >= MAX_PLAYING) {
    const oldest = pool.values().next().value;
    if (oldest) {
      oldest.pause();
      pool.delete(oldest);
    }
  }
  pool.add(el);
  el.play().catch(() => {});
}

function release(el: HTMLVideoElement) {
  pool.delete(el);
  el.pause();
}

/**
 * Muted looping preview layered over a card's still. Desktop: driven
 * by the parent's hover via `active`. Touch devices: plays while the
 * card is mostly in view. The <video> mounts on first demand
 * (preload="none"), fades in once frames are actually rendering, and
 * never mounts under reduced motion.
 */
export default function HoverPreview({
  src,
  poster,
  active,
}: {
  src: string;
  poster?: string;
  active: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // desktop hover drive — first activation mounts the <video>, the
  // re-run after mount starts playback
  useEffect(() => {
    if (reduced || coarse) return;
    if (active && !mounted) {
      setMounted(true);
      return;
    }
    const el = videoRef.current;
    if (!el) return;
    if (active) requestPlay(el);
    else {
      release(el);
      setVisible(false);
    }
  }, [active, mounted, reduced, coarse]);

  // touch: play while ≥60% in view
  useEffect(() => {
    if (reduced || !coarse) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.6) {
          setMounted(true);
          const el = videoRef.current;
          if (el) requestPlay(el);
        } else {
          const el = videoRef.current;
          if (el) {
            release(el);
            setVisible(false);
          }
        }
      },
      { threshold: [0, 0.6] }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [reduced, coarse, mounted]);

  useEffect(() => {
    const el = videoRef.current;
    return () => {
      if (el) release(el);
    };
  }, [mounted]);

  if (reduced) return null;

  return (
    <div ref={wrapRef} className="absolute inset-0" aria-hidden>
      {mounted && (
        <video
          ref={videoRef}
          src={asset(src)}
          poster={poster ? asset(poster) : undefined}
          muted
          loop
          playsInline
          preload="none"
          onPlaying={() => setVisible(true)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
