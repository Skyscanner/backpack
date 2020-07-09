/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkCheckbox.scss';

const getClassName = cssModules(STYLES);

const BpkCheckbox = props => {
  const {
    name,
    label,
    required,
    disabled,
    white,
    className,
    smallLabel,
    valid,
    checked,
    indeterminate,
    ...rest
  } = props;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  const classNames = getClassName(
    'bpk-checkbox',
    white && 'bpk-checkbox--white',
    disabled && 'bpk-checkbox--disabled',
    isInvalid && 'bpk-checkbox--invalid',
    className,
  );
  const labelClassNames = getClassName(
    'bpk-checkbox__label',
    smallLabel && 'bpk-checkbox__label--small',
  );
  const inputClasses = getClassName(
    'bpk-checkbox__input',
    white && 'bpk-checkbox__input-white',
    checked && !indeterminate && 'bpk-checkbox__input-checkmark',
    indeterminate && 'bpk-checkbox__input-indeterminate',
  );

  return (
    <label className={classNames}>
      <input
        type="checkbox"
        className={inputClasses}
        name={name}
        disabled={disabled}
        aria-label={label}
        aria-invalid={isInvalid}
        data-indeterminate={indeterminate}
        ref={e => {
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

BpkCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
  className: PropTypes.string,
  smallLabel: PropTypes.bool,
  valid: PropTypes.bool,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
};

BpkCheckbox.defaultProps = {
  required: false,
  disabled: false,
  white: false,
  className: null,
  smallLabel: false,
  valid: null,
  checked: false,
  indeterminate: false,
};

export default BpkCheckbox;
