import React, { PropTypes } from 'react';

import CustomPropTypes from './custom-proptypes';
import './bpk-calendar.scss';

const composeCalendar = (Nav, GridHeader, Grid, CalendarDate) => {
  const BpkCalendar = (props) => {
    const classNames = ['bpk-calendar'];

    const {
      changeMonthLabel,
      className,
      dateModifiers,
      daysOfWeek,
      focusedDate,
      formatDateFull,
      formatMonth,
      id,
      markOutsideDays,
      markToday,
      maxDate,
      minDate,
      month,
      onDateClick,
      onDateKeyDown,
      onMonthChange,
      preventKeyboardFocus,
      selectedDate,
      showWeekendSeparator,
      weekStartsOn,
    } = props;

    if (className) { classNames.push(className); }

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
            onMonthChange={onMonthChange}
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
    // Optional
    className: PropTypes.string,
    dateModifiers: CustomPropTypes.DateModifiers,
    focusedDate: PropTypes.instanceOf(Date),
    markOutsideDays: PropTypes.bool,
    markToday: PropTypes.bool,
    onMonthChange: PropTypes.func,
    onDateClick: PropTypes.func,
    onDateKeyDown: PropTypes.func,
    preventKeyboardFocus: PropTypes.bool,
    selectedDate: PropTypes.instanceOf(Date),
    showWeekendSeparator: PropTypes.bool,
    weekStartsOn: PropTypes.number,
  };

  BpkCalendar.defaultProps = {
    className: null,
    dateModifiers: {},
    focusedDate: null,
    markOutsideDays: true,
    markToday: true,
    onMonthChange: () => null,
    onDateClick: () => null,
    onDateKeyDown: () => null,
    preventKeyboardFocus: false,
    selectedDate: null,
    showWeekendSeparator: true,
    weekStartsOn: 1,
  };

  return BpkCalendar;
};

export default composeCalendar;
