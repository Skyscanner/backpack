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

import type { ChangeEvent, MouseEvent } from 'react';
type MonthChangeEvent = ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>;
type Props = {
    changeMonthLabel: string;
    /**
     * A function to format a human-readable month, for example: "January 2018":
     * If you just need to quickly prototype, use the following from [`date-fns`](https://date-fns.org/docs/format#usage)
     */
    formatMonth: (month: Date) => string;
    id: string;
    maxDate: Date;
    minDate: Date;
    month: Date;
    nextMonthLabel: string;
    previousMonthLabel: string;
    onMonthChange?: (event: MonthChangeEvent, options: {
        month: Date;
        source: string;
    }) => void;
    disabled?: boolean;
};
declare const BpkCalendarNav: ({ changeMonthLabel, disabled, formatMonth, id, maxDate, minDate, month, nextMonthLabel, onMonthChange, previousMonthLabel, }: Props) => JSX.Element;
export default BpkCalendarNav;
