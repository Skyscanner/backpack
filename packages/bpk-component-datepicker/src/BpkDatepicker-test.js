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
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        title="Departure date"
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        date={new Date(2010, 1, 15)}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should open on click', () => {
    const datepicker = mount(<BpkDatepicker
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      title="Departure date"
      getApplicationElement={() => document.createElement('div')}
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      inputProps={inputProps}
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      date={new Date(2010, 1, 15)}
    />);

    expect(datepicker.state('isOpen')).toEqual(false);

    datepicker.find('BpkInput').simulate('click');
    expect(datepicker.state('isOpen')).toEqual(true);
  });

  it('should open on focus', () => {
    const datepicker = mount(<BpkDatepicker
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      title="Departure date"
      getApplicationElement={() => document.createElement('div')}
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      inputProps={inputProps}
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      date={new Date(2010, 1, 15)}
    />);

    expect(datepicker.state('isOpen')).toEqual(false);

    datepicker.find('BpkInput').simulate('focus');
    expect(datepicker.state('isOpen')).toEqual(true);
  });

  it('should update state when a date is selected', () => {
    const datepicker = mount(<BpkDatepicker
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      title="Departure date"
      getApplicationElement={() => document.createElement('div')}
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      inputProps={inputProps}
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      date={new Date(2010, 1, 15)}
    />);

    datepicker.find('BpkInput').simulate('click');
    expect(datepicker.state('isOpen')).toEqual(true);

    const date = new Date(2010, 1, 15);
    datepicker.instance().handleDateSelect(date);
    expect(datepicker.state('isOpen')).toEqual(false);
  });

  it('should close when `onClose` is called', () => {
    const datepicker = mount(<BpkDatepicker
      id="myDatepicker"
      closeButtonText="Close"
      daysOfWeek={weekDays}
      changeMonthLabel="Change month"
      title="Departure date"
      getApplicationElement={() => document.createElement('div')}
      formatDate={formatDate}
      formatMonth={formatMonth}
      formatDateFull={formatDateFull}
      inputProps={inputProps}
      minDate={new Date(2010, 1, 15)}
      maxDate={new Date(2010, 2, 15)}
      date={new Date(2010, 1, 15)}
    />);

    datepicker.find('BpkInput').simulate('click');
    expect(datepicker.state('isOpen')).toEqual(true);

    datepicker.instance().onClose();
    expect(datepicker.state('isOpen')).toEqual(false);
  });
});
