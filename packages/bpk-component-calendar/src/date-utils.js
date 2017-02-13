import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import startOfWeek from 'date-fns/start_of_week';
import lastDayOfWeek from 'date-fns/last_day_of_week';
import startOfDay from 'date-fns/start_of_day';
import eachDay from 'date-fns/each_day';
import getDay from 'date-fns/get_day';

import isWithinRange from 'date-fns/is_within_range';
import isToday from 'date-fns/is_today';
import isSaturday from 'date-fns/is_saturday';
import isSunday from 'date-fns/is_sunday';
import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';
import isBefore from 'date-fns/is_before';
import differenceInCalendarMonths from 'date-fns/difference_in_calendar_months';

import addDays from 'date-fns/add_days';
import addWeeks from 'date-fns/add_weeks';
import addMonths from 'date-fns/add_months';
import setMonth from 'date-fns/set_month';
import setYear from 'date-fns/set_year';

import parse from 'date-fns/parse';
import format from 'date-fns/format';

function getCalendarMonthWeeks(month, weekStartsOn) {
  const baseDate = new Date(month);
  const firstOfMonth = startOfMonth(baseDate);

  let currentDay = startOfWeek(firstOfMonth, { weekStartsOn });
  const weeksInMonth = [];

  for (let i = 0; i < 6; i += 1) {
    const currentWeek = eachDay(currentDay, lastDayOfWeek(currentDay, { weekStartsOn }));
    weeksInMonth.push(currentWeek);
    currentDay = addWeeks(currentDay, 1);
  }

  return weeksInMonth;
}

/* Takes arbitrary dates and returns the beginning of the first and enf of the last month containing these dates  */
function getMonthRange(from, to) {
  return {
    min: startOfMonth(from),
    max: endOfMonth(to),
  };
}

function getMonthsInRange(from, to) {
  const { min, max } = getMonthRange(from, to);
  let currentMonth = startOfMonth(from);
  const monthsInRange = [];

  while (isWithinRange(currentMonth, min, max)) {
    monthsInRange.push(currentMonth);
    currentMonth = addMonths(currentMonth, 1);
  }

  return monthsInRange;
}

const dateToBoundaries = (date, minDate, maxDate) => {
  if (isWithinRange(date, minDate, maxDate)) {
    return date;
  } else if (isBefore(date, minDate)) {
    return minDate;
  }
  return maxDate;
};

const setMonthYear = (date, newMonth, newYear) => setYear(
  setMonth(date, newMonth),
  newYear,
);

const parseIsoDate = parse;
const formatIsoDate = date => format(date, 'YYYY-MM-DD');
const formatIsoMonth = date => format(date, 'YYYY-MM');

export {
  getCalendarMonthWeeks,
  getMonthsInRange,
  getMonthRange,
  getDay,
  dateToBoundaries,
  isWithinRange,
  isSaturday,
  isSunday,
  isToday,
  isSameDay,
  isSameMonth,
  differenceInCalendarMonths,
  addMonths,
  addDays,
  setMonthYear,
  startOfMonth,
  lastDayOfMonth,
  startOfDay,
  format,
  formatIsoDate,
  formatIsoMonth,
  parseIsoDate,
};
