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

import { cssModules, deprecated } from '../../bpk-react-utils';

import STYLES from './BpkSwitch.module.scss';

const getClassName = cssModules(STYLES);

export const SWITCH_TYPES = {
  primary: 'primary',
  event: 'event',
};

export type SwitchTypeValue = $Values<typeof SWITCH_TYPES>;

export type Props = {
  label: Node,
  type: SwitchTypeValue,
  className: ?string,
};

const BpkSwitch = (props: Props) => {
  const { className, label, small, type, ...rest } = props;

  const switchClassNames = getClassName(
    'bpk-switch__switch',
    `bpk-switch__switch--${type}`,
    small && 'bpk-switch__switch--small',
  );

  return (
    <label className={getClassName('bpk-switch', className)}>
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <input
        type="checkbox"
        className={getClassName('bpk-switch__checkbox')}
        aria-label={label}
        {...rest}
      />
      <span aria-hidden className={getClassName('bpk-switch__label')}>
        {label}
      </span>
      <span aria-hidden className={switchClassNames} />
    </label>
  );
};

BpkSwitch.propTypes = {
  label: PropTypes.node.isRequired,
  type: deprecated(
    PropTypes.oneOf([SWITCH_TYPES.primary, SWITCH_TYPES.event]),
    'This property is deprecated and only one type supported, please remove your usage of this property',
  ),
  className: PropTypes.string,
  small: PropTypes.bool,
};

BpkSwitch.defaultProps = {
  className: null,
  type: SWITCH_TYPES.primary,
  small: false,
};

export default BpkSwitch;
