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
import React from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent } from 'react-native';

type BadgeType =
  | 'badgeTypeSuccess'
  | 'badgeTypeWarning'
  | 'badgeTypeDestructive'
  | 'badgeTypeLight'
  | 'badgeTypeInverse'
  | 'badgeTypeOutline';

type Props = {
  message: string,
  type: BadgeType,
};

export const BADGE_TYPES = {
  success: 'badgeTypeSuccess',
  warning: 'badgeTypeWarning',
  destructive: 'badgeTypeDestructive',
  light: 'badgeTypeLight',
  inverse: 'badgeTypeInverse',
  outline: 'badgeTypeOutline',
};
const BpkBadge = (props: Props) => <NativeBadge {...props} />;

BpkBadge.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'badgeTypeSuccess',
    'badgeTypeWarning',
    'badgeTypeDestructive',
    'badgeTypeLight',
    'badgeTypeInverse',
    'badgeTypeOutline',
  ]),
};

BpkBadge.defaultProps = {
  type: BADGE_TYPES.warning,
};

BpkBadge.types = BADGE_TYPES;

const NativeBadge = requireNativeComponent('BPKBadgeWrapper', BpkBadge);

export default BpkBadge;
