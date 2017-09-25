import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import * as TOKENS from 'bpk-tokens/tokens/ios/base.react.native.es6';

import BpkText from './index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: TOKENS.spacingBase,
  },
});

storiesOf('BpkText', module)
  .add('docs:text-styles', () => (
    <View TODO />
  ));
