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
    <section id="hero" className="relative flex min-h-[100svh] flex-col justify-between px-4 sm:px-8 md:px-12 pt-20 pb-6 overflow-hidden">
      {/* Ambient Background Radial Glows */}
      <div className="pointer-events-none absolute top-1/3 left-1/3 -z-10 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-950/25 blur-[190px]" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-950/20 blur-[160px]" />

      {/* Top Header Floating Badges */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 pt-2 z-40">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-xs tracking-editorial text-zinc-300 backdrop-blur-md">
            <Terminal className="h-3.5 w-3.5 text-sky-400" />
            <span>{portfolioData.personal.role.toUpperCase()}</span>
          </span>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-3.5 py-1 font-mono text-xs text-sky-300 backdrop-blur-md">
            <Activity className="h-3 w-3 animate-pulse text-sky-400" />
            <span>NOW: Minecraft Voxel Shaders & Full Aerodynamics</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>AVAILABLE FOR WORK</span>
        </div>
      </div>

      {/* Main Unified Center Stage */}
      <div className="relative mx-auto my-auto flex w-full max-w-7xl h-[68vh] sm:h-[74vh] md:h-[80vh] items-center justify-center">
        
        {/* ========================================================================= */}
        {/* LAYER 1 (BEHIND): Full-Window McLaren P1 Wind Tunnel with 70% Blur */}
        {/* ========================================================================= */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center w-full h-full">
          <McLarenWindTunnel />
        </div>

        {/* ========================================================================= */}
        {/* LAYER 2 (BEHIND THE WRITING): Person Portrait with Zero Cropping */}
        {/* ========================================================================= */}
        <div className="pointer-events-auto absolute inset-0 z-20 flex items-end justify-center md:justify-end w-full h-full max-w-2xl md:max-w-3xl ml-auto pb-2">
          <LiquidPortrait
            imageSrc={portfolioData.personal.portrait}
            alt={portfolioData.personal.name}
            className="w-full h-full max-h-[92%] opacity-65 hover:opacity-85 transition-opacity duration-700 select-none"
          />
        </div>

        {/* ========================================================================= */}
        {/* LAYER 3 (IN FRONT - TOP LEFT): Stylish Name Typography Positioned at Left Top */}
        {/* ========================================================================= */}
        <div className="pointer-events-none absolute top-2 sm:top-6 left-0 z-30 select-none flex flex-col items-start justify-start text-left max-w-3xl">
          <div className="flex items-center gap-2.5 mb-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-editorial text-sky-400 bg-black/60 px-3.5 py-1 rounded-full backdrop-blur-md border border-white/10 drop-shadow-lg">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>CREATIVE DEVELOPER & SOFTWARE ENGINEER</span>
          </div>

          <h1 className="flex flex-col items-start font-black tracking-tight leading-[0.88] text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
            <span className="text-[clamp(2.5rem,7vw,7.8rem)] text-zinc-200/95 font-extralight tracking-tight italic drop-shadow-2xl">
              M. SAKIB
            </span>
            <span className="text-[clamp(3rem,9.5vw,10.8rem)] bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent font-black tracking-tighter drop-shadow-[0_25px_60px_rgba(0,0,0,1)]">
              SADMAN ARIAN
            </span>
          </h1>

          <p className="pointer-events-auto mt-3 max-w-md text-xs sm:text-sm font-light leading-relaxed text-zinc-300 bg-black/60 p-3 rounded-xl backdrop-blur-md border border-white/10 shadow-xl">
            {portfolioData.personal.headline}
          </p>

          <div className="pointer-events-auto flex items-center gap-3 pt-3">
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

            <MagneticElement strength={0.25} radius={60}>
              <a
                href="#about"
                className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-2.5 font-mono text-xs text-zinc-300 backdrop-blur-md hover:border-white/40 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>ABOUT ME</span>
              </a>
            </MagneticElement>
          </div>
        </div>

        {/* Floating Right Supporting Telemetry Widgets */}
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

      {/* Hero Bottom Bar & Scroll Indicator */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-white/5 pt-3 text-xs font-mono text-zinc-500 z-40">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
          <span>PORTFOLIO // 2026 EDITION</span>
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
