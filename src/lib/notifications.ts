import { Notifications } from 'react-native-notifications';

export const sendDailyGoalNotification = () => {
  Notifications.postLocalNotification({
    title: '🏆 You are awesome!',
    body: 'You just hit your daily goal of 8 points.',
  } as any);
};

export const sendWeeklyGoalNotification = () => {
  Notifications.postLocalNotification({
    title: '🥇 This week you smashed it!',
    body: 'You reached 40 points.',
  } as any);
};

export const initNotifications = () => {
  Notifications.registerRemoteNotifications();

  Notifications.events().registerNotificationReceivedForeground(
    (_, completion) => {
      completion({ alert: false, sound: false, badge: false });
    },
  );

  Notifications.events().registerNotificationOpened((_, completion) => {
    completion();
  });
};
