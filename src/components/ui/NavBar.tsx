"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { EASE_CINE } from "@/lib/animations";
import Magnetic from "@/components/ui/Magnetic";
import ThemeToggle from "@/components/ui/ThemeToggle";

function applyWorkFilter(filter?: string) {
  window.dispatchEvent(
    new CustomEvent("work-filter", { detail: filter ?? "all" })
  );
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLink = (href: string, filter?: string) => {
    if (href === "#work") applyWorkFilter(filter);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] border-b transition-all duration-300 ${
        scrolled ? "glass glass-heavy border-line" : "border-transparent"
      }`}
    >
      <nav
        className="container-cine flex h-16 items-center justify-between md:h-[72px]"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          onClick={() => setMenuOpen(false)}
          className="font-display text-2xl tracking-[0.2em] text-cream transition-colors duration-300 hover:text-gold"
          aria-label="Mazin KP — back to top"
        >
          MAZIN&nbsp;KP
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => handleLink(link.href, link.filter)}
                className="font-body text-sm uppercase tracking-[0.1em] text-cream transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Magnetic strength={0.2}>
            <a
              href="#contact"
              className="hidden rounded-full border border-gold px-5 py-2 font-body text-xs font-medium uppercase tracking-[0.15em] text-gold transition-colors duration-300 hover:bg-gold hover:text-void sm:block"
            >
              Let&apos;s Connect
            </a>
          </Magnetic>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="text-cream md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_CINE }}
            className="fixed inset-0 top-16 z-[110] flex flex-col bg-void md:hidden"
          >
            <ul className="container-cine flex flex-1 flex-col justify-center gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.06 * i,
                    ease: EASE_CINE,
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => handleLink(link.href, link.filter)}
                    className="block py-3 font-display text-5xl tracking-wide text-cream transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.36, ease: EASE_CINE }}
                className="mt-8"
              >
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block rounded-full border border-gold px-8 py-3 font-body text-sm font-medium uppercase tracking-[0.15em] text-gold"
                >
                  Let&apos;s Connect
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
