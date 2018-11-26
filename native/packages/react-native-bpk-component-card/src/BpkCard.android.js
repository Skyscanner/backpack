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

import { View, StyleSheet, ViewPropTypes } from 'react-native';
import {
  colorWhite,
  elevationSm,
  elevationLg,
  borderRadiusSm,
  borderRadiusLg,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';
import React from 'react';
import PropTypes from 'prop-types';
import CORNER_STYLES, { defaultCornerStyle } from './BpkCardCornerStyles';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colorWhite,
    borderRadius: borderRadiusSm,
    elevation: elevationSm,
  },
  cardCornerStyleLarge: {
    borderRadius: borderRadiusLg,
  },
  cardPadded: {
    padding: spacingBase,
  },
  cardFocused: {
    elevation: elevationLg,
  },
});

const BpkCard = props => {
  const {
    children,
    cornerStyle,
    focused,
    padded,
    style: userStyle,
    innerStyle: userInnerStyle,
    ...rest
  } = props;

  const style = [styles.card];
  const innerStyle = [];

  if (padded) {
    innerStyle.push(styles.cardPadded);
  }
  if (focused) {
    style.push(styles.cardFocused);
  }
  if (userStyle) {
    style.push(userStyle);
  }
  if (userInnerStyle) {
    innerStyle.push(userInnerStyle);
  }
  if (cornerStyle === CORNER_STYLES.lg) {
    style.push(styles.cardCornerStyleLarge);
  }

  return (
    <View style={style}>
      <BpkTouchableNativeFeedback accessibilityComponentType="button" {...rest}>
        <View style={innerStyle}>{children}</View>
      </BpkTouchableNativeFeedback>
    </View>
  );
};

BpkCard.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  cornerStyle: PropTypes.oneOf(Object.keys(CORNER_STYLES)),
  focused: PropTypes.bool,
  innerStyle: ViewPropTypes.style,
  padded: PropTypes.bool,
  style: ViewPropTypes.style,
};

BpkCard.defaultProps = {
  cornerStyle: defaultCornerStyle,
  focused: false,
  innerStyle: null,
  padded: true,
  style: null,
};

export default BpkCard;
