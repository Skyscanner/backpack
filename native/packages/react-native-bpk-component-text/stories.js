import React from 'react';
import {
  colorRed500,
  colorBlue700,
  colorGray500,
  colorGreen500,
  colorYellow500,
} from 'bpk-tokens/tokens/base.react.native';
import { View, Platform } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import BpkText from './index';

storiesOf('BpkText', module)
  .add('docs:text-styles', () => (
    <View>
      <BpkText textStyle="xxl">Flights to Edinburgh</BpkText>
      <BpkText textStyle="xl">Flights to Edinburgh</BpkText>
      <BpkText textStyle="lg">Flights to Edinburgh</BpkText>
      <BpkText textStyle="base">Flights to Edinburgh</BpkText>
      <BpkText textStyle="sm">Flights to Edinburgh</BpkText>
      <BpkText textStyle="xs">Flights to Edinburgh</BpkText>
    </View>
  ))
  .add('Bold', () => (
    <View>
      <BpkText textStyle="xxl" emphasize={Platform.OS === 'android'}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="xl" emphasize>Flights to Edinburgh</BpkText>
      <BpkText textStyle="lg" emphasize>Flights to Edinburgh</BpkText>
      <BpkText textStyle="base" emphasize>Flights to Edinburgh</BpkText>
      <BpkText textStyle="sm" emphasize>Flights to Edinburgh</BpkText>
      <BpkText textStyle="xs" emphasize>Flights to Edinburgh</BpkText>
    </View>
  ))
  .add('Colours', () => (
    <View>
      <BpkText textStyle="xxl" style={{ color: colorBlue700 }}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="xl" style={{ color: colorRed500 }}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="lg" style={{ color: colorGreen500 }}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="base" style={{ color: colorYellow500 }}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="sm" style={{ color: colorBlue700 }}>Flights to Edinburgh</BpkText>
      <BpkText textStyle="xs" style={{ color: colorGray500 }}>Flights to Edinburgh</BpkText>
    </View>
  ));
