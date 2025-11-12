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

import STYLES from './BpkCheckbox.module.scss';

const getClassName = cssModules(STYLES);

type NativeInputProps = React.InputHTMLAttributes<HTMLInputElement>;

type Props = Omit<NativeInputProps, 'type' | 'className'> & {
  name: string;
  label: ReactNode;
  required?: boolean;
  disabled?: boolean;
  white?: boolean;
  className?: string | null;
  smallLabel?: boolean;
  valid?: boolean | null;
  /**
   * The indeterminate prop is only a visual clue, it does not affect the checked state of the checkbox. If `indeterminate` is flagged then the checkbox will be displayed with a minus sign in the box.  This is used when there is a checkbox group and the parent displays this state when not all child checkboxes are selected.
   */
  indeterminate?: boolean;
};

const BpkCheckbox = ({
  checked = false,
  className = null,
  disabled = false,
  indeterminate = false,
  label,
  name,
  required = false,
  smallLabel = false,
  valid = null,
  white = false,
  ...rest
}: Props) => {
  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  const classNames: string = getClassName(
    'bpk-checkbox',
    white && 'bpk-checkbox--white',
    disabled && 'bpk-checkbox--disabled',
    white && disabled && 'bpk-checkbox--disabled--white',
    isInvalid && 'bpk-checkbox--invalid',
    className,
  );
  const labelClassNames: string = getClassName(
    'bpk-checkbox__label',
    smallLabel && 'bpk-checkbox__label--small',
  );
  const inputClasses: string = getClassName(
    'bpk-checkbox__input',
    white && 'bpk-checkbox__input-white',
    indeterminate && 'bpk-checkbox__input-indeterminate',
  );

  return (
    <label className={classNames}>
      <input
        type="checkbox"
        className={inputClasses}
        name={name}
        disabled={disabled}
        aria-label={typeof label === 'string' ? label : undefined}
        aria-invalid={isInvalid}
        data-indeterminate={indeterminate}
        ref={(e) => {
          if (e) {
            e.indeterminate = indeterminate;
          }
        }}
        checked={checked}
        {...rest}
      />

      <span className={labelClassNames} aria-hidden="true">
        {label}
        {!disabled && required && (
          <span className={getClassName('bpk-checkbox__asterisk')}>*</span>
        )}
      </span>
    </label>
  );
};

export default BpkCheckbox;


