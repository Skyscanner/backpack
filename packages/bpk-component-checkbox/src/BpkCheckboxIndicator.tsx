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

import type { BpkCheckboxIndicatorProps } from './common-types';

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

/**
 * BpkCheckboxIndicator is the visual indicator (checkmark or dash) shown when the checkbox is checked or indeterminate.
 * This component wraps Ark UI's Checkbox.Indicator and provides Backpack-specific styling.
 *
 * @param {BpkCheckboxIndicatorProps} props - Component props
 * @param {ReactNode} [props.children] - Custom indicator content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The checkbox indicator element
 *
 * @example
 * ```jsx
 * <BpkCheckboxIndicator />
 * ```
 */
const BpkCheckboxIndicator = ({
  children,
  className,
  ...rest
}: BpkCheckboxIndicatorProps) => {
  const classNames = getClassName('bpk-checkbox__indicator', className);

  return (
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    <ArkCheckbox.Indicator className={classNames} {...rest}>
      {children}
    </ArkCheckbox.Indicator>
  );
};

export default BpkCheckboxIndicator;
