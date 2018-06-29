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
import { type StyleObj, ViewPropTypes } from 'react-native';

export type Props = {
  accessibilityLabel: string,
  onPress: () => mixed,
  label: string,
  style: ?StyleObj,
};

export type InnerProps = {
  accessibilityLabel: string,
  children: Node,
  large: boolean,
  selected: boolean,
  style: StyleObj,
  userStyle: ?StyleObj,
};

export const commonPropTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

export const commonDefaultProps = { style: null };
