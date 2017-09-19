import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { StyleSheet, View, Platform } from 'react-native';

import BpkTextInput from './index';
import BpkText from '../../packages/react-native-bpk-component-text';

const tokens = Platform.select({
  ios: () => require('bpk-tokens/tokens/ios/base.react.native.common.js'), // eslint-disable-line global-require
  android: () => require('bpk-tokens/tokens/android/base.react.native.common.js'), // eslint-disable-line global-require
})();

const {
  spacingSm,
  spacingBase,
  spacingXs,
} = tokens;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: spacingSm,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  label: {
    marginBottom: spacingXs,
  },
  input: {
    marginBottom: spacingBase,
  },
});

storiesOf('BpkTextInput', module)
  .addDecorator(getStory =>
    <View style={styles.centered}>
      {getStory()}
    </View>,
  )
  .add('docs:text-inputs', () => (
    <View style={styles.container}>
      <BpkText style={styles.label} textStyle="sm">Input</BpkText>
      <BpkTextInput
        style={styles.input}
        placeholder="Country, city, or airport"
        value="Edinburgh"
      />
      <BpkText style={styles.label} textStyle="sm">Input (Placeholder)</BpkText>
      <BpkTextInput
        style={styles.input}
        placeholder="Country, city, or airport"
        value=""
      />
      <BpkText style={styles.label} textStyle="sm">Valid input (small)</BpkText>
      <BpkTextInput
        style={styles.input}
        small
        placeholder="Country, city, or airport"
        value="Edinburgh"
        valid
      />
      <BpkText style={styles.label} textStyle="sm">Invalid input (small)</BpkText>
      <BpkTextInput
        style={styles.input}
        small
        placeholder="Country, city, or airport"
        value="Edinbrvgh"
        valid={false}
      />
      <BpkText style={styles.label} textStyle="sm">Disabled input (small)</BpkText>
      <BpkTextInput
        style={styles.input}
        small
        disabled
        placeholder="Country, city, or airport"
        value="Edinburgh"
      />
      <BpkText style={styles.label} textStyle="sm">Password input (small)</BpkText>
      <BpkTextInput
        style={styles.input}
        small
        secureTextEntry
        placeholder="password"
        value="password"
      />
      <BpkText style={styles.label} textStyle="sm">Telephone input (small)</BpkText>
      <BpkTextInput
        style={styles.input}
        small
        keyboardType="phone-pad"
        placeholder="Phone number"
        value="+441234567890"
      />
    </View>
  ))
  .add('Default', () => (
    <View>
      <BpkTextInput
        style={styles.input}
        placeholder="Country, city, or airport"
        value="Edinburgh"
      />
      <BpkTextInput
        style={styles.input}
        small
        placeholder="Country, city, or airport"
        value="Edinburgh"
      />
    </View>
  ))
  .add('Valid', () => (
    <View>
      <BpkTextInput
        style={styles.input}
        placeholder="Country, city, or airport"
        value="Edinburgh"
        valid
      />
      <BpkTextInput
        style={styles.input}
        small
        placeholder="Country, city, or airport"
        value="Edinburgh"
        valid
      />
    </View>
  ))
  .add('Invalid', () => (
    <View>
      <BpkTextInput
        style={styles.input}
        placeholder="Country, city, or airport"
        value="Edinbrvgh"
        valid={false}
      />
      <BpkTextInput
        style={styles.input}
        small
        placeholder="Country, city, or airport"
        value="Edinbrvgh"
        valid={false}
      />
    </View>
  ))
  .add('Placeholder', () => (
    <View>
      <BpkTextInput
        style={styles.input}
        placeholder="Country, city, or airport"
        value=""
      />
      <BpkTextInput
        style={styles.input}
        small
        placeholder="Country, city, or airport"
        value=""
      />
    </View>
  ))
  .add('Disabled', () => (
    <View>
      <BpkTextInput
        style={styles.input}
        disabled
        placeholder="Country, city, or airport"
        value="Edinburgh"
      />
      <BpkTextInput
        style={styles.input}
        small
        disabled
        placeholder="Country, city, or airport"
        value="Edinburgh"
      />
    </View>
  ))
  .add('Password', () => (
    <View>
      <BpkTextInput
        style={styles.input}
        secureTextEntry
        placeholder="password"
        value="password"
      />
      <BpkTextInput
        style={styles.input}
        small
        secureTextEntry
        placeholder="password"
        value="password"
      />
    </View>
  ))
  .add('Telephone', () => (
    <View>
      <BpkTextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="Phone number"
        value="+441234567890"
      />
      <BpkTextInput
        style={styles.input}
        small
        keyboardType="phone-pad"
        placeholder="Phone number"
        value="+441234567890"
      />
    </View>
  ));
