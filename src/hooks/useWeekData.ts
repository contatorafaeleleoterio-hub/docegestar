import { getWeek } from '../data';
import type { WeekContent } from '../types';

export function useWeekData(weekNumber: number): WeekContent | undefined {
  return getWeek(weekNumber);
}
