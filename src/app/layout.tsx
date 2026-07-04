import type { Metadata, Viewport } from "next";
import {
  Archivo,
  Bricolage_Grotesque,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Aurora from "@/components/motion/Aurora";
import Preloader from "@/components/motion/Preloader";
import ScrollTimecode from "@/components/ui/ScrollTimecode";
import { SITE } from "@/lib/constants";

// Variable font (wght + wdth) — the display voice is condensed black,
// and the axes stay animatable for kinetic type.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
  preload: true,
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  preload: true,
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: {
    canonical: SITE.url,
  },
  keywords: [
    "AI Content Architect",
    "AI brand films",
    "generative AI video",
    "AI educator",
    "prompt engineering",
    "AmpAware",
    "Demand School",
    "Kerala",
    "Mazin KP",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    siteName: SITE.shortName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  alternateName: ["Mazin KP", "Mazi"],
  url: SITE.url,
  image: `${SITE.url}/uploads/profile.jpeg`,
  email: `mailto:${SITE.email}`,
  telephone: SITE.phone,
  jobTitle: "AI Content Architect",
  description: SITE.description,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "College of Engineering Thalassery",
  },
  worksFor: [
    { "@type": "Organization", name: "AmpAware" },
    { "@type": "Organization", name: "Demand School" },
  ],
  sameAs: [SITE.linkedin],
  knowsAbout: [
    "AI Video Production",
    "Generative AI",
    "Prompt Engineering",
    "Brand Films",
    "AI Education",
    "Startup Building",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${bricolage.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* set theme + preloader classes before paint to avoid flashes */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.theme==='light')document.documentElement.classList.add('light')}catch(e){};try{if(sessionStorage.getItem('mz-preloaded'))document.documentElement.classList.add('preloader-done')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Providers>
          <Aurora />
          <Preloader />
          <ScrollTimecode />
          {children}
        </Providers>
      </body>
    </html>
  );
}
