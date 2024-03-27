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
import type { ReactElement, ReactNode} from 'react';
import { useRef, useState } from 'react';

import { cssModules } from '../../bpk-react-utils';
import BpkSelectableChip, { BpkIconChip, type BpkSelectableChipProps, CHIP_TYPES } from '../../bpk-component-chip';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkMobileScrollContainer from '../../bpk-component-mobile-scroll-container';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import FilterIconSm from '../../bpk-component-icon/sm/filter';
import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';

import Nudger from './Nudger';

import STYLES from './BpkChipGroup.module.scss';

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
  leadingAccessoryView?: ReactNode;
  className?: string;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

export type ChipItem = {
  component?: (props: BpkSelectableChipProps) => ReactElement;
  onClick?: (selected: boolean, index: number) => void;
  selected?: boolean;
} & SingleSelectChipItem;

type AccessibilityLabels = {
  ariaLabel: string;
  ariaLabelledBy?: never;
} | {
  ariaLabel?: never;
  ariaLabelledBy: string;
};

export type CommonProps = {
  type: ChipGroupType;
  className?: string | null;
  style?: ChipStyleType;
} & AccessibilityLabels;

export type ChipGroupProps = {
  chips: ChipItem[];
  stickyChip?: ChipItem;
  ariaMultiselectable?: boolean;
} & CommonProps;

const BpkChipGroup = ({ ariaLabel, ariaLabelledBy, ariaMultiselectable = true, chips, className = null, stickyChip, style = CHIP_TYPES.default, type = CHIP_GROUP_TYPES.rail }: ChipGroupProps) => {
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const containerClassnames = getClassName(
    className,
    'bpk-chip-group-container',
  )

  const chipGroupClassNames = getClassName(
    'bpk-chip-group',
    `bpk-chip-group--${type}`,
  );

  const stickyChipContainerClassnames = getClassName(
    'bpk-sticky-chip-container',
    `bpk-sticky-chip-container--${style}`,
  );

  const scrollContainerIndicator = getClassName('bpk-chip-group-scroller-indicator');

  const renderChipItem = ({ accessibilityLabel, component: Component = BpkSelectableChip, onClick, selected, text, ...rest }: ChipItem, index: number) => (
    <Component
      key={text}
      selected={selected ?? false}
      type={style}
      accessibilityLabel={accessibilityLabel || text}
      onClick={() => {
        if (onClick) {
          onClick(!selected, index);
        }
      }}
      role="option"
      {...rest}
    >
      {text}
    </Component>
  );

  // TODO: Fix focus indicators being cutoff when type = rail
  const wrapRailInScroll = (children: ReactElement) =>
    type === CHIP_GROUP_TYPES.rail ? (
      <BpkMobileScrollContainer
        scrollerRef={(el: HTMLElement) => {scrollContainerRef.current = el}}
        leadingIndicatorClassName={scrollContainerIndicator}
        trailingIndicatorClassName={scrollContainerIndicator}
      >
        {children}
      </BpkMobileScrollContainer>
    ) : children;

  return (
    <div className={containerClassnames}>
      {type === CHIP_GROUP_TYPES.rail && (
        <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
          <Nudger leading chipStyle={style} scrollContainerRef={scrollContainerRef} />
        </BpkBreakpoint>
      )}
      {type === CHIP_GROUP_TYPES.rail && stickyChip &&
        <div className={stickyChipContainerClassnames}>
          <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
            {(isDesktop) => renderChipItem({
              ...stickyChip,
              component: isDesktop ? BpkSelectableChip : BpkIconChip,
              leadingAccessoryView: <FilterIconSm />,
            }, -1)}
          </BpkBreakpoint>
        </div>
      }
      {wrapRailInScroll(
        <div className={chipGroupClassNames}
         role="listbox"
         aria-orientation="horizontal"
         aria-multiselectable={ariaMultiselectable}
         aria-label={ariaLabel}
         aria-labelledby={ariaLabelledBy}
        >
          {chips.map((chip, index) => chip && renderChipItem(chip, index))}
        </div>
      )}
      {type === CHIP_GROUP_TYPES.rail && (
        <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
          <Nudger chipStyle={style} scrollContainerRef={scrollContainerRef} />
        </BpkBreakpoint>
      )}
    </div>
  );
};

export const BpkChipGroupState = ({ chips, ...rest }: ChipGroupProps) => {
  const [selectedChips, setSelectedChips] = useState(chips.map(c => Boolean(c.selected)));

  const statefulChips = chips.map((chip, index) => chip && ({
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

  return <BpkChipGroup chips={statefulChips} {...rest} />
};


export default BpkChipGroup;
