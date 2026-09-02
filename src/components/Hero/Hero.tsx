"use client";

import React from "react";
import { LiquidPortrait } from "./LiquidPortrait";
import { portfolioData } from "@/data/portfolio";
import { useCursor } from "@/components/Cursor/CustomCursor";
import { MagneticElement } from "@/components/Interaction/MagneticElement";
import { ArrowDown, ArrowRight, Sparkles, Terminal, Activity } from "lucide-react";

export function Hero() {
  const { setCursorState } = useCursor();

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pt-28 pb-12 md:px-12 lg:pt-32">
      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-950/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-2/3 right-10 -z-10 h-[350px] w-[350px] rounded-full bg-amber-950/15 blur-[120px]" />

      {/* Main Hero Content Grid */}
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16 my-auto">
        {/* Left Column: Editorial Typography & Intro */}
        <div className="flex flex-col justify-center lg:col-span-7">
          {/* Subtitle / Role Badge */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs tracking-editorial text-zinc-300 backdrop-blur-md">
              <Terminal className="h-3 w-3 text-sky-400" />
              <span>{portfolioData.personal.role.toUpperCase()}</span>
            </span>

            {/* "Now" Status Line (§49) */}
            <div className="flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-3 py-1 font-mono text-xs text-sky-300">
              <Activity className="h-3 w-3 animate-pulse text-sky-400" />
              <span>NOW: WebGL Fluid Shaders & AI Systems</span>
            </div>
          </div>

          {/* Dominant Editorial Name */}
          <h1 className="flex flex-col text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
            <span className="text-zinc-400 font-light">M. SAKIB</span>
            <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              SADMAN ARIAN
            </span>
          </h1>

          {/* Supporting Statement */}
          <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-zinc-300 sm:text-xl">
            {portfolioData.personal.headline}
          </p>
          <p className="mt-2 max-w-lg text-sm text-zinc-500">
            {portfolioData.personal.subheadline}
          </p>

          {/* Hero Action CTA Buttons with Magnetic Pull */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticElement strength={0.3} radius={80}>
              <a
                href="#projects"
                onMouseEnter={() => setCursorState("OPEN")}
                onMouseLeave={() => setCursorState("DEFAULT")}
                className="group flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-mono text-xs font-bold tracking-widest text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </MagneticElement>

            <MagneticElement strength={0.25} radius={70}>
              <a
                href="#about"
                onMouseEnter={() => setCursorState("OPEN")}
                onMouseLeave={() => setCursorState("DEFAULT")}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-mono text-xs tracking-widest text-zinc-300 backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:text-white"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>ABOUT ME</span>
              </a>
            </MagneticElement>
          </div>

          {/* Quick Metrics */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-6">
            {portfolioData.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-mono text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Signature Interactive Liquid Portrait (Untouched, primary focal point) */}
        <div className="flex items-center justify-center lg:col-span-5">
          <div className="w-full max-w-[440px] aspect-[4/5] sm:aspect-[3/4]">
            <LiquidPortrait
              imageSrc={portfolioData.personal.portrait}
              alt={portfolioData.personal.name}
              className="h-full w-full"
            />
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar & Scroll Indicator */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-white/5 pt-6 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span>PORTFOLIO // 2026 EDITION</span>
        </div>

        <MagneticElement strength={0.2} radius={50}>
          <a
            href="#projects"
            onMouseEnter={() => setCursorState("OPEN")}
            onMouseLeave={() => setCursorState("DEFAULT")}
            className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
          >
            <span className="tracking-widest">SCROLL</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce-slow" />
          </a>
        </MagneticElement>
      </div>
    </section>
  );
}
