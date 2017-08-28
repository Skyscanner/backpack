# bpk-native-component-text

> Backpack React Native text component.

## Installation

```sh
npm install bpk-native-component-text --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkText from 'bpk-native-component-text';
import * as TOKENS from 'bpk-tokens/tokens/ios/base.react.native.es6';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkText textStyle='xxl'>Flights to London.</BpkText>
        <BpkText textStyle='xl'>Flights to London.</BpkText>
        <BpkText textStyle='lg'>Flights to London.</BpkText>
        <BpkText textStyle='base'>Flights to London.</BpkText>
        <BpkText textStyle='sm'>Flights to London.</BpkText>
        <BpkText textStyle='xs'>Flights to London.</BpkText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: TOKENS.spacingSm,
  }
});
```

## Props

| Property    | PropType                                     | Required | Default Value |
| ----------- | -------------------------------------------- | -------- | ------------- |
| children    | -                                            | true     | -             |
| textStyle   | oneOf('xxl', 'xl', 'lg', 'base', 'sm', 'xs') | false    | base          |
