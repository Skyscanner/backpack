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
import { memoize } from './utils';

import type {
  DaysOfWeek,
  SelectionConfiguration,
  DateModifiers,
} from './custom-proptypes';

import STYLES from './BpkCalendar.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  /**
   * **Required** if Nav !== null
   */
  changeMonthLabel?: string | null;
  /**
   * An array of objects describing the days of the week
   */
  daysOfWeek: DaysOfWeek;
  /**
   * A function to format a full, human-readable date, for example: "Monday, 8th January 2018".
   */
  formatDateFull: (date: Date) => Date | string;
  /**
   * A function to format a human-readable month, for example: "January 2018":
   * If you just need to quickly prototype, use the following from [`date-fns`](https://date-fns.org/docs/format#usage)
   */
  formatMonth: (date: Date) => Date | string;
  id: string;
  maxDate: Date;
  minDate: Date;
  month: Date;
  /**
   * **Required** if Nav !== null
   */
  nextMonthLabel?: string | null;
  /**
   * **Required** if Nav !== null
   */
  previousMonthLabel?: string | null;
  /**
   * First day of the week. 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
   */
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  className?: string | null;
  dateModifiers?: DateModifiers;
  /**
   * If set to true (default), it sets a fixed width on the calendar container. This is necessary to support transitions and to create the right size for the Datepicker component.
   * If set to false, the calendar is of fluid width and will take up the space of its parent container.
   */
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
  /**
   * Sets the height of month rows in 'rem' units. If not specified, the default value of `2.75rem` will be used.
   */
  customRowHeight?: number;
  /**
   * Key to be used to pick the desired weekDay format from the `daysOfWeek` object, for example: `nameAbbr` or `nameNarrow`.
   */
  weekDayKey?: string;
  /**
   * This is useful if your custom implementation of Nav component requires additional properties. They will be passed, unmodified.
   */
  navProps?: {} | null;
  /**
   * This is useful if your custom implementation of Header component requires additional properties. They will be passed, unmodified.
   */
  headerProps?: {} | null;
  /**
   * This is useful if your custom implementation of Grid component requires additional properties. They will be passed, unmodified.
   */
  gridProps?: {} | null;
  /**
   * This is useful if your custom implementation of Date component requires additional properties. They will be passed, unmodified.
   */
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
    customRowHeight,
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
            formatMonth={memoize(formatMonth)}
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
            // TODO: className to be removed
            // eslint-disable-next-line @skyscanner/rules/forbid-component-props
            className={headerClasses.join(' ')}
            {...headerProps}
          />
        )}
        <Grid
          DateComponent={CalendarDate}
          dateModifiers={dateModifiers}
          daysOfWeek={daysOfWeek}
          formatDateFull={memoize(formatDateFull)}
          formatMonth={memoize(formatMonth)}
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
          // TODO: className to be removed
          // eslint-disable-next-line @skyscanner/rules/forbid-component-props
          className={gridClasses.join(' ')}
          dateProps={dateProps}
          selectionConfiguration={selectionConfiguration}
          customRowHeight={customRowHeight}
          {...gridProps}
        />
      </div>
    );
  };

  return BpkCalendar;
};

export default composeCalendar;
