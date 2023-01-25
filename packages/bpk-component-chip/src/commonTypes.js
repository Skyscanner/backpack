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
import { type Node } from 'react';

export const CHIP_TYPES = {
  default: 'default',
  onDark: 'on-dark',
  onImage: 'on-image',
};

export type CommonProps = {
  accessibilityLabel: string,
  children: Node,
  disabled: boolean,
  onClick: (event: SyntheticEvent<>) => mixed,
  selected: boolean,
  type: $Keys<typeof CHIP_TYPES>,
  className: ?string,
  leadingAccessoryView: ?Node,
};

export const COMMON_PROP_TYPES = {
  accessibilityLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  leadingAccessoryView: PropTypes.node,
  selected: PropTypes.bool,
  trailingAccessoryView: PropTypes.node,
  type: PropTypes.oneOf(Object.keys(CHIP_TYPES)),
};

export const COMMON_DEFAULT_PROPS = {
  className: null,
  disabled: false,
  leadingAccessoryView: null,
  selected: false,
  trailingAccessoryView: null,
  type: CHIP_TYPES.default,
};
