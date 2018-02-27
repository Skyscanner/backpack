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

import { getStyleForElement } from './../utils';

import {
  type CommonProps,
  COMMON_PROP_TYPES,
  COMMON_DEFAULT_PROPS,
} from './../common-types';

type Props = {
  ...$Exact<CommonProps>,
  children: Node,
};

const BpkButtonLinkWrapper = (props: Props) => {
  const containerStyle = getStyleForElement('container', props);
  const buttonStyle = getStyleForElement('button', props);
  const {
    accessibilityLabel,
    children,
    onPress,
    style,
    title,
    ...rest
  } = props;

  const accessibilityTraits = ['button'];

  return (
    <View style={[containerStyle, style]}>
      <TouchableNativeFeedback
        accessibilityComponentType="button"
        accessibilityLabel={accessibilityLabel || title}
        accessibilityTraits={accessibilityTraits}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        onPress={onPress}
        {...rest}
      >
        <View style={[buttonStyle]}>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};

BpkButtonLinkWrapper.propTypes = {
  ...COMMON_PROP_TYPES,
  children: PropTypes.node.isRequired,
};

BpkButtonLinkWrapper.defaultProps = COMMON_DEFAULT_PROPS;

export default BpkButtonLinkWrapper;
