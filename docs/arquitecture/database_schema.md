# Database Schema & Data Model

## Overview
This schema is designed for **Supabase (PostgreSQL)**. It powers the "Career Velocity" calculation engine.
All tables must have **Row Level Security (RLS)** enabled.

## 1. Core Tables

### `profiles`
*   **Purpose:** Extends the standard Supabase `auth.users` table with application-specific data.
*   **RLS:** Users can view/edit their own profile. Public can view basic info (if enabled).

| Column | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | `primary_key` | References `auth.users.id`. |
| `full_name` | `text` | `null` | User's display name. |
| `avatar_url` | `text` | `null` | URL to profile picture. |
| `job_title` | `text` | `null` | Current professional role. |
| `target_velocity` | `float` | `1.0` | User's goal for velocity (baseline). |
| `created_at` | `timestamptz` | `now()` | Account creation time. |

### `daily_logs`
*   **Purpose:** The raw input from the user (Voice Notes or Text). This is the source of truth for the Analyst Agent.
*   **RLS:** Users can ONLY see their own logs.

| Column | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | `uuid_generate_v4()` | Unique ID. |
| `user_id` | `uuid` | `auth.uid()` | Owner of the log. |
| `content_text` | `text` | `null` | Transcribed text (Deepgram) or direct input. |
| `audio_url` | `text` | `null` | Path to storage bucket (if voice note). |
| `date` | `date` | `today()` | The "Day" this log belongs to. |
| `sentiment_score` | `float` | `0.0` | Calculated by AI (-1.0 to 1.0). |
| `created_at` | `timestamptz` | `now()` | |

### `impact_events`
*   **Purpose:** Structured data extracted from `daily_logs` by the **Analyst Agent**. These are specific wins/blockers.
*   **RLS:** Users can ONLY see their own events.

| Column | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | `uuid_generate_v4()` | Unique ID. |
| `user_id` | `uuid` | `auth.uid()` | Owner. |
| `log_id` | `uuid` | `references daily_logs` | Source log. |
| `category` | `enum` | `'execution'` | `execution`, `strategy`, `networking`, `learning`. |
| `title` | `text` | - | Short summary (e.g., "Fixed SQL Bug"). |
| `leverage_score` | `int` | `1` | 1-10 Score of how high-leverage this was. |
| `tags` | `text[]` | `[]` | Keywords (e.g., ["sql", "bugfix"]). |
| `created_at` | `timestamptz` | `now()` | |

### `velocity_metrics`
*   **Purpose:** processed time-series data for Charts (Victory Native / Recharts). Calculated daily by **Nexus**.
*   **RLS:** Users can ONLY see their own metrics.

| Column | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | `uuid_generate_v4()` | Unique ID. |
| `user_id` | `uuid` | `auth.uid()` | Owner. |
| `date` | `date` | - | The specific day. |
| `velocity_score` | `float` | `0.0` | The primary "Index" score for the day. |
| `rolling_average_7d` | `float` | `0.0` | 7-day moving average. |
| `delta_vs_baseline` | `float` | `0.0` | Change vs `profiles.target_velocity`. |

## 2. Indexes & Performance
*   `profiles(id)` - For fast lookups on auth.
*   `daily_logs(user_id, date)` - For fetching "today's" status.
*   `impact_events(user_id, created_at)` - For RAG retrieval.
*   `velocity_metrics(user_id, date)` - For rendering charts efficiently.

## 3. Relationships available to Analyst Agent
*   `daily_logs` -> **has_many** -> `impact_events`
*   `profiles` -> **has_many** -> `daily_logs`
