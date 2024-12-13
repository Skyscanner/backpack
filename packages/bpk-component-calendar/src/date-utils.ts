/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import { addDays } from 'date-fns/addDays';
import { addMonths } from 'date-fns/addMonths';
import { differenceInCalendarMonths } from 'date-fns/differenceInCalendarMonths';
import { endOfMonth } from 'date-fns/endOfMonth';
import { format } from 'date-fns/format';
import { getDay } from 'date-fns/getDay';
import { isAfter } from 'date-fns/isAfter';
import { isBefore } from 'date-fns/isBefore';
import { isSameDay } from 'date-fns/isSameDay';
import { isSameMonth } from 'date-fns/isSameMonth';
import { isSameWeek } from 'date-fns/isSameWeek';
import { isSaturday } from 'date-fns/isSaturday';
import { isSunday } from 'date-fns/isSunday';
import { isToday } from 'date-fns/isToday';
import { isWithinInterval as isWithinRange } from 'date-fns/isWithinInterval';
import { lastDayOfMonth } from 'date-fns/lastDayOfMonth';
import { parseISO } from 'date-fns/parseISO';
import { setMonth } from 'date-fns/setMonth';
import { setYear } from 'date-fns/setYear';
import { startOfDay } from 'date-fns/startOfDay';
import { startOfMonth } from 'date-fns/startOfMonth';

import type { DateProps } from './BpkCalendarGrid';
import type { DaysOfWeek } from './custom-proptypes';

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

function utc(year: number, month: number, date?: number) {
  return new Date(Date.UTC(year, month, date));
}

function daysInMonth(year: number, month: number) {
  // Gets the last day of the month specified
  return new Date(year, month + 1, 0).getDate();
}

function dateAtStartOfDay(year: number, month: number, day?: number) {
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

function addDay(year: number, month: number, day?: number) {
  const date = utc(year, month, day);
  date.setUTCDate(date.getUTCDate() + 1);
  return [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()];
}

function startOfWeek(
  year: number,
  month: number,
  day: number,
  weekStartsOn: number,
) {
  const date = utc(year, month, day);
  const weekDay = date.getUTCDay();
  const diff = (weekDay < weekStartsOn ? 7 : 0) + weekDay - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  return [date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()];
}

function getCalendarMonthWeeks(
  date: Date,
  weekStartsOn: number,
  formatDateFull: (d: Date) => Date | string,
): DateProps[][] {
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
      const currDate = dateAtStartOfDay(year, month, day);
      currWeek.push({
        val: currDate,
        textLabel: formatDateFull(currDate),
        isoLabel: formatIsoDate(currDate),
      });
      [year, month, day] = addDay(year, month, day);
    }
    weeksInMonth.push(currWeek);
  }
  return weeksInMonth;
}

function getLastDayOfWeekend(daysOfWeek: DaysOfWeek) {
  const weekend = daysOfWeek.map((day) => day.isWeekend);

  if (weekend[0] && weekend[6]) {
    // weekend stretches over turn the of the week
    return daysOfWeek[weekend.indexOf(false) - 1].index;
  }
  return daysOfWeek[weekend.lastIndexOf(true)].index;
}

function getFirstDayOfWeekend(daysOfWeek: DaysOfWeek) {
  const weekend = daysOfWeek.map((day) => day.isWeekend);

  if (weekend[0] && weekend[6]) {
    // weekend stretches over turn the of the week
    return daysOfWeek[weekend.lastIndexOf(false) + 1].index;
  }
  return daysOfWeek[weekend.indexOf(true)].index;
}

const orderDaysOfWeek = (daysOfWeek: DaysOfWeek, weekStartsOn: number) => {
  // Sorted in [sun, mon, ..., sat]
  const sortedDaysOfWeek = daysOfWeek.slice().sort((a, b) => a.index - b.index);
  // Ordered according to weekStartsOn, e.g. [mon, tue, ..., sun]
  return [
    ...sortedDaysOfWeek.slice(weekStartsOn),
    ...sortedDaysOfWeek.slice(0, weekStartsOn),
  ];
};

/* Takes arbitrary dates and returns the beginning of the first and enf of the last month containing these dates  */
function getMonthRange(from: Date, to: Date) {
  return {
    min: startOfMonth(from),
    max: endOfMonth(to),
  };
}

function getMonthsInRange(from: Date, to: Date) {
  const { max, min } = getMonthRange(from, to);
  let currentMonth = startOfMonth(from);
  const monthsInRange = [];

  while (isWithinRange(currentMonth, { start: min, end: max })) {
    monthsInRange.push(currentMonth);
    currentMonth = addMonths(currentMonth, 1);
  }

  return monthsInRange;
}

/*
Adjusts a date, if necessary, to fit within a range.
If date passed in is null, it'll return the minimum date.
*/
const dateToBoundaries = (date: Date | null, minDate: Date, maxDate: Date) => {
  if (!date) {
    return minDate;
  }
  if (isWithinRange(date, { start: minDate, end: maxDate })) {
    return date;
  }
  if (isBefore(date, minDate)) {
    return minDate;
  }
  return maxDate;
};

const setMonthYear = (date: Date | null, newMonth: number, newYear: number) => {
  const dateToUse = date || new Date(newYear, newMonth, 1);
  return setYear(setMonth(dateToUse, newMonth), newYear);
};

const parseIsoDate = parseISO;
const formatIsoDate = (date: Date) => format(date, 'yyyy-MM-dd');
const formatIsoMonth = (date: Date) => format(date, 'yyyy-MM');

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
  isBefore,
  isAfter,
  differenceInCalendarMonths,
  addMonths,
  addDays,
  orderDaysOfWeek,
  setMonthYear,
  startOfMonth,
  lastDayOfMonth,
  startOfDay,
  format,
  daysInMonth,
  formatIsoDate,
  formatIsoMonth,
  parseIsoDate,
  endOfMonth,
};
