import AppleHealthKit, { HealthInputOptions } from 'react-native-health';
import { HealthItem } from '../types/health';
import { getWeekIterator } from './format';

const notInitializedError = new Error('health kit not initialized');

const stepPoints = [
  { steps: 12500, points: 8 },
  { steps: 9999, points: 5 },
  { steps: 7000, points: 3 },
] as const;

let initialized = false;
let maxHR = 200;

export const initHealthKit = () =>
  new Promise<void>((resolve, reject) => {
    AppleHealthKit.initHealthKit(
      {
        permissions: {
          read: [
            AppleHealthKit.Constants.Permissions.StepCount,
            AppleHealthKit.Constants.Permissions.HeartRate,
            AppleHealthKit.Constants.Permissions.DateOfBirth,
            AppleHealthKit.Constants.Permissions.Workout,
          ],
          write: [],
        },
      },
      (err) => {
        if (err) {
          return reject(err);
        }
        initialized = true;
        return resolve();
      },
    );
  });

const getSteps = async (date: Date) =>
  new Promise<number>((resolve, reject) => {
    if (!initialized) {
      return reject(notInitializedError);
    }
    AppleHealthKit.getStepCount(
      {
        date: date.toISOString(),
        unit: AppleHealthKit.Constants.Units.count,
      },
      (err, results) => {
        if (err) {
          if (
            (err as any).message ===
            'No data available for the specified predicate.'
          ) {
            return resolve(0);
          } else {
            return reject(err);
          }
        }
        return resolve(Math.floor(results.value));
      },
    );
  });

const getStepsPoints = (steps: number) => {
  for (const level of stepPoints) {
    if (steps > level.steps) {
      return level.points;
    }
  }
  return 0;
};

export const getMaxHR = () =>
  new Promise<void>((resolve, reject) => {
    if (!initialized) {
      return reject(notInitializedError);
    }
    AppleHealthKit.getDateOfBirth({}, (err, results) => {
      if (err) {
        return reject(err);
      }
      maxHR = 220 - results.age;
      return resolve();
    });
  });

const getWorkoutSamples = async (
  start: Date,
  end: Date,
): Promise<{ start: string; end: string }[]> =>
  new Promise((resolve, reject) => {
    AppleHealthKit.getSamples(
      {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        type: 'Workout',
      } as HealthInputOptions,
      (err, workoutSamples) => {
        if (err) {
          return reject(err);
        }
        resolve(workoutSamples as any);
      },
    );
  });

const getAvgHr = async (start: string, end: string): Promise<number> =>
  new Promise((resolve, reject) => {
    AppleHealthKit.getHeartRateSamples(
      {
        unit: AppleHealthKit.Constants.Units.bpm,
        startDate: start,
        endDate: end,
      },
      (err, res) => {
        if (err) {
          return reject(err);
        }
        const hrSamples = (res as unknown) as {
          value: number;
        }[];
        const avgHr =
          hrSamples.reduce((acc, val) => acc + val.value, 0) / hrSamples.length;
        return resolve(avgHr);
      },
    );
  });

const getWorkoutPoints = async (date: Date) => {
  const startDate = new Date(date.getTime());
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);

  const endDate = new Date(date.getTime());
  endDate.setHours(23);
  endDate.setMinutes(59);
  endDate.setSeconds(59);

  const workoutSamples = await getWorkoutSamples(startDate, endDate);
  let points = 0;
  for (const sample of workoutSamples) {
    const length =
      (new Date(sample.end).getTime() - new Date(sample.start).getTime()) /
      1000 /
      60;
    if (length > 30) {
      const avgHr = await getAvgHr(sample.start, sample.end);
      if (avgHr >= 0.6 * maxHR) {
        points = 5;
      }
      if (avgHr >= 0.7 * maxHR) {
        points = 8;
      }
    }
  }
  return points;
};

export const getWeekData = async (): Promise<HealthItem[]> => {
  const iterator = getWeekIterator();
  const result: HealthItem[] = [];
  for (const date of iterator) {
    const steps = await getSteps(date);
    const stepsPoints = getStepsPoints(steps);
    const workoutPoints = await getWorkoutPoints(date);
    result.push({
      steps,
      stepsPoints,
      workoutPoints,
      date,
    });
  }
  return result;
};
