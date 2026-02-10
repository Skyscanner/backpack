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

import { Checkbox } from '@ark-ui/react/checkbox';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import type { CheckedState } from './common-types';

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

export type BpkCheckboxRootProps = {
  children: ReactNode;
  name?: string;
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  onCheckedChange?: (details: { checked: CheckedState }) => void;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  white?: boolean;
  value?: string;
  id?: string;
  className?: string | null;
};

const BpkCheckboxRoot = forwardRef<HTMLLabelElement, BpkCheckboxRootProps>(
  (
    {
      checked,
      children,
      className = null,
      defaultChecked,
      disabled = false,
      id,
      invalid = false,
      name,
      onCheckedChange,
      required = false,
      value,
      white = false,
    },
    ref,
  ) => {
    const classNames = getClassName(
      'bpk-checkbox',
      white && 'bpk-checkbox--white',
      disabled && 'bpk-checkbox--disabled',
      className,
    );

    return (
      <Checkbox.Root
        ref={ref}
        className={classNames}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        invalid={invalid}
        required={required}
        name={name}
        value={value}
        id={id}
        {...getDataComponentAttribute('Checkbox')}
      >
        {children}
      </Checkbox.Root>
    );
  },
);

BpkCheckboxRoot.displayName = 'BpkCheckboxRoot';

export default BpkCheckboxRoot;
