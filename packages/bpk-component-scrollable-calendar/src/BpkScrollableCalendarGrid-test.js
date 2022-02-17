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

import PropTypes from 'prop-types';
import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import isWeekend from 'date-fns/isWeekend';
import { colorPanjin } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { weekDays, formatDateFull, formatMonth } from '../test-utils';

import BpkCalendarScrollGrid from './BpkScrollableCalendarGrid';
import BpkCalendarScrollDate from './BpkScrollableCalendarDate';

describe('BpkCalendarScrollGrid', () => {
  it('should render correctly with no optional props set', () => {
    const { asFragment } = render(
      <BpkCalendarScrollGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        daysOfWeek={weekDays}
        weekStartsOn={1}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a different "weekStartsOn" attribute', () => {
    const { asFragment } = render(
      <BpkCalendarScrollGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        daysOfWeek={weekDays}
        weekStartsOn={5}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "dateModifiers" attribute', () => {
    const modifiers = {
      someClass: () => true,
    };
    const { asFragment } = render(
      <BpkCalendarScrollGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarScrollDate}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        dateModifiers={modifiers}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a custom date component', () => {
    const MyCustomDate = (props) => {
      const cx = {
        backgroundColor: colorPanjin,
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
    const { asFragment } = render(
      <BpkCalendarScrollGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={MyCustomDate}
        daysOfWeek={weekDays}
        weekStartsOn={1}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
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
        onDateClick={onDateClick}
      />,
    );

    expect(onDateClick.mock.calls.length).toBe(0);

    grid.find('button').at(10).simulate('click');
    expect(onDateClick.mock.calls.length).toBe(1);
    expect(onDateClick.mock.calls[0][0]).toEqual(new Date(2016, 9, 11));

    grid.find('button').at(11).simulate('click');
    expect(onDateClick.mock.calls.length).toBe(2);
    expect(onDateClick.mock.calls[1][0]).toEqual(new Date(2016, 9, 12));
  });
});
