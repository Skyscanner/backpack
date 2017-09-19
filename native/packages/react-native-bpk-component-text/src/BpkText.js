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

import React from 'react';
import PropTypes from 'prop-types';
import { Text, Platform, StyleSheet } from 'react-native';

const IOS_TOKENS = require('bpk-tokens/tokens/ios/base.react.native.common.js');
const ANDROID_TOKENS = require('bpk-tokens/tokens/android/base.react.native.common.js');

const tokens = Platform.select({
  ios: () => IOS_TOKENS,
  android: () => ANDROID_TOKENS,
})();

const TEXT_STYLES = ['xs', 'sm', 'base', 'lg', 'xl', 'xxl'];

const getAndroidFontFamily = fontWeight =>
  (fontWeight === '500' ? 'sans-serif-medium' : 'sans-serif');

const getStyleByTextStyle = (textStyle) => {
  const camelCasedStyle = textStyle[0].toUpperCase() + textStyle.slice(1);

  const color = tokens.colorGray700;
  const fontSize = tokens[`text${camelCasedStyle}FontSize`];
  const lineHeight = tokens[`text${camelCasedStyle}LineHeight`];
  const fontWeight = Platform.OS === 'ios' ? tokens[`text${camelCasedStyle}FontWeight`] : undefined;
  const androidFontFamily = getAndroidFontFamily(tokens[`text${camelCasedStyle}FontWeight`]);
  const fontFamily = Platform.OS === 'android' ? androidFontFamily : 'System';

  return { fontSize, lineHeight, fontWeight, color, fontFamily };
};

const styles = StyleSheet.create({
  xs: { ...getStyleByTextStyle('xs') },
  sm: { ...getStyleByTextStyle('sm') },
  base: { ...getStyleByTextStyle('base') },
  lg: { ...getStyleByTextStyle('lg') },
  xl: { ...getStyleByTextStyle('xl') },
  xxl: { ...getStyleByTextStyle('xxl') },
});

const BpkText = (props) => {
  const { children, textStyle, style, emphasize, ...rest } = props;

  const emphasizedStyle = emphasize ? { fontWeight: '600' } : {};
  const styleClone = Object.assign({}, style);

  if (Platform.OS === 'ios') {
    delete styleClone.fontWeight;

    if (textStyle === 'xxl') {
      delete emphasizedStyle.fontWeight;
    }
  }

  return <Text style={[styles[textStyle], emphasizedStyle, styleClone]} {...rest}>{children}</Text>;
};

BpkText.propTypes = {
  children: PropTypes.node.isRequired,
  textStyle: PropTypes.oneOf(TEXT_STYLES),
  emphasize: PropTypes.bool,
  style: Text.propTypes.style,
};

BpkText.defaultProps = {
  textStyle: 'base',
  emphasize: false,
  style: {},
};

export default BpkText;
export { TEXT_STYLES };
