# Environment Setup Guide: TurboRepo & Vercel

This guide explains how to acquire the necessary API keys for your `.env` file to enable Remote Caching (Turbo) and Deployment (Vercel).

## 1. TurboRepo (Remote Caching)
**Goal:** Speed up builds by sharing a cloud cache between your machine and CI.

### Step 1: Create Account
1.  Go to [vercel.com](https://vercel.com) (Vercel owns TurboRepo).
2.  Sign up or Log in with GitHub.

### Step 2: Get Team & Project ID
1.  In your terminal, run: `npx turbo login`
    *   This will open a browser to authenticate.
2.  Run: `npx turbo link`
    *   Select your Vercel Team.
    *   This will create a `.turbo/` folder locally (Verified: You already have this).
3.  **To get the Token for CI/CD:**
    *   Go to Vercel Dashboard -> Settings -> Tokens.
    *   Create a token named "GitHub Actions".
    *   **Env Var:** `TURBO_TOKEN`

### Step 3: Get Team ID
*   Go to Vercel Dashboard -> Settings -> General.
*   Copy "Team ID".
*   **Env Var:** `TURBO_TEAM`

---

## 2. Vercel (Deployment)
**Goal:** Deploy the `web` app to a production URL.

### Step 1: Link Project
1.  **Crucial:** Navigate to the specific app folder first.
    *   Command: `cd apps/web`
2.  Run: `npx vercel link`
3.  Follow the prompts.
    *   **Project Name:** Must be lowercase (e.g., `index-app`).
    *   **Root Directory:** Keep default (`./`).

### Step 2: Get IDs
*   **Org ID:** Found in `.vercel/project.json` (after linking) or Vercel Settings.
    *   **Env Var:** `VERCEL_ORG_ID`
*   **Project ID:** Found in `.vercel/project.json`.
    *   **Env Var:** `VERCEL_PROJECT_ID`

### Step 3: Get Token
*   Reuse the same token from the Turbo step, or create a new one.
*   **Env Var:** `VERCEL_TOKEN`

---

## 3. Summary of `.env` Updates
Copy these values into your `.env` file:

```bash
# --- CI/CD & BUILD ---
TURBO_TOKEN="<paste-your-token-here>"
TURBO_TEAM="<paste-team-id>"

VERCEL_ORG_ID="<paste-org-id>"
VERCEL_PROJECT_ID="<paste-project-id>"
VERCEL_TOKEN="<paste-your-token-here>"
```
