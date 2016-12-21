jest.mock('./BpkCalendarGrid', () => 'BpkCalendarGrid');
jest.mock('./BpkCalendarNav', () => 'BpkCalendarNav');

/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';
import format from 'date-fns/format';
import BpkCalendar from './BpkCalendar';
/* eslint-enable */

const formatMonth = date => format(date, 'MMMM YYYY');

describe('BpkCalendar', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCalendar
      formatMonth={formatMonth}
      id="myCalendar"
      initialMonth={new Date(2016, 11, 15)}
      minDate={new Date(2016, 11, 15)}
      maxDate={new Date(2017, 11, 15)}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
