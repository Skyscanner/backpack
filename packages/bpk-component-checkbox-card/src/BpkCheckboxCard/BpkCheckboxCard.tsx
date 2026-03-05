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

import BpkText, { TEXT_STYLES } from '../../../bpk-component-text';
import { cssModules } from '../../../bpk-react-utils';

import { Root } from './BpkCheckboxCardRoot';
import { useCheckboxCardContext } from './CheckboxCardContext';

import type { TextStyle } from '../../../bpk-component-text/src/BpkText';

import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

// ─── Control ─────────────────────────────────────────────────────────────────

/**
 * BpkCheckboxCard.Control - Hidden checkbox input for form submission
 *
 * Renders a hidden checkbox input that maintains form state.
 * Accessibility (role, aria-checked, keyboard) is handled by the Root div.
 * The input is aria-hidden so screen readers interact with the Root instead.
 */

function Control() {
  const { checked, disabled, name, required, value } = useCheckboxCardContext();

  return (
    <input
      type="checkbox"
      className={getClassName('bpk-checkbox-card-control')}
      checked={checked}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      aria-hidden
      tabIndex={-1}
      onChange={() => {}}
    />
  );
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
  const { size } = useCheckboxCardContext();

  return (
    <div className={getClassName('bpk-checkbox-card-content', `bpk-checkbox-card-content--size-${size}`)}>
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
 * Wired to Root via aria-labelledby for accessibility.
 */

function Label({ children, lineClamp = 2, textStyle = TEXT_STYLES.heading5 }: LabelProps) {
  const { labelId } = useCheckboxCardContext();

  return (
    <div
      className={getClassName('bpk-checkbox-card-label')}
      style={{ '--bpk-label-line-clamp': lineClamp } as CSSProperties}
    >
      <BpkText id={labelId} textStyle={textStyle} tagName="span">
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
 * Wired to Root via aria-describedby for accessibility.
 */

function Description({ children, lineClamp = 3, textStyle = TEXT_STYLES.bodyDefault }: DescriptionProps) {
  const { descriptionId } = useCheckboxCardContext();

  return (
    <div
      className={getClassName('bpk-checkbox-card-description')}
      style={{ '--bpk-description-line-clamp': lineClamp } as CSSProperties}
    >
      <BpkText id={descriptionId} textStyle={textStyle} tagName="span">
        {children}
      </BpkText>
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
 * The visual state is driven entirely by the parent Root's CSS modifier classes.
 */

function Indicator(_props: IndicatorProps = {}) {
  return <div className={getClassName('bpk-checkbox-card-indicator')} aria-hidden />;
}

// ─── Compound Component ───────────────────────────────────────────────────────

/**
 * BpkCheckboxCard - Compound component for selectable cards.
 *
 * @example Standard layout
 * <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
 *   <BpkCheckboxCard.Control />
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
 *   <BpkCheckboxCard.Control />
 *   <BpkCheckboxCard.Indicator />
 *   <BpkCheckboxCard.Content>
 *     <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 */
const BpkCheckboxCard = Object.assign(Root, {
  Root,
  Control,
  Content,
  Indicator,
  Label,
  Description,
});

export { BpkCheckboxCard };
export default BpkCheckboxCard;

export type { RootProps, RootProps as BpkCheckboxCardRootProps } from './BpkCheckboxCardRoot';
export type { ContentProps as BpkCheckboxCardContentProps };
export type { LabelProps as BpkCheckboxCardLabelProps };
export type { DescriptionProps as BpkCheckboxCardDescriptionProps };

export { useCheckboxCardContext } from './CheckboxCardContext';
export type { CheckboxCardContextValue } from './CheckboxCardContext';

export * from './common-types';
