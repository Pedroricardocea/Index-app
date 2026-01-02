# System Architecture: Index (Unified Experience)

## 1. High-Level Overview
**Index** offers complete feature parity across Web and Mobile. Both platforms serve as:
1.  **The Capture Surface:** Voice-first ingestion, file uploads, and "Daily Dumps."
2.  **The Analysis Surface:** Deep-dive dashboards, "Velocity" tracking, and reporting.

## 2. Tech Stack (Unified)

### Web (Next.js 14+)
* **Ingestion:** Browser `MediaRecorder API` for voice capture.
* **Visuals:** Shadcn/UI + Aceternity UI + Magic UI.
* **Charts:** Recharts or Tremor (Wrapped in Aceternity containers).

### Mobile (Expo / React Native)
* **Ingestion:** `expo-av` for high-fidelity voice capture.
* **Visuals:** NativeWind (Tailwind) + Reanimated + Skia.
* **Charts:** **Victory Native XL** or **React Native Skia**. (These are the *only* mobile libraries that can match the "Opal" aesthetic).

### Backend (Shared Brain)
* **Agent Core:** Processes audio from *any* source (Web/Mobile) identically.
* **Database:** Supabase (PostgreSQL + pgvector).

---

## 3. Core Architecture Flows

### A. The "Universal" Capture Pipeline
Whether on iPhone or Chrome:
1.  **Record:** Audio is captured (AAC/WebM).
2.  **Upload:** Sent to Supabase Storage (`/raw-dumps/{user_id}`).
3.  **Process:** Backend Agent transcribes + calculates ROI.
4.  **Notify:** Real-time update via WebSocket (Supabase Realtime) to *all* user devices.

### B. The "Universal" Analysis Engine
1.  **Fetch:** `packages/logic` requests the "Velocity Data" (e.g., last 30 days).
2.  **Transform:** Data is formatted for visualization.
3.  **Render:**
    * **Web:** Renders `<AreaChart />` (Recharts) with SVG gradients.
    * **Mobile:** Renders `<CartesianChart />` (Victory Native) with Skia Shaders.
    * *Result:* The charts look visually identical (same colors, same curves).

### C. The Validation Pipeline (CI/CD)
1.  **Commit:** Developer pushes code to `feature/new-chart`.
2.  **Simulation:** GitHub Actions triggers **Jules**.
    * Jules builds the app.
    * Jules runs `tests/simulation-data/scenario_A.json`.
3.  **Validation:**
    * If the "Velocity Score" calculation drifts by >1% from the expected baseline, the PR is **blocked**.
    * *Why:* Prevents "Math Regression" where a code change accidentally ruins the user's historical data.
4.  **Preview:** A Vercel/Expo preview link is generated for manual review.