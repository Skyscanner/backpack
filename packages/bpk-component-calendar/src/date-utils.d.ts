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

import { startOfMonth } from 'date-fns/startOfMonth';
import { endOfMonth } from 'date-fns/endOfMonth';
import { lastDayOfMonth } from 'date-fns/lastDayOfMonth';
import { getDay } from 'date-fns/getDay';
import { isWithinInterval as isWithinRange } from 'date-fns/isWithinInterval';
import { isToday } from 'date-fns/isToday';
import { isSaturday } from 'date-fns/isSaturday';
import { isSunday } from 'date-fns/isSunday';
import { isSameDay } from 'date-fns/isSameDay';
import { isSameWeek } from 'date-fns/isSameWeek';
import { isSameMonth } from 'date-fns/isSameMonth';
import { isBefore } from 'date-fns/isBefore';
import { isAfter } from 'date-fns/isAfter';
import { differenceInCalendarMonths } from 'date-fns/differenceInCalendarMonths';
import { addDays } from 'date-fns/addDays';
import { addMonths } from 'date-fns/addMonths';
import { startOfDay } from 'date-fns/startOfDay';
import { parseISO } from 'date-fns/parseISO';
import { format } from 'date-fns/format';
import type { DaysOfWeek } from './custom-proptypes';
declare function daysInMonth(year: number, month: number): number;
declare function getCalendarMonthWeeks(date: Date, weekStartsOn: number): Date[][];
declare function getLastDayOfWeekend(daysOfWeek: DaysOfWeek): number;
declare function getFirstDayOfWeekend(daysOfWeek: DaysOfWeek): number;
declare const orderDaysOfWeek: (daysOfWeek: DaysOfWeek, weekStartsOn: number) => import("./custom-proptypes").WeekDay[];
declare function getMonthRange(from: Date, to: Date): {
    min: Date;
    max: Date;
};
declare function getMonthsInRange(from: Date, to: Date): Date[];
declare const dateToBoundaries: (date: Date | null, minDate: Date, maxDate: Date) => Date;
declare const setMonthYear: (date: Date | null, newMonth: number, newYear: number) => Date;
declare const parseIsoDate: typeof parseISO;
declare const formatIsoDate: (date: Date) => string;
declare const formatIsoMonth: (date: Date) => string;
export { getCalendarMonthWeeks, getFirstDayOfWeekend, getLastDayOfWeekend, getMonthsInRange, getMonthRange, getDay, dateToBoundaries, isWithinRange, isSaturday, isSunday, isToday, isSameDay, isSameWeek, isSameMonth, isBefore, isAfter, differenceInCalendarMonths, addMonths, addDays, orderDaysOfWeek, setMonthYear, startOfMonth, lastDayOfMonth, startOfDay, format, daysInMonth, formatIsoDate, formatIsoMonth, parseIsoDate, endOfMonth, };
