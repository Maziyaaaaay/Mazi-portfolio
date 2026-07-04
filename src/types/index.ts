export type ProjectCategory = "ai-films" | "web-app" | "startup";

export type ProjectStatus =
  | "DELIVERED"
  | "LIVE"
  | "IN DEVELOPMENT"
  | "PROTOTYPE"
  | "ARCHIVE";

/** Styled typographic poster used when no real frame exists for a project. */
export interface PosterStyle {
  /** Large display line rendered in Bebas Neue. */
  title: string;
  /** Small mono sub-line under the title. */
  sub: string;
  /** CSS gradient string for the frame background. */
  gradient: string;
  /** Accent color for the title text. */
  accent: string;
}

/** Where a full film lives — self-hosted file or a platform embed. */
export type VideoSource =
  | { kind: "file"; src: string }
  | { kind: "youtube"; id: string }
  | { kind: "vimeo"; id: string };

/** Expanded-view case content. Every field optional — the modal only
 *  renders what exists, so unknowns stay TODO in constants, not on
 *  the page. */
export interface CaseStudy {
  brief?: string;
  approach?: string;
  outcome?: string;
  credits?: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  /** e.g. "AI BRAND FILM · UAE" */
  categoryLabel: string;
  description: string;
  status: ProjectStatus;
  award?: string;
  image?: string;
  imageAlt?: string;
  /** Full film for the expanded player. */
  video?: VideoSource;
  /** Short muted loop for hover previews; falls back to the full
   *  file when omitted. */
  previewSrc?: string;
  caseStudy?: CaseStudy;
  link?: string;
  featured?: boolean;
  poster?: PosterStyle;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  clients: string;
}

export interface Achievement {
  year: string;
  title: string;
  context: string;
}

export interface Concept {
  id: string;
  title: string;
  /** Small mono tag, e.g. "SPEC AD". */
  tag: string;
  video: string;
  image: string;
  alt: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
  /** Optional work-grid filter applied on click. */
  filter?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}
