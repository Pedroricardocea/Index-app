# UX Flows & User Journey

## 1. The Daily Check-In (Core Loop)
1.  **Trigger:** User opens app (Mobile or Web).
2.  **State:** Dashboard shows "Morning Velocity" (calculated from yesterday).
3.  **Action:** User taps "Record Log" (FAB - Floating Action Button).
4.  **Interaction:**
    *   Mic opens (Waveform animation).
    *   User speaks: "I deployed the new API endpoint and fixed the login bug."
    *   User taps "Stop".
5.  **Feedback:**
    *   Loading state ("Analyst is thinking...").
    *   **Result:** A "Bento Card" pops up showing:
        *   "Execution +10%"
        *   "Quality +5%"
    *   User swipes to dismiss.

## 2. The Deep Dive (Web Only)
1.  **Trigger:** User clicks a specific day on the contribution graph.
2.  **View:** "Daily Report" modal.
3.  **Content:**
    *   Full transcript.
    *   Extracted "Impact Events" list.
    *   Button: "Ask Analyst" (Chat interface).
