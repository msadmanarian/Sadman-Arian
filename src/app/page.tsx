"use client";

import React, { useState } from "react";
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
import { Preloader } from "@/components/Preloader/Preloader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Cinematic Telemetry Preloader for Slow Connections */}
      <Preloader onLoaded={() => setIsLoaded(true)} />

      <GlobalHoverProvider>
        <main className={`relative min-h-screen bg-background text-foreground overflow-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}>
          {/* Scroll Flow Spine & Wind Flow System */}
          <FlowSpine />

          {/* Keyboard Command Palette */}
          <CommandPalette />

          {/* Fixed Navigation Bar with Magnetic Items */}
          <Navigation />

          {/* Hero Section with Signature Full-Bleed WebGL Liquid Portrait */}
          <Hero />

          {/* Selected Works Showcase */}
          <Projects />

          {/* About & Engineering Philosophy */}
          <About />

          {/* Skills Matrix */}
          <Skills />

          {/* Experience & Chronology */}
          <Experience />

          {/* Interactive Contact & Direct Transmit */}
          <Contact />

          {/* Editorial Footer */}
          <Footer />
        </main>
      </GlobalHoverProvider>
    </>
  );
}
