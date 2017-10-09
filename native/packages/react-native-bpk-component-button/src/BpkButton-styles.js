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

import { setOpacity } from 'bpk-tokens';
import { Platform, StyleSheet } from 'react-native';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

// Slight darkness to use when buttons are pressed in.
const underlayColor = Platform.select({
  ios: () => setOpacity(tokens.underlayColor, tokens.underlayOpacity),
  android: () => null,
})();

// These should probably be their own tokens.
// For now they are derived from existing tokens.
const largeHeight = tokens.spacingSm * 12;
const buttonBorderWidth = tokens.borderSizeLg;

// The base styles that are initially applied to all buttons.
const base = StyleSheet.create({

  // Applied to the outer LinearGradient element.
  container: {
    borderRadius: tokens.borderRadiusPill,
    height: tokens.spacingXl,
  },

  // Applied to the TouchableHighlight element.
  button: {
    borderRadius: tokens.borderRadiusPill,
    height: tokens.spacingXl,
    paddingTop: tokens.spacingMd,
    paddingBottom: tokens.spacingMd,
    paddingLeft: tokens.spacingSm * 3,
    paddingRight: tokens.spacingSm * 3,
  },

  // Applied to the View element that encloses the text and icon.
  view: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  // Applied to the Text element.
  text: {
    backgroundColor: 'transparent',
    color: tokens.colorWhite,
  },
});

const outlineButtonStyle = {
  borderColor: tokens.colorGray100,
  borderWidth: buttonBorderWidth,

  // minus the borderWidth so it's the same size as other buttons.
  paddingTop: tokens.spacingMd - buttonBorderWidth,
  paddingBottom: tokens.spacingMd - buttonBorderWidth,
  paddingLeft: (tokens.spacingSm * 3) - buttonBorderWidth,
  paddingRight: (tokens.spacingSm * 3) - buttonBorderWidth,
};

const types = {
  secondary: StyleSheet.create({
    button: outlineButtonStyle,
    text: {
      color: tokens.colorBlue500,
    },
  }),
  destructive: StyleSheet.create({
    button: outlineButtonStyle,
    text: {
      color: tokens.colorRed500,
    },
  }),
};

const modifiers = {
  large: StyleSheet.create({
    container: {
      minHeight: largeHeight,
    },
    button: {
      minHeight: largeHeight,
      paddingLeft: tokens.spacingBase,
      paddingRight: tokens.spacingBase,
    },
  }),
  largeWithOutline: StyleSheet.create({
    container: {
      minHeight: largeHeight,
    },
    button: {
      minHeight: largeHeight,
      paddingLeft: tokens.spacingBase - buttonBorderWidth,
      paddingRight: tokens.spacingBase - buttonBorderWidth,
    },
  }),
  selected: StyleSheet.create({
    text: {
      color: tokens.colorWhite,
    },
    button: {
      borderColor: 'transparent',
    },
  }),
  disabled: StyleSheet.create({
    button: {
      borderColor: 'transparent',
    },
    text: {
      color: tokens.colorGray300,
    },
  }),
  iconOnly: StyleSheet.create({
    container: {
      width: tokens.spacingXl,
    },
  }),
  iconOnlyLarge: StyleSheet.create({
    container: {
      width: largeHeight,
    },
  }),
  textAndIcon: StyleSheet.create({
    view: {
      justifyContent: 'space-between',
    },
    text: {
      marginRight: tokens.spacingSm,
    },
  }),
  textAndIconLarge: StyleSheet.create({
    view: {
      justifyContent: 'space-between',
    },
    text: {
      marginRight: tokens.spacingSm,
    },
  }),
};

const gradientColors = {
  primary: [tokens.colorGreen500, tokens.colorGreen600],
  featured: ['rgb(250, 72, 138)', 'rgb(217, 43, 107)'], // TODO [tokens.colorPink500, tokens.colorPink600]
  destructive: [tokens.colorWhite, tokens.colorWhite],
  secondary: [tokens.colorWhite, tokens.colorWhite],
  selected: [tokens.colorBlue600, tokens.colorBlue700],
  disabled: [tokens.colorGray100, tokens.colorGray100],
};

const themeMappings = {
  text: {
    color: {
      primary: 'buttonPrimaryTextColor',
      secondary: 'buttonSecondaryTextColor',
    },
  },
  button: {
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
  underlayColor,
  themeMappings,
};

export default styles;
