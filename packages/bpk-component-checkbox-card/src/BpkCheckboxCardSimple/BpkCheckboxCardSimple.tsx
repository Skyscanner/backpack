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
   * Price information (BpkPrice component or formatted string)
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
 */
export function BpkCheckboxCardSimple({
  checked,
  onChange,
  label,
  description,
  icon,
  image,
  price,
  disabled,
  variant,
  radius,
  ariaLabel,
  name,
  value,
  width,
  height,
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
      <BpkCheckboxCard.Content orientation="vertical" align="center" gap="md">
        {icon && <BpkCheckboxCard.Icon>{icon}</BpkCheckboxCard.Icon>}
        {image && <BpkCheckboxCard.Image src={image} alt="" />}
        {(label || description) && (
          <BpkCheckboxCard.Stack gap="sm" align="center">
            {label && <BpkCheckboxCard.Label>{label}</BpkCheckboxCard.Label>}
            {description && (
              <BpkCheckboxCard.Description>{description}</BpkCheckboxCard.Description>
            )}
          </BpkCheckboxCard.Stack>
        )}
        {price && <BpkCheckboxCard.Price>{price}</BpkCheckboxCard.Price>}
      </BpkCheckboxCard.Content>
      <BpkCheckboxCard.Indicator />
    </BpkCheckboxCard.Root>
  );
}
