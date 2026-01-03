import { describe, it, expect } from 'vitest';
import { calculateVelocity, calculateRollingAverage } from '../src/velocity';
import { DailyLog, ImpactEvent } from '../src/types';

describe('Velocity Calculation', () => {
  const mockLog: DailyLog = {
    id: '1',
    user_id: 'user-1',
    date: '2024-01-01',
    sentiment_score: 0.5, // +10 points (scaled by 20)
    created_at: new Date().toISOString()
  };

  const mockEvents: ImpactEvent[] = [
    {
      id: 'e1',
      user_id: 'user-1',
      category: 'execution',
      title: 'Fixed bug',
      leverage_score: 4, // +20 points (scaled by 5)
      tags: [],
      created_at: new Date().toISOString()
    }
  ];

  it('should calculate correct score for a good day', () => {
    // Base 50 + 10 (Sentiment) + 20 (Impact) = 80
    const score = calculateVelocity(mockLog, mockEvents);
    expect(score).toBe(80);
  });

  it('should clamp score to 100', () => {
    const greatLog = { ...mockLog, sentiment_score: 1.0 }; // +20
    const greatEvents = [
      ...mockEvents,
      { ...mockEvents[0], leverage_score: 10 } // +50
    ]; 
    // Base 50 + 20 + 20 + 50 = 140 -> Clamped to 100
    const score = calculateVelocity(greatLog, greatEvents);
    expect(score).toBe(100);
  });

  it('should handle negative sentiment', () => {
    const badLog = { ...mockLog, sentiment_score: -0.5 }; // -10
    // Base 50 - 10 + 20 (Impact) = 60
    const score = calculateVelocity(badLog, mockEvents);
    expect(score).toBe(60);
  });
});

describe('Rolling Average', () => {
  it('should calculate average correctly', () => {
    const scores = [80, 90, 100];
    expect(calculateRollingAverage(scores)).toBe(90);
  });
});
