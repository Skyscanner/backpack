import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import BpkCalendar from './BpkCalendar';
import { weekDays, formatDateFull, formatMonth } from '../test-utils';
import { addDays } from './date-utils';

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
      date={new Date(2010, 1, 15)}
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
      date={new Date(2010, 1, 15)}
    />);

    const grid = calendar.find('BpkCalendarGridTransition');
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
      date={new Date(2010, 1, 15)}
      onDateSelect={onDateSelect}
    />);

    const grid = calendar.find('BpkCalendarGridTransition');

    expect(onDateSelect.mock.calls.length).toBe(0);
    expect(grid.prop('month')).toEqual(new Date(2010, 1, 1));

    grid.prop('onDateClick')(new Date(2010, 1, 20));
    expect(onDateSelect.mock.calls.length).toBe(1);
    expect(onDateSelect.mock.calls[0][0]).toEqual(new Date(2010, 1, 20));
  });

  it('should move focus on keyboard input', () => {
    const preventDefault = jest.fn();
    const origin = new Date(2010, 2, 1);

    const calendar = mount(<BpkCalendar
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      id="myCalendar"
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      date={origin}
    />);

    expect(calendar.state('focusedDate')).toEqual(origin);

    calendar.instance().handleDateKeyDown({ key: 'S', preventDefault });
    expect(calendar.state('focusedDate')).toEqual(origin);
    expect(preventDefault.mock.calls.length).toEqual(0);

    calendar.instance().handleDateKeyDown({ key: 'ArrowRight', preventDefault });
    expect(calendar.state('focusedDate')).toEqual(addDays(origin, 1));
    expect(preventDefault.mock.calls.length).toEqual(1);

    calendar.instance().handleDateKeyDown({ key: 'ArrowDown', preventDefault });
    expect(calendar.state('focusedDate')).toEqual(addDays(origin, 8));
    expect(preventDefault.mock.calls.length).toEqual(2);

    calendar.instance().handleDateKeyDown({ key: 'ArrowLeft', preventDefault });
    expect(calendar.state('focusedDate')).toEqual(addDays(origin, 7));
    expect(preventDefault.mock.calls.length).toEqual(3);

    calendar.instance().handleDateKeyDown({ key: 'ArrowUp', preventDefault });
    expect(calendar.state('focusedDate')).toEqual(origin);
    expect(preventDefault.mock.calls.length).toEqual(4);

    calendar.instance().handleDateKeyDown({ key: 'End', preventDefault });
    expect(calendar.state('focusedDate')).toEqual(addDays(origin, 14));
    expect(preventDefault.mock.calls.length).toEqual(5);

    calendar.instance().handleDateKeyDown({ key: 'Home', preventDefault });
    expect(calendar.state('focusedDate')).toEqual(origin);
    expect(preventDefault.mock.calls.length).toEqual(6);

    calendar.instance().handleDateKeyDown({ key: 'PageDown', preventDefault });
    expect(calendar.state('focusedDate')).toEqual(addDays(origin, 14));
    expect(preventDefault.mock.calls.length).toEqual(7);

    calendar.instance().handleDateKeyDown({ key: 'PageUp', preventDefault });
    expect(calendar.state('focusedDate')).toEqual(addDays(origin, -14));
    expect(preventDefault.mock.calls.length).toEqual(8);
  });
});
