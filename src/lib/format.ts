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

export const getCurrentWeek = () => {
  const today = new Date(Date.now());
  const currentDay = today.getDay();

  const start = new Date(Date.now());
  if (currentDay === 0) {
    start.setDate(today.getDate() - 6);
  } else {
    start.setDate(today.getDate() - (currentDay - 1));
  }

  const end = new Date(Date.now());
  end.setDate(start.getDate() + 6);

  return {
    start,
    end,
  };
};

export const getWeekIterator = (): Date[] => {
  const { start } = getCurrentWeek();
  const today = new Date(Date.now());
  const iterator: Date[] = [];
  while (today.getTime() >= start.getTime()) {
    iterator.push(new Date(today.getTime()));
    today.setDate(today.getDate() - 1);
  }
  return iterator;
};

export const getMsFromString = (date: string) =>
  new Date(date.split('+')[0]).getTime();
