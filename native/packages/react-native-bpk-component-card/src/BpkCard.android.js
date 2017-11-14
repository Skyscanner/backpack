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
  TouchableNativeFeedback,
  ViewPropTypes,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  colorWhite,
  elevationXs,
  elevationLg,
  borderRadiusSm,
  spacingBase,
} = tokens;

/**
 * Define styles needed by the component
 */
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

    <View style={userStyle}>
      <TouchableNativeFeedback
        useForeground
        accessibilityComponentType="button"
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        {...rest}
      >
        <View style={style}>
          <View>{children}</View>
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
};

BpkCard.defaultProps = {
  focused: false,
  padded: true,
  style: null,
};

export default BpkCard;
