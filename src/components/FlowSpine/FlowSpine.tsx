"use client";

import React, { useEffect, useState, useRef } from "react";
import { WindStreaks } from "./WindStreaks";

interface SectionNode {
  id: string;
  label: string;
  percentage: number;
}

export function FlowSpine() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [totalHeight, setTotalHeight] = useState(4000);
  const [activeSection, setActiveSection] = useState("hero");
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const spineRef = useRef<HTMLDivElement>(null);

  const nodes: SectionNode[] = [
    { id: "hero", label: "00", percentage: 0.02 },
    { id: "projects", label: "01", percentage: 0.22 },
    { id: "about", label: "02", percentage: 0.44 },
    { id: "skills", label: "03", percentage: 0.62 },
    { id: "experience", label: "04", percentage: 0.78 },
    { id: "contact", label: "05", percentage: 0.94 },
  ];

  useEffect(() => {
    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsReducedMotion(true);
    }

    const updateScrollMetrics = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setScrollProgress(progress);
      setTotalHeight(document.documentElement.scrollHeight);

      // Determine active section
      const sections = ["contact", "experience", "skills", "about", "projects"];
      let current = "hero";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            current = sectionId;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    updateScrollMetrics();
    window.addEventListener("scroll", updateScrollMetrics, { passive: true });
    window.addEventListener("resize", updateScrollMetrics);

    return () => {
      window.removeEventListener("scroll", updateScrollMetrics);
      window.removeEventListener("resize", updateScrollMetrics);
    };
  }, []);

  return (
    <aside
      aria-hidden="true"
      className="pointer-events-none fixed left-4 sm:left-6 md:left-8 top-0 bottom-0 z-20 hidden sm:flex flex-col items-center select-none"
    >
      {/* Background Track Line */}
      <div className="relative h-full w-[1px] bg-white/5">
        {/* Drawn Active Spine (Stroke driven by scroll progress) */}
        <div
          className="absolute top-0 left-0 w-[1px] bg-gradient-to-b from-sky-400/80 via-white/70 to-sky-400/80 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(56,189,248,0.3)]"
          style={{ height: `${Math.max(scrollProgress * 100, 2)}%` }}
        />

        {/* Wind Streaks Layer along Drawn Active Spine */}
        <WindStreaks
          progress={scrollProgress}
          spineHeight={totalHeight}
          isReducedMotion={isReducedMotion}
        />

        {/* Section Interactive / Visual Node Markers */}
        {nodes.map((node) => {
          const isPassed = scrollProgress >= node.percentage;
          const isActive = activeSection === node.id;

          return (
            <div
              key={node.id}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              style={{ top: `${node.percentage * 100}%` }}
            >
              {/* Outer Ring */}
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300 ${
                  isActive
                    ? "border-sky-400 bg-sky-950/80 scale-125 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                    : isPassed
                    ? "border-white/40 bg-black/90"
                    : "border-white/10 bg-black/60"
                }`}
              >
                {/* Center Core */}
                <div
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                    isActive ? "bg-white animate-pulse" : isPassed ? "bg-white/60" : "bg-white/20"
                  }`}
                />
              </div>

              {/* Node Label Tooltip */}
              <span
                className={`absolute left-6 top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-widest uppercase transition-opacity duration-300 ${
                  isActive ? "text-sky-300 opacity-100 font-bold" : "text-zinc-600 opacity-40"
                }`}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
