import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import isWeekend from 'date-fns/is_weekend';

import { weekDays, formatDateFull, formatMonth } from '../test-utils';
import BpkCalendarGrid from './BpkCalendarGrid';
import BpkCalendarDate from './BpkCalendarDate';

describe('BpkCalendarGrid', () => {
  it('should render correctly with "showWeekendSeparator" attribute set to false', () => {
    const tree = renderer.create(
      <BpkCalendarGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarDate}
        daysOfWeek={weekDays}
        weekStartsOn={0}
        showWeekendSeparator={false}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a different "weekStartsOn" attribute', () => {
    const tree = renderer.create(
      <BpkCalendarGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarDate}
        daysOfWeek={weekDays}
        weekStartsOn={3}
        showWeekendSeparator
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "dateModifiers" attribute', () => {
    const modifiers = {
      someClass: () => true,
    };
    const tree = renderer.create(
      <BpkCalendarGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={BpkCalendarDate}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        dateModifiers={modifiers}
        showWeekendSeparator
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a custom date component', () => {
    const MyCustomDate = (props) => {
      const cx = {
        backgroundColor: 'rgb(255, 84, 82)',
        width: '50%',
        height: '50%',
        borderRadius: '5rem',
        margin: '25%',
      };
      if (isWeekend(props.date)) { cx.backgroundColor = 'rgb(0, 215, 117)'; }
      return <div style={cx} />;
    };
    MyCustomDate.propTypes = {
      date: React.PropTypes.instanceOf(Date).isRequired,
    };
    const tree = renderer.create(
      <BpkCalendarGrid
        month={new Date('2016-10')}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        DateComponent={MyCustomDate}
        daysOfWeek={weekDays}
        weekStartsOn={1}
        showWeekendSeparator
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call the onDateClick callback', () => {
    const onDateClick = jest.fn();

    const grid = mount(<BpkCalendarGrid
      month={new Date('2016-10')}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      DateComponent={BpkCalendarDate}
      daysOfWeek={weekDays}
      weekStartsOn={0}
      showWeekendSeparator
      onDateClick={onDateClick}
    />);

    expect(onDateClick.mock.calls.length).toBe(0);

    grid.find('button').at(10).simulate('click');
    expect(onDateClick.mock.calls.length).toBe(1);
    expect(onDateClick.mock.calls[0][0]).toEqual(new Date(2016, 9, 5));

    grid.find('button').at(11).simulate('click');
    expect(onDateClick.mock.calls.length).toBe(2);
    expect(onDateClick.mock.calls[1][0]).toEqual(new Date(2016, 9, 6));
  });
});
