"use client";

import React from "react";
import { LiquidPortrait } from "./LiquidPortrait";
import { McLarenWindTunnel } from "./McLarenWindTunnel";
import { portfolioData } from "@/data/portfolio";
import { useCursor } from "@/components/Cursor/CustomCursor";
import { MagneticElement } from "@/components/Interaction/MagneticElement";
import { ArrowDown, ArrowRight, Sparkles, Terminal, Activity } from "lucide-react";

export function Hero() {
  const { setCursorState } = useCursor();

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pt-24 pb-8 md:px-12">
      {/* Background Subtle Ambient Glows */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-950/20 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-950/15 blur-[140px]" />

      {/* Top Editorial Floating Badges */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 pt-4 z-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs tracking-editorial text-zinc-300 backdrop-blur-md">
            <Terminal className="h-3 w-3 text-sky-400" />
            <span>{portfolioData.personal.role.toUpperCase()}</span>
          </span>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-3 py-1 font-mono text-xs text-sky-300 backdrop-blur-md">
            <Activity className="h-3 w-3 animate-pulse text-sky-400" />
            <span>NOW: WebGL Fluid Shaders & Aerodynamics</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>GLOBAL // REMOTE</span>
        </div>
      </div>

      {/* McLaren P1 Aerodynamic Wind Tunnel Component at the Top */}
      <div className="w-full z-20 my-4">
        <McLarenWindTunnel />
      </div>

      {/* Main Center Stage: Lando Norris Inspired Hero Layout */}
      <div className="relative mx-auto my-auto flex w-full max-w-7xl flex-col items-center justify-center">
        {/* Massive Editorial Name Typography Floating Over Hero */}
        <div className="pointer-events-none z-10 text-center w-full select-none mb-[-2rem] sm:mb-[-3.5rem] md:mb-[-4.5rem]">
          <h1 className="flex flex-col items-center font-black tracking-tighter leading-[0.88] text-white">
            <span className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-zinc-500/80 font-light tracking-tight">
              M. SAKIB
            </span>
            <span className="text-5xl sm:text-7xl md:text-9xl lg:text-[10.5rem] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-2xl">
              SADMAN ARIAN
            </span>
          </h1>
        </div>

        {/* The Dominant Full-Bleed Filled Interactive Portrait Canvas */}
        <div className="relative z-20 w-full max-w-xl md:max-w-2xl lg:max-w-3xl h-[48vh] sm:h-[58vh] md:h-[64vh] lg:h-[68vh] flex items-end justify-center">
          <LiquidPortrait
            imageSrc={portfolioData.personal.portrait}
            alt={portfolioData.personal.name}
            className="h-full w-full max-h-full"
            seamless={true}
          />
        </div>

        {/* Floating Left & Right Supporting Widgets (Lando Norris Style) */}
        <div className="hidden lg:flex pointer-events-none absolute left-0 bottom-12 z-30 flex-col gap-3 max-w-xs text-left">
          <p className="pointer-events-auto text-sm font-light leading-relaxed text-zinc-300">
            {portfolioData.personal.headline}
          </p>
          <div className="pointer-events-auto flex items-center gap-3 pt-2">
            <MagneticElement strength={0.3} radius={70}>
              <a
                href="#projects"
                onMouseEnter={() => setCursorState("OPEN")}
                onMouseLeave={() => setCursorState("DEFAULT")}
                className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold tracking-wider text-black transition-all hover:bg-zinc-200"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </MagneticElement>
          </div>
        </div>

        <div className="hidden lg:flex pointer-events-none absolute right-0 bottom-12 z-30 flex-col gap-4 text-right">
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md">
            <span className="font-mono text-2xl font-bold text-white tracking-tight">
              60 FPS
            </span>
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              GPU WebGL Architecture
            </p>
          </div>
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md">
            <span className="font-mono text-2xl font-bold text-white tracking-tight">
              99%
            </span>
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              Lighthouse Performance
            </p>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet CTA and Description */}
      <div className="lg:hidden mx-auto flex w-full max-w-lg flex-col items-center text-center gap-4 my-4 z-30">
        <p className="text-sm font-light text-zinc-300">
          {portfolioData.personal.headline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <MagneticElement strength={0.25} radius={60}>
            <a
              href="#projects"
              onMouseEnter={() => setCursorState("OPEN")}
              onMouseLeave={() => setCursorState("DEFAULT")}
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs font-bold text-black"
            >
              <span>EXPLORE WORK</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </MagneticElement>

          <MagneticElement strength={0.25} radius={60}>
            <a
              href="#about"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-mono text-xs text-zinc-300"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>ABOUT</span>
            </a>
          </MagneticElement>
        </div>
      </div>

      {/* Hero Bottom Bar & Scroll Indicator */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-white/5 pt-4 text-xs font-mono text-zinc-500 z-20">
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
