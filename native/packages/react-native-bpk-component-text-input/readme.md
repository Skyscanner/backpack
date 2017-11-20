# react-native-bpk-component-text-input

> Backpack React Native text input component.

## Installation

```sh
npm install react-native-bpk-component-text-input --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkTextInput from 'react-native-bpk-component-text-input';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  input: {
    marginBottom: spacingBase,
  }
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkTextInput
          style={styles.input}
          placeholder="Country, city, or airport"
          value="Edinburgh"
        />
        <BpkTextInput
          style={styles.input}
          placeholder="Country, city, or airport"
          value=""
        />
        <BpkTextInput
          style={styles.input}
          small
          placeholder="Country, city, or airport"
          value="Edinburgh"
          valid
        />
        <BpkTextInput
          style={styles.input}
          small
          placeholder="Country, city, or airport"
          value="Edinbrvgh"
          valid={false}
        />
        <BpkTextInput
          style={styles.input}
          small
          disabled
          placeholder="Country, city, or airport"
          value="Edinburgh"
        />
        <BpkTextInput
          style={styles.input}
          small
          secureTextEntry
          placeholder="password"
          value="password"
        />
        <BpkTextInput
          style={styles.input}
          small
          keyboardType="phone-pad"
          placeholder="Phone number"
          value="+441234567890"
        />
      </View>
    );
  }
}
```

## Props

| Property    | PropType  | Required | Default Value |
| ----------- | --------- | -------- | ------------- |
| value       | string    | true     | -             |
| disabled    | bool      | false    | false         |
| small       | bool      | false    | false         |
| style       | style     | false    | null          |
| valid       | bool      | false    | null          |
