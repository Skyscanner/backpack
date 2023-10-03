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

import type { KeyboardEvent } from 'react';
import { PureComponent } from 'react';
import type { DateModifiers } from './custom-proptypes';
export declare const SELECTION_TYPES: {
    readonly none: "none";
    readonly single: "single";
    readonly start: "start";
    readonly middle: "middle";
    readonly end: "end";
    readonly sameDay: "sameDay";
};
export declare const ROW_TYPES: {
    readonly start: "start";
    readonly middle: "middle";
    readonly end: "end";
    readonly both: "both";
};
export type SelectionTypes = (typeof SELECTION_TYPES)[keyof typeof SELECTION_TYPES];
export type Props = DefaultProps & {
    date: Date;
};
type DefaultProps = {
    className?: string | null;
    isBlocked?: boolean;
    isFocused?: boolean;
    isKeyboardFocusable?: boolean;
    isOutside?: boolean;
    isSelected?: boolean;
    isToday?: boolean;
    modifiers?: DateModifiers;
    onClick?: ((date: Date) => void) | null;
    onDateKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
    preventKeyboardFocus?: boolean;
    /**
     * This property determines which selected styles will be applied to the date cell. If using ranges use `start`, `middle` and `end` to apply the correct range styles.
     *   - `SELECTION_TYPES.single` - When the date is selected individually i.e. Not as part of a range
     *   - `SELECTION_TYPES.start` - When a start date is selected in a range calendar i.e. First date in the range
     *   - `SELECTION_TYPES.middle` - When a date is in a range between start and end date i.e. Date in the middle of two dates
     *   - `SELECTION_TYPES.end` - When an end date is selected in a range calendar i.e. Last date in the range
     */
    selectionType?: SelectionTypes;
    style?: {};
};
declare class BpkCalendarDate extends PureComponent<Props> {
    static defaultProps: DefaultProps;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    button: HTMLButtonElement | null;
    render(): JSX.Element;
}
export default BpkCalendarDate;
