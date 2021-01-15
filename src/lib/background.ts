import BackgroundFetch from 'react-native-background-fetch';
import { getMaxHR, getWeekData, initHealthKit } from './health';
import {
  sendDailyGoalNotification,
  sendWeeklyGoalNotification,
} from './notifications';

export const setUpBackgroundUpdates = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: 15,
    },
    async (taskId) => {
      try {
        await initHealthKit();
        await getMaxHR();
        const res = await getWeekData();
        const todayPoints = Math.max(res[0].stepsPoints, res[0].workoutPoints);
        const weekPoints = res.reduce(
          (acc, val) => acc + Math.max(val.stepsPoints, val.workoutPoints),
          0,
        );
        if (weekPoints >= 40) {
          sendWeeklyGoalNotification();
        } else if (todayPoints === 8) {
          sendDailyGoalNotification();
        }
      } catch (err) {}
      BackgroundFetch.finish(taskId);
    },
    (error) => {
      console.log('[js] RNBackgroundFetch failed to start', error);
    },
  );
};
