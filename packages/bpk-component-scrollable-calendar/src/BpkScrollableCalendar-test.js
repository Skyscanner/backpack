/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
/* @flow strict */

import React from 'react';
import { DateUtils } from 'bpk-component-calendar';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { weekDays, formatDateFull, formatMonth } from '../test-utils';

import BpkScrollableCalendar from './BpkScrollableCalendar';

const testDate = new Date(2010, 1, 15);
const id = 'scrollableCalendar';

describe('BpkScrollableCalendar', () => {
  it('should render correctly', () => {
    const tree = shallow(
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
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should render ranges correctly', () => {
    const tree = shallow(
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
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should support custom class names', () => {
    const tree = shallow(
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
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should support arbitrary props', () => {
    const tree = shallow(
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
    expect(toJson(tree)).toMatchSnapshot();
  });
});
