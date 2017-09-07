import React from 'react';
import { StyleSheet, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { colorBlue500 } from 'bpk-tokens/tokens/ios/base.react.native.es6';

import BpkInput from '../../packages/react-native-bpk-component-input';

const styles = StyleSheet.create({
  blueInput: {
    color: colorBlue500,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

storiesOf('BpkInput', module)
  .addDecorator(getStory =>
    <View style={styles.centered}>
      {getStory()}
    </View>,
  )
  .add('Default', () => (
    <View>
      <BpkInput
        style={{ width: 300, height: 'auto', marginTop: 12 }}
        placeholderText={'placeholder'}
        text={'Large'}
      />
      <BpkInput
        style={{ width: 300, height: 'auto', marginTop: 12 }}
        small
        placeholderText={'placeholder'}
        text={'Small'}
      />
      <BpkInput
        style={{ width: 300, height: 'auto', marginTop: 12 }}
        small
        placeholderText={'valid'}
        text={'Valid'}
        valid
      />
      <BpkInput
        style={{ width: 300, height: 'auto', marginTop: 12 }}
        placeholderText={'valid'}
        text={'Invalid'}
        valid={false}
      />
      <BpkInput
        style={{ width: 300, height: 'auto', marginTop: 12 }}
        placeholderText={'placeholder'}
        text={''}
      />
      <BpkInput
        style={{ width: 300, height: 'auto', marginTop: 12 }}
        disabled
        small
        placeholderText={'placeholder'}
        text={'disabled'}
      />
      <BpkInput
        small
        style={{ width: 300, height: 'auto', marginTop: 12 }}
        secureTextEntry
        placeholderText={'password'}
        text={'password'}
      />
      <BpkInput
        small
        style={{ width: 300, height: 'auto', marginTop: 12 }}
        keyboardType={'phone-pad'}
        placeholderText={'Phone number'}
        text={''}
      />
    </View>
    ));
