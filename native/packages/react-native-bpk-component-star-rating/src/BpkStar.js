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
import { I18nManager, StyleSheet, View } from 'react-native';
import BpkIcon from 'react-native-bpk-component-icon';
import {
  spacingMd,
  spacingSm,
  colorYellow500,
  colorGray100,
} from 'bpk-tokens/tokens/base.react.native';
import { STAR_TYPES } from './star-types';

const STAR_SIZE = spacingMd + spacingSm;
const styles = StyleSheet.create({
  container: {
    width: STAR_SIZE,
    height: STAR_SIZE,
  },
  star: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    fontSize: STAR_SIZE,
    lineHeight: STAR_SIZE,
    color: colorGray100,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  foregroundStar: {
    zIndex: 2,
  },
  filled: {
    color: colorYellow500,
  },
  rightToLeftHalfStar: {
    transform: [{ scaleX: -1 }],
  },
});

const BpkStar = props => {
  const { type, ...rest } = props;
  const iconType = type === STAR_TYPES.FULL ? 'star' : 'star-half';

  const commonStarStyles = [styles.star];

  const foregroundStarStyles = [
    ...commonStarStyles,
    styles.foregroundStar,
    styles.filled,
  ];

  if (I18nManager.isRTL && type === STAR_TYPES.HALF) {
    foregroundStarStyles.push(styles.rightToLeftHalfStar);
  }

  /*
   * Here we render two stars that are absolutely positioned inside a View.
   * We always render a gray star(background) and then conditionally render
   * a yellow half star or star ontop of it.
   */
  return (
    <View style={styles.container} {...rest} accessible={false}>
      <BpkIcon icon="star" style={commonStarStyles} />
      {type !== STAR_TYPES.EMPTY && (
        <BpkIcon icon={iconType} style={foregroundStarStyles} />
      )}
    </View>
  );
};

BpkStar.propTypes = {
  type: PropTypes.oneOf([STAR_TYPES.EMPTY, STAR_TYPES.HALF, STAR_TYPES.FULL])
    .isRequired,
};

export default BpkStar;
