# System Architecture: Index (Unified Experience)

## 1. High-Level Overview
**Index** is a self-evolving Career Velocity ecosystem.
- **Surface:** Unified Web + Mobile apps (Feature Parity).
- **Core:** Agentic Backend for ROI calculation.
- **Evolution:** Autonomous agents (Scout & Scribe) that research new features and maintain documentation.

## 2. The Agentic Workforce

### A. The Builders (Execution)
* **"Forge" (Frontend Architect):**
    * **Scope:** Web (Next.js) & Mobile (Expo).
    * **Responsibility:** Implements pixel-perfect UI using **Aceternity** (Web) and **Skia** (Mobile).
    * **Constraint:** Must verify API syntax via `context7` before writing components.
* **"Nexus" (Backend Engineer):**
    * **Scope:** Supabase & Edge Functions.
    * **Responsibility:** Writes SQL migrations and "Velocity" calculation logic.

### B. The Guardians (Quality & Security)
* **"Sentinel" (SecOps):**
    * **Scope:** RLS Policies & Secrets.
    * **Trigger:** Any DB schema change.
    * **Action:** Audits for data leaks (e.g., "Can User A see User B's data?").
* **"Jules" (QA Simulator):**
    * **Role:** Simulates synthetic user behavior to validate ROI math on every PR.

### C. The Thinkers (Strategy)
* **"Analyst" (Logic Core):**
    * **Model:** **Gemini 1.5 Pro**.
    * **Role:** Processes voice notes and calculates career velocity.
* **"Scout" (Researcher):**
    * **Role:** Searches Google for new productivity metrics (DORA, SPACE).
* **"Scribe" (Librarian):**
    * **Role:** Ensures `docs/` match `src/`. Opens PRs to fix documentation drift.

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