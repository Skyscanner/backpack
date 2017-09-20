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
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  colorGray50,
  colorGray900,
  colorWhite,
  spacingBase,
} = tokens;

/**
 * Define styles needed by the component
 */
const styles = StyleSheet.create({
  card: {
    // TODO: update once tokens are available
    backgroundColor: colorWhite,
    elevation: 3,
    shadowColor: colorGray900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  common: {
    // TODO: update once tokens are available
    borderRadius: 8,
  },
  overflowHidden: {
    // TODO: update once tokens are available
    overflow: 'hidden',
  },
  padded: {
    padding: spacingBase,
  },
});

const BpkCard = (props) => {
  const { padded, children, onPress, style, ...rest } = props;

  const cardBaseStyle = [styles.card, styles.common];

  if (padded) {
    cardBaseStyle.push(styles.padded);
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
  onPress: PropTypes.func.isRequired,
  padded: PropTypes.bool,
  style: View.propTypes.style,
};

BpkCard.defaultProps = {
  children: null,
  padded: true,
  style: null,
};

export default BpkCard;
