"use client";

import React, { useState } from "react";

interface RollingTextProps {
  text: string;
  className?: string;
  staggerMs?: number;
}

export function RollingText({
  text,
  className = "",
  staggerMs = 25,
}: RollingTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const letters = Array.from(text);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex overflow-hidden cursor-pointer select-none leading-none ${className}`}
    >
      {letters.map((char, i) => (
        <span
          key={i}
          className="relative inline-block overflow-hidden"
          style={{
            height: "1em",
            width: char === " " ? "0.3em" : "auto",
          }}
        >
          {/* Primary character sliding up */}
          <span
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            style={{
              transform: isHovered ? "translateY(-100%)" : "translateY(0%)",
              transitionDelay: `${i * staggerMs}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>

          {/* Secondary duplicate character rolling in from below */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform text-sky-400"
            style={{
              transform: isHovered ? "translateY(0%)" : "translateY(100%)",
              transitionDelay: `${i * staggerMs}ms`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}
