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

import { View, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {
  colorBlue500,
  colorGray100,
} from 'bpk-tokens/tokens/base.react.native';

// Not using a token as this is replicating an Android native UI element.
const radioSize = 20;
const innerSize = radioSize / 2;

const styles = StyleSheet.create({
  outer: {
    borderRadius: radioSize,
    borderWidth: 2,
    borderColor: colorGray100,
    height: radioSize,
    width: radioSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerSelected: {
    borderColor: colorBlue500,
  },
  inner: {
    backgroundColor: colorGray100,
    borderRadius: innerSize,
    height: innerSize,
    width: innerSize,
  },
  innerSelected: {
    backgroundColor: colorBlue500,
  },
});

type Props = {
  selected: boolean,
};

const BpkRadioIcon = ({ selected }: Props) => {
  const outerStyle = [styles.outer];
  const innerStyle = [styles.inner];
  if (selected) {
    outerStyle.push(styles.outerSelected);
    innerStyle.push(styles.innerSelected);
  }
  return (
    <View style={outerStyle}>
      <View style={innerStyle} />
    </View>
  );
};

BpkRadioIcon.propTypes = {
  selected: PropTypes.bool,
};

BpkRadioIcon.defaultProps = {
  selected: false,
};

export default BpkRadioIcon;
