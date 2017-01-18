import React, { PropTypes } from 'react';

import {
  formatIsoDate,
  getCalendarMonthWeeks,
  getDay,
} from './date-utils';
import CustomPropTypes from './custom-proptypes';
import './bpk-calendar.scss';

/*
  WeekDay - table header cells such as "Mon", "Tue", "Wed"...
*/
const WeekDay = (props) => {
  const classNames = ['bpk-calendar-grid__header-weekday'];

  if (props.weekDay.isWeekend) {
    classNames.push('bpk-calendar-grid__header-weekday--weekend');
  }
  if (props.weekendStart) { classNames.push('bpk-calendar-grid__header-weekday--weekend-start'); }
  if (props.weekendEnd) { classNames.push('bpk-calendar-grid__header-weekday--weekend-end'); }

  return (
    <th
      className={classNames.join(' ')}
      title={props.weekDay.name}
    ><span aria-hidden="true">{ props.weekDay.nameAbbr }</span></th>
  );
};

WeekDay.propTypes = {
  weekDay: CustomPropTypes.WeekDay.isRequired,
  weekendStart: PropTypes.bool.isRequired,
  weekendEnd: PropTypes.bool.isRequired,
};

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
          modifiers={dateModifiers}
          aria-label={formatDateFull(date)}
          onClick={() => { if (onDateClick) { onDateClick(date); } }}
          onDateKeyDown={onDateKeyDown}
          focused={dateModifiers.focused ? dateModifiers.focused(date) : false}
          preventKeyboardFocus={preventKeyboardFocus}
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

const reorderWeekDays = (weekDays, weekStartsOn) => [
  ...weekDays.slice(weekStartsOn),
  ...weekDays.slice(0, weekStartsOn),
];

/*
  BpkCalendarGrid - the grid representing a whole month
*/
const BpkCalendarGrid = (props) => {
  const {
    DateComponent,
    daysOfWeek,
    formatDateFull,
    onDateClick,
    onDateKeyDown,
    showWeekendSeparator,
    weekStartsOn,
    preventKeyboardFocus,
  } = props;

  const reorderedWeekDays = reorderWeekDays(
    daysOfWeek.slice().sort((a, b) => a.index - b.index),
    weekStartsOn,
  );

  const calendarMonthWeeks = getCalendarMonthWeeks(props.month, props.weekStartsOn);

  const weekend = daysOfWeek.map(day => day.isWeekend);

  let weekendStartIndex = -1;
  let weekendEndIndex = -1;

  if (weekend[0] && weekend[6]) { // weekend stretches over turn the of the week
    weekendStartIndex = weekend.lastIndexOf(false) + 1;
    weekendEndIndex = weekend.indexOf(false) - 1;
  } else {
    weekendStartIndex = weekend.indexOf(true);
    weekendEndIndex = weekend.lastIndexOf(true);
  }

  return (
    <table className="bpk-calendar-grid">
      <thead>
        <tr className="bpk-calendar-grid__header">
          { reorderedWeekDays.map((weekDay, index) => (
            <WeekDay
              key={index}
              weekDay={weekDay}
              weekendStart={showWeekendSeparator && weekendStartIndex === weekDay.index}
              weekendEnd={showWeekendSeparator && weekendEndIndex === weekDay.index}
            />
          )) }
        </tr>
      </thead>
      <tbody>
        { calendarMonthWeeks.map((dates, index) => (
          <Week
            key={index}
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
          />
        )) }
      </tbody>
    </table>
  );
};

BpkCalendarGrid.propTypes = {
  month: PropTypes.instanceOf(Date).isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  weekStartsOn: PropTypes.number.isRequired,
  DateComponent: PropTypes.func.isRequired,
  showWeekendSeparator: PropTypes.bool.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  dateModifiers: CustomPropTypes.DateModifiers,
  onDateClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  preventKeyboardFocus: PropTypes.bool,
};

BpkCalendarGrid.defaultProps = {
  onDateClick: null,
  onDateKeyDown: null,
  dateModifiers: {},
  preventKeyboardFocus: false,
};

export default BpkCalendarGrid;
