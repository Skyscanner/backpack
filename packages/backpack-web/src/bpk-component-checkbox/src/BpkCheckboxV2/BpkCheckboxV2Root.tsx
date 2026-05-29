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

import { forwardRef } from 'react';
import type { ReactNode } from 'react';

import { Checkbox } from '@ark-ui/react';

import { cssModules, getDataComponentAttribute } from '../../../bpk-react-utils';

import STYLES from './BpkCheckboxV2.module.scss';

const getClassName = cssModules(STYLES);

export type BpkCheckboxV2CheckedState = boolean | 'indeterminate';

export type BpkCheckboxV2RootProps = {
  children: ReactNode;
  checked?: BpkCheckboxV2CheckedState;
  'data-testid'?: string;
  defaultChecked?: BpkCheckboxV2CheckedState;
  disabled?: boolean;
  id?: string;
  invalid?: boolean;
  name?: string;
  onCheckedChange?: (checked: BpkCheckboxV2CheckedState) => void;
  required?: boolean;
  value?: string;
};

const BpkCheckboxV2Root = forwardRef<HTMLLabelElement, BpkCheckboxV2RootProps>(
  (
    {
      checked,
      children,
      'data-testid': dataTestId,
      defaultChecked,
      disabled = false,
      id,
      invalid = false,
      name,
      onCheckedChange,
      required = false,
      value,
    },
    ref,
  ) => (
    <Checkbox.Root
      ref={ref}
      className={getClassName('bpk-checkbox-v2')}
      checked={checked}
      data-testid={dataTestId}
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
  ),
);

BpkCheckboxV2Root.displayName = 'BpkCheckboxV2Root';

export default BpkCheckboxV2Root;
