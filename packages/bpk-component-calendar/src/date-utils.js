/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import lastDayOfMonth from 'date-fns/last_day_of_month';
import getDay from 'date-fns/get_day';

import isWithinRange from 'date-fns/is_within_range';
import isToday from 'date-fns/is_today';
import isSaturday from 'date-fns/is_saturday';
import isSunday from 'date-fns/is_sunday';
import isSameDay from 'date-fns/is_same_day';
import isSameWeek from 'date-fns/is_same_week';
import isSameMonth from 'date-fns/is_same_month';
import isBefore from 'date-fns/is_before';
import differenceInCalendarMonths from 'date-fns/difference_in_calendar_months';

import addDays from 'date-fns/add_days';
import addMonths from 'date-fns/add_months';
import setMonth from 'date-fns/set_month';
import setYear from 'date-fns/set_year';
import startOfDay from 'date-fns/start_of_day';

import parse from 'date-fns/parse';
import format from 'date-fns/format';

const ONE_MINUTE_IN_MS = 60 * 1000;
const ONE_HOUR_IN_MS = 60 * ONE_MINUTE_IN_MS;

// TODO: Update to use date-fns functions.
// see: https://github.com/date-fns/date-fns/issues/571 and https://bugs.webkit.org/show_bug.cgi?id=188001
//
// Safari has a problem with DST when the transition occurrs during midnight. To test set your timezone
// to BRT (Brasilia) and type new Date(2018, 10, 4) on Safari's console.
// It will return `Nov 03 2018 23:00:00` whereas Chrome and Firefox return `Nov 04 2018 01:00:00`.
//
// To go aroud this problem we're mostly avoiding date objects and using UTC when that's not
// possible.

function utc(year, month, date) {
  return new Date(Date.UTC(year, month, date));
}

function dateAtStartOfDay(year, month, day) {
  const date = utc(year, month, day);
  const tzOffset = date.getTimezoneOffset();

  // Date is utc so we add/subtract the timezone hours.
  // Using setTime is consistent on every browser so we have the same result everywhere.
  date.setTime(date.getTime() + tzOffset * ONE_MINUTE_IN_MS);

  // Bug in Safari that only occurs when the transition from/to DST is during midnight (e.g. Brazil and Chile).
  // We want the exact day provided in the arguments so we adjust accordingly.
  if (day !== date.getDate() && date.getHours() === 23) {
    date.setTime(date.getTime() + ONE_HOUR_IN_MS);
  }
  return date;
}

function addDay(year, month, day) {
  const date = utc(year, month, day);
  date.setUTCDate(date.getUTCDate() + 1);
  return [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()];
}

function startOfWeek(year, month, day, weekStartsOn) {
  const date = utc(year, month, day);
  const weekDay = date.getUTCDay();
  const diff = (weekDay < weekStartsOn ? 7 : 0) + weekDay - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  return [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()];
}

function getCalendarMonthWeeks(date, weekStartsOn) {
  let [year, month, day] = startOfWeek(
    date.getFullYear(),
    date.getMonth(),
    1,
    weekStartsOn,
  );

  const weeksInMonth = [];

  for (let i = 0; i < 6; i += 1) {
    const currWeek = [];
    for (let j = 0; j < 7; j += 1) {
      currWeek.push(dateAtStartOfDay(year, month, day));
      [year, month, day] = addDay(year, month, day);
    }
    weeksInMonth.push(currWeek);
  }
  return weeksInMonth;
}

function getLastDayOfWeekend(daysOfWeek) {
  const weekend = daysOfWeek.map(day => day.isWeekend);

  if (weekend[0] && weekend[6]) {
    // weekend stretches over turn the of the week
    return daysOfWeek[weekend.indexOf(false) - 1].index;
  }
  return daysOfWeek[weekend.lastIndexOf(true)].index;
}

function getFirstDayOfWeekend(daysOfWeek) {
  const weekend = daysOfWeek.map(day => day.isWeekend);

  if (weekend[0] && weekend[6]) {
    // weekend stretches over turn the of the week
    return daysOfWeek[weekend.lastIndexOf(false) + 1].index;
  }
  return daysOfWeek[weekend.indexOf(true)].index;
}

const orderDaysOfWeek = (daysOfWeek, weekStartsOn) => {
  // Sorted in [sun, mon, ..., sat]
  const sortedDaysOfWeek = daysOfWeek.slice().sort((a, b) => a.index - b.index);
  // Ordered according to weekStartsOn, e.g. [mon, tue, ..., sun]
  return [
    ...sortedDaysOfWeek.slice(weekStartsOn),
    ...sortedDaysOfWeek.slice(0, weekStartsOn),
  ];
};

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
  }
  if (isBefore(date, minDate)) {
    return minDate;
  }
  return maxDate;
};

const setMonthYear = (date, newMonth, newYear) =>
  setYear(setMonth(date, newMonth), newYear);

const parseIsoDate = parse;
const formatIsoDate = date => format(date, 'YYYY-MM-DD');
const formatIsoMonth = date => format(date, 'YYYY-MM');

export {
  getCalendarMonthWeeks,
  getFirstDayOfWeekend,
  getLastDayOfWeekend,
  getMonthsInRange,
  getMonthRange,
  getDay,
  dateToBoundaries,
  isWithinRange,
  isSaturday,
  isSunday,
  isToday,
  isSameDay,
  isSameWeek,
  isSameMonth,
  differenceInCalendarMonths,
  addMonths,
  addDays,
  orderDaysOfWeek,
  setMonthYear,
  startOfMonth,
  lastDayOfMonth,
  startOfDay,
  format,
  formatIsoDate,
  formatIsoMonth,
  parseIsoDate,
};
