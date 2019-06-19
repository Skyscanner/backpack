/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
import areRangesOverlapping from 'date-fns/are_ranges_overlapping';
import dateMin from 'date-fns/min';
import dateMax from 'date-fns/max';
import startOfDay from 'date-fns/start_of_day';

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
import CustomPropTypes from './custom-proptypes';
import STYLES from './BpkCalendarGrid.css';

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

    if (!shallowEqualProps(this.props, nextProps, shallowProps)) {
      return true;
    }
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
    if (
      (isSameWeek(nextProps.selectedDate, nextProps.dates[0], {
        weekStartsOn: nextProps.weekStartsOn,
      }) ||
        isSameWeek(this.props.selectedDate, this.props.dates[0], {
          weekStartsOn: this.props.weekStartsOn,
        })) &&
      this.props.selectedDate !== nextProps.selectedDate
    ) {
      return true;
    }
    if (!isSameDay(nextProps.minDate, this.props.minDate)) {
      return true;
    }
    if (!isSameDay(nextProps.maxDate, this.props.maxDate)) {
      return true;
    }

    const selectionStartChanged = !isSameDay(
      this.props.selectionStart,
      nextProps.selectionStart,
    );
    const selectionEndChanged = !isSameDay(
      this.props.selectionEnd,
      nextProps.selectionEnd,
    );

    if (selectionStartChanged || selectionEndChanged) {
      const firstDate = startOfDay(nextProps.dates[0]).getTime() - 1;
      const lastDate =
        startOfDay(nextProps.dates[nextProps.dates.length - 1]).getTime() + 1;
      if (
        areRangesOverlapping(
          this.props.selectionStart,
          this.props.selectionEnd,
          firstDate,
          lastDate,
        ) ||
        areRangesOverlapping(
          nextProps.selectionStart,
          nextProps.selectionEnd,
          firstDate,
          lastDate,
        )
      ) {
        if (
          selectionStartChanged &&
          areRangesOverlapping(
            dateMin(this.props.selectionStart, nextProps.selectionStart),
            dateMax(this.props.selectionStart, nextProps.selectionStart),
            firstDate,
            lastDate,
          )
        ) {
          return true;
        }

        if (
          selectionEndChanged &&
          areRangesOverlapping(
            dateMin(this.props.selectionEnd, nextProps.selectionEnd),
            dateMax(this.props.selectionEnd, nextProps.selectionEnd),
            firstDate,
            lastDate,
          )
        ) {
          return true;
        }
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
      selectedDate,
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
        {this.props.dates.map(date => (
          <DateContainer
            className={this.props.cellClassName}
            isEmptyCell={!isSameMonth(date, month) && ignoreOutsideDate}
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
              isSelected={isSameDay(date, selectedDate)}
              isBlocked={
                minDate && maxDate
                  ? !isWithinRange(date, minDate, maxDate)
                  : false
              }
              isOutside={markOutsideDays && !isSameMonth(date, month)}
              isToday={markToday && isToday(date)}
              {...dateProps}
            />
          </DateContainer>
        ))}
      </tr>
    );
  }
}

Week.propTypes = {
  DateComponent: PropTypes.func.isRequired,
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
  selectedDate: PropTypes.instanceOf(Date),
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
    <td aria-hidden={props.isEmptyCell} className={classNames.join(' ')}>
      {props.children}
    </td>
  );
};

DateContainer.propTypes = {
  children: PropTypes.element.isRequired,
  weekendStart: PropTypes.bool.isRequired,
  weekendEnd: PropTypes.bool.isRequired,
  isEmptyCell: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

DateContainer.defaultProps = {
  className: null,
};

export default Week;
