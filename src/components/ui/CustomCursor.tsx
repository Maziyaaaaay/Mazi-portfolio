"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "hover" | "play";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [enabled, setEnabled] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // The dot tracks the pointer EXACTLY — no lerp, so zero perceived lag.
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (hidden) setHidden(false);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-cursor='play']")) {
        setMode("play");
      } else if (target.closest("a, button, [role='button']")) {
        setMode("hover");
      } else {
        setMode("default");
      }
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    // Only the ring trails — a quick, snappy follow (not the old sluggish 0.18).
    const loop = () => {
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
    // `hidden` intentionally excluded — listeners read it via closure-safe setter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  const ringSize = mode === "play" ? 72 : mode === "hover" ? 48 : 34;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s" }}
    >
      {/* trailing ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          width: ringSize,
          height: ringSize,
          backgroundColor:
            mode === "play"
              ? "rgba(200, 169, 110, 0.12)"
              : "rgba(200, 169, 110, 0.04)",
          border: "1px solid rgba(200, 169, 110, 0.5)",
          backdropFilter: mode === "play" ? "blur(2px)" : "none",
          transition:
            "width 0.3s cubic-bezier(0.34,1.56,0.64,1), height 0.3s cubic-bezier(0.34,1.56,0.64,1), background-color 0.3s",
        }}
      >
        {mode === "play" && (
          <span className="font-mono text-[10px] tracking-[0.15em] text-gold">
            PLAY&nbsp;▶
          </span>
        )}
      </div>

      {/* instant dot — hidden in play mode so the PLAY label reads cleanly */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{
          width: 6,
          height: 6,
          opacity: mode === "play" ? 0 : 1,
          transition: "opacity 0.2s",
        }}
      />
    </div>
  );
}
