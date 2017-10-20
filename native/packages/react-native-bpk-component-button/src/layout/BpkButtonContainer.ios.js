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

import {
  View,
  TouchableHighlight,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';

import {
  getStyleForElement,
  getThemingForElement,
  getGradientColors,
  themePropType,
} from './../utils';
import styles from './../BpkButton-styles';

const BpkButtonContainer = (props) => {
  const theme = props.theme;
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
      <TouchableHighlight
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={accessibilityTraits}
        disabled={disabled}
        onPress={onPress}
        style={[buttonStyle, buttonTheme]}
        underlayColor={styles.underlayColor}
        {...rest}
      >
        {children}
      </TouchableHighlight>
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
  style: View.propTypes.style,
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
