"use client";

import React, { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";

export function Preloader({ onLoaded }: { onLoaded?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING CORE ENGINE");
  const [isComplete, setIsComplete] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const statuses = [
      { at: 15, text: "CALIBRATING GLSL PIPELINE" },
      { at: 40, text: "INITIALIZING LIQUID REVEAL SHADER" },
      { at: 70, text: "FETCHING HIGH-RES TEXTURES" },
      { at: 90, text: "COMPOSITING EDITORIAL LAYERS" },
      { at: 100, text: "EXPERIENCE READY" },
    ];

    // Preload canonical portrait image
    const img = new Image();
    img.src = portfolioData.personal.portrait;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setStatusText("EXPERIENCE READY");
          setTimeout(() => {
            setIsComplete(true);
            if (onLoaded) onLoaded();
            setTimeout(() => setShouldRender(false), 900);
          }, 300);
          return 100;
        }

        const match = statuses.find((s) => next >= s.at && prev < s.at);
        if (match) setStatusText(match.text);

        return next;
      });
    }, 45);

    // Safety timeout in case of extreme lag
    const safetyTimeout = setTimeout(() => {
      setProgress(100);
      setIsComplete(true);
      setTimeout(() => setShouldRender(false), 900);
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, [onLoaded]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#08080a] p-8 sm:p-12 transition-all duration-700 ease-in-out select-none ${
        isComplete ? "opacity-0 -translate-y-8 pointer-events-none" : "opacity-100 translate-y-0"
      }`}
    >
      {/* Top Bar: Monogram & System Label */}
      <div className="flex items-center justify-between font-mono text-xs text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded border border-white/20 bg-white/5 font-bold text-white text-[11px]">
            {portfolioData.personal.monogram[0]}
          </span>
          <span className="text-zinc-300 font-semibold tracking-widest">
            {portfolioData.personal.monogram} // 2026
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
          <span className="text-sky-400 font-mono tracking-wider">SYSTEM LOADING</span>
        </div>
      </div>

      {/* Middle: Dominant Editorial Name & Big Counter */}
      <div className="mx-auto my-auto flex w-full max-w-5xl flex-col items-start justify-center">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-editorial text-zinc-400">
            {portfolioData.personal.role}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white">
          <span className="text-zinc-500 font-light block">M. SAKIB</span>
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            SADMAN ARIAN
          </span>
        </h1>

        {/* Big Percentage Number */}
        <div className="mt-8 font-mono text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-sky-400">
          {progress.toString().padStart(2, "0")}
          <span className="text-2xl sm:text-3xl text-zinc-600 ml-2">%</span>
        </div>
      </div>

      {/* Bottom: Progress Bar & Telemetry Status */}
      <div className="mx-auto w-full max-w-5xl space-y-3">
        <div className="h-[2px] w-full overflow-hidden bg-white/10 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-sky-400 via-white to-sky-400 transition-all duration-100 ease-out shadow-[0_0_15px_rgba(56,189,248,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between font-mono text-[11px] text-zinc-500 tracking-widest">
          <span className="text-zinc-400">{statusText}</span>
          <span className="hidden sm:inline">WebGL 2.0 // GLSL FLUID ENGINE</span>
        </div>
      </div>
    </div>
  );
}
