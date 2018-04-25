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
import { type ListItemImage } from './common-types';

const ASPECT_RATIO = 3 / 2; // 3:2

type Props = {
  width: number,
  image: ?ListItemImage,
  style: ?any,
};

const styles = StyleSheet.create({
  image: {
    borderColor: colorGray100,
    borderWidth: 1,
  },
});

const BpkListItemImage = (props: Props) => {
  const { image, style, width } = props;
  const imageStyle = { width, height: width / ASPECT_RATIO };
  const finalStyle = [styles.flag, imageStyle];

  if (style) {
    finalStyle.push(style);
  }

  const styledImage = image ? (
    React.cloneElement(image, {
      resizeMode: 'contain',
      style: finalStyle,
    })
  ) : (
    <View style={finalStyle} />
  );

  return styledImage;
};

BpkListItemImage.propTypes = {
  width: PropTypes.number,
  flag: PropTypes.element,
  style: ViewPropTypes.style,
};

BpkListItemImage.defaultProps = {
  width: spacingLg,
  flag: null,
  style: null,
};

export default BpkListItemImage;
