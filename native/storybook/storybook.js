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
import { AppRegistry, StyleSheet, View } from 'react-native';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';

import { spacingBase } from './../../packages/bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: spacingBase,
    width: '100%',
  },
});

const CenterDecorator = getStory => (
  <View style={styles.centered}>
    {getStory()}
  </View>
);

addDecorator(CenterDecorator);

/* eslint-disable global-require */
configure(() => {
  require('../packages/react-native-bpk-component-animate-height/stories');
  require('../packages/react-native-bpk-component-banner-alert/stories');
  require('../packages/react-native-bpk-component-button/stories');
  require('../packages/react-native-bpk-component-card/stories');
  require('../packages/react-native-bpk-component-horizontal-nav/stories');
  require('../packages/react-native-bpk-component-icon/stories');
  require('../packages/react-native-bpk-component-spinner/stories');
  require('../packages/react-native-bpk-component-switch/stories');
  require('../packages/react-native-bpk-component-text-input/stories');
  require('../packages/react-native-bpk-component-text/stories');
  require('../packages/react-native-bpk-component-ticket/stories');
  require('../packages/react-native-bpk-theming/stories');
  require('../packages/react-native-bpk-component-touchable-overlay/stories');
}, module);
/* eslint-enable global-require */

const StorybookUI = getStorybookUI({ onDeviceUI: false });

AppRegistry.registerComponent('native', () => StorybookUI);

export default StorybookUI;
