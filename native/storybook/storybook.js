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
import { I18nManager, AppRegistry, StyleSheet, View } from 'react-native';
import RNRestart from 'react-native-restart';
import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';

import BpkButton from '../packages/react-native-bpk-component-button';
import {
  spacingBase,
  spacingLg,
  spacingXxl,
} from './../../packages/bpk-tokens/tokens/base.react.native';

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
const toggleRTL = () => {
  I18nManager.forceRTL(!I18nManager.isRTL);
  RNRestart.Restart();
};

const CenterDecorator = getStory => (
  <View style={styles.centered}>{getStory()}</View>
);
const RTLDecorator = getStory => (
  <View>
    {getStory()}
    <BpkButton
      style={styles.rtlButton}
      type="secondary"
      title={I18nManager.isRTL ? 'Turn RTL off' : 'Turn RTL on'}
      onPress={toggleRTL}
    />
  </View>
);
addDecorator(RTLDecorator);
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
  require('../packages/react-native-bpk-component-star-rating/stories');
  require('../packages/react-native-bpk-component-switch/stories');
  require('../packages/react-native-bpk-component-text-input/stories');
  require('../packages/react-native-bpk-component-text/stories');
  require('../packages/react-native-bpk-theming/stories');
  require('../packages/react-native-bpk-component-touchable-overlay/stories');
}, module);
/* eslint-enable global-require */

const StorybookUI = getStorybookUI({ onDeviceUI: false });

AppRegistry.registerComponent('native', () => StorybookUI);

export default StorybookUI;
