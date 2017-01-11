import React, { PropTypes } from 'react';

import BpkCalendarDate from './BpkCalendarDate';
import { getCalendarMonthWeeks, formatIsoDate, formatHumanDate, getDay } from './utils';
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
  return (
    <th
      className={classNames.join(' ')}
      title={props.weekDay.name}
    ><span aria-hidden="true">{ props.weekDay.nameAbbr }</span></th>
  );
};

WeekDay.propTypes = {
  weekDay: CustomPropTypes.WeekDay,
  isWeekend: PropTypes.bool,
};

/*
  Week - table row containing a week full of DateContainer components
*/
const Week = (props) => {
  const DateComponent = props.dateComponent;
  const {
    onDateClick,
    showWeekendSeparator,
    daysOfWeek,
  } = props;

  const weekend = daysOfWeek.map(day => day.isWeekend);

  let weekendStart = -1;
  let weekendEnd = -1;

  if (weekend[0] && weekend[6]) { // weekend stretches over turn the of the week
    weekendStart = weekend.lastIndexOf(false) + 1;
    weekendEnd = weekend.indexOf(false) - 1;
  } else {
    weekendStart = weekend.indexOf(true);
    weekendEnd = weekend.lastIndexOf(true);
  }


  return (
    <tr
      className="bpk-calendar-grid__week"
    >{ props.dates.map(date => (
      <DateContainer
        key={date.toDateString()}
        date={date}
        weekendStart={showWeekendSeparator && weekendStart === getDay(date)}
        weekendEnd={showWeekendSeparator && weekendEnd === getDay(date)}
      >
        <DateComponent
          date={date}
          aria-label={props.formatDateFull(date)}
          onClick={() => { if (onDateClick) { onDateClick(date); } }}
        />
      </DateContainer>
    ))}
    </tr>
  );
};

Week.propTypes = {
  dates: PropTypes.arrayOf(Date),
  dateComponent: PropTypes.func,
  onDateClick: PropTypes.func,
  formatDateFull: PropTypes.func,
  showWeekendSeparator: PropTypes.bool,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
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
  date: PropTypes.instanceOf(Date).isRequired,
  children: PropTypes.element.isRequired,
  weekendStart: PropTypes.bool,
  weekendEnd: PropTypes.bool,
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
    onDateClick,
    showWeekendSeparator,
    formatDateFull,
    daysOfWeek,
    weekStartsOn,
  } = props;

  const reorderedWeekDays = reorderWeekDays(
    daysOfWeek.slice().sort((a, b) => a.index - b.index),
    weekStartsOn,
  );

  const calendarMonthWeeks = getCalendarMonthWeeks(props.month, props.weekStartsOn);

  const dateComponent = props.getDateComponent(props.dateModifiers);

  return (
    <table className="bpk-calendar-grid">
      <thead>
        <tr className="bpk-calendar-grid__header">
          { reorderedWeekDays.map((weekDay, index) => (
            <WeekDay
              weekDay={weekDay}
              key={index}
            />
          )) }
        </tr>
      </thead>
      <tbody>
        { calendarMonthWeeks.map((dates, index) => (
          <Week
            key={index}
            dates={dates}
            dateComponent={dateComponent}
            onDateClick={onDateClick}
            showWeekendSeparator={showWeekendSeparator}
            daysOfWeek={daysOfWeek}
            formatDateFull={formatDateFull}
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
  getDateComponent: PropTypes.func.isRequired,
  showWeekendSeparator: PropTypes.bool,
  onDateClick: PropTypes.func,
  formatDateFull: PropTypes.func,
  dateModifiers: BpkCalendarDate.propTypes.modifiers,
};

BpkCalendarGrid.defaultProps = {
  showWeekendSeparator: false,
  onDateClick: null,
  formatDateFull: formatHumanDate,
  dateModifiers: {},
};

export default BpkCalendarGrid;
