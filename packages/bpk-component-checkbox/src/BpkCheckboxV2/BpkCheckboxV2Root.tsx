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

import { Checkbox } from '@ark-ui/react/checkbox';

import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import STYLES from './BpkCheckboxV2.module.scss';

const getClassName = cssModules(STYLES);

export type BpkCheckboxV2CheckedState = boolean | 'indeterminate';

export type BpkCheckboxV2RootProps = {
  children: ReactNode;
  checked?: BpkCheckboxV2CheckedState;
  defaultChecked?: BpkCheckboxV2CheckedState;
  disabled?: boolean;
  id?: string;
  invalid?: boolean;
  name?: string;
  onCheckedChange?: (checked: BpkCheckboxV2CheckedState) => void;
  required?: boolean;
  value?: string;
};

const BpkCheckboxV2Root = ({
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
}: BpkCheckboxV2RootProps) => (
  <Checkbox.Root
    className={getClassName('bpk-checkbox-v2')}
    checked={checked}
    defaultChecked={defaultChecked}
    disabled={disabled}
    id={id}
    invalid={invalid}
    name={name}
    onCheckedChange={(details) => onCheckedChange?.(details.checked)}
    required={required}
    value={value}
    {...getDataComponentAttribute('CheckboxV2')}
  >
    {children}
  </Checkbox.Root>
);

export default BpkCheckboxV2Root;
