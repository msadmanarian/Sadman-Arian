# ANTIGRAVITY MASTER DEVELOPMENT PROMPT — UPDATE V1.0
## Global Backdrop Layer · Sitewide Hover System · Scroll Flow Spine · New Feature Directions

> **Relationship to the original prompt:** this document is an **addendum**, not a replacement. It continues section numbering from `ANTIGRAVITY MASTER DEVELOPMENT PROMPT` (which ends at §44). Read the two files together. Everything in §0–§44 still applies in full.

---

# 45. UPDATE SCOPE & NON-NEGOTIABLE RULES (v1.0)

## What this update adds

1. A background-image layer system that sits **behind every section component**, site-wide.
2. A **sitewide hover/interaction system** — the hero's cursor logic extended to the whole site.
3. A scroll-linked **"Flow Spine"** — a long connecting line that draws itself as the page is scrolled, carrying a **wind-flow** light effect.
4. A set of **optional new feature directions** to make the portfolio feel more complete and detailed.

## Rules carried forward (do not renegotiate these)

1. The **B&W → liquid color portrait remains the primary visual feature** of the site. Nothing added here may compete with it, sit in front of it, or slow it down.
2. Inspect the current, working implementation before touching anything. Preserve it.
3. This is additive. Do not rebuild existing components — wrap, extend, or layer them.
4. Do not invent personal experience, skills, projects, research, or credentials anywhere in this update either — see §49 for how this applies to new feature ideas specifically.
5. Every new effect must degrade gracefully: no WebGL → simplified fallback; `prefers-reduced-motion` → static/low-motion version; touch → no hover-dependent logic.
6. If a new effect and performance ever conflict, performance wins. A 60fps site with a slightly quieter effect beats a janky showcase.

## Note on interpretation

One instruction in the request was **"a lambo structure after scrolling."** This is read here as **লম্বা (lomba)** — "long / tall" — i.e. a long structure that extends as the page scrolls. §48 below ("Flow Spine") is built on that reading, paired with the requested "wind flow effect with scroll." If a different meaning was intended, redirect §48 only — the rest of this update stands independently.

---

# 46. GLOBAL BACKGROUND IMAGE LAYER SYSTEM

## Intent

Every section — not just the hero — can carry a background image sitting **strictly behind** its content. The image supports the mood; it never competes for attention, and it never replaces or blocks the components that are already built.

## Layering order (applies per section)

```text
z-index: 10   content — text, buttons, nav, project entries
z-index: 5    hero liquid portrait canvas (hero section only — untouched by this update)
z-index: 0    SectionBackdrop image (new)
z-index: -1   page-level base background / grain (existing)
```

## Structure

Introduce one small wrapper, not a rewrite of every section:

```text
<SectionBackdrop image={...} tone="duotone|blurred|dim" parallax={boolean}>
  <ExistingSectionComponent />   ← unchanged
</SectionBackdrop>
```

`SectionBackdrop` is purely a layout/visual wrapper. It knows nothing about section content and injects nothing into the DOM flow that content depends on.

## Visual treatment — non-negotiable

- Low presence: roughly 4–12% opacity, or heavy blur + desaturation, or a duotone matched to the near-black palette. Never full-strength, full-color imagery.
- Never sharper, brighter, or more saturated than the foreground content sitting on top of it.
- Optional parallax drift limited to a few pixels, same restrained motion language as §35 of the master prompt.
- No image behind the hero portrait itself — that region stays clean, as originally specified.
- If a section has no image supplied, render nothing. No stock-photo fallback, no placeholder texture.

## Technical requirements

- Lazy-load every backdrop image; only the hero-adjacent one (if any) may preload.
- Use WebP/AVIF per §28 of the master prompt.
- `alt=""` / `aria-hidden="true"` — these are decorative, never informational.
- Backdrops must not shift layout (reserve space, avoid CLS).

## Explicitly forbidden here

- Glassmorphism panels, large particle fields, or anything already banned in §41.
- A background image that, at any breakpoint, makes text harder to read than it currently is.

---

# 47. SITEWIDE HOVER / MAGNETIC INTERACTION SYSTEM

## Intent

The custom cursor and state labels (`EXPLORE`, `REVEAL`, `VIEW`, `OPEN`, `VISIT`) currently live mostly around the hero. Extend that same interaction language to the **entire site** so it feels alive everywhere, not just in one hero moment.

## Minimum coverage

- Navigation links
- Primary buttons / CTAs (e.g. `EXPLORE WORK`, contact CTA)
- Project entries
- Skill tags/chips
- Experience timeline items
- Footer and social links
- Any inline link-style text

## Response — pick at most two per element, never stack all of them

| Effect | Description |
|---|---|
| Magnetic pull | Element (or its label) shifts a few px toward the pointer inside a bounded radius, springs back on leave |
| Underline draw | A thin line reveals from one edge, using the same easing as the liquid settle in §6 |
| Cursor label swap | Reuse existing states; extend only where genuinely needed (e.g. `TAG` for skill chips) |
| Weight/opacity shift | Nearby text gains slight emphasis, no color change |

**Do not add:** bounce, scale-pop, rotation, glow, or color shifts — these are already ruled out by §41's anti-patterns and would fight the site's restrained language.

## Shared physics

Reuse the interpolation/spring model from the liquid reveal (§6), not a second, differently-tuned easing system. The whole site should read as one motion language, hero included.

## Device handling (unchanged principle, now applied sitewide)

- **Pointer-fine (mouse/trackpad):** full magnetic + cursor-state system.
- **Touch:** replace with a brief press/tap ripple. Never gate information or navigation behind hover, per §24/§26.
- **Keyboard:** every hover state has a matching `:focus-visible` state, equally visible.

## Performance

One shared pointer-position source feeding a lightweight magnetic hook — not a separate listener per element. This keeps the sitewide system from reintroducing the re-render problem §27 already warns against.

---

# 48. SCROLL FLOW SPINE + WIND FLOW EFFECT

*(See the interpretation note in §45 before implementing this section.)*

## Intent

A single long line — the **Flow Spine** — runs down through the page and visually threads the sections together, rather than leaving them as isolated blocks. As the user scrolls, the spine draws itself and carries a soft "wind" of light along its length.

## Path

```text
HERO
 │
 ├─ node — WORK
 │
 ├─ node — ABOUT
 │
 ├─ node — SKILLS / EXPERIENCE
 │
 ├─ node — CONTACT
 │
 └─ fades into FOOTER
```

The spine can run centered, or offset to one side (e.g. tracking the editorial margin) — whichever keeps it out of the way of text at every breakpoint.

## Growth behavior

- Not fully visible on load. It draws progressively as scroll position moves through the page (`stroke-dashoffset` or an equivalent clip technique, driven by scroll progress `0 → 1` across total page height).
- A small node appears on the spine as each section enters view — a marker, not decoration for its own sake.
- The spine never runs ahead of scroll position and never "auto-plays."

## Wind flow effect

- A small number of soft, blurred light streaks travel along the *already-drawn* portion of the spine.
- **Direction/speed follow scroll:** scrolling down sends streaks downward and faster; scrolling up reverses them; an idle page keeps a slow ambient drift rather than stopping dead.
- Visual language matches the portrait's own — "ink / paint / flowing light" (§40) — not sparks, not neon, not confetti.

## Restraint rules

- Sits behind foreground content — same z-index discipline as §46.
- Must never overlap or obscure text, headings, or interactive elements.
- On narrow/mobile widths: keep the line, reduce or drop the wind streaks first if frame budget is tight.
- `prefers-reduced-motion`: show the fully-drawn, static line — no traveling streaks.

## Suggested components

```text
FlowSpine.tsx     — the line + scroll-progress draw + section nodes
WindStreaks.tsx   — the traveling light particles rendered along FlowSpine
```

Both are independently reusable and independently disable-able, per §33's component principles.

---

# 49. NEW FEATURE DIRECTIONS (OPTIONAL — PICK AS NEEDED)

These are structural/interaction ideas, not content. **The rule from §0.11 of the master prompt still applies in full: do not invent projects, research, publications, credentials, or biography.** Populate any of these only with data actually supplied through the portfolio data layer (§34). If real data doesn't exist for one, skip it — don't fill it with placeholder content.

| Idea | What it adds |
|---|---|
| **Case-study depth** | Each project entry expands (in place or as a detail view) into problem → approach → stack → result, instead of staying a flat card. Adds depth without cluttering the main list. |
| **Research / Publications strip** | A minimal timeline separate from Projects, for actual research work — same editorial styling as Experience (§21). Only if real research entries exist. |
| **"Now" line** | One small, manually-updated line near the hero or footer stating what's currently being worked on. No automation, no fabricated status — it's only ever as current as the user makes it. |
| **Command palette (⌘K / Ctrl+K)** | Keyboard-driven quick navigation between sections/projects. Fully keyboard-accessible, fits a technical/developer audience, and doesn't depend on hover or mouse at all. |
| **Skill mastery indicators** | Bars/rings for the existing Skills section that fill in on scroll-into-view, using the same restrained scroll-reveal language as §36. |
| **Live GitHub activity strip** | Pull real contribution/activity data from an existing GitHub profile via the GitHub API — genuine live data rather than a static claim. Worth doing specifically because a real GitHub profile with its own contribution visuals already exists to draw from. |
| **Resume/CV download** | A single, consistently-styled download action in nav or Contact — only if an actual file is supplied. |
| **ATS-friendly static fallback** | A plain-text/print-friendly version of the same content, for recruiters or automated parsers — practical, not decorative. |
| **Matching 404 / error page** | Same visual language (dark, editorial, spine/backdrop system) instead of a framework default. |

Treat this list as a menu — implement what's genuinely useful, not all of it at once. Adding all nine at full strength would work against the "restrained" direction the master prompt already sets.

---

# 50. UPDATED ARCHITECTURE

Extend the structure from §32 — additive only, nothing here replaces existing folders.

```text
src/
├── components/
│   ├── Hero/                        (existing, untouched)
│   ├── Navigation/                  (existing, untouched)
│   ├── Projects/                    (existing, untouched)
│   ├── About/                       (existing, untouched)
│   ├── Experience/                  (existing, untouched)
│   ├── Contact/                     (existing, untouched)
│   ├── Footer/                      (existing, untouched)
│   │
│   ├── Backdrop/
│   │   └── SectionBackdrop.tsx      (new — §46)
│   │
│   ├── Interaction/
│   │   ├── GlobalHoverProvider.tsx  (new — §47, shared pointer source)
│   │   └── MagneticElement.tsx      (new — §47, per-element wrapper)
│   │
│   └── FlowSpine/
│       ├── FlowSpine.tsx            (new — §48)
│       └── WindStreaks.tsx          (new — §48)
│
├── data/
│   └── portfolio.ts                 (existing — extend only if §49 items are used)
│
public/
└── images/
    └── backdrops/                   (new — per-section background source images)
```

---

# 51. UPDATED ANTI-PATTERNS (ADDENDUM TO §41)

In addition to the existing list, do NOT produce:

- A background image that out-competes foreground content for attention.
- Hover effects that lag, jitter, or feel one frame behind the pointer.
- A spine/wind effect strong enough to distract from reading.
- Any new layer placed in front of, or directly behind, the hero portrait's own canvas.
- Hover treatment on every single DOM element regardless of meaning — only genuinely interactive elements respond.
- Five-plus §49 features shipped simultaneously at full visual strength.

---

# 52. UPDATED ACCEPTANCE CRITERIA (ADDENDUM TO §42)

### Backdrop layer
- [ ] Backdrops never reduce text contrast below existing accessibility levels.
- [ ] No backdrop appears behind the hero portrait.
- [ ] Sections with no supplied image render with no backdrop, cleanly.

### Sitewide hover
- [ ] All listed element types (§47) respond consistently.
- [ ] Touch devices show a press/tap state instead, with no lost functionality.
- [ ] Keyboard focus states are visibly equivalent to hover states.

### Flow Spine / wind
- [ ] Spine draw position always matches actual scroll position (no drift, no auto-play).
- [ ] Wind streaks respect `prefers-reduced-motion` (static line, no motion).
- [ ] Spine and streaks never overlap readable content at any tested breakpoint (§24).
- [ ] Frame rate holds steady with the spine active alongside the existing liquid portrait.

### Overall
- [ ] The hero's liquid portrait is still the first thing that reads as "the site's identity."
- [ ] Nothing added in this update required rebuilding an existing component from scratch.

---

# 53. IMPLEMENTATION ORDER FOR V1.0

## Phase 1 — Inspect
1. Confirm the current build still passes §42's original acceptance criteria before adding anything.
2. Map which sections currently exist as components.

## Phase 2 — Layering first
1. Build `SectionBackdrop` and wire it into one section as a proof of concept.
2. Verify z-index and contrast rules hold, then extend to remaining sections.

## Phase 3 — Interaction system
1. Build `GlobalHoverProvider` + `MagneticElement`.
2. Apply to navigation and buttons first, then projects, tags, and footer links.
3. Verify touch and keyboard parity before moving on.

## Phase 4 — Flow Spine
1. Build the static path first (no scroll-linking) to confirm placement doesn't collide with content at any breakpoint.
2. Add scroll-linked drawing.
3. Add `WindStreaks`, gated behind `prefers-reduced-motion` from the start.

## Phase 5 — New feature directions (§49)
1. Implement only the items for which real data/content exists.
2. One at a time, validated against §51/§52 before moving to the next.

## Phase 6 — Validate
Re-run §38/§39/§42 of the master prompt in full, plus §52 above.

---

# 54. FINAL AGENT INSTRUCTION — V1.0

Before declaring this update complete, ask:

1. Is the liquid portrait still unmistakably the site's signature moment?
2. Do the new backdrops read as atmosphere, or do they compete with content?
3. Does hover now feel sitewide and coherent, or bolted-on section by section?
4. Does the Flow Spine track scroll exactly, with no lag or drift?
5. Does the wind effect look like flowing light — not particles, not neon?
6. Does everything still work with reduced motion, no WebGL, and touch-only input?
7. Did any §49 addition get filled with invented content instead of real data?
8. Is frame rate still smooth with all new layers active together?

If any answer is unsatisfactory, fix it before finishing. **This is an addition to an already-working site — leave it more detailed, not less stable.**
