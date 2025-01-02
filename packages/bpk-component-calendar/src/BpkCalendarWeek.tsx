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

import type { ElementType, ReactElement } from 'react';
import { Component } from 'react';

import { cssModules } from '../../bpk-react-utils';

import { SELECTION_TYPES } from './BpkCalendarDate';
import { CALENDAR_SELECTION_TYPE } from './custom-proptypes';
import {
  isSameDay,
  isSameWeek,
  isSameMonth,
  isToday,
  isWithinRange,
  startOfMonth,
  endOfMonth,
} from './date-utils';

import type {
  DateModifiers,
  SelectionConfiguration,
  SelectionConfigurationSingle,
  SelectionConfigurationRange,
} from './custom-proptypes';


import STYLES from './BpkCalendarWeek.module.scss';

const getClassName = cssModules(STYLES);

const shallowEqualProps = (
  props1: Props,
  props2: Props,
  propList: string[],
) => {
  let i = 0;
  for (; i < propList.length; i += 1) {
    if (props1[propList[i]] !== props2[propList[i]]) {
      return false;
    }
  }
  return true;
};

function or(total: boolean, bool: boolean) {
  return total || bool;
}

/**
 * Determines if the current date is selected
 * @param {Date} date the current date from the calendar
 * @param {Object} selectionConfiguration the current selection configuration
 * @returns {Boolean} true is selected and false if not
 */
function getSelectedDate(
  date: Date,
  selectionConfiguration: SelectionConfiguration,
) {
  let startDate;
  let endDate;
  if (selectionConfiguration.type === CALENDAR_SELECTION_TYPE.single) {
    startDate = selectionConfiguration.date;
  } else {
    startDate = selectionConfiguration.startDate;
    endDate = selectionConfiguration.endDate;
  }
  const sameStartDay = startDate && isSameDay(date, startDate);
  const sameEndDay = endDate && isSameDay(date, endDate);

  if (
    (startDate &&
      endDate &&
      (sameStartDay ||
        sameEndDay ||
        isWithinRange(date, { start: startDate, end: endDate }))) ||
    (startDate && !endDate && sameStartDay) ||
    sameStartDay
  ) {
    return true;
  }

  return false;
}

/**
 * Gets the correct selection type for the current date
 * @param {Date} date the current date of the calendar
 * @param {Object} selectionConfiguration the current selection configuration
 * @param {Function} formatDateFull function to format dates
 * @param {Date} month the current month of the calendar
 * @param {Number} weekStartsOn index of the first day of the week
 * @param {Boolean} ignoreOutsideDate ignore date outside current month
 * @returns {String} selection type to be passed to the date
 */
function getSelectionType(
  date: Date,
  selectionConfiguration: SelectionConfiguration,
  formatDateFull: (d: Date) => Date | string,
  month: Date,
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  ignoreOutsideDate: boolean,
) {
  const { endDate, startDate } =
    selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range
      ? selectionConfiguration
      : { startDate: null, endDate: null };

  const sameStartDay = startDate && isSameDay(date, startDate);
  const sameEndDay = endDate && isSameDay(date, endDate);
  const rangeDates = startDate && endDate;
  const isEmptyCell = !isSameMonth(date, month) && ignoreOutsideDate;

  if (
    selectionConfiguration.type === CALENDAR_SELECTION_TYPE.single &&
    selectionConfiguration.date &&
    (selectionConfiguration.date === formatDateFull(date) ||
      formatDateFull(selectionConfiguration.date) === formatDateFull(date))
  ) {
    return SELECTION_TYPES.single;
  }
  if (selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range) {
    if (
      (startDate && !endDate && sameStartDay) ||
      (rangeDates && sameStartDay && sameEndDay)
    ) {
      return SELECTION_TYPES.single;
    }
    if (
      isEmptyCell &&
      rangeDates &&
      ((isSameWeek(startDate, startOfMonth(startDate), { weekStartsOn }) &&
        isSameWeek(date, startDate, { weekStartsOn })) ||
        (isSameWeek(endDate, endOfMonth(endDate), { weekStartsOn }) &&
          isSameWeek(date, endDate, { weekStartsOn })))
    ) {
      return SELECTION_TYPES.none;
    }
    if (
      isEmptyCell &&
      rangeDates &&
      !isSameMonth(startDate, endDate) &&
      ((isSameWeek(startDate, endOfMonth(startDate), { weekStartsOn }) &&
        isSameWeek(date, startDate, { weekStartsOn })) ||
        (isSameWeek(endDate, startOfMonth(endDate), { weekStartsOn }) &&
          isSameWeek(date, endDate, { weekStartsOn })))
    ) {
      return SELECTION_TYPES.middle;
    }
    if (
      rangeDates &&
      isWithinRange(date, { start: startDate, end: endDate }) &&
      !sameStartDay &&
      !sameEndDay
    ) {
      return SELECTION_TYPES.middle;
    }
    if (startDate && formatDateFull(startDate) === formatDateFull(date)) {
      return SELECTION_TYPES.start;
    }
    if (endDate && formatDateFull(endDate) === formatDateFull(date)) {
      return SELECTION_TYPES.end;
    }
  }

  return SELECTION_TYPES.none;
}

/**
 * Handles changing selected date when in single mode
 * @param {Object} props current props
 * @param {Object} nextProps next props as the component is updating
 * @returns {Boolean} based on if the date has changed
 */
const singleDateHandler = (props: Props, nextProps: Props) => {
  const currentSelectConfig =
    props.selectionConfiguration as SelectionConfigurationSingle;
  const nextSelectConfig =
    nextProps.selectionConfiguration as SelectionConfigurationSingle;

  if (
    ((nextSelectConfig.date &&
      isSameWeek(nextSelectConfig.date, nextProps.dates[0], {
        weekStartsOn: nextProps.weekStartsOn,
      })) ||
      (currentSelectConfig.date &&
        isSameWeek(currentSelectConfig.date, props.dates[0], {
          weekStartsOn: props.weekStartsOn,
        }))) &&
    currentSelectConfig.date !== nextSelectConfig.date
  ) {
    return true;
  }
  return false;
};

/**
 * Handles changing selected date when in range mode
 * @param {Object} props current props
 * @param {Object} nextProps next props as the component is updating
 * @returns {Boolean} based on if the date has changed
 */
const rangeDateHandler = (props: Props, nextProps: Props) => {
  const { endDate, startDate } =
    props.selectionConfiguration as SelectionConfigurationRange;
  const { endDate: nextEndDate, startDate: nextStartDate } =
    nextProps.selectionConfiguration as SelectionConfigurationRange;

  const startDateChanged =
    startDate && nextStartDate && !isSameDay(startDate, nextStartDate);
  const endDateChanged =
    endDate && nextEndDate && !isSameDay(endDate, nextEndDate);

  if (startDateChanged || endDateChanged) {
    return true;
  }

  return false;
};

export type Props = DefaultProps & {
  DateComponent: ElementType;
  dateModifiers: DateModifiers;
  dates: Date[];
  formatDateFull: (date: Date) => Date | string;
  preventKeyboardFocus: boolean;
  markToday: boolean;
  markOutsideDays: boolean;
  isKeyboardFocusable: boolean;
  month: Date;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

type DefaultProps = {
  dateProps?: {};
  focusedDate?: Date | number | null;
  ignoreOutsideDate?: boolean;
  maxDate?: Date | null;
  minDate?: Date | null;
  onDateClick?: () => void;
  onDateKeyDown?: () => void;
  cellClassName?: string | null;
  selectionConfiguration?: SelectionConfiguration;
};

/*
  BpkCalendarWeek - table row containing a week full of DateContainer components
*/
class BpkCalendarWeek extends Component<Props> {
  static defaultProps: DefaultProps = {
    dateProps: {},
    focusedDate: null,
    ignoreOutsideDate: false,
    maxDate: null,
    minDate: null,
    onDateClick: () => {},
    onDateKeyDown: () => {},
    selectionConfiguration: {
      type: CALENDAR_SELECTION_TYPE.single,
      date: null,
    },
    cellClassName: null,
  };

  shouldComponentUpdate(nextProps: Props) {
    const shallowProps = [
      'DateComponent',
      'dateModifiers',
      'formatDateFull',
      'isKeyboardFocusable',
      'markOutsideDays',
      'markToday',
      'onDateClick',
      'onDateKeyDown',
      'preventKeyboardFocus',
      'weekStartsOn',
      'dates',
      'cellClassName',
    ];

    // If any of the props have changed, component should update.
    if (!shallowEqualProps(this.props, nextProps, shallowProps)) {
      return true;
    }

    // If focusedDate is changing, and it'll be included as part
    // of either the week we're rendering now or the next week
    // we'll render, component should update.
    if (
      ((nextProps.focusedDate &&
        isSameWeek(nextProps.focusedDate, nextProps.dates[0], {
          weekStartsOn: nextProps.weekStartsOn,
        })) ||
        (this.props.focusedDate &&
          isSameWeek(this.props.focusedDate, this.props.dates[0], {
            weekStartsOn: this.props.weekStartsOn,
          }))) &&
      this.props.focusedDate !== nextProps.focusedDate
    ) {
      return true;
    }

    // If selected date is changing, and it'll be included as part
    // of either the week we're rendering now or the next week we'll
    // render, component should update.
    if (
      this.props.selectionConfiguration?.type ===
        CALENDAR_SELECTION_TYPE.single &&
      this.props.selectionConfiguration.date
    ) {
      return singleDateHandler(this.props, nextProps);
    }
    if (
      this.props.selectionConfiguration?.type === CALENDAR_SELECTION_TYPE.range
    ) {
      return rangeDateHandler(this.props, nextProps);
    }

    // If min date is changing, component should update.
    if (nextProps.minDate) {
      if (nextProps.minDate !== this.props.minDate) {
        return true;
      }
      if (!isSameDay(nextProps.minDate, this.props.minDate)) {
        return true;
      }
    }

    // If max date is changing, component should update.
    if (nextProps.maxDate) {
      if (nextProps.maxDate !== this.props.maxDate) {
        return true;
      }
      if (!isSameDay(nextProps.maxDate, this.props.maxDate)) {
        return true;
      }
    }

    return false;
  }

  render() {
    const {
      DateComponent,
      cellClassName,
      dateModifiers,
      dateProps,
      focusedDate,
      formatDateFull,
      ignoreOutsideDate,
      isKeyboardFocusable,
      markOutsideDays,
      markToday,
      maxDate,
      minDate,
      month,
      onDateClick,
      onDateKeyDown,
      preventKeyboardFocus,
      selectionConfiguration,
      weekStartsOn,
    } = this.props;

    if (ignoreOutsideDate) {
      const daysOutside = this.props.dates.map((date) =>
        isSameMonth(date, month),
      );

      const shouldRender = daysOutside.reduce(or);

      if (!shouldRender) {
        return null;
      }
    }

    return (
      <div className={getClassName('bpk-calendar-week')} role="row">
        {this.props.dates.map((date) => {
          const isBlocked =
            minDate && maxDate
              ? !isWithinRange(date, { start: minDate, end: maxDate })
              : false;

          const dateSelectionType = getSelectionType(
            date,
            selectionConfiguration!,
            formatDateFull,
            month,
            weekStartsOn,
            ignoreOutsideDate!,
          );

          return (
            <DateContainer
              className={cellClassName}
              isEmptyCell={!isSameMonth(date, month) && ignoreOutsideDate!}
              isBlocked={isBlocked}
              key={date.getDate()}
              selectionType={dateSelectionType}
            >
              <DateComponent
                date={date}
                modifiers={dateModifiers}
                aria-label={formatDateFull(date)}
                onClick={onDateClick}
                onDateKeyDown={onDateKeyDown}
                preventKeyboardFocus={preventKeyboardFocus}
                isKeyboardFocusable={isKeyboardFocusable}
                isFocused={focusedDate && isSameDay(date, focusedDate)}
                isSelected={getSelectedDate(date, selectionConfiguration!)}
                isBlocked={isBlocked}
                isOutside={markOutsideDays && !isSameMonth(date, month)}
                isToday={markToday && isToday(date)}
                selectionType={dateSelectionType}
                {...dateProps}
              />
            </DateContainer>
          );
        })}
      </div>
    );
  }
}

type DateContainerProps = {
  children: ReactElement;
  className?: string | null;
  isBlocked: boolean;
  isEmptyCell: boolean;
  selectionType: string;
};
/*
  DateContainer - one for each date in the grid; wraps the actual BpkCalendarDate (or custom) component
*/
const DateContainer = ({
  children,
  className = null,
  isEmptyCell,
  selectionType,
}: DateContainerProps) => {
  const classNames = getClassName(
    'bpk-calendar-week__date',
    `bpk-calendar-week__date--${selectionType}`,
    className,
  );

  return (
    <div aria-hidden={isEmptyCell} className={classNames} role="gridcell">
      {children}
    </div>
  );
};

export default BpkCalendarWeek;
