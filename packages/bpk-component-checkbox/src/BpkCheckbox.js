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
    indeterminate,
    ...rest
  } = props;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  const classNames = [
    getClassName('bpk-checkbox'),
    white && getClassName('bpk-checkbox--white'),
    disabled && getClassName('bpk-checkbox--disabled'),
    isInvalid && getClassName('bpk-checkbox--invalid'),
    className && className,
  ];
  const labelClassNames = [
    getClassName('bpk-checkbox__label'),
    smallLabel && getClassName('bpk-checkbox__label--small'),
  ];

  const inputClasses = [
    getClassName(
      'bpk-checkbox__input',
      white && 'bpk-checkbox__input-white',
      props.checked && 'bpk-checkbox__checkmark',
      indeterminate && 'bpk-checkbox__indeterminate',
    ),
  ];

  console.log('State:', props.checked);

  return (
    <label className={classNames.join(' ')}>
      <input
        type="checkbox"
        className={inputClasses.join(' ')}
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
        {...rest}
      />

      <span className={labelClassNames.join(' ')} aria-hidden="true">
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
  indeterminate: PropTypes.bool,
};

BpkCheckbox.defaultProps = {
  required: false,
  disabled: false,
  white: false,
  className: null,
  smallLabel: false,
  valid: null,
  indeterminate: false,
};

export default BpkCheckbox;
