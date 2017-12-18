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

import { Platform, StyleSheet } from 'react-native';

export const emphasizePropType = (props, propName, componentName) => {
  const value = props[propName];
  if (typeof value !== 'boolean') {
    return new Error(
      `Invalid prop \`${propName}\` of type \`${typeof value}\` supplied to \`${componentName}\`, expected \`boolean\`.`,
    ); // eslint-disable-line max-len
  }

  const enabled = !!value;

  if (Platform.OS === 'ios' && (enabled && props.textStyle === 'xxl')) {
    return new Error(
      `Invalid prop \`${propName}\` of value \`${value}\` supplied to \`${componentName}\`. \`textStyle\` value of \`xxl\` cannot be emphasized.`,
    ); // eslint-disable-line max-len
  }

  return false;
};

export const stylePropType = (props, propName, componentName) => {
  const value = StyleSheet.flatten(props[propName]);

  if (value === undefined) return false;

  if (value.fontWeight) {
    return new Error(
      `Invalid prop \`${propName}\` with \`fontWeight\` value \`${
        value.fontWeight
      }\` supplied to \`${componentName}\`. Use \`emphasize\` prop instead.`,
    ); // eslint-disable-line max-len
  }

  return false;
};
