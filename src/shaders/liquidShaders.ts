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
  uniform float u_edge_softness;
  uniform float u_tilt_x;
  uniform float u_tilt_y;

  varying vec2 vUv;

  // 2D Random
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // 2D Simplex-like Value Noise
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractal Brownian Motion (fBm) with domain warping
  float fbm(vec2 st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
    for (int i = 0; i < 4; ++i) {
      v += a * noise(st);
      st = rot * st * 2.0 + shift;
      a *= 0.5;
    }
    return v;
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
    vec2 aspectUv = vUv;
    aspectUv.x *= aspect;

    vec2 aspectMouse = u_mouse;
    aspectMouse.x *= aspect;

    // 3D Depth Map Volumetric Estimation (Lando Norris 3D Depth Effect)
    // Initial sample to compute foreground depth
    vec2 rawImgUv = getCoverUv(vUv, u_resolution, u_image_resolution);
    vec4 rawColor = texture2D(u_texture, clamp(rawImgUv, 0.0, 1.0));
    float rawLum = dot(rawColor.rgb, vec3(0.299, 0.587, 0.114));

    // Foreground subject depth estimation: subject center + face luminance
    float centerDist = length((vUv - vec2(0.5, 0.45)) * vec2(1.0, 1.2));
    float subjectMask = 1.0 - smoothstep(0.1, 0.55, centerDist);
    float estimatedDepth = smoothstep(0.05, 0.5, rawLum) * subjectMask;

    // Apply volumetric 3D parallax displacement
    vec2 depthDisplacement = vec2(u_tilt_x, u_tilt_y) * (estimatedDepth * 0.022 + 0.005);
    vec2 baseUv = vUv + depthDisplacement;

    // Final Cover-fit texture coordinate
    vec2 imgUv = getCoverUv(baseUv, u_resolution, u_image_resolution);
    imgUv = clamp(imgUv, 0.0, 1.0);

    // Sample color source texture with depth parallax
    vec4 colorTex = texture2D(u_texture, imgUv);

    // High quality grayscale conversion with cinematic contrast curve
    float luminance = dot(colorTex.rgb, vec3(0.299, 0.587, 0.114));
    float contrastLuminance = pow(luminance, 1.15) * 1.05;
    vec3 bwColor = vec3(clamp(contrastLuminance, 0.0, 1.0));

    // Liquid Fluid Simulation Math
    vec2 vel = u_velocity * 0.4;
    float speed = length(vel);
    vec2 velDir = speed > 0.0001 ? normalize(vel) : vec2(0.0);

    // Domain warped noise for fluid distortion
    vec2 noiseCoord = aspectUv * 3.5 + vec2(u_time * 0.25, u_time * 0.18);
    float q = fbm(noiseCoord);
    vec2 r = vec2(
      fbm(noiseCoord + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time),
      fbm(noiseCoord + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time)
    );
    float fluidNoise = fbm(noiseCoord + 4.0 * r);

    // Distance from pointer with velocity elongation
    vec2 toMouse = aspectUv - aspectMouse;
    float parallelDist = dot(toMouse, velDir);
    vec2 perpDist = toMouse - velDir * parallelDist;
    float stretchFactor = 1.0 + clamp(speed * 3.5, 0.0, 1.5);
    vec2 deformedDistVec = perpDist + (velDir * parallelDist) / stretchFactor;
    
    float dist = length(deformedDistVec);

    // Fluid boundary perturbation
    float noisePerturbation = (fluidNoise - 0.5) * (0.18 + speed * 0.15);
    float effectiveDist = dist + noisePerturbation;

    // Organic liquid reveal mask
    float dynamicRadius = u_radius * (0.85 + 0.3 * sin(u_time * 1.5 + fluidNoise * 6.28));
    float mask = 1.0 - smoothstep(dynamicRadius - u_edge_softness, dynamicRadius + u_edge_softness, effectiveDist);

    float revealAmount = clamp(mask * u_strength, 0.0, 1.0);

    // Fluid edge chromatic refraction / edge shimmer highlight
    float edgeThreshold = smoothstep(0.05, 0.3, revealAmount) * (1.0 - smoothstep(0.65, 0.95, revealAmount));
    vec3 fluidEdgeHighlight = vec3(0.12, 0.22, 0.35) * edgeThreshold * u_strength * 1.2;

    // Subtle chromatic aberration on color reveal boundary
    vec2 chromaticShift = (r - 0.5) * 0.008 * edgeThreshold;
    vec4 redChannel = texture2D(u_texture, imgUv + chromaticShift);
    vec4 blueChannel = texture2D(u_texture, imgUv - chromaticShift);
    vec3 dispersedColor = vec3(redChannel.r, colorTex.g, blueChannel.b);

    // Blend: Grayscale -> Dispersed Color with Fluid Highlight
    vec3 finalColor = mix(bwColor, dispersedColor, revealAmount) + fluidEdgeHighlight;

    // Subtle vignette around edges
    vec2 vigUv = (vUv - 0.5) * vec2(aspect, 1.0);
    float vig = 1.0 - smoothstep(0.7, 1.4, length(vigUv));
    finalColor *= (0.85 + 0.15 * vig);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
