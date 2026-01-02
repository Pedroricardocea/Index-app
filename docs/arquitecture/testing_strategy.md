# Testing Strategy: The "Jules" Simulation Protocol

## 1. Core Philosophy
We do not just check if the code *compiles*. We check if the **Career Velocity Logic** holds up under real-world usage.
We use **Synthetic Simulation** to prove value.

## 2. The "Jules" Agent (CI/CD)
**Jules** is our Automated QA Agent running in GitHub Actions.
* **Trigger:** Every Pull Request.
* **Role:** Jules spins up a temporary environment and acts as a "Ghost User."

## 3. The Simulation Loop
Instead of static unit tests, Jules runs a **"Simulated Work Week"**:

1.  **Day 1 (Baseline):**
    * *Action:* Jules injects a synthetic voice note: *"I manually fixed the SQL query."*
    * *Expectation:* System detects "Maintenance Work." Velocity = Low.
2.  **Day 3 (Improvement):**
    * *Action:* Jules injects: *"I wrote a script to automate that SQL fix."*
    * *Expectation:* System detects "Automation Win." Velocity = Spikes ⬆️.
3.  **Day 7 (Reporting):**
    * *Action:* Jules checks the Dashboard.
    * *Assertion:* Verify that "Leverage Ratio" moved from 0% to 50%.

## 4. Technology Stack
* **Web E2E:** **Playwright**. It renders the Aceternity charts and verifies pixels.
* **Mobile E2E:** **Maestro**. It taps buttons on a virtual iPhone to test haptics and flows.
* **Logic Simulation:** **Vitest**. Runs the `/packages/logic` math against 1,000 generated scenarios to ensure no "Velocity Inflation."