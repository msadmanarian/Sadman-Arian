"use client";

import React, { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { useCursor } from "@/components/Cursor/CustomCursor";
import { MagneticElement } from "@/components/Interaction/MagneticElement";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const { setCursorState } = useCursor();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-black py-12 px-6 md:px-12 text-zinc-500 font-mono text-xs">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Left: Name & Copyright */}
        <div className="space-y-1">
          <p className="text-zinc-200 font-semibold uppercase tracking-wider">
            {portfolioData.personal.name}
          </p>
          <p className="text-zinc-500">
            © {new Date().getFullYear()} — All Rights Reserved. Built with Next.js & WebGL.
          </p>
        </div>

        {/* Middle: Live Clock */}
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>LOCAL SYSTEM TIME: {time || "00:00:00"}</span>
        </div>

        {/* Right: Back to top button with Magnetic Pull */}
        <MagneticElement strength={0.25} radius={50}>
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursorState("OPEN")}
            onMouseLeave={() => setCursorState("DEFAULT")}
            className="flex items-center gap-2 self-start md:self-auto rounded-full border border-white/10 bg-white/5 px-4 py-2 text-zinc-300 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </MagneticElement>
      </div>
    </footer>
  );
}
