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
import { mount } from 'enzyme';
import isWeekend from 'date-fns/is_weekend';

import { colorRed500 } from 'bpk-tokens/tokens/base.es6';
import BpkCalendarScrollGrid from './BpkScrollableCalendarGrid';
import BpkCalendarScrollDate from './BpkScrollableCalendarDate';

import { weekDays, formatDateFull, formatMonth } from '../test-utils';

describe('BpkCalendarScrollGrid', () => {
  it('should render correctly with no optional props set', () => {
    const tree = renderer
      .create(
        <BpkCalendarScrollGrid
          month={new Date('2016-10')}
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
        <BpkCalendarScrollGrid
          month={new Date('2016-10')}
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
        <BpkCalendarScrollGrid
          month={new Date('2016-10')}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          DateComponent={BpkCalendarScrollDate}
          daysOfWeek={weekDays}
          weekStartsOn={5}
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
        <BpkCalendarScrollGrid
          month={new Date('2016-10')}
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
        <BpkCalendarScrollGrid
          month={new Date('2016-10')}
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

  it('should call the onDateClick callback', () => {
    const onDateClick = jest.fn();

    const grid = mount(
      <BpkCalendarScrollGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        daysOfWeek={weekDays}
        weekStartsOn={0}
        showWeekendSeparator
        onDateClick={onDateClick}
      />,
    );

    expect(onDateClick.mock.calls.length).toBe(0);

    grid
      .find('button')
      .at(10)
      .simulate('click');
    expect(onDateClick.mock.calls.length).toBe(1);
    expect(onDateClick.mock.calls[0][0]).toEqual(new Date(2016, 9, 11));

    grid
      .find('button')
      .at(11)
      .simulate('click');
    expect(onDateClick.mock.calls.length).toBe(2);
    expect(onDateClick.mock.calls[1][0]).toEqual(new Date(2016, 9, 12));
  });
});
