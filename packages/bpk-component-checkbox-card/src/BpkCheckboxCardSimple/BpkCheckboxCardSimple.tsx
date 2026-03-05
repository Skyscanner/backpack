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

import type { ReactElement, ReactNode } from 'react';

import { BpkCheckboxCard } from '../BpkCheckboxCard';

import type { CheckboxCardVariant, CheckboxCardRadius } from '../BpkCheckboxCard/common-types';

export type CheckboxCardIndicatorPlacement = 'start' | 'end';

export type BpkCheckboxCardSimpleProps = {
  /**
   * Whether the checkbox card is selected
   */
  checked: boolean;

  /**
   * Callback invoked when selection state changes
   * @param checked - New checked state
   */
  onChange: (checked: boolean) => void;

  /**
   * Primary text label
   */
  label?: string;

  /**
   * Secondary descriptive text
   */
  description?: string;

  /**
   * Backpack icon component
   */
  icon?: ReactElement;

  /**
   * Image URL
   */
  image?: string;

  /**
   * Price content — pass a <BpkPrice /> component for correct styling.
   * A plain string renders as unstyled text.
   *
   * @example
   * price={<BpkPrice price="£85" />}
   */
  price?: ReactNode;

  /**
   * Whether the card is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Visual variant based on background context
   * @default "onCanvasDefault"
   */
  variant?: CheckboxCardVariant;

  /**
   * Border radius style
   * @default "rounded"
   */
  radius?: CheckboxCardRadius;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;

  /**
   * Form name attribute
   */
  name?: string;

  /**
   * Form value attribute
   */
  value?: string;

  /**
   * Custom width
   */
  width?: string | number;

  /**
   * Custom height
   */
  height?: string | number;

  /**
   * Visual indicator element to render.
   * Pass null to explicitly hide it, or omit to show nothing.
   * Pass <BpkCheckboxCard.Indicator /> to use the default visual indicator.
   */
  indicator?: ReactNode | null;

  /**
   * Where to render the indicator relative to the card content.
   * - 'start': indicator before the content (top-left area)
   * - 'end': indicator after the content (default, top-right corner via CSS)
   * @default "end"
   */
  indicatorPlacement?: CheckboxCardIndicatorPlacement;

  /**
   * Additional content rendered below the card's main content area.
   * Useful for supplementary information like badges or metadata.
   */
  addon?: ReactNode;
};

/**
 * BpkCheckboxCardSimple - Simplified Props-based API (Backward Compatible)
 *
 * This component provides a simplified, props-based API for common use cases.
 * It's a wrapper around the new compound component API, maintaining backward
 * compatibility with existing code.
 *
 * For more complex layouts and full flexibility, use the compound component
 * API directly (BpkCheckboxCard.Root, BpkCheckboxCard.Content, etc.).
 *
 * @example
 * <BpkCheckboxCardSimple
 *   checked={selected}
 *   onChange={setSelected}
 *   label="City Centre"
 *   icon={<LandmarkIcon />}
 *   price="£85"
 *   variant="onCanvasDefault"
 * />
 *
 * @returns {JSX.Element} Rendered checkbox card using the simple props API.
 */
export function BpkCheckboxCardSimple({
  addon,
  ariaLabel,
  checked,
  description,
  disabled,
  height,
  icon,
  image,
  indicator,
  indicatorPlacement = 'end',
  label,
  name,
  onChange,
  price,
  radius,
  value,
  variant,
  width,
}: BpkCheckboxCardSimpleProps) {
  return (
    <BpkCheckboxCard.Root
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      variant={variant}
      radius={radius}
      name={name}
      value={value}
      width={width}
      height={height}
      aria-label={ariaLabel}
    >
      <BpkCheckboxCard.Control />
      {indicatorPlacement === 'start' && indicator}
      <BpkCheckboxCard.Content>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bpk-spacing-sm)', width: '100%' }}>
          {icon}
          {image && <img src={image} alt="" style={{ width: '100%' }} />}
          {(label || description) && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--bpk-spacing-xs)', width: '100%' }}>
              {label && <BpkCheckboxCard.Label>{label}</BpkCheckboxCard.Label>}
              {description && (
                <BpkCheckboxCard.Description>{description}</BpkCheckboxCard.Description>
              )}
            </div>
          )}
          {price}
        </div>
      </BpkCheckboxCard.Content>
      {indicatorPlacement === 'end' && indicator}
      {addon}
    </BpkCheckboxCard.Root>
  );
}
