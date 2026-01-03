# Testing Strategy: The Auto-Remediation Protocol

## 1. Core Philosophy
We do not just "fail" builds. We **fix** them.
The CI pipeline detects issues, and **Jules (Google's Autonomous Agent)** attempts to resolve them before notifying a human.

## 2. The Loop (CI -> Jules -> PR)

### Step 1: Detection (GitHub Actions)
* **Trigger:** PR Opened.
* **Runner:** Playwright (Web) & Maestro (Mobile) run the "Critical User Journey" simulation.
* **Event:** Test Fails (e.g., "Velocity Score not calculating").

### Step 2: The Handoff (The "Jules" Hook)
Instead of just sending an email, the CI pipeline executes:
```bash
jules remote new \
  --repo index-app \
  --session "Fix the Velocity Calculation bug found in CI Run #${GITHUB_RUN_ID}" \
  --context "Test 'calc_velocity' failed. Expected 150, got null. Logs attached."