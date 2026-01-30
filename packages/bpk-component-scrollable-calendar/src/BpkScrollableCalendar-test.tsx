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

import { render } from '@testing-library/react';

import '@testing-library/jest-dom';
import { weekDays, formatDateFull, formatMonth } from '../test-utils';

import BpkScrollableCalendar from './BpkScrollableCalendar';

import { DateUtils } from '@backpack/bpk-component-calendar';

const testDate = new Date(2010, 1, 15);
const id = 'scrollableCalendar';

describe('BpkScrollableCalendar', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkScrollableCalendar
        id={id}
        weekStartsOn={1}
        daysOfWeek={weekDays}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        // Subtract one day from today's date to make today selectable by default
        minDate={DateUtils.addDays(testDate, -1)}
        maxDate={DateUtils.addMonths(testDate, 12)}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render ranges correctly', () => {
    const { asFragment } = render(
      <BpkScrollableCalendar
        id={id}
        weekStartsOn={1}
        daysOfWeek={weekDays}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
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
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const { asFragment } = render(
      <BpkScrollableCalendar
        id={id}
        weekStartsOn={1}
        daysOfWeek={weekDays}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        // Subtract one day from today's date to make today selectable by default
        minDate={DateUtils.addDays(testDate, -1)}
        maxDate={DateUtils.addMonths(testDate, 12)}
        className="custom-classname"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const { asFragment } = render(
      <BpkScrollableCalendar
        id={id}
        weekStartsOn={1}
        daysOfWeek={weekDays}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        // Subtract one day from today's date to make today selectable by default
        minDate={DateUtils.addDays(testDate, -1)}
        maxDate={DateUtils.addMonths(testDate, 12)}
        testid="123"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
