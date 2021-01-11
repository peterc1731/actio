export const months = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];

export const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const getDateString = (date: Date) =>
  `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

export const formatWeekRange = (start: Date) => {
  const end = new Date();
  end.setDate(start.getDate() + 6);
  return `${getDateString(start)} - ${getDateString(end)}`;
};

export const formatDate = (date: Date) => {
  const today = new Date();
  if (date.getDate() === today.getDate()) {
    return 'TODAY';
  }
  today.setDate(today.getDate() - 1);
  if (date.getDate() === today.getDate()) {
    return 'YESTERDAY';
  }
  return getDateString(date);
};

export const getWorkoutText = (points: number) =>
  points === 8
    ? '30 minutes high intensity workout'
    : points === 5
    ? '30 minutes medium intensity workout'
    : '';

export const formatSteps = (steps: number) => {
  const str = `${steps}`;
  if (str.length < 4) {
    return str;
  }

  return `${str.slice(0, str.length - 3)},${str.slice(str.length - 3)}`;
};
