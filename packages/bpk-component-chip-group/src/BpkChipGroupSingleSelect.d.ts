/// <reference types="react" />
import { SingleSelectChipItem, CommonProps } from './BpkChipGroup';
export type SingleSelectProps = {
    chips: SingleSelectChipItem[];
    selectedIndex?: number;
    onItemClick?: (item: SingleSelectChipItem, selected: boolean, index: number) => void;
} & CommonProps;
declare const BpkChipGroupSingleSelect: ({ chips, onItemClick, selectedIndex, ...rest }: SingleSelectProps) => JSX.Element;
export declare const BpkChipGroupSingleSelectState: ({ selectedIndex: defaultSelectedIndex, onItemClick, ...rest }: SingleSelectProps) => JSX.Element;
export default BpkChipGroupSingleSelect;
