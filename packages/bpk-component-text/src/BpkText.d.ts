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

import type { ReactNode } from 'react';
export declare const TEXT_STYLES: {
    readonly xs: "xs";
    readonly sm: "sm";
    readonly base: "base";
    readonly lg: "lg";
    readonly xl: "xl";
    readonly xxl: "xxl";
    readonly xxxl: "xxxl";
    readonly xxxxl: "xxxxl";
    readonly xxxxxl: "xxxxxl";
    readonly caption: "caption";
    readonly footnote: "footnote";
    readonly label1: "label-1";
    readonly label2: "label-2";
    readonly label3: "label-3";
    readonly bodyDefault: "body-default";
    readonly bodyLongform: "body-longform";
    readonly subheading: "subheading";
    readonly heading1: "heading-1";
    readonly heading2: "heading-2";
    readonly heading3: "heading-3";
    readonly heading4: "heading-4";
    readonly heading5: "heading-5";
    readonly hero1: "hero-1";
    readonly hero2: "hero-2";
    readonly hero3: "hero-3";
    readonly hero4: "hero-4";
    readonly hero5: "hero-5";
};
export type TextStyle = typeof TEXT_STYLES[keyof typeof TEXT_STYLES];
export type Tag = 'span' | 'p' | 'text' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type Props = {
    children: ReactNode;
    textStyle?: TextStyle;
    tagName?: Tag;
    className?: string | null;
    id?: string;
    [rest: string]: any;
};
declare const BpkText: ({ textStyle, tagName: TagName, className, children, ...rest }: Props) => JSX.Element;
export default BpkText;
