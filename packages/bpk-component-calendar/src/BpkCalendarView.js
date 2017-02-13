import React, { PropTypes } from 'react';

import BpkCalendarNav from './BpkCalendarNav';
import BpkCalendarGrid, { BpkCalendarGridHeader } from './BpkCalendarGrid';
import BpkCalendarDate from './BpkCalendarDate';
import CustomPropTypes from './custom-proptypes';
import './bpk-calendar.scss';

const reorderWeekDays = (weekDays, weekStartsOn) => [
  ...weekDays.slice(weekStartsOn),
  ...weekDays.slice(0, weekStartsOn),
];

const BpkCalendarView = (props) => {
  const classNames = ['bpk-calendar'];

  if (props.className) { classNames.push(props.className); }

  // Sorted in [sun, mon, ..., sat]
  const sortedWeekDays = props.daysOfWeek.slice().sort((a, b) => a.index - b.index);
  // Ordered according to weekStartsOn, e.g. [mon, tue, ..., sun]
  const reorderedWeekDays = reorderWeekDays(
    sortedWeekDays,
    props.weekStartsOn,
  );


  const weekend = sortedWeekDays.map(day => day.isWeekend);
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
    <div className={classNames.join(' ')}>
      <BpkCalendarNav
        className="bpk-calendar__nav"
        changeMonthLabel={props.changeMonthLabel}
        formatMonth={props.formatMonth}
        id={`${props.id}__bpk_calendar_nav`}
        maxDate={props.maxDate}
        minDate={props.minDate}
        month={props.month}
        onChangeMonth={props.onChangeMonth}
      />
      <BpkCalendarGridHeader
        className="bpk-calendar__grid-header"
        weekDays={reorderedWeekDays}
        showWeekendSeparator={props.showWeekendSeparator}
        weekendStartIndex={weekendStartIndex}
        weekendEndIndex={weekendEndIndex}
      />
      <BpkCalendarGrid
        className="bpk-calendar__grid"
        DateComponent={props.DateComponent}
        dateModifiers={props.dateModifiers}
        daysOfWeek={props.daysOfWeek}
        formatDateFull={props.formatDateFull}
        formatMonth={props.formatMonth}
        month={props.month}
        onDateClick={props.onDateClick}
        onDateKeyDown={props.onDateKeyDown}
        preventKeyboardFocus={props.preventKeyboardFocus}
        showWeekendSeparator={props.showWeekendSeparator}
        weekStartsOn={props.weekStartsOn}
        maxDate={props.maxDate}
        minDate={props.minDate}

        focusedDate={props.focusedDate}
        markToday={props.markToday}
        markOutsideDays={props.markOutsideDays}
        selectedDate={props.selectedDate}

        weekDays={reorderedWeekDays}
        weekendStartIndex={weekendStartIndex}
        weekendEndIndex={weekendEndIndex}
      />
    </div>
  );
};

BpkCalendarView.propTypes = {
  // BpkCalendarNav & BpkCalendarGrid
  month: PropTypes.instanceOf(Date).isRequired,
  formatMonth: PropTypes.func.isRequired,

  // BpkCalendarNav
  changeMonthLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,

  onChangeMonth: PropTypes.func,

  // BpkCalendarGrid
  DateComponent: PropTypes.func.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  showWeekendSeparator: PropTypes.bool.isRequired,
  weekStartsOn: PropTypes.number.isRequired,

  className: PropTypes.string,
  dateModifiers: CustomPropTypes.DateModifiers,
  onDateClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  preventKeyboardFocus: PropTypes.bool,
};

BpkCalendarView.defaultProps = {
  className: null,
  DateComponent: BpkCalendarDate,
  dateModifiers: {},
  onChangeMonth: null,
  onDateClick: null,
  showWeekendSeparator: true,
  weekStartsOn: 1,
};

export default BpkCalendarView;
