# Security Policy & Sentinel Protocols

## 1. Row Level Security (RLS)
**ALL TABLES must have RLS enabled.**
No table should ever be `public` (exception: strictly static read-only reference data, if any exists).

### Standard Policy: "Owner Access Only"
For `daily_logs`, `impact_events`, and `velocity_metrics`:

```sql
-- READ
CREATE POLICY "Users can view own data" 
ON table_name FOR SELECT 
USING (auth.uid() = user_id);

-- INSERT
CREATE POLICY "Users can insert own data" 
ON table_name FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- UPDATE
CREATE POLICY "Users can update own data" 
ON table_name FOR UPDATE 
USING (auth.uid() = user_id);

-- DELETE
CREATE POLICY "Users can delete own data" 
ON table_name FOR DELETE 
USING (auth.uid() = user_id);
```

### Profile Policy
`profiles` requires a slightly different trigger to auto-create on user signup (handled by Supabase Auth Triggers).

## 2. Data Classification

### Level 1: Public
*   None. (Nothing is public by default).

### Level 2: Internal (Low Sensitivity)
*   `velocity_metrics`: Numbers and scores.
*   `impact_events.tags`: Metadata.

### Level 3: Confidential (High Sensitivity)
*   `daily_logs.audio_url`: The User's raw voice.
*   `daily_logs.content_text`: The transcription.
*   **Protection:** These columns should NEVER be exposed in "Shareable Links" unless explicitly authorized.

## 3. The "Sentinel" Agent
The **Sentinel** agent runs on every DB migration PR.

### Audit Checklist
1.  **Check RLS:** Does every new table have `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`?
2.  **Check Policies:** Is there a policy using `auth.uid()`?
3.  **Check Secrets:** Are we accidentally committing API keys in `seed.sql`?

## 4. Encryption
*   **At Rest:** Handled by Supabase TDE (Transparent Data Encryption).
*   **In Transit:** SSL/TLS forced on all connections.
