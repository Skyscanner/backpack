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
/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import { DateUtils } from 'bpk-component-calendar';

import BpkScrollableCalendar from './BpkScrollableCalendar';
import { weekDays, formatDateFull, formatMonth } from '../test-utils';

const testDate = new Date(2010, 1, 15);

describe('BpkScrollableCalendar', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkScrollableCalendar
          weekStartsOn={1}
          daysOfWeek={weekDays}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          showWeekendSeparator
          // Subtract one day from today's date to make today selectable by default
          minDate={DateUtils.addDays(testDate, -1)}
          maxDate={DateUtils.addMonths(testDate, 12)}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const tree = renderer
      .create(
        <BpkScrollableCalendar
          weekStartsOn={1}
          daysOfWeek={weekDays}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          showWeekendSeparator
          // Subtract one day from today's date to make today selectable by default
          minDate={DateUtils.addDays(testDate, -1)}
          maxDate={DateUtils.addMonths(testDate, 12)}
          className="custom-classname"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const tree = renderer
      .create(
        <BpkScrollableCalendar
          weekStartsOn={1}
          daysOfWeek={weekDays}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          showWeekendSeparator
          // Subtract one day from today's date to make today selectable by default
          minDate={DateUtils.addDays(testDate, -1)}
          maxDate={DateUtils.addMonths(testDate, 12)}
          testID="123"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
