"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export type CursorState = "EXPLORE" | "REVEAL" | "VIEW" | "OPEN" | "VISIT" | "DEFAULT";

interface CursorContextType {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  cursorLabel?: string;
  setCursorLabel: (label?: string) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorState: "DEFAULT",
  setCursorState: () => {},
  setCursorLabel: () => {},
});

export const useCursor = () => useContext(CursorContext);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>("DEFAULT");
  const [cursorLabel, setCursorLabel] = useState<string | undefined>(undefined);

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState, cursorLabel, setCursorLabel }}>
      {children}
      <CustomCursorComponent cursorState={cursorState} cursorLabel={cursorLabel} />
    </CursorContext.Provider>
  );
}

function CustomCursorComponent({
  cursorState,
  cursorLabel,
}: {
  cursorState: CursorState;
  cursorLabel?: string;
}) {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch primary
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const render = () => {
      // Smooth lerp for outer ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (isTouch) return null;

  const getLabel = () => {
    if (cursorLabel) return cursorLabel;
    switch (cursorState) {
      case "REVEAL":
        return "REVEAL";
      case "VIEW":
        return "VIEW";
      case "OPEN":
        return "OPEN";
      case "VISIT":
        return "VISIT";
      case "EXPLORE":
        return "EXPLORE";
      default:
        return null;
    }
  };

  const label = getLabel();
  const isExpanded = cursorState !== "DEFAULT";

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Center Dot */}
      <div
        ref={cursorDotRef}
        className="fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-white mix-blend-difference transition-transform will-change-transform"
      />

      {/* Outer Dynamic Ring / Pill */}
      <div
        ref={cursorRingRef}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border border-white/30 backdrop-blur-[2px] transition-all duration-300 ease-out will-change-transform ${
          isExpanded
            ? "h-16 w-16 -ml-8 -mt-8 bg-white/10 border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            : "h-8 w-8 -ml-4 -mt-4 bg-transparent border-white/25"
        }`}
      >
        {label && (
          <span className="text-[9px] font-mono tracking-widest text-white uppercase font-bold select-none drop-shadow">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
