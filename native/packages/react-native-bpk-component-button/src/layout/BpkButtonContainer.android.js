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

import { View, TouchableNativeFeedback } from 'react-native';
import React, { type Node } from 'react';
import PropTypes from 'prop-types';

import { getStyleForElement, getAndroidBackgroundColour } from './../utils';

import {
  type CommonProps,
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
} from './../common-types';

type Props = {
  ...$Exact<CommonProps>,
  children: Node,
};

const BpkButtonContainer = (props: Props) => {
  const { theme } = props;
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
    <View style={[containerStyle, style]}>
      <TouchableNativeFeedback
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={accessibilityTraits}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        disabled={disabled}
        onPress={onPress}
        {...rest}
      >
        <View style={[buttonStyle, backgroundColor]}>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};

BpkButtonContainer.propTypes = {
  ...COMMON_PROP_TYPES,
  children: PropTypes.node.isRequired,
};

BpkButtonContainer.defaultProps = COMMON_DEFAULT_PROPS;

export default BpkButtonContainer;
