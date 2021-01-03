/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import STYLES from './BpkAriaLive.scss';

const getClassName = cssModules(STYLES);

export const POLITENESS_SETTINGS = {
  off: 'off',
  polite: 'polite',
  assertive: 'assertive',
};

export type Props = {
  children: Node,
  politenessSetting: $Keys<typeof POLITENESS_SETTINGS>,
  visible: boolean,
  className: ?string,
};
const BpkAriaLive = (props: Props) => {
  const { className, politenessSetting, visible, ...rest } = props;
  const classNames = getClassName(
    'bpk-aria-live',
    !visible && 'bpk-aria-live--invisible',
    className,
  );

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <div aria-live={politenessSetting} className={classNames} {...rest} />
  );
};

BpkAriaLive.propTypes = {
  className: PropTypes.string,
  politenessSetting: PropTypes.oneOf(Object.keys(POLITENESS_SETTINGS)),
  visible: PropTypes.bool,
};

BpkAriaLive.defaultProps = {
  className: null,
  politenessSetting: POLITENESS_SETTINGS.polite,
  visible: false,
};

export default BpkAriaLive;
