# react-native-bpk-component-text

> Backpack React Native text component.

## Installation

```sh
npm install react-native-bpk-component-icon --save-dev
```

// TODO ADD INSTRUCTIONS FOR ADDING THE PODSPEC / GRADLE SCRIPT TO THE iOS / Android PROJECT IN WHICH THIS IS NOW BEING USED!

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
          iconName="beer"
          color={TOKENS.colorBlue500}
          small
        />,
        <BpkIcon
          iconName="beer"
          color={TOKENS.colorBlue500}
        />,
      </View>
    );
  }
}
```

## Props

| Property  | PropType  | Required | Default Value |
| --------- | --------- | -------- | ------------- |
| iconName  | string    | yes      | -             |
| color     | string    | yes      | -             |
| small     | boolean   | no       | false         |
