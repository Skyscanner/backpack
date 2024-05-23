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
import { useRef, useState } from 'react';

import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';
import BpkSelectableChip, { BpkDismissibleChip, BpkIconChip, BpkDropdownChip, CHIP_TYPES } from '../../bpk-component-chip';
import FilterIconSm from '../../bpk-component-icon/sm/filter';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkMobileScrollContainer from '../../bpk-component-mobile-scroll-container';
import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';
import { cssModules } from '../../bpk-react-utils';

import Nudger, { POSITION } from './Nudger';

import STYLES from './BpkChipGroup.module.scss';

const getClassName = cssModules(STYLES);

export const CHIP_GROUP_TYPES = {
  rail: 'rail',
  wrap: 'wrap',
} as const;

export const CHIP_COMPONENT = {
  selectable: 'selectable',
  dismissible: 'dismissible',
  dropdown: 'dropdown',
  icon: 'icon',
} as const;

const CHIP_COMPONENT_MAP = {
  [CHIP_COMPONENT.selectable]: BpkSelectableChip,
  [CHIP_COMPONENT.dismissible]: BpkDismissibleChip,
  [CHIP_COMPONENT.dropdown]: BpkDropdownChip,
  [CHIP_COMPONENT.icon]: BpkIconChip,
}

export type ChipGroupType = (typeof CHIP_GROUP_TYPES)[keyof typeof CHIP_GROUP_TYPES];
export type ChipStyleType = (typeof CHIP_TYPES)[keyof typeof CHIP_TYPES];
export type ChipComponentType = (typeof CHIP_COMPONENT)[keyof typeof CHIP_COMPONENT];

export type SingleSelectChipItem = {
  text: string;
  accessibilityLabel?: string;
  leadingAccessoryView?: ReactNode;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
};

export type ChipItem = {
  component?: ChipComponentType;
  onClick?: (selected: boolean, index: number) => void;
  selected?: boolean;
  hidden?: boolean;
} & SingleSelectChipItem;

export type InternalProps = {
  chipGroupClassNames: string
};

export type CommonProps = {
  label?: string;
  ariaLabel?: string;
  chipStyle?: ChipStyleType;
  chips: ChipItem[];
  ariaMultiselectable?: boolean;
};

export type RailChipGroupProps = {
  stickyChip?: ChipItem;
  leadingNudgerLabel: string;
  trailingNudgerLabel: string;
} & CommonProps;

export type WrapChipGroupProps = {
} & CommonProps;

export type ChipGroupProps = (RailChipGroupProps & { type: typeof CHIP_GROUP_TYPES.rail } | WrapChipGroupProps & { type: typeof CHIP_GROUP_TYPES.wrap });

const Chip = ({ ariaMultiselectable, chipIndex, chipItem, chipStyle }: { chipIndex: number, chipItem: ChipItem, chipStyle: ChipStyleType, ariaMultiselectable: boolean }) => {
  const {
    accessibilityLabel,
    component = CHIP_COMPONENT.selectable,
    hidden = false,
    leadingAccessoryView = null,
    onClick,
    selected,
    text,
    ...rest
  } = chipItem;
  const Component = CHIP_COMPONENT_MAP[component];
  return hidden ? null : (
    <Component
      key={text}
      selected={selected ?? false}
      type={chipStyle}
      accessibilityLabel={accessibilityLabel || text}
      onClick={() => {
        if (onClick) {
          onClick(!selected, chipIndex);
        }
      }}
      role={ariaMultiselectable ? 'checkbox' : 'radio'}
      leadingAccessoryView={leadingAccessoryView}
      {...rest}
    >
      {text}
    </Component>
  );
}

const ChipGroupContent = (
  { ariaLabel,
    ariaMultiselectable,
    chipGroupClassNames,
    chipStyle,
    chips,
    label }:
    {
      chipGroupClassNames: string,
      ariaMultiselectable: boolean,
      ariaLabel?: string,
      label?: string,
      chips: ChipItem[],
      chipStyle: ChipStyleType
    }) => (
  <fieldset
    className={chipGroupClassNames}
    role={ariaMultiselectable ? 'group' : 'radiogroup'}
  >
    {ariaLabel && <legend className='visually-hidden'>{ariaLabel}</legend>}
    {label && <BpkText textStyle={TEXT_STYLES.footnote} aria-hidden>{label}</BpkText>}
    {chips.map((chip, index) => <Chip chipItem={chip} chipStyle={chipStyle} ariaMultiselectable={ariaMultiselectable} chipIndex={index} />)}
  </fieldset>
);

const RailChipGroup = ({
  ariaLabel,
  ariaMultiselectable = true,
  chipGroupClassNames,
  chipStyle = CHIP_TYPES.default,
  chips,
  label,
  leadingNudgerLabel,
  stickyChip,
  trailingNudgerLabel,
}: RailChipGroupProps & InternalProps) => {
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  const stickyChipContainerClassnames = getClassName(
    'bpk-sticky-chip-container',
    `bpk-sticky-chip-container--${chipStyle}`,
  );

  return (
    <>
      <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
        <Nudger position={POSITION.leading} ariaLabel={leadingNudgerLabel} chipStyle={chipStyle} scrollContainerRef={scrollContainerRef} />
      </BpkBreakpoint>
      {stickyChip &&
        <div className={stickyChipContainerClassnames}>
          <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
            {(isDesktop) =>
              <Chip chipItem={({
                role: 'button',
                component: isDesktop ? CHIP_COMPONENT.selectable : CHIP_COMPONENT.icon,
                leadingAccessoryView: <FilterIconSm />,
                ...stickyChip,
              })} chipStyle={chipStyle} ariaMultiselectable={ariaMultiselectable} chipIndex={-1} />
            }
          </BpkBreakpoint>
        </div>
      }
      <BpkMobileScrollContainer
        scrollerRef={(el: HTMLElement) => { scrollContainerRef.current = el }}
      >
        <ChipGroupContent ariaLabel={ariaLabel}
          ariaMultiselectable={ariaMultiselectable}
          chipGroupClassNames={chipGroupClassNames}
          chipStyle={chipStyle}
          chips={chips}
          label={label} />
      </BpkMobileScrollContainer>
      <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
        <Nudger position={POSITION.trailing} ariaLabel={trailingNudgerLabel} chipStyle={chipStyle} scrollContainerRef={scrollContainerRef} />
      </BpkBreakpoint>
    </>
  );
};

const WrapChipGroup = ({
  ariaLabel,
  ariaMultiselectable = true,
  chipGroupClassNames,
  chipStyle = CHIP_TYPES.default,
  chips,
  label,
}: WrapChipGroupProps & InternalProps) =>
  <ChipGroupContent ariaLabel={ariaLabel}
    ariaMultiselectable={ariaMultiselectable}
    chipGroupClassNames={chipGroupClassNames}
    chipStyle={chipStyle}
    chips={chips}
    label={label} />;

const BpkMultiSelectChipGroup = (props: ChipGroupProps) => {
  const { type } = props;
  const containerClassnames = getClassName('bpk-chip-group-container')
  const chipGroupClassNames = getClassName(
    'bpk-chip-group',
    `bpk-chip-group--${type}`,
  );

  return <div className={containerClassnames}>
    {props.type === CHIP_GROUP_TYPES.rail ? <RailChipGroup chipGroupClassNames={chipGroupClassNames} {...props} /> : <WrapChipGroup chipGroupClassNames={chipGroupClassNames} {...props} />}
  </div>
}

export const BpkMultiSelectChipGroupState = ({ chips, ...rest }: ChipGroupProps) => {
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
  }));

  return <BpkMultiSelectChipGroup chips={statefulChips} {...rest} />
};

export default BpkMultiSelectChipGroup;
