# System Architecture: Index (Unified Experience)

## 1. High-Level Overview
**Index** is a self-evolving Career Velocity ecosystem.
- **Surface:** Unified Web + Mobile apps (Feature Parity).
- **Core:** Agentic Backend for ROI calculation.
- **Evolution:** Autonomous agents (Scout & Scribe) that research new features and maintain documentation.

## 2. The Agentic Workforce

### A. The "Analyst" (Real-time Logic)
* **Role:** Processes Daily Dumps, calculates ROI/Velocity.
* **Trigger:** New Audio Upload.

### B. "Jules" (Quality Assurance)
* **Role:** Simulates user behavior to validate math/logic.
* **Trigger:** Pull Request.

### C. "Scout" (Product Strategy - NEW)
* **Role:** The Researcher.
* **Trigger:** Weekly Schedule.
* **Capabilities:**
    * **Web Search (Google):** Searches for "New Engineering Productivity Metrics 2026," "DORA metric alternatives," or "AI coding impact studies."
    * **Synthesis:** Compares found metrics against our current `packages/logic`.
    * **Output:** Updates `docs/strategy/feature_radar.md` with proposals (e.g., "Adopting SPACE Framework metrics").

### D. "Scribe" (Governance - NEW)
* **Role:** The Librarian.
* **Trigger:** Code Merge to Main.
* **Capabilities:**
    * **Drift Detection:** Scans `/src` changes vs `/docs` definitions.
    * **Auto-Update:** If a developer changes the Database Schema but forgets to update `system_design.md`, Scribe opens a PR to fix the docs.
    * **Public Face:** Compiles `docs/public/README_TEMPLATE.md` + Latest Stats -> Generates the root `README.md` for GitHub.

---

## 3. Tech Stack (Unified)

### Web (Next.js 14+)
* **Visuals:** Shadcn/UI + Aceternity UI + Magic UI.
* **Charts:** Recharts/Tremor.

### Mobile (Expo)
* **Visuals:** NativeWind + Reanimated + Skia.
* **Charts:** Victory Native XL (Skia-based).

### Backend & Data
* **Database:** Supabase (PostgreSQL + pgvector).
* **Agent Tools (MCP):**
    * `mcp-google-search`: For Scout's research.
    * `mcp-fs-watcher`: For Scribe's drift detection.

## 4. Security & Privacy
* **Data Isolation:** RLS enabled.
* **Encryption:** In-transit & At-rest (PostgreSQL TDE).