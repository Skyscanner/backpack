/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import { cssModules, deprecated } from 'bpk-react-utils';

import {
  getDay,
  getFirstDayOfWeekend,
  getLastDayOfWeekend,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isToday,
  isWithinRange,
} from './date-utils';
import CustomPropTypes, { CALENDAR_SELECTION_TYPE } from './custom-proptypes';
// TODO: Move this to `Week.scss`
// This should be using its own css file as `BpkCalendarGrid` is also importing `BpkCalendarGrid.module.scss`
// and the order of css imports can break the component.
import STYLES from './BpkCalendarGrid.module.scss';

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
      'daysOfWeek',
      'formatDateFull',
      'isKeyboardFocusable',
      'markOutsideDays',
      'markToday',
      'onDateClick',
      'onDateKeyDown',
      'preventKeyboardFocus',
      'showWeekendSeparator',
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
      daysOfWeek,
      focusedDate,
      formatDateFull,
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
      showWeekendSeparator,
      ignoreOutsideDate,
      dateProps,
    } = this.props;

    const firstDayOfWeekendIndex = getFirstDayOfWeekend(daysOfWeek);
    const lastDayOfWeekendIndex = getLastDayOfWeekend(daysOfWeek);

    if (ignoreOutsideDate) {
      const daysOutside = this.props.dates.map(date =>
        isSameMonth(date, month),
      );

      const shouldRender = daysOutside.reduce(or);

      if (!shouldRender) {
        return null;
      }
    }

    return (
      <tr className={getClassName('bpk-calendar-grid__week')}>
        {this.props.dates.map(date => {
          const isBlocked =
            minDate && maxDate
              ? !isWithinRange(date, { start: minDate, end: maxDate })
              : false;

          return (
            <DateContainer
              className={this.props.cellClassName}
              isEmptyCell={!isSameMonth(date, month) && ignoreOutsideDate}
              isBlocked={isBlocked}
              key={date.getDate()}
              weekendStart={
                showWeekendSeparator && firstDayOfWeekendIndex === getDay(date)
              }
              weekendEnd={
                showWeekendSeparator && lastDayOfWeekendIndex === getDay(date)
              }
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
                {...dateProps}
              />
            </DateContainer>
          );
        })}
      </tr>
    );
  }
}

Week.propTypes = {
  DateComponent: PropTypes.elementType.isRequired,
  dateModifiers: CustomPropTypes.DateModifiers.isRequired,
  dates: PropTypes.arrayOf(Date).isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  preventKeyboardFocus: PropTypes.bool.isRequired,
  showWeekendSeparator: PropTypes.bool.isRequired,
  markToday: PropTypes.bool.isRequired,
  markOutsideDays: PropTypes.bool.isRequired,
  isKeyboardFocusable: PropTypes.bool.isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  weekStartsOn: PropTypes.number.isRequired,
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
  ignoreOutsideDate: PropTypes.bool,
  dateProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Week.defaultProps = {
  cellClassName: null,
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
const DateContainer = props => {
  const classNames = [getClassName('bpk-calendar-grid__date')];

  if (props.weekendStart) {
    classNames.push(getClassName('bpk-calendar-grid__date--weekend-start'));
  }
  if (props.weekendEnd) {
    classNames.push(getClassName('bpk-calendar-grid__date--weekend-end'));
  }
  if (props.className) {
    classNames.push(props.className);
  }

  return (
    <td
      aria-hidden={props.isEmptyCell || props.isBlocked}
      className={classNames.join(' ')}
    >
      {props.children}
    </td>
  );
};

DateContainer.propTypes = {
  children: PropTypes.element.isRequired,
  weekendStart: PropTypes.bool.isRequired,
  weekendEnd: PropTypes.bool.isRequired,
  isEmptyCell: PropTypes.bool.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

DateContainer.defaultProps = {
  className: null,
};

export default Week;
