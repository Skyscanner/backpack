# react-native-bpk-component-icon

> Backpack React Native icon component.

## Installation

```sh
npm install react-native-bpk-component-icon --save-dev
```

### iOS installation

Add the following to your `Podfile` and run `pod update`:

```
pod 'BpkIcons', :path => 'node_modules/react-native-bpk-component-icon'
```

### Android installation

This method has the advantage of fonts being copied from this module at build time so that the fonts and JS are always in sync, making upgrades painless.

Edit `android/app/build.gradle` ( NOT `android/build.gradle` ) and add the following:

```
apply from: "node_modules/react-native-bpk-component-icon/fonts.gradle"
```

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
