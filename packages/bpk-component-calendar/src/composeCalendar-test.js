/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
import renderer from 'react-test-renderer';

import { weekDays, formatMonth, formatDateFull } from '../test-utils';

import composeCalendar from './composeCalendar';

const createNodeMock = () => ({
  focus: () => null,
});

const CalendarComponent = composeCalendar('Nav', 'Header', 'Grid', 'Date');

const CustomCalendarComponent = composeCalendar(null, null, 'Grid', 'Date');

const HeaderAndGridCalendar = composeCalendar('Nav', null, 'Grid', 'Date');

describe('composeCalendar', () => {
  it('should compose a nav, header, grid and date component correctly', () => {
    const tree = renderer
      .create(
        <CalendarComponent
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          weekStartsOn={1}
          changeMonthLabel="Change month"
          minDate={new Date(Date.UTC(2010, 1, 15))}
          maxDate={new Date(Date.UTC(2010, 2, 15))}
          month={new Date(Date.UTC(2010, 1, 15))}
        />,
        { createNodeMock },
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with custom className prop correctly', () => {
    const tree = renderer
      .create(
        <CalendarComponent
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          weekStartsOn={1}
          changeMonthLabel="Change month"
          minDate={new Date(Date.UTC(2010, 1, 15))}
          maxDate={new Date(Date.UTC(2010, 2, 15))}
          month={new Date(Date.UTC(2010, 1, 15))}
          className="my-custom-class"
        />,
        { createNodeMock },
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render with "fixedWidth" set to false', () => {
    const tree = renderer
      .create(
        <CalendarComponent
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          weekStartsOn={1}
          changeMonthLabel="Change month"
          minDate={new Date(Date.UTC(2010, 1, 15))}
          maxDate={new Date(Date.UTC(2010, 2, 15))}
          month={new Date(Date.UTC(2010, 1, 15))}
          fixedWidth={false}
        />,
        { createNodeMock },
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without a nav or header element', () => {
    const tree = renderer
      .create(
        <CustomCalendarComponent
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          weekStartsOn={1}
          changeMonthLabel="Change month"
          minDate={new Date(Date.UTC(2010, 1, 15))}
          maxDate={new Date(Date.UTC(2010, 2, 15))}
          month={new Date(Date.UTC(2010, 1, 15))}
        />,
        { createNodeMock },
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without a header element', () => {
    const tree = renderer
      .create(
        <HeaderAndGridCalendar
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          weekStartsOn={1}
          changeMonthLabel="Change month"
          minDate={new Date(Date.UTC(2010, 1, 15))}
          maxDate={new Date(Date.UTC(2010, 2, 15))}
          month={new Date(Date.UTC(2010, 1, 15))}
        />,
        { createNodeMock },
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should pass props to their respective components', () => {
    const PropsBasedCalendarComponent = composeCalendar(
      props => props.name,
      props => props.name,
      props => (
        <div>
          <h1>{props.name}</h1>
          <props.DateComponent {...props.dateProps} />
        </div>
      ),
      props => props.name,
    );

    const tree = renderer
      .create(
        <PropsBasedCalendarComponent
          id="myCalendar"
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          daysOfWeek={weekDays}
          weekStartsOn={1}
          changeMonthLabel="Change month"
          minDate={new Date(Date.UTC(2010, 1, 15))}
          maxDate={new Date(Date.UTC(2010, 2, 15))}
          month={new Date(Date.UTC(2010, 1, 15))}
          navProps={{ name: 'Nav' }}
          headerProps={{ name: 'Header' }}
          gridProps={{ name: 'Grid' }}
          dateProps={{ name: 'Date' }}
        />,
        { createNodeMock },
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
