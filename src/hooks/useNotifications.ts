import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Web guard — expo-notifications não funciona na web
function isNotificationsSupported(): boolean {
  return Platform.OS !== 'web';
}

export interface ScheduleOptions {
  id: string;
  title: string;
  body: string;
  trigger: Notifications.NotificationTriggerInput;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationsSupported()) return false;
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleNotification(options: ScheduleOptions): Promise<string | null> {
  if (!isNotificationsSupported()) return null;
  const granted = await requestNotificationPermission();
  if (!granted) return null;
  await cancelNotification(options.id);
  const notifId = await Notifications.scheduleNotificationAsync({
    identifier: options.id,
    content: {
      title: options.title,
      body: options.body,
      sound: true,
    },
    trigger: options.trigger,
  });
  return notifId;
}

export async function cancelNotification(id: string): Promise<void> {
  if (!isNotificationsSupported()) return;
  await Notifications.cancelScheduledNotificationAsync(id);
}

export async function cancelAllNotifications(): Promise<void> {
  if (!isNotificationsSupported()) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function rescheduleIfNeeded(
  scheduled: Array<{ id: string; title: string; body: string; trigger: Notifications.NotificationTriggerInput }>
): Promise<void> {
  if (!isNotificationsSupported()) return;
  const existing = await Notifications.getAllScheduledNotificationsAsync();
  const existingIds = new Set(existing.map(n => n.identifier));
  for (const item of scheduled) {
    if (!existingIds.has(item.id)) {
      await scheduleNotification(item);
    }
  }
}
