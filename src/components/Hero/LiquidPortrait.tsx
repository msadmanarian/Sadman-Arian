"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { liquidVertexShader, liquidFragmentShader } from "@/shaders/liquidShaders";
import { useCursor } from "@/components/Cursor/CustomCursor";

interface LiquidPortraitProps {
  imageSrc: string;
  alt?: string;
  className?: string;
}

export function LiquidPortrait({
  imageSrc = "/images/portrait.jpg",
  alt = "M. Sakib Sadman Arian Portrait",
  className = "",
}: LiquidPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setCursorState } = useCursor();

  const [isLoaded, setIsLoaded] = useState(false);

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
    scrollProgress: 0.0,
    isPointerInside: false,
    imageResolution: new THREE.Vector2(1000, 1000),
  });

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
      }
    },
    [setCursorState]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height));

    const state = stateRef.current;
    state.targetMouse.set(x, y);

    const tiltX = (x - 0.5) * 2;
    const tiltY = (y - 0.5) * 2;
    state.targetTilt.set(tiltX, tiltY);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setCursorState("DEFAULT");
    const state = stateRef.current;
    state.isPointerInside = false;
    state.targetStrength = 0.0;
    state.targetTilt.set(0, 0);
  }, [setCursorState]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isSubscribed = true;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      stateRef.current.scene = scene;
      stateRef.current.camera = camera;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });

      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2.0);
      renderer.setPixelRatio(dpr);
      const width = container.clientWidth || 700;
      const height = container.clientHeight || 900;
      renderer.setSize(width, height);
      stateRef.current.renderer = renderer;

      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        imageSrc,
        (loadedTexture) => {
          if (!isSubscribed) return;
          loadedTexture.minFilter = THREE.NearestFilter;
          loadedTexture.magFilter = THREE.NearestFilter;
          loadedTexture.generateMipmaps = false;

          const img = loadedTexture.image;
          stateRef.current.imageResolution.set(img.width || 1000, img.height || 1000);
          stateRef.current.texture = loadedTexture;

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
              u_radius: { value: 0.38 },
              u_tilt_x: { value: 0.0 },
              u_tilt_y: { value: 0.0 },
              u_scroll_progress: { value: 0.0 },
            },
            transparent: true,
            depthTest: false,
            depthWrite: false,
          });
          stateRef.current.material = material;

          const geometry = new THREE.PlaneGeometry(2, 2);
          const mesh = new THREE.Mesh(geometry, material);
          scene.add(mesh);
          stateRef.current.mesh = mesh;

          setIsLoaded(true);
        },
        undefined,
        (err) => {
          console.error("Texture loading failed:", err);
        }
      );

      const clock = new THREE.Clock();

      const animate = () => {
        stateRef.current.animId = requestAnimationFrame(animate);

        const state = stateRef.current;
        if (!state.material || !state.renderer || !state.scene || !state.camera) return;

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        const lerpFactor = 0.12;
        const prevCurrentX = state.currentMouse.x;
        const prevCurrentY = state.currentMouse.y;

        state.currentMouse.x += (state.targetMouse.x - state.currentMouse.x) * lerpFactor;
        state.currentMouse.y += (state.targetMouse.y - state.currentMouse.y) * lerpFactor;

        const rawVelX = (state.currentMouse.x - prevCurrentX) / Math.max(delta, 0.016);
        const rawVelY = (state.currentMouse.y - prevCurrentY) / Math.max(delta, 0.016);
        state.velocity.x += (rawVelX * 0.08 - state.velocity.x) * 0.15;
        state.velocity.y += (rawVelY * 0.08 - state.velocity.y) * 0.15;

        const strengthSpeed = state.isPointerInside ? 0.08 : 0.04;
        state.currentStrength += (state.targetStrength - state.currentStrength) * strengthSpeed;

        state.tilt.x += (state.targetTilt.x - state.tilt.x) * 0.06;
        state.tilt.y += (state.targetTilt.y - state.tilt.y) * 0.06;

        // Track scroll progress for scroll pixelation and slow dissolve
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight * 0.9;
        const rawProgress = Math.min(Math.max(scrollY / heroHeight, 0.0), 1.0);
        state.scrollProgress += (rawProgress - state.scrollProgress) * 0.1;

        // Uniforms
        const uniforms = state.material.uniforms;
        uniforms.u_time.value = elapsedTime;
        uniforms.u_mouse.value.copy(state.currentMouse);
        uniforms.u_prev_mouse.value.copy(state.prevMouse);
        uniforms.u_velocity.value.copy(state.velocity);
        uniforms.u_strength.value = state.currentStrength;
        uniforms.u_tilt_x.value = state.tilt.x;
        uniforms.u_tilt_y.value = state.tilt.y;
        uniforms.u_scroll_progress.value = state.scrollProgress;

        state.prevMouse.copy(state.currentMouse);

        state.renderer.render(state.scene, state.camera);
      };

      stateRef.current.animId = requestAnimationFrame(animate);

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

        if (stateRef.current.renderer) stateRef.current.renderer.dispose();
        if (stateRef.current.texture) stateRef.current.texture.dispose();
        if (stateRef.current.material) stateRef.current.material.dispose();
      };
    } catch (e) {
      console.warn("WebGL initialization failed:", e);
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
      className={`group relative overflow-hidden select-none touch-none w-full h-full bg-transparent ${className}`}
      role="img"
      aria-label={alt}
    >
      {/* Ambient Behind Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full bg-sky-500/15 blur-3xl opacity-40 transition-opacity duration-700 group-hover:opacity-70" />

      {/* Main Minecraft Voxel WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className={`h-full w-full object-contain transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Minecraft Voxel Indicator Badge */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 rounded-full bg-black/70 px-4 py-1.5 backdrop-blur-xl border border-white/10 text-[10px] font-mono tracking-widest text-zinc-300">
        <span className="h-1.5 w-1.5 rounded-sm bg-sky-400 animate-pulse" />
        <span className="text-white font-bold">VOXEL PIXELATED</span>
        <span className="text-zinc-500 hidden sm:inline">// SCROLL TO DISSOLVE</span>
      </div>
    </div>
  );
}
