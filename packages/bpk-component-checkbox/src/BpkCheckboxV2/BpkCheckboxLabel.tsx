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

import { cssModules } from '../../../bpk-react-utils';

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

export type BpkCheckboxLabelProps = {
  children: ReactNode;
};

const BpkCheckboxLabel = ({ children }: BpkCheckboxLabelProps) => (
  <Checkbox.Label className={getClassName('bpk-checkbox-v2__label')}>
    {children}
  </Checkbox.Label>
);

export default BpkCheckboxLabel;
