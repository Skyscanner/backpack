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
import BpkTextInput from 'react-native-bpk-component-text-input';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacingBase,
  },
  picker: {
    marginBottom: spacingBase,
  }
});

const options = [
  {
    value: '1',
    label: 'Edinburgh',
    hint: null,
  },
  {
    value: '2',
    label: 'London City Airport',
    hint: 'fastest commute',
  },
  {
    value: '3',
    label: 'Luton Airport',
    pickerLabel: 'Luton Airport - far away',
    hint: null,
  },
  {
    value: '4',
    label: 'Gatwick Airport',
    hint: null,
  },
  {
    value: '5',
    label: 'Heathrow Airport',
    hint: null,
  },
  {
    value: '6',
    label: 'Southend Airport',
    hint: null,
  },
  {
    value: '7',
    label: 'Stansted Airport',
    hint: null,
  },
];

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BpkPicker
          label="Please pick an airport"
          style={styles.picker}
          selectedOption={null}
          options={options}
        />

        <BpkPicker
          label="Please pick an airport (item with hint)"
          style={styles.picker}
          selectedOption={options[1]}
          options={options}
        />

        <BpkPicker
          label="Wrong selection"
          style={styles.picker}
          selectedOption={options[4]}
          options={options}
          valid={false}
          validationMessage="Tis picker is always wrong"
        />
    );
  }
}
```

## Props

### Picker properties

| Property                    | PropType                                                    | Required | Default Value |
| --------------------------- | ----------------------------------------------------------- | -------- | ------------- |
| label                       | string                                                      | false    | ''            |
| options                     | arrayOf(PickerItem)                                         | false    | null          |
| selectedOption              | oneOfType([PickerItem, string])                             | false    | null          |
| prevLabel                   | string                                                      | false    | 'PREV'        |
| nextLabel                   | string                                                      | false    | 'NEXT'        |
| doneLabel                   | string                                                      | false    | 'DONE'        |
| valid                       | oneOf(true, false, null)                                    | false    | null          |
| validationMessage           | string                                                      | false    | null          |
| style                       | style                                                       | false    | null          |
| ref                         | func                                                        | false    | () => null    |
| onSelectionChange           | func                                                        | false    | () => null    |
| onFocus                     | func                                                        | false    | () => null    |
| onBlur                      | func                                                        | false    | () => null    |


### Main properties

**options** - expected to be supplied with an array of PickerItems, where PickerItem is the shape of the data object specked out below

**selectedOption** - can accept a particular instance of the option, or it's value field, picker component will handle both

**onSelectionChange** - triggered when user changes the selection, always receives selected option object as firt argument

### ref/focus emulation

**ref** - an emulation of the ref is available on picker. And instance of the picker is returned as a ref argument.

**focus()** - can be called on obtained ref instance to activate picker component. Useful for forms navigation.




### PickerItem

An individual option for the picker has to follow the shape specified below.

| Property                    | PropType                                                    | Required | Default Value |
| --------------------------- | ----------------------------------------------------------- | -------- | ------------- |
| value                       | any                                                         | true     | undefined     |
| label                       | string                                                      | true     | undefined     |
| hint                        | string                                                      | false    | undefined     |
| pickerLabel                 | string                                                      | false    | undefined    |


**value** - a payload for the options, so it can be used to specify selected option

**label** - text which will be displayed in picker once option is selected

**hint** - additional hint label which will appear on the right side of the picker if corresponding option is selected. This field is optional.

**pickerLabel** - optional alternative label which will be used in the options selection menu. If not specified a fallback to **label** field will happen
