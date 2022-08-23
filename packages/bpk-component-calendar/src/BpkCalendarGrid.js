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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { cssModules, deprecated, isDeviceIos } from 'bpk-react-utils';

import BpkCalendarGridHeader from './BpkCalendarGridHeader';
import Week from './Week';
import {
  addMonths,
  formatIsoDate,
  getCalendarMonthWeeks,
  isSameMonth,
  orderDaysOfWeek,
} from './date-utils';
import CustomPropTypes, { CALENDAR_SELECTION_TYPE } from './custom-proptypes';
import STYLES from './BpkCalendarGrid.module.scss';
import { addCalendarGridTransition } from './BpkCalendarGridTransition';
// This should be imported after `./BpkCalendarGrid.module.scss`.
// Because of how css specificity works the class `bpk-calendar-grid-transition__grid` needs to be defined
// after `bpk-calendar-grid` (defined by BpkCalendarGrid.module.scss) so it can override width and display of the calendar

// This is because the calendar with transiction is expected to have a fixed width and whenever `bpk-calendar-grid-transition__grid`
// class is applyed it should override the calendar style.

// NOTE that ./Week is also importing ./BpkCalendarGrid.module.scss so adding this after `./Week` would also do the job but
// for clarity we should leave it here.

const getClassName = cssModules(STYLES);

/*
  BpkCalendarGrid - the grid representing a whole month
*/
class BpkCalendarGrid extends Component {
  constructor(props) {
    super(props);

    // We cache expensive calculations (and identities) in state
    this.state = {
      calendarMonthWeeks: getCalendarMonthWeeks(
        props.month,
        props.weekStartsOn,
      ),
      daysOfWeek: orderDaysOfWeek(props.daysOfWeek, props.weekStartsOn),
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // We cache expensive calculations (and identities) in state
    if (
      nextProps.daysOfWeek !== this.props.daysOfWeek ||
      !isSameMonth(nextProps.month, this.props.month) ||
      nextProps.weekStartsOn !== this.props.weekStartsOn
    ) {
      this.setState({
        calendarMonthWeeks: getCalendarMonthWeeks(
          nextProps.month,
          nextProps.weekStartsOn,
        ),
        daysOfWeek: orderDaysOfWeek(
          nextProps.daysOfWeek,
          nextProps.weekStartsOn,
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
      formatDateFull,
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
      selectionEnd,
      selectionStart,
      weekStartsOn,
    } = this.props;

    const { calendarMonthWeeks, daysOfWeek } = this.state;

    const classNames = getClassName('bpk-calendar-grid', className);

    return (
      <div className={classNames} aria-hidden={!isKeyboardFocusable}>
        <caption className={getClassName('bpk-calendar-grid__caption')} hidden>
          {formatMonth(month)}
        </caption>
        <BpkCalendarGridHeader
          isTableHead
          daysOfWeek={daysOfWeek}
          weekStartsOn={weekStartsOn}
        />
        <div>
          {calendarMonthWeeks.map((dates) => (
            <Week
              key={formatIsoDate(dates[0])}
              month={month}
              dates={dates}
              onDateClick={onDateClick}
              onDateKeyDown={onDateKeyDown}
              formatDateFull={formatDateFull}
              DateComponent={DateComponent}
              dateModifiers={dateModifiers}
              preventKeyboardFocus={preventKeyboardFocus}
              isKeyboardFocusable={isKeyboardFocusable}
              weekStartsOn={weekStartsOn}
              markToday={markToday}
              markOutsideDays={markOutsideDays}
              selectionConfiguration={selectionConfiguration}
              selectionEnd={selectionEnd}
              selectionStart={selectionStart}
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

export const propTypes = {
  // Required
  DateComponent: PropTypes.elementType.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  weekStartsOn: PropTypes.number.isRequired,
  // Optional
  className: PropTypes.string,
  cellClassName: PropTypes.string,
  dateModifiers: CustomPropTypes.DateModifiers,
  focusedDate: PropTypes.instanceOf(Date),
  isKeyboardFocusable: PropTypes.bool,
  markOutsideDays: PropTypes.bool,
  markToday: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onDateClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  preventKeyboardFocus: PropTypes.bool,
  selectionConfiguration: CustomPropTypes.SelectionConfiguration,
  selectedDate: deprecated(
    PropTypes.instanceOf(Date),
    'Use selectionConfiguration to set selectedDate',
  ),
  selectionEnd: PropTypes.instanceOf(Date),
  selectionStart: PropTypes.instanceOf(Date),
  showWeekendSeparator: deprecated(
    PropTypes.bool,
    'The showWeekendSeparator prop in BpkCalendarGrid is now deprecated as no longer part of the calendar, so is no longer required',
  ),
  ignoreOutsideDate: PropTypes.bool,
  dateProps: PropTypes.object,
};

BpkCalendarGrid.propTypes = { ...propTypes };

BpkCalendarGrid.defaultProps = {
  className: null,
  dateModifiers: {},
  focusedDate: null,
  isKeyboardFocusable: true,
  markOutsideDays: true,
  markToday: true,
  maxDate: addMonths(new Date(), 12),
  minDate: new Date(),
  onDateClick: null,
  onDateKeyDown: null,
  preventKeyboardFocus: false,
  selectedDate: null,
  selectionConfiguration: { type: CALENDAR_SELECTION_TYPE.single, date: null },
  selectionEnd: null,
  selectionStart: null,
  ignoreOutsideDate: false,
  dateProps: null,
  cellClassName: null,
};

// On iOS, having transitions causes accessibility issues, so we disable it (KOA-4467).
const BpkCalendarGridWithTransition = isDeviceIos()
  ? BpkCalendarGrid
  : addCalendarGridTransition(BpkCalendarGrid);

export default BpkCalendarGrid;
export { BpkCalendarGridWithTransition };
