# Mobile Development Strategy (Feature Parity)

## The "No Compromise" Rule
The Mobile app is not a "Lite" version. It must render the full "Career Velocity" dashboard with 60FPS animations.

## Visualization Strategy
**Aceternity UI (Web) -> Skia (Mobile)**
The "Glowing Gradients" and "Bento Grids" from Web must be recreated on mobile using **React Native Skia**.
* **Gradients:** Use `<Canvas>` and `<Rect>` with `<SweepGradient>` from Skia to replicate Aceternity's "Background Beams."
* **Charts:** Use **Victory Native XL**. It uses Skia for rendering, allowing us to add "Glowing Lines" to charts, matching the web aesthetic.

## Shared Logic Policy
* **ROI Math:** NEVER write calculation logic inside a component. Import it from `/packages/logic`.
* **Formatting:** Currency and Time formatting utilities must be shared to ensure "$150/hr" looks the same on both screens.