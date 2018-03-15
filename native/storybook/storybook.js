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
import { I18nManager, AppRegistry } from 'react-native';
import RNRestart from 'react-native-restart';
import addon from '@storybook/addons';
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
function enableRtlFromUi(channel) {
  channel.on(RTL_EVENT, toggleRTL);
}

/* eslint-disable global-require */
configure(() => {
  require('../packages/react-native-bpk-component-animate-height/stories');
  require('../packages/react-native-bpk-component-banner-alert/stories');
  require('../packages/react-native-bpk-component-badge/stories');
  require('../packages/react-native-bpk-component-button-link/stories');
  require('../packages/react-native-bpk-component-button/stories');
  require('../packages/react-native-bpk-component-card/stories');
  require('../packages/react-native-bpk-component-horizontal-nav/stories');
  require('../packages/react-native-bpk-component-icon/stories');
  require('../packages/react-native-bpk-component-navigation-bar/stories');
  require('../packages/react-native-bpk-component-nudger/stories');
  require('../packages/react-native-bpk-component-panel/stories');
  require('../packages/react-native-bpk-component-phone-input/stories');
  require('../packages/react-native-bpk-component-spinner/stories');
  require('../packages/react-native-bpk-component-star-rating/stories');
  require('../packages/react-native-bpk-component-switch/stories');
  require('../packages/react-native-bpk-component-text-input/stories');
  require('../packages/react-native-bpk-component-text/stories');
  require('../packages/react-native-bpk-component-touchable-overlay/stories');
  require('../packages/react-native-bpk-component-touchable-native-feedback/stories');
  require('../packages/react-native-bpk-theming/stories');
}, module);
/* eslint-enable global-require */

const StorybookUI = getStorybookUI({ onDeviceUI: false });

AppRegistry.registerComponent('native', () => StorybookUI);

onChannelAvailable(enableRtlFromUi);
export default StorybookUI;
