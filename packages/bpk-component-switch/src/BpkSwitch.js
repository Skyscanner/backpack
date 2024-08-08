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
import type { Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkSwitch.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  label: Node,
  className: ?string,
  labelPosition: ?'left' | 'right',
};

const BpkSwitch = (props: Props) => {
  const { className, label, labelPosition = 'left', small, ...rest } = props;

  const switchClassNames = getClassName(
    'bpk-switch__switch',
    small && 'bpk-switch__switch--small',
  );

  return (
    <label className={getClassName('bpk-switch', `bpk-switch-label-position--${labelPosition}`, className)}>
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
  className: PropTypes.string,
  small: PropTypes.bool,
};

BpkSwitch.defaultProps = {
  className: null,
  small: false,
};

export default BpkSwitch;
