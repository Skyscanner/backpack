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
import { spacingLg, colorGray100 } from 'bpk-tokens/tokens/base.react.native';
import { type Flag } from './common-types';

const styles = StyleSheet.create({
  flag: {
    borderColor: colorGray100,
    borderWidth: 1,
    width: spacingLg,
    height: spacingLg / 3 * 2, // 3:2 aspect ratio with width.
  },
});

type Props = {
  image: ?Flag,
};

const BpkFlag = ({ image }: Props) =>
  image ? (
    React.cloneElement(image, {
      resizeMode: 'contain', // Preserve aspect ratio when resizing.
      style: styles.flag,
    })
  ) : (
    <View style={styles.flag} />
  );

BpkFlag.propTypes = {
  image: PropTypes.element,
};

BpkFlag.defaultProps = {
  image: null,
};

export default BpkFlag;
