import dayjs from 'dayjs';

export function getYearDates(year) {
    const startDate = dayjs(`${year}-01-01`);
  const endDate = dayjs(`${year}-12-31`);

  const dates = [];
  let currentDate = startDate;

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    dates.push(currentDate.format('YYYY-MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }

  return dates;

}


