# react-native-bpk-styles

> Common styles for React Native components.

## Installation

```sh
npm install react-native-bpk-styles --save-dev
```

## Usage

```javascript
import React from 'react';
import { StyleSheet } from 'react-native';
import { colorWhite, borderRadiusSm } from 'bpk-tokens/tokens/base.react.native';
import { shadows } from 'react-native-bpk-styles';

const styles = StyleSheet.create({
  component: {
    backgroundColor: colorWhite,
    borderRadius: borderRadiusSm,
    ...shadows.base(),
  },
  componentFocused: shadows.large(),
});

const MyComponent = (props) => {
  const { focused, children } = props;
  return (
    <View style={[styles.component, focused && styles.componentFocused]}>
      { children }
    </View>
  );
};

export default MyComponent;
```
