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
import { StyleSheet, type StyleObj } from 'react-native';

export const TEXT_STYLES = [
  'caps',
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  'xxl',
  'xxxl',
];
export type TextStyle =
  | 'caps'
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | 'xxl'
  | 'xxxl';

export const WEIGHT_STYLES = {
  regular: 'regular',
  emphasized: 'emphasized',
  heavy: 'heavy',
};
export type Weight = $Keys<typeof WEIGHT_STYLES>;

export type Props = {
  children: Node,
  emphasize: ?boolean,
  style: ?StyleObj,
  textStyle: TextStyle,
  weight: Weight,
};

export const stylePropType = (
  props: Props,
  propName: string,
  componentName: string,
) => {
  const value = StyleSheet.flatten(props[propName]);

  if (value === undefined) return false;

  if (value.fontWeight) {
    return new Error(
      `Invalid prop \`${propName}\` with \`fontWeight\` value \`${
        value.fontWeight
      }\` supplied to \`${componentName}\`. Use \`weight\` prop instead.`,
    ); // eslint-disable-line max-len
  }

  return false;
};

// Weight can only be heavy if textStyle is `xl`, `xxl` or `xxl`.
export const isWeightValid = (weight: string, textStyle: string) =>
  weight !== WEIGHT_STYLES.heavy ||
  (weight === WEIGHT_STYLES.heavy && textStyle.match(/^x+l$/));

export const weightPropType = (
  props: Props,
  propName: string,
  componentName: string,
) => {
  if (!isWeightValid(props[propName], props.textStyle)) {
    console.warn(
      `${propName} "${
        props[propName]
      }" can only be used on ${componentName} with textStyle "xl", "xxl" or "xxxl". Try ${propName}="${
        WEIGHT_STYLES.emphasized
      }" instead.`,
    );
  }

  PropTypes.oneOf(Object.keys(WEIGHT_STYLES))(props, propName, componentName);
};

// If this pattern is used elsewhere, it should be abstracted to bpk-react-utils and this file refactored.
const deprecated = (propType, explanation) => (
  props: { [string]: any },
  propName: string,
  componentName: string,
  ...rest: [any]
) => {
  if (props[propName] != null) {
    const message = `"${propName}" property of "${componentName}" has been deprecated. ${explanation}`;
    console.warn(message); // eslint-disable-line no-console
  }
  return propType(props, propName, componentName, ...rest);
};

export const propTypes = {
  children: PropTypes.node.isRequired,
  emphasize: deprecated(PropTypes.bool, 'Use "weight" instead.'),
  style: stylePropType,
  textStyle: PropTypes.oneOf(TEXT_STYLES),
  weight: weightPropType,
};

export const defaultProps = {
  emphasize: null,
  style: null,
  textStyle: 'base',
  weight: WEIGHT_STYLES.regular,
};
