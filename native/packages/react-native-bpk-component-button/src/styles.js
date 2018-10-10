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
  buttonBorderWidth,
  borderRadiusPill,
  spacingSm,
  spacingMd,
  spacingBase,
  spacingLg,
} from 'bpk-tokens/tokens/base.react.native';
import { Platform, StyleSheet } from 'react-native';

const base = StyleSheet.create({
  androidContainer: {
    borderRadius: borderRadiusPill,
  },
  button: {
    borderRadius: borderRadiusPill,
    paddingVertical: spacingMd,
    paddingHorizontal: spacingBase - spacingSm,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: colorWhite,
    lineHeight: Platform.OS === 'android' ? spacingLg - spacingSm : null,
  },
  icon: {
    marginStart: spacingSm,
    lineHeight: Platform.OS === 'android' ? spacingLg - spacingSm : null,
  },
});

const types = {
  secondary: StyleSheet.create({
    button: {
      borderColor: colorGray100,
      borderWidth: buttonBorderWidth,
      paddingVertical: spacingMd - buttonBorderWidth,
      paddingHorizontal: spacingBase - spacingSm - buttonBorderWidth,
    },
    text: {
      color: colorBlue500,
    },
  }),
  destructive: StyleSheet.create({
    button: {
      borderColor: colorGray100,
      borderWidth: buttonBorderWidth,
      paddingVertical: spacingMd - buttonBorderWidth,
      paddingHorizontal: spacingBase - spacingSm - buttonBorderWidth,
    },
    text: {
      color: colorRed500,
    },
  }),
};

const modifiers = {
  large: StyleSheet.create({
    button: {
      paddingVertical: spacingBase - spacingSm,
      paddingHorizontal: spacingBase,
    },
    text: {
      lineHeight: spacingLg,
    },
  }),
  largeWithBorder: StyleSheet.create({
    button: {
      paddingVertical: spacingBase - spacingSm - buttonBorderWidth,
      paddingHorizontal: spacingBase - buttonBorderWidth,
    },
    text: {
      lineHeight: spacingLg,
    },
  }),
  disabled: StyleSheet.create({
    text: {
      color: colorGray300,
    },
  }),
  iconOnly: StyleSheet.create({
    button: {
      paddingVertical: spacingMd,
      paddingHorizontal:
        Platform.OS === 'android' ? spacingMd + buttonBorderWidth : spacingMd,
    },
    icon: {
      marginStart: 0,
    },
  }),
  iconOnlyLarge: StyleSheet.create({
    button: {
      paddingVertical: spacingBase - spacingSm,
      paddingHorizontal: spacingBase - spacingSm,
    },
    icon: {
      marginStart: 0,
    },
  }),
  iconOnlyWithBorder: StyleSheet.create({
    button: {
      paddingVertical: spacingMd - buttonBorderWidth,
      paddingHorizontal:
        Platform.OS === 'android' ? spacingMd : spacingMd - buttonBorderWidth,
    },
    icon: {
      marginStart: 0,
    },
  }),
  iconOnlyWithBorderLarge: StyleSheet.create({
    button: {
      paddingVertical: spacingBase - spacingSm - buttonBorderWidth,
      paddingHorizontal: spacingBase - spacingSm - buttonBorderWidth,
    },
    icon: {
      marginStart: 0,
    },
  }),
  textAndIcon: StyleSheet.create({
    button: {
      justifyContent: 'space-between',
    },
  }),
  textAndIconLarge: StyleSheet.create({
    button: {
      justifyContent: 'space-between',
    },
  }),
  iconLeading: StyleSheet.create({
    button: {
      flexDirection: 'row-reverse',
    },
    icon: {
      marginStart: 0,
      marginEnd: spacingSm,
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
