import { DailyLog, ImpactEvent } from './types';

/**
 * Calculates the "Career Velocity" score for a single day.
 * Formula:
 * Base Score = (Sentiment * 20) + (Sum of Impact Leverage Scores * 5)
 * Range: 0 to 100 (Clamped)
 *
 * @param log The DailyLog entry (including sentiment).
 * @param events The ImpactEvents extracted from that log.
 */
export const calculateVelocity = (log: DailyLog, events: ImpactEvent[] = []): number => {
  // 1. Sentiment Component (-1.0 to 1.0) -> Scaled to -20 to +20
  const sentimentComponent = log.sentiment_score * 20;

  // 2. Impact Component (Sum of leverage scores 1-10) -> Scaled by 5
  // Example: 2 events with leverage 5 = 10 * 5 = 50 points.
  const impactComponent = events.reduce((sum, event) => sum + event.leverage_score, 0) * 5;

  // 3. Base Calculation
  // A neutral day (0 sentiment, 0 events) = 0.
  // A good day (0.5 sentiment, 1 event of lv 5) = 10 + 25 = 35.
  // A great day (0.8 sentiment, 2 events of lv 8) = 16 + 80 = 96.
  let rawScore = 50 + sentimentComponent + impactComponent; // Start at 50 (Baseline)

  // 4. Clamp between 0 and 100
  return Math.min(Math.max(Math.round(rawScore), 0), 100);
};

/**
 * Calculates the Rolling Average for the last 7 days.
 */
export const calculateRollingAverage = (scores: number[]): number => {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((a, b) => a + b, 0);
  return Number((sum / scores.length).toFixed(2));
};
