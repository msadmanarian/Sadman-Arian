"use client";

import React from "react";
import { portfolioData } from "@/data/portfolio";
import { useCursor } from "@/components/Cursor/CustomCursor";
import { SectionBackdrop } from "@/components/Backdrop/SectionBackdrop";
import { MagneticElement } from "@/components/Interaction/MagneticElement";
import { Briefcase, CheckCircle2 } from "lucide-react";

export function Experience() {
  const { setCursorState } = useCursor();

  return (
    <SectionBackdrop
      image="/images/backdrops/experience-backdrop.svg"
      tone="duotone"
      parallax
      className="border-t border-white/5 bg-zinc-950/20"
    >
      <section id="experience" className="relative py-28 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs tracking-editorial text-sky-400">
              <Briefcase className="h-3.5 w-3.5" />
              <span>CHRONOLOGY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Experience & Milestones
            </h2>
            <p className="max-w-xl text-sm text-zinc-400">
              A track record of engineering leadership, research contributions, and interactive software development.
            </p>
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 border-l border-white/10 pl-6 sm:pl-10">
            {portfolioData.experience.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setCursorState("VIEW")}
                onMouseLeave={() => setCursorState("DEFAULT")}
                className="group relative rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-zinc-900/40"
              >
                {/* Timeline Indicator Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-8 flex h-5 w-5 items-center justify-center rounded-full border border-white/30 bg-black">
                  <div className="h-2 w-2 rounded-full bg-sky-400 group-hover:scale-125 transition-transform" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                    <p className="font-mono text-xs text-sky-400 tracking-wider">
                      {item.organization} {item.location && `// ${item.location}`}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-zinc-400 sm:text-right">
                    {item.year}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                  {item.description}
                </p>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {item.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionBackdrop>
  );
}
