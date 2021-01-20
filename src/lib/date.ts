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

export const datesEqual = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export const inCurrentWeek = (date: Date) => {
  const { start, end } = getCurrentWeek();
  return date.getTime() > start.getTime() && date.getTime() < end.getTime();
};
