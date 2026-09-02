"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Zap, Gauge, X, Flame } from "lucide-react";

export function F1EasterEgg() {
  const [isF1Active, setIsF1Active] = useState(false);

  useEffect(() => {
    // Console Easter Egg as showcased in Lando Norris breakdown
    console.log(
      "%c🏎️  M. SAKIB SADMAN ARIAN  %c// CREATIVE DEVELOPER & SOFTWARE ENGINEER\n%c⚡ WebGL 60FPS // GLSL Liquid Shaders // McLaren P1 Aerodynamics // Lenis Momentum Scroll",
      "color: #08080a; background: #38bdf8; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 4px;",
      "color: #38bdf8; font-size: 12px; font-weight: bold; margin-left: 6px;",
      "color: #f59e0b; font-family: monospace; font-size: 11px; padding: 4px 0;"
    );

    console.log(
      "%c[TIP] Press F1 key anytime to activate Aerodynamic Turbo Mode!",
      "color: #10b981; font-family: monospace; font-size: 10px;"
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F1") {
        e.preventDefault();
        setIsF1Active((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isF1Active) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-6 select-none animate-fade-in">
      {/* Aerodynamic Speed Lines Border Overlay */}
      <div className="absolute inset-0 border-2 border-amber-500/40 shadow-[inset_0_0_80px_rgba(245,158,11,0.2)] rounded-3xl" />

      {/* Top Telemetry Banner */}
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto z-10 pointer-events-auto">
        <div className="flex items-center gap-3 rounded-full bg-black/90 border border-amber-500/40 px-5 py-2.5 backdrop-blur-xl shadow-2xl">
          <Flame className="h-5 w-5 text-amber-400 animate-bounce" />
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-white tracking-widest">
              F1 TURBO DRS ACTIVATED
            </span>
            <span className="font-mono text-[10px] text-amber-400">
              AERODYNAMIC DOWNFORCE: 600KG // 350+ KM/H
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsF1Active(false)}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/80 px-4 py-2 text-xs font-mono text-white backdrop-blur-md hover:bg-white hover:text-black transition-all"
        >
          <span>EXIT F1 MODE</span>
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Bottom Speedometer HUD */}
      <div className="flex items-center justify-center w-full z-10 pointer-events-auto">
        <div className="flex items-center gap-6 rounded-2xl bg-black/90 border border-amber-500/30 px-8 py-4 backdrop-blur-2xl shadow-2xl">
          <div className="flex items-center gap-2">
            <Gauge className="h-6 w-6 text-amber-400 animate-spin" />
            <span className="font-mono text-3xl font-black text-white">395</span>
            <span className="font-mono text-xs text-zinc-500">KM/H</span>
          </div>

          <div className="h-8 w-[1px] bg-white/20" />

          <div className="flex flex-col font-mono text-xs text-zinc-400">
            <span className="text-emerald-400 font-bold">OPTIMAL CFD STREAMLINES</span>
            <span>PRESS F1 OR ESC TO TOGGLE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
