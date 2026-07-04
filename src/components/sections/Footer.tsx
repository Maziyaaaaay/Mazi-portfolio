import { Linkedin } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="container-cine flex items-center justify-between py-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          © 2026 {SITE.name} · mazinkp.in
        </p>
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Mazin KP on LinkedIn"
          className="text-muted transition-colors duration-300 hover:text-gold"
        >
          <Linkedin size={18} aria-hidden />
        </a>
      </div>
    </footer>
  );
}
