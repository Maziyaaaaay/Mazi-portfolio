import type {
  Achievement,
  FilmFrame,
  NavLink,
  PipelineStage,
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
    "AI Content Architect producing cinematic brand films for Gulf clients. Co-founder of AmpAware. AI Educator at Demand School. 5x Hackathon Winner from Kerala, India.",
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
    "AI Education",
    "Startup Founder",
    "Hackathon Winner",
  ],
  supporting:
    "Cinematic AI brand films for Gulf brands. Teaching the next generation of AI creators.",
  reelVideo: "/uploads/permute.mp4",
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
    alt: "Typographic frame for the HU brand film, lime green on forest dark",
    label: "HU · UAE",
    poster: {
      title: "HU",
      sub: "MADE FOR HAPPY USERS",
      gradient: "linear-gradient(135deg, #0d1f14 0%, #08110b 60%, #050505 100%)",
      accent: "#b8e986",
    },
  },
  {
    src: "/uploads/aot.jpg",
    alt: "Speaker on stage mid-gesture at a MuLearn event",
    label: "ART OF TEACHING",
  },
  {
    alt: "Typographic frame for the TopAd exhibition commercial, Oman",
    label: "TOPAD · OMAN",
    poster: {
      title: "TOPAD",
      sub: "EXHIBITIONS, ELEVATED",
      gradient: "linear-gradient(135deg, #1c1408 0%, #0f0b06 60%, #050505 100%)",
      accent: "#c8a96e",
    },
  },
  {
    src: "/uploads/calivista-screenshot.jpg",
    alt: "Calivista city guide website over an aerial shot of Kozhikode beach",
    label: "CALIVISTA · WEB",
  },
  {
    alt: "Typographic frame for the Coreve sneaker launch film",
    label: "COREVE · LAUNCH",
    poster: {
      title: "COREVE",
      sub: "STEP WITHOUT COMPROMISE",
      gradient: "linear-gradient(135deg, #17100e 0%, #0d0908 60%, #050505 100%)",
      accent: "#e8cfc0",
    },
  },
  {
    src: "/uploads/sibin.jpg",
    alt: "Vertical event reel frame from MuMeet 24",
    label: "MUMEET · REEL",
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
      text: " That's the standard. Gulf brands, student creators, startup decks — ",
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
    id: "ai-education",
    icon: "graduation-cap",
    title: "AI EDUCATION",
    description:
      "Teaching creators and students to produce commercialized AI content, not just play with tools.",
    tools: "Demand School · IEEE COET · 50+ Students Taught",
    clients: "AI Contentology Course · Synaptics Workshop",
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
/*  Pipeline                                                           */
/* ------------------------------------------------------------------ */

export const PIPELINE: PipelineStage[] = [
  {
    stage: "BRIEF",
    tool: "Client Brief",
    description: "Goals, audience, brand world — Desgro Media",
  },
  {
    stage: "CONCEPT",
    tool: "ChatGPT / Claude",
    description: "Script, storyboard, prompt architecture",
  },
  {
    stage: "IMAGE GEN",
    tool: "ChatGPT / Midjourney",
    description: "Photorealistic product frames, character concepts",
  },
  {
    stage: "VIDEO ANIMATION",
    tool: "Kling 3.0 · Veo 3.1 · Seedance 2.0",
    description: "Animate stills to cinematic clips",
  },
  {
    stage: "ASSEMBLY",
    tool: "CapCut",
    description: "Scene sequencing, timing, color grade",
  },
  {
    stage: "VOICEOVER",
    tool: "ElevenLabs",
    description: "Natural AI voiceover, brand-matched voice",
  },
  {
    stage: "DELIVERY",
    tool: "Client Review",
    description: "Review, revision, final export",
  },
];

export const PIPELINE_NOTE =
  "Each tool is chosen for the brief. Kling 3.0 for motion quality, Veo 3.1 for speed, Seedance 2.0 for style control. The pipeline adapts.";

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
    poster: {
      title: "HU",
      sub: "MADE FOR HAPPY USERS",
      gradient: "linear-gradient(120deg, #11271a 0%, #0a160e 55%, #060606 100%)",
      accent: "#b8e986",
    },
  },
  {
    id: "topad",
    title: "TopAd — Exhibition Commercial",
    category: "ai-films",
    categoryLabel: "AI BRAND FILM · OMAN",
    description:
      "AI-generated brand film for Oman's leading exhibition company. Showcasing scale, prestige, and event excellence.",
    status: "DELIVERED",
    poster: {
      title: "TOPAD",
      sub: "EXHIBITIONS, ELEVATED",
      gradient: "linear-gradient(120deg, #211808 0%, #120d05 55%, #060606 100%)",
      accent: "#c8a96e",
    },
  },
  {
    id: "coreve",
    title: "Coreve — Sneaker Brand Launch",
    category: "ai-films",
    categoryLabel: "AI BRAND FILM · D2C",
    description:
      "Product launch film for a D2C sneaker brand for abaya-wearing women. Cultural precision meets modern aesthetics.",
    status: "DELIVERED",
    poster: {
      title: "COREVE",
      sub: "STEP WITHOUT COMPROMISE",
      gradient: "linear-gradient(120deg, #1d1310 0%, #100b09 55%, #060606 100%)",
      accent: "#e8cfc0",
    },
  },
  {
    id: "ampaware",
    title: "AmpAware",
    category: "startup",
    categoryLabel: "STARTUP · IOT × AI",
    description:
      "Smart electricity monitoring system for Kerala households. 83 validated market survey responses. 88% purchase intent.",
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
    id: "pitchalia",
    title: "Pitchalia",
    category: "web-app",
    categoryLabel: "WEB APP · BUILT LIVE",
    description:
      "Built live at Google for AI Startups 2026. AI-powered pitch deck generator.",
    status: "PROTOTYPE",
    poster: {
      title: "PITCHALIA",
      sub: "GOOGLE FOR AI STARTUPS '26",
      gradient: "linear-gradient(120deg, #131318 0%, #0b0b0e 55%, #060606 100%)",
      accent: "#aab4d4",
    },
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
    year: "2024",
    title: "2nd Prize — Build for Kozhikode",
    context: "National level hackathon (Calivista)",
  },
  {
    year: "2024",
    title: "2nd Prize — Sahakiran Energy Ideathon",
    context: "Smart energy startup (AmpAware)",
  },
  {
    year: "2023–26",
    title: "5x Hackathon Winner",
    context: "Including NASA Space Apps Challenge recognition",
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
    "Pilot batch: 10 students, 3 months",
    "Output: commercially-viable AI ad films",
    "Platform: Demand School",
    "Also: expert session at Synaptics, IEEE SB COET",
  ],
  courseTitle: "AI CONTENTOLOGY",
  courseBy: "By Mazin KP",
  coursePlatform: "Demand School",
  courseCta: "LEARN MORE",
  courseLink: "https://demandschool.com",
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
