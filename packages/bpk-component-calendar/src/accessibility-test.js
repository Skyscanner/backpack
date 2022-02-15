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

import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { weekDays, formatDateFull, formatMonth } from '../test-utils';

import BpkCalendarContainer from './BpkCalendarContainer';
import { CALENDAR_SELECTION_TYPE } from './custom-proptypes';

const createNodeMock = () => ({
  focus: () => null,
});

describe('BpkCalendar accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        id="myCalendar"
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
      />,
      { createNodeMock },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues in range mode', async () => {
    const { container } = render(
      <BpkCalendarContainer
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        id="myCalendar"
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.range,
          startDate: new Date(2010, 1, 16),
          endDate: new Date(2020, 1, 20),
        }}
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
      />,
      { createNodeMock },
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
