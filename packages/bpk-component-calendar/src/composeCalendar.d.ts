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
import type { DaysOfWeek, SelectionConfiguration, DateModifiers } from './custom-proptypes';
type Props = {
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
    onMonthChange?: ((event: UIEvent, { month, source }: {
        month: Date;
        source: string;
    }) => void) | null;
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
declare const composeCalendar: (Nav: ComponentType<any> | string | null, GridHeader: ComponentType<any> | string | null, Grid: ComponentType<any> | string, CalendarDate: ComponentType<any> | string | null) => ({ changeMonthLabel, className, dateModifiers, dateProps, daysOfWeek, fixedWidth, focusedDate, formatDateFull, formatMonth, gridClassName, gridProps, headerProps, id, markOutsideDays, markToday, maxDate, minDate, month, navProps, nextMonthLabel, onDateClick, onDateKeyDown, onMonthChange, preventKeyboardFocus, previousMonthLabel, selectionConfiguration, weekDayKey, weekStartsOn, }: Props) => JSX.Element;
export default composeCalendar;
