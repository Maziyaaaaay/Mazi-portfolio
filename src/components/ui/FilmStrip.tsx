"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FILM_FRAMES } from "@/lib/constants";
import PosterFrame from "@/components/ui/PosterFrame";

const FRAME_HEIGHTS = [200, 230, 184, 216, 196, 224, 188, 210];
const FRAME_TILTS = [-1.5, 1, -0.6, 1.8, -1.2, 0.8, -1.8, 1.4];

export default function FilmStrip({ className = "" }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 80,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tween.pause();
    const resume = () => tween.resume();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      tween.kill();
    };
  }, []);

  // Two copies of the sequence make the -50% loop seamless.
  const sequence = [...FILM_FRAMES, ...FILM_FRAMES];

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max items-center gap-6 py-4">
        {sequence.map((frame, i) => {
          const h = FRAME_HEIGHTS[i % FRAME_HEIGHTS.length];
          const tilt = FRAME_TILTS[i % FRAME_TILTS.length];
          return (
            <figure
              key={`${frame.label}-${i}`}
              className="relative shrink-0 overflow-hidden rounded-sm border border-line bg-surface"
              style={{
                width: 280,
                height: h,
                transform: `rotate(${tilt}deg)`,
              }}
              aria-hidden={i >= FILM_FRAMES.length}
            >
              {frame.src ? (
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="280px"
                  className="object-cover saturate-[0.8]"
                  priority={i === 0}
                />
              ) : frame.poster ? (
                <PosterFrame poster={frame.poster} />
              ) : null}
              <figcaption className="absolute bottom-2 left-3 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-cream/60">
                <span className="inline-block h-1 w-1 rounded-full bg-gold" />
                {frame.label}
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* edge fades into the void */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent md:w-48" />
    </div>
  );
}
