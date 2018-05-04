# react-native-bpk-component-select

> Backpack React Native select component.

## Installation

```sh
npm install react-native-bpk-component-select --save-dev
```

## Usage

```js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkSelect from 'react-native-bpk-component-select';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

export default () => (
  <View styles={styles.container>
    <BpkSelect
      onPress={openSelectUI}
      label="Select an Option"
    />
  </View>

);
```

## Props

| Property             | PropType                              | Required | Default Value |
| -----------          | ------------------------------------- | -------- | ------------- |
| onPress              | func                                  | true     | -             |
| disabled             | bool                                  | false    | false         |
| label                | oneOfType(string, element)            | false    | null          |
