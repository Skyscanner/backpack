import React from 'react';
import renderer from 'react-test-renderer';
import composeCalendar from './composeCalendar';
import { weekDays, formatMonth, formatDateFull } from '../test-utils';

const createNodeMock = () => ({
  focus: () => null,
});

const CalendarComponent = composeCalendar(
  'Nav',
  'Header',
  'Grid',
  'Date',
);

const CustomCalendarComponent = composeCalendar(
  null,
  null,
  'Grid',
  'Date',
);

describe('composeCalendar', () => {
  it('should compose a nav, header, grid and date component correctly', () => {
    const tree = renderer.create(<CalendarComponent
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      month={new Date(2010, 1, 15)}
    />, { createNodeMock }).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('should render with custom className prop correctly', () => {
    const tree = renderer.create(<CalendarComponent
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      month={new Date(2010, 1, 15)}
      className="my-custom-class"
    />, { createNodeMock }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render without a nav or header element', () => {
    const tree = renderer.create(<CustomCalendarComponent
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      month={new Date(2010, 1, 15)}
    />, { createNodeMock }).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
