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
import type { SelectionConfiguration } from './custom-proptypes';
type Props = {
    fixedWidth?: boolean;
    maxDate?: Date;
    minDate?: Date;
    onDateSelect?: ((date: Date, newDate?: Date) => void) | null;
    onMonthChange?: ((event: UIEvent, { month, source }: {
        month: Date;
        source: string;
    }) => void) | null;
    selectionConfiguration?: SelectionConfiguration;
    initiallyFocusedDate?: Date | null;
    markToday?: boolean;
    markOutsideDays?: boolean;
};
type InjectedProps = {
    onDateClick: ((date: Date) => void) | null;
    onDateKeyDown: ((event: KeyboardEvent) => void) | null;
    month: Date;
};
type CalendarProps<P> = Omit<P & Props, keyof InjectedProps> & {
    [rest: string]: any;
};
type State = {
    preventKeyboardFocus: boolean;
    focusedDate: Date;
};
declare const withCalendarState: <P extends object>(Calendar: ComponentType<P>) => {
    new (props: CalendarProps<P>): {
        UNSAFE_componentWillReceiveProps(nextProps: CalendarProps<P>): void;
        handleDateFocus: (event: UIEvent, { date, source }: {
            date: Date;
            source: string;
        }) => void;
        handleDateSelect: (date: Date) => void;
        handleMonthChange: (event: UIEvent, { month, source }: {
            month: Date;
            source: string;
        }) => void;
        handleDateKeyDown: (event: KeyboardEvent) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends keyof State>(state: State | ((prevState: Readonly<State>, props: Readonly<CalendarProps<P>>) => State | Pick<State, K> | null) | Pick<State, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<CalendarProps<P>> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<State>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<CalendarProps<P>>, nextState: Readonly<State>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<CalendarProps<P>>, prevState: Readonly<State>): any;
        componentDidUpdate?(prevProps: Readonly<CalendarProps<P>>, prevState: Readonly<State>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<CalendarProps<P>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<CalendarProps<P>>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<CalendarProps<P>>, nextState: Readonly<State>, nextContext: any): void;
    };
    defaultProps: {
        fixedWidth: boolean;
        maxDate: Date;
        minDate: Date;
        onDateSelect: null;
        onMonthChange: null;
        selectionConfiguration: {
            type: "single";
            date: null;
        };
        initiallyFocusedDate: null;
        markToday: boolean;
        markOutsideDays: boolean;
    };
    contextType?: import("react").Context<any> | undefined;
};
declare const _default: {
    new (props: CalendarProps<{
        changeMonthLabel?: string | null | undefined;
        daysOfWeek: import("./custom-proptypes").DaysOfWeek;
        formatDateFull: (date: Date) => string | Date;
        formatMonth: (date: Date) => string | Date;
        id: string;
        maxDate: Date;
        minDate: Date;
        month: Date;
        nextMonthLabel?: string | null | undefined;
        previousMonthLabel?: string | null | undefined;
        weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        className?: string | null | undefined;
        dateModifiers?: import("./custom-proptypes").DateModifiers | undefined;
        fixedWidth?: boolean | undefined;
        focusedDate?: Date | null | undefined;
        markOutsideDays?: boolean | undefined;
        markToday?: boolean | undefined;
        onMonthChange?: ((event: UIEvent, { month, source }: {
            month: Date;
            source: string;
        }) => void) | null | undefined;
        onDateClick?: ((date: Date) => void) | null | undefined;
        onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
        preventKeyboardFocus?: boolean | undefined;
        selectionConfiguration?: SelectionConfiguration | undefined;
        gridClassName?: string | null | undefined;
        weekDayKey?: string | undefined;
        navProps?: {} | null | undefined;
        headerProps?: {} | null | undefined;
        gridProps?: {} | null | undefined;
        dateProps?: {} | null | undefined;
    }>): {
        UNSAFE_componentWillReceiveProps(nextProps: CalendarProps<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("./custom-proptypes").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("./custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        }>): void;
        handleDateFocus: (event: UIEvent, { date, source }: {
            date: Date;
            source: string;
        }) => void;
        handleDateSelect: (date: Date) => void;
        handleMonthChange: (event: UIEvent, { month, source }: {
            month: Date;
            source: string;
        }) => void;
        handleDateKeyDown: (event: KeyboardEvent) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends keyof State>(state: State | ((prevState: Readonly<State>, props: Readonly<CalendarProps<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("./custom-proptypes").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("./custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        }>>) => State | Pick<State, K> | null) | Pick<State, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<CalendarProps<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("./custom-proptypes").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("./custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        }>> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<State>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<CalendarProps<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("./custom-proptypes").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("./custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        }>>, nextState: Readonly<State>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<CalendarProps<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("./custom-proptypes").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("./custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        }>>, prevState: Readonly<State>): any;
        componentDidUpdate?(prevProps: Readonly<CalendarProps<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("./custom-proptypes").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("./custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        }>>, prevState: Readonly<State>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<CalendarProps<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("./custom-proptypes").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("./custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        }>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<CalendarProps<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("./custom-proptypes").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("./custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        }>>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<CalendarProps<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("./custom-proptypes").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("./custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        }>>, nextState: Readonly<State>, nextContext: any): void;
    };
    defaultProps: {
        fixedWidth: boolean;
        maxDate: Date;
        minDate: Date;
        onDateSelect: null;
        onMonthChange: null;
        selectionConfiguration: {
            type: "single";
            date: null;
        };
        initiallyFocusedDate: null;
        markToday: boolean;
        markOutsideDays: boolean;
    };
    contextType?: import("react").Context<any> | undefined;
};
export default _default;
export { withCalendarState };
