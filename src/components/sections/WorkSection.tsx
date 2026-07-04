"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Project } from "@/types";
import { PROJECTS, WORK_FILTERS } from "@/lib/constants";
import { EASE_CINE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/ui/ProjectCard";
import CaseStudyModal from "@/components/ui/CaseStudyModal";
import SplitReveal from "@/components/motion/SplitReveal";

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

/* uniform frames for the horizontal reel */
const REEL_ASPECTS: Record<string, string> = {
  hu: "aspect-[16/10]",
  topad: "aspect-[4/5]",
  coreve: "aspect-[4/5]",
  nurena: "aspect-[16/10]",
  ict: "aspect-[4/5]",
  ampaware: "aspect-[4/3]",
  tripsplit: "aspect-[4/5]",
  calivista: "aspect-[16/10]",
  "art-of-teaching": "aspect-video",
};

function FilterTabs({
  filter,
  setFilter,
}: {
  filter: FilterId;
  setFilter: (f: FilterId) => void;
}) {
  return (
    <div
      className="flex flex-wrap gap-x-8 gap-y-3 border-b border-line pb-px"
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
  );
}

export default function WorkSection() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [reel, setReel] = useState(false);

  // the pinned horizontal reel only makes sense on wide screens with
  // motion allowed; everyone else gets the grid
  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setReel(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  /* -------------------------------------------- horizontal reel */
  // scroll progress tracks the <section> (always mounted) — a ref on
  // the reel-only wrapper would be null when useScroll first binds
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);

  useEffect(() => {
    if (!reel) return;
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const shift = track.scrollWidth - window.innerWidth;
      setRange(Math.max(0, shift));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reel, filter]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);

  return (
    <section id="work" aria-label="Selected work" ref={sectionRef}>
      {reel ? (
        /* pinned section — projects scroll sideways as you scroll down */
        <div style={{ height: `calc(100vh + ${range}px)` }}>
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
            <div className="container-cine">
              <SectionLabel>Portfolio</SectionLabel>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
                <SplitReveal
                  text="SELECTED WORK"
                  className="font-display text-[clamp(48px,6.5vw,96px)] leading-none text-cream"
                />
                <FilterTabs filter={filter} setFilter={setFilter} />
              </div>
            </div>

            <motion.div
              ref={trackRef}
              style={{ x }}
              className="mt-12 flex w-max items-start gap-10 pl-[max(20px,calc((100vw-1400px)/2+64px))] pr-[12vw]"
            >
              {visible.map((project) => (
                <article key={project.id} className="w-[34vw] max-w-[520px] shrink-0">
                  <ProjectCard
                    project={project}
                    aspectClass={REEL_ASPECTS[project.id] ?? "aspect-[4/3]"}
                    onOpen={setOpenProject}
                    sizes="(min-width: 1024px) 34vw, 100vw"
                  />
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      ) : (
        /* grid — mobile + reduced motion */
        <div className="container-cine section-pad">
          <SectionLabel>Portfolio</SectionLabel>

          <SplitReveal
            text="SELECTED WORK"
            className="mt-6 font-display text-[clamp(56px,9vw,120px)] leading-none text-cream"
          />

          <div className="mt-12">
            <FilterTabs filter={filter} setFilter={setFilter} />
          </div>

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
                    onOpen={setOpenProject}
                  />
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      <CaseStudyModal
        project={openProject}
        onClose={() => setOpenProject(null)}
      />
    </section>
  );
}
