# Agent Tooling & MCP Definitions

## Overview
This document defines the **Model Context Protocol (MCP)** interfaces for the Index ecosystem.
**Agents must strictly adhere to these JSON schemas when calling tools.**

---

## 1. Research Tools (Used by: SCOUT)

### `mcp-google-search`
* **Description:** Performs a semantic web search to find engineering metrics, studies, and best practices.
* **Provider:** SerpApi or Google Custom Search JSON API.
* **Function Name:** `search_web`
* **Schema:**
    ```json
    {
      "name": "search_web",
      "description": "Search the web for productivity metrics and engineering studies.",
      "parameters": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "The search query (e.g., 'SPACE framework metrics 2026')."
          },
          "num_results": {
            "type": "integer",
            "description": "Number of results to return (default: 5).",
            "maximum": 10
          }
        },
        "required": ["query"]
      }
    }
    ```

---

## 2. Data Tools (Used by: ANALYST, JULES)

### `mcp-database-sql`
* **Description:** Executes read-only SQL queries against Supabase to generate reports.
* **Restriction:** ANALYST agent has **READ ONLY** access. Only core backend logic can write.
* **Function Name:** `run_sql_query`
* **Schema:**
    ```json
    {
      "name": "run_sql_query",
      "description": "Execute a readonly SQL query to fetch user data.",
      "parameters": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "The SQL query string."
          }
        },
        "required": ["query"]
      }
    }
    ```

### `mcp-vector-search`
* **Description:** Performs RAG (Retrieval Augmented Generation) to find historical context.
* **Function Name:** `search_past_entries`
* **Schema:**
    ```json
    {
      "name": "search_past_entries",
      "description": "Find past work logs similar to the current topic.",
      "parameters": {
        "type": "object",
        "properties": {
          "query_text": {
            "type": "string",
            "description": "The concept to search for (e.g., 'CRM Sync Script')."
          },
          "lookback_days": {
            "type": "integer",
            "description": "Limit search to last N days (default: 90)."
          }
        },
        "required": ["query_text"]
      }
    }
    ```

---

## 3. Governance Tools (Used by: SCRIBE)

### `mcp-fs-reader`
* **Description:** Reads documentation or code files to check for drift.
* **Function Name:** `read_file_content`
* **Schema:**
    ```json
    {
      "name": "read_file_content",
      "description": "Read the contents of a file in the repository.",
      "parameters": {
        "type": "object",
        "properties": {
          "file_path": {
            "type": "string",
            "description": "Relative path from root (e.g., 'docs/architecture/system_design.md')."
          }
        },
        "required": ["file_path"]
      }
    }
    ```

### `mcp-fs-writer`
* **Description:** Updates documentation files.
* **Function Name:** `update_file`
* **Schema:**
    ```json
    {
      "name": "update_file",
      "description": "Overwrite a file with new content.",
      "parameters": {
        "type": "object",
        "properties": {
          "file_path": {
            "type": "string",
            "description": "Relative path from root."
          },
          "new_content": {
            "type": "string",
            "description": "The full text content to write."
          }
        },
        "required": ["file_path", "new_content"]
      }
    }
    ```

---

## 4. Utility Tools (Used by: ALL)

### `mcp-clock`
* **Description:** Returns the current server time (UTC). Critical for time-series calculations.
* **Function Name:** `get_current_time`
* **Schema:** `{} ` (No parameters)

---
## 5. Engineering Tools (Used by: FORGE, NEXUS)

### `mcp-npm-search` (via Context7)
* **Description:** Finds the correct install command for libraries to avoid "package not found" errors.
* **Agent:** Forge

### `mcp-mobile-preview` (New)
* **Description:** Triggers a local Expo build to verify that code compiles.
* **Function:** `check_mobile_compilation`
* **Schema:** `{}` (Runs `npx expo type-check`)

---
## 6. Security Tools (Used by: SENTINEL)

### `mcp-security-audit`
* **Description:** Scans the codebase for hardcoded secrets and open RLS policies.
* **Function:** `audit_codebase`
* **Schema:**
    ```json
    {
      "name": "audit_codebase",
      "description": "Scan for security vulnerabilities.",
      "parameters": {
        "scan_type": {
          "type": "string",
          "enum": ["secrets", "rls_policies", "dependency_vulns"]
        }
      }
    }
    ```

---

## 7. Version Control (Used by: SCRIBE, FORGE)

### `mcp-github`
* **Description:** Allows agents to interact with the repo (PRs, Issues).
* **Function:** `create_pull_request`
* **Schema:** Standard GitHub MCP Schema.