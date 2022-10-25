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

/* @flow strict */

import PropTypes from 'prop-types';
import React, { type Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkRadio.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  name: string,
  label: Node,
  ariaLabel: ?string,
  className: ?string,
  disabled: boolean,
  white: boolean,
  valid: ?boolean,
};

const BpkRadio = (props: Props) => {
  const { ariaLabel, className, disabled, label, name, valid, white, ...rest } =
    props;

  // Explicit check for false primitive value as undefined is
  // treated as neither valid nor invalid
  const isInvalid = valid === false;

  const classNames = getClassName(
    'bpk-radio',
    white && 'bpk-radio--white',
    disabled && 'bpk-radio--disabled',
    white && disabled && 'bpk-radio--disabled--white',
    isInvalid && 'bpk-radio--invalid',
    className,
  );

  return (
    <label className={classNames}>
      {/* Deciding to support this because `aria-invalid` does often work with voiceover
      despite not being in the spec. */}
      {/* eslint-disable jsx-a11y/role-supports-aria-props */}
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md */}
      <input
        type="radio"
        className={getClassName('bpk-radio__input')}
        name={name}
        disabled={disabled}
        aria-label={ariaLabel || label}
        aria-invalid={isInvalid}
        {...rest}
      />
      {/* eslint-enable */}
      <div className={getClassName('bpk-radio__circle')} />
      <span aria-hidden="true">{label}</span>
    </label>
  );
};

BpkRadio.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
  className: PropTypes.string,
  valid: PropTypes.bool,
};

BpkRadio.defaultProps = {
  ariaLabel: null,
  disabled: false,
  white: false,
  className: null,
  valid: null,
};

export default BpkRadio;
