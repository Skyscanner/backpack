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

import addon from '@storybook/addons';
import RNRestart from 'react-native-restart';
import { I18nManager, AppRegistry, YellowBox } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import { RTL_EVENT, CHANNEL_POLL_INTERVAL } from './constants';

const toggleRTL = rtlEnabled => {
  I18nManager.forceRTL(!rtlEnabled);
  RNRestart.Restart();
};

const onChannelAvailable = (...fns) => {
  const interval = setInterval(() => {
    try {
      const channel = addon.getChannel();
      clearInterval(interval);
      fns.map(fn => fn(channel));
      return true;
    } catch (exe) {
      return false;
    }
  }, CHANNEL_POLL_INTERVAL);
};

const enableRtlFromUi = channel => {
  channel.on(RTL_EVENT, toggleRTL);
};

const hideWarnings = () => {
  // TODO: this warning is being trigger by an internal react code, we can remove it when it gets fixed
  // see: https://github.com/facebook/react-native/issues/18868#issuecomment-382671739
  YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
};

/* eslint-disable global-require */
configure(() => {
  require('../packages/react-native-bpk-component-alert/stories');
  require('../packages/react-native-bpk-component-animate-height/stories');
  require('../packages/react-native-bpk-component-banner-alert/stories');
  require('../packages/react-native-bpk-component-badge/stories');
  require('../packages/react-native-bpk-component-button-link/stories');
  require('../packages/react-native-bpk-component-button/stories');
  require('../packages/react-native-bpk-component-card/stories');
  require('../packages/react-native-bpk-component-flat-list/stories');
  require('../packages/react-native-bpk-component-horizontal-nav/stories');
  require('../packages/react-native-bpk-component-icon/stories');
  require('../packages/react-native-bpk-component-navigation-bar/stories');
  require('../packages/react-native-bpk-component-nudger/stories');
  require('../packages/react-native-bpk-component-pagination-dots/stories');
  require('../packages/react-native-bpk-component-panel/stories');
  require('../packages/react-native-bpk-component-phone-input/stories');
  require('../packages/react-native-bpk-component-picker/stories');
  require('../packages/react-native-bpk-component-progress/stories');
  require('../packages/react-native-bpk-component-section-list/stories');
  require('../packages/react-native-bpk-component-select/stories');
  require('../packages/react-native-bpk-component-spinner/stories');
  require('../packages/react-native-bpk-component-star-rating/stories');
  require('../packages/react-native-bpk-component-switch/stories');
  require('../packages/react-native-bpk-component-text/stories');
  require('../packages/react-native-bpk-component-text-input/stories');
  require('../packages/react-native-bpk-component-touchable-overlay/stories');
  require('../packages/react-native-bpk-component-touchable-native-feedback/stories');
  require('../packages/react-native-bpk-theming/stories');
}, module);
/* eslint-enable global-require */

const StorybookUI = getStorybookUI({ onDeviceUI: false });

AppRegistry.registerComponent('native', () => StorybookUI);

onChannelAvailable(enableRtlFromUi, hideWarnings);

export default StorybookUI;
