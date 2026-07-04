"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Linkedin, Mail, Phone } from "lucide-react";
import { CONTACT, SITE, WORK_WITH_ME } from "@/lib/constants";
import { asset } from "@/lib/asset";
import { fadeUp, staggerChildren, VIEWPORT_ONCE } from "@/lib/animations";
import SectionLabel from "@/components/ui/SectionLabel";
import SplitReveal from "@/components/motion/SplitReveal";
import Magnetic from "@/components/ui/Magnetic";
import ContactForm from "@/components/ui/ContactForm";
import LogoMarquee from "@/components/ui/LogoMarquee";

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
    <section
      id="contact"
      aria-label="Contact"
      className="group/section relative overflow-hidden"
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--cx", `${e.clientX - r.left}px`);
        el.style.setProperty("--cy", `${e.clientY - r.top}px`);
      }}
    >
      {/* cursor-following gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/section:opacity-100"
        style={{
          background:
            "radial-gradient(640px circle at var(--cx, 70%) var(--cy, 30%), color-mix(in srgb, var(--accent) 9%, transparent), transparent 70%)",
        }}
      />

      <div className="container-cine section-pad relative">
        <SectionLabel>{CONTACT.eyebrow}</SectionLabel>

        <SplitReveal
          text="READY WHEN YOU ARE."
          className="mt-6 font-display text-[clamp(60px,11vw,160px)] leading-[0.92] text-cream"
        />

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-cream/90 md:text-xl"
        >
          {CONTACT.statement}
        </motion.p>

        {/* primary actions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <Magnetic strength={0.35}>
            <a
              href={`mailto:${SITE.email}?subject=Project%20inquiry`}
              className="group/cta glass inline-flex items-center gap-3 rounded-full px-10 py-5 font-body text-base font-semibold uppercase tracking-[0.15em] text-gold transition-colors duration-300 hover:text-cream"
            >
              <span className="glass-sheen" aria-hidden />
              Start a Project
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover/cta:translate-x-1"
                aria-hidden
              />
            </a>
          </Magnetic>

          {/* one-pager download — hidden until the PDF lands in
              public/downloads (TODO: Mazin supplies the file) */}
          {WORK_WITH_ME.onePager.available && (
            <a
              href={asset(WORK_WITH_ME.onePager.href)}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.15em] text-muted transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <Download size={14} aria-hidden />
              One-pager (PDF)
            </a>
          )}
        </motion.div>

        {/* what I offer */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {WORK_WITH_ME.offers.map((offer) => (
            <motion.span
              key={offer}
              variants={fadeUp}
              className="glass glass-light rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/85"
            >
              {offer}
            </motion.span>
          ))}
        </motion.div>

        {/* how we start */}
        <motion.div
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {WORK_WITH_ME.steps.map((step) => (
            <motion.div
              key={step.n}
              variants={fadeUp}
              className="glass glass-light rounded-md p-7"
            >
              <p className="font-mono text-sm tracking-[0.3em] text-gold">
                {step.n}
              </p>
              <h3 className="mt-4 font-display text-2xl tracking-wide text-cream">
                {step.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* direct lines + form */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-5"
          >
            {CONTACT_BLOCKS.map((block) => (
              <motion.a
                key={block.label}
                variants={fadeUp}
                href={block.href}
                {...(block.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group glass flex items-center gap-5 rounded-md px-7 py-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="glass-sheen" aria-hidden />
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

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
              Or brief me right here
            </p>
            <ContactForm />
          </motion.div>
        </div>
      </div>

      {/* clients & collaborations */}
      <div className="relative border-t border-line">
        <LogoMarquee />
      </div>
    </section>
  );
}
