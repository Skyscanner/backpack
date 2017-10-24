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
  TouchableNativeFeedback,
  ViewPropTypes,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

import {
  getStyleForElement,
  getAndroidBackgroundColour,
  themePropType,
} from './../utils';

const BpkButtonContainer = (props) => {
  const theme = props.theme;
  const containerStyle = getStyleForElement('container', props);
  const buttonStyle = getStyleForElement('button', props);
  const backgroundColor = getAndroidBackgroundColour(theme, props);
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
    <View
      style={[containerStyle, style]}
    >
      <TouchableNativeFeedback
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={accessibilityTraits}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        disabled={disabled}
        onPress={onPress}
        {...rest}
      >
        <View
          style={[buttonStyle, backgroundColor]}
        >
          {children}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

BpkButtonContainer.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  accessibilityLabel: PropTypes.string,
  disabled: PropTypes.bool,
  iconOnly: PropTypes.bool,
  style: ViewPropTypes.style,
  theme: themePropType,
};

BpkButtonContainer.defaultProps = {
  accessibilityLabel: null,
  disabled: false,
  iconOnly: false,
  style: null,
  theme: null,
};

export default BpkButtonContainer;
