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
  Platform,
  StyleSheet,
  TouchableHighlight,
  PixelRatio,
  ViewPropTypes,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  colorGray50,
  colorWhite,
  elevationXs,
  elevationLg,
  borderRadiusSm,
  spacingBase,
  shadowSmColor,
  shadowSmOffsetWidth,
  shadowSmOffsetHeight,
  shadowSmOpacity,
  shadowSmRadius,
  shadowXlColor,
  shadowXlOffsetWidth,
  shadowXlOffsetHeight,
  shadowXlOpacity,
  shadowXlRadius,
} = tokens;

/**
 * Define styles needed by the component
 */
const styles = StyleSheet.create({
  card: {
    backgroundColor: colorWhite,
    elevation: elevationXs,
    shadowColor: shadowSmColor,
    shadowOffset: { width: shadowSmOffsetWidth, height: shadowSmOffsetHeight / PixelRatio.get() },
    shadowOpacity: shadowSmOpacity,
    shadowRadius: shadowSmRadius / PixelRatio.get(),
  },
  common: {
    borderRadius: borderRadiusSm,
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  padded: {
    padding: spacingBase,
  },
  focused: {
    elevation: elevationLg,
    shadowColor: shadowXlColor,
    shadowOffset: { width: shadowXlOffsetWidth, height: shadowXlOffsetHeight / PixelRatio.get() },
    shadowOpacity: shadowXlOpacity,
    shadowRadius: shadowXlRadius / PixelRatio.get(),
  },
});

const BpkCard = (props) => {
  const {
    padded, children, focused, onPress, style, ...rest
  } = props;

  const cardBaseStyle = [styles.card, styles.common];

  if (padded) {
    cardBaseStyle.push(styles.padded);
  }

  if (focused) {
    cardBaseStyle.push(styles.focused);
  }

  return (
    <TouchableHighlight
      accessibilityComponentType="button"
      onPress={onPress}
      style={[cardBaseStyle, style]}
      underlayColor={colorGray50}
      {...rest}
    >
      <View
        style={[styles.overflowHidden, styles.common]}
      >
        {children}
      </View>
    </TouchableHighlight>
  );
};

BpkCard.propTypes = {
  children: PropTypes.node.isRequired,
  focused: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  padded: PropTypes.bool,
  style: ViewPropTypes.style,
};

BpkCard.defaultProps = {
  focused: false,
  padded: true,
  style: null,
};

export default BpkCard;
