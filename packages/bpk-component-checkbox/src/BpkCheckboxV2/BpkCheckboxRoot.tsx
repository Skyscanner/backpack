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

import { Checkbox, type CheckboxCheckedChangeDetails } from '@ark-ui/react';

import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

export type BpkCheckedState = boolean | 'indeterminate';

export type BpkCheckboxRootProps = {
  children: ReactNode;
  checked?: BpkCheckedState;
  defaultChecked?: BpkCheckedState;
  disabled?: boolean;
  id?: string;
  invalid?: boolean;
  name?: string;
  onCheckedChange?: (checked: BpkCheckedState) => void;
  required?: boolean;
  value?: string;
};

const BpkCheckboxRoot = ({
  checked,
  children,
  defaultChecked,
  disabled = false,
  id,
  invalid = false,
  name,
  onCheckedChange,
  required = false,
  value,
}: BpkCheckboxRootProps) => (
  <Checkbox.Root
    className={getClassName('bpk-checkbox-v2')}
    checked={checked}
    defaultChecked={defaultChecked}
    disabled={disabled}
    id={id}
    invalid={invalid}
    name={name}
    onCheckedChange={(details: CheckboxCheckedChangeDetails) => onCheckedChange?.(details.checked)}
    required={required}
    value={value}
    {...getDataComponentAttribute('CheckboxV2')}
  >
    {children}
  </Checkbox.Root>
);

export default BpkCheckboxRoot;
