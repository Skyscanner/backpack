import React, { PropTypes } from 'react';

import BpkCalendarNav from './BpkCalendarNav';
import BpkCalendarGrid from './BpkCalendarGrid';
import BpkCalendarGridHeader from './BpkCalendarGridHeader';
import BpkCalendarDate from './BpkCalendarDate';
import CustomPropTypes from './custom-proptypes';
import { addCalendarGridTransition } from './BpkCalendarGridTransition';
import './bpk-calendar.scss';

const TransitioningBpkCalendarGrid = addCalendarGridTransition(BpkCalendarGrid);

const composeCalendar = (Nav, GridHeader, Grid, CalendarDate) => {
  const BpkCalendar = (props) => {
    const classNames = ['bpk-calendar'];

    const {
      changeMonthLabel,
      maxDate,
      minDate,
      month,
      onChangeMonth,
      id,
      formatMonth,
      daysOfWeek,
      weekStartsOn,
      dateModifiers,
      formatDateFull,
      onDateClick,
      onDateKeyDown,
      preventKeyboardFocus,
      showWeekendSeparator,
      focusedDate,
      markToday,
      markOutsideDays,
      selectedDate,
    } = props;

    if (props.className) { classNames.push(props.className); }

    return (
      <div className={classNames.join(' ')}>
        { Nav && (
          <Nav
            className="bpk-calendar__nav"
            changeMonthLabel={changeMonthLabel}
            formatMonth={formatMonth}
            id={`${id}__bpk_calendar_nav`}
            maxDate={maxDate}
            minDate={minDate}
            month={month}
            onChangeMonth={onChangeMonth}
          />
        )}
        { GridHeader && (
          <GridHeader
            daysOfWeek={daysOfWeek}
            showWeekendSeparator={showWeekendSeparator}
            weekStartsOn={weekStartsOn}
          />
        )}
        <Grid
          className="bpk-calendar__grid"
          DateComponent={CalendarDate}
          dateModifiers={dateModifiers}
          daysOfWeek={daysOfWeek}
          formatDateFull={formatDateFull}
          formatMonth={formatMonth}
          month={month}
          onDateClick={onDateClick}
          onDateKeyDown={onDateKeyDown}
          preventKeyboardFocus={preventKeyboardFocus}
          showWeekendSeparator={showWeekendSeparator}
          weekStartsOn={weekStartsOn}
          maxDate={maxDate}
          minDate={minDate}
          focusedDate={focusedDate}
          markToday={markToday}
          markOutsideDays={markOutsideDays}
          selectedDate={selectedDate}
        />
      </div>
    );
  };

  BpkCalendar.propTypes = {
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

  BpkCalendar.defaultProps = {
    className: null,
    dateModifiers: {},
    focusedDate: null,
    markOutsideDays: true,
    markToday: true,
    onChangeMonth: () => null,
    onDateClick: () => null,
    onDateKeyDown: () => null,
    preventKeyboardFocus: false,
    selectedDate: null,
    showWeekendSeparator: true,
    weekStartsOn: 1,
  };

  return BpkCalendar;
};

export default composeCalendar(
  BpkCalendarNav,
  BpkCalendarGridHeader,
  TransitioningBpkCalendarGrid,
  BpkCalendarDate,
);

export { composeCalendar };
