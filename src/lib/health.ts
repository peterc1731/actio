import { HealthItem } from '../types/health';

export const getWeekData = (): HealthItem[] => {
  return [
    {
      stepsPoints: 3,
      workoutPoints: 5,
      steps: 7000,
      date: new Date(2021, 0, 10, 12),
    },
    {
      stepsPoints: 5,
      workoutPoints: 0,
      steps: 9000,
      date: new Date(2021, 0, 9, 12),
    },
    {
      stepsPoints: 8,
      workoutPoints: 5,
      steps: 13000,
      date: new Date(2021, 0, 8, 12),
    },
  ];
};
