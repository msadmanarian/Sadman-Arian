"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePointer } from "@/components/Interaction/GlobalHoverProvider";
import { Wind, Gauge } from "lucide-react";

interface Streamline {
  x: number;
  yOffset: number;
  length: number;
  speed: number;
  opacity: number;
  thickness: number;
  dashPattern: number[];
  color: string;
}

export function McLarenWindTunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = usePointer();
  const [speedVal, setSpeedVal] = useState(120);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.clientWidth || 1100);
    let height = (canvas.height = container.clientHeight || 340);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Aerodynamic discrete, stepped streamline pulses (slower & coarse/less smooth)
    const streamCount = 20;
    const dashPatterns = [
      [14, 20, 4, 28],
      [8, 16, 24, 12],
      [20, 30],
      [6, 12, 18, 18],
    ];

    const streamlines: Streamline[] = Array.from({ length: streamCount }, (_, i) => {
      const isTopFlow = i < 14;
      return {
        x: Math.random() * width,
        yOffset: isTopFlow ? 0.18 + (i / 14) * 0.42 : 0.62 + ((i - 14) / 6) * 0.28,
        length: 70 + Math.random() * 110,
        // Slower deliberate speed
        speed: 0.9 + Math.random() * 1.3,
        opacity: 0.35 + Math.random() * 0.5,
        thickness: 1.2 + Math.random() * 1.4,
        dashPattern: dashPatterns[i % dashPatterns.length],
        color: i % 3 === 0 ? "rgba(56, 189, 248, " : "rgba(255, 255, 255, ",
      };
    });

    let extraVelocity = 0;
    let lastPointerX = pointer.x;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle reaction to pointer
      const pointerDiff = Math.abs(pointer.x - lastPointerX);
      if (pointerDiff > 1.0) {
        extraVelocity = Math.min(extraVelocity + pointerDiff * 0.04, 3.0);
        setSpeedVal(Math.min(120 + Math.floor(extraVelocity * 20), 180));
      } else {
        extraVelocity *= 0.95;
        setSpeedVal((prev) => (prev > 120 ? prev - 1 : 120));
      }
      lastPointerX = pointer.x;

      streamlines.forEach((s) => {
        s.x += s.speed + extraVelocity;
        if (s.x > width + s.length) {
          s.x = -s.length;
        }

        const t = Math.max(0, Math.min(1, (s.x + s.length / 2) / width));
        
        let aeroDeflection = 0;
        if (t > 0.15 && t < 0.85) {
          const normalizedT = (t - 0.15) / 0.7;
          aeroDeflection = -Math.sin(normalizedT * Math.PI) * (height * 0.2);
          if (normalizedT > 0.68) {
            aeroDeflection += Math.sin((normalizedT - 0.68) * Math.PI * 3.2) * (height * 0.05);
          }
        }

        const currentY = height * s.yOffset + aeroDeflection;

        // Draw segmented / less smooth discrete wind lines
        ctx.setLineDash(s.dashPattern);
        const grad = ctx.createLinearGradient(s.x, currentY, s.x + s.length, currentY);
        grad.addColorStop(0, `${s.color}0)`);
        grad.addColorStop(0.5, `${s.color}${s.opacity})`);
        grad.addColorStop(1, `${s.color}0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness;
        ctx.beginPath();

        ctx.moveTo(s.x, currentY);
        const nextT = Math.max(0, Math.min(1, (s.x + s.length) / width));
        let nextAero = 0;
        if (nextT > 0.15 && nextT < 0.85) {
          const normNextT = (nextT - 0.15) / 0.7;
          nextAero = -Math.sin(normNextT * Math.PI) * (height * 0.2);
        }
        const nextY = height * s.yOffset + nextAero;

        ctx.quadraticCurveTo(
          s.x + s.length * 0.5,
          (currentY + nextY) * 0.5,
          s.x + s.length,
          nextY
        );
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [pointer]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto h-48 sm:h-64 md:h-80 overflow-hidden rounded-3xl select-none"
    >
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Atmospheric Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-40 bg-sky-500/10 blur-3xl rounded-full" />

      {/* Zoomed McLaren P1 Side Profile Image */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/McLaren P1 Side Profile.png"
          alt="McLaren P1 Aerodynamic Side Profile"
          className="max-h-full w-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] opacity-95 scale-110 sm:scale-125 md:scale-135 transition-transform duration-700 hover:scale-140"
        />
      </div>

      {/* Stepped Wind Flow Streamlines Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      />

      {/* Telemetry Labels */}
      <div className="pointer-events-none absolute top-3 left-4 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-3.5 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur-md">
        <Wind className="h-3 w-3 text-sky-400" />
        <span>STEPPED WIND TUNNEL // LOW VELOCITY CFD</span>
      </div>

      <div className="pointer-events-none absolute top-3 right-4 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-3.5 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur-md">
        <Gauge className="h-3 w-3 text-sky-400" />
        <span className="text-white font-bold">{speedVal} KM/H</span>
      </div>
    </div>
  );
}
