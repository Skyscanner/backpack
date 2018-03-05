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
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import { spacingLg, colorGray100 } from 'bpk-tokens/tokens/base.react.native';
import { type Flag } from './common-types';

const ASPECT_RATIO = 3 / 2; // 3:2

type Props = {
  width: number,
  flag: ?Flag,
  style: ?(Object | Array<Object>),
};

const styles = StyleSheet.create({
  flag: {
    borderColor: colorGray100,
    borderWidth: 1,
  },
});

const BpkFlag = (props: Props) => {
  const { flag, style, width } = props;
  const imageStyle = { width, height: width / ASPECT_RATIO };
  const finalStyle = [styles.flag, imageStyle];

  if (style) {
    finalStyle.push(style);
  }

  const styledFlag = flag ? (
    React.cloneElement(flag, {
      resizeMode: 'contain',
      style: finalStyle,
    })
  ) : (
    <View style={finalStyle} />
  );

  return styledFlag;
};

BpkFlag.propTypes = {
  width: PropTypes.number,
  flag: PropTypes.element,
  style: ViewPropTypes.style,
};

BpkFlag.defaultProps = {
  width: spacingLg,
  flag: null,
  style: null,
};

export default BpkFlag;
