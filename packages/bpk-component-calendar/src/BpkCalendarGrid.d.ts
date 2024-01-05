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

import type { ElementType } from 'react';
import { Component } from 'react';
import type { DateModifiers, SelectionConfiguration } from './custom-proptypes';
type DefaultProps = {
    className?: string | null;
    dateModifiers?: DateModifiers;
    focusedDate?: Date | null;
    cellClassName: string | null;
    isKeyboardFocusable: boolean;
    markOutsideDays: boolean;
    markToday: boolean;
    maxDate: Date;
    minDate: Date;
    onDateClick: () => void;
    onDateKeyDown: () => void;
    preventKeyboardFocus: boolean;
    /**
     * An object to indicate which configuration of the calendar is being used. Choices are `single` date selection or `range` date selection.
     */
    selectionConfiguration: SelectionConfiguration;
    ignoreOutsideDate: boolean;
    dateProps: {};
};
export type Props = DefaultProps & {
    DateComponent: ElementType;
    /**
     * A function to format a full, human-readable date, for example: "Monday, 8th January 2018".
     */
    formatDateFull: (date: Date) => Date | string;
    month: Date;
    /**
     * First day of the week. 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
     */
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};
type State = {
    calendarMonthWeeks: Date[][];
};
declare class BpkCalendarGrid extends Component<Props, State> {
    static defaultProps: DefaultProps;
    constructor(props: Props);
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    render(): JSX.Element;
}
declare const BpkCalendarGridWithTransition: typeof BpkCalendarGrid | ((props: Omit<DefaultProps & {
    DateComponent: ElementType;
    /**
     * A function to format a full, human-readable date, for example: "Monday, 8th January 2018".
     */
    formatDateFull: (date: Date) => Date | string;
    month: Date;
    /**
     * First day of the week. 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
     */
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
} & {
    TransitionComponent: ElementType<any>;
} & {
    [rest: string]: any;
    className?: string | null | undefined;
    month?: Date | undefined;
    focusedDate?: Date | null | undefined;
}, "TransitionComponent">) => JSX.Element);
export default BpkCalendarGrid;
export { BpkCalendarGridWithTransition };
