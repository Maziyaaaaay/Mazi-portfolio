"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "hover" | "play";

export default function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [enabled, setEnabled] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setHidden(false);
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

    const loop = () => {
      curX += (mouseX - curX) * 0.18;
      curY += (mouseY - curY) * 0.18;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
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
  }, []);

  if (!enabled) return null;

  const size = mode === "play" ? 56 : mode === "hover" ? 40 : 8;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s" }}
    >
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor:
            mode === "default" ? "var(--accent-gold)" : "rgba(200, 169, 110, 0.08)",
          border:
            mode === "default" ? "none" : "1px solid rgba(200, 169, 110, 0.6)",
          transition:
            "width 0.25s cubic-bezier(0.76,0,0.24,1), height 0.25s cubic-bezier(0.76,0,0.24,1), background-color 0.25s, border 0.25s",
        }}
      >
        {mode === "play" && (
          <span className="font-mono text-[10px] tracking-[0.15em] text-gold">
            PLAY&nbsp;▶
          </span>
        )}
      </div>
    </div>
  );
}
