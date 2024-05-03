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

import type { ReactElement, ReactNode } from 'react';
import type { Tag, TextStyle } from '../../bpk-component-text/src/BpkText';
export declare const BAR_STYLES: {
    default: string;
    onDark: string;
};
export type BarStyle = (typeof BAR_STYLES)[keyof typeof BAR_STYLES];
export type Props = {
    id: string;
    title: ReactNode;
    titleTextStyle?: TextStyle;
    titleTagName?: Tag;
    className?: string;
    leadingButton?: ReactElement | null;
    trailingButton?: ReactElement | null;
    sticky?: boolean;
    barStyle?: BarStyle;
    [rest: string]: any;
};
declare const BpkNavigationBar: (props: Props) => JSX.Element;
export default BpkNavigationBar;
