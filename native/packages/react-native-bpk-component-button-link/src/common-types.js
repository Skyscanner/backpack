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

import { ViewPropTypes } from 'react-native';
import { type Node } from 'react';
import PropTypes from 'prop-types';
import { type Theme } from 'react-native-bpk-theming';

import { themePropType } from './utils';

export const ICON_ALIGNMENTS = {
  leading: 'leading',
  trailing: 'trailing',
};

export type CommonProps = {
  onPress: (event: SyntheticEvent<>) => void,
  title: string,
  accessibilityLabel: ?string,
  icon: ?Node,
  iconAlignment: $Keys<typeof ICON_ALIGNMENTS>,
  style: ?(Object | Array<Object>),
  theme: ?Theme,
};

export const commonPropTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  icon: PropTypes.oneOf(PropTypes.string, PropTypes.node),
  iconAlignment: PropTypes.oneOf(Object.keys(ICON_ALIGNMENTS)),
  style: ViewPropTypes.style,
  theme: themePropType,
};

export const commonDefaultProps = {
  accessibilityLabel: null,
  icon: null,
  iconAlignment: ICON_ALIGNMENTS.trailing,
  style: null,
  theme: null,
};
