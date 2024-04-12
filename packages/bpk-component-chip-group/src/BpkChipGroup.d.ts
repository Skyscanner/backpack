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
import { CHIP_TYPES } from '../../bpk-component-chip';
export declare const CHIP_GROUP_TYPES: {
    rail: string;
    wrap: string;
};
export declare const CHIP_COMPONENT: {
    selectable: string;
    dismissible: string;
    dropdown: string;
    icon: string;
};
export type ChipGroupType = (typeof CHIP_GROUP_TYPES)[keyof typeof CHIP_GROUP_TYPES];
export type ChipStyleType = (typeof CHIP_TYPES)[keyof typeof CHIP_TYPES];
export type ChipComponentType = (typeof CHIP_COMPONENT)[keyof typeof CHIP_COMPONENT];
export type SingleSelectChipItem = {
    text: string;
    accessibilityLabel?: string;
    leadingAccessoryView?: ReactNode;
    className?: string;
    [rest: string]: any;
};
export type ChipItem = {
    component?: ChipComponentType;
    onClick?: (selected: boolean, index: number) => void;
    selected?: boolean;
    hidden?: boolean;
} & SingleSelectChipItem;
export type CommonProps = {
    ariaLabel?: string;
    type?: ChipGroupType;
    className?: string | null;
    chipStyle?: ChipStyleType;
};
export type ChipGroupProps = {
    chips: ChipItem[];
    stickyChip?: ChipItem;
    ariaMultiselectable?: boolean;
} & CommonProps;
declare const BpkChipGroup: ({ ariaLabel, ariaMultiselectable, chipStyle, chips, className, stickyChip, type, }: ChipGroupProps) => JSX.Element;
export declare const BpkChipGroupState: ({ chips, ...rest }: ChipGroupProps) => JSX.Element;
export default BpkChipGroup;
