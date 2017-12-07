import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';

import BpkTextInput from './index';

const styles = StyleSheet.create({
  input: {
    marginBottom: spacingBase,
  },
});

class StatefulBpkTextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initialValue, // eslint-disable-line react/prop-types
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState(() => ({ value }));
  }

  render() {
    return <BpkTextInput {...this.props} value={this.state.value} onChangeText={this.onChange} />;
  }
}

storiesOf('BpkTextInput', module)
  .add('docs:text-inputs', () => (
    <View>
      <StatefulBpkTextInput
        label="Input"
        initialValue=""
        style={styles.input}
      />
      <StatefulBpkTextInput
        label="Input with value"
        initialValue="Edinburgh"
        style={styles.input}
      />
      <StatefulBpkTextInput
        label="Input with multiline value"
        initialValue="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        multiline
        style={styles.input}
      />
      <StatefulBpkTextInput
        label="Valid input"
        initialValue="Edinburgh"
        valid
        style={styles.input}
      />
      <StatefulBpkTextInput
        label="Invalid input"
        initialValue="Edinbvrgh"
        valid={false}
        validationMessage="'Edinbvrgh' is not a valid city."
        style={styles.input}
      />
      <StatefulBpkTextInput
        label="Disabled input"
        initialValue=""
        disabled
        style={styles.input}
      />
      <StatefulBpkTextInput
        label="Password"
        initialValue="letmein"
        secureTextEntry
        style={styles.input}
      />
      <StatefulBpkTextInput
        label="Phone number"
        initialValue="+441234567890"
        keyboardType="phone-pad"
        style={styles.input}
      />
    </View>
  ));
