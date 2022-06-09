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
import '@testing-library/jest-dom';
import startOfDay from 'date-fns/startOfDay';

import { CALENDAR_SELECTION_TYPE, SELECTION_TYPES } from '..';

import Week from './Week';

const mockDateComponent = jest.fn();

const DummyDateComponent = (props) => {
  mockDateComponent(props);
  return <div />;
};

const initialProps = {
  ...Week.defaultProps,
  DateComponent: DummyDateComponent,
  dateModifiers: {},
  dates: [
    new Date(1980, 4, 31),
    new Date(1980, 5, 1),
    new Date(1980, 5, 2),
    new Date(1980, 5, 3),
    new Date(1980, 5, 4),
    new Date(1980, 5, 5),
    new Date(1980, 5, 6),
  ].map(startOfDay),
  formatDateFull: (d) => d.toString(),
  preventKeyboardFocus: false,
  markToday: true,
  markOutsideDays: true,
  isKeyboardFocusable: true,
  month: new Date(1980, 5, 1),
  weekStartsOn: 0,
};

describe('Week', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { asFragment } = render(<Week {...initialProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should set "isOutside" prop correctly when "markOutsideDays" attribute equals to "true"', () => {
    render(<Week {...initialProps} markOutsideDays />);

    expect(mockDateComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        date: new Date(1980, 4, 31),
        isOutside: true,
      }),
    );
  });

  it('should set "isSelected" prop correctly when selectionConfiguration type is "range"', () => {
    render(
      <Week
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
      <Week
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
      <Week
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
      <Week
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
      <Week
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
      <Week
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
