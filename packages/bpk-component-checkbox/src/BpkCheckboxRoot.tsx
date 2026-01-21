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

const BpkCheckboxRoot = ({
  children,
  className = null,
  disabled = false,
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

  return (
    <ArkCheckbox.Root
      // eslint-disable-next-line @skyscanner/rules/forbid-component-props
      className={classNames}
      disabled={disabled}
      {...(rest as any)}
    >
      {children}
    </ArkCheckbox.Root>
  );
};

export default BpkCheckboxRoot;
