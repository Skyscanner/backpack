# react-native-bpk-theming

> Backpack React Native theming utilities.

## Installation

```sh
npm install react-native-bpk-theming --save-dev
```

## Usage

```js
import { Component } from 'react';
import { View } from 'react-native';
import BpkThemeProvider from 'react-native-bpk-theming';

import BpkButton from 'react-native-bpk-component-button';
import * as TOKENS from 'bpk-tokens/tokens/ios/base.react.native.es6';

const theme = {
  color: TOKENS.colorBlue500
};

export default class App extends Component {
  render() {
    return (
      <BpkThemeProvider theme={themes}>
        <BpkButton title="Book flight" onPress={() => {}}/>
      </BpkThemeProvider>
    );
  }
}
```

## Props

| Property            | PropType  | Required | Default Value |
| -----------         | --------- | -------- | ------------- |
| children            | node      | true     | -             |
| theme               | object    | true     | -             |
