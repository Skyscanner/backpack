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
import { useRef, useState, useEffect } from 'react';

import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';
import BpkSelectableChip, {
  BpkDismissibleChip,
  BpkIconChip,
  BpkDropdownChip,
  CHIP_TYPES,
} from '../../bpk-component-chip';
import FilterIconSm from '../../bpk-component-icon/sm/filter';
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
};

export type ChipGroupType =
  (typeof CHIP_GROUP_TYPES)[keyof typeof CHIP_GROUP_TYPES];
export type ChipStyleType = (typeof CHIP_TYPES)[keyof typeof CHIP_TYPES];
export type ChipComponentType =
  (typeof CHIP_COMPONENT)[keyof typeof CHIP_COMPONENT];

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

type CommonProps = {
  label?: string;
  ariaLabel?: string;
  chipStyle?: ChipStyleType;
  chips: ChipItem[];
  ariaMultiselectable?: boolean;
};

type RailChipGroupProps = {
  stickyChip?: ChipItem;
  leadingNudgerLabel: string;
  trailingNudgerLabel: string;
} & CommonProps;

type WrapChipGroupProps = {} & CommonProps;

export type MultiSelectProps =
  | (RailChipGroupProps & { type: typeof CHIP_GROUP_TYPES.rail })
  | (WrapChipGroupProps & { type: typeof CHIP_GROUP_TYPES.wrap });

const Chip = ({
  ariaMultiselectable,
  chipIndex,
  chipItem,
  chipStyle,
}: {
  chipIndex: number;
  chipItem: ChipItem;
  chipStyle: ChipStyleType;
  ariaMultiselectable: boolean;
}) => {
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
};

const ChipGroupContent = ({
  ariaLabel,
  ariaMultiselectable,
  chipGroupClassNames,
  chipStyle,
  chips,
  label,
}: {
  chipGroupClassNames: string;
  ariaMultiselectable: boolean;
  ariaLabel?: string;
  label?: string;
  chips: ChipItem[];
  chipStyle: ChipStyleType;
}) => (
  <fieldset
    className={chipGroupClassNames}
    role={ariaMultiselectable ? 'group' : 'radiogroup'}
  >
    {ariaLabel && <legend className="visually-hidden">{ariaLabel}</legend>}
    {label && (
      <BpkText textStyle={TEXT_STYLES.footnote} aria-hidden>
        {label}
      </BpkText>
    )}
    {chips.map((chip, index) => (
      <Chip
        key={chip.text}
        chipItem={chip}
        chipStyle={chipStyle}
        ariaMultiselectable={ariaMultiselectable}
        chipIndex={index}
      />
    ))}
  </fieldset>
);

const RailChipGroup = ({
  ariaLabel,
  ariaMultiselectable = true,
  chipStyle = CHIP_TYPES.default,
  chips,
  label,
  leadingNudgerLabel,
  stickyChip,
  trailingNudgerLabel,
}: RailChipGroupProps) => {
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const [isAtStart, setIsAtStart] = useState(true);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) {
      return () => {};
    }

    const handleScroll = () => {
      const currentScrollLeft = el.scrollLeft;
      setIsAtStart(currentScrollLeft <= 0);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const stickyChipContainerClassnames = getClassName(
    'bpk-sticky-chip-container',
    `bpk-sticky-chip-container--${chipStyle}`,
  );
  const chipGroupClassNames = getClassName(
    'bpk-chip-group',
    'bpk-chip-group--rail',
  );

  return (
    <>
      <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
        <Nudger
          position={POSITION.leading}
          ariaLabel={leadingNudgerLabel}
          chipStyle={chipStyle}
          scrollContainerRef={scrollContainerRef}
        />
      </BpkBreakpoint>
      {stickyChip && (
        <div className={stickyChipContainerClassnames}>
          <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
            {(isDesktop) => {
              let chipComponent;
              if (isDesktop || isAtStart) {
                chipComponent = CHIP_COMPONENT.selectable;
              } else {
                chipComponent = CHIP_COMPONENT.icon;
              }
              return (
                <Chip
                  chipItem={{
                    ...stickyChip,
                    role: 'button',
                    component: chipComponent,
                    leadingAccessoryView: <FilterIconSm />,
                  }}
                  chipStyle={chipStyle}
                  ariaMultiselectable={ariaMultiselectable}
                  chipIndex={-1}
                />
              );
            }}
          </BpkBreakpoint>
        </div>
      )}
      <BpkMobileScrollContainer
        scrollerRef={(el: HTMLElement | null) => {
          scrollContainerRef.current = el;
        }}
      >
        <ChipGroupContent
          ariaLabel={ariaLabel}
          ariaMultiselectable={ariaMultiselectable}
          chipGroupClassNames={chipGroupClassNames}
          chipStyle={chipStyle}
          chips={chips}
          label={label}
        />
      </BpkMobileScrollContainer>
      <BpkBreakpoint query={BREAKPOINTS.ABOVE_TABLET}>
        <Nudger
          position={POSITION.trailing}
          ariaLabel={trailingNudgerLabel}
          chipStyle={chipStyle}
          scrollContainerRef={scrollContainerRef}
        />
      </BpkBreakpoint>
    </>
  );
};

const WrapChipGroup = ({
  ariaLabel,
  ariaMultiselectable = true,
  chipStyle = CHIP_TYPES.default,
  chips,
  label,
}: WrapChipGroupProps) => (
  <ChipGroupContent
    ariaLabel={ariaLabel}
    ariaMultiselectable={ariaMultiselectable}
    chipGroupClassNames={getClassName('bpk-chip-group', 'bpk-chip-group--wrap')}
    chipStyle={chipStyle}
    chips={chips}
    label={label}
  />
);

const BpkMultiSelectChipGroup = (props: MultiSelectProps) => (
  <div className={getClassName('bpk-chip-group-container')}>
    {props.type === CHIP_GROUP_TYPES.rail ? (
      <RailChipGroup {...props} />
    ) : (
      <WrapChipGroup {...props} />
    )}
  </div>
);

export default BpkMultiSelectChipGroup;
