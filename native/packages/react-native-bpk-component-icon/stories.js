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
import { storiesOf } from '@storybook/react-native';
import { Platform, View, StyleSheet } from 'react-native';
import iconMappings from 'bpk-svgs/dist/font/iconMapping.json';
import BpkIcon from './index';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  colorBlue700,
  spacingBase,
} = tokens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    color: colorBlue700,
  },
});

storiesOf('BpkIcon', module)
  .add('docs:icons', () => (
    <View style={styles.container} >
      <View style={styles.group} >
        {Object.keys(iconMappings).map(name => (
          <BpkIcon
            key={name}
            icon={name}
            style={styles.icon}
          />
        ))}
      </View>
    </View>
  ));

