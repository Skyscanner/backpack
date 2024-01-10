import { useState } from 'react';
import BpkChipGroup, { ChipItem, SingleSelectChipItem, CommonProps } from './BpkChipGroup';


export type SingleSelectProps = {
  chips: SingleSelectChipItem[];
  selectedIndex?: number;
  onItemClick?: (item: SingleSelectChipItem, selected: boolean, index: number) => void,
} & CommonProps;


export const BpkChipGroupSingleSelect = ({ chips, onItemClick, selectedIndex, ...rest }: SingleSelectProps) => {
  const chipsWithSelection = chips.map((chip, index) => ({
    ...chip,
    selected: index === selectedIndex,
    onClick: (selected: boolean, clickedIndex: number) => {
      if (onItemClick) {
        onItemClick(chip, selected, clickedIndex);
      }
    },
  }));

  return (
    <BpkChipGroup chips={chipsWithSelection} {...rest} />
  );
};

export const BpkChipGroupSingleSelectState = ({ selectedIndex: defaultSelectedIndex = -1, onItemClick, ...rest }: SingleSelectProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelectedIndex);

  const onItemClickWithState = (item: ChipItem, selected: boolean, index: number) => {
    if (onItemClick) {
      onItemClick(item, selected, index);
    }
    setSelectedIndex(selected ? index : -1);
  }

  return <BpkChipGroupSingleSelect selectedIndex={selectedIndex} onItemClick={onItemClickWithState} {...rest} />
};


export default BpkChipGroupSingleSelect;
