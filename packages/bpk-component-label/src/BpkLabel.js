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

import STYLES from './BpkLabel.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  children: Node,
  className: ?string,
  disabled: boolean,
  valid: ?boolean,
  required: boolean,
  white: boolean,
};

const BpkLabel = (props: Props) => {
  const { children, className, disabled, required, valid, white, ...rest } =
    props;
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
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <label className={classNames} {...rest}>
      {children}
      {!disabled && required && (
        <span className={getClassName('bpk-label__asterisk')}>*</span>
      )}
    </label>
  );
};

BpkLabel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  valid: PropTypes.bool,
  required: PropTypes.bool,
  white: PropTypes.bool,
};

BpkLabel.defaultProps = {
  className: null,
  disabled: false,
  valid: null,
  required: false,
  white: false,
};

export default BpkLabel;
