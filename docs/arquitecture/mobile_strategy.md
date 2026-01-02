# Mobile Development Strategy (Feature Parity)

## The "No Compromise" Rule
The Mobile app is not a "Lite" version. It must render the full "Career Velocity" dashboard with 60FPS animations.

## Visualization Strategy
**Aceternity UI (Web) -> Skia (Mobile)**
* **Gradients:** Use Skia `<Canvas>` with `<SweepGradient>`.
* **Charts:** Use **Victory Native XL**.

## The Scribe Rule (Documentation)
**Scribe** will monitor the `/apps/mobile` folder.
* If a new UI component is added to Web but NOT Mobile, Scribe will flag this in the Pull Request: *"Parity Violation: Feature 'BentoGrid' missing on Mobile."*

## Shared Logic Policy
* **ROI Math:** Imported from `/packages/logic`.
* **Formatting:** Shared formatting utilities.