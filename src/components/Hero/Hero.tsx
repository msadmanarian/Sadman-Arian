"use client";

import React from "react";
import { LiquidPortrait } from "./LiquidPortrait";
import { McLarenWindTunnel } from "./McLarenWindTunnel";
import { portfolioData } from "@/data/portfolio";
import { useCursor } from "@/components/Cursor/CustomCursor";
import { MagneticElement } from "@/components/Interaction/MagneticElement";
import { RollingText } from "@/components/Typography/RollingText";
import { ArrowDown, ArrowRight, Sparkles, Terminal, Activity } from "lucide-react";

export function Hero() {
  const { setCursorState } = useCursor();

  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pt-20 pb-8 md:px-12">
      {/* Ambient Atmospheric Glows */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-950/20 blur-[200px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-950/15 blur-[160px]" />

      {/* Top Floating Telemetry Badges */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 pt-2 z-40">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-xs tracking-editorial text-zinc-300 backdrop-blur-md">
            <Terminal className="h-3.5 w-3.5 text-sky-400" />
            <span>{portfolioData.personal.role.toUpperCase()}</span>
          </span>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-3.5 py-1 font-mono text-xs text-sky-300 backdrop-blur-md">
            <Activity className="h-3 w-3 animate-pulse text-sky-400" />
            <span>NOW: Minecraft Voxel Shaders & Full-Screen Aerodynamics</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>AVAILABLE FOR SELECTIVE ROLES</span>
        </div>
      </div>

      {/* Main Full-Window Hero Stage: 3 Layer Composition */}
      <div className="relative mx-auto my-auto flex w-full max-w-7xl min-h-[75vh] flex-col items-center justify-center">
        
        {/* ========================================================================= */}
        {/* LAYER 1 (BEHIND EVERYTHING): Massive Full-Window McLaren P1 Wind Tunnel */}
        {/* ========================================================================= */}
        <div className="pointer-events-none absolute inset-0 -inset-x-12 sm:-inset-x-24 -top-8 -bottom-8 z-10 flex items-center justify-center overflow-hidden">
          <McLarenWindTunnel />
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2 (BEHIND THE WRITING): Person Portrait with Minecraft Voxel Shader */}
        {/* ========================================================================= */}
        <div className="absolute inset-x-0 bottom-0 top-6 z-20 mx-auto flex items-end justify-center w-full max-w-xl md:max-w-2xl lg:max-w-3xl pointer-events-auto">
          <LiquidPortrait
            imageSrc={portfolioData.personal.portrait}
            alt={portfolioData.personal.name}
            className="h-full w-full max-h-[75vh] opacity-65 md:opacity-70 hover:opacity-85 transition-opacity duration-700 select-none"
          />
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3 (IN FRONT OF PERSON): Centered High-Fashion Editorial Typography */}
        {/* ========================================================================= */}
        <div className="pointer-events-none z-30 text-center w-full select-none flex flex-col items-center justify-center my-auto">
          <div className="flex items-center justify-center gap-3 mb-2 font-mono text-[11px] uppercase tracking-editorial text-sky-400 bg-black/40 px-4 py-1 rounded-full backdrop-blur-md border border-white/5 drop-shadow-md">
            <span className="h-[1px] w-6 bg-sky-400/60" />
            <span>CREATIVE DEVELOPER & SOFTWARE ENGINEER</span>
            <span className="h-[1px] w-6 bg-sky-400/60" />
          </div>

          <h1 className="flex flex-col items-center font-black tracking-tight leading-[0.88] text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
            <span className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-zinc-200/95 font-extralight tracking-tight italic drop-shadow-2xl">
              M. SAKIB
            </span>
            <span className="text-5xl sm:text-7xl md:text-9xl lg:text-[11.2rem] bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent font-black tracking-tighter drop-shadow-[0_25px_60px_rgba(0,0,0,1)]">
              SADMAN ARIAN
            </span>
          </h1>
        </div>

        {/* Floating Left & Right Supporting Widgets */}
        <div className="hidden lg:flex pointer-events-none absolute left-0 bottom-4 z-40 flex-col gap-3 max-w-xs text-left">
          <p className="pointer-events-auto text-sm font-light leading-relaxed text-zinc-200 bg-black/60 p-3.5 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
            {portfolioData.personal.headline}
          </p>
          <div className="pointer-events-auto flex items-center gap-3 pt-1">
            <MagneticElement strength={0.3} radius={70}>
              <a
                href="#projects"
                onMouseEnter={() => setCursorState("OPEN")}
                onMouseLeave={() => setCursorState("DEFAULT")}
                className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold tracking-wider text-black transition-all hover:bg-zinc-200 shadow-2xl"
              >
                <RollingText text="EXPLORE WORK" />
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </MagneticElement>
          </div>
        </div>

        <div className="hidden lg:flex pointer-events-none absolute right-0 bottom-4 z-40 flex-col gap-3 text-right">
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/80 p-3.5 backdrop-blur-xl shadow-2xl">
            <span className="font-mono text-xl font-bold text-white tracking-tight">
              VOXEL 3D
            </span>
            <p className="font-mono text-[10px] uppercase tracking-wider text-sky-400">
              Minecraft Shader Matrix
            </p>
          </div>
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/80 p-3.5 backdrop-blur-xl shadow-2xl">
            <span className="font-mono text-xl font-bold text-white tracking-tight">
              60 FPS
            </span>
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              GPU Accelerated
            </p>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet CTA and Description */}
      <div className="lg:hidden mx-auto flex w-full max-w-lg flex-col items-center text-center gap-3 my-3 z-40">
        <p className="text-xs font-light text-zinc-300 bg-black/60 p-2.5 rounded-xl backdrop-blur-md border border-white/10">
          {portfolioData.personal.headline}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <MagneticElement strength={0.25} radius={60}>
            <a
              href="#projects"
              onMouseEnter={() => setCursorState("OPEN")}
              onMouseLeave={() => setCursorState("DEFAULT")}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold text-black shadow-xl"
            >
              <span>EXPLORE WORK</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </MagneticElement>

          <MagneticElement strength={0.25} radius={60}>
            <a
              href="#about"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 font-mono text-xs text-zinc-300"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>ABOUT ME</span>
            </a>
          </MagneticElement>
        </div>
      </div>

      {/* Hero Bottom Bar & Scroll Indicator */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-white/5 pt-3 text-xs font-mono text-zinc-500 z-40">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
          <span>PORTFOLIO // FULL-WINDOW EDITION</span>
        </div>

        <MagneticElement strength={0.2} radius={50}>
          <a
            href="#projects"
            onMouseEnter={() => setCursorState("OPEN")}
            onMouseLeave={() => setCursorState("DEFAULT")}
            className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
          >
            <span className="tracking-widest">SCROLL TO DISSOLVE</span>
            <ArrowDown className="h-3.5 w-3.5 animate-bounce-slow" />
          </a>
        </MagneticElement>
      </div>
    </section>
  );
}
