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
  video?: string;
  link?: string;
  featured?: boolean;
  poster?: PosterStyle;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  tools: string;
  clients: string;
}

export interface PipelineStage {
  stage: string;
  tool: string;
  description: string;
}

export interface Achievement {
  year: string;
  title: string;
  context: string;
}

export interface FilmFrame {
  /** Image src, or undefined for a typographic poster frame. */
  src?: string;
  alt: string;
  /** Slate label shown on the frame. */
  label: string;
  poster?: PosterStyle;
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
