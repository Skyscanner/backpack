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

  it('should disable inputs when disabled', () => {
    const tree = renderer.create(<BpkCalendarNav
      month={new Date(2010, 1, 1)}
      minDate={new Date(2010, 1, 1)}
      maxDate={new Date(2010, 2, 1)}
      formatMonth={formatMonth}
      changeMonthLabel="Change month"
      disabled
      id="myCalendarNav"
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call the onMonthChange callback when nudging/selecting month', () => {
    const onMonthChange = jest.fn();

    const nav = shallow(<BpkCalendarNav
      month={new Date(2010, 1, 1)}
      minDate={new Date(2010, 0, 1)}
      maxDate={new Date(2010, 2, 1)}
      formatMonth={formatMonth}
      changeMonthLabel="Change month"
      onMonthChange={onMonthChange}
      id="myCalendarNav"
    />);

    expect(onMonthChange.mock.calls.length).toBe(0);

    // Previous month
    const prevEventStub = { persist: jest.fn() };
    nav.find('button').at(0).simulate('click', prevEventStub);
    expect(onMonthChange.mock.calls.length).toBe(1);
    expect(onMonthChange.mock.calls[0][0]).toEqual(prevEventStub);
    expect(onMonthChange.mock.calls[0][1]).toEqual({ month: new Date(2010, 0, 1), source: 'PREV' });

    // Next month
    const nextEventStub = { persist: jest.fn() };
    nav.find('button').at(1).simulate('click', nextEventStub);
    expect(onMonthChange.mock.calls.length).toBe(2);
    expect(onMonthChange.mock.calls[1][0]).toEqual(nextEventStub);
    expect(onMonthChange.mock.calls[1][1]).toEqual({ month: new Date(2010, 2, 1), source: 'NEXT' });

    // Select month
    const selectEventStub = { target: { value: '2010-03-01' }, persist: jest.fn() };
    nav.find('BpkSelect').simulate('change', selectEventStub);
    expect(onMonthChange.mock.calls.length).toBe(3);
    expect(onMonthChange.mock.calls[2][0]).toEqual(selectEventStub);
    expect(onMonthChange.mock.calls[2][1]).toEqual({ month: new Date(2010, 2, 1), source: 'SELECT' });
  });
});
