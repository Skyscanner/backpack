import React from 'react';
import { shallow } from 'enzyme/build';
import startOfDay from 'date-fns/start_of_day';

import Week from './Week';
import { weekDays } from '../test-utils';

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
  daysOfWeek: weekDays,
  formatDateFull: d => d.toString(),
  preventKeyboardFocus: false,
  showWeekendSeparator: true,
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
        showWeekendSeparator: false,
      }),
    ).toBe(true);
  });

  ['selectedDate', 'focusedDate'].forEach(dateField => {
    it(`should not update if ${dateField} changes but is a different week`, () => {
      const week = shallow(<Week {...initialProps} />).instance();

      expect(
        week.shouldComponentUpdate({
          ...initialProps,
          [dateField]: new Date(1980, 4, 11),
        }),
      ).toBe(false);
    });

    it(`should update if ${dateField} changes in this week`, () => {
      const week = shallow(
        <Week {...initialProps} {...{ [dateField]: new Date(1980, 5, 2) }} />,
      ).instance();

      expect(
        week.shouldComponentUpdate({
          ...initialProps,
          [dateField]: new Date(1980, 5, 14),
        }),
      ).toBe(true);
    });

    it(`should update if ${dateField} changes from inside to outside the week`, () => {
      const week = shallow(
        <Week {...initialProps} {...{ [dateField]: new Date(1980, 5, 12) }} />,
      ).instance();

      expect(
        week.shouldComponentUpdate({
          ...initialProps,
          [dateField]: new Date(1980, 5, 18),
        }),
      ).toBe(true);
    });

    it(`should update if ${dateField} in week becomes null`, () => {
      const week = shallow(
        <Week {...initialProps} {...{ [dateField]: new Date(1980, 5, 12) }} />,
      ).instance();

      expect(
        week.shouldComponentUpdate({
          ...initialProps,
          selectedDate: null,
        }),
      ).toBe(true);
    });
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
});
