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

/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { View, Platform, ViewPropTypes } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import { withTheme } from 'react-native-bpk-theming';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';

import {
  isTypeThemeable,
  themeAttributesSupplied,
  getStyleForElement,
  iconPropType,
  themePropType,
  textStyle,
} from './utils';

import BpkButtonContainer from './layout/BpkButtonContainer';

const BUTTON_TYPES = ['primary', 'featured', 'secondary', 'destructive'];

const BpkButton = props => {
  const {
    accessibilityLabel,
    disabled,
    icon,
    iconOnly,
    large,
    onPress,
    style,
    title,
    type,
    ...rest
  } = props;
  let { theme } = props;
  // Validate the button type.
  if (!BUTTON_TYPES.includes(type)) {
    throw new Error(
      `"${type}" is not a valid button type. Valid types are ${BUTTON_TYPES.join(
        ', ',
      )}`,
    );
  }

  // Validate that button is themeable and all theming attributes
  // have been supplied. If not, disable theming.
  if (theme) {
    if (!isTypeThemeable(type) || !themeAttributesSupplied(type, theme)) {
      theme = null;
    }
  }

  const renderIcon = () => {
    if (!icon) {
      return null;
    }
    if (typeof icon === 'string') {
      return (
        <BpkIcon icon={icon} style={textStyle(theme, props)} small={!large} />
      );
    }
    return icon;
  };
  return (
    <BpkButtonContainer
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      iconOnly={iconOnly}
      onPress={onPress}
      style={style}
      theme={theme}
      title={title}
      type={type}
      large={large}
      {...rest}
    >
      <View style={getStyleForElement('view', props)}>
        {!iconOnly && (
          <BpkText
            textStyle={large ? 'lg' : 'sm'}
            emphasize
            style={textStyle(theme, props)}
          >
            {Platform.OS === 'android' ? title.toUpperCase() : title}
          </BpkText>
        )}
        {renderIcon()}
      </View>
    </BpkButtonContainer>
  );
};

const propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
  icon: iconPropType,
  iconOnly: PropTypes.bool,
  large: PropTypes.bool,
  style: ViewPropTypes.style,
  theme: themePropType,
  type: PropTypes.oneOf(BUTTON_TYPES),
};

BpkButton.propTypes = propTypes;

BpkButton.defaultProps = {
  accessibilityLabel: null,
  disabled: false,
  icon: null,
  iconOnly: false,
  large: false,
  style: null,
  theme: null,
  type: 'primary',
};

export default withTheme(BpkButton);
export { propTypes, BUTTON_TYPES };
