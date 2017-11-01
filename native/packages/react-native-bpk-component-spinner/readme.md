# react-native-bpk-component-spinner

> Backpack React Native spinner component.

## Installation

```sh
npm install react-native-bpk-component-spinner --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BpkSpinner from 'react-native-bpk-component-spinner';
import * as TOKENS from 'bpk-tokens/tokens/ios/base.react.native.es6';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: TOKENS.spacingBase,
  }
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkSpinner />
        <BpkSpinner small />
        <BpkSpinner type="light" />
        <BpkSpinner type="dark" />
      </View >
    );
  }
}
```

## Props

| Property            | PropType                              | Required | Default Value |
| -----------         | ------------------------------------- | -------- | ------------- |
| small               | bool                                  | false    | false         |
| theme               | See [Theme Props](#theme-props) below | false    | null          |
| type                | oneOf('primary', 'light', 'dark')     | false    | primary       |

## Theme Props

### Primary

* `spinnerPrimaryColor`
