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

import { useEffect, useRef } from 'react';

import { Checkbox as ArkCheckbox, useCheckboxContext } from '@ark-ui/react';

import { cssModules } from '../../bpk-react-utils';

import type { BpkCheckboxHiddenInputProps } from './common-types';

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkCheckboxHiddenInput is the hidden native checkbox input element for form integration.
 * This component wraps Ark UI's Checkbox.HiddenInput and ensures proper form submission.
 *
 * @param {BpkCheckboxHiddenInputProps} props - Component props (includes name, value, etc.)
 * @returns {JSX.Element} The hidden checkbox input element
 *
 * @example
 * ```jsx
 * <BpkCheckboxHiddenInput />
 * ```
 */
const BpkCheckboxHiddenInput = ({
  ...rest
}: BpkCheckboxHiddenInputProps) => {
  const classNames = getClassName('bpk-checkbox__input');
  const checkbox = useCheckboxContext();
  const inputRef = useRef<HTMLInputElement>(null);

  // Set indeterminate property and aria-checked on the native input element
  // The indeterminate property can only be set via JavaScript, not as an HTML attribute
  // We also need to manually set aria-checked="mixed" because browsers don't do this automatically
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = checkbox.indeterminate;
      // Set aria-checked based on state
      if (checkbox.indeterminate) {
        inputRef.current.setAttribute('aria-checked', 'mixed');
      } else {
        // Let the native checkbox handle aria-checked for checked/unchecked states
        inputRef.current.removeAttribute('aria-checked');
      }
    }
  }, [checkbox.indeterminate]);

  return (
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    <ArkCheckbox.HiddenInput ref={inputRef} className={classNames} {...rest} />
  );
};

export default BpkCheckboxHiddenInput;
