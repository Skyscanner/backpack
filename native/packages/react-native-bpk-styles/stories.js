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
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  spacingBase,
  spacingXxl,
  borderRadiusSm,
} from 'bpk-tokens/tokens/base.react.native';
import BpkText from 'react-native-bpk-component-text';

import CenterDecorator from '../../storybook/CenterDecorator';
import { gradients } from './index';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    flex: 1,
    flexWrap: 'wrap',
  },
  swatch: {
    width: spacingXxl * 3,
    height: spacingXxl * 3,
    borderRadius: borderRadiusSm,
  },
  swatchContainer: {
    flexDirection: 'column',
    marginBottom: spacingBase,
  },
});

storiesOf('react-native-bpk-styles', module)
  .addDecorator(CenterDecorator)
  .add('docs:gradients', () => (
    <View style={styles.container}>
      {Object.keys(gradients.ANGLES).map(key => (
        <View key={key} style={styles.swatchContainer}>
          <BpkText>{key}</BpkText>
          <LinearGradient
            style={styles.swatch}
            {...gradients.primary(gradients.ANGLES[key])}
          />
        </View>
      ))}
    </View>
  ))
  .add('docs:full', () => (
    <LinearGradient style={styles.container} {...gradients.primary()} />
  ));
