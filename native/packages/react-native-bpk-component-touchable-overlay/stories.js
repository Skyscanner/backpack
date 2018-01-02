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
import BpkText from 'react-native-bpk-component-text';
import { storiesOf, action } from '@storybook/react-native';

import BpkTouchableOverlay from './index';

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'white',
  },
  view: {
    padding: 10,
  },
});

const textContent = (
  <BpkText style={styles.text}>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa.
  </BpkText>
);

const viewContent = <View style={styles.view}>{textContent}</View>;

const onPress = action('Touchable overlay press');

storiesOf('BpkTouchableOverlay', module)
  .add('docs:text-content', () => (
    <BpkTouchableOverlay
      onPress={onPress}
      accessibilityLabel="Example touchable overlay"
    >
      {textContent}
    </BpkTouchableOverlay>
  ))
  .add('docs:view-content', () => (
    <BpkTouchableOverlay
      onPress={onPress}
      accessibilityLabel="Example touchable overlay"
    >
      {viewContent}
    </BpkTouchableOverlay>
  ));
