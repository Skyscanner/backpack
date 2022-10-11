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

import { DateUtils } from '../../bpk-component-calendar';

const getMonthsArray = (startDate, count) => {
  const months = [];

  for (let i = 0; i < count + 1; i += 1) {
    months.push(DateUtils.addMonths(startDate, i));
  }

  return months;
};

// Here we calculate the height of each calendar grid item in pixels, as the `react-window` API
// requires that these are provided so that they can be efficiently rendered.
const getMonthItemHeights = (
  months,
  weekStartsOn,
  columnCount,
  rowHeight,
  baseMonthItemHeight,
) => {
  const monthItemHeights = months.map((month) => {
    const firstDayOffset = (month.getDay() + 7 - weekStartsOn) % 7;
    const monthLength = DateUtils.daysInMonth(
      month.getYear(),
      month.getMonth(),
    );
    const calendarGridSpaces = firstDayOffset + monthLength;
    const rowCount = Math.ceil(calendarGridSpaces / columnCount);
    return baseMonthItemHeight + rowHeight * rowCount;
  });
  return monthItemHeights;
};

export { getMonthsArray, getMonthItemHeights };
