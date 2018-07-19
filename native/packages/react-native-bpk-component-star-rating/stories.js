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

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkText from 'react-native-bpk-component-text';
import BpkStarRating, { BpkStar, STAR_TYPES } from './index';
import CenterDecorator from '../../storybook/CenterDecorator';

const StarRating = props => (
  <BpkStarRating ratingLabel={(r, m) => `${r} out of ${m} stars`} {...props} />
);
const styles = StyleSheet.create({
  container: {
    padding: spacingBase,
  },
});
storiesOf('react-native-bpk-component-star-rating/BpkStarRating', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <View>
      <View style={styles.container}>
        <BpkText>0 out of 5</BpkText>
        <StarRating rating={0} />
      </View>
      <View style={styles.container}>
        <BpkText>2.5 out of 5</BpkText>
        <StarRating rating={2.5} />
      </View>
      <View style={styles.container}>
        <BpkText>5 out of 5</BpkText>
        <StarRating rating={5} />
      </View>
    </View>
  ))
  .add('Full Stars', () => (
    <View style={styles.container}>
      <BpkText>5 out of 5</BpkText>
      <StarRating rating={5} />
    </View>
  ))
  .add('Empty Stars', () => (
    <View style={styles.container}>
      <BpkText>0 out of 5</BpkText>
      <StarRating rating={0} />
    </View>
  ))
  .add('3 Stars Rating', () => (
    <View style={styles.container}>
      <BpkText>3 out of 5</BpkText>
      <StarRating rating={3} />
    </View>
  ))
  .add('3 1/2 Stars Rating', () => (
    <View style={styles.container}>
      <BpkText>3.5 out of 5</BpkText>
      <StarRating rating={3.5} />
    </View>
  ))
  .add('3.3 Stars', () => (
    <View style={styles.container}>
      <BpkText>3.3 out of 5</BpkText>
      <StarRating rating={3.3} />
    </View>
  ))
  .add('3.7 Stars', () => (
    <View style={styles.container}>
      <BpkText>3.7 out of 5</BpkText>
      <StarRating rating={3.7} />
    </View>
  ));

storiesOf('react-native-bpk-component-star-rating/BpkStar', module)
  .addDecorator(CenterDecorator)
  .add('Full', () => (
    <View style={styles.container}>
      <BpkText>Full Star</BpkText>
      <BpkStar type={STAR_TYPES.FULL} />
    </View>
  ))
  .add('Half', () => (
    <View style={styles.container}>
      <BpkText>Half Star</BpkText>
      <BpkStar type={STAR_TYPES.HALF} />
    </View>
  ))
  .add('Empty', () => (
    <View style={styles.container}>
      <BpkText>Empty Star</BpkText>
      <BpkStar type={STAR_TYPES.EMPTY} />
    </View>
  ));
