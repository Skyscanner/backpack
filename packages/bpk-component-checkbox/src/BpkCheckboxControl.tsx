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

import BpkCheckboxIndicator from './BpkCheckboxIndicator';

import type { BpkCheckboxControlProps } from './common-types';

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

const BpkCheckboxControl = ({
  children,
  className,
  ...rest
}: BpkCheckboxControlProps) => {
  const classNames = getClassName('bpk-checkbox__control', className);

  return (
    // eslint-disable-next-line @skyscanner/rules/forbid-component-props
    <ArkCheckbox.Control className={classNames} {...rest}>
      {children || <BpkCheckboxIndicator />}
    </ArkCheckbox.Control>
  );
};

export default BpkCheckboxControl;
