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
import { StyleSheet, View } from 'react-native';
import { getTypeByRating } from './star-types';
import BpkStar from './BpkStar';

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row',
  },
});

const BpkStarRating = props => {
  const { ratingLabel, rating, maxRating, ...rest } = props;

  const stars = new Array(maxRating).fill(undefined).map((_, i) => {
    const type = getTypeByRating(i + 1, rating);

    return <BpkStar type={type} key={`star-${i}`} />; // eslint-disable-line react/no-array-index-key
  });

  const label =
    typeof ratingLabel === 'string'
      ? ratingLabel
      : ratingLabel(rating, maxRating);

  return (
    <View
      style={styles.starsContainer}
      accessibilityLabel={label}
      accessible
      {...rest}
    >
      {stars}
    </View>
  );
};

BpkStarRating.propTypes = {
  ratingLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  rating: PropTypes.number,
  maxRating: PropTypes.number,
};

BpkStarRating.defaultProps = {
  rating: 0,
  maxRating: 5,
};

export default BpkStarRating;
