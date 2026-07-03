import NavBar from "@/components/ui/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import WhatIDoSection from "@/components/sections/WhatIDoSection";
import WorkSection from "@/components/sections/WorkSection";
import StartupSection from "@/components/sections/StartupSection";
import ConceptLabSection from "@/components/sections/ConceptLabSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import TeachingSection from "@/components/sections/TeachingSection";
import TravelSection from "@/components/sections/TravelSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <main id="top">
        <HeroSection />
        <ManifestoSection />
        <WhatIDoSection />
        <WorkSection />
        <StartupSection />
        <ConceptLabSection />
        <AchievementsSection />
        <TeachingSection />
        <TravelSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
