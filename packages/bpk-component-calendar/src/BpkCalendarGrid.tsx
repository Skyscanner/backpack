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

import type { ElementType } from 'react';
import { Component } from 'react';

import { cssModules, isDeviceIos } from '../../bpk-react-utils';

import { addCalendarGridTransition } from './BpkCalendarGridTransition';
import BpkCalendarWeek from './BpkCalendarWeek';
import { CALENDAR_SELECTION_TYPE } from './custom-proptypes';
import {
  addMonths,
  getCalendar,
  getCalendarNoCustomLabel,
  isSameMonth,
  format,
} from './date-utils';

import type { DateModifiers, SelectionConfiguration } from './custom-proptypes';

import STYLES from './BpkCalendarGrid.module.scss';

// This should be imported after `./BpkCalendarGrid.module.scss`.
// Because of how css specificity works the class `bpk-calendar-grid-transition__grid` needs to be defined
// after `bpk-calendar-grid` (defined by BpkCalendarGrid.module.scss) so it can override width and display of the calendar

// This is because the calendar with transiction is expected to have a fixed width and whenever `bpk-calendar-grid-transition__grid`
// class is applyed it should override the calendar style.

const getClassName = cssModules(STYLES);

type DefaultProps = {
  className?: string | null;
  dateModifiers?: DateModifiers;
  focusedDate?: Date | null;
  cellClassName: string | null;
  isKeyboardFocusable: boolean;
  markOutsideDays: boolean;
  markToday: boolean;
  maxDate: Date;
  minDate: Date;
  onDateClick: () => void;
  onDateKeyDown: () => void;
  /**
   * A function to format a human-readable month, for example: "January 2018":
   * If you just need to quickly prototype, use the following from [`date-fns`](https://date-fns.org/docs/format#usage)
   */
  formatMonth: (month: Date) => string;
  preventKeyboardFocus: boolean;
  /**
   * An object to indicate which configuration of the calendar is being used. Choices are `single` date selection or `range` date selection.
   */
  selectionConfiguration: SelectionConfiguration;
  ignoreOutsideDate: boolean;
  dateProps: {};
};

export type Props = DefaultProps & {
  DateComponent: ElementType;
  /**
   * A function to format a full, human-readable date, for example: "Monday, 8th January 2018".
   */
  formatDateFull: (date: Date) => Date | string;
  month: Date;
  /**
   * First day of the week. 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
   */
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

export type DateProps = {
  val: Date;
  customLabel: string | Date;
  isoLabel: string;
};

type State = {
  calendarMonthWeeks: DateProps[][];
};
/*
  BpkCalendarGrid - the grid representing a whole month
*/
class BpkCalendarGrid extends Component<Props, State> {
  static defaultProps: DefaultProps = {
    className: null,
    dateModifiers: {},
    focusedDate: null,
    isKeyboardFocusable: true,
    markOutsideDays: true,
    markToday: true,
    maxDate: addMonths(new Date(), 12),
    minDate: new Date(),
    onDateClick: () => {},
    onDateKeyDown: () => {},
    formatMonth: (month: Date) => format(month, 'MMMM yyyy'),
    preventKeyboardFocus: false,
    selectionConfiguration: {
      type: CALENDAR_SELECTION_TYPE.single,
      date: null,
    },
    ignoreOutsideDate: false,
    dateProps: {},
    cellClassName: null,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      // Do not run expensive date formatting in the constructor
      calendarMonthWeeks: getCalendarNoCustomLabel(
        props.month,
        props.weekStartsOn,
      ),
    };
  }

  componentDidMount(): void {
    this.setState({
      calendarMonthWeeks: getCalendar(
        this.props.month,
        this.props.weekStartsOn,
        this.props.formatDateFull,
      ),
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    // We cache expensive calculations (and identities) in state
    if (
      !isSameMonth(nextProps.month, this.props.month) ||
      nextProps.weekStartsOn !== this.props.weekStartsOn
    ) {
      this.setState({
        calendarMonthWeeks: getCalendar(
          nextProps.month,
          nextProps.weekStartsOn,
          nextProps.formatDateFull,
        ),
      });
    }
  }

  render() {
    const {
      DateComponent,
      cellClassName,
      className,
      dateModifiers,
      dateProps,
      focusedDate,
      formatMonth,
      ignoreOutsideDate,
      isKeyboardFocusable,
      markOutsideDays,
      markToday,
      maxDate,
      minDate,
      month,
      onDateClick,
      onDateKeyDown,
      preventKeyboardFocus,
      selectionConfiguration,
      weekStartsOn,
    } = this.props;

    const { calendarMonthWeeks } = this.state;

    const classNames = getClassName('bpk-calendar-grid', className);

    return (
      <div
        className={classNames}
        aria-hidden={!isKeyboardFocusable}
        role="grid"
        aria-label={formatMonth(month)}
      >
        <div role="rowgroup">
          {calendarMonthWeeks.map((dates) => (
            <BpkCalendarWeek
              key={dates[0].isoLabel}
              month={month}
              dates={dates}
              onDateClick={onDateClick}
              onDateKeyDown={onDateKeyDown}
              DateComponent={DateComponent}
              dateModifiers={dateModifiers!}
              preventKeyboardFocus={preventKeyboardFocus}
              isKeyboardFocusable={isKeyboardFocusable}
              weekStartsOn={weekStartsOn}
              markToday={markToday}
              markOutsideDays={markOutsideDays}
              selectionConfiguration={selectionConfiguration}
              focusedDate={focusedDate}
              minDate={minDate}
              maxDate={maxDate}
              ignoreOutsideDate={ignoreOutsideDate}
              dateProps={dateProps}
              cellClassName={cellClassName}
            />
          ))}
        </div>
      </div>
    );
  }
}

// On iOS, having transitions causes accessibility issues, so we disable it (KOA-4467).
const BpkCalendarGridWithTransition = isDeviceIos()
  ? BpkCalendarGrid
  : addCalendarGridTransition(BpkCalendarGrid);

export default BpkCalendarGrid;
export { BpkCalendarGridWithTransition };
