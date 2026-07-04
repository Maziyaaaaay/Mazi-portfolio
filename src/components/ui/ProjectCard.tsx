"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ExternalLink, Play } from "lucide-react";
import type { Project } from "@/types";
import { asset } from "@/lib/asset";
import { EASE_CINE } from "@/lib/animations";
import PosterFrame from "@/components/ui/PosterFrame";
import HoverPreview from "@/components/ui/HoverPreview";
import Tilt from "@/components/ui/Tilt";

const STATUS_STYLES: Record<Project["status"], string> = {
  LIVE: "text-[#8fd19a] border-[#8fd19a]/40",
  "IN DEVELOPMENT": "text-[#d9a13d] border-[#d9a13d]/40",
  DELIVERED: "text-gold border-gold/40",
  PROTOTYPE: "text-cream/70 border-cream/25",
  ARCHIVE: "text-muted border-line",
};

interface ProjectCardProps {
  project: Project;
  /** Tailwind aspect-ratio class for the media frame. */
  aspectClass: string;
  /** Opens the expanded case view. */
  onOpen?: (project: Project) => void;
}

export default function ProjectCard({
  project,
  aspectClass,
  onOpen,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const hasVideo = Boolean(project.video);
  const previewSrc =
    project.previewSrc ??
    (project.video?.kind === "file" ? project.video.src : undefined);
  const opensCase = Boolean(onOpen && (hasVideo || project.caseStudy));

  const media = (
    <Tilt>
      <motion.div
        initial={{ clipPath: "inset(12% 4% 12% 4%)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE_CINE }}
        className={`group relative w-full overflow-hidden rounded-sm border border-line bg-surface ${aspectClass}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => {
          const el = e.currentTarget;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
      >
        <div className="absolute inset-0 transition-transform duration-[400ms] ease-out group-hover:scale-105">
          {project.image ? (
            <Image
              src={asset(project.image)}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="glitch-on-hover object-cover saturate-[0.85]"
              loading="lazy"
            />
          ) : project.poster ? (
            <PosterFrame poster={project.poster} />
          ) : null}
        </div>

        {/* muted looping preview above the still */}
        {previewSrc && (
          <HoverPreview
            src={previewSrc}
            poster={project.image}
            active={hovered}
          />
        )}

        {/* cursor spotlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%)",
          }}
        />

        {/* status chip */}
        <span
          className={`absolute left-3 top-3 rounded-full border bg-void/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm ${STATUS_STYLES[project.status]}`}
        >
          {project.status}
        </span>

        {/* award badge */}
        {project.award && (
          <span
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-void/70 text-gold backdrop-blur-sm"
            title={project.award}
          >
            <Award size={14} aria-hidden />
          </span>
        )}

        {/* play affordance for video projects */}
        {hasVideo && (
          <span
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="glass flex h-16 w-16 items-center justify-center rounded-full text-gold">
              <Play size={22} aria-hidden />
            </span>
          </span>
        )}
      </motion.div>
    </Tilt>
  );

  return (
    <div>
      {opensCase ? (
        <button
          type="button"
          className="block w-full text-left"
          onClick={() => onOpen!(project)}
          aria-label={`Open case study: ${project.title}`}
        >
          {media}
        </button>
      ) : project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} in a new tab`}
        >
          {media}
        </a>
      ) : (
        media
      )}

      <div className="mt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          {project.categoryLabel}
        </p>
        <h3 className="mt-2 flex items-center gap-2 font-display text-2xl tracking-wide text-cream md:text-3xl">
          {project.title}
          {project.link && !opensCase && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-300 hover:text-gold"
              aria-label={`Visit ${project.title}`}
            >
              <ExternalLink size={16} aria-hidden />
            </a>
          )}
        </h3>
        <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        {project.award && (
          <p className="mt-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-gold">
            <Award size={12} aria-hidden />
            {project.award}
          </p>
        )}
      </div>
    </div>
  );
}
