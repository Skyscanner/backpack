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
import { Platform, type StyleObj, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import BpkIcon from 'react-native-bpk-component-icon';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';

type Props = {
  onPress: () => mixed,
  style: StyleObj,
};

const BpkChipDismissButton = (props: Props) => {
  const { style, ...rest } = props;
  const { Touchable, touchableProps } = Platform.select({
    android: {
      Touchable: BpkTouchableNativeFeedback,
      touchableProps: {
        accessibilityComponentType: 'button',
      },
    },
    ios: {
      Touchable: BpkTouchableOverlay,
      touchableProps: {
        accessibilityTraits: ['button'],
        borderRadius: 'sm',
      },
    },
  });

  return (
    <Touchable {...touchableProps} {...rest}>
      <View style={style}>
        <BpkIcon icon="close" small />
      </View>
    </Touchable>
  );
};

BpkChipDismissButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};

BpkChipDismissButton.defaultProps = {
  style: null,
};

export default BpkChipDismissButton;
