"use client";

import React, { useState } from "react";
import { portfolioData, Project } from "@/data/portfolio";
import { useCursor } from "@/components/Cursor/CustomCursor";
import { SectionBackdrop } from "@/components/Backdrop/SectionBackdrop";
import { MagneticElement } from "@/components/Interaction/MagneticElement";
import { ArrowUpRight, Github, Code2, X, CheckCircle2, Layers, Cpu, TrendingUp } from "lucide-react";

export function Projects() {
  const { setCursorState } = useCursor();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <SectionBackdrop
      image="/images/backdrops/projects-backdrop.svg"
      tone="duotone"
      parallax
      className="border-t border-white/5"
    >
      <section id="projects" className="relative py-28 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs tracking-editorial text-sky-400 mb-3">
                <Code2 className="h-3.5 w-3.5" />
                <span>SELECTED WORKS</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Featured Systems & Experiences
              </h2>
            </div>
            <p className="max-w-md text-sm text-zinc-400">
              A curated selection of machine learning architectures, real-time graphics engines, and distributed web platforms.
            </p>
          </div>

          {/* Editorial Projects List */}
          <div className="space-y-8">
            {portfolioData.projects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => setCursorState("VIEW")}
                onMouseLeave={() => setCursorState("DEFAULT")}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 p-8 sm:p-10 backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:bg-zinc-900/60"
              >
                {/* Subtle hover gradient */}
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-sky-500/10 via-transparent to-amber-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                  {/* Left: Number & Category */}
                  <div className="flex items-center justify-between lg:col-span-3 lg:flex-col lg:items-start lg:gap-4">
                    <span className="font-mono text-4xl sm:text-5xl font-black tracking-tighter text-zinc-600 group-hover:text-white transition-colors duration-300">
                      {project.number}
                    </span>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs uppercase tracking-widest text-sky-400">
                        {project.category}
                      </span>
                      <span className="font-mono text-xs text-zinc-500">{project.year}</span>
                    </div>
                  </div>

                  {/* Middle: Title & Description */}
                  <div className="lg:col-span-6 space-y-4">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills with subtle magnetic pull */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech) => (
                        <MagneticElement key={tech} strength={0.15} radius={35}>
                          <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300 transition-colors group-hover:border-white/20 block">
                            {tech}
                          </span>
                        </MagneticElement>
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions / Links with Magnetic Elements */}
                  <div className="flex items-center gap-3 lg:col-span-3 lg:justify-end">
                    {project.githubUrl && (
                      <MagneticElement strength={0.25} radius={45}>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() => setCursorState("VISIT")}
                          onMouseLeave={() => setCursorState("VIEW")}
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition-all hover:border-white/40 hover:bg-white/10 hover:text-white"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </MagneticElement>
                    )}

                    <MagneticElement strength={0.3} radius={60}>
                      <button
                        onClick={() => setSelectedProject(project)}
                        onMouseEnter={() => setCursorState("OPEN")}
                        onMouseLeave={() => setCursorState("VIEW")}
                        className="flex items-center gap-2 rounded-full border border-white/20 bg-white px-5 py-2.5 font-mono text-xs font-bold text-black transition-all hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      >
                        <span>CASE STUDY</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </MagneticElement>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep-Dive Case Study Modal (§49) */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />

            <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/20 bg-zinc-950 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-6 top-6 rounded-full border border-white/10 p-2 text-zinc-400 hover:border-white/30 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-sky-400">
                    {selectedProject.category}
                  </span>
                  <span className="text-zinc-600">//</span>
                  <span className="font-mono text-xs text-zinc-400">{selectedProject.year}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedProject.title}
                </h3>

                <p className="text-sm leading-relaxed text-zinc-300">
                  {selectedProject.description}
                </p>

                {/* Structured Breakdown Pillars */}
                <div className="grid gap-4 sm:grid-cols-2 pt-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-semibold">
                      <Cpu className="h-4 w-4" />
                      <span>ARCHITECTURE</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Modular design utilizing high-performance pipelines and clean interface boundaries.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                      <TrendingUp className="h-4 w-4" />
                      <span>PERFORMANCE & IMPACT</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Engineered for zero-latency execution, verified via end-to-end benchmarking.
                    </p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                    Technologies Deployed
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-mono text-xs text-white hover:bg-white/10"
                    >
                      <Github className="h-4 w-4" />
                      <span>SOURCE CODE</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full bg-white px-6 py-2.5 font-mono text-xs font-bold text-black hover:bg-zinc-200"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </SectionBackdrop>
  );
}
