# react-native-bpk-component-picker

> Backpack React Native picker component.

## Installation

```sh
npm install react-native-bpk-component-picker --save-dev
```

## Usage

```js
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import BpkPicker, { BpkPickerItem, BpkPickerTrigger } from 'react-native-bpk-component-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  }
});

const AIRPORTS = [
  {
    value: '1',
    label: 'Charles De Gaulle',
  },
  {
    value: '2',
    label: 'Paris Orly',
  },
  {
    value: '3',
    label: 'Beauvais-Tillé',
  },
];

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      value: null,
      isOpen: false,
    };

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  onOpen() {
    this.setState({
      isOpen: true,
    });
  }

  onClose() {
    this.setState({
      isOpen: false,
    });
  }

  setValue(value) {
    this.setState({value});
  }

  render() {
    return (
      <View style={styles.container}>
        <BpkPickerTrigger
          onPress={this.onOpen}
          label={this.state.value || 'Choose an airport'}
        />
        <BpkPicker
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          selectedValue={this.state.value}
          onValueChange={this.setValue}
          doneLabel="Done"
        >
          <BpkPickerItem label="Choose an airport" />
          { AIRPORTS.map(({value, label}) => (
            <BpkPickerItem value={value} label={label} />
          ))}
        </BpkPicker>
    );
  }
}
```

## Props

### BpkPicker

| Property             | PropType                              | Required | Default Value |
| -----------          | ------------------------------------- | -------- | ------------- |
| children             | node                                  | true     | -             |
| doneLabel (iOS only) | string                                | true     | -             |
| onClose              | func                                  | true     | -             |
| onValueChange        | func                                  | true     | -             |
| isOpen               | bool                                  | false    | false         |
| selectedValue        | oneOfType(string, number)             | false    | null          |

### BpkPickerItem

| Property             | PropType                              | Required | Default Value |
| -----------          | ------------------------------------- | -------- | ------------- |
| label                | string                                | true     | -             |
| value                | oneOfType(string, number)             | false    | null          |

### BpkPickerTrigger

| Property             | PropType                              | Required | Default Value |
| -----------          | ------------------------------------- | -------- | ------------- |
| onPress              | func                                  | true     | -             |
| disabled             | bool                                  | false    | false         |
| label                | oneOfType(string, element)            | false    | null          |
