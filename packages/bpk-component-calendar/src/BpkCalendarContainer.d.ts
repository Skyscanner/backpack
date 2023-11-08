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
export type Props = {
    /**
     * If set to true (default), it sets a fixed width on the calendar container. This is necessary to support transitions and to create the right size for the Datepicker component.
     * If set to false, the calendar is of fluid width and will take up the space of its parent container.
     */
    fixedWidth?: boolean;
    maxDate?: Date;
    minDate?: Date;
    onDateSelect?: ((date: Date, newDate?: Date) => void) | null;
    onMonthChange?: ((event: UIEvent, { month, source }: {
        month: Date;
        source: string;
    }) => void) | null;
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
        customRowHeight?: number;
    };
    contextType?: import("react").Context<any> | undefined;
};
declare const _default: {
    new (props: CalendarProps<import("./composeCalendar").Props>): {
        UNSAFE_componentWillReceiveProps(nextProps: CalendarProps<import("./composeCalendar").Props>): void;
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
        setState<K extends keyof State>(state: State | ((prevState: Readonly<State>, props: Readonly<CalendarProps<import("./composeCalendar").Props>>) => State | Pick<State, K> | null) | Pick<State, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<CalendarProps<import("./composeCalendar").Props>> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<State>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<CalendarProps<import("./composeCalendar").Props>>, nextState: Readonly<State>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<CalendarProps<import("./composeCalendar").Props>>, prevState: Readonly<State>): any;
        componentDidUpdate?(prevProps: Readonly<CalendarProps<import("./composeCalendar").Props>>, prevState: Readonly<State>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<CalendarProps<import("./composeCalendar").Props>>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<CalendarProps<import("./composeCalendar").Props>>, nextState: Readonly<State>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<CalendarProps<import("./composeCalendar").Props>>, nextState: Readonly<State>, nextContext: any): void;
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
        customRowHeight?: number;
    };
    contextType?: import("react").Context<any> | undefined;
};
export default _default;
export { withCalendarState };
