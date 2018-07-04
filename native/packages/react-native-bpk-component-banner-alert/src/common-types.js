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

import { type Node } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';

import {
  dismissablePropType,
  dismissableLabelPropType,
  toggleExpandedButtonLabelPropType,
} from './customPropTypes';

export const ALERT_TYPES = {
  success: 'success',
  warn: 'warn',
  error: 'error',
  neutral: 'neutral',
};

export type Props = {
  message: string,
  type: $Keys<typeof ALERT_TYPES>,
  animateOnEnter: boolean,
  animateOnLeave: boolean,
  children: Node,
  dismissable: boolean,
  dismissButtonLabel: ?string,
  expanded: boolean,
  onDismiss: ?(event: SyntheticEvent<>) => mixed,
  onToggleExpanded: ?(event: SyntheticEvent<>) => mixed,
  show: boolean,
  toggleExpandedButtonLabel: ?string,
  bannerStyle: ?any,
};

export const propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(ALERT_TYPES)).isRequired,
  animateOnEnter: PropTypes.bool,
  animateOnLeave: PropTypes.bool,
  children: PropTypes.node,
  dismissable: dismissablePropType,
  dismissButtonLabel: dismissableLabelPropType,
  expanded: PropTypes.bool,
  onDismiss: PropTypes.func,
  onToggleExpanded: PropTypes.func,
  show: PropTypes.bool,
  toggleExpandedButtonLabel: toggleExpandedButtonLabelPropType,
  bannerStyle: ViewPropTypes.style,
};

export const defaultProps = {
  animateOnEnter: false,
  animateOnLeave: false,
  children: null,
  dismissable: false,
  dismissButtonLabel: null,
  expanded: false,
  onDismiss: null,
  onToggleExpanded: null,
  show: true,
  toggleExpandedButtonLabel: null,
  bannerStyle: null,
};
