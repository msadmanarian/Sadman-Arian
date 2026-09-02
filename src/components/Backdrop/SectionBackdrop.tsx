"use client";

import React, { useEffect, useRef } from "react";
import { portfolioData } from "@/data/portfolio";

interface SectionBackdropProps {
  children: React.ReactNode;
  image?: string;
  usePortrait?: boolean;
  tone?: "duotone" | "blurred" | "dim";
  parallax?: boolean;
  className?: string;
}

export function SectionBackdrop({
  children,
  image,
  usePortrait = false,
  tone = "duotone",
  parallax = false,
  className = "",
}: SectionBackdropProps) {
  const bgRef = useRef<HTMLDivElement>(null);
  const activeImage = usePortrait ? portfolioData.personal.portrait : image;

  useEffect(() => {
    if (!parallax || !activeImage) return;

    const handleScroll = () => {
      if (!bgRef.current) return;
      const rect = bgRef.current.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top) * 0.04;
      bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallax, activeImage]);

  const getToneClass = () => {
    if (usePortrait) {
      return "opacity-[0.035] filter grayscale contrast-200 brightness-75 mix-blend-screen scale-110";
    }
    switch (tone) {
      case "blurred":
        return "opacity-[0.06] blur-2xl filter saturate-50";
      case "dim":
        return "opacity-[0.05] filter brightness-75 contrast-125";
      case "duotone":
      default:
        return "opacity-[0.08] filter grayscale contrast-150 mix-blend-screen";
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background Image Layer (z-index: 0) */}
      {activeImage && (
        <div
          ref={bgRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 will-change-transform flex items-center justify-center overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage}
            alt=""
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover transition-opacity duration-1000 select-none ${getToneClass()}`}
          />
        </div>
      )}

      {/* Foreground Content (z-index: 10) */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
