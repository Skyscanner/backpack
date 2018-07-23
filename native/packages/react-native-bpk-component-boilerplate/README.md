# react-native-bpk-component-boilerplate

> Backpack React Native boilerplate component.

## Installation

```sh
npm install react-native-bpk-component-boilerplate --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkBoilerplate from 'react-native-bpk-component-boilerplate';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
});

export default () => (
  <View style={styles.container}>
    <BpkBoilerplate />
  </View>
);
```

## Props

### BpkBoilerplate

TODO - Add your component's prop types here.

