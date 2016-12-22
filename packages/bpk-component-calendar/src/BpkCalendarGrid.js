import React, { PropTypes } from 'react';

import { getCalendarMonthWeeks, isSaturday, isSunday, formatIsoDate, formatHumanDate } from './utils';
import BpkCalendarDate from './BpkCalendarDate';
import './bpk-calendar.scss';

/*
  WeekDay - table header cells such as "Mon", "Tue", "Wed"...
*/
const WeekDay = props => (
  <th
    className="bpk-calendar-grid__header-weekday"
    title={props.weekDayFull}
  ><span aria-hidden="true">{ props.weekDayAbbr }</span></th>
);

WeekDay.propTypes = {
  weekDayAbbr: PropTypes.string.isRequired,
  weekDayFull: PropTypes.string.isRequired,
};

/*
  Week - table row containing a week full of DateContainer components
*/
const Week = (props) => {
  const DateComponent = props.dateComponent;
  const onDateClick = props.onDateClick;
  const showWeekendSeparator = props.showWeekendSeparator;

  return (
    <tr
      className="bpk-calendar-grid__week"
    >{ props.dates.map(date => (
      <DateContainer
        key={date.toDateString()}
        date={date}
        onClick={() => { if (onDateClick) { onDateClick(date); } }}
        showWeekendSeparator={showWeekendSeparator}
      >
        <DateComponent
          date={date}
          aria-label={props.formatA11yDate(date)}
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
  formatA11yDate: PropTypes.func,
  showWeekendSeparator: PropTypes.bool,
};

/*
  DateContainer - one for each date in the grid; wraps the actual BpkCalendarDate (or custom) component
*/
const DateContainer = (props) => {
  const classNames = ['bpk-calendar-grid__date'];
  const date = props.date;

  if (props.showWeekendSeparator) {
    if (isSaturday(date)) { classNames.push('bpk-calendar-grid__date--weekend-start'); }
    if (isSunday(date)) { classNames.push('bpk-calendar-grid__date--weekend-end'); }
  }

  // TODO: To be dealt with in BPK-374
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <td
      key={date.toDateString()}
      data-date={formatIsoDate(date)}
      className={classNames.join(' ')}
      onClick={props.onClick}
    >
      { props.children }
    </td>
  );
  /* eslint-enable jsx-a11y/no-static-element-interactions */
};

DateContainer.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onClick: PropTypes.func,
  children: PropTypes.element.isRequired,
  showWeekendSeparator: PropTypes.bool.isRequired,
};

const getDateComponent = dateModifiers => (dcProps) => {
  const modifiers = dateModifiers;
  return (
    <BpkCalendarDate modifiers={modifiers} {...dcProps} />
  );
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
    weekDaysAbbr,
    weekDaysFull,
    weekStartsOn,
    onDateClick,
    showWeekendSeparator,
    formatA11yDate,
  } = props;
  const reorderedWeekDaysAbbr = reorderWeekDays(weekDaysAbbr, weekStartsOn);
  const reorderedWeekDaysFull = reorderWeekDays(weekDaysFull, weekStartsOn);

  const calendarMonthWeeks = getCalendarMonthWeeks(props.month, props.weekStartsOn);

  let dateComponent = getDateComponent(props.dateModifiers);

  if (props.getDateComponent) {
    dateComponent = props.getDateComponent();
  }

  return (
    <table className="bpk-calendar-grid">
      <thead>
        <tr className="bpk-calendar-grid__header">
          { reorderedWeekDaysAbbr.map((weekDay, index) => (
            <WeekDay
              weekDayAbbr={weekDay}
              weekDayFull={reorderedWeekDaysFull[index]}
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
            formatA11yDate={formatA11yDate}
          />
        )) }
      </tbody>
    </table>
  );
};

BpkCalendarGrid.propTypes = {
  month: PropTypes.instanceOf(Date),
  weekDaysAbbr: PropTypes.arrayOf(PropTypes.string).isRequired,
  weekDaysFull: PropTypes.arrayOf(PropTypes.string).isRequired,
  weekStartsOn: PropTypes.number,
  dateModifiers: BpkCalendarDate.propTypes.modifiers,
  onDateClick: PropTypes.func,
  getDateComponent: PropTypes.func,
  showWeekendSeparator: PropTypes.bool,
  formatA11yDate: PropTypes.func,
};

BpkCalendarGrid.defaultProps = {
  month: new Date(),
  weekStartsOn: 1,
  dateModifiers: {},
  showWeekendSeparator: false,
  weekDaysAbbr: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  weekDaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  formatA11yDate: formatHumanDate,
};

export default BpkCalendarGrid;
