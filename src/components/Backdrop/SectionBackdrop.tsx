"use client";

import React, { useEffect, useRef } from "react";

interface SectionBackdropProps {
  children: React.ReactNode;
  image?: string;
  tone?: "duotone" | "blurred" | "dim";
  parallax?: boolean;
  className?: string;
}

export function SectionBackdrop({
  children,
  image,
  tone = "duotone",
  parallax = false,
  className = "",
}: SectionBackdropProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax || !image) return;

    const handleScroll = () => {
      if (!bgRef.current) return;
      const rect = bgRef.current.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - rect.top) * 0.04;
      bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallax, image]);

  const getToneClass = () => {
    switch (tone) {
      case "blurred":
        return "opacity-[0.07] blur-2xl filter saturate-50";
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
      {image && (
        <div
          ref={bgRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 will-change-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
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
