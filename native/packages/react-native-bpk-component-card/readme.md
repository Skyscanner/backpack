# react-native-bpk-component-card

> Backpack React Native card component.

## Installation

```sh
npm install react-native-bpk-component-card --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BpkCard from 'react-native-bpk-component-card';
import BpkText from 'react-native-bpk-component-text';
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
    const cardContent = (
      <View>
        <BpkText textStyle="xxl">Flights to Edinburgh</BpkText>
        <BpkText textStyle="xl">Flights to Edinburgh</BpkText>
        <BpkText textStyle="lg">Flights to Edinburgh</BpkText>
        <BpkText textStyle="base">Flights to Edinburgh</BpkText>
        <BpkText textStyle="sm">Flights to Edinburgh</BpkText>
        <BpkText textStyle="xs">Flights to Edinburgh</BpkText>
      </View>
    );
    return (
      <View style={styles.container}>
        <BpkCard onPress={() => null} accessibilityLabel="Example Card">{cardContent}</BpkCard>
        <BpkCard onPress={() => null} padded={false} accessibilityLabel="Example Card">{cardContent}</BpkCard>
      </View >
    );
  }
}
```

## Props

| Property            | PropType  | Required | Default Value |
| -----------         | --------- | -------- | ------------- |
| children            | node      | true     | -             |
| onPress             | function  | true     | -             |
| padded              | boolean   | false    | true          |
