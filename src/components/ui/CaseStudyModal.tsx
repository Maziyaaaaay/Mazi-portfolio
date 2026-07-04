"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ExternalLink, X } from "lucide-react";
import type { Project, VideoSource } from "@/types";
import { asset } from "@/lib/asset";
import { EASE_CINE } from "@/lib/animations";
import PosterFrame from "@/components/ui/PosterFrame";

const CASE_FIELDS = [
  ["brief", "Brief"],
  ["approach", "Approach"],
  ["pipeline", "Pipeline"],
  ["outcome", "Outcome"],
  ["credits", "Credits"],
] as const;

function Player({ source, title }: { source: VideoSource; title: string }) {
  if (source.kind === "file") {
    return (
      <video
        src={asset(source.src)}
        controls
        autoPlay
        playsInline
        className="h-full w-full bg-black object-contain"
      />
    );
  }
  const url =
    source.kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${source.id}?autoplay=1`;
  return (
    <iframe
      src={url}
      title={title}
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      className="h-full w-full bg-black"
    />
  );
}

/**
 * Expanded case view: the film on top (or the still/poster when a
 * project has no video), full case-study fields below. Only fields
 * present in the data render — unknowns stay TODO in constants.
 */
export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_CINE }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — case study`}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="absolute right-5 top-5 z-10 text-cream/70 transition-colors duration-300 hover:text-gold"
          >
            <X size={32} />
          </button>

          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: EASE_CINE }}
            data-lenis-prevent
            className="glass glass-heavy max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* media */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {project.video ? (
                <Player source={project.video} title={project.title} />
              ) : project.image ? (
                <Image
                  src={asset(project.image)}
                  alt={project.imageAlt ?? project.title}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="object-cover"
                />
              ) : project.poster ? (
                <PosterFrame poster={project.poster} />
              ) : null}
            </div>

            {/* case content */}
            <div className="p-7 md:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                  {project.categoryLabel}
                </p>
                <span className="rounded-full border border-gold/40 px-3 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {project.status}
                </span>
              </div>

              <h3 className="mt-4 font-display text-4xl tracking-wide text-cream md:text-5xl">
                {project.title}
              </h3>

              {project.award && (
                <p className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-gold">
                  <Award size={12} aria-hidden />
                  {project.award}
                </p>
              )}

              {project.caseStudy && (
                <dl className="mt-8 grid gap-x-10 gap-y-6 border-t border-line pt-8 md:grid-cols-2">
                  {CASE_FIELDS.map(([key, label]) => {
                    const value = project.caseStudy?.[key];
                    if (!value) return null;
                    return (
                      <div
                        key={key}
                        className={key === "brief" ? "md:col-span-2" : undefined}
                      >
                        <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                          {label}
                        </dt>
                        <dd className="mt-2 font-body text-sm leading-relaxed text-cream/85">
                          {value}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              )}

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold px-6 py-2.5 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold transition-colors duration-300 hover:bg-gold hover:text-void"
                >
                  Visit live
                  <ExternalLink size={13} aria-hidden />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
