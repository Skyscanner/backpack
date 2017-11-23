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

import { ViewPropTypes } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';

import {
  getStyleForElement,
  getThemingForElement,
  getGradientColors,
  themePropType,
} from './../utils';

const BpkButtonContainer = (props) => {
  const { theme } = props;
  const gradientColors = getGradientColors(theme, props);
  const containerStyle = getStyleForElement('container', props);
  const buttonStyle = getStyleForElement('button', props);
  const buttonTheme = getThemingForElement('button', theme, props);
  const {
    accessibilityLabel,
    children,
    disabled,
    iconOnly,
    onPress,
    style,
    title,
    ...rest
  } = props;
  const accessibilityTraits = ['button'];

  if (disabled) {
    accessibilityTraits.push('disabled');
  }
  return (
    <LinearGradient
      colors={gradientColors}
      style={[containerStyle, style]}
    >
      <BpkTouchableOverlay
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={accessibilityTraits}
        borderRadius="pill"
        disabled={disabled}
        onPress={onPress}
        style={[buttonStyle, buttonTheme]}
        {...rest}
      >
        {children}
      </BpkTouchableOverlay>
    </LinearGradient>);
};

BpkButtonContainer.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
  iconOnly: PropTypes.bool,
  large: PropTypes.bool,
  style: ViewPropTypes.style,
  theme: themePropType,
};

BpkButtonContainer.defaultProps = {
  accessibilityLabel: null,
  disabled: false,
  iconOnly: false,
  large: false,
  style: null,
  theme: null,

};

export default BpkButtonContainer;
