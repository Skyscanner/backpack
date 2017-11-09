# react-native-bpk-component-ticket

> Backpack React Native ticket component.

## Installation

```sh
npm install react-native-bpk-component-ticket --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkTicket from 'react-native-bpk-component-ticket';
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
    const content = (
      <BpkText>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
        et magnis dis parturient montes, nascetur ridiculus mus.
      </BpkText>
    );
    return (
      <View style={styles.container}>
        <BpkTicket
          onPress={() => null}
          accessibilityLabel="Example Ticket"
          stub={content}
        >
          {content}
        </BpkTicket>
        <BpkTicket
          onPress={() => null}
          accessibilityLabel="Example Ticket"
          stub={content}
          padded={false}
        >
          {content}
        </BpkTicket>
        <BpkTicket
          onPress={() => null}
          accessibilityLabel="Example Ticket"
          stub={content}
          focused
        >
          {content}
        </BpkTicket>
      </View >
    );
  }
}
```

## Props

| Property   | PropType  | Required | Default Value |
| ---------- | --------- | -------- | ------------- |
| children   | node      | true     | -             |
| stub       | node      | true     | -             |
| onPress    | function  | true     | -             |
| vertical   | boolean   | false    | false         |
| focused    | boolean   | false    | false         |
| padded     | boolean   | false    | true          |
| mainStyle  | object    | false    | null          |
| stubStyle  | object    | false    | null          |
