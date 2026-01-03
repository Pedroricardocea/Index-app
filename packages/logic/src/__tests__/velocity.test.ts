import { describe, it, expect } from 'vitest';
import { calculateVelocity } from '../velocity';
import { DailyLog } from '../types';

describe('calculateVelocity', () => {
  it('should return a number', () => {
    const dummyLog: DailyLog = {
        id: '1',
        user_id: 'user1',
        date: '2024-01-01',
        sentiment_score: 0.5,
        created_at: new Date().toISOString()
    };
    const velocity = calculateVelocity(dummyLog, []);
    expect(typeof velocity).toBe('number');
  });
});
