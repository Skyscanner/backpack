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
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { getStyleForElement, getThemingForElement } from './../utils';

import {
  type CommonProps,
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
} from './../common-types';

type Props = {
  ...$Exact<CommonProps>,
  children: Node,
  large: boolean,
};

const BpkButtonLinkWrapper = (props: Props) => {
  const { theme } = props;
  const containerStyle = getStyleForElement('container', props);
  const buttonStyle = getStyleForElement('button', props);
  const buttonTheme = getThemingForElement('button', theme);
  const {
    accessibilityLabel,
    children,
    onPress,
    style,
    title,
    icon,
    ...rest
  } = props;
  const accessibilityTraits = ['button'];

  return (
    <View style={[containerStyle, style]}>
      <TouchableOpacity
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={accessibilityTraits}
        onPress={onPress}
        style={[buttonStyle, buttonTheme]}
        {...rest}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

BpkButtonLinkWrapper.propTypes = {
  ...COMMON_PROP_TYPES,
  children: PropTypes.node.isRequired,
  large: PropTypes.bool,
};

BpkButtonLinkWrapper.defaultProps = {
  ...COMMON_DEFAULT_PROPS,
  large: false,
};

export default BpkButtonLinkWrapper;
