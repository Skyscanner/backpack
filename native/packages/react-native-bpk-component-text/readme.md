# react-native-bpk-component-text

> Backpack React Native text component.

## Installation

```sh
npm install react-native-bpk-component-text --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import * as TOKENS from 'bpk-tokens/tokens/ios/base.react.native.es6';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkText textStyle='xxl'>Flights to Edinburgh.</BpkText>
        <BpkText textStyle='xl'>Flights to Edinburgh.</BpkText>
        <BpkText textStyle='lg'>Flights to Edinburgh.</BpkText>
        <BpkText textStyle='base'>Flights to Edinburgh.</BpkText>
        <BpkText textStyle='sm'>Flights to Edinburgh.</BpkText>
        <BpkText textStyle='xs'>Flights to Edinburgh.</BpkText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: TOKENS.spacingBase,
  }
});
```

## Props

| Property    | PropType                                     | Required | Default Value |
| ----------- | -------------------------------------------- | -------- | ------------- |
| children    | -                                            | true     | -             |
| textStyle   | oneOf('xxl', 'xl', 'lg', 'base', 'sm', 'xs') | false    | base          |
