/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { cssModules } from 'bpk-react-utils';

import BpkCalendarGridHeader from './BpkCalendarGridHeader';
import Week from './Week';
import {
  formatIsoDate,
  getCalendarMonthWeeks,
  isSameMonth,
  orderDaysOfWeek,
} from './date-utils';
import CustomPropTypes from './custom-proptypes';

import STYLES from './bpk-calendar-grid.scss';

const getClassName = cssModules(STYLES);

/*
  BpkCalendarGrid - the grid representing a whole month
*/
class BpkCalendarGrid extends Component {
  constructor(props) {
    super(props);

    // We cache expensive calculations (and identities) in state
    this.state = {
      calendarMonthWeeks: getCalendarMonthWeeks(props.month, props.weekStartsOn),
      daysOfWeek: orderDaysOfWeek(props.daysOfWeek, props.weekStartsOn),
    };
  }

  componentWillReceiveProps(nextProps) {
    // We cache expensive calculations (and identities) in state
    if (nextProps.daysOfWeek !== this.props.daysOfWeek
        || !isSameMonth(nextProps.month, this.props.month)
        || nextProps.weekStartsOn !== this.props.weekStartsOn) {
      this.setState({
        calendarMonthWeeks: getCalendarMonthWeeks(nextProps.month, nextProps.weekStartsOn),
        daysOfWeek: orderDaysOfWeek(nextProps.daysOfWeek, nextProps.weekStartsOn),
      });
    }
  }

  render() {
    const {
      month,
      className,
      DateComponent,
      dateModifiers,
      formatDateFull,
      formatMonth,
      onDateClick,
      onDateMouseDown,
      onDateKeyDown,
      showWeekendSeparator,
      weekStartsOn,
      preventKeyboardFocus,
      isKeyboardFocusable,
      markToday,
      markOutsideDays,
      selectedDate,
      focusedDate,
      minDate,
      maxDate,
    } = this.props;

    const {
      calendarMonthWeeks,
      daysOfWeek,
    } = this.state;

    const classNames = [getClassName('bpk-calendar-grid')];
    if (className) { classNames.push(className); }

    return (
      <table className={classNames.join(' ')} aria-hidden={!isKeyboardFocusable}>
        <caption
          className={getClassName('bpk-calendar-grid__caption')}
          hidden
        >
          {formatMonth(month)}
        </caption>
        <BpkCalendarGridHeader
          isTableHead
          daysOfWeek={daysOfWeek}
          showWeekendSeparator={showWeekendSeparator}
          weekStartsOn={weekStartsOn}
        />
        <tbody>
          { calendarMonthWeeks.map(dates => (
            <Week
              key={formatIsoDate(dates[0])}
              month={month}
              dates={dates}
              onDateClick={onDateClick}
              onDateMouseDown={onDateMouseDown}
              onDateKeyDown={onDateKeyDown}
              showWeekendSeparator={showWeekendSeparator}
              formatDateFull={formatDateFull}
              DateComponent={DateComponent}
              dateModifiers={dateModifiers}
              daysOfWeek={daysOfWeek}
              preventKeyboardFocus={preventKeyboardFocus}
              isKeyboardFocusable={isKeyboardFocusable}
              weekStartsOn={weekStartsOn}

              markToday={markToday}
              markOutsideDays={markOutsideDays}
              selectedDate={selectedDate}
              focusedDate={focusedDate}
              minDate={minDate}
              maxDate={maxDate}
            />
          )) }
        </tbody>
      </table>
    );
  }
}

BpkCalendarGrid.propTypes = {
  // Required
  DateComponent: PropTypes.func.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  // Optional
  className: PropTypes.string,
  dateModifiers: CustomPropTypes.DateModifiers,
  focusedDate: PropTypes.instanceOf(Date),
  isKeyboardFocusable: PropTypes.bool,
  markOutsideDays: PropTypes.bool,
  markToday: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onDateClick: PropTypes.func,
  onDateMouseDown: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  preventKeyboardFocus: PropTypes.bool,
  selectedDate: PropTypes.instanceOf(Date),
  showWeekendSeparator: PropTypes.bool,
  weekStartsOn: PropTypes.number,
};

BpkCalendarGrid.defaultProps = {
  className: null,
  dateModifiers: {},
  focusedDate: null,
  isKeyboardFocusable: true,
  markOutsideDays: true,
  markToday: true,
  maxDate: null,
  minDate: null,
  onDateClick: null,
  onDateMouseDown: null,
  onDateKeyDown: null,
  preventKeyboardFocus: false,
  selectedDate: null,
  showWeekendSeparator: true,
  weekStartsOn: 1,
};

export default BpkCalendarGrid;
