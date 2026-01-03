# Project Map: Navigating the Index Monorepo

## Root Structure
This project uses **TurboRepo** to manage a monorepo (multiple apps sharing code).

```
/
├── apps/               # The Applications (Deployable)
│   ├── web/            # Next.js 14 App (Desktop/Mobile Web)
│   └── mobile/         # Expo App (iOS/Android)
│
├── packages/           # Shared Code (The "Brain")
│   ├── logic/          # PURE TypeScript business logic (No React allowed!)
│   └── ui-shared/      # Icons, Colors, Design Tokens (No Business Logic!)
│
├── docs/               # The "Knowledge Base" (Source of Truth)
│   ├── arquitecture/   # System Design, Schema, Security
│   ├── design/         # UI specs, User Flows
│   └── guides/         # Manuals (You are here)
│
└── supabase/           # Database
    └── migrations/     # SQL files to set up the DB
```

## detailed Breakdown

### 1. `packages/logic` (The Most Important Folder)
*   **What is it?** The mathematical core of "Career Velocity."
*   **Why separate it?** Because **Mobile** and **Web** must calculate velocity EXACTLY the same way. By importing this package, we guarantee parity.
*   **Tests:** `npm test` runs here to prove the math works.

### 2. `packages/ui-shared`
*   **What is it?** The "Design System" in code.
*   **Contents:**
    *   `tokens.ts`: Colors (`#000000`), Spacing, Fonts.
    *   `icons/`: SVG paths compatible with both React Native and React DOM.

### 3. `apps/web` (Next.js)
*   **Tech:** React, Tailwind CSS, Framer Motion.
*   **Role:** The deep-dive analytics dashboard.

### 4. `apps/mobile` (Expo)
*   **Tech:** React Native, NativeWind, Skia.
*   **Role:** Quick capture (Voice Notes) and daily status check.

## Where do I put my code?
*   **"I'm adding a new calculation..."** -> `packages/logic`
*   **"I'm changing the primary color..."** -> `packages/ui-shared`
*   **"I'm building the Login Screen..."** -> `apps/web` AND `apps/mobile`
