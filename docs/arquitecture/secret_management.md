# Secrets Management & Security Protocols

## 1. The Golden Rule
**NEVER commit `.env` files to Git.**
**NEVER paste API keys into Agent chat windows.**

## 2. Environment Variable Reference
The application requires the following keys to function.

### Core Infrastructure (Supabase)
| Variable | Description | Location |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | API Endpoint | `.env.local` (Public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Client Key | `.env.local` (Public) |
| `SUPABASE_SERVICE_ROLE_KEY` | **CRITICAL:** Admin Access | `.env` (Server Only) |

### AI & Agents
| Variable | Description | Location |
| :--- | :--- | :--- |
| `OPENAI_API_KEY` | GPT-4o Access | `.env` (Server Only) |
| `DEEPGRAM_API_KEY` | Voice Transcription | `.env` (Server Only) |
| `SERPAPI_KEY` | Google Search (Scout) | `.env` (Server Only) |

### Identity (Clerk)
| Variable | Description | Location |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Auth UI | `.env.local` (Public) |
| `CLERK_SECRET_KEY` | Auth Backend | `.env` (Server Only) |

### CI/CD (GitHub Actions)
| Variable | Description | Location |
| :--- | :--- | :--- |
| `EXPO_TOKEN` | Publishing Mobile App | GitHub Secrets |
| `VERCEL_TOKEN` | Deploying Web App | GitHub Secrets |

---

## 3. Secret Storage Strategy

### A. Local Development
* **Tool:** `dotenv`
* **File:** `.env.local` (Added to `.gitignore` automatically).
* **Setup:** Copy `.env.example` and fill in your keys.

### B. Team Sharing (The "Login Docs")
* **Tool:** **Infisical** or **1Password Developer CLI**.
* **Policy:** We sync secrets via an encrypted vault, not Slack/Discord.
* **Access:** Developers request access via the Engineering Lead.

### C. CI/CD (Production)
* **Tool:** GitHub Actions Secrets.
* **Rotation:** Keys are rotated every 90 days.
* **Jules (QA Agent):** Runs in a sanitized environment. It uses a **Mock API Key** for OpenAI during simulations to save costs and prevent leaks.

---

## 4. Login Portals
* **Supabase Dashboard:** `https://app.supabase.com` (Login via GitHub OAuth)
* **Clerk Dashboard:** `https://dashboard.clerk.com` (User Management)
* **Deepgram Console:** `https://console.deepgram.com` (Usage Logs)
* **OpenAI Platform:** `https://platform.openai.com` (API Usage & Limits)