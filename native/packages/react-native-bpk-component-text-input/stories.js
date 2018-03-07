/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import {
  colorGray100,
  colorGray500,
  spacingBase,
} from 'bpk-tokens/tokens/base.react.native';

import CenterDecorator from '../../storybook/CenterDecorator';
import BpkTextInput from './index';

const styles = StyleSheet.create({
  input: {
    marginBottom: spacingBase,
  },
  accessoryView: {
    flex: 0.3,
    backgroundColor: colorGray100,
    borderColor: colorGray500,
    borderWidth: 1,
  },
});

class StatefulBpkTextInput extends Component<
  { initialValue: string, label: string },
  { value: string },
> {
  static propTypes = {
    initialValue: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initialValue,
    };
  }

  onChange = value => {
    this.setState(() => ({ value }));
  };

  render() {
    return (
      <BpkTextInput
        {...this.props}
        value={this.state.value}
        onChangeText={this.onChange}
      />
    );
  }
}

storiesOf('BpkTextInput', module)
  .addDecorator(CenterDecorator)
  .add('docs:text-inputs', () => (
    <ScrollView>
      <StatefulBpkTextInput
        label="Input"
        initialValue=""
        style={styles.input}
        placeholder="3 letter airport code"
      />
      <StatefulBpkTextInput
        label="Input with value and description"
        initialValue="Edinburgh"
        description="Enter your destination."
        style={styles.input}
      />
      <StatefulBpkTextInput
        label="Input with multiline value"
        initialValue="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." // eslint-disable-line max-len
        multiline
        style={styles.input}
        autoGrow
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
        label="Non-editable input"
        initialValue=""
        editable={false}
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
    </ScrollView>
  ))
  .add('docs:text-inputs-with-accessory-view', () => (
    <ScrollView>
      <StatefulBpkTextInput
        label="Phone number"
        initialValue="+441234567890"
        keyboardType="phone-pad"
        style={styles.input}
        accessoryView={<View style={styles.accessoryView} />}
      />
      <StatefulBpkTextInput
        label="Phone number"
        initialValue=""
        keyboardType="phone-pad"
        style={styles.input}
        placeholder="E.g. 1234567890"
        accessoryView={<View style={styles.accessoryView} />}
      />
      <StatefulBpkTextInput
        label="Invalid input"
        initialValue="ashdk"
        valid={false}
        validationMessage="Invalid phone number."
        style={styles.input}
        accessoryView={<View style={styles.accessoryView} />}
      />
    </ScrollView>
  ));
