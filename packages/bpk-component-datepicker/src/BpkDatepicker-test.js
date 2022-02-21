/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { mount } from 'enzyme';
import {
  weekDays,
  formatMonth,
  formatDateFull,
} from 'bpk-component-calendar/test-utils';
import { format } from 'bpk-component-calendar/src/date-utils';
import { CALENDAR_SELECTION_TYPE } from 'bpk-component-calendar';

import BpkDatepicker from './BpkDatepicker';

jest.mock(
  './../node_modules/bpk-component-popover/node_modules/@skyscanner/popper.js',
  () =>
    class Popper {
      scheduleUpdate = () => {};

      destroy = () => {};
    },
);

const formatDate = (date) => format(date, 'dd/MM/yyyy');

const inputProps = {
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
};

describe('BpkDatepicker', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render range correctly', () => {
    const { asFragment } = render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: 'range',
          startDate: new Date(2010, 1, 15),
          endDate: new Date(2010, 1, 20),
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when not valid', () => {
    const { asFragment } = render(
      <BpkDatepicker
        valid={false}
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly with datepicker open', () => {
    const datepicker = mount(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        isOpen
      />,
    );

    expect(datepicker.state('isOpen')).toEqual(true);

    datepicker.instance().onClose();
    expect(datepicker.state('isOpen')).toEqual(false);
  });

  it('"readOnly" can be overriden in "inputProps"', () => {
    const noReadOnlyInputProps = { ...inputProps, readOnly: false };
    const { asFragment } = render(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={noReadOnlyInputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should open on click', () => {
    const datepicker = mount(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
      />,
    );

    expect(datepicker.state('isOpen')).toEqual(false);

    datepicker.find('BpkInput').simulate('click');
    expect(datepicker.state('isOpen')).toEqual(true);
  });

  it('should open on focus', () => {
    const datepicker = mount(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        weekStartsOn={1}
      />,
    );

    expect(datepicker.state('isOpen')).toEqual(false);

    datepicker.find('BpkInput').simulate('focus');
    expect(datepicker.state('isOpen')).toEqual(true);
  });

  it('should open when the isOpen prop is changed from the outside', () => {
    const datepicker = mount(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        weekStartsOn={1}
        isOpen={false}
      />,
    );

    expect(datepicker.state('isOpen')).toBeFalsy();

    datepicker.setProps({ isOpen: true });

    expect(datepicker.state('isOpen')).toBeTruthy();
  });

  it('should update state when a date is selected', () => {
    const onOpenChangeMock = jest.fn();

    const datepicker = mount(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        weekStartsOn={1}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        onOpenChange={onOpenChangeMock}
      />,
    );

    datepicker.find('BpkInput').simulate('click');
    expect(datepicker.state('isOpen')).toEqual(true);
    expect(onOpenChangeMock).toHaveBeenCalledWith(true);

    const date = new Date(2010, 1, 15);
    datepicker.instance().handleDateSelect(date);
    expect(datepicker.state('isOpen')).toEqual(false);
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });

  it('should close when `onClose` is called', () => {
    const onOpenChangeMock = jest.fn();

    const datepicker = mount(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        previousMonthLabel="Go to previous month"
        nextMonthLabel="Go to next month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(2010, 1, 15),
        }}
        onOpenChange={onOpenChangeMock}
      />,
    );

    datepicker.find('BpkInput').simulate('click');
    expect(datepicker.state('isOpen')).toEqual(true);
    expect(onOpenChangeMock).toHaveBeenCalledWith(true);

    datepicker.instance().onClose();
    expect(datepicker.state('isOpen')).toEqual(false);
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });
});
