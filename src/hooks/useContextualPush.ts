import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { getProfile } from './useUserProfile';
import { getCurrentWeek, getWeek } from '../data';
import { scheduleNotification } from './useNotifications';

const PUSH_ID = 'contextual-weekly';

export function useContextualPush() {
  useEffect(() => {
    if (Platform.OS === 'web') return;

    let cancelled = false;

    async function schedule() {
      const profile = await getProfile();
      if (!profile?.dueDate) return;

      const weekNumber = getCurrentWeek(profile.dueDate);
      if (weekNumber < 1 || weekNumber > 40) return;

      const weekData = getWeek(weekNumber);
      if (!weekData) return;

      const body = weekData.motivationalPhrase ?? weekData.baby?.milestones?.[0];
      if (!body) return;

      const firstName = profile.name?.split(' ')[0] ?? 'Mamãe';

      if (cancelled) return;

      await scheduleNotification({
        id: PUSH_ID,
        title: 'DoceGestar 🌸',
        body: `${firstName}, ${body}`,
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: 9,
          minute: 0,
        },
      });
    }

    schedule();
    return () => { cancelled = true; };
  }, []);
}
