import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/Providers";
import { SITE } from "@/lib/constants";

const bebas = localFont({
  src: "../../public/Bebas_Neue/BebasNeue-Regular.ttf",
  variable: "--font-bebas",
  display: "swap",
  preload: true,
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
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
    "Kling 3.0",
    "Veo 3.1",
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
      className={`${bebas.variable} ${grotesk.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* set theme class before paint to avoid a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.theme==='light')document.documentElement.classList.add('light')}catch(e){}",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
