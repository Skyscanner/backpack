# react-native-bpk-component-progress

> Backpack React Native Progress component.

## Installation

```sh
npm install react-native-bpk-component-progress --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkProgress from 'react-native-bpk-component-progress';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkProgress min={0} max={100} value={10} />
        <BpkProgress min={0} max={100} value={10} type="Bar" />
      </View>
    );
  }
}
```

## Props

| Property   | PropType                | Required | Default Value |
| ---------- | ----------------------- | -------- | ------------- |
| max        | number                  | true     | -             |
| min        | number                  | true     | -             |
| value      | number                  | true     | -             |
| fillStyle  | object                  | false    | -             |
| style      | object                  | false    | -             |
| type       | oneOf('default', 'bar') | false    | default       |
