"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { useCursor } from "@/components/Cursor/CustomCursor";
import { SectionBackdrop } from "@/components/Backdrop/SectionBackdrop";
import { MagneticElement } from "@/components/Interaction/MagneticElement";
import { Wrench } from "lucide-react";

export function Skills() {
  const { setCursorState } = useCursor();

  return (
    <SectionBackdrop
      image="/images/backdrops/skills-backdrop.svg"
      tone="duotone"
      parallax
      className="border-t border-white/5"
    >
      <section id="skills" className="relative py-28 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Section Title */}
          <div className="mb-16 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs tracking-editorial text-sky-400">
              <Wrench className="h-3.5 w-3.5" />
              <span>TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Skills & Technologies
            </h2>
            <p className="max-w-xl text-sm text-zinc-400">
              A comprehensive overview of programming languages, graphical frameworks, AI tooling, and systems architecture.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioData.skillCategories.map((category) => (
              <div
                key={category.category}
                className="rounded-2xl border border-white/10 bg-zinc-950/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20"
              >
                <h3 className="border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-widest text-zinc-300">
                  {category.category}
                </h3>

                <div className="mt-6 flex flex-col gap-3">
                  {category.skills.map((skill) => (
                    <MagneticElement
                      key={skill.name}
                      strength={0.15}
                      radius={40}
                      cursorState="VIEW"
                    >
                      <div
                        onMouseEnter={() => setCursorState("VIEW")}
                        onMouseLeave={() => setCursorState("DEFAULT")}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 transition-colors hover:border-white/20 hover:bg-white/5"
                      >
                        <span className="text-sm font-medium text-zinc-200">{skill.name}</span>
                        {skill.level && (
                          <span className="font-mono text-[10px] uppercase tracking-wider text-sky-400">
                            {skill.level}
                          </span>
                        )}
                      </div>
                    </MagneticElement>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
