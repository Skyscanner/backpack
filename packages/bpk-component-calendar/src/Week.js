import React, { Component, PropTypes } from 'react';

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
import './bpk-calendar.scss';

const shallowEqualProps = (props1, props2, propList) => {
  let i = 0;
  for (; i < propList.length; i += 1) {
    if (props1[propList[i]] !== props2[propList[i]]) { return false; }
  }
  return true;
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
    ];

    if (!shallowEqualProps(this.props, nextProps, shallowProps)) { return true; }
    if (
      (isSameWeek(nextProps.focusedDate, nextProps.dates[0], { weekStartsOn: nextProps.weekStartsOn })
        || isSameWeek(this.props.focusedDate, this.props.dates[0], { weekStartsOn: this.props.weekStartsOn })
      ) && this.props.focusedDate !== nextProps.focusedDate) {
      return true;
    }
    if (
      (isSameWeek(nextProps.selectedDate, nextProps.dates[0], { weekStartsOn: nextProps.weekStartsOn })
        || isSameWeek(this.props.selectedDate, this.props.dates[0], { weekStartsOn: this.props.weekStartsOn })
      ) && this.props.selectedDate !== nextProps.selectedDate) {
      return true;
    }
    if (!isSameDay(nextProps.minDate, this.props.minDate)) {
      return true;
    }
    if (!isSameDay(nextProps.maxDate, this.props.maxDate)) {
      return true;
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
    } = this.props;

    const firstDayOfWeekendIndex = getFirstDayOfWeekend(daysOfWeek);
    const lastDayOfWeekendIndex = getLastDayOfWeekend(daysOfWeek);

    return (
      <tr
        className="bpk-calendar-grid__week"
      >{ this.props.dates.map(date => (
        <DateContainer
          key={date.getDate()}
          weekendStart={showWeekendSeparator && firstDayOfWeekendIndex === getDay(date)}
          weekendEnd={showWeekendSeparator && lastDayOfWeekendIndex === getDay(date)}
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
            isBlocked={(minDate && maxDate) ? !isWithinRange(date, minDate, maxDate) : false}
            isOutside={markOutsideDays && !isSameMonth(date, month)}
            isToday={markToday && isToday(date)}
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
  onDateClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  selectedDate: PropTypes.instanceOf(Date),
};

Week.defaultProps = {
  focusedDate: null,
  maxDate: null,
  minDate: null,
  onDateClick: null,
  onDateKeyDown: null,
  selectedDate: null,
};

/*
  DateContainer - one for each date in the grid; wraps the actual BpkCalendarDate (or custom) component
*/
const DateContainer = (props) => {
  const classNames = ['bpk-calendar-grid__date'];

  if (props.weekendStart) { classNames.push('bpk-calendar-grid__date--weekend-start'); }
  if (props.weekendEnd) { classNames.push('bpk-calendar-grid__date--weekend-end'); }

  return (
    <td
      className={classNames.join(' ')}
    >
      { props.children }
    </td>
  );
};

DateContainer.propTypes = {
  children: PropTypes.element.isRequired,
  weekendStart: PropTypes.bool.isRequired,
  weekendEnd: PropTypes.bool.isRequired,
};

export default Week;
