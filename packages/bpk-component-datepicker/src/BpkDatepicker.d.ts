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

import { Component } from 'react';
import type { ReactElement } from 'react';
import type { DaysOfWeek, ReactComponent, SelectionConfiguration } from '../../bpk-component-calendar';
type Props = {
    changeMonthLabel: string;
    closeButtonText: string;
    daysOfWeek: DaysOfWeek;
    formatDate: (date: Date) => string;
    formatDateFull: (date: Date) => string;
    formatMonth: (date: Date) => string;
    id: string;
    title: string;
    getApplicationElement: () => HTMLElement | null;
    nextMonthLabel: string;
    previousMonthLabel: string;
    weekStartsOn: number;
    calendarComponent: ReactComponent;
    inputComponent: ReactElement | null;
    dateModifiers?: {};
    fixedWidth?: boolean;
    inputProps?: {};
    markOutsideDays?: boolean;
    markToday?: boolean;
    maxDate?: Date;
    minDate?: Date;
    onDateSelect?: ((date: Date, newDate?: Date) => void) | null;
    onMonthChange?: ((event: UIEvent, { month, source }: {
        month: Date;
        source: string;
    }) => void) | null;
    onOpenChange?: (arg0: boolean) => void | null;
    selectionConfiguration?: SelectionConfiguration;
    initiallyFocusedDate?: Date;
    renderTarget?: null | HTMLElement | (() => null | HTMLElement);
    isOpen?: boolean;
    valid?: boolean;
    onClose?: () => void;
};
type State = {
    isOpen: boolean;
};
declare class BpkDatepicker extends Component<Props, State> {
    inputRef: React.RefObject<HTMLInputElement>;
    static defaultProps: {
        calendarComponent: {
            new (props: Omit<{
                changeMonthLabel?: string | null | undefined;
                daysOfWeek: DaysOfWeek;
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
                dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
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
            } & {
                fixedWidth?: boolean | undefined;
                maxDate?: Date | undefined;
                minDate?: Date | undefined;
                onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
                onMonthChange?: ((event: UIEvent, { month, source }: {
                    month: Date;
                    source: string;
                }) => void) | null | undefined;
                selectionConfiguration?: SelectionConfiguration | undefined;
                initiallyFocusedDate?: Date | null | undefined;
                markToday?: boolean | undefined;
                markOutsideDays?: boolean | undefined;
            }, keyof {
                onDateClick: ((date: Date) => void) | null;
                onDateKeyDown: ((event: KeyboardEvent) => void) | null;
                month: Date;
                minDate: Date;
                maxDate: Date;
            }> & {
                [rest: string]: any;
            }): {
                UNSAFE_componentWillReceiveProps(nextProps: Omit<{
                    changeMonthLabel?: string | null | undefined;
                    daysOfWeek: DaysOfWeek;
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
                    dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
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
                } & {
                    fixedWidth?: boolean | undefined;
                    maxDate?: Date | undefined;
                    minDate?: Date | undefined;
                    onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
                    onMonthChange?: ((event: UIEvent, { month, source }: {
                        month: Date;
                        source: string;
                    }) => void) | null | undefined;
                    selectionConfiguration?: SelectionConfiguration | undefined;
                    initiallyFocusedDate?: Date | null | undefined;
                    markToday?: boolean | undefined;
                    markOutsideDays?: boolean | undefined;
                }, keyof {
                    onDateClick: ((date: Date) => void) | null;
                    onDateKeyDown: ((event: KeyboardEvent) => void) | null;
                    month: Date;
                    minDate: Date;
                    maxDate: Date;
                }> & {
                    [rest: string]: any;
                }): void;
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
                setState<K extends keyof {
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                }>(state: {
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                } | ((prevState: Readonly<{
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                }>, props: Readonly<Omit<{
                    changeMonthLabel?: string | null | undefined;
                    daysOfWeek: DaysOfWeek;
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
                    dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
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
                } & {
                    fixedWidth?: boolean | undefined;
                    maxDate?: Date | undefined;
                    minDate?: Date | undefined;
                    onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
                    onMonthChange?: ((event: UIEvent, { month, source }: {
                        month: Date;
                        source: string;
                    }) => void) | null | undefined;
                    selectionConfiguration?: SelectionConfiguration | undefined;
                    initiallyFocusedDate?: Date | null | undefined;
                    markToday?: boolean | undefined;
                    markOutsideDays?: boolean | undefined;
                }, keyof {
                    onDateClick: ((date: Date) => void) | null;
                    onDateKeyDown: ((event: KeyboardEvent) => void) | null;
                    month: Date;
                    minDate: Date;
                    maxDate: Date;
                }> & {
                    [rest: string]: any;
                }>) => {
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                } | Pick<{
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                }, K> | null) | Pick<{
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                }, K> | null, callback?: (() => void) | undefined): void;
                forceUpdate(callback?: (() => void) | undefined): void;
                readonly props: Readonly<Omit<{
                    changeMonthLabel?: string | null | undefined;
                    daysOfWeek: DaysOfWeek;
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
                    dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
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
                } & {
                    fixedWidth?: boolean | undefined;
                    maxDate?: Date | undefined;
                    minDate?: Date | undefined;
                    onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
                    onMonthChange?: ((event: UIEvent, { month, source }: {
                        month: Date;
                        source: string;
                    }) => void) | null | undefined;
                    selectionConfiguration?: SelectionConfiguration | undefined;
                    initiallyFocusedDate?: Date | null | undefined;
                    markToday?: boolean | undefined;
                    markOutsideDays?: boolean | undefined;
                }, keyof {
                    onDateClick: ((date: Date) => void) | null;
                    onDateKeyDown: ((event: KeyboardEvent) => void) | null;
                    month: Date;
                    minDate: Date;
                    maxDate: Date;
                }> & {
                    [rest: string]: any;
                }> & Readonly<{
                    children?: import("react").ReactNode;
                }>;
                state: Readonly<{
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                }>;
                refs: {
                    [key: string]: import("react").ReactInstance;
                };
                componentDidMount?(): void;
                shouldComponentUpdate?(nextProps: Readonly<Omit<{
                    changeMonthLabel?: string | null | undefined;
                    daysOfWeek: DaysOfWeek;
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
                    dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
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
                } & {
                    fixedWidth?: boolean | undefined;
                    maxDate?: Date | undefined;
                    minDate?: Date | undefined;
                    onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
                    onMonthChange?: ((event: UIEvent, { month, source }: {
                        month: Date;
                        source: string;
                    }) => void) | null | undefined;
                    selectionConfiguration?: SelectionConfiguration | undefined;
                    initiallyFocusedDate?: Date | null | undefined;
                    markToday?: boolean | undefined;
                    markOutsideDays?: boolean | undefined;
                }, keyof {
                    onDateClick: ((date: Date) => void) | null;
                    onDateKeyDown: ((event: KeyboardEvent) => void) | null;
                    month: Date;
                    minDate: Date;
                    maxDate: Date;
                }> & {
                    [rest: string]: any;
                }>, nextState: Readonly<{
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                }>, nextContext: any): boolean;
                componentWillUnmount?(): void;
                componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
                getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<{
                    changeMonthLabel?: string | null | undefined;
                    daysOfWeek: DaysOfWeek;
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
                    dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
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
                } & {
                    fixedWidth?: boolean | undefined;
                    maxDate?: Date | undefined;
                    minDate?: Date | undefined;
                    onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
                    onMonthChange?: ((event: UIEvent, { month, source }: {
                        month: Date;
                        source: string;
                    }) => void) | null | undefined;
                    selectionConfiguration?: SelectionConfiguration | undefined;
                    initiallyFocusedDate?: Date | null | undefined;
                    markToday?: boolean | undefined;
                    markOutsideDays?: boolean | undefined;
                }, keyof {
                    onDateClick: ((date: Date) => void) | null;
                    onDateKeyDown: ((event: KeyboardEvent) => void) | null;
                    month: Date;
                    minDate: Date;
                    maxDate: Date;
                }> & {
                    [rest: string]: any;
                }>, prevState: Readonly<{
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                }>): any;
                componentDidUpdate?(prevProps: Readonly<Omit<{
                    changeMonthLabel?: string | null | undefined;
                    daysOfWeek: DaysOfWeek;
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
                    dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
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
                } & {
                    fixedWidth?: boolean | undefined;
                    maxDate?: Date | undefined;
                    minDate?: Date | undefined;
                    onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
                    onMonthChange?: ((event: UIEvent, { month, source }: {
                        month: Date;
                        source: string;
                    }) => void) | null | undefined;
                    selectionConfiguration?: SelectionConfiguration | undefined;
                    initiallyFocusedDate?: Date | null | undefined;
                    markToday?: boolean | undefined;
                    markOutsideDays?: boolean | undefined;
                }, keyof {
                    onDateClick: ((date: Date) => void) | null;
                    onDateKeyDown: ((event: KeyboardEvent) => void) | null;
                    month: Date;
                    minDate: Date;
                    maxDate: Date;
                }> & {
                    [rest: string]: any;
                }>, prevState: Readonly<{
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                }>, snapshot?: any): void;
                componentWillMount?(): void;
                UNSAFE_componentWillMount?(): void;
                componentWillReceiveProps?(nextProps: Readonly<Omit<{
                    changeMonthLabel?: string | null | undefined;
                    daysOfWeek: DaysOfWeek;
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
                    dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
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
                } & {
                    fixedWidth?: boolean | undefined;
                    maxDate?: Date | undefined;
                    minDate?: Date | undefined;
                    onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
                    onMonthChange?: ((event: UIEvent, { month, source }: {
                        month: Date;
                        source: string;
                    }) => void) | null | undefined;
                    selectionConfiguration?: SelectionConfiguration | undefined;
                    initiallyFocusedDate?: Date | null | undefined;
                    markToday?: boolean | undefined;
                    markOutsideDays?: boolean | undefined;
                }, keyof {
                    onDateClick: ((date: Date) => void) | null;
                    onDateKeyDown: ((event: KeyboardEvent) => void) | null;
                    month: Date;
                    minDate: Date;
                    maxDate: Date;
                }> & {
                    [rest: string]: any;
                }>, nextContext: any): void;
                componentWillUpdate?(nextProps: Readonly<Omit<{
                    changeMonthLabel?: string | null | undefined;
                    daysOfWeek: DaysOfWeek;
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
                    dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
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
                } & {
                    fixedWidth?: boolean | undefined;
                    maxDate?: Date | undefined;
                    minDate?: Date | undefined;
                    onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
                    onMonthChange?: ((event: UIEvent, { month, source }: {
                        month: Date;
                        source: string;
                    }) => void) | null | undefined;
                    selectionConfiguration?: SelectionConfiguration | undefined;
                    initiallyFocusedDate?: Date | null | undefined;
                    markToday?: boolean | undefined;
                    markOutsideDays?: boolean | undefined;
                }, keyof {
                    onDateClick: ((date: Date) => void) | null;
                    onDateKeyDown: ((event: KeyboardEvent) => void) | null;
                    month: Date;
                    minDate: Date;
                    maxDate: Date;
                }> & {
                    [rest: string]: any;
                }>, nextState: Readonly<{
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                }>, nextContext: any): void;
                UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<{
                    changeMonthLabel?: string | null | undefined;
                    daysOfWeek: DaysOfWeek;
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
                    dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
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
                } & {
                    fixedWidth?: boolean | undefined;
                    maxDate?: Date | undefined;
                    minDate?: Date | undefined;
                    onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
                    onMonthChange?: ((event: UIEvent, { month, source }: {
                        month: Date;
                        source: string;
                    }) => void) | null | undefined;
                    selectionConfiguration?: SelectionConfiguration | undefined;
                    initiallyFocusedDate?: Date | null | undefined;
                    markToday?: boolean | undefined;
                    markOutsideDays?: boolean | undefined;
                }, keyof {
                    onDateClick: ((date: Date) => void) | null;
                    onDateKeyDown: ((event: KeyboardEvent) => void) | null;
                    month: Date;
                    minDate: Date;
                    maxDate: Date;
                }> & {
                    [rest: string]: any;
                }>, nextState: Readonly<{
                    preventKeyboardFocus: boolean;
                    focusedDate: Date;
                }>, nextContext: any): void;
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
        inputComponent: null;
        dateModifiers: {};
        inputProps: {};
        fixedWidth: boolean;
        markOutsideDays: boolean;
        markToday: boolean;
        maxDate: Date;
        minDate: Date;
        nextMonthLabel: null;
        onDateSelect: null;
        onOpenChange: null;
        onMonthChange: null;
        previousMonthLabel: null;
        selectionConfiguration: {
            type: "single";
            date: null;
        };
        initiallyFocusedDate: null;
        renderTarget: null;
        isOpen: boolean;
        valid: null;
    };
    constructor(props: Props);
    componentDidUpdate(prevProps: Props, prevState: State): void;
    onOpen: () => void;
    onClose: () => void;
    /**
     * Gets the correct label for the input field to be supplied to the aria-label
     * @param {Object} selectionConfiguration current selection configuration
     * @param {Function} formatDateFull function supplied to format date
     * @returns {String} date string
     */
    getLabel: (selectionConfiguration: SelectionConfiguration, formatDateFull: (date: Date) => string) => string;
    /**
     * Gets the correct value for the input field
     * @param {Object} selectionConfiguration current selection configuration
     * @param {Function} formatDate function supplied to format date
     * @returns {String} date value
     */
    getValue: (selectionConfiguration: SelectionConfiguration, formatDate: (date: Date) => string) => string;
    handleDateSelect: (startDate: Date, endDate?: Date | null) => void;
    render(): JSX.Element;
}
export default BpkDatepicker;
