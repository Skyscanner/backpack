/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
import STYLES from './bpk-calendar-scroll.scss';

const getClassName = cssModules(STYLES);

const composeCalendar = (GridHeader, ScrollingGrid, CalendarDate) => {
  const BpkCalendar = props => {
    const classNames = [getClassName('bpk-calendar')];

    const {
      className,
      dateModifiers,
      daysOfWeek,
      focusedDate,
      formatDateFull,
      formatMonth,
      markOutsideDays,
      markToday,
      maxDate,
      minDate,
      months,
      onDateClick,
      onDateKeyDown,
      preventKeyboardFocus,
      selectedDate,
      showWeekendSeparator,
      weekStartsOn,
      fixedWidth,
      fixedHeight,
    } = props;

    if (className) {
      classNames.push(className);
    }
    if (fixedWidth) {
      classNames.push(getClassName('bpk-calendar-scroll--fixed-width'));
    }
    if (!fixedHeight) {
      classNames.push(getClassName('bpk-calendar-scroll--flexible-height'));
    }

    const headerClasses = [];
    const gridClasses = [];

    return (
      <div className={classNames.join(' ')}>
        {GridHeader && (
          <GridHeader
            daysOfWeek={daysOfWeek}
            showWeekendSeparator={showWeekendSeparator}
            weekStartsOn={weekStartsOn}
            className={headerClasses.join(' ')}
          />
        )}
        <ScrollingGrid
          DateComponent={CalendarDate}
          dateModifiers={dateModifiers}
          daysOfWeek={daysOfWeek}
          formatDateFull={formatDateFull}
          formatMonth={formatMonth}
          months={months}
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
          className={gridClasses.join(' ')}
        />
      </div>
    );
  };

  BpkCalendar.propTypes = {
    // Required
    daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
    formatDateFull: PropTypes.func.isRequired,
    formatMonth: PropTypes.func.isRequired,
    maxDate: PropTypes.instanceOf(Date).isRequired,
    minDate: PropTypes.instanceOf(Date).isRequired,
    months: PropTypes.arrayOf(Date).isRequired,
    // Optional
    className: PropTypes.string,
    dateModifiers: CustomPropTypes.DateModifiers,
    fixedWidth: PropTypes.bool,
    fixedHeight: PropTypes.bool,
    focusedDate: PropTypes.instanceOf(Date),
    markOutsideDays: PropTypes.bool,
    markToday: PropTypes.bool,
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
    fixedWidth: true,
    fixedHeight: true,
    focusedDate: null,
    markOutsideDays: true,
    markToday: true,
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
