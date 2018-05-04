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

import {
  colorWhite,
  colorGray100,
  colorGray300,
  colorBlue500,
  colorRed500,
  colorGreen600,
  colorGreen500,
  colorPink500,
  colorPink600,
  buttonHeight,
  buttonPaddingVertical,
  buttonPaddingHorizontal,
  buttonBorderWidth,
  buttonLineHeightLarge,
  lineHeightXs,
  borderRadiusPill,
  spacingSm,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import { Platform, StyleSheet } from 'react-native';

const base = StyleSheet.create({
  container: {
    borderRadius: borderRadiusPill,
    height: buttonHeight,
  },
  button: {
    borderRadius: borderRadiusPill,
    height: buttonHeight,
    paddingVertical: buttonPaddingVertical,
    paddingHorizontal: buttonPaddingHorizontal,
  },
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: Platform.select({
    ios: () => ({
      backgroundColor: 'transparent',
      color: colorWhite,
    }),
    android: () => ({
      backgroundColor: 'transparent',
      color: colorWhite,
      lineHeight: lineHeightXs,
    }),
  })(),
  icon: Platform.select({
    ios: () => null,
    android: () => ({
      lineHeight: spacingBase,
    }),
  })(),
});

const outlineButtonStyle = {
  paddingVertical: buttonPaddingVertical - buttonBorderWidth,
  paddingHorizontal: buttonPaddingHorizontal - buttonBorderWidth,
};

const types = {
  secondary: StyleSheet.create({
    container: {
      borderColor: colorGray100,
      borderWidth: buttonBorderWidth,
    },
    button: outlineButtonStyle,
    text: {
      color: colorBlue500,
    },
  }),
  destructive: StyleSheet.create({
    container: {
      borderColor: colorGray100,
      borderWidth: buttonBorderWidth,
    },
    button: outlineButtonStyle,
    text: {
      color: colorRed500,
    },
  }),
};

const modifiers = {
  large: StyleSheet.create({
    container: {
      minHeight: buttonLineHeightLarge,
    },
    button: {
      minHeight: buttonLineHeightLarge,
      paddingHorizontal: spacingBase,
    },
  }),
  largeWithOutline: StyleSheet.create({
    container: {
      minHeight: buttonLineHeightLarge,
    },
    button: {
      height: '100%',
      paddingHorizontal: spacingBase - buttonBorderWidth,
    },
  }),
  disabled: StyleSheet.create({
    container: {
      borderColor: 'transparent',
    },
    text: {
      color: colorGray300,
    },
  }),
  iconOnly: StyleSheet.create({
    container: {
      width: buttonHeight,
    },
    button: {
      paddingHorizontal: 0,
    },
  }),
  iconOnlyLarge: StyleSheet.create({
    container: {
      width: buttonLineHeightLarge,
    },
    button: {
      paddingHorizontal: 0,
    },
  }),
  textAndIcon: StyleSheet.create({
    view: {
      justifyContent: 'space-between',
    },
    icon: {
      marginLeft: spacingSm,
    },
  }),
  textAndIconLarge: StyleSheet.create({
    view: {
      justifyContent: 'space-between',
    },
    icon: {
      marginLeft: spacingSm,
    },
  }),
  iconLeading: StyleSheet.create({
    view: {
      flexDirection: 'row-reverse',
    },
    icon: {
      marginLeft: 0,
      marginRight: spacingSm,
    },
  }),
};

const gradientColors = {
  primary: [colorGreen500, colorGreen600],
  featured: [colorPink500, colorPink600],
  destructive: [colorWhite, colorWhite],
  secondary: [colorWhite, colorWhite],
  disabled: [colorGray100, colorGray100],
};

const themeMappings = {
  text: {
    color: {
      primary: 'buttonPrimaryTextColor',
      secondary: 'buttonSecondaryTextColor',
    },
  },
  container: {
    borderColor: {
      secondary: 'buttonSecondaryBorderColor',
    },
  },
  gradient: {
    primary: {
      startColor: 'buttonPrimaryGradientStartColor',
      endColor: 'buttonPrimaryGradientEndColor',
    },
    secondary: {
      startColor: 'buttonSecondaryBackgroundColor',
      endColor: 'buttonSecondaryBackgroundColor',
    },
  },
};

const styles = {
  base,
  types,
  modifiers,
  gradientColors,
  themeMappings,
};

export default styles;
