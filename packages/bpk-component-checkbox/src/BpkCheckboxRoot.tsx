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

import { Checkbox as ArkCheckbox } from '@ark-ui/react';

import { cssModules } from '../../bpk-react-utils';

import type { BpkCheckboxRootProps } from './common-types';

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkCheckboxRoot is the root container component for a checkbox.
 * This component wraps Ark UI's Checkbox.Root and provides Backpack-specific styling and behaviour.
 *
 * @param {BpkCheckboxRootProps} props - Component props
 * @param {ReactNode} props.children - Sub-components (Control, Label, HiddenInput)
 * @param {string | null} [props.className] - Additional CSS classes
 * @param {boolean} [props.disabled=false] - Whether the checkbox is disabled
 * @param {boolean} [props.indeterminate=false] - Whether the checkbox is in indeterminate state
 * @param {boolean | null} [props.valid=null] - Validation state (false for invalid)
 * @param {boolean} [props.white=false] - Whether to use white variant styling
 * @returns {JSX.Element} The root checkbox container
 *
 * @example
 * ```jsx
 * <BpkCheckboxRoot>
 *   <BpkCheckboxControl />
 *   <BpkCheckboxLabel>Label text</BpkCheckboxLabel>
 *   <BpkCheckboxHiddenInput />
 * </BpkCheckboxRoot>
 * ```
 */
const BpkCheckboxRoot = ({
  children,
  className = null,
  disabled = false,
  indeterminate = false,
  valid = null,
  white = false,
  ...rest
}: BpkCheckboxRootProps) => {
  const isInvalid = valid === false;

  const classNames = getClassName(
    'bpk-checkbox',
    white && 'bpk-checkbox--white',
    disabled && 'bpk-checkbox--disabled',
    white && disabled && 'bpk-checkbox--disabled--white',
    isInvalid && 'bpk-checkbox--invalid',
    className,
  );

  // Extract checked from rest to avoid conflicts
  const { checked: _, ...restWithoutChecked } = rest as any;

  // Ark UI uses 'checked' prop with 'indeterminate' value for indeterminate state
  const checkedState = indeterminate ? 'indeterminate' : rest.checked;

  return (
    <ArkCheckbox.Root
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props
      className={classNames}
      disabled={disabled}
      checked={checkedState}
      {...restWithoutChecked}
    >
      {children}
    </ArkCheckbox.Root>
  );
};

export default BpkCheckboxRoot;
