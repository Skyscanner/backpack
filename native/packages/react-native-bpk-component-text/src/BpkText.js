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
import {
  colorGray700,
  fontFamily,
  fontFamilyEmphasize,
  textEmphasizedFontWeight,
  textXsFontSize,
  textXsFontWeight,
  textXsLineHeight,
  textSmFontSize,
  textSmFontWeight,
  textSmLineHeight,
  textBaseFontSize,
  textBaseFontWeight,
  textBaseLineHeight,
  textLgFontSize,
  textLgFontWeight,
  textLgLineHeight,
  textXlFontSize,
  textXlFontWeight,
  textXlLineHeight,
  textXxlFontSize,
  textXxlFontWeight,
  textXxlLineHeight,
} from 'bpk-tokens/tokens/base.react.native';

import { emphasizePropType, stylePropType } from './customPropTypes';

const TEXT_STYLES = ['xs', 'sm', 'base', 'lg', 'xl', 'xxl'];

const TEXT_TOKENS = {
  textXsFontSize,
  textXsFontWeight,
  textXsLineHeight,
  textSmFontSize,
  textSmFontWeight,
  textSmLineHeight,
  textBaseFontSize,
  textBaseFontWeight,
  textBaseLineHeight,
  textLgFontSize,
  textLgFontWeight,
  textLgLineHeight,
  textXlFontSize,
  textXlFontWeight,
  textXlLineHeight,
  textXxlFontSize,
  textXxlFontWeight,
  textXxlLineHeight,
};

const getStyleByTextStyle = textStyle => {
  const camelCasedStyle = textStyle[0].toUpperCase() + textStyle.slice(1);

  const {
    [`text${camelCasedStyle}FontSize`]: fontSize,
    [`text${camelCasedStyle}LineHeight`]: lineHeight,
    [`text${camelCasedStyle}FontWeight`]: fontWeight,
  } = TEXT_TOKENS;

  return {
    color: colorGray700,
    fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
  };
};

const getEmphasizeProperties = () => {
  const emphasizeProperties = {};

  if (Platform.OS === 'android') {
    emphasizeProperties.fontFamily = fontFamilyEmphasize;
  } else {
    emphasizeProperties.fontWeight = textEmphasizedFontWeight;
  }

  return emphasizeProperties;
};

const styles = StyleSheet.create({
  xs: { ...getStyleByTextStyle('xs') },
  sm: { ...getStyleByTextStyle('sm') },
  base: { ...getStyleByTextStyle('base') },
  lg: { ...getStyleByTextStyle('lg') },
  xl: { ...getStyleByTextStyle('xl') },
  xxl: { ...getStyleByTextStyle('xxl') },
});

const BpkText = props => {
  const { children, textStyle, style, emphasize, ...rest } = props;

  const finalStyle = [styles[textStyle]];

  if (emphasize) {
    finalStyle.push(getEmphasizeProperties(props));
  }

  finalStyle.push(style);

  return (
    <Text style={finalStyle} {...rest}>
      {children}
    </Text>
  );
};

BpkText.propTypes = {
  children: PropTypes.node.isRequired,
  textStyle: PropTypes.oneOf(TEXT_STYLES),
  emphasize: emphasizePropType,
  style: stylePropType,
};

BpkText.defaultProps = {
  textStyle: 'base',
  emphasize: false,
  style: {},
};

export default BpkText;
export { TEXT_STYLES };
