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

import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Switch } from 'react-native';
import { withTheme } from 'react-native-bpk-theming';
import {
  colorBlue500,
  colorGray100,
  colorGray50,
} from 'bpk-tokens/tokens/base.react.native';

// If theming is ever expanded to support other types, this should be changed
// to something akin to BpkButton's theming functions.
const THEMING_ATTRIBUTE = 'switchPrimaryColor';

const getColors = (theme, value) => {
  const primaryColor = theme ? theme[THEMING_ATTRIBUTE] : colorBlue500;
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

const themePropType = (props, propName, componentName) => {
  const { theme } = props;
  if (!theme) {
    return false;
  }
  if (!theme[THEMING_ATTRIBUTE]) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. For themed switches, \`theme\` prop must include \`${THEMING_ATTRIBUTE}\``,
    ); // eslint-disable-line max-len
  }
  return false;
};

const BpkSwitch = props => {
  const { value, ...rest } = props;
  let { theme } = props;

  // Validate that correct theming attribute has been supplied. If not, disable theming.
  if (theme && !theme[THEMING_ATTRIBUTE]) {
    theme = null;
  }

  return <Switch {...getColors(theme, value)} value={value} {...rest} />;
};

const propTypes = {
  theme: themePropType,
  value: PropTypes.bool,
};

BpkSwitch.propTypes = propTypes;

BpkSwitch.defaultProps = {
  theme: null,
  value: false,
};

export default withTheme(BpkSwitch);
export { propTypes };
