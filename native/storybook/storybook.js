import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

/* eslint-disable global-require */
configure(() => {
  require('../packages/react-native-bpk-component-icon/stories');
  require('../packages/react-native-bpk-component-button/stories');
  require('../packages/react-native-bpk-component-card/stories');
  require('../packages/react-native-bpk-component-text-input/stories');
  require('../packages/react-native-bpk-component-text/stories');
}, module);
/* eslint-enable global-require */

const StorybookUI = getStorybookUI({ onDeviceUI: false });

AppRegistry.registerComponent('native', () => StorybookUI);

export default StorybookUI;
