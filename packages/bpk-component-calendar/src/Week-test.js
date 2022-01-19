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
import { shallow } from 'enzyme/build';
import startOfDay from 'date-fns/startOfDay';
import parse from 'date-fns/parse';

import { CALENDAR_SELECTION_TYPE } from '..';

import Week from './Week';

const DummyDateComponent = () => <div />;

const initialProps = {
  ...Week.defaultProps,
  DateComponent: DummyDateComponent,
  dateModifiers: {},
  dates: [
    new Date(1980, 5, 10),
    new Date(1980, 5, 11),
    new Date(1980, 5, 12),
    new Date(1980, 5, 13),
    new Date(1980, 5, 14),
    new Date(1980, 5, 15),
    new Date(1980, 5, 16),
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
  it('should not update if no properties change', () => {
    const week = shallow(<Week {...initialProps} />).instance();

    expect(week.shouldComponentUpdate(initialProps)).toBe(false);
  });

  it('should update if relevant property changes', () => {
    const week = shallow(<Week {...initialProps} />).instance();

    expect(
      week.shouldComponentUpdate({
        ...initialProps,
        markOutsideDays: false,
      }),
    ).toBe(true);
  });

  it(`should not update if selectionConfiguration changes but is a different week`, () => {
    const week = shallow(<Week {...initialProps} />).instance();

    expect(
      week.shouldComponentUpdate({
        ...initialProps,
        selectionConfiguration: {
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(1980, 4, 11),
        },
      }),
    ).toBe(false);
  });

  it(`should update if selectionConfiguration changes in this week`, () => {
    const week = shallow(
      <Week
        {...initialProps}
        {...{
          selectionConfiguration: {
            type: CALENDAR_SELECTION_TYPE.single,
            date: new Date(1980, 5, 2),
          },
        }}
      />,
    ).instance();

    expect(
      week.shouldComponentUpdate({
        ...initialProps,
        selectionConfiguration: {
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(1980, 5, 14),
        },
      }),
    ).toBe(true);
  });

  it(`should update if selectionConfiguration changes from inside to outside the week`, () => {
    const week = shallow(
      <Week
        {...initialProps}
        {...{
          selectionConfiguration: {
            type: CALENDAR_SELECTION_TYPE.single,
            date: new Date(1980, 5, 12),
          },
        }}
      />,
    ).instance();

    expect(
      week.shouldComponentUpdate({
        ...initialProps,
        selectionConfiguration: {
          type: CALENDAR_SELECTION_TYPE.single,
          date: new Date(1980, 5, 18),
        },
      }),
    ).toBe(true);
  });

  it(`should update if selectionConfiguration in week becomes null`, () => {
    const week = shallow(
      <Week
        {...initialProps}
        {...{
          selectionConfiguration: {
            type: CALENDAR_SELECTION_TYPE.single,
            date: new Date(1980, 5, 12),
          },
        }}
      />,
    ).instance();

    expect(
      week.shouldComponentUpdate({
        ...initialProps,
        selectionConfiguration: {
          type: CALENDAR_SELECTION_TYPE.single,
          date: null,
        },
      }),
    ).toBe(true);
  });

  it(`should not update if focusedDate changes but is a different week`, () => {
    const week = shallow(<Week {...initialProps} />).instance();

    expect(
      week.shouldComponentUpdate({
        ...initialProps,
        focusedDate: new Date(1980, 4, 11),
      }),
    ).toBe(false);
  });

  it(`should update if focusedDate changes in this week`, () => {
    const week = shallow(
      <Week {...initialProps} {...{ focusedDate: new Date(1980, 5, 2) }} />,
    ).instance();

    expect(
      week.shouldComponentUpdate({
        ...initialProps,
        focusedDate: new Date(1980, 5, 14),
      }),
    ).toBe(true);
  });

  it(`should update if focusedDate changes from inside to outside the week`, () => {
    const week = shallow(
      <Week {...initialProps} {...{ focusedDate: new Date(1980, 5, 12) }} />,
    ).instance();

    expect(
      week.shouldComponentUpdate({
        ...initialProps,
        focusedDate: new Date(1980, 5, 18),
      }),
    ).toBe(true);
  });

  it(`should update if focusedDate in week becomes null`, () => {
    const week = shallow(
      <Week {...initialProps} {...{ focusedDate: new Date(1980, 5, 12) }} />,
    ).instance();

    expect(
      week.shouldComponentUpdate({
        ...initialProps,
        selectionConfiguration: {
          type: CALENDAR_SELECTION_TYPE.single,
          date: null,
        },
      }),
    ).toBe(true);
  });

  it('should update if minDate changes', () => {
    const week = shallow(<Week {...initialProps} />).instance();

    expect(
      week.shouldComponentUpdate({
        ...initialProps,
        minDate: new Date(1980, 0, 1),
      }),
    ).toBe(true);
  });

  it('should update if maxDate changes', () => {
    const week = shallow(<Week {...initialProps} />).instance();

    expect(
      week.shouldComponentUpdate({
        ...initialProps,
        maxDate: new Date(1980, 9, 1),
      }),
    ).toBe(true);
  });

  [
    ['0611', '0613', '0611', '0613', false, 'does not change'],
    ['0605', '0607', '0607', '0608', true, 'start changes outside week'],
    ['0605', '0615', '0607', '0615', true, 'changes but fully overlaps'],
    ['0612', '0615', '0613', '0615', true, 'start changes within week'],
    ['0614', '0615', '0612', '0615', true, 'start moves earlier within week'],
    ['0612', '0615', '0608', '0615', true, 'start moves from week to outside'],
    ['0620', '0622', '0608', '0622', true, 'start moves from after to before'],
    ['0608', '0622', '0620', '0622', true, 'start moves from before to after'],
    ['0612', '0614', '0612', '0615', true, 'end changes within week'],
    ['0612', '0615', '0612', '0613', true, 'end moves earlier within week'],
    ['0605', '0614', '0605', '0608', true, 'end moves from week to outside'],
    ['0605', '0620', '0605', '0608', true, 'end moves from after to before'],
    ['0605', '0608', '0605', '0620', true, 'end moves from before to after'],
    ['0602', '0605', '0622', '0625', true, 'moves entirely past the week'],
    ['0610', '0617', '0611', '0617', true, 'moves from start edge into week'],
    ['0612', '0616', '0612', '0615', true, 'moves from end edge into week'],
    ['0610', '0617', '0609', '0617', true, 'moves from start edge out of week'],
    ['0611', '0616', '0611', '0617', true, 'moves from end edge out of week'],
  ].forEach(([start, end, newStart, newEnd, expected, reason]) => {
    it(`should${
      expected ? '' : ' not'
    } update when selection range ${reason}`, () => {
      const date = (dt) => parse(`1980${dt}`, 'yyyyMMdd', new Date());
      const week = shallow(
        <Week
          {...initialProps}
          selectionConfiguration={{
            type: CALENDAR_SELECTION_TYPE.range,
            startDate: date(start),
            endDate: date(end),
          }}
        />,
      ).instance();

      expect(
        week.shouldComponentUpdate({
          ...initialProps,
          selectionConfiguration: {
            type: CALENDAR_SELECTION_TYPE.range,
            startDate: date(newStart),
            endDate: date(newEnd),
          },
        }),
      ).toBe(expected);
    });
  });
});
