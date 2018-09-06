/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-badge.css';

export const BADGE_TYPES = {
  warning: 'warning',
  success: 'success',
  destructive: 'destructive',
  light: 'light',
  inverse: 'inverse',
  outline: 'outline',
};

const getClassName = cssModules(STYLES);

const badgeTypeClassNames = {
  [BADGE_TYPES.warning]: null,
  [BADGE_TYPES.success]: getClassName('bpk-badge--success'),
  [BADGE_TYPES.destructive]: getClassName('bpk-badge--destructive'),
  [BADGE_TYPES.light]: getClassName('bpk-badge--light'),
  [BADGE_TYPES.inverse]: getClassName('bpk-badge--inverse'),
  [BADGE_TYPES.outline]: getClassName('bpk-badge--outline'),
};

export type Props = {
  type: $Keys<typeof BADGE_TYPES>,
  docked: ?string,
  centered: boolean,
  className: ?string,
};

const BpkBadge = (props: Props) => {
  const { type, docked, centered, className, ...rest } = props;
  const classNames = [getClassName('bpk-badge'), badgeTypeClassNames[type]];

  if (docked === 'right') {
    classNames.push(getClassName('bpk-badge--docked-right'));
  }
  if (docked === 'left') {
    classNames.push(getClassName('bpk-badge--docked-left'));
  }
  if (centered) {
    classNames.push(getClassName('bpk-badge--centered'));
  }
  if (className) {
    classNames.push(className);
  }

  return <span className={classNames.join(' ')} {...rest} />;
};

BpkBadge.propTypes = {
  type: PropTypes.oneOf(Object.keys(BADGE_TYPES)),
  docked: PropTypes.oneOf(['right', 'left', null]),
  centered: PropTypes.bool,
  className: PropTypes.string,
};

BpkBadge.defaultProps = {
  type: BADGE_TYPES.warning,
  docked: null,
  centered: false,
  className: null,
};

export default BpkBadge;
