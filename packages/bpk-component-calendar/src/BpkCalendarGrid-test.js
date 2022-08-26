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
import { render, screen } from '@testing-library/react';
import { addMonths, isWeekend } from 'date-fns';
import {
  colorMonteverde,
  colorPanjin,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';
import userEvent from '@testing-library/user-event';

import { weekDays, formatDateFull, formatMonth } from '../test-utils';

import BpkCalendarGrid from './BpkCalendarGrid';
import BpkCalendarDate from './BpkCalendarDate';

describe('BpkCalendarGrid', () => {
  it('should render correctly with a different "weekStartsOn" attribute', () => {
    const { asFragment } = render(
      <BpkCalendarGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarDate}
        daysOfWeek={weekDays}
        weekStartsOn={3}
        minDate={new Date('2016-01')}
        maxDate={addMonths(new Date('2016-01'), 12)}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with a "dateModifiers" attribute', () => {
    const modifiers = {
      someClass: () => true,
    };
    const { asFragment } = render(
      <BpkCalendarGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarDate}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        dateModifiers={modifiers}
        minDate={new Date('2016-01')}
        maxDate={addMonths(new Date('2016-01'), 12)}
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
        cx.backgroundColor = colorMonteverde;
      }
      return <div style={cx} />;
    };
    MyCustomDate.propTypes = {
      date: PropTypes.instanceOf(Date).isRequired,
    };
    const { asFragment } = render(
      <BpkCalendarGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={MyCustomDate}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        minDate={new Date('2016-01')}
        maxDate={addMonths(new Date('2016-01'), 12)}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should call the onDateClick callback', async () => {
    const onDateClick = jest.fn();

    render(
      <BpkCalendarGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarDate}
        daysOfWeek={weekDays}
        weekStartsOn={0}
        onDateClick={onDateClick}
        minDate={new Date('2016-01')}
        maxDate={addMonths(new Date('2016-01'), 12)}
      />,
    );

    expect(onDateClick.mock.calls.length).toBe(0);

    const date = screen.getByRole('button', {
      name: /15th October 2016/i,
    });
    await userEvent.click(date);
    expect(onDateClick.mock.calls.length).toBe(1);
    expect(onDateClick.mock.calls[0][0]).toEqual(new Date(2016, 9, 15));
  });

  it('should render correctly with "weekDayKey" attribute set to nameNarrow', () => {
    const { asFragment } = render(
      <BpkCalendarGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarDate}
        daysOfWeek={weekDays}
        weekStartsOn={0}
        weekDayKey="nameNarrow"
        minDate={new Date('2016-01')}
        maxDate={addMonths(new Date('2016-01'), 12)}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
