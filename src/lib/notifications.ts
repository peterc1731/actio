import { Notifications } from 'react-native-notifications';
import { hasRecivedNotification, setRecivedNotification } from './persist';
import { trackEvent } from './tracking';

export const sendDailyGoalNotification = async () => {
  const sent = await hasRecivedNotification('DAILY_MAX');
  if (!sent) {
    Notifications.postLocalNotification({
      title: '🏆 You are awesome!',
      body: 'You hit your daily goal of 8 points.',
    } as any);
    await setRecivedNotification('DAILY_MAX');
    trackEvent('send_daily_max_notification');
  }
};

export const sendDailyProgressNotification = async () => {
  const sent = await hasRecivedNotification('DAILY_PROGRESS');
  if (!sent) {
    Notifications.postLocalNotification({
      title: '💪 Great work!',
      body: 'You earned 5 points today.',
    } as any);
    await setRecivedNotification('DAILY_PROGRESS');
    trackEvent('send_daily_progress_notification');
  }
};

export const sendWeeklyGoalNotification = async () => {
  const sent = await hasRecivedNotification('WEEKLY_MAX');
  if (!sent) {
    Notifications.postLocalNotification({
      title: '🥇 This week you smashed it!',
      body: 'You reached 40 points.',
    } as any);
    await setRecivedNotification('WEEKLY_MAX');
    trackEvent('send_weekly_max_notification');
  }
};

export const initNotifications = () => {
  Notifications.registerRemoteNotifications();

  Notifications.events().registerNotificationReceivedForeground(
    (_, completion) => {
      completion({ alert: true, sound: false, badge: false });
    },
  );

  Notifications.events().registerNotificationOpened((_, completion) => {
    completion();
  });
};
