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
import { useMemo } from 'react';

import { CheckboxRoot } from '@ark-ui/react/checkbox';

import { cssModules } from '../../../bpk-react-utils';

import { CheckboxCardContext } from './CheckboxCardContext';
import { CHECKBOX_CARD_VARIANTS, CHECKBOX_CARD_RADIUS, CHECKBOX_CARD_SIZES } from './common-types';

import type { CheckboxCardVariant, CheckboxCardRadius, CheckboxCardSize } from './common-types';

import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

export type RootProps = {
  /**
   * Children components (HiddenInput, Content, slots, etc.)
   */
  children: ReactNode;

  /**
   * Controlled checked state.
   * When provided, component operates in controlled mode.
   */
  checked?: boolean;

  /**
   * Default checked state for uncontrolled mode.
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Callback invoked when checked state changes.
   * @param checked - New checked state
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * Whether the checkbox card is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the checkbox is required.
   * @default false
   */
  required?: boolean;

  /**
   * Form name attribute.
   */
  name?: string;

  /**
   * Form value attribute.
   */
  value?: string;

  /**
   * Visual variant based on background context.
   * @default "onCanvasDefault"
   */
  variant?: CheckboxCardVariant;

  /**
   * Border radius style.
   * @default "rounded"
   */
  radius?: CheckboxCardRadius;

  /**
   * Size variant controlling card padding density.
   * @default "md"
   */
  size?: CheckboxCardSize;

  /**
   * Custom width for the card. Accepts CSS values (e.g., "10rem", "100%", "auto").
   */
  width?: string;

  /**
   * Custom height for the card. Accepts CSS values (e.g., "9.375rem", "auto").
   */
  height?: string;

  /**
   * ARIA label for accessibility.
   * Provide if no visible label is present.
   */
  'aria-label'?: string;

  /**
   * ID of element that labels this component.
   */
  'aria-labelledby'?: string;

  /**
   * ID of element that describes this component.
   */
  'aria-describedby'?: string;
};

/**
 * BpkCheckboxCard.Root - Root container for checkbox card compound component.
 *
 * Built on Ark UI's CheckboxRoot which renders as a <label> element, providing
 * built-in accessibility, keyboard navigation, and form integration.
 *
 * @example Controlled mode
 * <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
 *   <BpkCheckboxCard.HiddenInput />
 *   <BpkCheckboxCard.Content>
 *     <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 *
 * @example Uncontrolled mode
 * <BpkCheckboxCard.Root defaultChecked={false}>
 *   <BpkCheckboxCard.HiddenInput />
 *   <BpkCheckboxCard.Content>
 *     <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 *
 * @returns {JSX.Element} The rendered checkbox card root element.
 */

export function Root({
  'aria-describedby': ariaDescribedby,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  checked,
  children,
  defaultChecked,
  disabled = false,
  height,
  name,
  onCheckedChange,
  radius = CHECKBOX_CARD_RADIUS.rounded,
  required = false,
  size = CHECKBOX_CARD_SIZES.md,
  value,
  variant = CHECKBOX_CARD_VARIANTS.onCanvasDefault,
  width,
}: RootProps) {
  const contextValue = useMemo(
    () => ({ variant, radius, size }),
    [variant, radius, size],
  );

  const customStyles: CSSProperties = useMemo(() => {
    const styles: CSSProperties = {};
    if (width !== undefined) styles.width = width;
    if (height !== undefined) styles.height = height;
    return styles;
  }, [width, height]);

  return (
    <CheckboxCardContext.Provider value={contextValue}>
      <CheckboxRoot
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={(details) => onCheckedChange?.(details.checked as boolean)}
        disabled={disabled}
        name={name}
        value={value}
        required={required}
        asChild
      >
        <label
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          className={getClassName(
            'bpk-checkbox-card-root',
            `bpk-checkbox-card-root--${variant}`,
            `bpk-checkbox-card-root--radius-${radius}`,
          )}
          style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
        >
          {children}
        </label>
      </CheckboxRoot>
    </CheckboxCardContext.Provider>
  );
}
