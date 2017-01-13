import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import BpkCalendar from './BpkCalendar';
import { weekDays, formatDateFull, formatMonth } from '../test-utils';

const createNodeMock = () => ({
  focus: () => null,
});

describe('BpkCalendar', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCalendar
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      id="myCalendar"
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      initialSelectedDate={new Date(2010, 1, 15)}
    />, { createNodeMock }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should change the month', () => {
    const calendar = mount(<BpkCalendar
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      id="myCalendar"
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      initialSelectedDate={new Date(2010, 1, 15)}
    />);

    const grid = calendar.find('BpkCalendarGrid');
    const nav = calendar.find('BpkCalendarNav');

    expect(grid.prop('month')).toEqual(new Date(2010, 1, 1));

    nav.prop('onChangeMonth')(new Date(2010, 2, 1));
    expect(grid.prop('month')).toEqual(new Date(2010, 2, 1));
  });


  it('should call the onDateSelect callback', () => {
    const onDateSelect = jest.fn();

    const calendar = mount(<BpkCalendar
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      id="myCalendar"
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      initialSelectedDate={new Date(2010, 1, 15)}
      onDateSelect={onDateSelect}
    />);

    const grid = calendar.find('BpkCalendarGrid');

    expect(onDateSelect.mock.calls.length).toBe(0);
    expect(grid.prop('month')).toEqual(new Date(2010, 1, 1));

    grid.prop('onDateClick')(new Date(2010, 1, 20));
    expect(onDateSelect.mock.calls.length).toBe(1);
    expect(onDateSelect.mock.calls[0][0]).toEqual(new Date(2010, 1, 20));
  });
});
