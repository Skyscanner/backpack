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
    formatValue: (arg0: any) => string;
    incrementValue: (arg0: any) => string | number;
    decrementValue: (arg0: any) => string | number;
    compareValues: (arg0: any, arg1: any) => number;
};
declare const BpkConfigurableNudger: ({ buttonType, className, compareValues, decreaseButtonLabel, decrementValue, formatValue, id, increaseButtonLabel, incrementValue, inputClassName, max, min, onChange, value, ...rest }: Props) => JSX.Element;
export default BpkConfigurableNudger;
