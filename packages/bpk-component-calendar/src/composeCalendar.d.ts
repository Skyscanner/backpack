import type { ComponentType } from 'react';
import type { DaysOfWeek, SelectionConfiguration, DateModifiers } from './custom-proptypes';
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
    onMonthChange?: ((event: UIEvent, { month, source }: {
        month: Date;
        source: string;
    }) => void) | null;
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
declare const composeCalendar: (Nav: ComponentType<any> | string | null, GridHeader: ComponentType<any> | string | null, Grid: ComponentType<any> | string, CalendarDate: ComponentType<any> | string | null) => ({ changeMonthLabel, className, customRowHeight, dateModifiers, dateProps, daysOfWeek, fixedWidth, focusedDate, formatDateFull, formatMonth, gridClassName, gridProps, headerProps, id, markOutsideDays, markToday, maxDate, minDate, month, navProps, nextMonthLabel, onDateClick, onDateKeyDown, onMonthChange, preventKeyboardFocus, previousMonthLabel, selectionConfiguration, weekDayKey, weekStartsOn, }: Props) => JSX.Element;
export default composeCalendar;
