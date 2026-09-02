import { Navigation } from "@/components/Navigation/Navigation";
import { Hero } from "@/components/Hero/Hero";
import { Projects } from "@/components/Projects/Projects";
import { About } from "@/components/About/About";
import { Skills } from "@/components/Skills/Skills";
import { Experience } from "@/components/Experience/Experience";
import { Contact } from "@/components/Contact/Contact";
import { Footer } from "@/components/Footer/Footer";
import { FlowSpine } from "@/components/FlowSpine/FlowSpine";
import { CommandPalette } from "@/components/CommandPalette/CommandPalette";
import { GlobalHoverProvider } from "@/components/Interaction/GlobalHoverProvider";

export default function Home() {
  return (
    <GlobalHoverProvider>
      <main className="relative min-h-screen bg-background text-foreground overflow-hidden">
        {/* Scroll Flow Spine & Wind Flow System (§48) */}
        <FlowSpine />

        {/* Keyboard Command Palette (§49) */}
        <CommandPalette />

        {/* Fixed Navigation Bar with Magnetic Items (§47) */}
        <Navigation />

        {/* Hero Section with Signature WebGL Liquid Portrait (§4) */}
        <Hero />

        {/* Selected Works Showcase with SectionBackdrop & Case Study (§46, §49) */}
        <Projects />

        {/* About & Engineering Philosophy with SectionBackdrop (§46) */}
        <About />

        {/* Skills Matrix with Magnetic Chips & SectionBackdrop (§46, §47) */}
        <Skills />

        {/* Experience & Chronology with SectionBackdrop (§46) */}
        <Experience />

        {/* Interactive Contact & Direct Transmit with SectionBackdrop (§46) */}
        <Contact />

        {/* Editorial Footer (§23) */}
        <Footer />
      </main>
    </GlobalHoverProvider>
  );
}
