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
import { type Node, type StatelessFunctionalComponent } from 'react';

export const ALERT_TYPES = {
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARN: 'warn',
  ERROR: 'error',
  NEUTRAL: 'neutral',
  EVENT: 'event', // DEPRECATED
};

export type AlertTypeValue = $Values<typeof ALERT_TYPES>;

export type CommonProps = {
  type: AlertTypeValue,
  message: Node,
  animateOnEnter: boolean,
  animateOnLeave: boolean,
  show: boolean,
  bannerClassName: ?string,
  icon: ?StatelessFunctionalComponent<any>,
};

export type OnExpandToggleHandler = ?(boolean) => void;
export type OnDismissHandler = ?() => void;
export type OnHideHandler = ?() => void;

export const COMMON_PROP_TYPES = {
  type: PropTypes.oneOf([
    ALERT_TYPES.PRIMARY,
    ALERT_TYPES.SUCCESS,
    ALERT_TYPES.WARN,
    ALERT_TYPES.ERROR,
    ALERT_TYPES.NEUTRAL,
    ALERT_TYPES.EVENT,
  ]).isRequired,
  message: PropTypes.node.isRequired,
  animateOnEnter: PropTypes.bool,
  animateOnLeave: PropTypes.bool,
  show: PropTypes.bool,
  bannerClassName: PropTypes.string,
  icon: PropTypes.func,
};

export const COMMON_DEFAULT_PROPS = {
  animateOnEnter: false,
  animateOnLeave: false,
  show: true,
  bannerClassName: null,
  icon: null,
};
