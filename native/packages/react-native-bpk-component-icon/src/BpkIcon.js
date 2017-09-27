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

import React from 'react';
import PropTypes from 'prop-types';
import { Text, Platform, StyleSheet, View } from 'react-native';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  spacingBase,
  spacingLg,
} = tokens;

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'BpkIcon',
    fontSize: spacingLg,
  },
  small: {
    fontSize: spacingBase,
  },
});

const BpkIcon = (props) => {
  const { iconName, color, small, style, ...rest } = props;

  const textStyleFinal = [styles.icon, small && styles.small];
  textStyleFinal.push({ color });
  if (style) {
    textStyleFinal.push(style);
  }

  return (<Text style={textStyleFinal} {...rest} >{'\uEA80'}</Text>);
};

BpkIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired, // TODO Color Prop Type???
  small: PropTypes.bool,
  style: View.propTypes.style,
};

BpkIcon.defaultProps = {
  small: false,
  style: null,
};

export default BpkIcon;
