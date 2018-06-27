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
import {
  Platform,
  View,
  ViewPropTypes,
  StyleSheet,
  type StyleObj,
} from 'react-native';
import PropTypes from 'prop-types';
import BpkText from 'react-native-bpk-component-text';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';
import {
  borderRadiusSm,
  colorBlue700,
  colorGray100,
  colorGray700,
  colorWhite,
  spacingSm,
  spacingLg,
} from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colorGray100,
    borderRadius: borderRadiusSm,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
    height: spacingSm * 5,
    justifyContent: 'space-between',
    paddingHorizontal: spacingSm,
  },
  innerLarge: {
    height: spacingLg + spacingSm,
  },
  wrapperSelected: {
    backgroundColor: colorBlue700,
  },
  text: {
    color: colorGray700,
  },
  textSelected: {
    color: colorWhite,
  },
});

type Props = {
  accessibilityLabel: string,
  onPress: () => mixed,
  label: string,
  large: boolean,
  selected: boolean,
  style: ?StyleObj,
};

const BpkChip = (props: Props) => {
  const { accessibilityLabel, label, large, selected, style, ...rest } = props;

  const wrapperStyle = [styles.wrapper];
  const innerStyle = [styles.inner];
  const textStyle = [styles.text];

  if (large) {
    innerStyle.push(styles.innerLarge);
  }

  if (selected) {
    wrapperStyle.push(styles.wrapperSelected);
    textStyle.push(styles.textSelected);
  }

  if (style) {
    wrapperStyle.push(style);
  }

  const { Touchable, touchableProps } = Platform.select({
    android: {
      Touchable: BpkTouchableNativeFeedback,
      touchableProps: {
        accessibilityLabel,
        accessibilityComponentType: 'button',
      },
    },
    ios: {
      Touchable: BpkTouchableOverlay,
      touchableProps: {
        accessibilityLabel,
        accessibilityTraits: selected ? ['button', 'selected'] : ['button'],
        borderRadius: 'sm',
      },
    },
  });

  return (
    <View style={wrapperStyle}>
      <Touchable {...touchableProps} {...rest}>
        <View style={innerStyle}>
          <BpkText textStyle="xs" style={textStyle}>
            {label}
          </BpkText>
        </View>
      </Touchable>
    </View>
  );
};

BpkChip.propTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  large: PropTypes.bool,
  selected: PropTypes.bool,
  style: ViewPropTypes.style,
};

BpkChip.defaultProps = {
  large: false,
  selected: false,
  style: null,
};

export default BpkChip;
