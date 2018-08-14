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

import PropTypes from 'prop-types';
import React from 'react';
import renderer from 'react-test-renderer';

import isWeekend from 'date-fns/is_weekend';
import { DateUtils } from 'bpk-component-calendar';
import { colorRed500 } from 'bpk-tokens/tokens/base.es6';

import BpkCalendarScrollDate from './BpkScrollableCalendarDate';
import BpkScrollableCalendarGridList from './BpkScrollableCalendarGridList';

import { weekDays, formatDateFull, formatMonth } from '../test-utils';

const testDate = new Date(2010, 1, 15);

describe('BpkCalendarScrollGridList', () => {
  it('should render correctly with no optional props set', () => {
    const tree = renderer
      .create(
        <BpkScrollableCalendarGridList
          minDate={DateUtils.addDays(testDate, -1)}
          maxDate={DateUtils.addMonths(testDate, 12)}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          DateComponent={BpkCalendarScrollDate}
          daysOfWeek={weekDays}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "showWeekendSeparator" attribute set to false', () => {
    const tree = renderer
      .create(
        <BpkScrollableCalendarGridList
          minDate={DateUtils.addDays(testDate, -1)}
          maxDate={DateUtils.addMonths(testDate, 12)}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          DateComponent={BpkCalendarScrollDate}
          daysOfWeek={weekDays}
          weekStartsOn={0}
          showWeekendSeparator={false}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a different "weekStartsOn" attribute', () => {
    const tree = renderer
      .create(
        <BpkScrollableCalendarGridList
          minDate={DateUtils.addDays(testDate, -1)}
          maxDate={DateUtils.addMonths(testDate, 12)}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          DateComponent={BpkCalendarScrollDate}
          daysOfWeek={weekDays}
          weekStartsOn={3}
          showWeekendSeparator
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "dateModifiers" attribute', () => {
    const modifiers = {
      someClass: () => true,
    };
    const tree = renderer
      .create(
        <BpkScrollableCalendarGridList
          minDate={DateUtils.addDays(testDate, -1)}
          maxDate={DateUtils.addMonths(testDate, 12)}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          DateComponent={BpkCalendarScrollDate}
          daysOfWeek={weekDays}
          weekStartsOn={1}
          dateModifiers={modifiers}
          showWeekendSeparator
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom date component', () => {
    const MyCustomDate = props => {
      const cx = {
        backgroundColor: colorRed500,
        width: '50%',
        height: '50%',
        borderRadius: '5rem',
        margin: '25%',
      };
      if (isWeekend(props.date)) {
        cx.backgroundColor = 'rgb(0, 215, 117)';
      }
      return <div style={cx} />;
    };
    MyCustomDate.propTypes = {
      date: PropTypes.instanceOf(Date).isRequired,
    };
    const tree = renderer
      .create(
        <BpkScrollableCalendarGridList
          minDate={DateUtils.addDays(testDate, -1)}
          maxDate={DateUtils.addMonths(testDate, 12)}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          DateComponent={MyCustomDate}
          daysOfWeek={weekDays}
          weekStartsOn={1}
          showWeekendSeparator
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
