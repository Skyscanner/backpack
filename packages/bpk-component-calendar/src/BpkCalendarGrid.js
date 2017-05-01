import React, { PropTypes } from 'react';

import BpkCalendarGridHeader from './BpkCalendarGridHeader';
import {
  formatIsoDate,
  getCalendarMonthWeeks,
  getDay,
  getFirstDayOfWeekend,
  getLastDayOfWeekend,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinRange,
  orderDaysOfWeek,
} from './date-utils';
import CustomPropTypes from './custom-proptypes';
import './bpk-calendar.scss';

/*
  Week - table row containing a week full of DateContainer components
*/
const Week = (props) => {
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
  } = props;

  const firstDayOfWeekendIndex = getFirstDayOfWeekend(daysOfWeek);
  const lastDayOfWeekendIndex = getLastDayOfWeekend(daysOfWeek);

  return (
    <tr
      className="bpk-calendar-grid__week"
    >{ props.dates.map(date => (
      <DateContainer
        key={date.toDateString()}
        date={date}
        weekendStart={showWeekendSeparator && firstDayOfWeekendIndex === getDay(date)}
        weekendEnd={showWeekendSeparator && lastDayOfWeekendIndex === getDay(date)}
      >
        <DateComponent
          date={date}
          modifiers={dateModifiers}
          aria-label={formatDateFull(date)}
          onClick={() => { if (onDateClick) { onDateClick(date); } }}
          onDateKeyDown={onDateKeyDown}
          preventKeyboardFocus={preventKeyboardFocus}
          isKeyboardFocusable={isKeyboardFocusable}
          isFocused={isSameDay(date, focusedDate)}
          isSelected={isSameDay(date, selectedDate)}
          isBlocked={(minDate && maxDate) ? !isWithinRange(date, minDate, maxDate) : false}
          isOutside={markOutsideDays ? !isSameMonth(date, month) : false}
          isToday={markToday ? isToday(date) : false}
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
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  preventKeyboardFocus: PropTypes.bool.isRequired,
  showWeekendSeparator: PropTypes.bool.isRequired,
  markToday: PropTypes.bool.isRequired,
  markOutsideDays: PropTypes.bool.isRequired,
  isKeyboardFocusable: PropTypes.bool.isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
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
    formatDateFull,
    formatMonth,
    onDateClick,
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
  } = props;

  const calendarMonthWeeks = getCalendarMonthWeeks(month, weekStartsOn);
  const daysOfWeek = orderDaysOfWeek(props.daysOfWeek, weekStartsOn);

  return (
    <table className="bpk-calendar-grid" aria-hidden={!isKeyboardFocusable}>
      <caption
        className="bpk-calendar-grid__caption"
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
            key={dates[0]}
            month={month}
            dates={dates}
            onDateClick={onDateClick}
            onDateKeyDown={onDateKeyDown}
            showWeekendSeparator={showWeekendSeparator}
            formatDateFull={formatDateFull}
            DateComponent={DateComponent}
            dateModifiers={props.dateModifiers}
            daysOfWeek={daysOfWeek}
            preventKeyboardFocus={preventKeyboardFocus}
            isKeyboardFocusable={isKeyboardFocusable}

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
};

BpkCalendarGrid.propTypes = {
  // Required
  DateComponent: PropTypes.func.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  // Optional
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
  selectedDate: PropTypes.instanceOf(Date),
  showWeekendSeparator: PropTypes.bool,
  weekStartsOn: PropTypes.number,
};

BpkCalendarGrid.defaultProps = {
  dateModifiers: {},
  focusedDate: null,
  isKeyboardFocusable: true,
  markOutsideDays: true,
  markToday: true,
  maxDate: null,
  minDate: null,
  onDateClick: null,
  onDateKeyDown: null,
  preventKeyboardFocus: false,
  selectedDate: null,
  showWeekendSeparator: true,
  weekStartsOn: 1,
};

export default BpkCalendarGrid;
