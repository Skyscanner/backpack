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

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { startOfDay } from 'date-fns/startOfDay';

import { CALENDAR_SELECTION_TYPE, SELECTION_TYPES } from '..';

import BpkCalendarWeek from './BpkCalendarWeek';

import type { Props } from './BpkCalendarWeek';

const mockDateComponent = jest.fn();

const DummyDateComponent = (props: any) => {
  mockDateComponent(props);
  return <div />;
};

const initialProps: Props = {
  ...BpkCalendarWeek.defaultProps,
  DateComponent: DummyDateComponent,
  dateModifiers: {},
  dates: [
    {
      val: startOfDay(new Date(1980, 4, 31)),
      customLabel: 'Wednesday, 31 April 1980',
      isoLabel: '1980-04-31',
    },
    {
      val: startOfDay(new Date(1980, 5, 1)),
      customLabel: 'Thursday, 1 May 1980',
      isoLabel: '1980-05-01',
    },
    {
      val: startOfDay(new Date(1980, 5, 2)),
      customLabel: 'Friday, 2 May 1980',
      isoLabel: '1980-05-02',
    },
    {
      val: startOfDay(new Date(1980, 5, 3)),
      customLabel: 'Saturday, 3 May 1980',
      isoLabel: '1980-05-03',
    },
    {
      val: startOfDay(new Date(1980, 5, 4)),
      customLabel: 'Sunday, 4 May 1980',
      isoLabel: '1980-05-04',
    },
    {
      val: startOfDay(new Date(1980, 5, 5)),
      customLabel: 'Monday, 5 May 1980',
      isoLabel: '1980-05-05',
    },
    {
      val: startOfDay(new Date(1980, 5, 6)),
      customLabel: 'Tuesday, 6 May 1980',
      isoLabel: '1980-05-06',
    },
  ],
  formatDateFull: (d: Date) => d.toString(),
  preventKeyboardFocus: false,
  markToday: true,
  markOutsideDays: true,
  isKeyboardFocusable: true,
  month: new Date(1980, 5, 1),
  weekStartsOn: 0,
};

describe('BpkCalendarWeek', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = render(<BpkCalendarWeek {...initialProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should set "isOutside" prop correctly when "markOutsideDays" attribute equals to "true"', () => {
    render(<BpkCalendarWeek {...initialProps} markOutsideDays />);

    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(1980, 4, 31),
        isOutside: true,
      }),
    );
  });

  it('should set "isSelected" prop correctly when selectionConfiguration type is "range"', () => {
    render(
      <BpkCalendarWeek
        {...initialProps}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.range,
          startDate: new Date(1980, 5, 1),
          endDate: new Date(1980, 5, 3),
        }}
      />,
    );

    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(1980, 5, 1),
        isSelected: true,
      }),
    );
    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(1980, 5, 2),
        isSelected: true,
      }),
    );
    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(1980, 5, 3),
        isSelected: true,
      }),
    );
  });

  it('should set "isSelected" prop correctly when selectionConfiguration type is "single"', () => {
    render(
      <BpkCalendarWeek
        {...initialProps}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(1980, 5, 5),
        }}
      />,
    );

    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(1980, 5, 5),
        isSelected: true,
      }),
    );
  });

  it('should not have any selected dates when selectionConfiguration has null date', () => {
    render(
      <BpkCalendarWeek
        {...initialProps}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: null,
        }}
      />,
    );

    expect(mockDateComponent).not.toHaveBeenCalledWith(
      expect.objectContaining({
        isSelected: true,
      }),
    );
  });

  it('should set "selectionType" prop correctly when selectionConfiguration type is "single"', () => {
    render(
      <BpkCalendarWeek
        {...initialProps}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(1980, 5, 5),
        }}
      />,
    );

    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(1980, 5, 5),
        selectionType: SELECTION_TYPES.single,
      }),
    );
  });

  it('should set "selectionType" prop correctly when selectionConfiguration type is "range" and has no "endDate"', () => {
    render(
      <BpkCalendarWeek
        {...initialProps}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.range,
          startDate: new Date(1980, 5, 5),
          endDate: null,
        }}
      />,
    );

    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(1980, 5, 5),
        selectionType: SELECTION_TYPES.single,
      }),
    );
  });

  it('should set "selectionType" prop correctly when selectionConfiguration type is "range"', () => {
    render(
      <BpkCalendarWeek
        {...initialProps}
        selectionConfiguration={{
          type: CALENDAR_SELECTION_TYPE.range,
          startDate: new Date(1980, 5, 4),
          endDate: new Date(1980, 5, 6),
        }}
      />,
    );

    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(1980, 5, 4),
        selectionType: SELECTION_TYPES.start,
      }),
    );

    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(1980, 5, 5),
        selectionType: SELECTION_TYPES.middle,
      }),
    );

    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(1980, 5, 6),
        selectionType: SELECTION_TYPES.end,
      }),
    );
  });
});
