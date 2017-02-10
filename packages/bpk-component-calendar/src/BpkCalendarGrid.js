import React, { PropTypes } from 'react';
import BpkCalendarGridHeader from './BpkCalendarGridHeader';

import {
  formatIsoDate,
  getCalendarMonthWeeks,
  getDay,
} from './date-utils';
import CustomPropTypes from './custom-proptypes';
import addCalendarGridTransition from './BpkCalendarGridTransition';
import './bpk-calendar.scss';

/*
  Week - table row containing a week full of DateContainer components
*/
const Week = (props) => {
  const {
    DateComponent,
    dateModifiers,
    formatDateFull,
    onDateClick,
    onDateKeyDown,
    showWeekendSeparator,
    weekendStartIndex,
    weekendEndIndex,
    preventKeyboardFocus,
    focusable,
    month,
  } = props;

  return (
    <tr
      className="bpk-calendar-grid__week"
    >{ props.dates.map(date => (
      <DateContainer
        key={date.toDateString()}
        date={date}
        weekendStart={showWeekendSeparator && weekendStartIndex === getDay(date)}
        weekendEnd={showWeekendSeparator && weekendEndIndex === getDay(date)}
      >
        <DateComponent
          date={date}
          month={month}
          modifiers={dateModifiers}
          aria-label={formatDateFull(date)}
          onClick={() => { if (onDateClick) { onDateClick(date); } }}
          onDateKeyDown={onDateKeyDown}
          focused={dateModifiers.focused ? dateModifiers.focused(date, month) : false}
          preventKeyboardFocus={preventKeyboardFocus}
          isInCurrentMonth={focusable}
        />
      </DateContainer>
    ))}
    </tr>
  );
};

Week.propTypes = {
  DateComponent: PropTypes.func.isRequired,
  dateModifiers: CustomPropTypes.DateModifiers.isRequired,
  dates: PropTypes.arrayOf(Date).isRequired,
  formatDateFull: PropTypes.func.isRequired,
  preventKeyboardFocus: PropTypes.bool.isRequired,
  showWeekendSeparator: PropTypes.bool.isRequired,
  weekendStartIndex: PropTypes.number.isRequired,
  weekendEndIndex: PropTypes.number.isRequired,
  onDateClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
};

Week.defaultProps = {
  onDateClick: null,
  onDateKeyDown: null,
};

/*
  DateContainer - one for each date in the grid; wraps the actual BpkCalendarDate (or custom) component
*/
const DateContainer = (props) => {
  const classNames = ['bpk-calendar-grid__date'];
  const date = props.date;

  if (props.weekendStart) { classNames.push('bpk-calendar-grid__date--weekend-start'); }
  if (props.weekendEnd) { classNames.push('bpk-calendar-grid__date--weekend-end'); }

  return (
    <td
      key={date.toDateString()}
      data-date={formatIsoDate(date)}
      className={classNames.join(' ')}
    >
      { props.children }
    </td>
  );
};

DateContainer.propTypes = {
  children: PropTypes.element.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  weekendStart: PropTypes.bool.isRequired,
  weekendEnd: PropTypes.bool.isRequired,
};


/*
  BpkCalendarGrid - the grid representing a whole month
*/
const BpkCalendarGrid = (props) => {
  const {
    month,
    DateComponent,
    daysOfWeek,
    formatDateFull,
    formatMonth,
    onDateClick,
    onDateKeyDown,
    showWeekendSeparator,
    weekStartsOn,
    weekDays,
    preventKeyboardFocus,
    isInCurrentMonth,
    weekendStartIndex,
    weekendEndIndex,
  } = props;

  const calendarMonthWeeks = getCalendarMonthWeeks(month, weekStartsOn);

  return (
    <table className="bpk-calendar-grid" aria-hidden="true">
      <caption
        className="bpk-calendar-grid__caption"
        hidden
      >
        {formatMonth(month)}
      </caption>
      <BpkCalendarGridHeader
        isTableHead
        weekDays={weekDays}
        showWeekendSeparator={showWeekendSeparator}
        weekendStartIndex={weekendStartIndex}
        weekendEndIndex={weekendEndIndex}
      />
      <tbody>
        { calendarMonthWeeks.map((dates, index) => (
          <Week
            key={index}
            month={month}
            dates={dates}
            onDateClick={onDateClick}
            onDateKeyDown={onDateKeyDown}
            showWeekendSeparator={showWeekendSeparator}
            formatDateFull={formatDateFull}
            DateComponent={DateComponent}
            dateModifiers={props.dateModifiers}
            weekendStartIndex={weekendStartIndex}
            weekendEndIndex={weekendEndIndex}
            preventKeyboardFocus={preventKeyboardFocus}
            focusable={isInCurrentMonth}
          />
        )) }
      </tbody>
    </table>
  );
};

BpkCalendarGrid.propTypes = {
  // Required
  DateComponent: PropTypes.func.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  showWeekendSeparator: PropTypes.bool.isRequired,
  weekStartsOn: PropTypes.number.isRequired,
  // Optional
  dateModifiers: CustomPropTypes.DateModifiers,
  onDateClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  preventKeyboardFocus: PropTypes.bool,
};

BpkCalendarGrid.defaultProps = {
  dateModifiers: {},
  onDateClick: null,
  onDateKeyDown: null,
  preventKeyboardFocus: false,
};

export default addCalendarGridTransition(BpkCalendarGrid);
export { BpkCalendarGridHeader };
