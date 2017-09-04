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

import {
  Text,
  Platform,
  StyleSheet,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const IOS_TOKENS = require('bpk-tokens/tokens/ios/base.react.native.common.js');
const ANDROID_TOKENS = require('bpk-tokens/tokens/android/base.react.native.common.js');

const tokens = Platform.select({
  ios: () => IOS_TOKENS,
  android: () => ANDROID_TOKENS,
})();

const TEXT_STYLES = ['xs', 'sm', 'base', 'lg', 'xl', 'xxl'];

const styleForTextStyle = (textStyle) => {
  const camelCasedStyle = textStyle[0].toUpperCase() + textStyle.slice(1);
  const determineAndroidFontFamily = (fontWeight) => {
    switch (fontWeight) {
      case '500':
        return 'sans-serif-medium';
      case '400':
      default:
        return 'sans-serif';
    }
  };

  return {
    fontSize: tokens[`text${camelCasedStyle}FontSize`],
    lineHeight: tokens[`text${camelCasedStyle}LineHeight`],
    fontWeight: Platform.OS === 'ios' ? tokens[`text${camelCasedStyle}FontWeight`] : undefined,
    letterSpacing: Platform.OS === 'ios' ? tokens[`text${camelCasedStyle}LetterSpacing`] : undefined,
    color: tokens.colorGray900,
    fontFamily: Platform.OS === 'android' ?
      determineAndroidFontFamily(tokens[`text${camelCasedStyle}FontWeight`]) : undefined,
  };
};

const styles = StyleSheet.create({
  xs: {
    ...styleForTextStyle('xs'),
  },
  sm: {
    ...styleForTextStyle('sm'),
  },
  base: {
    ...styleForTextStyle('base'),
  },
  lg: {
    ...styleForTextStyle('lg'),
  },
  xl: {
    ...styleForTextStyle('xl'),
  },
  xxl: {
    ...styleForTextStyle('xxl'),
  },
});

const BpkText = (props) => {
  const { children, textStyle, style: innerStyle, ...rest } = props;
  const style = styles[textStyle];
  const finalStyles = [style];

  if (innerStyle) {
    finalStyles.push(innerStyle);
  }

  return (
    <Text style={finalStyles} {...rest}>{children}</Text>
  );
};

BpkText.propTypes = {
  children: PropTypes.node.isRequired,
  textStyle: PropTypes.oneOf(TEXT_STYLES),
  style: Text.propTypes.style,
};

BpkText.defaultProps = {
  textStyle: 'base',
  style: {},
};

export default BpkText;
export { TEXT_STYLES };
