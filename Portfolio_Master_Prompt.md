# ANTIGRAVITY MASTER DEVELOPMENT PROMPT
## Interactive Personal Portfolio — Liquid B&W → Color Portrait

> **Purpose:** Build a complete, production-quality personal portfolio website whose signature interaction is a cinematic black-and-white portrait that dynamically reveals its original color through an organic, liquid-like pointer interaction.

---

## 0. EXECUTION RULES

You are acting as a **senior frontend engineer, creative developer, WebGL/GLSL engineer, interaction designer, UI/UX designer, accessibility engineer, and performance engineer**.

Build the website as a **real, working, production-quality application**, not as a static mockup.

### Non-negotiable requirements

1. Inspect the existing project before changing anything.
2. Preserve useful existing code and configuration where possible.
3. Do not blindly overwrite the project.
4. The **B&W → liquid color portrait interaction is the primary visual feature**.
5. Do not replace the liquid effect with a simple circular hover mask.
6. Prefer GPU/WebGL/GLSL rendering for the main liquid effect.
7. The site must work on desktop, tablet, and mobile.
8. Do not depend on hover for touch devices.
9. Include graceful fallbacks when WebGL or advanced effects are unavailable.
10. Keep portfolio content in configuration/data files rather than scattering personal information through components.
11. Do not invent personal experience, skills, projects, organizations, dates, awards, links, or other facts.
12. Remove placeholder content before the final build.
13. Fix implementation and visual issues instead of merely documenting them.
14. Run lint/type checks/build/tests where the existing project supports them.
15. Do not finish at the point where the page merely "works"; iterate toward a polished visual result.

---

# 1. CORE CREATIVE DIRECTION

The website should feel:

- premium
- cinematic
- editorial
- modern
- artistic
- technical
- restrained
- interactive
- intentional

It must **not** look like a generic developer portfolio.

The main visual story is:

```text
DARK CINEMATIC PAGE
        ↓
PORTRAIT APPEARS IN B&W
        ↓
POINTER APPROACHES
        ↓
CURSOR BECOMES "REVEAL"
        ↓
LIQUID COLOR BEGINS TO FLOW
        ↓
ORIGINAL COLOR PORTRAIT IS REVEALED
        ↓
MOVEMENT STRETCHES / DISTORTS THE LIQUID
        ↓
POINTER STOPS → LIQUID SETTLES
        ↓
POINTER LEAVES → COLOR DISSOLVES
        ↓
PORTRAIT RETURNS TO B&W
```

The emotional goal is:

> **"This website reacts to me."**

---

# 2. PORTRAIT SOURCE

Use **one high-resolution color portrait** as the canonical source.

Preferred path:

```text
/public/images/portrait.webp
```

The supplied portrait should ideally have:

- minimum approximately **2000 × 2500 px**
- preferably **3000+ px**
- original/high-quality source
- chest-up or waist-up framing
- clear face
- 3/4 angle facing slightly toward camera
- dark/simple background
- strong directional lighting
- simple dark clothing
- strong subject/background separation

Avoid:

- tiny headshots
- heavily compressed social-media images
- crowded rooms
- complicated backgrounds
- people behind the subject
- extreme side profiles
- weak/flat lighting

Do not create a separate manually edited grayscale image unless needed as a fallback. Generate the grayscale appearance programmatically.

---

# 3. IMAGE PIPELINE

Use this conceptual rendering pipeline:

```text
                 COLOR SOURCE
                      │
            ┌─────────┴─────────┐
            ↓                   ↓
       COLOR IMAGE         GRAYSCALE IMAGE
            │                   │
            └─────────┬─────────┘
                      ↓
              DYNAMIC LIQUID MASK
                      ↓
                 FINAL OUTPUT
```

Conceptually:

```text
FINAL =
    grayscaleImage * (1 - liquidMask)
    +
    colorImage * liquidMask
```

The grayscale image should be generated using the shader/rendering pipeline or an efficient equivalent.

---

# 4. LIQUID REVEAL — PRIMARY INTERACTION

## Required behavior

Initially:

```text
100% B&W
```

When the pointer enters the portrait:

```text
B&W + localized color reveal
```

As the pointer moves:

```text
color region follows the pointer
+
liquid boundary deforms
+
velocity affects shape
+
subtle turbulence remains active
```

When the pointer leaves:

```text
color remains briefly
→ intensity decreases
→ liquid dissolves
→ portrait returns to B&W
```

## The reveal MUST NOT be

- a simple circle
- a radial-gradient spotlight
- a hard-edged mask
- a rectangle
- a conventional CSS clip-path
- a static blob
- a cursor-sized hole showing another image

## It SHOULD look like

- liquid
- ink
- paint
- flowing light
- organic fluid
- soft irregular material
- continuously changing matter

The boundary should never look perfectly geometric.

---

# 5. WEBGL / GLSL IMPLEMENTATION

Preferred stack for the visual effect:

```text
React
Next.js
TypeScript
Three.js / React Three Fiber
GLSL shaders
```

Use the project's existing compatible stack if one already exists. Do not migrate frameworks without a strong technical reason.

For the actual liquid effect, prefer a **WebGL/GLSL shader** rather than a large collection of DOM/CSS elements.

The shader should have access to values such as:

```text
mouseX
mouseY
viewportWidth
viewportHeight
imageWidth
imageHeight
time
interactionVelocity
interactionStrength
devicePixelRatio
```

Use procedural noise to create an irregular boundary.

The mask should support:

- soft falloff
- procedural noise
- time-based deformation
- velocity-aware stretching
- smooth interpolation
- subtle turbulence
- organic edge movement

Do not excessively distort the person's face.

---

# 6. LIQUID PHYSICS / MOTION

The reveal must not teleport directly to the pointer.

Use smooth interpolation, spring-like motion, or equivalent lightweight physics.

Required qualities:

- inertia
- slight delay
- smooth acceleration
- smooth deceleration
- velocity influence
- subtle turbulence
- controlled settling

When the pointer moves quickly:

- stretch the liquid slightly in the direction of travel
- allow a small trailing region
- increase deformation subtly

When the pointer stops:

- reduce velocity
- allow the liquid to settle
- retain subtle low-amplitude motion

Do not make the effect noisy or distracting.

---

# 7. COLOR DISSOLVE

On pointer exit:

1. Do not instantly remove the color.
2. Retain the current liquid state for a short moment.
3. Gradually reduce reveal strength.
4. Let the liquid boundary collapse/dissolve naturally.
5. Return smoothly to full grayscale.

The transition should feel physical rather than like a CSS toggle.

---

# 8. PORTRAIT MOTION

Add only a **very subtle** secondary parallax/depth response.

Possible range:

- approximately 1–3 px translation
- tiny rotation
- subtle depth displacement

The face must remain stable and recognizable.

Do not turn the portrait into a constantly moving 3D object.

---

# 9. CUSTOM CURSOR

On devices with a precise pointer, replace the default cursor with a custom cursor.

### Cursor structure

Include:

- small center point
- soft outer ring
- state label
- smooth interpolation
- optional subtle trailing motion

### Cursor states

| Context | Label |
|---|---|
| Default | `EXPLORE` |
| Portrait | `REVEAL` |
| Project | `VIEW` |
| Navigation | `OPEN` |
| External link | `VISIT` |

The cursor must be:

- smooth
- lightweight
- readable
- restrained
- never oversized
- never blocking important content

The custom cursor and liquid reveal must feel like **one interaction system**.

---

# 10. HERO CURSOR INTERACTION

When the pointer enters the portrait:

```text
cursor state = REVEAL
```

The liquid reveal should originate around the actual pointer position.

Example conceptual state:

```text
       ◉
     REVEAL
```

When the pointer moves, both systems respond coherently:

```text
CURSOR
   ↓
LIQUID FIELD
   ↓
COLOR REVEAL
```

---

# 11. HERO LAYOUT

Create a full-screen hero:

```css
min-height: 100svh;
```

Use a dark, sophisticated visual language.

Suggested structure:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ARIAN                         WORK   ABOUT   EXPERIENCE     │
│                                                             │
│                                                             │
│        M. SAKIB                                             │
│        SADMAN ARIAN                    [ PORTRAIT ]          │
│                                                             │
│        CREATIVE DEVELOPER                                   │
│        I build intelligent systems,                          │
│        interactive experiences,                              │
│        and thoughtful digital products.                      │
│                                                             │
│        [ EXPLORE WORK ]                         SCROLL ↓     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

This is a structural direction, not a requirement to copy the exact ASCII layout.

The portrait should be an **interactive visual object**, not a passive image sitting in a card.

---

# 12. VISUAL LANGUAGE

Prefer:

- near-black background
- subtle grain/noise
- restrained typography
- large editorial type
- generous whitespace
- thin hairline borders
- subtle shadows
- very subtle blur
- controlled micro-interactions

Avoid:

- excessive gradients
- generic glassmorphism
- excessive rounded cards
- neon cyberpunk styling
- huge animated backgrounds
- random 3D objects
- excessive particles
- decorative effects with no purpose

The portrait interaction is the hero. Everything else supports it.

---

# 13. PERSONAL IDENTITY

Use:

```text
M. SAKIB SADMAN ARIAN
```

Preferred role:

```text
CREATIVE DEVELOPER
```

Alternative only if the actual portfolio content requires it:

```text
SOFTWARE ENGINEER
```

Suggested supporting statement:

```text
Building intelligent systems, interactive experiences, and thoughtful digital products.
```

Keep all personal text editable through the portfolio data/configuration layer.

Do not duplicate personal information across components.

---

# 14. TYPOGRAPHY

Use a premium modern type system.

Possible display families:

- Inter Tight
- Space Grotesk
- Satoshi
- Geist

Possible body families:

- Inter
- Geist

Choose a consistent combination based on availability/licensing and project setup.

Typography should feel **editorial**, not corporate.

Use strong hierarchy:

```text
M. SAKIB
SADMAN ARIAN
```

The name should be visually dominant.

---

# 15. NAVIGATION

Create minimal navigation such as:

```text
[ ARIAN ]

WORK
ABOUT
EXPERIENCE
CONTACT
```

Requirements:

- lightweight
- responsive
- semantic
- keyboard accessible
- subtle hover/focus motion
- custom cursor integration on pointer devices

---

# 16. SCROLL INDICATOR

Add a subtle hero scroll indicator:

```text
SCROLL
  ↓
```

Animate slowly and unobtrusively.

---

# 17. PROJECT SECTION

After the hero, create a premium editorial project showcase.

Do **not** use a generic grid of small cards as the primary presentation.

Prefer large project entries.

Each project may contain:

```text
PROJECT NUMBER
PROJECT NAME
DESCRIPTION
TECHNOLOGY
YEAR
IMAGE
LINK
```

Example structure:

```text
01

SEASONALITY-AWARE
DEMAND FORECASTING

Machine learning research and explainable forecasting system.

Python / XGBoost / SHAP
```

Only include projects actually supplied by the portfolio data.

---

# 18. PROJECT INTERACTION

On project hover:

- project image moves slightly
- title shifts slightly
- cursor becomes `VIEW`
- arrow/indicator may appear
- transition remains smooth

Avoid excessive animation.

---

# 19. ABOUT SECTION

Create an elegant editorial About section.

Possible content:

- short introduction
- skills
- research interests
- technical interests

Keep the section concise and readable.

Do not invent biography details.

---

# 20. SKILLS

Use configurable categories.

Possible categories:

### DEVELOPMENT

- C#
- C++
- Java
- Python
- JavaScript
- TypeScript

### WEB

- React
- Next.js
- Node.js

### AI / ML

- Machine Learning
- Explainable AI
- Data Analysis
- Predictive Modeling

### TOOLS

- Git
- Docker
- Figma
- Adobe Creative Cloud

**Important:** these are examples only. Do not claim a skill unless it exists in the supplied portfolio content.

---

# 21. EXPERIENCE

If experience data exists, present it as a clean editorial timeline.

Each item:

```text
YEAR
ROLE
ORGANIZATION
DESCRIPTION
```

Use subtle scroll reveal animation.

Do not fabricate missing experience.

---

# 22. CONTACT

Create a strong final section.

Suggested headline:

```text
LET'S BUILD
SOMETHING
INTERESTING.
```

Include only verified/configured:

- email
- LinkedIn
- GitHub
- other relevant links

External links should have appropriate accessible labels and `target`/security handling where applicable.

---

# 23. FOOTER

Keep the footer minimal.

Include:

```text
M. SAKIB SADMAN ARIAN
© CURRENT YEAR
SOCIAL LINKS
```

Location is optional and must not be invented.

---

# 24. RESPONSIVE DESIGN

Test at minimum:

```text
360px
390px
414px
768px
1024px
1280px
1440px
1920px
2560px
```

The layout must remain stable at all sizes.

### Desktop

- large portrait
- large typography
- custom cursor
- full liquid interaction

### Tablet

- reduced typography
- preserved interaction where pointer input exists

### Mobile

Do not depend on hover.

Use Pointer Events and support:

- touch position
- touch movement
- tap-and-drag
- pointer down/up
- pointer enter/leave where supported

Dragging across the portrait should reveal color.

---

# 25. POINTER EVENT ARCHITECTURE

Prefer a unified pointer system.

Support:

```text
pointermove
pointerdown
pointerup
pointerenter
pointerleave
```

Use:

```text
pointerType
```

to distinguish:

```text
mouse
touch
pen
```

Choose interaction behavior appropriate to the input device.

---

# 26. ACCESSIBILITY

The visual interaction must never be the only way to understand the website.

Implement:

- semantic HTML
- meaningful image alt text
- keyboard navigation
- visible focus states
- sufficient contrast
- accessible links/buttons
- reduced-motion support

Respect:

```text
prefers-reduced-motion
```

When reduced motion is enabled:

- disable heavy liquid animation
- disable cursor trails
- simplify transitions
- retain the B&W → color concept with a simpler, low-motion interaction

Do not hide important information behind hover-only interactions.

---

# 27. PERFORMANCE

Performance is a first-class requirement.

Avoid:

- excessive DOM nodes
- unnecessary React re-renders
- repeatedly allocating objects inside animation loops
- CPU-heavy per-frame image processing
- unnecessarily huge canvas resolution
- memory leaks
- unbounded animation work

Prefer:

- GPU shaders
- `requestAnimationFrame`
- interpolation
- memoization where appropriate
- stable references
- correct cleanup
- capped device pixel ratio
- adaptive rendering quality

Suggested DPR limits:

```text
Desktop: ~2 maximum
Mobile:  ~1.5 maximum
```

Adjust based on actual performance rather than treating these values as absolute.

---

# 28. IMAGE OPTIMIZATION

Prefer:

```text
WebP
AVIF
```

Do not directly load an unnecessarily large multi-megabyte camera original into the browser.

Use:

- responsive image sizing
- optimized dimensions
- lazy loading for below-the-fold project images
- appropriate preloading for the hero portrait when beneficial

Do not sacrifice visible hero quality unnecessarily.

---

# 29. LOADING EXPERIENCE

Do not show an unexplained blank screen while the portrait loads.

Use a restrained loading sequence if needed:

```text
BLACK
  ↓
ARIAN
  ↓
PORTRAIT FADE-IN
  ↓
INTERACTION READY
```

Keep the intro short.

Do not create a long cinematic intro that delays access to the actual portfolio.

---

# 30. WEBGL FALLBACK

Detect WebGL/rendering failures gracefully.

If WebGL is unavailable, provide a CSS/DOM fallback that still communicates:

```text
B&W portrait
+
soft color reveal
+
pointer/touch interaction
```

The site must not display a broken canvas or blank portrait.

---

# 31. ERROR HANDLING

Gracefully handle:

- missing image
- image loading failure
- shader compilation failure
- WebGL unavailable
- font loading failure
- partial JavaScript failure

Fallback behavior should preserve the site's usability and visual hierarchy.

---

# 32. ARCHITECTURE

Use a clean modular structure similar to:

```text
src/
├── app/
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   ├── LiquidPortrait.tsx
│   │   └── CustomCursor.tsx
│   │
│   ├── Navigation/
│   │   └── Navigation.tsx
│   │
│   ├── Projects/
│   │   ├── Projects.tsx
│   │   └── ProjectItem.tsx
│   │
│   ├── About/
│   │   └── About.tsx
│   │
│   ├── Experience/
│   │   └── Experience.tsx
│   │
│   ├── Contact/
│   │   └── Contact.tsx
│   │
│   └── Footer/
│       └── Footer.tsx
│
├── shaders/
│   ├── liquidReveal.vert
│   └── liquidReveal.frag
│
├── data/
│   └── portfolio.ts
│
└── styles/
    └── globals.css

public/
├── images/
│   └── portrait.webp
└── projects/
```

Adapt this to the existing repository rather than forcing the exact structure.

---

# 33. COMPONENT PRINCIPLES

Keep components:

- modular
- reusable
- testable
- understandable

The following should be independently reusable:

```text
LiquidPortrait
CustomCursor
ProjectItem
Navigation
```

Do not create one giant page component containing the entire application.

---

# 34. PORTFOLIO DATA CONFIGURATION

Create a centralized configuration/data module, for example:

```text
src/data/portfolio.ts
```

Store:

```text
name
role
description
portrait
projects
skills
experience
socialLinks
contact
metadata
```

Components should consume this data.

The user should be able to update portfolio content without changing interaction logic.

---

# 35. ANIMATION SYSTEM

Use a consistent animation language.

Prefer:

- ease-out
- spring-like interpolation
- smooth interpolation
- controlled duration
- small movement distances

Avoid:

- robotic linear motion
- excessive bouncing
- large rotations
- unnecessary scaling
- animation on every element

The entire website should feel fluid and restrained.

---

# 36. SCROLL ANIMATIONS

Use scroll-triggered reveals selectively.

Possible effects:

- fade
- translate
- clip reveal
- text reveal

Do not animate every element independently.

Prioritize:

1. performance
2. readability
3. hierarchy
4. consistency

---

# 37. SEO / METADATA

Implement:

- title
- description
- Open Graph metadata
- social sharing metadata
- favicon
- semantic headings

Example title:

```text
M. Sakib Sadman Arian — Creative Developer
```

Do not leave framework-generated placeholder metadata in the production build.

---

# 38. BROWSER / DEVICE TESTING

Test:

```text
Chrome
Edge
Firefox
Safari
```

Test with:

```text
desktop mouse
trackpad
touch
pen where available
keyboard
```

Test:

```text
WebGL enabled
WebGL unavailable
reduced motion enabled
slow network
small screen
large screen
```

Verify that the visual effect does not cause unacceptable frame drops.

---

# 39. DEVELOPMENT PROCESS

Follow this order.

## Phase 1 — Inspect

1. Inspect repository structure.
2. Identify framework.
3. Identify package manager.
4. Inspect existing dependencies.
5. Inspect existing design/assets.
6. Identify what can be preserved.
7. Identify missing requirements.

## Phase 2 — Plan

1. Define component architecture.
2. Define data model.
3. Define image loading strategy.
4. Define liquid shader architecture.
5. Define cursor state machine.
6. Define responsive behavior.
7. Define WebGL fallback.
8. Define accessibility behavior.

## Phase 3 — Build the signature interaction first

1. Load portrait.
2. Render grayscale.
3. Render color source.
4. Implement liquid mask.
5. Add procedural noise.
6. Add pointer coordinates.
7. Add velocity.
8. Add interpolation.
9. Add pointer enter/leave.
10. Add dissolve.
11. Add WebGL fallback.
12. Test performance.

Do not build the rest of the portfolio until this interaction is visually convincing.

## Phase 4 — Build the page

1. Hero.
2. Navigation.
3. Projects.
4. About.
5. Skills.
6. Experience.
7. Contact.
8. Footer.

## Phase 5 — Polish

1. Typography.
2. Spacing.
3. Micro-interactions.
4. Cursor states.
5. Scroll transitions.
6. Responsive behavior.
7. Accessibility.
8. Loading states.
9. Error states.

## Phase 6 — Validate

1. Type check.
2. Lint.
3. Build.
4. Test routes.
5. Test responsive sizes.
6. Test WebGL failure.
7. Test reduced motion.
8. Test keyboard navigation.
9. Check console for errors.
10. Fix all discovered issues.

---

# 40. IMPORTANT QUALITY REQUIREMENT

Do not stop at:

> "The effect technically works."

Iterate until the result is visually convincing.

The portrait interaction should feel like:

> **ink / liquid / paint / light flowing over a photograph**

It should never feel like:

> **a mouse circle revealing another image**

The face must remain recognizable and visually important.

The liquid boundary should be:

- irregular
- soft
- animated
- responsive
- velocity-aware
- organic

---

# 41. DESIGN ANTI-PATTERNS

Do NOT produce:

- generic Bootstrap portfolio
- generic developer dashboard
- template-like hero
- excessive cards
- excessive rounded containers
- excessive glassmorphism
- neon cyberpunk aesthetic
- random purple gradients
- huge particle backgrounds
- unnecessary 3D objects
- distracting cursor effects
- overly aggressive image distortion
- hover-only mobile interaction

---

# 42. ACCEPTANCE CRITERIA

The implementation is complete only when all applicable criteria below are satisfied.

### Visual

- [ ] Hero feels premium and cinematic.
- [ ] Portrait begins in B&W.
- [ ] Color reveal is genuinely liquid/organic.
- [ ] Reveal follows pointer smoothly.
- [ ] Velocity affects the liquid subtly.
- [ ] Color dissolves smoothly after exit.
- [ ] Face remains recognizable.
- [ ] Cursor states are clear and polished.
- [ ] Typography has strong hierarchy.
- [ ] No generic portfolio-template appearance.

### Technical

- [ ] TypeScript is clean.
- [ ] No avoidable console errors.
- [ ] Production build succeeds.
- [ ] Animation loops are cleaned up correctly.
- [ ] DPR is controlled.
- [ ] Rendering work is GPU-friendly.
- [ ] No unnecessary React re-renders.
- [ ] WebGL failure is handled.
- [ ] Image loading failure is handled.

### Responsive

- [ ] 360px works.
- [ ] 390px works.
- [ ] 414px works.
- [ ] 768px works.
- [ ] 1024px works.
- [ ] 1280px works.
- [ ] 1440px works.
- [ ] 1920px works.
- [ ] 2560px works.
- [ ] Touch interaction works.
- [ ] No mobile hover dependency.

### Accessibility

- [ ] Semantic structure.
- [ ] Keyboard navigation.
- [ ] Visible focus states.
- [ ] Meaningful alt text.
- [ ] Good contrast.
- [ ] Reduced-motion support.
- [ ] Important information is available without the visual effect.

---

# 43. FINAL DELIVERABLE

Deliver a complete working portfolio website that is:

- production-ready
- responsive
- accessible
- optimized
- maintainable
- visually polished
- interactive
- original
- fast

The signature interaction must remain:

```text
BLACK & WHITE PORTRAIT
        +
LIQUID POINTER REVEAL
        =
ORIGINAL COLOR PORTRAIT
```

Do not simplify this into a conventional hover effect.

---

# 44. FINAL AGENT INSTRUCTION

Before declaring completion, inspect the result as if you were a senior creative director and senior frontend engineer.

Ask:

1. Does the portrait immediately communicate the site's identity?
2. Does the liquid reveal look genuinely organic?
3. Does the cursor feel connected to the liquid?
4. Does the effect feel smooth rather than gimmicky?
5. Does the face remain clear?
6. Does the site still feel excellent without WebGL?
7. Does the experience work on touch?
8. Does reduced motion work?
9. Are there console/build errors?
10. Does the page look intentionally designed rather than template-generated?

If any answer is "no", fix the implementation before finishing.

**Build the complete experience.**
