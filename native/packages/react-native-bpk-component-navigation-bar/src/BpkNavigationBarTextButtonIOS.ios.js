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
import {
  colorGray300,
  colorGray700,
} from 'bpk-tokens/tokens/base.react.native';

export type Props = {
  title: string,
  emphasize: boolean,
  disabled: boolean,
  onPress: ?() => mixed,

  // Internal only
  leading: boolean,
  tintColor: ?string,
  disabledTintColor: ?string,
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
  const {
    title,
    disabled,
    emphasize,
    onPress,
    disabledTintColor,
    tintColor,
    leading,
  } = props;
  const tintColorFinal = disabled
    ? disabledTintColor || colorGray300
    : tintColor || colorGray700;
  const titleStyle = [{ color: tintColorFinal }];
  const buttonStyle = [
    styles.button,
    leading ? styles.leading : styles.trailing,
  ];
  const accessibilityTraits = ['button'];

  if (disabled) {
    accessibilityTraits.push('disabled');
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityComponentType="button"
      accessibilityTraits={accessibilityTraits}
      accessibilityLabel={title}
      accessible
      style={buttonStyle}
      disabled={disabled}
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
  disabled: PropTypes.bool,
  onPress: PropTypes.func,

  // Internal only
  leading: PropTypes.bool,
  tintColor: PropTypes.string,
  disabledTintColor: PropTypes.string,
};

BpkNavigationBarTextButtonIOS.defaultProps = {
  emphasize: false,
  disabled: false,
  onPress: null,

  // Internal only
  leading: false,
  tintColor: null,
  disabledTintColor: null,
};

export default BpkNavigationBarTextButtonIOS;
