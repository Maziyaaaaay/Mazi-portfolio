"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CounterStatProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function CounterStat({
  value,
  suffix = "",
  label,
}: CounterStatProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || counted.current) return;
        counted.current = true;
        observer.disconnect();

        if (reduced) {
          return;
        }

        el.textContent = "0";
        const proxy = { n: 0 };
        gsap.to(proxy, {
          n: value,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(proxy.n));
          },
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left">
      <p className="font-display text-6xl leading-none text-gold md:text-7xl">
        <span ref={numRef}>{value}</span>
        {suffix}
      </p>
      <p className="font-body text-sm uppercase tracking-[0.15em] text-muted">
        {label}
      </p>
    </div>
  );
}
