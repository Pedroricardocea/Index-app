import { SupabaseClient } from '@supabase/supabase-js';
import { DailyLog, ImpactEvent } from './types';

export const fetchDailyLogs = async (supabase: SupabaseClient): Promise<DailyLog[]> => {
  const { data, error } = await supabase
    .from('daily_logs')
    .select('*')
    .order('date', { ascending: true });

  if (error) throw error;
  return data as DailyLog[];
};

export const fetchImpactEvents = async (supabase: SupabaseClient): Promise<ImpactEvent[]> => {
  const { data, error } = await supabase
    .from('impact_events')
    .select('*')
    .order('date', { ascending: true });

  if (error) throw error;
  return data as ImpactEvent[];
};
