# react-native-bpk-component-badge

> Backpack React Native badge component.

## Installation

```sh
npm install react-native-bpk-component-badge --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkBadge from 'react-native-bpk-component-badge';
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
    return (
      <View style={styles.container}>
        <BpkBadge message="Badge" type="success" />
        <BpkBadge message="Badge" type="warning" />
        <BpkBadge message="Badge" type="destructive" />
        <BpkBadge message="Badge" type="inverse" />
        <BpkBadge message="Badge" type="light" />
        <BpkBadge message="Badge" type="outline" />
        <BpkBadge message="Badge" type="success" />
        <BpkBadge message="Badge" docked="left" type="warning" />
        <BpkBadge message="Badge" docked="right" type="destructive" />
        <BpkBadge message="Badge" type="inverse" />
        <BpkBadge message="Badge" docked="left" type="light" />
        <BpkBadge message="Badge" docked="right" type="outline" />
      </View >
    );
  }
}
```
## Props

| Property              | PropType                                                                 | Required | Default Value |
| --------------------- | -------------------------------------------------------------------------| -------- | ------------- |
| message               | string                                                                   | true     | -             |
| docked                | oneOf('left', 'right')                                                   | false    | null          |
| type                  | oneOf('success', 'warning', 'destructive', 'light', 'inverse', 'outline')| false    | warning       |
