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

import { type Element, Image } from 'react-native';
import PropTypes from 'prop-types';

export type Id = string;

export type Flag = Element<typeof Image>;

export type Code = {
  id: Id,
  dialingCode: string,
  name: string,
};

export type ListItemProps = {
  ...$Exact<Code>,
  onPress: ListItemProps => void,
  selected: boolean,
  flag: ?Flag,
};

export type RenderFlag = Code => ?Flag;

export type ListCommonProps = {
  dialingCodes: Array<Code>,
  renderFlag: RenderFlag,
  onItemPress: ListItemProps => void,
  selectedId: ?string,
};

export const CODE_PROP_TYPES = {
  id: PropTypes.string.isRequired,
  dialingCode: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const LIST_ITEM_PROP_TYPES = {
  ...CODE_PROP_TYPES,
  onPress: PropTypes.func.isRequired,
  flag: PropTypes.element,
  selected: PropTypes.bool,
};

export const LIST_COMMON_PROP_TYPES = {
  dialingCodes: PropTypes.arrayOf(PropTypes.shape(CODE_PROP_TYPES)).isRequired,
  onItemPress: PropTypes.func.isRequired,
  renderFlag: PropTypes.func.isRequired,
  selectedId: PropTypes.string,
};

export const LIST_COMMON_DEFAULT_PROPS = {
  selectedId: null,
};

export const LIST_ITEM_COMMON_DEFAULT_PROPS = {
  flag: null,
  selected: false,
};
