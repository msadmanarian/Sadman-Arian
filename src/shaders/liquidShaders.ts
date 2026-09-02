export const liquidVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const liquidFragmentShader = /* glsl */ `
  uniform sampler2D u_texture;
  uniform vec2 u_resolution;
  uniform vec2 u_image_resolution;
  uniform vec2 u_mouse;
  uniform vec2 u_prev_mouse;
  uniform vec2 u_velocity;
  uniform float u_time;
  uniform float u_strength;
  uniform float u_radius;
  uniform float u_tilt_x;
  uniform float u_tilt_y;
  uniform float u_scroll_progress; // 0.0 at top -> 1.0 scrolled down

  varying vec2 vUv;

  // 2D Random
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // Calculate object-fit: cover texture coordinates
  vec2 getCoverUv(vec2 uv, vec2 screenRes, vec2 imgRes) {
    float screenAspect = screenRes.x / screenRes.y;
    float imgAspect = imgRes.x / imgRes.y;

    vec2 newUv = uv;
    if (screenAspect > imgAspect) {
      float scale = screenAspect / imgAspect;
      newUv.y = (uv.y - 0.5) * scale + 0.5;
    } else {
      float scale = imgAspect / screenAspect;
      newUv.x = (uv.x - 0.5) * scale + 0.5;
    }
    return newUv;
  }

  void main() {
    float aspect = u_resolution.x / u_resolution.y;

    // 1. Minecraft Pixelation Grid Calculation
    // Base resolution: ~140 blocks across. On scroll down, pixelate progressively down to 12 chunky blocks!
    float scrollPixelFactor = pow(clamp(u_scroll_progress, 0.0, 1.0), 1.3);
    float baseGrid = mix(140.0, 14.0, scrollPixelFactor);
    
    // Zoom magnification on portrait
    vec2 centeredUv = (vUv - vec2(0.5, 0.45)) * 0.85 + vec2(0.5, 0.45);

    // Volumetric 3D Parallax tilt
    vec2 tiltOffset = vec2(u_tilt_x, u_tilt_y) * 0.015 * (1.0 - scrollPixelFactor);
    vec2 parallaxUv = centeredUv + tiltOffset;

    // Apply Minecraft Voxel Grid Snapping
    vec2 gridCount = vec2(baseGrid * aspect, baseGrid);
    vec2 pixelatedUv = floor(parallaxUv * gridCount) / gridCount;

    // Cover-fit image UV
    vec2 imgUv = getCoverUv(pixelatedUv, u_resolution, u_image_resolution);
    imgUv = clamp(imgUv, 0.0, 1.0);

    // Sample portrait image
    vec4 colorTex = texture2D(u_texture, imgUv);

    // 2. Remove Dark Background (Chroma-Alpha punchout)
    float lum = dot(colorTex.rgb, vec3(0.299, 0.587, 0.114));
    // Soft cutoff for black backdrop
    float bgAlpha = smoothstep(0.015, 0.08, lum);

    if (bgAlpha < 0.01) {
      discard;
    }

    // High quality B&W conversion
    float contrastLum = pow(lum, 1.15) * 1.08;
    vec3 bwColor = vec3(clamp(contrastLum, 0.0, 1.0));

    // 3. Minecraft Pixelated Color Reveal Interaction
    vec2 aspectPixelUv = pixelatedUv;
    aspectPixelUv.x *= aspect;

    vec2 aspectMouse = u_mouse;
    aspectMouse.x *= aspect;

    float distToMouse = length(aspectPixelUv - aspectMouse);

    // Organic voxel threshold
    float voxelNoise = (random(pixelatedUv) - 0.5) * 0.06;
    float effectiveDist = distToMouse + voxelNoise;

    float revealMask = 1.0 - smoothstep(u_radius - 0.12, u_radius + 0.12, effectiveDist);
    float revealAmount = clamp(revealMask * u_strength, 0.0, 1.0);

    // Voxel edge highlight (Minecraft block outline glow on reveal)
    vec2 blockCoord = fract(parallaxUv * gridCount);
    float gridEdge = step(0.92, blockCoord.x) + step(0.92, blockCoord.y);
    vec3 blockBorderGlow = vec3(0.22, 0.74, 0.97) * gridEdge * 0.15 * revealAmount;

    // Blend: Grayscale Voxel -> Minecraft Full Color Voxel
    vec3 finalColor = mix(bwColor, colorTex.rgb, revealAmount) + blockBorderGlow;

    // 4. Scroll Dissolve: Slowly lose opacity & fade out as user scrolls
    float scrollFade = 1.0 - smoothstep(0.15, 0.85, u_scroll_progress);
    float finalAlpha = bgAlpha * scrollFade;

    // Bottom gradient soft fade
    float bottomFade = smoothstep(0.0, 0.25, vUv.y);
    finalAlpha *= bottomFade;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;
