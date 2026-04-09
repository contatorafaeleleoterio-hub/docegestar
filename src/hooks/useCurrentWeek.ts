import { useState, useEffect } from 'react';
import { getProfile } from './useUserProfile';

export function calculateWeekFromDueDate(dueDateISO: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dueDate = new Date(dueDateISO);
  dueDate.setHours(0, 0, 0, 0);
  const msPerDay = 1000 * 60 * 60 * 24;
  const daysUntilDue = (dueDate.getTime() - today.getTime()) / msPerDay;
  const week = 40 - Math.round(daysUntilDue / 7);
  return Math.max(1, Math.min(40, week));
}

export function useCurrentWeek(): number | null {
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const profile = await getProfile();
      if (!cancelled && profile?.dueDate) {
        setCurrentWeek(calculateWeekFromDueDate(profile.dueDate));
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return currentWeek;
}
