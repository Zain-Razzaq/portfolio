# Zain Razzaq — New Portfolio Website: Complete Design & Build Plan

---

## Vision

A dark-first, futuristic-minimal portfolio that feels like a premium product — not a resume.  
Every scroll reveals something new. Every interaction feels deliberate. The site should make visitors feel like they are stepping into the interface of a near-future software studio.

**Core vibe:** `Linear.app` × `Vercel` × `Framer` — clinical precision, bold type, restrained color, purposeful motion.

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Structure | Vanilla HTML5 | Zero build step, fast, no framework overhead |
| Styling | Pure CSS (Custom Properties + Grid + Flex) | Full control, no utility-class clutter |
| Animation | GSAP + ScrollTrigger | Industry-standard, silky 60 fps scroll-driven animation |
| Smooth Scroll | Lenis | Buttery momentum scroll that makes parallax feel right |
| Icons | Lucide (SVG sprite) | Crisp, consistent, tree-shakeable |
| Contact | EmailJS (existing config reused) | No server needed |

---

## Color System

Both light and dark modes are supported. **Light mode is the default.** A toggle in the nav switches between them — preference is saved to `localStorage`.

The four palette colors are used in both modes but with flipped roles: the two greys become backgrounds in light mode and text in dark mode.

### Palette Source
| Hex | RGB | Light Mode Role | Dark Mode Role |
|---|---|---|---|
| `#EFF0F4` | rgb(239, 240, 244) | Background (secondary) | Primary text |
| `#D3D6DB` | rgb(211, 214, 219) | Background (elevated) / Border | Secondary text |
| `#415F9D` | rgb(65, 95, 157) | Accent — CTAs, links, active | Accent — CTAs, links, active |
| `#233B6E` | rgb(35, 59, 110) | Deep accent — hover, headings | Deep accent — hover, deep shadows |

---

### Light Mode (default — `[data-theme="light"]` on `<html>`)

```css
[data-theme="light"] {
  --bg-primary:     #FFFFFF;
  --bg-secondary:   #EFF0F4;   /* palette grey-1 */
  --bg-elevated:    #D3D6DB;   /* palette grey-2 */
  --border:         #D3D6DB;
  --border-bright:  #415F9D;   /* accent on focus/active */

  --text-primary:   #0d0d0d;   /* near-black for max contrast */
  --text-secondary: #233B6E;   /* navy — gives body copy a strong, branded feel */
  --text-muted:     #6b7280;

  --accent:         #415F9D;
  --accent-deep:    #233B6E;
  --accent-dim:     rgba(65, 95, 157, 0.10);
  --accent-glow:    rgba(65, 95, 157, 0.25);

  --success:        #1a9e6a;
  --error:          #d93025;

  --shadow-sm:  0 1px 3px rgba(35, 59, 110, 0.08);
  --shadow-md:  0 4px 16px rgba(35, 59, 110, 0.12);
  --shadow-lg:  0 12px 40px rgba(35, 59, 110, 0.16);
}
```

---

### Dark Mode (`[data-theme="dark"]`)

```css
[data-theme="dark"] {
  --bg-primary:     #080808;
  --bg-secondary:   #0f0f0f;
  --bg-elevated:    #161616;
  --border:         #1a1f2e;   /* blue-tinted dark */
  --border-bright:  #2a3350;

  --text-primary:   #EFF0F4;   /* palette grey-1 — cool off-white */
  --text-secondary: #D3D6DB;   /* palette grey-2 — muted cool grey */
  --text-muted:     #555f70;

  --accent:         #415F9D;
  --accent-deep:    #233B6E;
  --accent-dim:     rgba(65, 95, 157, 0.12);
  --accent-glow:    rgba(65, 95, 157, 0.40);

  --success:        #2bdb8c;
  --error:          #ff4d4d;

  --shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.4);
  --shadow-md:  0 4px 16px rgba(0, 0, 0, 0.5);
  --shadow-lg:  0 12px 40px rgba(0, 0, 0, 0.6);
}
```

---

### Theme Toggle Behaviour
- Default on first visit: `light`
- Toggle button in nav (top-right): sun ↔ moon icon, Geist Mono label `"Light"` / `"Dark"`
- On switch: `document.documentElement.setAttribute('data-theme', theme)` + `localStorage.setItem('theme', theme)`
- CSS transitions on all color properties: `transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease`
- `prefers-color-scheme` is checked on first load as fallback if no `localStorage` value exists

```js
// js/components/theme.js
const saved = localStorage.getItem('theme');
const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
document.documentElement.setAttribute('data-theme', saved || system);
```

---

## Typography

### Font Pairing

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Hero | **Geist** (Vercel's font) | 700, 800 | Geometric, modern, techy — perfect for large impact text |
| Body / UI | **Geist** | 300, 400, 500 | Same family = total consistency |
| Mono (code blocks, labels) | **Geist Mono** | 400, 500 | Matches the design system perfectly |

> Import via: `https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;700;800&family=Geist+Mono:wght@400;500&display=swap`
> Fallback stack: `'Geist', 'Inter', system-ui, sans-serif`

### Type Scale

```
--text-xs:    0.75rem   / 12px  — labels, captions, tags
--text-sm:    0.875rem  / 14px  — nav links, footnotes
--text-base:  1rem      / 16px  — body copy
--text-lg:    1.125rem  / 18px  — lead paragraphs
--text-xl:    1.25rem   / 20px  — card headings
--text-2xl:   1.5rem    / 24px  — section sub-heads
--text-3xl:   2rem      / 32px  — section titles
--text-4xl:   2.75rem   / 44px  — large headings
--text-5xl:   4rem      / 64px  — hero sub-title
--text-6xl:   6rem      / 96px  — hero title (desktop)
--text-7xl:   8rem      / 128px — stretched display word
```

### Letter Spacing Rules
- Display text: `letter-spacing: -0.03em` (tight, editorial)  
- Body text: `letter-spacing: 0` (default)  
- Labels / caps: `letter-spacing: 0.1em; text-transform: uppercase`  
- Mono: `letter-spacing: 0.02em`

---

## Grid & Spacing

```
Max content width:  1200px
Gutter (desktop):   5vw each side
Gutter (mobile):    24px each side
Section padding:    120px vertical (desktop), 80px (mobile)
Card border-radius: 16px (cards), 12px (inputs), 8px (tags), 50% (pills)
```

Base spacing scale: `4px` steps — 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128.

---

## Animation Library Setup (GSAP + Lenis)

```html
<!-- In <head> -->
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>
```

### Global Animation Defaults
```js
gsap.defaults({ ease: 'power3.out', duration: 0.9 });
ScrollTrigger.defaults({ start: 'top 85%', end: 'bottom 15%' });
```

### Lenis Config
```js
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});
// Sync GSAP ScrollTrigger with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
```

---

## Sections Overview

```
01. Preloader
02. Navigation (sticky, morphing)
03. Hero
04. Marquee / Social Proof Strip
05. About (Who I Am)
06. Services
07. Process / How I Work
08. Projects (Horizontal Scroll or Stacked)
09. Tech Stack
10. Testimonials
11. Contact
12. Footer
```

---

## Section 01 — Preloader

**Purpose:** Sets the tone before the user sees anything. Should be short (<1.5s).

### Layout
- Full-screen black overlay
- Center: logo text `Z.R` in `--text-6xl` Geist 800
- Below it: a thin progress bar (just aesthetic, not real progress)

### Animation Sequence
1. `Z.R` fades + scales up from 0.85 → 1 over 600ms
2. Progress bar fills from 0% → 100% over 900ms (CSS animation)
3. Entire preloader slides up and off screen (`translateY(-100%)`) at 1.2s, revealing the hero beneath

### CSS
```css
.preloader {
  position: fixed; inset: 0; z-index: 9999;
  background: #080808;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  transition: transform 0.7s cubic-bezier(0.76, 0, 0.24, 1);
}
.preloader.exit { transform: translateY(-100%); }
.preloader-bar {
  width: 120px; height: 1px;
  background: var(--border-bright);
  margin-top: 24px;
  overflow: hidden;
}
.preloader-bar::after {
  content: ''; display: block;
  height: 100%; background: var(--accent);
  animation: barFill 0.9s 0.3s ease forwards;
  transform: scaleX(0); transform-origin: left;
}
@keyframes barFill { to { transform: scaleX(1); } }
```

---

## Section 02 — Navigation

### Layout
- Fixed top, full width
- Left: `Z.R` — small, crisp wordmark (Geist Mono 500)
- Center: nothing (clean)
- Right: theme toggle (sun/moon icon) + `Let's Talk` pill button (accent border, no fill → fills on hover)

### Scroll Behavior
- At page top: `background: transparent`, `border-bottom: transparent`
- After 80px scroll: backdrop-blur kicks in
  ```css
  .nav-scrolled {
    background: rgba(8, 8, 8, 0.7);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
  }
  ```
- Logo shrinks from 24px → 18px (smooth transition)

### Animation
- On page load: nav fades in from `translateY(-20px)` after preloader exits

---

## Section 03 — Hero

**Goal:** Instant impact. The visitor knows who Zain is within 3 seconds.

### Layout (desktop)
```
┌─────────────────────────────────────────────────┐
│                                                 │
│   LABEL:  "AI Expert & Full Stack Developer"    │
│                                                 │
│   H1:  Building Intelligent                     │
│        Websites That Work.                      │
│                                                 │
│   BODY: Short punchy line. 1 sentence.          │
│                                                 │
│   [CTA: Let's Build]   [See My Work ↓]          │
│                                                 │
│   ─────────────────────────────────────────     │
│   3+   ·   10+  ·   100%                        │
│   yrs    projects   on-time                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Typography
- Label: `--text-sm`, Geist Mono, uppercase, letter-spacing 0.15em, `--accent` color
- H1: `--text-6xl` (96px desktop, 48px mobile), Geist 800, `--text-primary`, line-height 0.95
- Body: `--text-lg`, Geist 300, `--text-secondary`, max-width 480px
- Stats: `--text-4xl` Geist 700 number + `--text-sm` label below

### Background
- Pure `#080808`
- A single subtle **radial gradient glow** centered-top in `--accent` (`#415F9D`) at 6% opacity — gives a cold, deep-space atmosphere
- Animated fine **grid lines** (CSS `background-image: linear-gradient`) that slowly drift — `backgroundPosition` animating via GSAP

```css
.hero-grid {
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.4;
}
```

### Scroll Animations
1. **Label** — fades in `opacity: 0 → 1`, slides from `y: 20 → 0` on load (GSAP, delay 0.1s after preloader)
2. **H1 (SplitText)** — each line reveals from bottom with a clip mask. Uses `overflow: hidden` wrapper + `y: 100% → 0`, stagger 0.08s per line
3. **Body + CTAs** — fade up, 0.3s delay after headline finishes
4. **Stats** — count up animation (0 → target) triggered on load
5. **Scroll progress** — as user scrolls down, hero content `translateY` at 0.3× scroll speed (parallax) + `opacity` fades from 1 → 0 at 40% scroll depth
6. **Grid** — `backgroundPositionY` shifts 0 → 30px as user scrolls (GSAP ScrollTrigger, scrub: 1)

### Cursor Effect (desktop only)
A soft blurred circle (100px diameter, `--accent` at 20% opacity) that follows the mouse on the hero section. Not an annoying cursor trail — just a glow that breathes.

```css
.cursor-glow {
  position: fixed; pointer-events: none; z-index: 0;
  width: 300px; height: 300px;
  border-radius: 50%;
  /* steel blue glow — rgba(65, 95, 157, 0.35) */
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left 0.1s, top 0.1s;
}
```

---

## Section 04 — Marquee / Proof Strip

**Purpose:** Social proof + visual rhythm break between hero and content.

### Layout
- Single horizontal scrolling marquee row, full width, no container constraint
- Background: `--bg-secondary` with top and bottom `1px` border in `--border`
- Items: tech names / client names / skills with a `·` separator and small icon

### Content Items (looping)
```
React.js  ·  Next.js  ·  Node.js  ·  AI Integration  ·  TypeScript  ·  
LLMs  ·  Shopify  ·  MongoDB  ·  Full Stack  ·  3+ Years  ·  [repeat]
```

### Animation
- CSS-only infinite marquee (`animation: marquee 30s linear infinite`)
- On hover: `animation-play-state: paused`
- Two identical sets of items side by side so the loop is seamless

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

### Scroll Trigger
- Marquee reverses direction (`animation-direction: reverse`) in the second row if you want two rows — gives a counter-scroll feel

---

## Section 05 — About

**Heading:** `Who I Am.`  
**(Sub-label in mono above it):** `// 001 — About`

### Layout
```
┌──────────────────────────┬─────────────────────┐
│  Big number: "3"         │                     │
│  text: "Years"           │  Paragraph 1        │
│                          │                     │
│  Big number: "10+"       │  Paragraph 2        │
│  text: "Projects Built"  │                     │
│                          │  List of core       │
│  Big number: "∞"         │  values / what      │
│  text: "Curiosity"       │  drives me          │
└──────────────────────────┴─────────────────────┘
```

### Typography
- Section number label: Geist Mono, `--text-xs`, `--text-muted`, uppercase
- Section heading: `--text-4xl`, Geist 700
- Big numbers: `--text-7xl` (128px), Geist 800, `--accent` color
- Body: `--text-base`, Geist 300, `--text-secondary`, line-height 1.75

### Content
```
Heading: Who I Am.

Para 1:
I'm Zain Razzaq — an AI Expert and Full Stack Developer from Lahore, 
building intelligent software that actually does something useful.

Para 2:
Studying Computer Science at ITU shaped how I think about systems. 
Working with real clients across education, finance, and e-commerce 
taught me what matters: clarity, speed, and outcomes that move the needle.
```

### Scroll Animations
1. **Section number + heading** — SplitText character reveal, stagger 0.02s, triggered when section enters viewport
2. **Big numbers** — count up from 0 as section scrolls into view (ScrollTrigger)
3. **Left column** — numbers scroll in from left (`x: -60 → 0`)
4. **Right column** — text scrolls in from right (`x: 60 → 0`)
5. Entire section has a **sticky phase**: for 200px of scroll, the section header stays pinned while the content reveals beneath it

---

## Section 06 — Services

**Heading:** `What I Build.`

### Layout
- Vertical stacked cards, each full-width row
- Each card is a horizontal strip: `Number | Title | Description | Arrow →`
- On hover: card background goes from `--bg-secondary` → `--bg-elevated`, left border in `--accent` appears

### Card Structure
```
┌──────┬─────────────────────┬─────────────────────────┬────┐
│  01  │  AI-Enhanced Web    │  Build modern web apps  │ →  │
│      │  Applications       │  with strategic AI...   │    │
└──────┴─────────────────────┴─────────────────────────┴────┘
```

### Cards
| # | Title | Short Description |
|---|---|---|
| 01 | AI-Enhanced Web Applications | LLM integrations, smart chatbots, predictive analytics baked into your product |
| 02 | Full Stack Business Solutions | End-to-end apps: React + Node + databases, built to scale from day one |
| 03 | CRM & Platform Development | Shopify, GoHighLevel, Kajabi — custom themes, plugins, and API connections |

### Typography
- Number: Geist Mono, `--text-xs`, `--text-muted`
- Title: `--text-xl`, Geist 600
- Description: `--text-base`, Geist 300, `--text-secondary`

### Scroll Animations
1. Cards animate in one by one as they scroll into view
2. Each card: `opacity: 0, y: 40 → opacity: 1, y: 0`, stagger 0.15s
3. **Hover effect:** the `→` arrow slides from `x: 0 → x: 6` and back (CSS transition)
4. **Left border reveal:** `scaleY(0) → scaleY(1)` on hover, transform-origin top

---

## Section 07 — Process

**Heading:** `How I Work.`

### Layout
- Alternating left-right layout (like a timeline but wider)
- OR: a clean numbered vertical flow with connecting dotted lines

### Visual
```
●—————————————————————————————————●
|                                  |
Step 01                        Step 02
Analyze Requirements          Design Architecture
                                    |
●—————————————————————————————————●
|                                  |
Step 03                        Step 04
Build It                       Deploy & Refine
```

The dots and connecting lines are drawn via SVG, and the SVG `stroke-dashoffset` animates from full → 0 as you scroll (line draws itself).

### Steps (updated content)
| # | Title | One-liner |
|---|---|---|
| 01 | Understand the Problem | I ask the right questions first — no assumption, no wasted code |
| 02 | Design the Architecture | Wireframes, data models, and AI strategy before touching a keyboard |
| 03 | Build with Precision | Clean code, modular structure, optimized for performance from the start |
| 04 | Ship & Improve | Deploy, monitor, iterate — your site gets smarter over time |

### Scroll Animations
1. **Line draws** — SVG `stroke-dashoffset` animates with `scrub: 1` (tied to scroll position)
2. Each step **fades in** as the line reaches it
3. Step number counter **fills with accent color** as it becomes active

---

## Section 08 — Projects

**Heading:** `Selected Work.`

### Layout Option — Stacked Reveal Cards
Each project occupies near-full viewport height. As you scroll:
- Previous project **scales down** and **fades** slightly
- New project **scales up** from below

```
┌────────────────────────────────────────────┐
│  PROJECT IMAGE (full width, ~55vh)         │
│  + subtle overlay gradient                 │
├────────────────────────────────────────────┤
│  Tag: "AI / EdTech"                        │
│  Title: Classly — Smart Learning Platform  │
│  Body: 2-sentence description              │
│  [View Project →]                          │
└────────────────────────────────────────────┘
```

### Projects
| # | Name | Tags | Link |
|---|---|---|---|
| 01 | Classly — AI-Powered Learning Platform | LLM, Auto-Grading, React, Node | classly.zainrazzaq.xyz |
| 02 | Olsey Aesthetics — E-Commerce Store | Shopify, Custom Theme, Responsive | olseyaesthetics.com |
| 03 | Bitcoin Yay — Crypto Trading Platform | Next.js, REST APIs, MongoDB | bitcoinyay.com |
| 04 | BioRegen — Biotech / Pharma Website | React, Custom Design | (url) |

### Scroll Animations
1. **Stacked card effect**: each card is `position: sticky; top: 80px` with a `z-index` increment. As next card scrolls in, it overlaps.
2. Current card: `scale(1)`. Card being pushed behind: `scale(0.95)` + `opacity: 0.6`
3. Image: parallax — image moves at 0.7× scroll speed within the card clip
4. Title uses **SplitText word reveal** — words slide up on enter
5. On hover (desktop): image scales from `1 → 1.04` (smooth zoom)

---

## Section 09 — Tech Stack

**Heading:** `Built With.`

### Layout
- Masonry-ish floating grid of tech pills / icons
- Grouped by category (no category labels visible — just visual clusters)
- Items have varying sizes (some 1×, some 1.5× — editorial feel)

### Tech Items
```
React.js  |  Next.js  |  TypeScript  |  Tailwind CSS  |  Node.js  
Express   |  MongoDB   |  MySQL       |  Docker        |  AWS  
LangChain |  PyTorch   |  LLMs        |  HuggingFace   |  Shopify  
WordPress |  GHL       |  REST APIs   |  Git
```

### Scroll Animations
1. Items enter with **random stagger** (not left-to-right — feels more alive)
2. Each pill: `opacity: 0, scale: 0.7 → opacity: 1, scale: 1`, ease: `back.out(1.7)` (slight overshoot)
3. On hover: pill background fills to `--accent-dim` (`rgba(65,95,157,0.12)`), border brightens to `--accent` (`#415F9D`)
4. **Floating idle animation**: each item has a subtle `translateY` sine-wave oscillation at different offsets (gives life to the grid without being distracting)

---

## Section 10 — Testimonials

**Heading:** `Client Words.`

### Layout
- Single centered card, very large quote
- Left/right arrows to navigate
- Or: auto-rotate every 5s

### Card Structure
```
┌─────────────────────────────────────────┐
│                                         │
│  "                                      │
│  [Quote text — large, italic]           │
│                                         │
│  — Name, Title @ Company                │
│     [Avatar circle]                     │
│                                         │
└─────────────────────────────────────────┘
```

### Typography
- Quote: `--text-2xl`, Geist 300, italic, `--text-primary`, line-height 1.6
- Attribution: `--text-sm`, Geist 500, `--text-secondary`
- Opening `"` : `--text-6xl`, `--accent`, Geist 800

### Animation
1. On mount: quote text fades in, `y: 20 → 0`
2. On transition: current quote slides out left, new quote slides in from right
3. Section enter: the large `"` scales from 0.5 → 1 with `back.out` ease

---

## Section 11 — Contact

**Heading:** `Let's Build.`

### Layout
```
┌──────────────────────────────────────────┐
│                                          │
│  Let's Build.                            │
│                                          │
│  Got a project, idea, or question?       │
│  Drop your email and I'll reply fast.    │
│                                          │
│  [Email input    ──────────────────────] │
│  [Message textarea ──────────────────── ]│
│  [Send It →]                             │
│                                          │
│  ─ or reach me directly ─               │
│  zainrazzaq2003@gmail.com               │
│  LinkedIn                                │
│                                          │
└──────────────────────────────────────────┘
```

### Input Styling
```css
.form-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-bright);
  padding: 16px 0;
  font-size: var(--text-base);
  color: var(--text-primary);
  width: 100%;
  transition: border-color 0.2s;
}
.form-input:focus {
  outline: none;
  border-bottom-color: var(--accent);
}
```
- No rounded boxes — underline-only style looks editorial and premium
- Submit button: full-width at mobile, auto-width at desktop. Filled accent color, white text, subtle shimmer on hover

### Scroll Animation
1. Heading — SplitText word reveal
2. Form fields appear one by one with stagger, `y: 30 → 0`
3. A **large background word** `"HELLO"` in `--text-muted` at huge size sits behind the form at 4% opacity — gives depth

---

## Section 12 — Footer

### Layout
- Minimal, 2 rows
- Row 1: `Z.R` wordmark (left) | Nav links (right)
- Row 2: `© 2025 Zain Razzaq` (left) | `Lahore, Pakistan` (right)
- Between rows: 1px border

### Animation
- Footer fades in from `opacity: 0` as it enters viewport (simple, no drama)

---

## Global Scroll Animations Summary

| Element | Animation | Trigger |
|---|---|---|
| All section headings | SplitText line/word reveal | enter viewport |
| Body paragraphs | `y: 30 → 0, opacity: 0 → 1` | enter viewport |
| Cards (services, projects) | staggered `y: 40 → 0, opacity: 0 → 1` | enter viewport |
| Hero content | `y: 20 → 0, opacity: 0 → 1` | on load (after preloader) |
| Hero background grid | `backgroundPositionY` parallax | scrub scroll |
| Hero text block | `y: 0 → -60, opacity: 1 → 0` | scroll out |
| Project images | internal parallax (`y: -30 → 30`) | scrub scroll |
| SVG process lines | `stroke-dashoffset` draw | scrub scroll |
| Tech pills | stagger scale/fade + idle float | enter viewport |
| Section numbers | count up | enter viewport |
| Navbar | background/blur morph | scroll threshold |

---

## Cursor (Desktop Only)

1. **Default cursor**: hidden (`cursor: none`)
2. **Custom cursor dot**: 8px solid white dot, always visible, follows mouse with 0 lag (`left`/`top` direct set)
3. **Cursor ring**: 32px outlined ring, follows with 150ms lerp (smooth trailing)
4. **On hover link/button**: ring expands to 60px + fills with `--accent-dim`
5. **On hover project image**: ring shows `"VIEW"` text inside it (expands to 80px, text fades in)

```js
// Lerp helper
const lerp = (a, b, n) => (1 - n) * a + n * b;
```

---

## Page Load Sequence (Timing)

```
0ms      → Preloader shows (Z.R + bar)
900ms    → Bar fills
1200ms   → Preloader exits (slides up)
1400ms   → Nav fades in
1500ms   → Hero label appears
1600ms   → Hero H1 reveals (word by word, 80ms stagger)
1900ms   → Hero body + CTAs fade in
2100ms   → Stats count up
```

---

## Responsive Strategy

| Breakpoint | Adjustment |
|---|---|
| 1440px+ | Max content width caps at 1200px |
| 1024px–1440px | Full layout, slightly smaller type scale |
| 768px–1024px | 2-col → 1-col where needed, hero H1 drops to `--text-4xl` |
| 480px–768px | Full mobile — hero H1 at `--text-3xl`, nav simplified |
| <480px | Touch-first, no cursor effects, animations simplified |

### Mobile Animation Rules
- ScrollTrigger still works — just reduce `y` distances (40 → 20)
- No cursor effects
- No floating idle animations (save battery)
- Preloader identical but shorter (900ms vs 1200ms total)
- Reduce backdrop-blur `blur(20px) → blur(12px)` for performance

---

## Performance Checklist

- [ ] `font-display: swap` on Google Fonts
- [ ] All images: WebP format + `loading="lazy"` + explicit `width`/`height`
- [ ] GSAP loaded deferred (`defer` attribute)
- [ ] `will-change: transform` only on elements actively animating
- [ ] ScrollTrigger: `invalidateOnRefresh: true` for resize correctness
- [ ] No layout thrash: read DOM measurements before writing
- [ ] `prefers-reduced-motion` media query: disable all transforms and set `duration: 0.01` for GSAP

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

---

## File Structure

No build tools, no bundler — plain HTML/CSS/JS with native ES modules (`type="module"`).  
CSS is split by concern and imported via a single hub file. JS is split by responsibility.

```
portfolio/
│
├── index.html                    — markup only, links css/main.css + js/main.js
│
├── css/
│   ├── main.css                  — @import hub (imports every other CSS file in order)
│   ├── variables.css             — all CSS custom properties (both themes, type scale, spacing)
│   ├── reset.css                 — modern CSS reset (box-sizing, margin, padding, etc.)
│   ├── typography.css            — font-face, scale classes, heading/body rules
│   ├── layout.css                — container, grid helpers, section spacing
│   ├── animations.css            — @keyframes definitions + transition utility classes
│   │
│   ├── components/
│   │   ├── navbar.css            — nav bar, logo, theme toggle button, scroll states
│   │   ├── button.css            — .btn-primary, .btn-secondary, icon buttons
│   │   ├── card.css              — shared card shell used in services + projects
│   │   ├── form.css              — underline inputs, textarea, submit button, messages
│   │   ├── cursor.css            — custom cursor dot + ring styles
│   │   ├── preloader.css         — fullscreen overlay, logo, progress bar
│   │   └── marquee.css           — infinite scroll strip
│   │
│   └── sections/
│       ├── hero.css              — hero layout, grid BG, stat strip
│       ├── about.css             — two-column layout, big editorial numbers
│       ├── services.css          — full-width strip cards + hover reveal
│       ├── process.css           — step layout, SVG connector line
│       ├── projects.css          — sticky stacked cards, image clip + parallax
│       ├── stack.css             — tech pill grid, idle float animation
│       ├── testimonials.css      — quote card, attribution, nav arrows
│       ├── contact.css           — form wrapper, direct links
│       └── footer.css            — two-row footer, border divider
│
├── js/
│   ├── main.js                   — ES module entry: imports + calls all init functions
│   │
│   ├── core/
│   │   ├── lenis.js              — Lenis smooth scroll init + GSAP sync
│   │   └── gsap-setup.js         — GSAP defaults, ScrollTrigger registration, reduced-motion check
│   │
│   ├── animations/
│   │   ├── preloader.js          — preloader exit sequence + hero entrance chain
│   │   ├── hero.js               — SplitText reveal, parallax grid, stat count-up
│   │   ├── scroll-reveal.js      — reusable ScrollTrigger fade/slide-up for sections
│   │   ├── process.js            — SVG stroke-dashoffset draw animation
│   │   └── projects.js           — sticky stack scale + image parallax
│   │
│   └── components/
│       ├── theme.js              — light/dark toggle, localStorage, system preference
│       ├── navbar.js             — scroll class toggle (backdrop blur), active link
│       ├── cursor.js             — custom cursor tracking, state changes on hover
│       ├── carousel.js           — testimonials auto-rotate + manual nav
│       ├── counter.js            — number count-up utility (used in hero + about)
│       └── form.js               — EmailJS contact form, validation, success/error UI
│
├── assets/
│   ├── images/
│   │   ├── classly.webp
│   │   ├── olsey.webp
│   │   ├── bitcoinyay.webp
│   │   └── bioregen.webp
│   └── icons/                    — any custom SVG icons (exported from Lucide)
│
├── CNAME
└── PORTFOLIO_PLAN.md
```

### How CSS is Loaded
`index.html` links only `css/main.css`. That file `@import`s everything in dependency order:

```css
/* css/main.css */
@import './variables.css';
@import './reset.css';
@import './typography.css';
@import './layout.css';
@import './animations.css';

@import './components/preloader.css';
@import './components/navbar.css';
@import './components/button.css';
@import './components/card.css';
@import './components/form.css';
@import './components/cursor.css';
@import './components/marquee.css';

@import './sections/hero.css';
@import './sections/about.css';
@import './sections/services.css';
@import './sections/process.css';
@import './sections/projects.css';
@import './sections/stack.css';
@import './sections/testimonials.css';
@import './sections/contact.css';
@import './sections/footer.css';
```

### How JS is Loaded
`index.html` loads only `js/main.js` with `type="module"`. Everything else is imported inside it:

```js
// js/main.js
import { initLenis }      from './core/lenis.js';
import { setupGSAP }      from './core/gsap-setup.js';
import { initTheme }      from './components/theme.js';
import { initNavbar }     from './components/navbar.js';
import { initCursor }     from './components/cursor.js';
import { initCarousel }   from './components/carousel.js';
import { initForm }       from './components/form.js';
import { runPreloader }   from './animations/preloader.js';
import { animateHero }    from './animations/hero.js';
import { initReveal }     from './animations/scroll-reveal.js';
import { animateProcess } from './animations/process.js';
import { animateProjects }from './animations/projects.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();        // must be first — sets data-theme before paint
  initLenis();
  setupGSAP();
  initNavbar();
  initCursor();
  runPreloader().then(() => {
    animateHero();
    initReveal();
    animateProcess();
    animateProjects();
  });
  initCarousel();
  initForm();
});
```

---

## Build Order (Implementation Steps)

### Phase 1 — Foundation
1. Create full folder structure (`css/`, `css/components/`, `css/sections/`, `js/`, `js/core/`, `js/animations/`, `js/components/`, `assets/images/`)
2. `css/variables.css` — all custom properties for both themes, type scale, spacing
3. `css/reset.css` + `css/typography.css` + `css/layout.css`
4. `css/main.css` — @import hub wired up
5. `index.html` — semantic shell with all 12 section stubs, links to `css/main.css` + `js/main.js`
6. `js/main.js` — empty init scaffold with all imports stubbed

### Phase 2 — Theme System
7. `js/components/theme.js` — localStorage + system preference check, toggle handler
8. `css/components/navbar.css` + `js/components/navbar.js` — nav layout, theme toggle button, scroll state

### Phase 3 — Preloader
9. `css/components/preloader.css` — fullscreen overlay, logo, progress bar keyframes
10. `js/animations/preloader.js` — exit sequence, resolves a Promise for hero chain

### Phase 4 — Core Animations
11. `js/core/lenis.js` + `js/core/gsap-setup.js` — smooth scroll + GSAP defaults + reduced-motion
12. `css/animations.css` — shared @keyframes

### Phase 5 — Hero
13. `css/sections/hero.css` — layout, grid background, stat strip
14. `js/animations/hero.js` — SplitText reveal chain, parallax grid, stat count-up

### Phase 6 — Cursor
15. `css/components/cursor.css` + `js/components/cursor.js` — dot, ring, hover states

### Phase 7 — Section by Section (CSS + scroll-reveal JS)
16. Marquee — `css/components/marquee.css` (pure CSS, no JS)
17. About — `css/sections/about.css` + count-up in `js/components/counter.js`
18. Services — `css/sections/services.css` + hover effects
19. Process — `css/sections/process.css` + `js/animations/process.js` (SVG draw)
20. Projects — `css/sections/projects.css` + `js/animations/projects.js` (sticky stack)
21. Tech Stack — `css/sections/stack.css` (idle float via CSS animation)
22. Testimonials — `css/sections/testimonials.css` + `js/components/carousel.js`
23. Contact — `css/sections/contact.css` + `js/components/form.js` (EmailJS)
24. Footer — `css/sections/footer.css`

### Phase 8 — Polish
25. `js/animations/scroll-reveal.js` — wire all section fade-ins globally
26. Responsive QA at all breakpoints
27. Light ↔ dark mode QA — every section checked in both themes
28. Performance audit — images WebP, GSAP deferred, will-change cleanup
29. `prefers-reduced-motion` pass — confirm animations disabled

---

*This document is the single source of truth for the new portfolio. Implementation follows this plan exactly.*
