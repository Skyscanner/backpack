# react-native-bpk-component-touchable-overlay

> Backpack React Native touchable overlay component.

## Installation

```sh
npm install react-native-bpk-component-touchable-overlay --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkTouchableOverlay from 'react-native-bpk-component-touchable-overlay';
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
        <BpkTouchableOverlay
          onPress={() => null}
          accessibilityLabel="Example Ticket"
        >
          <BpkText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>
        </BpkTouchableOverlay>
      </View>
    );
  }
}
```

## Props

| Property   | PropType  | Required | Default Value |
| ---------- | --------- | -------- | ------------- |
| children   | node      | true     | -             |
