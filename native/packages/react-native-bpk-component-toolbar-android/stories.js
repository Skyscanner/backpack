import React from 'react';
import { TextInput } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import BpkTextInput from './../react-native-bpk-component-text-input';

import BpkToolbarAndroid from './index';

storiesOf('BpkToolbarAndroid', module).add('docs:default', () => (
  <BpkToolbarAndroid
    title="Title"
    navIcon={require('./long-arrow-left.png')}
    actions={[
      {
        title: 'Search',
        show: 'always',
        icon: require('./long-arrow-left.png'),
      },
    ]}
  >
    <TextInput
      label="Search"
      value="Search Search Search Search Search Search"
    />
  </BpkToolbarAndroid>
));
