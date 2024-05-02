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

import { useState } from 'react';

import BpkChipGroup, { type ChipItem, type SingleSelectChipItem, type ChipGroupProps } from './BpkChipGroup';

type CommonSingleSelectProps = {
  chips: SingleSelectChipItem[];
  onItemClick?: (item: SingleSelectChipItem, selected: boolean, index: number) => void,
} & ChipGroupProps;

export type SingleSelectProps = {
  selectedIndex?: number;
} & CommonSingleSelectProps;

const BpkChipGroupSingleSelect = ({ chips, onItemClick, selectedIndex, ...rest }: SingleSelectProps) => {
  const chipsWithSelection = chips.map((chip, index) => chip && ({
    ...chip,
    selected: index === selectedIndex,
    onClick: (selected: boolean, clickedIndex: number) => {
      if (onItemClick) {
        onItemClick(chip, selected, clickedIndex);
      }
    },
  }));

  return (
    <BpkChipGroup chips={chipsWithSelection} ariaMultiselectable={false} {...rest} />
  );
};

export type SingleSelectStateProps = {
  initiallySelectedIndex?: number;
} & CommonSingleSelectProps

export const BpkChipGroupSingleSelectState = ({ initiallySelectedIndex = -1, onItemClick, ...rest }: SingleSelectStateProps) => {
  const [selectedIndex, setSelectedIndex] = useState(initiallySelectedIndex);

  const onItemClickWithState = (item: ChipItem, selected: boolean, index: number) => {
    if (onItemClick) {
      onItemClick(item, selected, index);
    }
    setSelectedIndex(selected ? index : -1);
  }

  return <BpkChipGroupSingleSelect selectedIndex={selectedIndex} onItemClick={onItemClickWithState} {...rest} />
};


export default BpkChipGroupSingleSelect;
