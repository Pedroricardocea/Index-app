import { SupabaseClient } from '@supabase/supabase-js';
import { DailyLog } from './types';

/**
 * Saves a new daily check-in log to Supabase.
 * @param supabase The authenticated Supabase client.
 * @param note The text content of the check-in.
 * @param audioUrl (Optional) URL to the voice recording.
 * @returns The created DailyLog object.
 */
export const saveCheckIn = async (
  supabase: SupabaseClient,
  note: string,
  audioUrl?: string
): Promise<DailyLog> => {
  // 1. Verify Auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  // 2. Insert Data
  const { data, error } = await supabase
    .from('daily_logs')
    .insert({
      user_id: user.id,
      content_text: note,
      audio_url: audioUrl || null,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    })
    .select()
    .single();

  // 3. Handle Result
  if (error) throw new Error(`Failed to save check-in: ${error.message}`);
  if (!data) throw new Error('No data returned from insert');

  return data as DailyLog;
};
