"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface PointerPosition {
  x: number;
  y: number;
  isTouch: boolean;
}

const PointerContext = createContext<PointerPosition>({
  x: -100,
  y: -100,
  isTouch: false,
});

export const usePointer = () => useContext(PointerContext);

export function GlobalHoverProvider({ children }: { children: React.ReactNode }) {
  const [pointer, setPointer] = useState<PointerPosition>({
    x: -100,
    y: -100,
    isTouch: false,
  });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) {
      setPointer((prev) => ({ ...prev, isTouch: true }));
      return;
    }

    let animationFrameId: number;
    let rawX = -100;
    let rawY = -100;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      rawX = e.clientX;
      rawY = e.clientY;
    };

    const updateLoop = () => {
      setPointer({
        x: rawX,
        y: rawY,
        isTouch: false,
      });
      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <PointerContext.Provider value={pointer}>{children}</PointerContext.Provider>;
}
