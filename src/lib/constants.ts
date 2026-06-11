import type {
  Achievement,
  Concept,
  FilmFrame,
  NavLink,
  Project,
  Service,
  StatItem,
} from "@/types";

/* ------------------------------------------------------------------ */
/*  Site                                                               */
/* ------------------------------------------------------------------ */

export const SITE = {
  name: "Muhammed Mazin KP",
  shortName: "Mazin KP",
  url: "https://mazinkp.in",
  title: "Muhammed Mazin KP — AI Content Architect, Educator & Founder",
  description:
    "AI Content Architect producing cinematic AI brand films for clients worldwide. Co-founder & CEO of AmpAware. 5x Hackathon Winner from Kerala, India.",
  email: "mazinkp2005@gmail.com",
  phone: "+91 7306667874",
  phoneHref: "tel:+917306667874",
  linkedin: "https://www.linkedin.com/in/mzinkp2005",
  linkedinLabel: "linkedin.com/in/mzinkp2005",
  location: "Kerala, India",
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Teaching", href: "#teaching" },
  { label: "Startup", href: "#work", filter: "startup" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

export const HERO = {
  eyebrow: "Kerala, India — AI Content Architect",
  headline: ["MAKING", "BRANDS", "MOVE"],
  roles: [
    "AI Brand Films",
    "Co-founder · AmpAware",
    "Hackathon Winner",
    "AI Education",
  ],
  supporting:
    "Cinematic AI brand films for brands worldwide. Co-founder & CEO of AmpAware.",
  reelVideo: "/uploads/films/hu.mp4",
  stats: [
    "5+ Hackathon Wins",
    "6 Countries Visited",
    "3+ Years Building",
    "50+ Client Projects",
  ],
} as const;

export const FILM_FRAMES: FilmFrame[] = [
  {
    src: "/uploads/permute.jpg",
    alt: "Dark stage with purple lighting at the Permute conclave in Kerala",
    label: "PERMUTE · EVENT FILM",
  },
  {
    src: "/uploads/films/hu.jpg",
    alt: "Frame from the HU brand identity film for Happy User, UAE",
    label: "HU · UAE",
  },
  {
    src: "/uploads/aot.jpg",
    alt: "Speaker on stage mid-gesture at a MuLearn event",
    label: "ART OF TEACHING",
  },
  {
    src: "/uploads/films/topad.jpg",
    alt: "Frame from the TopAd exhibition commercial, Oman",
    label: "TOPAD · OMAN",
  },
  {
    src: "/uploads/calivista-screenshot.jpg",
    alt: "Calivista city guide website over an aerial shot of Kozhikode beach",
    label: "CALIVISTA · WEB",
  },
  {
    src: "/uploads/films/coreve.jpg",
    alt: "Frame from the Coreve sneaker launch film",
    label: "COREVE · LAUNCH",
  },
  {
    src: "/uploads/films/nurena.jpg",
    alt: "Frame from the Nurena Mobile Wellness brand film",
    label: "NURENA · WELLNESS",
  },
  {
    src: "/uploads/films/ict.jpg",
    alt: "Frame from the ICT Senior Secondary School campaign film",
    label: "ICT · CAMPAIGN",
  },
  {
    alt: "Typographic frame for AmpAware smart energy startup",
    label: "AMPAWARE · IOT",
    poster: {
      title: "AMPAWARE",
      sub: "KNOW YOUR CURRENT",
      gradient: "linear-gradient(135deg, #141408 0%, #0c0c06 60%, #050505 100%)",
      accent: "#e6d27a",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Manifesto                                                          */
/* ------------------------------------------------------------------ */

export const MANIFESTO = {
  eyebrow: "The Way I Work",
  /** Segments alternate plain / gold-bold via the `gold` flag. */
  paragraph: [
    { text: "I don't edit videos. I " },
    { text: "architect experiences", gold: true },
    {
      text: " that make people feel something before they even realize it happened. Every frame I generate, every voice I direct, every story I build starts with one question: ",
    },
    { text: "will this move someone?", gold: true },
    {
      text: " That's the standard. Global brands, student creators, startup decks — ",
    },
    { text: "same answer required.", gold: true },
  ],
  stats: [
    { value: 5, suffix: "", label: "Hackathon Wins" },
    { value: 6, suffix: "", label: "Countries Explored" },
    { value: 50, suffix: "+", label: "Client Projects" },
    { value: 3, suffix: "", label: "Years Building" },
  ] as StatItem[],
} as const;

/* ------------------------------------------------------------------ */
/*  What I Do                                                          */
/* ------------------------------------------------------------------ */

export const SERVICES: Service[] = [
  {
    id: "ai-brand-films",
    icon: "clapperboard",
    title: "AI BRAND FILMS",
    description:
      "Cinematic product spots and commercials, built with generative AI, for brands that want to stand out.",
    tools: "Kling 3.0 · Veo 3.1 · Seedance 2.0 · ElevenLabs · CapCut",
    clients: "HU (UAE) · TopAd (Oman) · Coreve · Nurena",
  },
  {
    id: "startup-building",
    icon: "zap",
    title: "STARTUP BUILDING",
    description:
      "Co-founding AmpAware, a smart electricity monitoring system for Kerala households.",
    tools: "IoT · AI · Next.js · Supabase",
    clients: "AmpAware · TripSplit · Calivista",
  },
  {
    id: "ai-education",
    icon: "graduation-cap",
    title: "AI EDUCATION",
    description:
      "Teaching creators and students to produce commercialized AI content, not just play with tools.",
    tools: "Demand School · IEEE COET · 50+ Students Taught",
    clients: "AI Contentology Course · Synaptics Workshop",
  },
  {
    id: "content-brand",
    icon: "pen-tool",
    title: "CONTENT & BRAND",
    description:
      "LinkedIn content strategy, personal branding, and thought leadership for the AI generation.",
    tools: "LinkedIn · Ghostwriting · Brand Voice",
    clients: "Personal Brand · Client Ghostwriting",
  },
];

/* ------------------------------------------------------------------ */
/*  Work                                                               */
/* ------------------------------------------------------------------ */

export const WORK_FILTERS = [
  { id: "all", label: "ALL" },
  { id: "ai-films", label: "AI FILMS" },
  { id: "web-app", label: "WEB & APP" },
  { id: "startup", label: "STARTUP" },
] as const;

export const PROJECTS: Project[] = [
  {
    id: "hu",
    title: "HU — Brand Identity Film",
    category: "ai-films",
    categoryLabel: "AI BRAND FILM · UAE",
    description:
      "Full brand identity and product commercial for Happy User, a UAE lifestyle electronics brand. Lime green × forest dark green × cinematic black.",
    status: "DELIVERED",
    link: "https://myhustore.com",
    featured: true,
    image: "/uploads/films/hu.jpg",
    imageAlt: "Frame from the HU brand identity film for Happy User, UAE",
    video: "/uploads/films/hu.mp4",
  },
  {
    id: "topad",
    title: "TopAd — Exhibition Commercial",
    category: "ai-films",
    categoryLabel: "AI BRAND FILM · OMAN",
    description:
      "AI-generated brand film for Oman's leading exhibition company. Showcasing scale, prestige, and event excellence.",
    status: "DELIVERED",
    image: "/uploads/films/topad.jpg",
    imageAlt: "Frame from the TopAd exhibition commercial, Oman",
    video: "/uploads/films/topad.mp4",
  },
  {
    id: "coreve",
    title: "Coreve — Sneaker Brand Launch",
    category: "ai-films",
    categoryLabel: "AI BRAND FILM · D2C",
    description:
      "Product launch film for a D2C sneaker brand for abaya-wearing women. Cultural precision meets modern aesthetics.",
    status: "DELIVERED",
    image: "/uploads/films/coreve.jpg",
    imageAlt: "Frame from the Coreve sneaker launch film",
    video: "/uploads/films/coreve.mp4",
  },
  {
    id: "nurena",
    title: "Nurena — Wellness Film",
    category: "ai-films",
    categoryLabel: "AI BRAND FILM · WELLNESS",
    description:
      "Brand film for Nurena Mobile Wellness. Calm, clinical confidence rendered with generative AI.",
    status: "DELIVERED",
    image: "/uploads/films/nurena.jpg",
    imageAlt: "Frame from the Nurena Mobile Wellness brand film",
    video: "/uploads/films/nurena.mp4",
  },
  {
    id: "ict",
    title: "ICT School — Campaign Film",
    category: "ai-films",
    categoryLabel: "AI BRAND FILM · EDUCATION",
    description:
      "Campaign film for ICT Senior Secondary School. Institutional storytelling with cinematic AI production.",
    status: "DELIVERED",
    image: "/uploads/films/ict.jpg",
    imageAlt: "Frame from the ICT Senior Secondary School campaign film",
    video: "/uploads/films/ict.mp4",
  },
  {
    id: "ampaware",
    title: "AmpAware",
    category: "startup",
    categoryLabel: "STARTUP · IOT × AI",
    description:
      "Smart electricity monitoring system for Kerala households. Real-time energy intelligence for everyday homes.",
    status: "IN DEVELOPMENT",
    award: "2nd Prize — Sahakiran Energy Ideathon",
    poster: {
      title: "AMPAWARE",
      sub: "KNOW YOUR CURRENT",
      gradient: "linear-gradient(120deg, #191905 0%, #0e0e04 55%, #060606 100%)",
      accent: "#e6d27a",
    },
  },
  {
    id: "tripsplit",
    title: "TripSplit",
    category: "web-app",
    categoryLabel: "MOBILE APP · NEXT.JS 15 + SUPABASE",
    description:
      "Trip expense splitting app. Next.js 15 + Supabase. Complete UI designed with warm dark luxury glassmorphism.",
    status: "IN DEVELOPMENT",
    poster: {
      title: "TRIPSPLIT",
      sub: "SPLIT FAIR. TRAVEL FAR.",
      gradient: "linear-gradient(120deg, #16100a 0%, #0d0a06 55%, #060606 100%)",
      accent: "#d9b98a",
    },
  },
  {
    id: "calivista",
    title: "Calivista",
    category: "web-app",
    categoryLabel: "WEB APP · CITY GUIDE",
    description:
      "All-in-one Kozhikode city guide. National hackathon winner.",
    status: "LIVE",
    award: "2nd Prize — Build for Kozhikode",
    link: "https://cali-vista.vercel.app/",
    image: "/uploads/calivista-screenshot.jpg",
    imageAlt:
      "Calivista city guide homepage over an aerial view of Kozhikode beach",
  },
  {
    id: "art-of-teaching",
    title: "Art of Teaching",
    category: "ai-films",
    categoryLabel: "VIDEO PRODUCTION · MULEARN",
    description: "Early video production work — MuLearn Foundation.",
    status: "ARCHIVE",
    image: "/uploads/aot.jpg",
    imageAlt: "Speaker on stage mid-gesture at a MuLearn Foundation event",
    video: "/uploads/aot.mp4",
  },
];

/* ------------------------------------------------------------------ */
/*  Concept Lab                                                        */
/* ------------------------------------------------------------------ */

export const CONCEPT_LAB = {
  eyebrow: "The Lab",
  heading: "CONCEPT LAB",
  sub: "Spec ads and pipeline experiments. No brief, no client — just seeing how far generative AI can be pushed.",
} as const;

export const CONCEPTS: Concept[] = [
  {
    id: "lenskart",
    title: "Lenskart — Spoof Ad",
    tag: "SPEC AD",
    video: "/uploads/films/lenskart.mp4",
    image: "/uploads/films/lenskart.jpg",
    alt: "Frame from a spec spoof ad for Lenskart",
  },
  {
    id: "rayban",
    title: "Meta Ray-Ban — Concept",
    tag: "CONCEPT",
    video: "/uploads/films/rayban.mp4",
    image: "/uploads/films/rayban.jpg",
    alt: "Frame from a concept film for Meta Ray-Ban smart glasses",
  },
  {
    id: "bluestone",
    title: "Bluestone — Jewelry Spot",
    tag: "SPEC AD",
    video: "/uploads/films/bluestone.mp4",
    image: "/uploads/films/bluestone.jpg",
    alt: "Frame from a spec jewelry spot for Bluestone",
  },
  {
    id: "seen",
    title: "Seen Eyewear — Product Film",
    tag: "SPEC AD",
    video: "/uploads/films/seen.mp4",
    image: "/uploads/films/seen.jpg",
    alt: "Frame from a product film for Seen Eyewear",
  },
];

/* ------------------------------------------------------------------ */
/*  Achievements                                                       */
/* ------------------------------------------------------------------ */

export const ACHIEVEMENTS: Achievement[] = [
  {
    year: "2026",
    title: "Google for AI Startups",
    context: "Invite-only program, Kerala Startup Mission, Kochi",
  },
  {
    year: "2026",
    title: "Google Gemini Student Ambassador",
    context: "Shortlisted out of national applicants",
  },
  {
    year: "2026",
    title: "Google Certified AI Educator",
    context: "Certified by Google",
  },
  {
    year: "2025",
    title: "Synaptics Expert Session",
    context:
      "Prompt engineering workshop, 50+ students, IEEE SB COET. Team went on to win the next hackathon.",
  },
  {
    year: "2023–26",
    title: "5x Hackathon Winner",
    context:
      "Including NASA Space Apps recognition, Build for Kozhikode, and Sahakiran Energy Ideathon",
  },
  {
    year: "2023",
    title: "MuLearn Foundation Intern",
    context: "Video editing intern, collaborative production team",
  },
];

/* ------------------------------------------------------------------ */
/*  Teaching                                                           */
/* ------------------------------------------------------------------ */

export const TEACHING = {
  eyebrow: "Education",
  heading: "TEACHING THE AI GENERATION",
  paragraph:
    "At Demand School, I run AI Contentology — the only course where students graduate having produced real, commercialized AI ads. Not simulated projects. Actual client-grade brand films.",
  highlights: [
    "Real client briefs, not classroom exercises",
    "Output: commercially-viable AI ad films",
    "Platform: Demand School",
    "Also: expert session at Synaptics, IEEE SB COET",
  ],
  courseTitle: "AI CONTENTOLOGY",
  courseBy: "By Mazin KP",
  coursePlatform: "Demand School",
} as const;

/* ------------------------------------------------------------------ */
/*  Travel                                                             */
/* ------------------------------------------------------------------ */

export const TRAVEL = {
  heading: "6 COUNTRIES EXPLORED",
  sub: "Thailand · Malaysia · and counting...",
  line: "Working toward documenting the world, one city at a time.",
  note: "Long-term: travel content creator",
} as const;

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  eyebrow: "Let's Talk",
  heading: "READY WHEN YOU ARE.",
  statement:
    "Whether you need a brand film, a creative collaborator, or someone who can make your product look like it belongs in a commercial — let's make it happen.",
  availableFor:
    "AI Brand Films · Course Collaborations · Startup Consulting · Speaking",
} as const;
