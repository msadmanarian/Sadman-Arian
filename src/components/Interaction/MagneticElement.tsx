"use client";

import React, { useRef, useEffect } from "react";
import { usePointer } from "./GlobalHoverProvider";
import { useCursor, CursorState } from "@/components/Cursor/CustomCursor";

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number; // 0.1 to 0.4
  radius?: number; // px activation distance
  cursorState?: CursorState;
  cursorLabel?: string;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

export function MagneticElement({
  children,
  strength = 0.22,
  radius = 80,
  cursorState,
  cursorLabel,
  className = "",
  as: Component = "div",
  ...rest
}: MagneticElementProps) {
  const elementRef = useRef<HTMLElement>(null);
  const pointer = usePointer();
  const { setCursorState, setCursorLabel } = useCursor();

  // Internal lerp physics state
  const physicsRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    isHovered: false,
  });

  useEffect(() => {
    if (pointer.isTouch || !elementRef.current) return;

    const el = elementRef.current;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = pointer.x - centerX;
    const distY = pointer.y - centerY;
    const distance = Math.hypot(distX, distY);

    const physics = physicsRef.current;

    if (distance < radius) {
      // Magnetic pull within radius
      physics.targetX = distX * strength;
      physics.targetY = distY * strength;
      if (!physics.isHovered && cursorState) {
        physics.isHovered = true;
        setCursorState(cursorState);
        if (cursorLabel) setCursorLabel(cursorLabel);
      }
    } else {
      physics.targetX = 0;
      physics.targetY = 0;
      if (physics.isHovered) {
        physics.isHovered = false;
        setCursorState("DEFAULT");
        setCursorLabel(undefined);
      }
    }
  }, [pointer, radius, strength, cursorState, cursorLabel, setCursorState, setCursorLabel]);

  useEffect(() => {
    if (pointer.isTouch) return;

    let animId: number;

    const render = () => {
      const physics = physicsRef.current;
      const el = elementRef.current;

      // Smooth lerp physics
      physics.currentX += (physics.targetX - physics.currentX) * 0.16;
      physics.currentY += (physics.targetY - physics.currentY) * 0.16;

      if (el) {
        if (Math.abs(physics.currentX) > 0.01 || Math.abs(physics.currentY) > 0.01) {
          el.style.transform = `translate3d(${physics.currentX.toFixed(2)}px, ${physics.currentY.toFixed(2)}px, 0)`;
        } else if (el.style.transform) {
          el.style.transform = "translate3d(0, 0, 0)";
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [pointer.isTouch]);

  return (
    <Component
      ref={elementRef}
      className={`transition-transform duration-75 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
