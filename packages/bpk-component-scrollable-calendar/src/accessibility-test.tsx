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

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { DateUtils } from '../../bpk-component-calendar';
import { weekDays, formatDateFull, formatMonth } from '../test-utils';

import BpkScrollableCalendar from './BpkScrollableCalendar';

describe('BpkScrollableCalendar accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const testDate = new Date(2010, 1, 15);
    const { container } = render(
      <BpkScrollableCalendar
        id="scrollableCalendar"
        weekStartsOn={1}
        daysOfWeek={weekDays}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        // Subtract one day from today's date to make today selectable by default
        minDate={DateUtils.addDays(testDate, -1)}
        maxDate={DateUtils.addMonths(testDate, 12)}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues when in range mode', async () => {
    const testDate = new Date(2010, 1, 15);
    const { container } = render(
      <BpkScrollableCalendar
        id="scrollableCalendar"
        weekStartsOn={1}
        daysOfWeek={weekDays}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        markToday={false}
        // Subtract one day from today's date to make today selectable by default
        minDate={DateUtils.addDays(testDate, -1)}
        maxDate={DateUtils.addMonths(testDate, 12)}
        selectionConfiguration={{
          type: 'range',
          startDate: testDate,
          endDate: DateUtils.addDays(testDate, +5),
        }}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
