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
  PixelRatio,
  Platform,
  StyleSheet,
  TouchableHighlight,
  View,
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: colorWhite,
    borderRadius: borderRadiusSm,
    shadowColor: shadowSmColor,
    shadowOffset: { width: shadowSmOffsetWidth, height: shadowSmOffsetHeight / PixelRatio.get() },
    shadowOpacity: shadowSmOpacity,
    shadowRadius: shadowSmRadius / PixelRatio.get(),
  },
  cardPadded: {
    padding: spacingBase,
  },
  cardFocused: {
    shadowColor: shadowXlColor,
    shadowOffset: { width: shadowXlOffsetWidth, height: shadowXlOffsetHeight / PixelRatio.get() },
    shadowOpacity: shadowXlOpacity,
    shadowRadius: shadowXlRadius / PixelRatio.get(),
  },
  cardInner: {
    backgroundColor: 'transparent', // otherwise this view's corners would bleed outwith the outer container
  },
});

const BpkCard = (props) => {
  const {
    padded,
    children,
    focused,
    style: userStyle,
    ...rest
  } = props;

  const style = [styles.card];
  if (padded) { style.push(styles.cardPadded); }
  if (focused) { style.push(styles.cardFocused); }
  if (userStyle) { style.push(userStyle); }

  return (
    <TouchableHighlight
      accessibilityComponentType="button"
      underlayColor={colorGray50}
      style={style}
      {...rest}
    >
      <View style={styles.cardInner}>{children}</View>
    </TouchableHighlight>
  );
};

BpkCard.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  focused: PropTypes.bool,
  padded: PropTypes.bool,
  style: ViewPropTypes.style,
};

BpkCard.defaultProps = {
  focused: false,
  padded: true,
  style: null,
};

export default BpkCard;
