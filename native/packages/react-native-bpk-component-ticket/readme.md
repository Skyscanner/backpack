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
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
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
| onPress    | func      | true     | -             |
| vertical   | bool      | false    | false         |
| focused    | bool      | false    | false         |
| padded     | bool      | false    | true          |
| mainStyle  | object    | false    | null          |
| stubStyle  | object    | false    | null          |
