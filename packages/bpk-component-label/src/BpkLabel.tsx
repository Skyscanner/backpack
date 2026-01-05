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

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkLabel.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  valid?: boolean;
  required?: boolean;
  white?: boolean;
  [rest: string]: any; // for spreading additional HTML attributes
};

const BpkLabel = ({
  children,
  className = undefined,
  disabled = false,
  required = false,
  valid = undefined,
  white = false,
  ...rest
}: Props) => {
  const invalid = valid === false;

  const classNames = getClassName(
    'bpk-label',
    white && 'bpk-label--white',
    invalid && 'bpk-label--invalid',
    disabled && 'bpk-label--disabled',
    white && disabled && 'bpk-label--disabled--white',
    className,
  );

  return (
    <label className={classNames} {...rest}>
      {children}
      {!disabled && required && (
        <span className={getClassName('bpk-label__asterisk')}>*</span>
      )}
    </label>
  );
};

export default BpkLabel;
