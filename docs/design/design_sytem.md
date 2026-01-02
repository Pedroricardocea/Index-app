# Index Design System: "The Glass Cockpit"

## 1. Core Aesthetic
* **Vibe:** Premium, Future-Industrial, "Opal meets Linear."
* **Mode:** Dark Mode ONLY (OLED Optimization).
* **Texture:** Glassmorphism, Neon Accents, subtle noise textures.

## 2. Color Palette (Tailwind Tokens)

### Backgrounds (OLED Optimized)
* `bg-background`: `#000000` (True Black)
* `bg-surface`: `#09090B` (Zinc 950 - Cards/Modals)
* `bg-surface-highlight`: `#18181B` (Zinc 900 - Hover/Press states)

### Primary Accents (The "Velocity" Colors)
* `text-primary`: `#EDEDED` (High contrast text)
* `text-muted`: `#A1A1AA` (Zinc 400 - Secondary stats)
* `border-glow`: `rgba(255, 255, 255, 0.1)` (Subtle borders)
* **The "Growth" Gradient:** `from-emerald-500 to-cyan-500` (Used for positive Velocity).
* **The "Maintenance" Gradient:** `from-zinc-700 to-zinc-500` (Used for routine tasks).

## 3. Typography
* **Font:** `Inter` (Tight tracking) or `Geist Mono` (for numbers/data).
* **Web:** Use `tracking-tight` (-0.025em) on all headers.
* **Mobile:** Use `letterSpacing: -0.5` on headers.

## 4. Component Rules (Cross-Platform)

### The "Bento Card"
* **Border:** 1px, color `#27272A` (Zinc 800).
* **Radius:** `rounded-xl` (12px).
* **Effect:** Subtle inner glow on hover/active state.
* **Web Implementation:** `<div className="border border-zinc-800 bg-black/50 backdrop-blur-xl" />`
* **Mobile Implementation:** `<BlurView intensity={20} tint="dark" style={{borderColor: '#27272A', borderWidth: 1}} />`

### The "Number Ticker" (Velocity Metric)
* **Behavior:** When data loads, numbers roll up (0 -> 100).
* **Web:** Use Magic UI `<NumberTicker />`.
* **Mobile:** Use Moti `<Text />` with a custom transition hook.

## 5. Animation Curves
* **The "Snap" (Interactions):** `spring(damping: 20, stiffness: 300)`
* **The "Drift" (Backgrounds):** `linear(duration: 10s, loop: Infinity)`