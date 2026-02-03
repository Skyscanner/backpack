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
import { Component } from 'react';

import { isRTL } from '../../bpk-react-utils';

import BpkCalendarDate from './BpkCalendarDate';
import { BpkCalendarGridWithTransition } from './BpkCalendarGrid';
import BpkCalendarGridHeader from './BpkCalendarGridHeader';
import BpkCalendarNav from './BpkCalendarNav';
import composeCalendar from './composeCalendar';
import { CALENDAR_SELECTION_TYPE } from './custom-proptypes';
import {
  addDays,
  addMonths,
  dateToBoundaries,
  isAfter,
  isSameMonth,
  isSameDay,
  lastDayOfMonth,
  setMonthYear,
  startOfDay,
  startOfMonth,
} from './date-utils';

import type { SelectionConfiguration } from './custom-proptypes';

export type Props = {
  /**
   * If set to true (default), it sets a fixed width on the calendar container. This is necessary to support transitions and to create the right size for the Datepicker component.
   * If set to false, the calendar is of fluid width and will take up the space of its parent container.
   */
  fixedWidth?: boolean;
  maxDate?: Date;
  minDate?: Date;
  onDateSelect?: ((date: Date, newDate?: Date) => void) | null;
  onMonthChange?:
    | ((
        event: UIEvent,
        { month, source }: { month: Date; source: string },
      ) => void)
    | null;
  /**
   * An object to indicate which configuration of the calendar is being used. Choices are `single` date selection or `range` date selection.
   */
  selectionConfiguration?: SelectionConfiguration;
  /**
   * Sets the date that is focused initially, this prop has no effect if `selectionConfiguration` is specified in which case the date specified in this prop is focused. If no selected date is set and `initiallyFocusedDate` is not set the focused date is the `minDate`(defaults to today if it has not been explicitly set).
   */
  initiallyFocusedDate?: Date | null;
  markToday?: boolean;
  markOutsideDays?: boolean;
  /**
   * Sets the height of month rows in 'rem' units. If not specified, the default value of `2.75rem` will be used.
   */
  customRowHeight?: number;
};

type InjectedProps = {
  onDateClick: ((date: Date) => void) | null;
  onDateKeyDown: ((event: KeyboardEvent) => void) | null;
  month: Date;
  minDate: Date;
  maxDate: Date;
};

type CalendarProps<P> = Omit<P & Props, keyof InjectedProps> & {
  [rest: string]: any;
};

type State = {
  preventKeyboardFocus: boolean;
  focusedDate: Date;
};

/**
 * Updates the current focused date
 * @param {Object} prevProps previous input properties
 * @param {Object} currentProps current input properties when component changes
 * @returns {Boolean} if the selected date has changed
 */
const focusedDateHasChanged = <T extends {}>(
  prevProps: CalendarProps<T>,
  currentProps: CalendarProps<T>,
) => {
  const prevSelectConfig = prevProps.selectionConfiguration!;
  const currentSelectConfig = currentProps.selectionConfiguration!;

  const rawCurrentSelectedDate =
    currentSelectConfig.type === CALENDAR_SELECTION_TYPE.single
      ? currentSelectConfig.date
      : currentSelectConfig.startDate;
  const rawPrevSelectedDate =
    prevSelectConfig.type === CALENDAR_SELECTION_TYPE.single
      ? prevSelectConfig.date
      : prevSelectConfig.startDate;

  if (!rawPrevSelectedDate && !rawCurrentSelectedDate) {
    return false;
  }

  if (
    (rawPrevSelectedDate && !rawCurrentSelectedDate) ||
    (!rawPrevSelectedDate && rawCurrentSelectedDate)
  ) {
    return true;
  }

  // @ts-expect-error TS reporting incorrectly as we are already checking above that the dates are not null
  return !isSameDay(rawCurrentSelectedDate, rawPrevSelectedDate);
};

/**
 * Determines the focused date on the calendar
 * @param {Date} rawSelectedDate the raw date provided to the calendar to be selected
 * @param {Date} initiallyFocusedDate inital date that was selected
 * @param {Date} minDate min available date to be selectable in the calendar
 * @param {Date} maxDate max available date to be selectable in the calendar
 * @returns {Date} which date to be focused on the calendar when it loads
 */
const determineFocusedDate = (
  rawSelectedDate: Date | null,
  initiallyFocusedDate: Date | null,
  minDate: Date,
  maxDate: Date,
) => {
  if (rawSelectedDate) {
    return dateToBoundaries(rawSelectedDate, minDate, maxDate);
  }

  if (initiallyFocusedDate) {
    return dateToBoundaries(initiallyFocusedDate, minDate, maxDate);
  }

  return minDate;
};

/**
 * Function that based on the configuration will return a single date or start and end date.
 * @param {Object} selectionConfig - The configuration of calendar to be used
 * @returns {Array} An array or single of multiple dates
 */
const getRawSelectedDate = (selectionConfig: SelectionConfiguration) => {
  let rawDate = [];

  switch (selectionConfig.type) {
    case CALENDAR_SELECTION_TYPE.single:
      rawDate = [selectionConfig.date];
      break;
    case CALENDAR_SELECTION_TYPE.range:
      rawDate = [selectionConfig.startDate, selectionConfig.endDate];
      break;
    default:
      rawDate = [null];
      break;
  }

  return rawDate;
};

const withCalendarState = <P extends object>(Calendar: ComponentType<P>) => {
  class BpkCalendarContainer extends Component<CalendarProps<P>, State> {
    static defaultProps = {
      fixedWidth: true,
      maxDate: addMonths(new Date(), 12),
      minDate: new Date(),
      onDateSelect: null,
      onMonthChange: null,
      selectionConfiguration: {
        type: CALENDAR_SELECTION_TYPE.single,
        date: null,
      },
      initiallyFocusedDate: null,
      markToday: true,
      markOutsideDays: true,
    };

    constructor(props: CalendarProps<P>) {
      super(props);

      const minDate = startOfDay(this.props.minDate!);
      const maxDate = startOfDay(this.props.maxDate!);

      const rawSelectedDate = getRawSelectedDate(
        this.props.selectionConfiguration!,
      );

      const { initiallyFocusedDate } = this.props;

      this.state = {
        preventKeyboardFocus: true,
        focusedDate: determineFocusedDate(
          rawSelectedDate[0],
          initiallyFocusedDate!,
          minDate,
          maxDate,
        ),
      };
    }

    componentDidUpdate(prevProps: CalendarProps<P>) {
      const rawNextSelectedDate = getRawSelectedDate(
        this.props.selectionConfiguration!,
      );

      const minDate = startOfDay(this.props.minDate!);
      const maxDate = startOfDay(this.props.maxDate!);

      if (
        focusedDateHasChanged(
          prevProps as CalendarProps<P>,
          this.props as CalendarProps<P>,
        )
      ) {
        this.setState({
          focusedDate: dateToBoundaries(
            rawNextSelectedDate[0],
            minDate,
            maxDate,
          ),
        });
      }
    }

    handleDateFocus = (
      event: UIEvent,
      { date, source }: { date: Date; source: string },
    ) => {
      const { onMonthChange } = this.props;
      const focusedDate = dateToBoundaries(
        date,
        startOfDay(this.props.minDate!),
        startOfDay(this.props.maxDate!),
      );
      const didMonthChange = !isSameMonth(this.state.focusedDate, focusedDate);

      this.setState(
        {
          preventKeyboardFocus: false,
          focusedDate,
        },
        () => {
          if (onMonthChange && didMonthChange) {
            onMonthChange(event, { month: startOfMonth(focusedDate), source });
          }
        },
      );
    };

    handleDateSelect = (date: Date) => {
      const { onDateSelect, selectionConfiguration } = this.props;
      const keyboardFocusState = { preventKeyboardFocus: false };

      if (onDateSelect) {
        const newDate = dateToBoundaries(
          date,
          startOfDay(this.props.minDate!),
          startOfDay(this.props.maxDate!),
        );

        if (
          selectionConfiguration &&
          selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range &&
          selectionConfiguration.startDate &&
          !selectionConfiguration.endDate &&
          (isAfter(newDate, selectionConfiguration.startDate) ||
            isSameDay(newDate, selectionConfiguration.startDate))
        ) {
          onDateSelect(selectionConfiguration.startDate, newDate);
        } else {
          onDateSelect(newDate);
        }
      } else {
        this.setState(keyboardFocusState);
      }
    };

    handleMonthChange = (
      event: UIEvent,
      { month, source }: { month: Date; source: string },
    ) => {
      this.handleDateFocus(event, {
        date: setMonthYear(
          this.state.focusedDate,
          month.getMonth(),
          month.getFullYear(),
        ),
        source,
      });
    };

    handleDateKeyDown = (event: KeyboardEvent) => {
      const reverse = isRTL() ? -1 : 1;
      const { focusedDate } = this.state;
      const source = 'GRID';
      let preventDefault = true;

      switch (event.key) {
        case 'ArrowRight':
          this.handleDateFocus(event, {
            date: addDays(focusedDate, reverse * 1),
            source,
          });
          break;
        case 'ArrowLeft':
          this.handleDateFocus(event, {
            date: addDays(focusedDate, reverse * -1),
            source,
          });
          break;
        case 'ArrowUp':
          this.handleDateFocus(event, {
            date: addDays(focusedDate, -7),
            source,
          });
          break;
        case 'ArrowDown':
          this.handleDateFocus(event, {
            date: addDays(focusedDate, 7),
            source,
          });
          break;
        case 'PageUp':
          this.handleDateFocus(event, {
            date: addMonths(focusedDate, -1),
            source,
          });
          break;
        case 'PageDown':
          this.handleDateFocus(event, {
            date: addMonths(focusedDate, 1),
            source,
          });
          break;
        case 'Home':
          this.handleDateFocus(event, {
            date: startOfMonth(focusedDate),
            source,
          });
          break;
        case 'End':
          this.handleDateFocus(event, {
            date: lastDayOfMonth(focusedDate),
            source,
          });
          break;
        default:
          preventDefault = false;
          break;
      }

      if (preventDefault) {
        event.preventDefault();
      }
    };

    render() {
      const {
        maxDate,
        minDate,
        onDateSelect,
        onMonthChange,
        selectionConfiguration,
        ...calendarProps
      } = this.props;

      const sanitisedMinDate = startOfDay(minDate!);
      const sanitisedMaxDate = startOfDay(maxDate!);

      const sanitisedFocusedDate = dateToBoundaries(
        this.state.focusedDate,
        sanitisedMinDate,
        sanitisedMaxDate,
      );
      const month = startOfMonth(sanitisedFocusedDate);

      return (
        <Calendar
          onMonthChange={this.handleMonthChange}
          onDateClick={this.handleDateSelect}
          month={month}
          onDateKeyDown={this.handleDateKeyDown}
          preventKeyboardFocus={this.state.preventKeyboardFocus}
          focusedDate={sanitisedFocusedDate}
          {...(calendarProps as P)}
          minDate={sanitisedMinDate}
          maxDate={sanitisedMaxDate}
          selectionConfiguration={selectionConfiguration}
        />
      );
    }
  }

  return BpkCalendarContainer;
};

export default withCalendarState(
  composeCalendar(
    BpkCalendarNav,
    BpkCalendarGridHeader,
    BpkCalendarGridWithTransition,
    BpkCalendarDate,
  ),
);
export { withCalendarState };
