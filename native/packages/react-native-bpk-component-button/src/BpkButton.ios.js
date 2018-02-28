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
import { View } from 'react-native';
import { withTheme } from 'react-native-bpk-theming';
import BpkIcon from 'react-native-bpk-component-icon';
import BpkText from 'react-native-bpk-component-text';
import LinearGradient from 'react-native-linear-gradient';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';

import {
  isTypeThemeable,
  themeAttributesSupplied,
  getStyleForElement,
  getGradientColors,
  getThemingForElement,
  textStyle,
  iconStyle,
} from './utils';

import {
  type CommonProps,
  type IconAlignment,
  BUTTON_TYPES,
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
  ICON_ALIGNMENTS,
} from './common-types';

export type Props = {
  ...$Exact<CommonProps>,
  iconAlignment: IconAlignment,
  large: boolean,
};

const BpkButton = (props: Props) => {
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
    theme: themeProp,
    ...rest
  } = props;

  if (!Object.values(BUTTON_TYPES).includes(type)) {
    throw new Error(
      `"${type}" is not a valid button type. Valid types are ${Object.keys(
        BUTTON_TYPES,
      ).join(', ')}`,
    );
  }

  const shouldApplyTheme =
    themeProp &&
    (isTypeThemeable(type) && themeAttributesSupplied(type, themeProp));
  const theme = shouldApplyTheme ? themeProp : null;

  const accessibilityTraits = ['button'];
  const gradientColors = getGradientColors(theme, props);
  const containerStyle = getStyleForElement('container', props);
  const buttonStyle = getStyleForElement('button', props);
  const buttonTheme = getThemingForElement('button', theme, props);

  if (disabled) {
    accessibilityTraits.push('disabled');
  }

  return (
    <LinearGradient colors={gradientColors} style={[containerStyle, style]}>
      <BpkTouchableOverlay
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={accessibilityTraits}
        borderRadius="pill"
        disabled={disabled}
        onPress={onPress}
        style={[buttonStyle, buttonTheme]}
        type={type}
        {...rest}
      >
        <View style={getStyleForElement('view', props)}>
          {!iconOnly && (
            <BpkText
              textStyle={large ? 'lg' : 'sm'}
              emphasize
              style={textStyle(theme, props)}
            >
              {title}
            </BpkText>
          )}
          {typeof icon === 'string' ? (
            <BpkIcon
              icon={icon}
              style={iconStyle(theme, props)}
              small={!large}
            />
          ) : (
            icon
          )}
        </View>
      </BpkTouchableOverlay>
    </LinearGradient>
  );
};

BpkButton.propTypes = {
  ...COMMON_PROP_TYPES,
  iconAlignment: PropTypes.oneOf(Object.keys(ICON_ALIGNMENTS)),
  large: PropTypes.bool,
};

BpkButton.defaultProps = {
  ...COMMON_DEFAULT_PROPS,
  iconAlignment: ICON_ALIGNMENTS.trailing,
  large: false,
};

export default withTheme(BpkButton);
