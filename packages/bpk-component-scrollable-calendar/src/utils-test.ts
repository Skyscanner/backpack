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
// @ts-nocheck

import { startOfDay, startOfMonth } from 'date-fns';

import { getMonthsArray, getMonthItemHeights } from './utils';

describe('utils', () => {
  describe('getMonthsArray', () => {
    it('should return a months array', () => {
      const startDate = startOfDay(startOfMonth(new Date(2020, 3, 1)));
      const monthsArray = getMonthsArray(startDate, 5);

      expect(monthsArray).toHaveLength(6);
    });
  });

  describe('getMonthItemHeights', () => {
    const startDate = startOfDay(startOfMonth(new Date(2020, 3, 1)));
    const monthsArray = getMonthsArray(startDate, 5);

    it('should return an array of month item heights', () => {
      const monthItemHeights = getMonthItemHeights(monthsArray, 1, 7, 44, 130);
      expect(monthItemHeights).toHaveLength(6);
      expect(monthItemHeights).toEqual([350, 350, 350, 350, 394, 350]);
    });
  });
});
