import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { weekDays, formatMonth, formatDateFull } from 'bpk-component-calendar/test-utils';
import { format } from 'bpk-component-calendar/src/date-utils';

import BpkDatepicker from './BpkDatepicker';

const formatDate = date => format(date, 'DD/MM/YYYY');

const inputProps = {
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
};

describe('BpkDatepicker', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <BpkDatepicker
        id="myDatepicker"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        popoverLabel="Departure date"
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        initialSelectedDate={new Date(2010, 1, 15)}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should open on click', () => {
    const datepicker = mount(<BpkDatepicker
      id="myDatepicker"
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      popoverLabel="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      inputProps={inputProps}
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      initialSelectedDate={new Date(2010, 1, 15)}
    />);

    expect(datepicker.state('isOpen')).toEqual(false);

    datepicker.find('BpkInput').simulate('click');
    expect(datepicker.state('isOpen')).toEqual(true);
  });

  it('should open on focus', () => {
    const datepicker = mount(<BpkDatepicker
      id="myDatepicker"
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      popoverLabel="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      inputProps={inputProps}
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      initialSelectedDate={new Date(2010, 1, 15)}
    />);

    expect(datepicker.state('isOpen')).toEqual(false);

    datepicker.find('BpkInput').simulate('focus');
    expect(datepicker.state('isOpen')).toEqual(true);
  });

  it('should update state when a date is selected', () => {
    const datepicker = mount(<BpkDatepicker
      id="myDatepicker"
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      popoverLabel="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      inputProps={inputProps}
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      initialSelectedDate={new Date(2010, 1, 15)}
    />);

    datepicker.find('BpkInput').simulate('click');
    expect(datepicker.state('isOpen')).toEqual(true);

    const date = new Date();
    datepicker.instance().onDateSelect(date);
    expect(datepicker.state('isOpen')).toEqual(false);
    expect(datepicker.state('date')).toBe(date);
  });

  it('should close when `onClose` is called', () => {
    const datepicker = mount(<BpkDatepicker
      id="myDatepicker"
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      popoverLabel="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      inputProps={inputProps}
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      initialSelectedDate={new Date(2010, 1, 15)}
    />);

    datepicker.find('BpkInput').simulate('click');
    expect(datepicker.state('isOpen')).toEqual(true);

    datepicker.instance().onClose();
    expect(datepicker.state('isOpen')).toEqual(false);
  });

  it('should only update when `date` or `isOpen` change', () => {
    const datepicker = mount(<BpkDatepicker
      id="myDatepicker"
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      popoverLabel="Departure date"
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      inputProps={inputProps}
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      initialSelectedDate={new Date(2010, 1, 15)}
    />);

    const spy = jest.fn();
    BpkDatepicker.prototype.componentDidUpdate = spy;

    expect(spy.mock.calls.length).toEqual(0);

    datepicker.setState({ isOpen: true });
    expect(spy.mock.calls.length).toEqual(1);

    datepicker.setState({ date: new Date() });
    expect(spy.mock.calls.length).toEqual(2);

    datepicker.setProps({ id: 'newId' });
    expect(spy.mock.calls.length).toEqual(2);
  });
});
