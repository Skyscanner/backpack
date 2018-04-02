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

import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Switch } from 'react-native';
import {
  getThemeAttributes,
  makeThemePropType,
  withTheme,
} from 'react-native-bpk-theming';
import {
  colorBlue500,
  colorGray100,
  colorGray50,
} from 'bpk-tokens/tokens/base.react.native';

const REQUIRED_THEME_ATTRIBUTES: Array<string> = ['switchPrimaryColor'];

const getColors = (themeAttributes: ?Object, value: boolean): Object => {
  const primaryColor = themeAttributes
    ? themeAttributes.switchPrimaryColor
    : colorBlue500;
  const secondaryColor = colorGray100;

  // The color props mean different things based on the platform.
  const colors = Platform.select({
    ios: {
      tintColor: secondaryColor, // Border around the switch when off.
      // Must be unset or the the handles loses its drop shadow. https://github.com/facebook/react-native/issues/16764
      thumbTintColor: null,
      onTintColor: primaryColor,
    },
    android: {
      tintColor: secondaryColor, // Track when OFF.
      thumbTintColor: value ? primaryColor : colorGray50,
      onTintColor: secondaryColor, // Track when ON.
    },
  });
  return colors;
};

const BpkSwitch = props => {
  const { value, theme, ...rest } = props;
  const themeAttributes = getThemeAttributes(REQUIRED_THEME_ATTRIBUTES, theme);

  return (
    <Switch {...getColors(themeAttributes, value)} value={value} {...rest} />
  );
};

const propTypes = {
  theme: makeThemePropType(REQUIRED_THEME_ATTRIBUTES),
  value: PropTypes.bool,
};

BpkSwitch.propTypes = propTypes;

BpkSwitch.defaultProps = {
  theme: null,
  value: false,
};

export default withTheme(BpkSwitch);
export { propTypes };
