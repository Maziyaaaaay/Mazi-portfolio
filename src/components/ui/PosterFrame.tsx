import type { PosterStyle } from "@/types";

/**
 * Typographic stand-in frame for work that has no exportable footage in
 * this repo (client films, in-development products). Reads as a title
 * card rather than a missing image.
 */
export default function PosterFrame({
  poster,
  className = "",
}: {
  poster: PosterStyle;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden ${className}`}
      style={{ background: poster.gradient }}
      aria-label={`${poster.title} — ${poster.sub}`}
      role="img"
    >
      {/* faint viewfinder corners */}
      <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-cream/15" />
      <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-cream/15" />
      <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-cream/15" />
      <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-cream/15" />

      <p
        className="font-display text-[clamp(40px,6vw,72px)] leading-none tracking-wide"
        style={{ color: poster.accent }}
      >
        {poster.title}
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/40">
        {poster.sub}
      </p>
    </div>
  );
}
