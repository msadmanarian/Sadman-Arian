"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { liquidVertexShader, liquidFragmentShader } from "@/shaders/liquidShaders";
import { useCursor } from "@/components/Cursor/CustomCursor";

interface LiquidPortraitProps {
  imageSrc: string;
  alt?: string;
  className?: string;
  seamless?: boolean;
}

export function LiquidPortrait({
  imageSrc = "/images/portrait.jpg",
  alt = "M. Sakib Sadman Arian Portrait",
  className = "",
  seamless = true,
}: LiquidPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setCursorState } = useCursor();

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [fallbackActive, setFallbackActive] = useState(false);
  const [fallbackPos, setFallbackPos] = useState({ x: 50, y: 50, active: false });

  // WebGL & Interaction State Refs
  const stateRef = useRef({
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
    camera: null as THREE.OrthographicCamera | null,
    material: null as THREE.ShaderMaterial | null,
    mesh: null as THREE.Mesh | null,
    texture: null as THREE.Texture | null,
    animId: 0,
    targetMouse: new THREE.Vector2(0.5, 0.5),
    currentMouse: new THREE.Vector2(0.5, 0.5),
    prevMouse: new THREE.Vector2(0.5, 0.5),
    velocity: new THREE.Vector2(0, 0),
    targetStrength: 0.0,
    currentStrength: 0.0,
    tilt: new THREE.Vector2(0, 0),
    targetTilt: new THREE.Vector2(0, 0),
    isPointerInside: false,
    imageResolution: new THREE.Vector2(1000, 1000),
  });

  // Handle pointer enter
  const handlePointerEnter = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setCursorState("REVEAL");
      const state = stateRef.current;
      state.isPointerInside = true;
      state.targetStrength = 1.0;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = 1.0 - (e.clientY - rect.top) / rect.height;
        state.targetMouse.set(x, y);
        state.currentMouse.set(x, y);
        state.prevMouse.set(x, y);

        setFallbackPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
          active: true,
        });
      }
    },
    [setCursorState]
  );

  // Handle pointer move
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height));

    const state = stateRef.current;
    state.targetMouse.set(x, y);

    // Parallax tilt
    const tiltX = (x - 0.5) * 2;
    const tiltY = (y - 0.5) * 2;
    state.targetTilt.set(tiltX, tiltY);

    setFallbackPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      active: true,
    });
  }, []);

  // Handle pointer leave
  const handlePointerLeave = useCallback(() => {
    setCursorState("DEFAULT");
    const state = stateRef.current;
    state.isPointerInside = false;
    state.targetStrength = 0.0;
    state.targetTilt.set(0, 0);

    setFallbackPos((prev) => ({ ...prev, active: false }));
  }, [setCursorState]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isSubscribed = true;

    try {
      // 1. Scene & Camera Setup
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      stateRef.current.scene = scene;
      stateRef.current.camera = camera;

      // 2. WebGL Renderer with safe DPR
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });

      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2.0);
      renderer.setPixelRatio(dpr);
      const width = container.clientWidth || 600;
      const height = container.clientHeight || 800;
      renderer.setSize(width, height);
      stateRef.current.renderer = renderer;

      // 3. Load Texture
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        imageSrc,
        (loadedTexture) => {
          if (!isSubscribed) return;
          loadedTexture.minFilter = THREE.LinearFilter;
          loadedTexture.magFilter = THREE.LinearFilter;
          loadedTexture.generateMipmaps = false;

          const img = loadedTexture.image;
          stateRef.current.imageResolution.set(img.width || 1000, img.height || 1000);
          stateRef.current.texture = loadedTexture;

          // 4. Create Shader Material
          const material = new THREE.ShaderMaterial({
            vertexShader: liquidVertexShader,
            fragmentShader: liquidFragmentShader,
            uniforms: {
              u_texture: { value: loadedTexture },
              u_resolution: { value: new THREE.Vector2(width, height) },
              u_image_resolution: { value: stateRef.current.imageResolution },
              u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
              u_prev_mouse: { value: new THREE.Vector2(0.5, 0.5) },
              u_velocity: { value: new THREE.Vector2(0, 0) },
              u_time: { value: 0 },
              u_strength: { value: 0.0 },
              u_radius: { value: 0.35 },
              u_edge_softness: { value: 0.18 },
              u_tilt_x: { value: 0.0 },
              u_tilt_y: { value: 0.0 },
            },
            depthTest: false,
            depthWrite: false,
          });
          stateRef.current.material = material;

          // 5. Plane Mesh
          const geometry = new THREE.PlaneGeometry(2, 2);
          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          stateRef.current.mesh = mesh;

          setIsLoaded(true);
        },
        undefined,
        (err) => {
          console.error("Texture loading failed:", err);
          if (isSubscribed) {
            setHasWebGLError(true);
            setFallbackActive(true);
          }
        }
      );

      // 6. Animation Loop with spring physics
      const clock = new THREE.Clock();

      const animate = () => {
        stateRef.current.animId = requestAnimationFrame(animate);

        const state = stateRef.current;
        if (!state.material || !state.renderer || !state.scene || !state.camera) return;

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // Smooth spring lerp for mouse coordinates
        const lerpFactor = 0.12;
        const prevCurrentX = state.currentMouse.x;
        const prevCurrentY = state.currentMouse.y;

        state.currentMouse.x += (state.targetMouse.x - state.currentMouse.x) * lerpFactor;
        state.currentMouse.y += (state.targetMouse.y - state.currentMouse.y) * lerpFactor;

        // Velocity computation with damping
        const rawVelX = (state.currentMouse.x - prevCurrentX) / Math.max(delta, 0.016);
        const rawVelY = (state.currentMouse.y - prevCurrentY) / Math.max(delta, 0.016);
        state.velocity.x += (rawVelX * 0.08 - state.velocity.x) * 0.15;
        state.velocity.y += (rawVelY * 0.08 - state.velocity.y) * 0.15;

        // Smooth strength transition
        const strengthSpeed = state.isPointerInside ? 0.08 : 0.04;
        state.currentStrength += (state.targetStrength - state.currentStrength) * strengthSpeed;

        // Smooth tilt parallax
        state.tilt.x += (state.targetTilt.x - state.tilt.x) * 0.06;
        state.tilt.y += (state.targetTilt.y - state.tilt.y) * 0.06;

        // Update Shader Uniforms
        const uniforms = state.material.uniforms;
        uniforms.u_time.value = elapsedTime;
        uniforms.u_mouse.value.copy(state.currentMouse);
        uniforms.u_prev_mouse.value.copy(state.prevMouse);
        uniforms.u_velocity.value.copy(state.velocity);
        uniforms.u_strength.value = state.currentStrength;
        uniforms.u_tilt_x.value = state.tilt.x;
        uniforms.u_tilt_y.value = state.tilt.y;

        state.prevMouse.copy(state.currentMouse);

        state.renderer.render(state.scene, state.camera);
      };

      stateRef.current.animId = requestAnimationFrame(animate);

      // 7. Resize Observer
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const w = entry.contentRect.width;
          const h = entry.contentRect.height;
          if (w > 0 && h > 0 && stateRef.current.renderer && stateRef.current.material) {
            stateRef.current.renderer.setSize(w, h);
            stateRef.current.material.uniforms.u_resolution.value.set(w, h);
          }
        }
      });
      resizeObserver.observe(container);

      return () => {
        isSubscribed = false;
        resizeObserver.disconnect();
        cancelAnimationFrame(stateRef.current.animId);

        if (stateRef.current.renderer) {
          stateRef.current.renderer.dispose();
        }
        if (stateRef.current.texture) {
          stateRef.current.texture.dispose();
        }
        if (stateRef.current.material) {
          stateRef.current.material.dispose();
        }
      };
    } catch (e) {
      console.warn("WebGL initialization failed, switching to graceful fallback:", e);
      setHasWebGLError(true);
      setFallbackActive(true);
    }
  }, [imageSrc]);

  return (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerEnter}
      onPointerUp={handlePointerMove}
      className={`group relative overflow-hidden select-none touch-none transition-all duration-700 ${
        seamless
          ? "w-full h-full bg-transparent"
          : "rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl"
      } ${className}`}
      style={{
        maskImage: seamless
          ? "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)"
          : undefined,
        WebkitMaskImage: seamless
          ? "linear-gradient(to bottom, black 0%, black 80%, transparent 100%)"
          : undefined,
      }}
      role="img"
      aria-label={alt}
    >
      {/* Ambient Behind Glow */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-sky-500/10 opacity-30 blur-3xl transition-opacity duration-700 group-hover:opacity-60" />

      {/* Main WebGL Canvas */}
      {!fallbackActive && !hasWebGLError && (
        <canvas
          ref={canvasRef}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Graceful CSS / DOM Fallback */}
      {(fallbackActive || hasWebGLError) && (
        <div className="relative h-full w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={alt}
            className="h-full w-full object-cover filter grayscale contrast-125 brightness-95"
          />

          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
            style={{
              opacity: fallbackPos.active ? 1 : 0,
              maskImage: `radial-gradient(circle 220px at ${fallbackPos.x}% ${fallbackPos.y}%, black 20%, transparent 80%)`,
              WebkitMaskImage: `radial-gradient(circle 220px at ${fallbackPos.x}% ${fallbackPos.y}%, black 20%, transparent 80%)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt={alt} className="h-full w-full object-cover" />
          </div>
        </div>
      )}

      {/* Subtle Bottom Floating Status Badge */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-black/60 px-4 py-1.5 backdrop-blur-xl border border-white/10 text-[11px] font-mono tracking-widest text-zinc-300">
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping" />
        <span className="text-zinc-200">INTERACTIVE PORTRAIT</span>
        <span className="text-zinc-500 hidden sm:inline">// HOVER / DRAG</span>
      </div>
    </div>
  );
}
