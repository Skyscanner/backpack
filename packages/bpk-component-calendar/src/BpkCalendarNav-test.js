import React from 'react';
import renderer from 'react-test-renderer';
import format from 'date-fns/format';
import addMonths from 'date-fns/add_months';

import BpkCalendarNav from './BpkCalendarNav';

const formatMonth = date => format(date, 'MMMM YYYY');

describe('BpkCalendarNav', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCalendarNav
      month={new Date('2016-12')}
      formatMonth={formatMonth}
      id="myCalendarNav"
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "minDate" and "maxDate" set', () => {
    const december2016 = new Date('2016-12');
    const tree = renderer.create(<BpkCalendarNav
      month={december2016}
      formatMonth={formatMonth}
      minDate={december2016}
      maxDate={addMonths(december2016, 2)}
      id="myCalendarNav"
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
