"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { useCursor } from "@/components/Cursor/CustomCursor";
import { SectionBackdrop } from "@/components/Backdrop/SectionBackdrop";
import { MagneticElement } from "@/components/Interaction/MagneticElement";
import { Cpu, Eye, Layers, Sparkles } from "lucide-react";

export function About() {
  const { setCursorState } = useCursor();

  const pillars = [
    {
      icon: Eye,
      title: "Interactive WebGL Graphics",
      description:
        "Building custom GLSL shaders, 60fps GPU rendering pipelines, and tactile organic physics that react naturally to human gesture.",
    },
    {
      icon: Cpu,
      title: "Machine Learning & AI",
      description:
        "Developing explainable predictive models, neural architectures, and intelligent data systems that solve complex real-world forecasting tasks.",
    },
    {
      icon: Layers,
      title: "Distributed Web Architecture",
      description:
        "Engineering modular full-stack TypeScript backends and microservices built for resilient throughput and sub-millisecond response times.",
    },
  ];

  return (
    <SectionBackdrop
      image="/images/backdrops/about-backdrop.svg"
      tone="duotone"
      parallax
      className="border-t border-white/5 bg-zinc-950/30"
    >
      <section id="about" className="relative py-28 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-12 items-start">
            {/* Left Column: Heading & Philosophy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs tracking-editorial text-sky-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>ABOUT & PHILOSOPHY</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Engineering interfaces that feel alive and intentional.
              </h2>

              <div className="space-y-4 text-zinc-400 text-base leading-relaxed">
                {portfolioData.personal.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-6">
                <MagneticElement strength={0.25} radius={60}>
                  <a
                    href="#contact"
                    onMouseEnter={() => setCursorState("OPEN")}
                    onMouseLeave={() => setCursorState("DEFAULT")}
                    className="font-mono text-xs tracking-widest text-white underline underline-offset-8 hover:text-sky-400 transition-colors inline-block"
                  >
                    LET&apos;S COLLABORATE →
                  </a>
                </MagneticElement>
              </div>
            </div>

            {/* Right Column: Engineering Pillars */}
            <div className="lg:col-span-7 space-y-6">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-zinc-900/40"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white">
                        <Icon className="h-6 w-6 text-sky-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
