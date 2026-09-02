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
  uniform float u_scroll_progress;

  varying vec2 vUv;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // Object-fit contain logic so subject is NEVER cropped at any zoom level or screen aspect
  vec2 getContainUv(vec2 uv, vec2 screenRes, vec2 imgRes) {
    float screenAspect = screenRes.x / screenRes.y;
    float imgAspect = imgRes.x / imgRes.y;

    vec2 newUv = uv;
    if (screenAspect > imgAspect) {
      // Screen is wider than image: fit height, center width
      float scale = imgAspect / screenAspect;
      newUv.x = (uv.x - 0.5) / scale + 0.5;
    } else {
      // Screen is taller than image: fit width, center height
      float scale = screenAspect / imgAspect;
      newUv.y = (uv.y - 0.5) / scale + 0.5;
    }
    return newUv;
  }

  void main() {
    float aspect = u_resolution.x / u_resolution.y;

    // 1. Dynamic Zoom-Proof Minecraft Voxel Grid
    float scrollPixelFactor = pow(clamp(u_scroll_progress, 0.0, 1.0), 1.2);
    float baseGrid = mix(120.0, 16.0, scrollPixelFactor);

    // Subtle 3D volumetric parallax
    vec2 tiltOffset = vec2(u_tilt_x, u_tilt_y) * 0.012 * (1.0 - scrollPixelFactor);
    vec2 parallaxUv = vUv + tiltOffset;

    // Snapped voxel coordinates
    vec2 gridCount = vec2(baseGrid * aspect, baseGrid);
    vec2 pixelatedUv = floor(parallaxUv * gridCount) / gridCount;

    // 2. Sample texture with zero-cropping contain UV
    vec2 imgUv = getContainUv(pixelatedUv, u_resolution, u_image_resolution);

    // If UV is outside the contained texture bounds, discard gracefully
    if (imgUv.x < 0.0 || imgUv.x > 1.0 || imgUv.y < 0.0 || imgUv.y > 1.0) {
      discard;
    }

    vec4 colorTex = texture2D(u_texture, imgUv);

    // 3. Remove pure black background without clipping the subject
    float lum = dot(colorTex.rgb, vec3(0.299, 0.587, 0.114));
    float bgAlpha = smoothstep(0.012, 0.065, lum);

    if (bgAlpha < 0.01) {
      discard;
    }

    // High quality B&W conversion
    float contrastLum = pow(lum, 1.12) * 1.05;
    vec3 bwColor = vec3(clamp(contrastLum, 0.0, 1.0));

    // 4. Interactive Minecraft Voxel Color Reveal
    vec2 aspectPixelUv = pixelatedUv;
    aspectPixelUv.x *= aspect;

    vec2 aspectMouse = u_mouse;
    aspectMouse.x *= aspect;

    float distToMouse = length(aspectPixelUv - aspectMouse);
    float voxelNoise = (random(pixelatedUv) - 0.5) * 0.05;
    float effectiveDist = distToMouse + voxelNoise;

    float revealMask = 1.0 - smoothstep(u_radius - 0.15, u_radius + 0.15, effectiveDist);
    float revealAmount = clamp(revealMask * u_strength, 0.0, 1.0);

    // Minecraft voxel outline glow
    vec2 blockCoord = fract(parallaxUv * gridCount);
    float gridEdge = step(0.93, blockCoord.x) + step(0.93, blockCoord.y);
    vec3 blockBorderGlow = vec3(0.22, 0.74, 0.97) * gridEdge * 0.12 * revealAmount;

    vec3 finalColor = mix(bwColor, colorTex.rgb, revealAmount) + blockBorderGlow;

    // 5. Scroll Dissolve
    float scrollFade = 1.0 - smoothstep(0.12, 0.85, u_scroll_progress);
    float finalAlpha = bgAlpha * scrollFade;

    // Gentle bottom fade
    float bottomFade = smoothstep(0.0, 0.15, vUv.y);
    finalAlpha *= bottomFade;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;
