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
import { useMemo } from 'react';

import { Checkbox, useCheckbox } from '@ark-ui/react';

import { withButtonAlignment } from '../../bpk-component-icon';
import TickCircleIcon from '../../bpk-component-icon/sm/tick-circle';
import { cssModules, useDocumentDir } from '../../bpk-react-utils';

import { CheckboxCardContext } from './CheckboxCardContext';
import { CHECKBOX_CARD_VARIANTS, CHECKBOX_CARD_RADIUS } from './common-types';

import type { CheckboxCardVariant, CheckboxCardRadius } from './common-types';

import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);
const AlignedTickCircleIcon = withButtonAlignment(TickCircleIcon);

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
   * Whether the card is in a loading state.
   * Non-interactive (cursor not-allowed, clicks blocked) but not visually disabled.
   * @default false
   */
  loading?: boolean;

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
  loading = false,
  name,
  onCheckedChange,
  radius = CHECKBOX_CARD_RADIUS.rounded,
  required = false,
  value,
  variant = CHECKBOX_CARD_VARIANTS.onCanvasDefault,
}: RootProps) {
  const contextValue = useMemo(
    () => ({ variant, radius, loading }),
    [variant, radius, loading],
  );

  // Ark omits 'dir' from UseCheckboxProps but the Zag machine accepts it.
  // Since ...props is spread last in useCheckbox(), passing dir here overrides
  // the default from useLocaleContext() without needing LocaleProvider.
  // useDocumentDir() is reactive — it re-renders when document.dir changes.
  const dir = useDocumentDir();
  const machineProps = {
    checked,
    defaultChecked,
    onCheckedChange: onCheckedChange
      ? (details: { checked: boolean | 'indeterminate' }) =>
          onCheckedChange(details.checked as boolean)
      : undefined,
    disabled: disabled || loading,
    name,
    value,
    required,
    dir,
  };
  const api = useCheckbox(machineProps);

  return (
    <CheckboxCardContext.Provider value={contextValue}>
      <Checkbox.RootProvider value={api} asChild>
        <label
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
          data-loading={loading || undefined}
          className={getClassName(
            'bpk-checkbox-card-root',
            `bpk-checkbox-card-root--${variant}`,
            `bpk-checkbox-card-root--radius-${radius}`,
          )}
        >
          {variant === CHECKBOX_CARD_VARIANTS.cars && (
            <div className={getClassName('bpk-checkbox-card-indicator')} aria-hidden>
              <AlignedTickCircleIcon />
            </div>
          )}
          {children}
        </label>
      </Checkbox.RootProvider>
    </CheckboxCardContext.Provider>
  );
}
