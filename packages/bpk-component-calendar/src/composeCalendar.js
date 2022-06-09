/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
import { cssModules, deprecated } from 'bpk-react-utils';

import CustomPropTypes, { CALENDAR_SELECTION_TYPE } from './custom-proptypes';
import STYLES from './BpkCalendar.module.scss';

const getClassName = cssModules(STYLES);

const composeCalendar = (Nav, GridHeader, Grid, CalendarDate) => {
  const BpkCalendar = (props) => {
    const classNames = [getClassName('bpk-calendar')];

    const {
      changeMonthLabel,
      className,
      dateModifiers,
      dateProps,
      daysOfWeek,
      fixedWidth,
      focusedDate,
      formatDateFull,
      formatMonth,
      gridClassName,
      gridProps,
      headerProps,
      id,
      markOutsideDays,
      markToday,
      maxDate,
      minDate,
      month,
      navProps,
      nextMonthLabel,
      onDateClick,
      onDateKeyDown,
      onMonthChange,
      preventKeyboardFocus,
      previousMonthLabel,
      selectionConfiguration,
      weekDayKey,
      weekStartsOn,
    } = props;

    if (className) {
      classNames.push(className);
    }
    if (fixedWidth) {
      classNames.push(getClassName('bpk-calendar--fixed'));
    }

    const headerClasses = [];
    // If the Nav is present add `bpk-calendar__header` which
    // adds spacing between the nav and header.
    if (Nav) {
      headerClasses.push(getClassName('bpk-calendar__header'));
    }

    const gridClasses = [];
    // If the GridHeader is not present add `bpk-calendar__grid` which
    // adds spacing between the nav and grid.
    if (!GridHeader && Nav) {
      gridClasses.push(getClassName('bpk-calendar__grid'));
    }
    if (gridClassName) {
      gridClasses.push(gridClassName);
    }

    return (
      <div className={classNames.join(' ')}>
        {Nav && (
          <Nav
            changeMonthLabel={changeMonthLabel}
            formatMonth={formatMonth}
            id={`${id}__bpk_calendar_nav`}
            maxDate={maxDate}
            minDate={minDate}
            month={month}
            nextMonthLabel={nextMonthLabel}
            onMonthChange={onMonthChange}
            previousMonthLabel={previousMonthLabel}
            {...navProps}
          />
        )}
        {GridHeader && (
          <GridHeader
            daysOfWeek={daysOfWeek}
            weekStartsOn={weekStartsOn}
            weekDayKey={weekDayKey}
            className={headerClasses.join(' ')}
            {...headerProps}
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
          onDateKeyDown={onDateKeyDown}
          preventKeyboardFocus={preventKeyboardFocus}
          weekStartsOn={weekStartsOn}
          maxDate={maxDate}
          minDate={minDate}
          focusedDate={focusedDate}
          markToday={markToday}
          markOutsideDays={markOutsideDays}
          className={gridClasses.join(' ')}
          dateProps={dateProps}
          selectionConfiguration={selectionConfiguration}
          {...gridProps}
        />
      </div>
    );
  };

  BpkCalendar.propTypes = {
    // Required
    changeMonthLabel: Nav ? PropTypes.string.isRequired : PropTypes.string,
    daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
    formatDateFull: PropTypes.func.isRequired,
    formatMonth: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    maxDate: PropTypes.instanceOf(Date).isRequired,
    minDate: PropTypes.instanceOf(Date).isRequired,
    month: PropTypes.instanceOf(Date).isRequired,
    nextMonthLabel: Nav ? PropTypes.string.isRequired : PropTypes.string,
    previousMonthLabel: Nav ? PropTypes.string.isRequired : PropTypes.string,
    weekStartsOn: PropTypes.number.isRequired,
    // Optional
    className: PropTypes.string,
    dateModifiers: CustomPropTypes.DateModifiers,
    fixedWidth: PropTypes.bool,
    focusedDate: PropTypes.instanceOf(Date),
    markOutsideDays: PropTypes.bool,
    markToday: PropTypes.bool,
    onMonthChange: PropTypes.func,
    onDateClick: PropTypes.func,
    onDateKeyDown: PropTypes.func,
    preventKeyboardFocus: PropTypes.bool,
    selectionConfiguration: CustomPropTypes.SelectionConfiguration,
    selectedDate: deprecated(
      PropTypes.instanceOf(Date),
      'Use selectionConfiguration to set selectedDate',
    ),
    // eslint-disable-next-line react/require-default-props
    showWeekendSeparator: deprecated(
      PropTypes.bool,
      'The showWeekendSeparator prop in composeCalendar is now deprecated as no longer part of the calendar, so is no longer required',
    ),
    gridClassName: PropTypes.string,
    weekDayKey: PropTypes.string,
    /* eslint-disable react/forbid-prop-types */
    navProps: PropTypes.object,
    headerProps: PropTypes.object,
    gridProps: PropTypes.object,
    dateProps: PropTypes.object,
    /* eslint-enable */
  };

  BpkCalendar.defaultProps = {
    changeMonthLabel: null,
    className: null,
    dateModifiers: {},
    fixedWidth: true,
    focusedDate: null,
    markOutsideDays: true,
    markToday: true,
    nextMonthLabel: null,
    onMonthChange: () => null,
    onDateClick: () => null,
    onDateKeyDown: () => null,
    preventKeyboardFocus: false,
    previousMonthLabel: null,
    selectionConfiguration: {
      type: CALENDAR_SELECTION_TYPE.single,
      date: null,
    },
    selectedDate: null,
    gridClassName: null,
    weekDayKey: 'nameAbbr',
    navProps: null,
    headerProps: null,
    gridProps: null,
    dateProps: null,
  };

  return BpkCalendar;
};

export default composeCalendar;
