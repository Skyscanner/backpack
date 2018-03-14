# react-native-bpk-component-panel

> Backpack React Native panel component.

## Installation

```sh
npm install react-native-bpk-component-panel --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BpkPanel from 'react-native-bpk-component-panel';
import BpkText from 'react-native-bpk-component-text';
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
        <BpkPanel>{content}</BpkPanel>
        <BpkPanel padded={false}>{content}</BpkPanel>
      </View >
    );
  }
}
```

### `withDivider` HOC

```js
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkPanel, { withDivider } from 'react-native-bpk-component-panel';

const BpkPanelWithDivider = withDivider(BpkPanel);

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
        <BpkPanelWithDivider stub={content}>{content}</BpkPanelWithDivider>
        <BpkPanelWithDivider stub={content} vertical>{content}</BpkPanelWithDivider>
        <BpkPanelWithDivider stub={content} padded={false}>{content}</BpkPanelWithDivider>
      </View >
    );
  }
}
```

## Props

*BpkPanel:*

| Property   | PropType  | Required | Default Value |
| ---------- | --------- | -------- | ------------- |
| children   | node      | true     | -             |
| padded     | bool      | false    | true          |

*After `withDivider`:*

| Property   | PropType  | Required | Default Value |
| ---------- | --------- | -------- | ------------- |
| stub       | node      | true     | -             |
| vertical   | bool      | false    | false         |
| mainStyle  | object    | false    | null          |
| stubStyle  | object    | false    | null          |
