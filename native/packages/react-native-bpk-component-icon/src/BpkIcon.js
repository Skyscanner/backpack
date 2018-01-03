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
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import iconMappings from 'bpk-svgs/dist/font/iconMapping.json';
import {
  spacingBase,
  spacingLg,
  colorGray700,
} from 'bpk-tokens/tokens/base.react.native';

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

const mapCharacterCode = characterCode =>
  String.fromCharCode(parseInt(characterCode, 16));

type Props = {
  icon: string,
  small?: boolean,
  style?: {} | Array<{}>,
};

const BpkIcon = (props: Props) => {
  const { icon, small, style, ...rest } = props;

  const characterCode = iconMappings[icon];

  const textStyleFinal = [styles.icon];

  if (small) {
    textStyleFinal.push(styles.small);
  }

  if (style) {
    textStyleFinal.push(style);
  }

  return (
    <Text style={textStyleFinal} {...rest}>
      {mapCharacterCode(characterCode)}
    </Text>
  );
};

BpkIcon.propTypes = {
  icon: PropTypes.oneOf(Object.keys(iconMappings)).isRequired,
  small: PropTypes.bool,
  style: Text.propTypes.style,
};

BpkIcon.defaultProps = {
  small: false,
  style: null,
};

/*
Expose icon mapping keys as both key and value
so they can be used by consumers.
*/
const icons: Object = {};
Object.keys(iconMappings).forEach(name => {
  icons[name] = name;
});

export default BpkIcon;
export { icons };
