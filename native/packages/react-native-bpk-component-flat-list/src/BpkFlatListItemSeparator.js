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

import { Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import {
  spacingMd,
  spacingBase,
  colorGray100,
} from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  separator: {
    flex: 1,
    height: 1, // eslint-disable-line backpack/use-tokens
    backgroundColor: colorGray100,
    ...Platform.select({
      ios: {
        marginLeft: spacingBase,
      },
      android: {
        marginHorizontal: spacingMd,
      },
    }),
  },
});

const BpkFlatListItemSeparator = () => <View style={styles.separator} />;

export default BpkFlatListItemSeparator;
