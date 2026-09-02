"use client";

import React from "react";
import { LiquidPortrait } from "./LiquidPortrait";
import { McLarenWindTunnel } from "./McLarenWindTunnel";
import { portfolioData } from "@/data/portfolio";
import { useCursor } from "@/components/Cursor/CustomCursor";
import { MagneticElement } from "@/components/Interaction/MagneticElement";
import { RollingText } from "@/components/Typography/RollingText";
import { ArrowDown, ArrowRight, Sparkles, Terminal, Activity, Code } from "lucide-react";

export function Hero() {
  const { setCursorState } = useCursor();

  return (
    <section id="hero" className="relative flex min-h-[105svh] flex-col justify-between overflow-hidden px-6 pt-24 pb-12 md:px-12">
      {/* Subtle Background Radial Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -z-10 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-950/20 blur-[170px]" />
      <div className="pointer-events-none absolute bottom-16 right-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-indigo-950/20 blur-[150px]" />

      {/* Top Header Floating Badges */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 pt-2 z-20">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 font-mono text-xs tracking-editorial text-zinc-300 backdrop-blur-md">
            <Terminal className="h-3.5 w-3.5 text-sky-400" />
            <span>{portfolioData.personal.role.toUpperCase()}</span>
          </span>

          <div className="hidden sm:flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/5 px-3.5 py-1 font-mono text-xs text-sky-300 backdrop-blur-md">
            <Activity className="h-3 w-3 animate-pulse text-sky-400" />
            <span>NOW: Minecraft Voxel Shaders & Aerodynamics</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>AVAILABLE FOR SELECTIVE ROLES</span>
        </div>
      </div>

      {/* Zoomed McLaren P1 Aerodynamic Wind Tunnel Profile */}
      <div className="w-full z-20 my-3">
        <McLarenWindTunnel />
      </div>

      {/* Main Center Stage: Stylish Editorial Typography + Zoomed Voxel Portrait */}
      <div className="relative mx-auto my-auto flex w-full max-w-7xl flex-col items-center justify-center">
        {/* Ultra-Stylish Editorial Name Typography */}
        <div className="pointer-events-none z-10 text-center w-full select-none mb-[-3rem] sm:mb-[-5rem] md:mb-[-7rem]">
          <div className="flex items-center justify-center gap-3 mb-2 font-mono text-[11px] uppercase tracking-editorial text-sky-400">
            <span className="h-[1px] w-8 bg-sky-400/60" />
            <span>CREATIVE DEVELOPER & SOFTWARE ENGINEER</span>
            <span className="h-[1px] w-8 bg-sky-400/60" />
          </div>

          <h1 className="flex flex-col items-center font-black tracking-tight leading-[0.84] text-white">
            <span className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-zinc-400 font-extralight tracking-tight drop-shadow-md italic">
              M. SAKIB
            </span>
            <span className="text-5xl sm:text-7xl md:text-9xl lg:text-[11.5rem] bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent font-black tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              SADMAN ARIAN
            </span>
          </h1>
        </div>

        {/* The Zoomed Voxel Pixelated Portrait Canvas with Transparent Background */}
        <div className="relative z-20 w-full max-w-2xl md:max-w-3xl lg:max-w-4xl h-[56vh] sm:h-[66vh] md:h-[74vh] lg:h-[82vh] flex items-end justify-center">
          <LiquidPortrait
            imageSrc={portfolioData.personal.portrait}
            alt={portfolioData.personal.name}
            className="h-full w-full max-h-full scale-105 sm:scale-115 md:scale-125 transition-transform duration-700"
          />
        </div>

        {/* Floating Left & Right Supporting Widgets */}
        <div className="hidden lg:flex pointer-events-none absolute left-0 bottom-8 z-30 flex-col gap-3 max-w-xs text-left">
          <p className="pointer-events-auto text-sm font-light leading-relaxed text-zinc-300">
            {portfolioData.personal.headline}
          </p>
          <div className="pointer-events-auto flex items-center gap-3 pt-2">
            <MagneticElement strength={0.3} radius={70}>
              <a
                href="#projects"
                onMouseEnter={() => setCursorState("OPEN")}
                onMouseLeave={() => setCursorState("DEFAULT")}
                className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-xs font-bold tracking-wider text-black transition-all hover:bg-zinc-200 shadow-xl"
              >
                <RollingText text="EXPLORE WORK" />
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </MagneticElement>
          </div>
        </div>

        <div className="hidden lg:flex pointer-events-none absolute right-0 bottom-8 z-30 flex-col gap-4 text-right">
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl shadow-2xl">
            <span className="font-mono text-2xl font-bold text-white tracking-tight">
              VOXEL 3D
            </span>
            <p className="font-mono text-[10px] uppercase tracking-wider text-sky-400">
              Minecraft Shader Matrix
            </p>
          </div>
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/70 p-4 backdrop-blur-xl shadow-2xl">
            <span className="font-mono text-2xl font-bold text-white tracking-tight">
              60 FPS
            </span>
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              GPU Accelerated
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
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs font-bold text-black shadow-xl"
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
              <span>ABOUT ME</span>
            </a>
          </MagneticElement>
        </div>
      </div>

      {/* Hero Bottom Bar & Scroll Indicator */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-white/5 pt-4 text-xs font-mono text-zinc-500 z-20">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
          <span>PORTFOLIO // MINECRAFT VOXEL EDITION</span>
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
