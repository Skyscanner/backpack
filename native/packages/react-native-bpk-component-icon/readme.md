# react-native-bpk-component-icon

> Backpack React Native icon component.

## Installation

```sh
npm install react-native-bpk-component-icon --save-dev
```

<!-- // TODO ADD INSTRUCTIONS FOR ADDING THE PODSPEC / GRADLE SCRIPT TO THE iOS / Android PROJECT IN WHICH THIS IS NOW BEING USED! -->

## Usage

```js
import React, { Component } from 'react';
import { View } from 'react-native';
import BpkIcon from 'react-native-bpk-component-icon';
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
        <BpkIcon
          icon="beer"
          style={{ color: TOKENS.colorBlue500 }}
          small
        />
        <BpkIcon
          icon="beer"
          style={{ color: TOKENS.colorBlue500 }}
        />
      </View>
    );
  }
}
```

## Props

| Property  | PropType  | Required | Default Value |
| --------- | --------- | -------- | ------------- |
| icon      | string    | yes      | -             |
| small     | boolean   | no       | false         |
