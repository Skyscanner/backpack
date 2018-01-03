/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { type Node } from 'react';

export const ALERT_TYPES = {
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
  NEUTRAL: 'neutral',
};

export type AlertTypeValue = $Values<typeof ALERT_TYPES>;

export type CommonProps = {
  type: AlertTypeValue,
  message: Node,
  animateOnEnter: boolean,
  animateOnLeave: boolean,
  show: boolean,
  bannerClassName: ?string,
};

export type OnExpandToggleHandler = ?() => void;
export type OnDismissHandler = ?() => void;

export const COMMON_PROP_TYPES = {
  type: PropTypes.oneOf([
    ALERT_TYPES.SUCCESS,
    ALERT_TYPES.WARN,
    ALERT_TYPES.ERROR,
    ALERT_TYPES.NEUTRAL,
  ]).isRequired,
  message: PropTypes.node.isRequired,
  animateOnEnter: PropTypes.bool,
  animateOnLeave: PropTypes.bool,
  show: PropTypes.bool,
  bannerClassName: PropTypes.string,
};

export const COMMON_DEFAULT_PROPS = {
  animateOnEnter: false,
  animateOnLeave: false,
  show: true,
  bannerClassName: null,
};
