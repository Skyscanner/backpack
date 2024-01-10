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
import { ReactElement, useRef, useState } from 'react';
import BpkSelectableChip, { CHIP_TYPES } from '../../bpk-component-chip';
import BpkMobileScrollContainer from '../../bpk-component-mobile-scroll-container';
import Nudger from './Nudger';

const getClassName = cssModules(STYLES);

export const CHIP_GROUP_TYPES = {
  rail: 'rail',
  wrap: 'wrap',
}
export type ChipGroupType = (typeof CHIP_GROUP_TYPES)[keyof typeof CHIP_GROUP_TYPES];
export type ChipStyleType = (typeof CHIP_TYPES)[keyof typeof CHIP_TYPES];

export type SingleSelectChipItem = {
  text: string;
  accessibilityLabel?: string;
  rest: [string: any];
};

export type ChipItem = {
  component?: () => ReactElement;  // TODO Component<BpkSelectableChip>
  onClick?: (selected: boolean, index: number) => void;
  selected?: boolean;
} & SingleSelectChipItem;


export type CommonProps = {
  className?: string | null;
  type: ChipGroupType;
  style?: ChipStyleType;
};

export type ChipGroupProps = {
  chips: ChipItem[];
  stickyChip?: ChipItem;
} & CommonProps;

const BpkChipGroup = ({ className = null, chips, type = CHIP_GROUP_TYPES.rail, style = CHIP_TYPES.default, stickyChip }: ChipGroupProps) => {
  const scrollContainerRef = useRef();

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
    `bpk-sticky-chip--${style}`,
  );

  const renderChipItem = ({text, accessibilityLabel, selected, onClick, component: Component = BpkSelectableChip, ...rest}: ChipItem, index: number) => (
    <Component
      key={text}
      selected={selected ?? false}
      type={style}
      accessibilityLabel={accessibilityLabel || text}
      onClick={() => {
        if (onClick) {
          onClick(!selected, index)
        }
      }}
      {...rest}
    >
      {text}
    </Component>
  );

  const wrapRailInScroll = (children: ReactElement) =>
    type === CHIP_GROUP_TYPES.rail ? <BpkMobileScrollContainer scrollerRef={(el) => {scrollContainerRef.current = el}}>{children}</BpkMobileScrollContainer> : children;

  return (
    <div className={containerClassnames}>
      {type === CHIP_GROUP_TYPES.rail && <Nudger leading chipStyle={style} scrollContainerRef={scrollContainerRef} /> }
      {type === CHIP_GROUP_TYPES.rail && stickyChip &&
        <div className={stickyChipClassnames}>
          {renderChipItem(stickyChip)}
        </div>
      }
      {wrapRailInScroll(
        <div className={chipGroupClassNames}>
          {chips.map(renderChipItem)}
        </div>
      )}
      {type === CHIP_GROUP_TYPES.rail && <Nudger chipStyle={style} scrollContainerRef={scrollContainerRef} /> }
    </div>
  );
};

export const BpkChipGroupState = ({ chips, ...rest }: ChipGroupProps) => {
  const [selectedChips, setSelectedChips] = useState(chips.map(c => Boolean(c.selected)));

  const statefulChips = chips.map((chip, index) => ({
    ...chip,
    selected: selectedChips[index],
    onClick: (selected: boolean, selectedIndex: number) => {
      if (chip.onClick) {
        chip.onClick(selected, selectedIndex);
      }

      const nextSelectedChips = [...selectedChips]
      nextSelectedChips[selectedIndex] = selected;
      setSelectedChips(nextSelectedChips);
    },
  }))

  return (
    <BpkChipGroup chips={statefulChips} {...rest} />
  );
};


export default BpkChipGroup;
