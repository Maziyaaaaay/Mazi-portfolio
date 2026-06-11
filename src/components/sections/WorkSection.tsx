"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS, WORK_FILTERS } from "@/lib/constants";
import { EASE_CINE, fadeUp, VIEWPORT_ONCE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/ui/ProjectCard";
import VideoModal from "@/components/ui/VideoModal";

type FilterId = (typeof WORK_FILTERS)[number]["id"];

/** Editorial variation — not every frame is the same shape. */
const ASPECTS: Record<string, string> = {
  hu: "aspect-[16/9] md:aspect-[21/9]",
  topad: "aspect-[4/5]",
  coreve: "aspect-[4/5]",
  nurena: "aspect-[16/10]",
  ict: "aspect-[4/5]",
  ampaware: "aspect-[4/3]",
  tripsplit: "aspect-[4/5]",
  calivista: "aspect-[16/10]",
  "art-of-teaching": "aspect-video",
};

export default function WorkSection() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [playing, setPlaying] = useState<{ src: string; title: string } | null>(
    null
  );

  useEffect(() => {
    const onFilter = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (WORK_FILTERS.some((f) => f.id === detail)) {
        setFilter(detail as FilterId);
      }
    };
    window.addEventListener("work-filter", onFilter);
    return () => window.removeEventListener("work-filter", onFilter);
  }, []);

  const visible = PROJECTS.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section id="work" aria-label="Selected work">
      <div className="container-cine section-pad">
        <SectionLabel>Portfolio</SectionLabel>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-6 font-display text-[clamp(56px,9vw,120px)] leading-none text-cream"
        >
          SELECTED WORK
        </motion.h2>

        {/* filter tabs */}
        <div
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-px"
          role="tablist"
          aria-label="Filter projects"
        >
          {WORK_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`relative pb-3 font-body text-sm uppercase tracking-[0.12em] transition-colors duration-300 ${
                filter === f.id ? "text-cream" : "text-muted hover:text-cream"
              }`}
            >
              {f.label}
              {filter === f.id && (
                <motion.span
                  layoutId="work-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-px bg-gold"
                  transition={{ duration: 0.4, ease: EASE_CINE }}
                />
              )}
            </button>
          ))}
        </div>

        {/* project grid */}
        <motion.div layout className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: EASE_CINE }}
                className={project.featured ? "md:col-span-2" : undefined}
              >
                <ProjectCard
                  project={project}
                  aspectClass={ASPECTS[project.id] ?? "aspect-[4/3]"}
                  onPlay={(src, title) => setPlaying({ src, title })}
                />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <VideoModal
        open={Boolean(playing)}
        src={playing?.src ?? null}
        title={playing?.title}
        onClose={() => setPlaying(null)}
      />
    </section>
  );
}
