import React from 'react';
import { StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { spacingBase, spacingXs } from 'bpk-tokens/tokens/base.react.native';

import BpkTextInput from './index';
import { StorySubheading } from '../../storybook/TextStyles';

const styles = StyleSheet.create({
  label: {
    marginBottom: spacingXs,
  },
  input: {
    marginBottom: spacingBase,
  },
});

storiesOf('BpkTextInput', module)
  .add('docs:text-inputs', () => (
    <View>
      <StorySubheading>Input</StorySubheading>
      <BpkTextInput
        style={styles.input}
        placeholder="Country, city, or airport"
        value="Edinburgh"
      />
      <StorySubheading>Input (Placeholder)</StorySubheading>
      <BpkTextInput
        style={styles.input}
        placeholder="Country, city, or airport"
        value=""
      />
      <StorySubheading>Valid input (small)</StorySubheading>
      <BpkTextInput
        style={styles.input}
        small
        placeholder="Country, city, or airport"
        value="Edinburgh"
        valid
      />
      <StorySubheading>Invalid input (small)</StorySubheading>
      <BpkTextInput
        style={styles.input}
        small
        placeholder="Country, city, or airport"
        value="Edinbrvgh"
        valid={false}
      />
      <StorySubheading>Disabled input (small)</StorySubheading>
      <BpkTextInput
        style={styles.input}
        small
        disabled
        placeholder="Country, city, or airport"
        value="Edinburgh"
      />
      <StorySubheading>Password input (small)</StorySubheading>
      <BpkTextInput
        style={styles.input}
        small
        secureTextEntry
        placeholder="password"
        value="password"
      />
      <StorySubheading>Telephone input (small)</StorySubheading>
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
