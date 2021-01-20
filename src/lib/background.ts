import BackgroundFetch from 'react-native-background-fetch';
import { getMaxHR, getWeekData, initHealthKit } from './health';
import {
  sendDailyGoalNotification,
  sendDailyProgressNotification,
  sendWeeklyGoalNotification,
} from './notifications';
import { trackEvent } from './tracking';

export const setUpBackgroundUpdates = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
    },
    async (taskId) => {
      try {
        trackEvent('run_background_activity');
        await initHealthKit();
        await getMaxHR();
        const res = await getWeekData();
        const todayPoints = Math.max(res[0].stepsPoints, res[0].workoutPoints);
        const weekPoints = res.reduce(
          (acc, val) => acc + Math.max(val.stepsPoints, val.workoutPoints),
          0,
        );
        trackEvent('background_activity_points', { todayPoints });

        if (weekPoints >= 40) {
          await sendWeeklyGoalNotification();
        } else if (todayPoints === 8) {
          await sendDailyGoalNotification();
        } else if (todayPoints === 5) {
          await sendDailyProgressNotification();
        }
      } catch (err) {
        trackEvent('error', { message: err.message });
      }
      BackgroundFetch.finish(taskId);
    },
    (error) => {
      console.log('[js] RNBackgroundFetch failed to start', error);
    },
  );
};
