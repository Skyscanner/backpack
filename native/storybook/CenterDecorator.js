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
import { StyleSheet, View } from 'react-native';
import {
  spacingBase,
  spacingLg,
  spacingXxl,
} from '../../packages/bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: spacingBase,
    width: '100%',
    marginTop: spacingLg,
  },
  rtlButton: {
    justifyContent: 'flex-end',
    marginVertical: spacingBase,
    width: spacingXxl * 3,
  },
});

const CenterDecorator = getStory => (
  <View style={styles.centered}>{getStory()}</View>
);

export default CenterDecorator;
