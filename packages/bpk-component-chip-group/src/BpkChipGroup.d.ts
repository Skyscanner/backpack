import { ReactElement, ReactNode } from 'react';
import { type BpkSelectableChipProps, CHIP_TYPES } from '../../bpk-component-chip';
export declare const CHIP_GROUP_TYPES: {
    rail: string;
    wrap: string;
};
export type ChipGroupType = (typeof CHIP_GROUP_TYPES)[keyof typeof CHIP_GROUP_TYPES];
export type ChipStyleType = (typeof CHIP_TYPES)[keyof typeof CHIP_TYPES];
export type SingleSelectChipItem = {
    text: string;
    accessibilityLabel?: string;
    leadingAccessoryView?: ReactNode;
    className?: string;
    [rest: string]: any;
};
export type ChipItem = {
    component?: (props: BpkSelectableChipProps) => ReactElement;
    onClick?: (selected: boolean, index: number) => void;
    selected?: boolean;
} & SingleSelectChipItem;
export type CommonProps = {
    type: ChipGroupType;
    className?: string | null;
    style?: ChipStyleType;
};
export type ChipGroupProps = {
    chips: ChipItem[];
    stickyChip?: ChipItem;
} & CommonProps;
declare const BpkChipGroup: ({ className, chips, type, style, stickyChip }: ChipGroupProps) => JSX.Element;
export declare const BpkChipGroupState: ({ chips, ...rest }: ChipGroupProps) => JSX.Element;
export default BpkChipGroup;
