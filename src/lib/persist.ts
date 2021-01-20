import AsyncStorage from '@react-native-async-storage/async-storage';
import { datesEqual, inCurrentWeek } from './date';

const SETUP = 'actio-setup';
const NOTIFICATION = {
  DAILY_PROGRESS: 'actio-recieved-daily-progress',
  DAILY_MAX: 'actio-recieved-daily-max',
  WEEKLY_MAX: 'actio-recieved-weekly-max',
};

export const isSetUp = async () => {
  try {
    const value = await AsyncStorage.getItem(SETUP);
    return !!value;
  } catch (e) {
    return false;
  }
};

export const setUp = async () => {
  await AsyncStorage.setItem(SETUP, 'true');
};

export const hasRecivedNotification = async (
  type: keyof typeof NOTIFICATION,
) => {
  try {
    const value = await AsyncStorage.getItem(NOTIFICATION[type]);
    if (!value) {
      return false;
    }
    const date = new Date(value);
    if (type === 'WEEKLY_MAX') {
      return inCurrentWeek(date);
    }
    return datesEqual(date, new Date());
  } catch (e) {
    return false;
  }
};

export const setRecivedNotification = async (
  type: keyof typeof NOTIFICATION,
) => {
  await AsyncStorage.setItem(NOTIFICATION[type], new Date().toUTCString());
};
