import React from 'react';
import renderer from 'react-test-renderer';
import format from 'date-fns/format';
import addMonths from 'date-fns/add_months';

import BpkCalendarNav from './BpkCalendarNav';

const formatMonth = date => format(date, 'MMMM YYYY');

describe('BpkCalendarNav', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCalendarNav
      month={new Date()}
      formatMonth={formatMonth}
      id="myCalendarNav"
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "minDate" and "maxDate" set', () => {
    const tree = renderer.create(<BpkCalendarNav
      month={new Date()}
      formatMonth={formatMonth}
      minDate={new Date()}
      maxDate={addMonths(new Date(), 2)}
      id="myCalendarNav"
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
