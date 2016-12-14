import startOfMonth from 'date-fns/start_of_month';
import startOfWeek from 'date-fns/start_of_week';
import lastDayOfWeek from 'date-fns/last_day_of_week';
import eachDay from 'date-fns/each_day';
import addWeeks from 'date-fns/add_weeks';

export default function getCalendarMonthWeeks(month, weekStartsOn) {
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
