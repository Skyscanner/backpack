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

import {
  View,
  StyleSheet,
  TouchableNativeFeedback,
  ViewPropTypes,
} from 'react-native';
import {
  colorWhite,
  elevationXs,
  elevationLg,
  borderRadiusSm,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';
import React from 'react';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colorWhite,
    borderRadius: borderRadiusSm,
    elevation: elevationXs,
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
    padded,
    children,
    focused,
    style: userStyle,
    innerStyle,
    ...rest
  } = props;

  const style = [styles.card];
  if (padded) {
    style.push(styles.cardPadded);
  }
  if (focused) {
    style.push(styles.cardFocused);
  }
  if (userStyle) {
    style.push(userStyle);
  }

  return (
    <View style={userStyle}>
      <TouchableNativeFeedback
        useForeground
        accessibilityComponentType="button"
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        {...rest}
      >
        <View style={style}>
          <View style={innerStyle}>{children}</View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

BpkCard.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  padded: PropTypes.bool,
  style: ViewPropTypes.style,
  innerStyle: ViewPropTypes.style,
};

BpkCard.defaultProps = {
  focused: false,
  padded: true,
  style: null,
  innerStyle: null,
};

export default BpkCard;
