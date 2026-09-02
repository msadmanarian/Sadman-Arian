"use client";

import React, { useEffect, useRef } from "react";

interface WindStreaksProps {
  progress: number;
  spineHeight: number;
  isReducedMotion?: boolean;
}

export function WindStreaks({
  progress,
  spineHeight,
  isReducedMotion = false,
}: WindStreaksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    // Streaks data
    const streakCount = 6;
    const streaks = Array.from({ length: streakCount }, (_, i) => ({
      y: (i / streakCount) * Math.max(spineHeight * progress, 100),
      length: 30 + Math.random() * 45,
      speed: 1.2 + Math.random() * 1.5,
      opacity: 0.3 + Math.random() * 0.4,
      width: 1.5 + Math.random() * 1.0,
    }));

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.25;
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const activeHeight = spineHeight * progress;
      if (activeHeight < 10) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Decay scroll velocity
      scrollVelocity *= 0.92;

      streaks.forEach((streak) => {
        // Move streak based on ambient speed + scroll velocity
        streak.y += streak.speed + scrollVelocity;

        // Wrap around active spine length
        if (streak.y > activeHeight) {
          streak.y = 0;
        } else if (streak.y < 0) {
          streak.y = activeHeight;
        }

        // Draw flowing soft light streak
        const gradient = ctx.createLinearGradient(0, streak.y, 0, streak.y + streak.length);
        gradient.addColorStop(0, "rgba(56, 189, 248, 0)");
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${streak.opacity})`);
        gradient.addColorStop(1, "rgba(56, 189, 248, 0)");

        ctx.fillStyle = gradient;
        ctx.fillRect(canvas.width / 2 - streak.width / 2, streak.y, streak.width, streak.length);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, [progress, spineHeight, isReducedMotion]);

  if (isReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      width={24}
      height={Math.max(spineHeight, 500)}
      className="pointer-events-none absolute left-0 top-0 h-full w-6 -translate-x-1/2"
      style={{ filter: "blur(0.5px)" }}
    />
  );
}
