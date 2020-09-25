/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import {
  weekDays,
  formatMonth,
  formatDateFull,
} from 'bpk-component-calendar/test-utils';
import { format } from 'bpk-component-calendar/src/date-utils';

jest.mock(
  './../node_modules/bpk-component-popover/node_modules/@skyscanner/popper.js',
  () =>
    class Popper {
      scheduleUpdate = () => {};

      destroy = () => {};
    },
);

// eslint-disable-next-line import/first
import BpkDatepicker from './BpkDatepicker';

const formatDate = date => format(date, 'DD/MM/YYYY');

const inputProps = {
  onChange: () => null,
  placeholder: 'placeholder',
  large: true,
};

describe('BpkDatepicker', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <BpkDatepicker
          id="myDatepicker"
          closeButtonText="Close"
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          title="Departure date"
          weekStartsOn={1}
          getApplicationElement={() => document.createElement('div')}
          formatDate={formatDate}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          inputProps={inputProps}
          minDate={new Date(2010, 1, 15)}
          maxDate={new Date(2010, 2, 15)}
          date={new Date(2010, 1, 15)}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly when not valid', () => {
    const tree = renderer
      .create(
        <BpkDatepicker
          valid={false}
          id="myDatepicker"
          closeButtonText="Close"
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          title="Departure date"
          weekStartsOn={1}
          getApplicationElement={() => document.createElement('div')}
          formatDate={formatDate}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          inputProps={inputProps}
          minDate={new Date(2010, 1, 15)}
          maxDate={new Date(2010, 2, 15)}
          date={new Date(2010, 1, 15)}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with datepicker open', () => {
    const datepicker = mount(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        date={new Date(2010, 1, 15)}
        isOpen
      />,
    );

    expect(datepicker.state('isOpen')).toEqual(true);

    datepicker.instance().onClose();
    expect(datepicker.state('isOpen')).toEqual(false);
  });

  it('"readOnly" can be overriden in "inputProps"', () => {
    const noReadOnlyInputProps = { ...inputProps, readOnly: false };
    const tree = renderer
      .create(
        <BpkDatepicker
          id="myDatepicker"
          closeButtonText="Close"
          daysOfWeek={weekDays}
          changeMonthLabel="Change month"
          title="Departure date"
          weekStartsOn={1}
          getApplicationElement={() => document.createElement('div')}
          formatDate={formatDate}
          formatMonth={formatMonth}
          formatDateFull={formatDateFull}
          inputProps={noReadOnlyInputProps}
          minDate={new Date(2010, 1, 15)}
          maxDate={new Date(2010, 2, 15)}
          date={new Date(2010, 1, 15)}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should open on click', () => {
    const datepicker = mount(
      <BpkDatepicker
        id="myDatepicker"
        closeButtonText="Close"
        daysOfWeek={weekDays}
        changeMonthLabel="Change month"
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        date={new Date(2010, 1, 15)}
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
        title="Departure date"
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        date={new Date(2010, 1, 15)}
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
        title="Departure date"
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        date={new Date(2010, 1, 15)}
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
        title="Departure date"
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        weekStartsOn={1}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        date={new Date(2010, 1, 15)}
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
        title="Departure date"
        weekStartsOn={1}
        getApplicationElement={() => document.createElement('div')}
        formatDate={formatDate}
        formatMonth={formatMonth}
        formatDateFull={formatDateFull}
        inputProps={inputProps}
        minDate={new Date(2010, 1, 15)}
        maxDate={new Date(2010, 2, 15)}
        date={new Date(2010, 1, 15)}
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
