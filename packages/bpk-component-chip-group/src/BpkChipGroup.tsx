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

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkChipGroup.module.scss';
import { ReactElement, SyntheticEvent, useCallback, useState } from 'react';
import BpkSelectableChip, { CHIP_TYPES } from '../../bpk-component-chip';
import BpkMobileScrollContainer from '../../bpk-component-mobile-scroll-container';

const getClassName = cssModules(STYLES);

export const CHIP_GROUP_TYPES = {
  rail: 'rail',
  wrap: 'wrap',
}
export type ChipGroupType = (typeof CHIP_GROUP_TYPES)[keyof typeof CHIP_GROUP_TYPES];

export type ChipItem = {
  text: string;
  accessibilityLabel: string
  selected?: boolean;
  onClick?: (selected: boolean, index: number, event: SyntheticEvent<HTMLButtonElement>) => void;
  component?: () => ReactElement;  // TODO Component<BpkSelectableChip>
  rest: [string: any];
};

type Props = {
  className?: string | null;
  // children: Node;
  type: ChipGroupType;
  chips: ChipItem[];
  chipStyle: (typeof CHIP_TYPES)[keyof typeof CHIP_TYPES];
  stickyChip?: ChipItem;
  onClick?: (selected: boolean[]) => void;
};



const BpkChipGroup = ({ className = null, chips, type = CHIP_GROUP_TYPES.rail, chipStyle = CHIP_TYPES.default, onClick, stickyChip }: Props) => {
  const connectedChips = chips.map((chip, index) => ({
    ...chip,
    onClick: (event: SyntheticEvent<HTMLButtonElement>) => {
      const nextSelected = chips.map(chip => Boolean(chip.selected))
      nextSelected[index] = !nextSelected[index];

      if (chip.onClick) {
        chip.onClick(nextSelected[index], index, event);
      }
      if (onClick) {
        onClick(nextSelected);
      }
    },
  }));


  const containerClassnames = getClassName(
    className,
    'bpk-chip-group-container',
  )

  const chipGroupClassNames = getClassName(
    'bpk-chip-group',
    `bpk-chip-group--${type}`,
  );

  const stickyChipClassnames = getClassName(
    'bpk-sticky-chip',
    `bpk-sticky-chip--${chipStyle}`,
  );

  const renderChipItem = ({text, accessibilityLabel, selected, onClick, component, ...rest}: ChipItem) => {
    const Chip = component ?? BpkSelectableChip;

    return (
      <Chip
        key={text}
        selected={selected ?? false}
        type={chipStyle}
        accessibilityLabel={accessibilityLabel}
        onClick={onClick ?? (() => {})}
        {...rest}
      >
        {text}
      </Chip>
    );
  }

  const wrapRailInScroll = (children: ReactElement) =>
    type === CHIP_GROUP_TYPES.rail ? <BpkMobileScrollContainer>{children}</BpkMobileScrollContainer> : children;

  return (
    <div className={containerClassnames}>
      {type === CHIP_GROUP_TYPES.rail && stickyChip &&
        <div className={stickyChipClassnames}>
          {renderChipItem(stickyChip)}
        </div>
      }
      {wrapRailInScroll(
        <div className={chipGroupClassNames}>
          {connectedChips.map(chip => renderChipItem(chip))}
        </div>
      )}
    </div>

  );
};



export const BpkChipGroupMultiSelect = ({ chips, onClick, ...rest }: Props) => {
  const [selected, setSelected] = useState(chips.map(c => Boolean(c.selected)));

  const statefulChips = chips.map((chip, index) => ({
    ...chip,
    selected: selected[index],
  }))

  const clickHandler = (selectedChips: boolean[]) => {
    setSelected(selectedChips);
    if (onClick) {
      onClick(selectedChips);
    }
  }

  return (
    <BpkChipGroup onClick={clickHandler} chips={statefulChips} {...rest} />
  );
};


export type SingleSelectProps = {
  onClick?: (selected: ChipItem) => void,
} & Props;


export const BpkChipGroupSingleSelect = ({ chips, onClick, ...rest }: SingleSelectProps) => {
  const [selectedIndex, setSelectedIndex] = useState(chips.findIndex(c => Boolean(c.selected)));

  const connectedChips = chips.map((chip, index) => ({
    ...chip,
    selected: index === selectedIndex,
    onClick: (selected: boolean, index: number, event: SyntheticEvent<HTMLButtonElement>) => {
      setSelectedIndex(selected ? index : -1);

      if (chip.onClick) {
        chip.onClick(selected, index, event);
      }

      if (onClick) {
        onClick({
          ...chip,
          selected,
        });
      }
    },
  }))

  return (
    <BpkChipGroup chips={connectedChips} {...rest} />
  );
};




BpkChipGroup.defaultProps = {
  className: null,
  type: CHIP_GROUP_TYPES.rail,
  chipStyle: CHIP_TYPES.default,
};

export default BpkChipGroup;
