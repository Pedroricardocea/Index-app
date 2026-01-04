# Agent Handbook: How to Lead the AI Workforce

## 1. The Core Philosophy: "You are the Architect, We are the Builders"
You don't need to write code. You need to **write intent**.
The Agents (Forge, Nexus, Sentinel, etc.) are capable, but they need clear "Tickets" (Prompts) to function effectively.

## 2. Meet Your Team (Review `AGENTS.md`)
*   **Forge (Frontend):** Builds the UI (`apps/web`, `apps/mobile`).
*   **Nexus (Backend):** Writes the Math & SQL (`packages/logic`, `supabase`).
*   **Sentinel (Security):** Audits for secrets and RLS breaches.
*   **Scout (Research):** Finds external data/metrics to validate ideas.
*   **Jules (Automation):** The QA engineer. Runs tests and simulations.
*   **Analyst (Intelligence):** The AI User. Processes valid inputs.
*   **Scribe (Docs):** Keeps documentation in sync with code.

## 3. How to Prompt Effectively
Use the **"Role-Goal-Context"** pattern.

### ❌ Bad Prompt
> "Make a button."

### ✅ Good Prompt
> **@Forge** (Role), I need a 'Record Voice' button for the Dashboard (Goal).
> *   **Context:** It should be a large Floating Action Button (FAB) in the bottom right.
> *   **Constraint:** Use the `primary` color from `index.css`. Matches the Mobile design.

## 4. Workflows

### A. The "New Feature" Workflow
1.  **Research:** Ask **Scout** if this feature aligns with industry standards.
    *   *Prompt:* "@Scout Research how 'Linear' handles velocity tracking."
2.  **Plan:** Tell **Nexus** to update the DB Schema.
    *   *Prompt:* "@Nexus Create a table for 'Goals'."
3.  **Audit:** Ask **Sentinel** to check the new schema.
    *   *Prompt:* "@Sentinel Verify the RLS policies on the 'Goals' table."
4.  **UI:** Tell **Forge** to build the interface.
    *   *Prompt:* "@Forge Build the GoalWidget component."

### B. The "Bug Fix" Workflow
1.  **Diagnose:** Ask **Nexus** to explain the bug.
2.  **Test:** Ask **Jules** to write a failing test case.
    *   *Prompt:* "@Jules Create a reproduction test case for the login crash."
3.  **Fix:** Ask **Forge** (UI) or **Nexus** (Logic) to resolve it.
4.  **Verify:** Ask **Jules** to run the simulation.
    *   *Prompt:* "@Jules Run the full simulation suite."

## 5. Pro Tips
*   **Be Specific about Files:** "Edit `packages/logic/src/velocity.ts`" is better than "Fix the logic."
*   **One Step at a Time:** Don't ask for a whole app in one prompt. Break it down.
*   **Documentation:** If you change code, always tell **Scribe**: "@Scribe Update the docs to match."

#