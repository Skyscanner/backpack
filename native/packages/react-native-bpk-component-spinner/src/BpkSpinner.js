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
import { ActivityIndicator } from 'react-native';
import {
  getThemeAttributes,
  makeThemePropType,
  withTheme,
} from 'react-native-bpk-theming';
import {
  colorBlue500,
  colorWhite,
  colorGray700,
} from 'bpk-tokens/tokens/base.react.native';

const SPINNER_TYPES = {
  primary: 'primary',
  light: 'light',
  dark: 'dark',
};

type SpinnerType = $Keys<typeof SPINNER_TYPES>;

const REQUIRED_THEME_ATTRIBUTES: Array<string> = ['spinnerPrimaryColor'];

const getSpinnerColor = (themeAttributes: ?Object, type: SpinnerType) => {
  const colorMappings = {
    [SPINNER_TYPES.primary]: colorBlue500,
    [SPINNER_TYPES.light]: colorWhite,
    [SPINNER_TYPES.dark]: colorGray700,
  };

  if (themeAttributes && type === 'primary') {
    return themeAttributes.spinnerPrimaryColor;
  }

  return colorMappings[type];
};

const BpkSpinner = props => {
  const { small, type, ...rest } = props;
  const { theme } = props;
  let themeAttributes = getThemeAttributes(REQUIRED_THEME_ATTRIBUTES, theme);

  // Validate type.
  if (!Object.keys(SPINNER_TYPES).includes(type)) {
    throw new Error(
      `"${type}" is not a valid spinner type. Valid types are ${Object.keys(
        SPINNER_TYPES,
      ).join(', ')}`,
    );
  }

  // Validate that spinner is themeable and correct theming attribute has been
  // supplied. If not, disable theming.
  if (themeAttributes && type !== 'primary') {
    themeAttributes = null;
  }

  return (
    // eslint-disable-next-line backpack/use-components
    <ActivityIndicator
      color={getSpinnerColor(themeAttributes, type)}
      size={small ? 'small' : 'large'}
      {...rest}
    />
  );
};

const propTypes = {
  small: PropTypes.bool,
  theme: makeThemePropType(REQUIRED_THEME_ATTRIBUTES),
  type: PropTypes.oneOf(Object.keys(SPINNER_TYPES)),
};

BpkSpinner.propTypes = propTypes;

BpkSpinner.defaultProps = {
  small: false,
  theme: null,
  type: 'primary',
};

export default withTheme(BpkSpinner);
export { propTypes, SPINNER_TYPES };
