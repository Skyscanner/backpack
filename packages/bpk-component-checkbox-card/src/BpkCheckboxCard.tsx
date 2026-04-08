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

import type { CSSProperties, ReactNode } from 'react';

import { CheckboxHiddenInput } from '@ark-ui/react/checkbox';

import { withButtonAlignment } from '../../bpk-component-icon';
import TickCircleIcon from '../../bpk-component-icon/sm/tick-circle';
import { BpkSpinner, SPINNER_TYPES } from '../../bpk-component-spinner';
import BpkText, { TEXT_COLORS, TEXT_STYLES } from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import { Root } from './BpkCheckboxCardRoot';
import { useCheckboxCardContext } from './CheckboxCardContext';

import type { TextStyle } from '../../bpk-component-text/src/BpkText';

import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);
const AlignedTickCircleIcon = withButtonAlignment(TickCircleIcon);

// ─── HiddenInput ─────────────────────────────────────────────────────────────

/**
 * BpkCheckboxCard.HiddenInput - Accessible hidden checkbox input for form submission.
 *
 * Renders a visually hidden <input type="checkbox"> managed by Ark UI.
 * Handles name, value, checked state, required, and disabled automatically.
 * Must be placed inside BpkCheckboxCard.Root.
 *
 * @returns {JSX.Element} The hidden checkbox input element.
 */
function HiddenInput() {
  return <CheckboxHiddenInput />;
}

// ─── Content ─────────────────────────────────────────────────────────────────

export type ContentProps = {
  /**
   * Child components (slots, Stack layout primitives, etc.)
   * Optional - can be empty for minimal card displays
   */
  children?: ReactNode;
};

/**
 * BpkCheckboxCard.Content - Main content container
 *
 * Provides a simple wrapper container for organising checkbox card content.
 * Use BpkVStack / BpkHStack for layout control inside Content.
 */

function Content({ children }: ContentProps) {
  return (
    <div className={getClassName('bpk-checkbox-card-content')}>
      {children}
    </div>
  );
}

// ─── Label ───────────────────────────────────────────────────────────────────

export type LabelProps = {
  /** Label text content (plain string only) */
  children: string;
  /** Text style from Backpack typography system. @default "heading-5" */
  textStyle?: TextStyle;
  /** Maximum number of lines before truncation. @default 2 */
  lineClamp?: number;
};

/**
 * BpkCheckboxCard.Label - Primary label slot component
 *
 * Displays the primary text label using BpkText.
 * Automatically truncates with ellipsis after the specified number of lines.
 * Accessibility is provided by the wrapping <label> element from Ark UI's CheckboxRoot.
 */

function Label({ children, lineClamp = 2, textStyle = TEXT_STYLES.heading5 }: LabelProps) {
  return (
    <div
      className={getClassName('bpk-checkbox-card-label')}
      style={{ '--bpk-label-line-clamp': lineClamp } as CSSProperties}
    >
      <BpkText textStyle={textStyle} tagName="span">
        {children}
      </BpkText>
    </div>
  );
}

// ─── Description ─────────────────────────────────────────────────────────────

export type DescriptionProps = {
  /** Description text content (plain string only) */
  children: string;
  /** Text style from Backpack typography system. @default "body-default" */
  textStyle?: TextStyle;
  /** Maximum number of lines before truncation. @default 3 */
  lineClamp?: number;
};

/**
 * BpkCheckboxCard.Description - Secondary description slot component
 *
 * Displays secondary descriptive text using BpkText.
 * Automatically truncates with ellipsis after the specified number of lines.
 */

function Description({ children, lineClamp = 3, textStyle = TEXT_STYLES.bodyDefault }: DescriptionProps) {
  return (
    <div
      className={getClassName('bpk-checkbox-card-description')}
      style={{ '--bpk-description-line-clamp': lineClamp } as CSSProperties}
    >
      <BpkText textStyle={textStyle} tagName="span">
        {children}
      </BpkText>
    </div>
  );
}

// ─── Price (cars variant only) ────────────────────────────────────────────────

export type PriceProps = {
  /** Price string, e.g. "£35" */
  price: string;
  /** Leading text before the price, e.g. "from". @default "from" */
  leadingText?: string;
};

/**
 * BpkCheckboxCard.Price - Cars-specific price slot.
 *
 * Reads `loading` from context automatically:
 * - loading=true  → shows "{leadingText}" + spinner
 * - loading=false → shows "{leadingText} {price}" as secondary description text
 *
 * Intended for use with variant="cars" only.
 */

function Price({ leadingText = 'from', price }: PriceProps) {
  const { loading } = useCheckboxCardContext();

  return (
    <div className={getClassName('bpk-checkbox-card-price')}>
      <BpkText textStyle={TEXT_STYLES.footnote} tagName="span" color={TEXT_COLORS.textSecondary}>
        {leadingText}
      </BpkText>
      {loading ? (
        <BpkSpinner type={SPINNER_TYPES.primary} small />
      ) : (
        <BpkText textStyle={TEXT_STYLES.footnote} tagName="span" color={TEXT_COLORS.textSecondary}>
          {price}
        </BpkText>
      )}
    </div>
  );
}

// ─── Indicator ───────────────────────────────────────────────────────────────

export type IndicatorProps = Record<string, never>;

/**
 * BpkCheckboxCard.Indicator - Visual corner indicator
 *
 * Renders a circular checkbox indicator in the top-right corner of the card.
 * Empty circle when unchecked; filled with a checkmark when checked.
 * The visual state is driven by Ark UI's data-state attribute on the root <label>.
 */

function Indicator(_props: IndicatorProps = {}) {
  return (
    <div className={getClassName('bpk-checkbox-card-indicator')} aria-hidden>
      <AlignedTickCircleIcon />
    </div>
  );
}

// ─── Compound Component ───────────────────────────────────────────────────────

/**
 * BpkCheckboxCard - Compound component for selectable cards.
 *
 * Built on Ark UI's Checkbox primitive — the Root renders as a <label> element,
 * providing native accessibility, keyboard navigation, and form integration.
 *
 * @example Standard layout
 * <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
 *   <BpkCheckboxCard.HiddenInput />
 *   <BpkCheckboxCard.Content>
 *     <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
 *       <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *       <BpkPrice price="£85" />
 *     </BpkVStack>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 *
 * @example With corner indicator
 * <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
 *   <BpkCheckboxCard.HiddenInput />
 *   <BpkCheckboxCard.Indicator />
 *   <BpkCheckboxCard.Content>
 *     <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 */
const BpkCheckboxCard = Object.assign(Root, {
  Root,
  HiddenInput,
  Content,
  Indicator,
  Label,
  Description,
  Price,
});

export { BpkCheckboxCard };
export default BpkCheckboxCard;

export type { RootProps, RootProps as BpkCheckboxCardRootProps } from './BpkCheckboxCardRoot';
export type { ContentProps as BpkCheckboxCardContentProps };
export type { LabelProps as BpkCheckboxCardLabelProps };
export type { DescriptionProps as BpkCheckboxCardDescriptionProps };
export type { PriceProps as BpkCheckboxCardPriceProps };

export { useCheckboxCardContext } from './CheckboxCardContext';
export type { CheckboxCardContextValue } from './CheckboxCardContext';

export * from './common-types';
