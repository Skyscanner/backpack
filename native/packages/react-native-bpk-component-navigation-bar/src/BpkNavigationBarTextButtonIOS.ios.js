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
import { StyleSheet, TouchableOpacity } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import { colorGray700 } from 'bpk-tokens/tokens/base.react.native';

export type Props = {
  title: string,
  emphasize: boolean,
  leading: boolean,
  onPress: ?() => mixed,
  tintColor: ?string,
};

const styles = StyleSheet.create({
  button: {
    zIndex: 2,
  },
  leading: {
    marginStart: 8,
  },
  trailing: {
    marginEnd: 8,
  },
});

const BpkNavigationBarTextButtonIOS = (props: Props) => {
  const { title, emphasize, onPress, tintColor, leading } = props;
  const tintColorFinal = tintColor || colorGray700;
  const titleStyle = [{ color: tintColorFinal }];
  const buttonStyle = [
    styles.button,
    leading ? styles.leading : styles.trailing,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityComponentType="button"
      accessibilityTraits={['button']}
      accessibilityLabel={title}
      accessible
      style={buttonStyle}
    >
      <BpkText textStyle="lg" emphasize={emphasize} style={titleStyle}>
        {title}
      </BpkText>
    </TouchableOpacity>
  );
};

BpkNavigationBarTextButtonIOS.propTypes = {
  title: PropTypes.string.isRequired,
  emphasize: PropTypes.bool,
  onPress: PropTypes.func,

  // Internal only
  leading: PropTypes.bool,
  tintColor: PropTypes.string,
};

BpkNavigationBarTextButtonIOS.defaultProps = {
  emphasize: false,
  onPress: null,

  // Internal only
  leading: false,
  tintColor: null,
};

export default BpkNavigationBarTextButtonIOS;
