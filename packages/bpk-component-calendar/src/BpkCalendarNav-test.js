import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import format from 'date-fns/format';

import BpkCalendarNav from './BpkCalendarNav';

const formatMonth = date => format(date, 'MMMM YYYY');

describe('BpkCalendarNav', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCalendarNav
      month={new Date(2010, 1, 1)}
      minDate={new Date(2010, 1, 1)}
      maxDate={new Date(2010, 2, 1)}
      formatMonth={formatMonth}
      changeMonthLabel="Change month"
      id="myCalendarNav"
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call the onChangeMonth callback when nudging/selecting month', () => {
    const onChangeMonth = jest.fn(); // TODO bug here

    const nav = shallow(<BpkCalendarNav
      month={new Date(2010, 1, 1)}
      minDate={new Date(2010, 0, 1)}
      maxDate={new Date(2010, 2, 1)}
      formatMonth={formatMonth}
      changeMonthLabel="Change month"
      onChangeMonth={onChangeMonth}
      id="myCalendarNav"
    />);

    expect(onChangeMonth.mock.calls.length).toBe(0);

    // Previous month
    nav.find('button').at(0).simulate('click');
    expect(onChangeMonth.mock.calls.length).toBe(1);
    expect(onChangeMonth.mock.calls[0][0]).toEqual(new Date(2010, 0, 1));

    // Next month
    nav.find('button').at(1).simulate('click');
    expect(onChangeMonth.mock.calls.length).toBe(2);
    expect(onChangeMonth.mock.calls[1][0]).toEqual(new Date(2010, 2, 1));

    // Select month
    nav.find('BpkSelect').simulate('change', { target: { value: '2010-03-01' } });
    expect(onChangeMonth.mock.calls.length).toBe(3);
    expect(onChangeMonth.mock.calls[2][0]).toEqual(new Date(2010, 2, 1));
  });
});
