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

import { cssModules, deprecated } from '../../bpk-react-utils';

import {
  isSameDay,
  isSameWeek,
  isSameMonth,
  isToday,
  isWithinRange,
  startOfMonth,
  endOfMonth,
} from './date-utils';
import CustomPropTypes, { CALENDAR_SELECTION_TYPE } from './custom-proptypes';
// TODO: Move this to `Week.scss`
// This should be using its own css file as `BpkCalendarGrid` is also importing `BpkCalendarGrid.module.scss`
// and the order of css imports can break the component.
import STYLES from './BpkCalendarGrid.module.scss';
import { SELECTION_TYPES } from './BpkCalendarDate';

const getClassName = cssModules(STYLES);

const shallowEqualProps = (props1, props2, propList) => {
  let i = 0;
  for (; i < propList.length; i += 1) {
    if (props1[propList[i]] !== props2[propList[i]]) {
      return false;
    }
  }
  return true;
};

function or(total, bool) {
  return total || bool;
}

/**
 * Determines if the current date is selected
 * @param {Date} date the current date from the calendar
 * @param {Object} selectionConfiguration the current selection configuration
 * @returns {Boolean} true is selected and false if not
 */
function getSelectedDate(date, selectionConfiguration) {
  const startDate =
    selectionConfiguration.date || selectionConfiguration.startDate;
  const { endDate } = selectionConfiguration;
  const sameStartDay = isSameDay(date, startDate);
  const sameEndDay = isSameDay(date, endDate);

  if (
    (startDate &&
      endDate &&
      (sameStartDay ||
        sameEndDay ||
        isWithinRange(date, { start: startDate, end: endDate }))) ||
    (startDate && !endDate && sameStartDay) ||
    sameStartDay
  ) {
    return true;
  }

  return false;
}

/**
 * Gets the correct selection type for the current date
 * @param {Date} date the current date of the calendar
 * @param {Object} selectionConfiguration the current selection configuration
 * @param {Function} formatDateFull function to format dates
 * @param {Date} month the current month of the calendar
 * @param {Number} weekStartsOn index of the first day of the week
 * @param {Boolean} ignoreOutsideDate ignore date outside current month
 * @returns {String} selection type to be passed to the date
 */
function getSelectionType(
  date,
  selectionConfiguration,
  formatDateFull,
  month,
  weekStartsOn,
  ignoreOutsideDate,
) {
  const { endDate, startDate } = selectionConfiguration;
  const sameStartDay = isSameDay(date, startDate);
  const sameEndDay = isSameDay(date, endDate);
  const rangeDates = startDate && endDate;
  const isEmptyCell = !isSameMonth(date, month) && ignoreOutsideDate;

  if (
    selectionConfiguration.type === CALENDAR_SELECTION_TYPE.single &&
    selectionConfiguration.date &&
    (selectionConfiguration.date === formatDateFull(date) ||
      formatDateFull(selectionConfiguration.date) === formatDateFull(date))
  ) {
    return SELECTION_TYPES.single;
  }
  if (selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range) {
    if (
      (startDate && !endDate && sameStartDay) ||
      (rangeDates && sameStartDay && sameEndDay)
    ) {
      return SELECTION_TYPES.single;
    }
    if (
      isEmptyCell &&
      rangeDates &&
      ((isSameWeek(startDate, startOfMonth(startDate), { weekStartsOn }) &&
        isSameWeek(date, startDate, { weekStartsOn })) ||
        (isSameWeek(endDate, endOfMonth(endDate), { weekStartsOn }) &&
          isSameWeek(date, endDate, { weekStartsOn })))
    ) {
      return SELECTION_TYPES.none;
    }
    if (
      isEmptyCell &&
      rangeDates &&
      !isSameMonth(startDate, endDate) &&
      ((isSameWeek(startDate, endOfMonth(startDate), { weekStartsOn }) &&
        isSameWeek(date, startDate, { weekStartsOn })) ||
        (isSameWeek(endDate, startOfMonth(endDate), { weekStartsOn }) &&
          isSameWeek(date, endDate, { weekStartsOn })))
    ) {
      return SELECTION_TYPES.middle;
    }
    if (
      rangeDates &&
      isWithinRange(date, { start: startDate, end: endDate }) &&
      !sameStartDay &&
      !sameEndDay
    ) {
      return SELECTION_TYPES.middle;
    }
    if (startDate && formatDateFull(startDate) === formatDateFull(date)) {
      return SELECTION_TYPES.start;
    }
    if (endDate && formatDateFull(endDate) === formatDateFull(date)) {
      return SELECTION_TYPES.end;
    }
  }

  return SELECTION_TYPES.none;
}

/**
 * Handles changing selected date when in single mode
 * @param {Object} props current props
 * @param {Object} nextProps next props as the component is updating
 * @returns {Boolean} based on if the date has changed
 */
const singleDateHandler = (props, nextProps) => {
  const currentSelectConfig = props.selectionConfiguration;
  const nextSelectConfig = nextProps.selectionConfiguration;

  if (
    (isSameWeek(nextSelectConfig.date, nextProps.dates[0], {
      weekStartsOn: nextProps.weekStartsOn,
    }) ||
      isSameWeek(currentSelectConfig.date, props.dates[0], {
        weekStartsOn: props.weekStartsOn,
      })) &&
    currentSelectConfig.date !== nextSelectConfig.date
  ) {
    return true;
  }
  return false;
};

/**
 * Handles changing selected date when in range mode
 * @param {Object} props current props
 * @param {Object} nextProps next props as the component is updating
 * @returns {Boolean} based on if the date has changed
 */
const rangeDateHandler = (props, nextProps) => {
  const startDateChanged = !isSameDay(
    props.selectionConfiguration.startDate,
    nextProps.selectionConfiguration.startDate,
  );
  const endDateChanged = !isSameDay(
    props.selectionConfiguration.endDate,
    nextProps.selectionConfiguration.endDate,
  );

  if (startDateChanged || endDateChanged) {
    return true;
  }

  return false;
};

/*
  Week - table row containing a week full of DateContainer components
*/
class Week extends Component {
  shouldComponentUpdate(nextProps) {
    const shallowProps = [
      'DateComponent',
      'dateModifiers',
      'formatDateFull',
      'isKeyboardFocusable',
      'markOutsideDays',
      'markToday',
      'onDateClick',
      'onDateKeyDown',
      'preventKeyboardFocus',
      'weekStartsOn',
      'dates',
      'cellClassName',
    ];

    // If any of the props have changed, component should update.
    if (!shallowEqualProps(this.props, nextProps, shallowProps)) {
      return true;
    }

    // If focusedDate is changing, and it'll be included as part
    // of either the week we're rendering now or the next week
    // we'll render, component should update.
    if (
      (isSameWeek(nextProps.focusedDate, nextProps.dates[0], {
        weekStartsOn: nextProps.weekStartsOn,
      }) ||
        isSameWeek(this.props.focusedDate, this.props.dates[0], {
          weekStartsOn: this.props.weekStartsOn,
        })) &&
      this.props.focusedDate !== nextProps.focusedDate
    ) {
      return true;
    }

    // If selected date is changing, and it'll be included as part
    // of either the week we're rendering now or the next week we'll
    // render, component should update.
    if (
      this.props.selectionConfiguration.type ===
        CALENDAR_SELECTION_TYPE.single &&
      this.props.selectionConfiguration.date
    ) {
      return singleDateHandler(this.props, nextProps);
    }
    if (
      this.props.selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range
    ) {
      return rangeDateHandler(this.props, nextProps);
    }

    // If min date is changing, component should update.
    if (nextProps.minDate) {
      if (nextProps.minDate !== this.props.minDate) {
        return true;
      }
      if (!isSameDay(nextProps.minDate, this.props.minDate)) {
        return true;
      }
    }

    // If max date is changing, component should update.
    if (nextProps.maxDate) {
      if (nextProps.maxDate !== this.props.maxDate) {
        return true;
      }
      if (!isSameDay(nextProps.maxDate, this.props.maxDate)) {
        return true;
      }
    }

    return false;
  }

  render() {
    const {
      DateComponent,
      dateModifiers,
      dateProps,
      focusedDate,
      formatDateFull,
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

    if (ignoreOutsideDate) {
      const daysOutside = this.props.dates.map((date) =>
        isSameMonth(date, month),
      );

      const shouldRender = daysOutside.reduce(or);

      if (!shouldRender) {
        return null;
      }
    }

    return (
      <div className={getClassName('bpk-calendar-grid__week')}>
        {this.props.dates.map((date) => {
          const isBlocked =
            minDate && maxDate
              ? !isWithinRange(date, { start: minDate, end: maxDate })
              : false;

          const dateSelectionType = getSelectionType(
            date,
            selectionConfiguration,
            formatDateFull,
            month,
            weekStartsOn,
            ignoreOutsideDate,
          );

          return (
            <DateContainer
              className={this.props.cellClassName}
              isEmptyCell={!isSameMonth(date, month) && ignoreOutsideDate}
              isBlocked={isBlocked}
              key={date.getDate()}
              selectionType={dateSelectionType}
            >
              <DateComponent
                date={date}
                modifiers={dateModifiers}
                aria-label={formatDateFull(date)}
                onClick={onDateClick}
                onDateKeyDown={onDateKeyDown}
                preventKeyboardFocus={preventKeyboardFocus}
                isKeyboardFocusable={isKeyboardFocusable}
                isFocused={isSameDay(date, focusedDate)}
                isSelected={getSelectedDate(date, selectionConfiguration)}
                isBlocked={isBlocked}
                isOutside={markOutsideDays && !isSameMonth(date, month)}
                isToday={markToday && isToday(date)}
                selectionType={dateSelectionType}
                {...dateProps}
              />
            </DateContainer>
          );
        })}
      </div>
    );
  }
}

Week.propTypes = {
  DateComponent: PropTypes.elementType.isRequired,
  dateModifiers: CustomPropTypes.DateModifiers.isRequired,
  dates: PropTypes.arrayOf(Date).isRequired,
  formatDateFull: PropTypes.func.isRequired,
  preventKeyboardFocus: PropTypes.bool.isRequired,
  markToday: PropTypes.bool.isRequired,
  markOutsideDays: PropTypes.bool.isRequired,
  isKeyboardFocusable: PropTypes.bool.isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  weekStartsOn: PropTypes.number.isRequired,
  daysOfWeek: deprecated(
    CustomPropTypes.DaysOfWeek,
    'daysOfWeek property in Week is now deprecated as no longer part of the calendar, so is no longer required',
  ),
  focusedDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  cellClassName: PropTypes.string,
  onDateClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  selectionConfiguration: CustomPropTypes.SelectionConfiguration,
  selectedDate: deprecated(
    PropTypes.instanceOf(Date),
    'Use selectionConfiguration to set selectedDate',
  ),
  selectionEnd: PropTypes.instanceOf(Date),
  selectionStart: PropTypes.instanceOf(Date),
  // eslint-disable-next-line react/require-default-props
  showWeekendSeparator: deprecated(
    PropTypes.bool,
    'The showWeekendSeparator prop in Week is now deprecated as no longer part of the calendar, so is no longer required',
  ),
  ignoreOutsideDate: PropTypes.bool,
  dateProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Week.defaultProps = {
  cellClassName: null,
  daysOfWeek: null,
  focusedDate: null,
  maxDate: null,
  minDate: null,
  onDateClick: null,
  onDateKeyDown: null,
  selectionConfiguration: { type: CALENDAR_SELECTION_TYPE.single, date: null },
  selectedDate: null,
  selectionEnd: null,
  selectionStart: null,
  ignoreOutsideDate: false,
  dateProps: null,
};

/*
  DateContainer - one for each date in the grid; wraps the actual BpkCalendarDate (or custom) component
*/
const DateContainer = (props) => {
  const { children, className, isBlocked, isEmptyCell, selectionType } = props;

  const classNames = getClassName(
    'bpk-calendar-grid__date',
    `bpk-calendar-grid__date--${selectionType}`,
    className,
  );

  return (
    <div aria-hidden={isEmptyCell || isBlocked} className={classNames}>
      {children}
    </div>
  );
};

DateContainer.propTypes = {
  children: PropTypes.element.isRequired,
  selectionType: PropTypes.string.isRequired,
  isEmptyCell: PropTypes.bool.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

DateContainer.defaultProps = {
  className: null,
};

export default Week;
