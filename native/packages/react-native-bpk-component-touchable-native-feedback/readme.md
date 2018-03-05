# react-native-bpk-component-touchable-native-feedback

> Backpack React Native touchable native feedback component.

## Installation

```sh
npm install react-native-bpk-component-touchable-native-feedback --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkTouchableNativeFeedback from 'react-native-bpk-component-touchable-native-feedback';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkTouchableNativeFeedback
          onPress={() => null}
          accessibilityLabel="Example touchable native feedback"
        >
          <BpkText>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
            et magnis dis parturient montes, nascetur ridiculus mus.
          </BpkText>
        </BpkTouchableNativeFeedback>
      </View>
    );
  }
}
```

## Props

| Property     | PropType            | Required | Default Value |
| ------------ | ------------------- | -------- | ------------- |
| children     | node                | true     | -             |
| borderRadius | oneOf('sm', 'pill') | false    | null          |
| overlayStyle | object              | false    | null          |
