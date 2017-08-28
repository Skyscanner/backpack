/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import CustomPropTypes from './custom-proptypes';
import STYLES from './bpk-calendar.scss';

const getClassName = cssModules(STYLES);

const composeCalendar = (Nav, GridHeader, Grid, CalendarDate) => {
  const BpkCalendar = (props) => {
    const classNames = [getClassName('bpk-calendar')];

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
      onDateMouseDown,
      onDateKeyDown,
      onMonthChange,
      preventKeyboardFocus,
      selectedDate,
      showWeekendSeparator,
      weekStartsOn,
      fixedWidth,
    } = props;

    if (className) { classNames.push(className); }
    if (fixedWidth) { classNames.push(getClassName('bpk-calendar--fixed')); }

    const headerClasses = [];
    // If the Nav is present add `bpk-calendar__header` which
    // adds spacing between the nav and header.
    if (Nav) { headerClasses.push(getClassName('bpk-calendar__header')); }

    const gridClasses = [];
    // If the GridHeader is not present add `bpk-calendar__grid` which
    // adds spacing between the nav and grid.
    if (!GridHeader && Nav) { gridClasses.push(getClassName('bpk-calendar__grid')); }

    return (
      <div className={classNames.join(' ')}>
        { Nav && (
          <Nav
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
            className={headerClasses.join(' ')}
          />
        )}
        <Grid
          DateComponent={CalendarDate}
          dateModifiers={dateModifiers}
          daysOfWeek={daysOfWeek}
          formatDateFull={formatDateFull}
          formatMonth={formatMonth}
          month={month}
          onDateClick={onDateClick}
          onDateMouseDown={onDateMouseDown}
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
          className={gridClasses.join(' ')}
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
    fixedWidth: PropTypes.bool,
    focusedDate: PropTypes.instanceOf(Date),
    markOutsideDays: PropTypes.bool,
    markToday: PropTypes.bool,
    onMonthChange: PropTypes.func,
    onDateClick: PropTypes.func,
    onDateMouseDown: PropTypes.func,
    onDateKeyDown: PropTypes.func,
    preventKeyboardFocus: PropTypes.bool,
    selectedDate: PropTypes.instanceOf(Date),
    showWeekendSeparator: PropTypes.bool,
    weekStartsOn: PropTypes.number,
  };

  BpkCalendar.defaultProps = {
    className: null,
    dateModifiers: {},
    fixedWidth: true,
    focusedDate: null,
    markOutsideDays: true,
    markToday: true,
    onMonthChange: () => null,
    onDateClick: () => null,
    onDateMouseDown: () => null,
    onDateKeyDown: () => null,
    preventKeyboardFocus: false,
    selectedDate: null,
    showWeekendSeparator: true,
    weekStartsOn: 1,
  };

  return BpkCalendar;
};

export default composeCalendar;
