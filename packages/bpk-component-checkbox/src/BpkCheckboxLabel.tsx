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

import type { BpkCheckboxLabelProps } from './common-types';

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkCheckboxLabel is the label element for the checkbox.
 * This component wraps Ark UI's Checkbox.Label and provides Backpack-specific styling.
 *
 * @param {BpkCheckboxLabelProps} props - Component props
 * @param {ReactNode} props.children - Label content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The checkbox label element
 *
 * @example
 * ```jsx
 * <BpkCheckboxLabel>I accept the terms and conditions</BpkCheckboxLabel>
 * ```
 */
const BpkCheckboxLabel = ({
  children,
  className,
  ...rest
}: BpkCheckboxLabelProps) => {
  const classNames = getClassName('bpk-checkbox__label', className);

  return (
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    <ArkCheckbox.Label className={classNames} {...rest}>
      {children}
    </ArkCheckbox.Label>
  );
};

export default BpkCheckboxLabel;
