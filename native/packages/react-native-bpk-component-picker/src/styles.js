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

import { StyleSheet } from 'react-native';
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
  textSmLineHeight,
  textBaseLineHeight,
} from 'bpk-tokens/tokens/base.react.native';

const INPUT_RANGE = [0, 1];

const styles = StyleSheet.create({
  label: {
    color: colorGray500,
    marginBottom: spacingSm,
  },
  containerStyle: {
    paddingVertical: spacingSm,
    marginVertical: spacingSm,
  },
  container: {
    flexDirection: 'row',
    paddingTop: textSmLineHeight,
    paddingRight: spacingMd,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  valueText: {
    flex: 1,
    paddingVertical: spacingSm,
    color: colorGray700,
    minHeight: textBaseLineHeight + spacingMd,
  },
  placeholderText: {
    flex: 1,
    color: colorGray300,
  },
  hintText: {
    color: colorGray300,
    marginRight: spacingMd,
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

const getLabelColorValue = (value, valid) => {
  if (!value) {
    return colorGray300;
  }
  return valid === false ? colorRed500 : colorGray500;
};

const getLabelStyle = (
  animatedColorValue,
  animatedLabelValue,
  { value, valid },
) => {
  const animatedStyle = {
    color: animatedColorValue.interpolate({
      inputRange: INPUT_RANGE,
      outputRange: [getLabelColorValue(value, valid), colorBlue500],
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
