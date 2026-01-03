export type ImpactCategory = 'execution' | 'strategy' | 'networking' | 'learning';

export interface DailyLog {
  id: string; // uuid
  user_id: string; // uuid
  content_text?: string | null;
  audio_url?: string | null;
  date: string; // date string YYYY-MM-DD
  sentiment_score: number; // float -1.0 to 1.0
  created_at: string; // timestamptz string
}

export interface ImpactEvent {
  id: string;
  user_id: string;
  log_id?: string;
  category: ImpactCategory;
  title: string;
  leverage_score: number; // 1 to 10
  tags: string[];
  created_at: string;
}

export interface VelocityMetric {
  id: string;
  user_id: string;
  date: string;
  velocity_score: number;
  rolling_average_7d: number;
  delta_vs_baseline: number;
}
