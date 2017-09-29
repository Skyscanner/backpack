import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Platform, View, StyleSheet } from 'react-native';
import * as TOKENS from 'bpk-tokens/tokens/ios/base.react.native.es6';
import iconMappings from 'bpk-svgs/dist/font/mapping.json';
import BpkIcon from './index';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  colorBlue700,
  spacingBase,
} = tokens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

storiesOf('BpkIcon', module)
  .add('docs:icons', () => (
    <View style={styles.container} >
      <View style={styles.group} >
        {Object.keys(iconMappings).map(name => (
          <BpkIcon
            key={name}
            iconName={name}
            color={colorBlue700}
          />
      ))}
      </View>
    </View>
  ));

