jest.mock('./BpkCalendarGrid', () => 'BpkCalendarGrid');
jest.mock('./BpkCalendarNav', () => 'BpkCalendarNav');

/* eslint-disable import/first */
import React from 'react';
import renderer from 'react-test-renderer';
import format from 'date-fns/format';
import BpkCalendar from './BpkCalendar';
import getMockDate from './MockDate';
/* eslint-enable */

const formatMonth = date => format(date, 'MMMM YYYY');

describe('BpkCalendar', () => {
  it('should render correctly', () => {
    // Necessary for mocking Date
    /* eslint-disable no-global-assign */
    Date = getMockDate(Date);
    /* eslint-enable */

    const tree = renderer.create(<BpkCalendar
      formatMonth={formatMonth}
      id="myCalendar"
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
