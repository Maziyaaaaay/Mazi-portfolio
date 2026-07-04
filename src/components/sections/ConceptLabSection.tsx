"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Concept } from "@/types";
import { CONCEPT_LAB, CONCEPTS } from "@/lib/constants";
import { asset } from "@/lib/asset";
import { fadeUp, staggerChildren, VIEWPORT_ONCE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import VideoModal from "@/components/ui/VideoModal";
import HoverPreview from "@/components/ui/HoverPreview";
import Tilt from "@/components/ui/Tilt";
import SplitReveal from "@/components/motion/SplitReveal";

/** Duotone still that snaps to full colour and starts a muted loop
 *  on hover; click opens the full player. */
function ConceptCard({
  concept,
  onPlay,
}: {
  concept: Concept;
  onPlay: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article variants={fadeUp}>
      <Tilt>
        <button
          type="button"
          onClick={onPlay}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label={`Play video: ${concept.title}`}
          className="group relative block aspect-[9/14] w-full overflow-hidden rounded-sm border border-line bg-void text-left"
        >
          <div className="absolute inset-0 transition-transform duration-[400ms] ease-out group-hover:scale-105">
            <Image
              src={asset(concept.image)}
              alt={concept.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover grayscale-[0.85] sepia-[0.12] transition-[filter] duration-500 group-hover:grayscale-0 group-hover:sepia-0"
              loading="lazy"
            />
          </div>
          <HoverPreview
            src={concept.video}
            poster={concept.image}
            active={hovered}
          />
          <span
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="glass flex h-12 w-12 items-center justify-center rounded-full text-gold">
              <Play size={18} aria-hidden />
            </span>
          </span>
        </button>
      </Tilt>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
        {concept.tag}
      </p>
      <h3 className="mt-1 font-body text-sm font-semibold text-cream">
        {concept.title}
      </h3>
    </motion.article>
  );
}

export default function ConceptLabSection() {
  const [playing, setPlaying] = useState<{ src: string; title: string } | null>(
    null
  );

  return (
    <section className="bg-surface" aria-label="Concept lab">
      <div className="container-cine section-pad">
        <SectionLabel>{CONCEPT_LAB.eyebrow}</SectionLabel>

        <SplitReveal
          text={CONCEPT_LAB.heading}
          className="mt-6 font-display text-[clamp(44px,6vw,84px)] leading-none text-cream"
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-5 max-w-xl font-body text-base leading-relaxed text-muted"
        >
          {CONCEPT_LAB.sub}
        </motion.p>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {CONCEPTS.map((concept) => (
            <ConceptCard
              key={concept.id}
              concept={concept}
              onPlay={() =>
                setPlaying({ src: concept.video, title: concept.title })
              }
            />
          ))}
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
