"use client";

import { motion } from "framer-motion";
import { PROJECTS, SERVICES } from "@/lib/constants";
import { fadeUp, staggerChildren, VIEWPORT_ONCE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import ProjectCard from "@/components/ui/ProjectCard";
import SplitReveal from "@/components/motion/SplitReveal";

const STARTUP_PROJECTS = PROJECTS.filter((p) => p.category === "startup");
const STARTUP_SERVICE = SERVICES.find((s) => s.id === "startup-building");

const ASPECTS: Record<string, string> = {
  ampaware: "aspect-[4/3]",
  tripsplit: "aspect-[4/5]",
  calivista: "aspect-[16/10]",
};

export default function StartupSection() {
  return (
    <section id="startup" aria-label="Startup building">
      <div className="container-cine section-pad">
        <SectionLabel>Founder</SectionLabel>

        <SplitReveal
          text="STARTUP BUILDING"
          className="mt-6 font-display text-[clamp(48px,7vw,96px)] leading-none text-cream"
        />

        {STARTUP_SERVICE && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="mt-5 max-w-xl font-body text-base leading-relaxed text-muted"
          >
            {STARTUP_SERVICE.description}
          </motion.p>
        )}

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
        >
          {STARTUP_PROJECTS.map((project) => (
            <motion.article key={project.id} variants={fadeUp}>
              <ProjectCard
                project={project}
                aspectClass={ASPECTS[project.id] ?? "aspect-[4/3]"}
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
