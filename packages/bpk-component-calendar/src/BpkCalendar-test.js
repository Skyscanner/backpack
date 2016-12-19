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
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
