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

import { StyleSheet, I18nManager } from 'react-native';
import {
  borderSizeSm,
  colorBlue500,
  colorGray100,
  colorGray300,
  colorGray500,
  colorGray700,
  colorRed500,
  fontFamily,
  spacingMd,
  spacingSm,
  lineHeightSm,
  lineHeightBase,
  textBaseFontSize,
  textBaseFontWeight,
  textSmFontSize,
  textSmFontWeight,
} from 'bpk-tokens/tokens/base.react.native';

const INPUT_RANGE = [0, 1];

// To increase the vertical spacing a bit.
const minHeight = lineHeightBase + spacingMd;

const styles = StyleSheet.create({
  container: {
    paddingTop: lineHeightSm,
  },
  input: {
    flex: 1,
    paddingHorizontal: 0, // To override Android default padding.
    paddingVertical: spacingSm,
    minHeight,
    fontSize: textBaseFontSize,
    fontWeight: textBaseFontWeight,
    lineHeight: lineHeightBase,
    color: colorGray700,
    borderBottomWidth: 0,
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  validationMessage: {
    color: colorRed500,
    paddingTop: spacingSm,
  },
  description: {
    color: colorGray500,
    paddingTop: spacingSm,
  },
});

// Created in a separate StyleSheet as they are not exported.
const animatedStyles = StyleSheet.create({
  label: {
    fontFamily,
    position: 'absolute',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: borderSizeSm,
  },
});

const getLabelColorValue = (value, valid, editable) => {
  if (!editable) {
    return colorGray100;
  }
  if (!value) {
    return colorGray300;
  }
  return valid === false ? colorRed500 : colorGray500;
};

const getLabelStyle = (
  animatedColorValue,
  animatedLabelValue,
  { value, valid, editable },
) => {
  const animatedStyle = {
    color: animatedColorValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [getLabelColorValue(value, valid, editable), colorBlue500],
    }),
    top: animatedLabelValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [0, lineHeightSm + (spacingSm - borderSizeSm)],
    }),
    fontSize: animatedLabelValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [textSmFontSize, textBaseFontSize],
    }),
    lineHeight: animatedLabelValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [lineHeightSm, lineHeightBase],
    }),
    fontWeight: animatedLabelValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [textSmFontWeight, textBaseFontWeight],
    }),
  };
  return [animatedStyles.label, animatedStyle];
};

const getInputContainerStyle = (animatedColorValue, valid) => {
  const underlineColorValue = valid === false ? colorRed500 : colorGray100;
  const animatedStyle = {
    borderBottomColor: animatedColorValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [underlineColorValue, colorBlue500],
    }),
  };
  return [animatedStyles.inputContainer, animatedStyle];
};

export { getLabelStyle, getInputContainerStyle, styles };
