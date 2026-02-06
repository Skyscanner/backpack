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

import type { CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { useState, useId, useCallback, useMemo } from 'react';

import { cssModules } from '../../../../bpk-react-utils';
import { CHECKBOX_CARD_VARIANTS, CHECKBOX_CARD_RADIUS } from '../common-types';

import { CheckboxCardContext } from './CheckboxCardContext';

import type { CheckboxCardVariant, CheckboxCardRadius } from '../common-types';

import STYLES from '../BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

export type RootProps = {
  /**
   * Children components (Control, Content, slots, etc.)
   */
  children: ReactNode;

  /**
   * Controlled checked state
   * When provided, component operates in controlled mode
   */
  checked?: boolean;

  /**
   * Default checked state for uncontrolled mode
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Callback invoked when checked state changes
   * @param checked - New checked state
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * Whether the checkbox card is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the checkbox is required
   * @default false
   */
  required?: boolean;

  /**
   * Form name attribute
   */
  name?: string;

  /**
   * Form value attribute
   */
  value?: string;

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
   * Custom width for the card
   * Accepts CSS values (e.g., "200px", "100%", "auto") or numeric pixel values
   */
  width?: string | number;

  /**
   * Custom height for the card
   * Accepts CSS values (e.g., "150px", "auto") or numeric pixel values
   */
  height?: string | number;

  /**
   * ARIA label for accessibility
   * Provide if no visible label is present
   */
  'aria-label'?: string;

  /**
   * ID of element that labels this component
   */
  'aria-labelledby'?: string;

  /**
   * ID of element that describes this component
   */
  'aria-describedby'?: string;
};

/**
 * BpkCheckboxCard.Root - Root container for checkbox card compound component
 *
 * Provides context to all child components and manages checkbox state.
 * Can operate in controlled or uncontrolled mode.
 *
 * @example Controlled mode
 * <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
 *   <BpkCheckboxCard.Control />
 *   <BpkCheckboxCard.Content>
 *     <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 *
 * @example Uncontrolled mode
 * <BpkCheckboxCard.Root defaultChecked={false}>
 *   <BpkCheckboxCard.Control />
 *   <BpkCheckboxCard.Content>
 *     <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
 *   </BpkCheckboxCard.Content>
 * </BpkCheckboxCard.Root>
 *
 * @returns {JSX.Element} Rendered checkbox card root container with context.
 */
export function Root({
  'aria-describedby': ariaDescribedby,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  checked: controlledChecked,
  children,
  defaultChecked = false,
  disabled = false,
  height,
  name,
  onCheckedChange,
  radius = CHECKBOX_CARD_RADIUS.rounded,
  required = false,
  value,
  variant = CHECKBOX_CARD_VARIANTS.onCanvasDefault,
  width,
}: RootProps) {
  // Controlled/uncontrolled state management
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked! : internalChecked;

  // Generate unique IDs for ARIA relationships
  const labelId = useId();
  const descriptionId = useId();
  const controlId = useId();

  // Handle checked state changes
  const handleCheckedChange = useCallback(
    (newChecked: boolean) => {
      if (!disabled) {
        if (!isControlled) {
          setInternalChecked(newChecked);
        }
        onCheckedChange?.(newChecked);
      }
    },
    [disabled, isControlled, onCheckedChange]
  );

  // Build CSS class names
  const rootClassName = getClassName(
    'bpk-checkbox-card-root',
    `bpk-checkbox-card-root--${variant}`,
    `bpk-checkbox-card-root--radius-${radius}`,
    checked && 'bpk-checkbox-card-root--checked',
    disabled && 'bpk-checkbox-card-root--disabled'
  );

  // Custom sizing styles
  const customStyles: CSSProperties = useMemo(() => {
    const styles: CSSProperties = {};
    if (width !== undefined) {
      styles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      styles.height = typeof height === 'number' ? `${height}px` : height;
    }
    return styles;
  }, [width, height]);

  // Context value
  const contextValue = useMemo(
    () => ({
      checked,
      disabled,
      variant,
      radius,
      name,
      value,
      onCheckedChange: handleCheckedChange,
      labelId,
      descriptionId,
      controlId,
    }),
    [
      checked,
      disabled,
      variant,
      radius,
      name,
      value,
      handleCheckedChange,
      labelId,
      descriptionId,
      controlId,
    ]
  );

  // Handle click on root container
  const handleClick = useCallback(() => {
    if (!disabled) {
      handleCheckedChange(!checked);
    }
  }, [checked, disabled, handleCheckedChange]);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!disabled && (event.key === ' ' || event.key === 'Enter')) {
        event.preventDefault();
        handleCheckedChange(!checked);
      }
    },
    [checked, disabled, handleCheckedChange]
  );

  return (
    <CheckboxCardContext.Provider value={contextValue}>
      <div
        className={rootClassName}
        style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="checkbox"
        aria-checked={checked}
        aria-required={required || undefined}
        aria-disabled={disabled || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
        tabIndex={disabled ? -1 : 0}
        data-checked={checked || undefined}
        data-disabled={disabled || undefined}
      >
        {children}
      </div>
    </CheckboxCardContext.Provider>
  );
}
