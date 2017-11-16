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
import { ActivityIndicator } from 'react-native';
import { withTheme } from 'react-native-bpk-theming';
import { colorBlue500, colorWhite, colorGray700 } from 'bpk-tokens/tokens/base.react.native';

const SPINNER_TYPES = ['primary', 'light', 'dark'];

// If theming is ever expanded to support other types, this should be changed
// to something akin to BpkButton's theming functions.
const THEMING_ATTRIBUTE = 'spinnerPrimaryColor';

const themePropType = (props, propName, componentName) => {
  const { type, theme } = props;
  if (!theme) {
    return false;
  }
  if (type === 'primary' && !theme[THEMING_ATTRIBUTE]) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. For spinners of type \`${type}\`, the \`theme\` prop must include \`${THEMING_ATTRIBUTE}\``); // eslint-disable-line max-len
  }
  return false;
};

const getSpinnerColor = (theme, type) => {
  const colorMappings = {
    primary: colorBlue500,
    light: colorWhite,
    dark: colorGray700,
  };
  if (theme && type === 'primary') {
    return theme[THEMING_ATTRIBUTE];
  }
  return colorMappings[type];
};

const BpkSpinner = (props) => {
  const { small, type, ...rest } = props;
  let { theme } = props;

  // Validate type.
  if (!SPINNER_TYPES.includes(type)) {
    throw new Error(`"${type}" is not a valid spinner type. Valid types are ${SPINNER_TYPES.join(', ')}`);
  }

  // Validate that spinner is themeable and correct theming attribute has been
  // supplied. If not, disable theming.
  if (theme && (type !== 'primary' || !theme[THEMING_ATTRIBUTE])) {
    theme = null;
  }

  return (
    <ActivityIndicator
      color={getSpinnerColor(theme, type)}
      size={small ? 'small' : 'large'}
      {...rest}
    />
  );
};

const propTypes = {
  small: PropTypes.bool,
  theme: themePropType,
  type: PropTypes.oneOf(SPINNER_TYPES),
};

BpkSpinner.propTypes = propTypes;

BpkSpinner.defaultProps = {
  small: false,
  theme: null,
  type: 'primary',
};

export default withTheme(BpkSpinner);
export {
  propTypes,
  SPINNER_TYPES,
};
