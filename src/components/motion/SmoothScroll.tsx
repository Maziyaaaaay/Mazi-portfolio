"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

/** Access the live Lenis instance (null when reduced-motion or SSR). */
export function useLenis() {
  return useContext(LenisContext);
}

const NAV_OFFSET = -80;

/**
 * Lenis-powered inertial scroll for the whole page. Skipped entirely
 * under prefers-reduced-motion (native scrolling + scroll-margin take
 * over). Anchor clicks are intercepted so they ride the same easing
 * and land clear of the fixed nav.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // heavier glide — premium weight, still settles decisively
    const instance = new Lenis({
      duration: 1.45,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let raf = requestAnimationFrame(function loop(time) {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    });

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;
      const id = anchor.getAttribute("href")!.slice(1);
      const target = id === "top" ? 0 : document.getElementById(id);
      if (target === null) return;
      e.preventDefault();
      instance.scrollTo(target, {
        offset: target === 0 ? 0 : NAV_OFFSET,
        force: true,
      });
      history.pushState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    // Modals and the mobile menu lock scrolling via body overflow —
    // mirror that into Lenis without coupling to each component.
    const observer = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") instance.stop();
      else instance.start();
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    setLenis(instance);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("click", onClick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
