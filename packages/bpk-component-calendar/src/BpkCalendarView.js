import React, { PropTypes } from 'react';

import BpkCalendarNav from './BpkCalendarNav';
import BpkCalendarGrid from './BpkCalendarGrid';
import BpkCalendarGridHeader from './BpkCalendarGridHeader';
import BpkCalendarDate from './BpkCalendarDate';
import CustomPropTypes from './custom-proptypes';
import addCalendarGridTransition from './BpkCalendarGridTransition';
import './bpk-calendar.scss';

const TransitioningBpkCalendarGrid = addCalendarGridTransition(BpkCalendarGrid);

const BpkCalendarView = (props) => {
  const classNames = ['bpk-calendar'];

  if (props.className) { classNames.push(props.className); }

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
        daysOfWeek={props.daysOfWeek}
        showWeekendSeparator={props.showWeekendSeparator}
        weekStartsOn={props.weekStartsOn}
      />
      <TransitioningBpkCalendarGrid
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
      />
    </div>
  );
};

BpkCalendarView.propTypes = {
  // Required
  changeMonthLabel: PropTypes.string.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  maxDate: PropTypes.instanceOf(Date).isRequired,
  minDate: PropTypes.instanceOf(Date).isRequired,
  month: PropTypes.instanceOf(Date).isRequired,
  showWeekendSeparator: PropTypes.bool.isRequired,
  weekStartsOn: PropTypes.number.isRequired,
  // Optional
  className: PropTypes.string,
  DateComponent: PropTypes.func,
  dateModifiers: CustomPropTypes.DateModifiers,
  focusedDate: PropTypes.instanceOf(Date),
  markOutsideDays: PropTypes.bool,
  markToday: PropTypes.bool,
  onChangeMonth: PropTypes.func,
  onDateClick: PropTypes.func,
  onDateKeyDown: PropTypes.func,
  preventKeyboardFocus: PropTypes.bool,
  selectedDate: PropTypes.instanceOf(Date),
};

BpkCalendarView.defaultProps = {
  className: null,
  DateComponent: BpkCalendarDate,
  dateModifiers: {},
  focusedDate: null,
  markOutsideDays: false,
  markToday: false,
  onChangeMonth: () => null,
  onDateClick: () => null,
  selectedDate: null,
  showWeekendSeparator: true,
  weekStartsOn: 1,
};

export default BpkCalendarView;
