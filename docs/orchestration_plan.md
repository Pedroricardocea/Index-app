# Agent Orchestration Plan: "Launchpad" (Phase 2)

**Status Update:** The Foundation (Monorepo, DB) and Applications (Web, Mobile) have been scaffolded.
**Current Goal:** Activate the Intelligence Layer and Verify System Integrity.

> [!TIP]
> **How to use:** Copy the code block for each step and paste it into the Agent's chat.

## Phase 3: The Intelligence & Validation (Pending)

### Step 1: Security Audit (Agent: Sentinel)
**Goal:** Verify the foundation is secure before proceeding.
```text
@Sentinel Verify our initial setup.
1. Scan `package.json` and `.env` (if exists) for exposed secrets.
2. Review the `supabase/migrations` folder. Confirm RLS is enabled on ALL tables.
3. Output a brief "Security Report".
```

### Step 2: Implement Velocity Logic (Agent: Nexus)
**Goal:** The math engine (if not fully implemented yet).
```text
@Nexus Implement the Velocity Calculation.
1. Check `packages/logic/src`.
2. Ensure `calculateVelocity(logs: DailyLog[]): number` is implemented and exported.
3. If it's just a dummy function, implement the actual weighted average logic based on `daily_logs.sentiment_score` and `impact_events.leverage_score`.
```

### Step 3: Documentation Sync (Agent: Scribe)
**Goal:** Ensure docs match the code we just built.
```text
@Scribe Check for Drift.
1. Read `packages/logic/src`.
2. Compare the code signature with `docs/arquitecture/database_schema.md`.
3. If there are discrepancies (e.g., missing columns/fields), update the documentation to match the code.
```

### Step 4: QA Simulation (Agent: Jules)
**Goal:** Verify the system works as a whole.
```text
@Jules Run the Validation Suite.
1. Run `npm test` in `packages/logic`.
2. Verify that the schema tests pass.
3. Attempt to run the build command `npm run build` to ensure no regression in the Apps.
```

## Phase 4: Feature Development (Next)

### Step 5: The "Morning Check-In" Feature (Agent: Forge)
**Goal:** Build the first real UI feature.
```text
@Forge Build the 'Morning Check-In' Card.
1. Create a `CheckInCard` component in `packages/ui-shared`.
2. It should have a 'Record' button.
3. Add it to `apps/web/page.tsx` and `apps/mobile/app/index.tsx`.
```
