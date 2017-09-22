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
import { Text, Platform, StyleSheet } from 'react-native';
import iconMappings from 'bpk-svgs/dist/font/iconMapping.json';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  spacingBase,
  spacingLg,
  colorGray700,
} = tokens;

const styles = StyleSheet.create({
  icon: {
    fontFamily: 'BpkIcon',
    fontSize: spacingLg,
    lineHeight: spacingLg,
    color: colorGray700,
  },
  small: {
    fontSize: spacingBase,
    lineHeight: spacingBase,
  },
});

const mapCharacterCode = characterCode => String.fromCharCode(parseInt(characterCode, 16));

const BpkIcon = (props) => {
  const { icon, small, style, ...rest } = props;

  const characterCode = iconMappings[icon];

  const textStyleFinal = [styles.icon];

  if (small) {
    textStyleFinal.push(styles.small);
  }

  if (style) {
    textStyleFinal.push(style);
  }

  return (<Text style={textStyleFinal} {...rest} >{mapCharacterCode(characterCode)}</Text>);
};

BpkIcon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(iconMappings)),
  small: PropTypes.bool,
  style: Text.propTypes.style,
};

BpkIcon.defaultProps = {
  icon: undefined,
  small: false,
  style: null,
};

export default BpkIcon;
