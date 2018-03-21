# react-native-bpk-component-pagination-dots

> Backpack React Native pagination dots component.

## Installation

```sh
npm install react-native-bpk-component-pagination-dots --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkPaginationDots from 'react-native-bpk-component-pagination-dots';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

const accessibilityLabel = (pageCount, selectedIndex) => `${selectedIndex + 1} of ${pageCount}.`;

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkPaginationDots
          accessibilityLabel={accessibilityLabel}
          pageCount="10"
          selectedIndex="0"
        />
        <BpkPaginationDots
          accessibilityLabel={accessibilityLabel}
          pageCount="3"
          selectedIndex="2"
        />
        <BpkPaginationDots
          accessibilityLabel="2 of 5"
          pageCount="5"
          selectedIndex="1"
        />
      </View>
    );
  }
}
```

## Props


| Property            | PropType                  | Required | Default Value |
| -----------         | ------------------------- | -------- | ------------- |
| accessibilityLabel  | oneOfType(string, func)   | true     | -             |
| pageCount           | number                    | true     | -             |
| selectedIndex       | number                    | true     | -             |

