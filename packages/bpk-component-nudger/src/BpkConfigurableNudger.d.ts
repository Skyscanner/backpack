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

/// <reference types="react" />
import { type CommonProps } from './common-types';
type Props = CommonProps & {
    inputClassName?: string | null;
    /**
     * A simple function that will allow you to set the format of the display value e.g. local dates or times.
     */
    formatValue: (arg0: any) => string;
    /**
     * Function that handle the incrementing of the current selected value.
     */
    incrementValue: (arg0: any) => string | number;
    /**
     * Function that handle the decrementing of the current selected value.
     */
    decrementValue: (arg0: any) => string | number;
    /**
     * Given `a` and `b`:
     *   - If `a` is less than `b` then `compareValues(a, b)` should return a value less than `0`
     *   - If  `a` and `b` are equal then `compareValues(a, b)` should return exactly `0`
     *   - If `a` is greater than `b` then `compareValues(a, b)` should return a value greater than `0`
     * We use this along with the `min` and `max` values to determine when we should disable the increment and decrement buttons. This is inspired by the `compareFunction` in [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Description)
     */
    compareValues: (arg0: any, arg1: any) => number;
};
declare const BpkConfigurableNudger: ({ buttonType, className, compareValues, decreaseButtonLabel, decrementValue, formatValue, id, increaseButtonLabel, incrementValue, inputClassName, max, min, onChange, value, ...rest }: Props) => JSX.Element;
export default BpkConfigurableNudger;
