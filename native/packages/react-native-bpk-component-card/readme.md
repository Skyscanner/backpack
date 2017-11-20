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
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

export default class App extends Component {
  render() {
    const content = (
      <BpkText>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
        et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkText>
    );
    return (
      <View style={styles.container}>
        <BpkCard
          onPress={() => null}
          accessibilityLabel="Example Card"
        >
          {content}
        </BpkCard>
        <BpkCard
          onPress={() => null}
          accessibilityLabel="Example Card"
          padded={false}
        >
          {content}
        </BpkCard>
        <BpkCard
          onPress={() => null}
          accessibilityLabel="Example Card"
          focused
        >
          {content}
        </BpkCard>
      </View >
    );
  }
}
```

## Props

| Property            | PropType  | Required | Default Value |
| -----------         | --------- | -------- | ------------- |
| children            | node      | true     | -             |
| onPress             | func      | true     | -             |
| focused             | bool      | false    | false         |
| padded              | bool      | false    | true          |
