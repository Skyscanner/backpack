import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
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
    <View style={styles.container}>
      <BpkText textStyle="xxl">Flights to Edinburgh</BpkText>
      <BpkText textStyle="xl">Flights to Edinburgh</BpkText>
      <BpkText textStyle="lg">Flights to Edinburgh</BpkText>
      <BpkText textStyle="base">Flights to Edinburgh</BpkText>
      <BpkText textStyle="sm">Flights to Edinburgh</BpkText>
      <BpkText textStyle="xs">Flights to Edinburgh</BpkText>
    </View>
  ))
  .add('Bold', () => (
    <View style={styles.container}>
      <BpkText textStyle="xxl" emphasize={Platform.OS === 'android'}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="xl" emphasize>Flights to Edinburgh</BpkText>
      <BpkText textStyle="lg" emphasize>Flights to Edinburgh</BpkText>
      <BpkText textStyle="base" emphasize>Flights to Edinburgh</BpkText>
      <BpkText textStyle="sm" emphasize>Flights to Edinburgh</BpkText>
      <BpkText textStyle="xs" emphasize>Flights to Edinburgh</BpkText>
    </View>
  ))
  .add('Colours', () => (
    <View style={styles.container}>
      <BpkText textStyle="xxl" style={{ color: TOKENS.colorBlue700 }}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="xl" style={{ color: TOKENS.colorRed500 }}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="lg" style={{ color: TOKENS.colorGreen500 }}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="base" style={{ color: TOKENS.colorYellow500 }}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="sm" style={{ color: TOKENS.colorBlue700 }}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="xs" style={{ color: TOKENS.colorGray500 }}>Flights to Edinburgh</BpkText>
    </View>
  ));
