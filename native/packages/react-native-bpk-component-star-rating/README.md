# react-native-bpk-component-star-rating

> Backpack React Native star rating component.

## Installation

```sh
npm install react-native-bpk-component-star-rating --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import StarRating from 'react-native-bpk-component-star-rating';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

const ratingLabel = (r, m) => `${r} out of ${m} stars`;

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StarRating rating={0} ratingLabel={ratingLabel}/>
        <StarRating rating={5} ratingLabel={ratingLabel}/>
        <StarRating rating={10} maxRating={10} ratingLabel="10 out of 10"/>
      </View >
    );
  }
}
```

## Props

| Property            | PropType                  | Required | Default Value |
| -----------         | ------------------------- | -------- | ------------- |
| ratingLabel         | oneOfType(string, func)   | true     | -             |
| rating              | number                    | false    | 0             |
| maxRating           | number                    | false    | 5             |
