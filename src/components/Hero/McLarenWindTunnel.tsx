"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePointer } from "@/components/Interaction/GlobalHoverProvider";
import { Wind, Gauge, Sparkles } from "lucide-react";

interface Streamline {
  x: number;
  yOffset: number;
  length: number;
  speed: number;
  opacity: number;
  thickness: number;
  color: string;
}

export function McLarenWindTunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = usePointer();
  const [speedVal, setSpeedVal] = useState(350);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = container.clientWidth || 1000);
    let height = (canvas.height = container.clientHeight || 300);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Aerodynamic streamline curves definition (mapping over McLaren P1 silhouette)
    // The car is oriented horizontally across the container
    const streamCount = 28;
    const streamlines: Streamline[] = Array.from({ length: streamCount }, (_, i) => {
      const isTopFlow = i < 18;
      return {
        x: Math.random() * width,
        yOffset: isTopFlow ? 0.2 + (i / 18) * 0.45 : 0.65 + ((i - 18) / 10) * 0.25,
        length: 80 + Math.random() * 160,
        speed: 3.5 + Math.random() * 4.5,
        opacity: 0.25 + Math.random() * 0.55,
        thickness: 1.0 + Math.random() * 1.5,
        color: i % 4 === 0 ? "rgba(56, 189, 248, " : "rgba(255, 255, 255, ",
      };
    });

    let extraVelocity = 0;
    let lastPointerX = pointer.x;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // React to pointer horizontal movement
      const pointerDiff = Math.abs(pointer.x - lastPointerX);
      if (pointerDiff > 0.5) {
        extraVelocity = Math.min(extraVelocity + pointerDiff * 0.15, 12);
        setSpeedVal(Math.min(350 + Math.floor(extraVelocity * 10), 415));
      } else {
        extraVelocity *= 0.94;
        setSpeedVal((prev) => (prev > 350 ? prev - 1 : 350));
      }
      lastPointerX = pointer.x;

      // Draw aerodynamic streamline flows conforming to the P1 curves
      streamlines.forEach((s) => {
        s.x += s.speed + extraVelocity;
        if (s.x > width + s.length) {
          s.x = -s.length;
        }

        // Calculate Y position along McLaren P1 aerodynamic curve:
        // Front nose (low) -> Windshield & Roof (arc high) -> Rear wing & diffuser (downforce trail)
        const t = Math.max(0, Math.min(1, (s.x + s.length / 2) / width));
        
        // P1 Aero curve function: smooth rise over canopy, dip over wing
        let aeroDeflection = 0;
        if (t > 0.15 && t < 0.85) {
          const normalizedT = (t - 0.15) / 0.7;
          // Canopy dome curve
          aeroDeflection = -Math.sin(normalizedT * Math.PI) * (height * 0.22);
          // Downforce swirl near rear spoiler (t > 0.65)
          if (normalizedT > 0.7) {
            aeroDeflection += Math.sin((normalizedT - 0.7) * Math.PI * 3) * (height * 0.04);
          }
        }

        const currentY = height * s.yOffset + aeroDeflection;

        // Draw flowing gradient line
        const grad = ctx.createLinearGradient(s.x, currentY, s.x + s.length, currentY);
        grad.addColorStop(0, `${s.color}0)`);
        grad.addColorStop(0.5, `${s.color}${s.opacity})`);
        grad.addColorStop(1, `${s.color}0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness;
        ctx.beginPath();

        // Trace smooth bezier trajectory
        ctx.moveTo(s.x, currentY);
        const nextT = Math.max(0, Math.min(1, (s.x + s.length) / width));
        let nextAero = 0;
        if (nextT > 0.15 && nextT < 0.85) {
          const normNextT = (nextT - 0.15) / 0.7;
          nextAero = -Math.sin(normNextT * Math.PI) * (height * 0.22);
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
      className="relative w-full max-w-5xl mx-auto h-40 sm:h-52 md:h-64 overflow-hidden rounded-3xl select-none"
    >
      {/* Aerodynamic Wind Tunnel Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Atmospheric Radial Behind Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-sky-500/10 blur-3xl rounded-full" />

      {/* McLaren P1 Side Profile Image */}
      <div className="relative z-10 h-full w-full flex items-center justify-center px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/McLaren P1 Side Profile.png"
          alt="McLaren P1 Aerodynamic Side Profile"
          className="max-h-full w-auto object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] opacity-85 transition-transform duration-700 hover:scale-[1.02]"
        />
      </div>

      {/* Real-Time Aerodynamic Wind Tunnel Streamlines Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        style={{ filter: "blur(0.3px)" }}
      />

      {/* Top Left: Aerodynamics Telemetry Badge */}
      <div className="pointer-events-none absolute top-3 left-4 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur-md">
        <Wind className="h-3 w-3 text-sky-400 animate-pulse" />
        <span>AERODYNAMIC FLOW // CFD STREAMLINES</span>
      </div>

      {/* Top Right: Real-Time Dynamic Velocity Indicator */}
      <div className="pointer-events-none absolute top-3 right-4 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-3 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur-md">
        <Gauge className="h-3 w-3 text-amber-400" />
        <span className="text-white font-bold">{speedVal} KM/H</span>
      </div>
    </div>
  );
}
