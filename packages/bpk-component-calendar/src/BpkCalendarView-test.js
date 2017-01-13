import React from 'react';
import renderer from 'react-test-renderer';
import format from 'date-fns/format';
import BpkCalendarView from './BpkCalendarView';
import { weekDays } from '../test-utils';

const formatMonth = date => format(date, 'MMMM YYYY');
const formatDateFull = date => format(date, 'dddd, Do MMMM YYYY');

describe('BpkCalendarView', () => {
  it('should compose BpkCalendarNav and BpkCalendarGrid correctly', () => {
    const tree = renderer.create(<BpkCalendarView
      id="myCalendar"
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      month={new Date(2010, 1, 15)}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
