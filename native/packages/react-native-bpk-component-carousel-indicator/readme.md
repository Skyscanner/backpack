# react-native-bpk-component-carousel-indicator

> Backpack React Native carousel indicators component.

## Installation

```sh
npm install react-native-bpk-component-carousel-indicator --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkCarouselIndicator from 'react-native-bpk-component-carousel-indicator';

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
        <BpkCarouselIndicator pageCount="10" selectedIndex="0" />
        <BpkCarouselIndicator pageCount="3" selectedIndex="2" />
        <BpkCarouselIndicator pageCount="5" selectedIndex="1" />
      </View>
    );
  }
}
```

## Props

| Property      | PropType | Required | Default Value |
| ------------- | -------- | -------- | ------------- |
| pageCount     | number   | true     | -             |
| selectedIndex | number   | true     | -             |
