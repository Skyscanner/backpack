/// <reference types="react" />
import { type SingleSelectChipItem, type CommonProps } from './BpkChipGroup';
export type SingleSelectProps = {
    chips: SingleSelectChipItem[];
    selectedIndex?: number;
    onItemClick?: (item: SingleSelectChipItem, selected: boolean, index: number) => void;
} & CommonProps;
declare const BpkChipGroupSingleSelect: ({ chips, onItemClick, selectedIndex, ...rest }: SingleSelectProps) => JSX.Element;
export type SingleSelectStateProps = {
    initiallySelectedIndex?: number;
} & Omit<SingleSelectProps, 'selectedIndex'>;
export declare const BpkChipGroupSingleSelectState: ({ initiallySelectedIndex, onItemClick, ...rest }: SingleSelectStateProps) => JSX.Element;
export default BpkChipGroupSingleSelect;
