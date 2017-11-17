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
        <BpkHorizontalNav selectedId="nav-1">
          <BpkHorizontalNavItem id="nav-0" title="Item One" onPress={() => {}} />
          <BpkHorizontalNavItem id="nav-1" title="Item Two" onPress={() => {}} />
          <BpkHorizontalNavItem id="nav-2" title="Item Three" onPress={() => {}} />
        </BpkHorizontalNav>
      </View >
    );
  }
}
```

## Props

### BpkHorizontalNav

| Property            | PropType                                                    | Required | Default Value |
| -----------         | ----------------------------------------------------------- | -------- | ------------- |
| children            | node                                                        | true     | -             |
| selectedId          | string (matching `id` prop of `BpkHorizontalNavItem` child) | true     | -             |
| spaceAround         | bool                                                        | false    | false         |

### BpkHorizontalNavItem

| Property            | PropType                              | Required | Default Value |
| -----------         | ------------------------------------- | -------- | ------------- |
| id                  | string                                | true     | -             |
| onPress             | func                                  | true     | -             |
| title               | string                                | true     | -             |
| accessibilityLabel  | string                                | false    | props.title   |
| disabled            | bool                                  | false    | false         |
| theme               | See [Theme Props](#theme-props) below | false    | null          |


## Theme Props

### BpkHorizontalNav

* `horizontalNavSelectedTextColor`

### BpkHorizontalNavItem

* `horizontalNavSelectedTextColor`
