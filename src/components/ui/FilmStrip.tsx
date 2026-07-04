"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FILM_FRAMES } from "@/lib/constants";
import { asset } from "@/lib/asset";
import { blurProps } from "@/lib/blur";
import { useLenis } from "@/components/motion/SmoothScroll";

/* Varied panel geometry — a rhythm, not a grid. Widths/heights in px,
   float timing staggered so no two frames breathe in sync. */
const FRAME_W = [560, 400, 420, 500, 400, 460];
const FRAME_H = [320, 360, 350, 310, 360, 330];
const FLOAT_DUR = [9, 11, 8, 12, 10, 9.5];
const FLOAT_DELAY = [0, -4, -2, -7, -5, -3];

/**
 * The hero film flow: frames melt into the void through feathered
 * gradient masks, overlap and cross-blend, breathe on their own, and
 * carry a flowing volt/cyan/ember wash — projected light, not a
 * contact sheet. The stream drifts continuously (GSAP loop) and
 * reacts to scroll velocity (speed/reverse + momentum skew).
 */
export default function FilmStrip({ className = "" }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 70,
      ease: "none",
      repeat: -1,
    });
    tweenRef.current = tween;

    const pause = () => tween.pause();
    const resume = () => tween.resume();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      tween.kill();
      tweenRef.current = null;
    };
  }, []);

  // scroll-velocity reactivity: fast scrolling speeds the flow up
  // (or reverses it upward) and skews the stream with momentum
  useEffect(() => {
    const track = trackRef.current;
    if (!lenis || !track) return;

    const wrapper = track.parentElement as HTMLElement;
    const skewTo = gsap.quickTo(wrapper, "skewX", {
      duration: 0.35,
      ease: "power2.out",
    });

    const onScroll = ({ velocity }: { velocity: number }) => {
      const v = gsap.utils.clamp(-30, 30, velocity);
      tweenRef.current?.timeScale(gsap.utils.clamp(-4, 5, 1 + v * 0.18));
      skewTo(gsap.utils.clamp(-8, 8, v * 0.3));
    };
    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
      skewTo(0);
      tweenRef.current?.timeScale(1);
    };
  }, [lenis]);

  // Two copies of the sequence make the -50% loop seamless.
  const sequence = [...FILM_FRAMES, ...FILM_FRAMES];

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max items-center py-6">
        {sequence.map((frame, i) => {
          const k = i % FILM_FRAMES.length;
          return (
            <div
              key={`${frame.label}-${i}`}
              className="flow-frame relative shrink-0"
              style={{
                width: FRAME_W[k],
                height: FRAME_H[k],
                marginLeft: i === 0 ? 0 : -72,
              }}
              aria-hidden={i >= FILM_FRAMES.length}
            >
              <div
                className="flow-frame-inner absolute inset-0"
                style={{
                  animationDuration: `${FLOAT_DUR[k]}s`,
                  animationDelay: `${FLOAT_DELAY[k]}s`,
                }}
              >
                {frame.src && (
                  <Image
                    src={asset(frame.src)}
                    {...blurProps(frame.src)}
                    alt={frame.alt}
                    fill
                    sizes="560px"
                    className="object-cover"
                    priority={i === 0}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* flowing colour wash — blends the stream into one gradient */}
      <div className="film-wash pointer-events-none absolute inset-0" aria-hidden />

      {/* edge fades into the void */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent md:w-48" />
    </div>
  );
}
