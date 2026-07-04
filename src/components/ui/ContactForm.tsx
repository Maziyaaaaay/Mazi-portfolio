"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { SITE, WORK_WITH_ME } from "@/lib/constants";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD_CLASS =
  "w-full rounded-sm border border-line bg-transparent px-4 py-3 font-body text-sm text-cream placeholder:text-faint outline-none transition-colors duration-300 focus:border-gold";

/**
 * Lightweight inquiry form. POSTs JSON to WORK_WITH_ME.formEndpoint
 * when configured; until then it composes a prefilled email — fully
 * functional either way, no backend required for the static deploy.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<
      string,
      string
    >;

    if (!WORK_WITH_ME.formEndpoint) {
      const subject = encodeURIComponent(
        `Project inquiry — ${data.name || "your site"}`
      );
      const body = encodeURIComponent(
        `${data.message}\n\n— ${data.name} · ${data.email}`
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(WORK_WITH_ME.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          Name
        </span>
        <input
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={FIELD_CLASS}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@brand.com"
          className={FIELD_CLASS}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-faint">
          Project
        </span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="The brand, the product, and what it should feel like…"
          className={`${FIELD_CLASS} resize-none`}
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group/send mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full border border-gold px-8 py-3 font-body text-xs font-semibold uppercase tracking-[0.15em] text-gold transition-colors duration-300 hover:bg-gold hover:text-void disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send inquiry"}
        <ArrowRight
          size={14}
          className="transition-transform duration-300 group-hover/send:translate-x-1"
          aria-hidden
        />
      </button>

      <p role="status" className="min-h-5 font-mono text-[11px] tracking-[0.1em]">
        {status === "sent" && (
          <span className="text-gold">Received — I&apos;ll get back to you soon.</span>
        )}
        {status === "error" && (
          <span className="text-[#ff7a5c]">
            Something broke — email me directly at {SITE.email}.
          </span>
        )}
      </p>
    </form>
  );
}
