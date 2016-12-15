import startOfMonth from 'date-fns/start_of_month';
import startOfWeek from 'date-fns/start_of_week';
import lastDayOfWeek from 'date-fns/last_day_of_week';
import startOfToday from 'date-fns/start_of_today';
import eachDay from 'date-fns/each_day';

import isWithinRange from 'date-fns/is_within_range';
import isToday from 'date-fns/is_today';
import isSaturday from 'date-fns/is_saturday';
import isSunday from 'date-fns/is_sunday';

import addWeeks from 'date-fns/add_weeks';
import addYears from 'date-fns/add_years';

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

const isDisabled = day => !isWithinRange(day, startOfToday(), addYears(startOfToday(), 1));

export {
  getCalendarMonthWeeks,
  isSaturday,
  isSunday,
  isToday,
  isDisabled,
};
