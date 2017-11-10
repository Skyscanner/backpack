# react-native-bpk-component-horizontal nav

> Backpack React Native horizontal navigation component.

## Installation

```sh
npm install react-native-bpk-component-horizontal-nav --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import BpkHorizontalNav, { BpkHorizontalNavItem } from './index';
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
        <BpkHorizontalNav>
          <BpkHorizontalNavItem selected title="Item One" onPress={() => {}} />
          <BpkHorizontalNavItem title="Item Two" onPress={() => {}} />
          <BpkHorizontalNavItem title="Item Three" onPress={() => {}} />
        </BpkHorizontalNav>
      </View >
    );
  }
}
```

## Props

### BpkHorizontalNav

| Property            | PropType                              | Required | Default Value |
| -----------         | ------------------------------------- | -------- | ------------- |
| children            | node                                  | true     | -             |
| spaceAround         | bool                                  | false    | false         |

### BpkHorizontalNavItem

| Property            | PropType                              | Required | Default Value |
| -----------         | ------------------------------------- | -------- | ------------- |
| onPress             | func                                  | true     | -             |
| title               | string                                | true     | -             |
| accessibilityLabel  | string                                | false    | props.title   |
| disabled            | bool                                  | false    | false         |
| selected            | bool                                  | false    | false         |
| theme               | See [Theme Props](#theme-props) below | false    | null          |


## Theme Props

### BpkHorizontalNavItem

* `horizontalNavSelectedTextColor`
