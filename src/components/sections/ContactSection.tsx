"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Phone } from "lucide-react";
import { CONTACT, SITE } from "@/lib/constants";
import { fadeUp, staggerChildren, VIEWPORT_ONCE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";

const CONTACT_BLOCKS = [
  {
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    external: false,
  },
  {
    icon: Phone,
    label: "Phone",
    value: SITE.phone,
    href: SITE.phoneHref,
    external: false,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: SITE.linkedinLabel,
    href: SITE.linkedin,
    external: true,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" aria-label="Contact">
      <div className="container-cine section-pad">
        <SectionLabel>{CONTACT.eyebrow}</SectionLabel>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-6 font-display text-[clamp(56px,9vw,120px)] leading-none text-cream"
        >
          READY WHEN YOU ARE
          <span className="text-gold">.</span>
        </motion.h2>

        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {CONTACT_BLOCKS.map((block) => (
            <motion.a
              key={block.label}
              variants={fadeUp}
              href={block.href}
              {...(block.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group flex items-center gap-5 rounded-sm border border-line bg-surface px-7 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-gold/10 text-gold">
                <block.icon size={18} aria-hidden />
              </span>
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
                  {block.label}
                </span>
                <span className="mt-1 block break-all font-body text-sm text-cream transition-colors duration-300 group-hover:text-gold">
                  {block.value}
                </span>
              </span>
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-16 max-w-3xl font-body text-xl leading-relaxed text-cream/90 md:text-2xl"
        >
          {CONTACT.statement}
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
        >
          <span className="text-gold-dim">Available for&nbsp;—&nbsp;</span>
          {CONTACT.availableFor}
        </motion.p>
      </div>
    </section>
  );
}
