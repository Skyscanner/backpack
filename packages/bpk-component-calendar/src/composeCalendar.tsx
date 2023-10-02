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

import type { ComponentType } from 'react';

import { cssModules } from '../../bpk-react-utils';

import { CALENDAR_SELECTION_TYPE } from './custom-proptypes';
import type {
  DaysOfWeek,
  SelectionConfiguration,
  DateModifiers,
} from './custom-proptypes';
import STYLES from './BpkCalendar.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  changeMonthLabel?: string | null;
  daysOfWeek: DaysOfWeek;
  formatDateFull: (date: Date) => Date | string;
  formatMonth: (date: Date) => Date | string;
  id: string;
  maxDate: Date;
  minDate: Date;
  month: Date;
  nextMonthLabel?: string | null;
  previousMonthLabel?: string | null;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  className?: string | null;
  dateModifiers?: DateModifiers;
  fixedWidth?: boolean;
  focusedDate?: Date | null;
  markOutsideDays?: boolean;
  markToday?: boolean;
  onMonthChange?:
    | ((
        event: UIEvent,
        { month, source }: { month: Date; source: string },
      ) => void)
    | null;
  onDateClick?: ((date: Date) => void) | null;
  onDateKeyDown?: ((event: KeyboardEvent) => void) | null;
  preventKeyboardFocus?: boolean;
  selectionConfiguration?: SelectionConfiguration;
  gridClassName?: string | null;
  weekDayKey?: string;
  navProps?: {} | null;
  headerProps?: {} | null;
  gridProps?: {} | null;
  dateProps?: {} | null;
};

const composeCalendar = (
  Nav: ComponentType<any> | string | null,
  GridHeader: ComponentType<any> | string | null,
  Grid: ComponentType<any> | string,
  CalendarDate: ComponentType<any> | string | null,
) => {
  const BpkCalendar = ({
    changeMonthLabel = null,
    className = null,
    dateModifiers = {},
    dateProps = {},
    daysOfWeek,
    fixedWidth = true,
    focusedDate = null,
    formatDateFull,
    formatMonth,
    gridClassName = null,
    gridProps = {},
    headerProps = {},
    id,
    markOutsideDays = true,
    markToday = true,
    maxDate,
    minDate,
    month,
    navProps = {},
    nextMonthLabel = null,
    onDateClick = null,
    onDateKeyDown = null,
    onMonthChange = null,
    preventKeyboardFocus = false,
    previousMonthLabel = null,
    selectionConfiguration = {
      type: CALENDAR_SELECTION_TYPE.single,
      date: null,
    },
    weekDayKey = 'nameAbbr',
    weekStartsOn,
  }: Props) => {
    const classNames = [getClassName('bpk-calendar')];

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

  return BpkCalendar;
};

export default composeCalendar;
