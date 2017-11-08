# react-native-bpk-component-switch

> Backpack React Native switch component.

## Installation

```sh
npm install react-native-bpk-component-switch --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BpkSwitch from 'react-native-bpk-component-switch';
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
        <BpkSwitch />
        <BpkSwitch value />
      </View >
    );
  }
}
```

## Props

| Property            | PropType                              | Required | Default Value |
| -----------         | ------------------------------------- | -------- | ------------- |
| value               | bool                                  | false    | false         |
| theme               | See [Theme Props](#theme-props) below | false    | null          |

## Theme Props

* `switchPrimaryColor`
