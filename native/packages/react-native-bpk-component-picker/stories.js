import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

import BpkPicker from './src/BpkPicker';

const styles = StyleSheet.create({
  picker: {
    marginBottom: spacingBase,
  },
});

class StatefulBpkPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.selectedOption, // eslint-disable-line react/prop-types
    };
  }

  saveValue(value) {
    this.setState(() => ({ value }));
  }

  render() {
    return (
      <BpkPicker
        {...this.props}
        selectedOption={this.state.value}
        onSelectionChange={option => this.saveValue(option)}
      />
    );
  }
}

const options = [
  {
    value: '1',
    label: 'Option 1',
    hint: null,
  },
  {
    value: '2',
    label: 'Option 2',
    hint: 'hint there',
  },
  {
    value: '3',
    label: 'Option 3',
    pickerLabel: 'Option 3 - has custom label',
    hint: null,
  },
  {
    value: '4',
    label: 'Option 4',
    hint: null,
  },
  {
    value: '5',
    label: 'Option 5',
    hint: null,
  },
  {
    value: '6',
    label: 'Option 6',
    hint: null,
  },
  {
    value: '7',
    label: 'Option 7',
    hint: null,
  },
  {
    value: '8',
    label: 'Option 8',
    hint: null,
  },
];

storiesOf('BpkPicker', module).add('docs:pickers', () => (
  <ScrollView>
    <StatefulBpkPicker label="Picker" style={styles.picker} options={options} />
    <StatefulBpkPicker
      label="Picker with selected option"
      style={styles.picker}
      options={options}
      selectedOption={options[0]}
    />
    <StatefulBpkPicker
      label="Picker with with selected option and hint"
      style={styles.picker}
      options={options}
      selectedOption={options[1]}
    />
    <StatefulBpkPicker
      label="Invalid value"
      style={styles.picker}
      options={options}
      valid={false}
      validationMessage="Some message"
    />
  </ScrollView>
));
