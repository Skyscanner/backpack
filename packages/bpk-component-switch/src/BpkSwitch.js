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
/* @flow strict */

import PropTypes from 'prop-types';
import React, { type Node } from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkSwitch.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  label: Node,
  className: ?string,
};
const BpkSwitch = (props: Props) => {
  const { className, label, ...rest } = props;

  return (
    <label className={getClassName('bpk-switch', className)}>
      {/* $FlowFixMe - inexact rest. See 'decisions/flowfixme.md'. */}
      <input
        type="checkbox"
        className={getClassName('bpk-switch__checkbox')}
        aria-label={label}
        {...rest}
      />
      <span aria-hidden className={getClassName('bpk-switch__label')}>
        {label}
      </span>
      <span aria-hidden className={getClassName('bpk-switch__switch')} />
    </label>
  );
};

BpkSwitch.propTypes = {
  label: PropTypes.node.isRequired,
  className: PropTypes.string,
};

BpkSwitch.defaultProps = {
  className: null,
};

export default BpkSwitch;
