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

import { Checkbox, useCheckbox } from '@ark-ui/react';

import { cssModules, getDataComponentAttribute, getDocumentDir } from '../../../bpk-react-utils';

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
}: BpkCheckboxV2RootProps) => {
  // Ark omits 'dir' from UseCheckboxProps but the Zag machine accepts it.
  // Since ...props is spread last in useCheckbox(), passing dir here overrides
  // the default from useLocaleContext() without needing LocaleProvider.
  const machineProps = {
    checked,
    defaultChecked,
    disabled,
    id,
    invalid,
    name,
    onCheckedChange: onCheckedChange
      ? (details: { checked: BpkCheckboxV2CheckedState }) =>
          onCheckedChange(details.checked)
      : undefined,
    required,
    value,
    dir: getDocumentDir(),
  };
  const api = useCheckbox(machineProps);

  return (
    <Checkbox.RootProvider
      value={api}
      className={getClassName('bpk-checkbox-v2')}
      {...getDataComponentAttribute('CheckboxV2')}
    >
      {children}
    </Checkbox.RootProvider>
  );
};

export default BpkCheckboxV2Root;
