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

import React, { Component } from 'react';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import BpkText from 'react-native-bpk-component-text';
import {
  colorGreen500,
  spacingBase,
  spacingMd,
} from 'bpk-tokens/tokens/base.react.native';
import CenterDecorator from '../../storybook/CenterDecorator';
import { StorySubheading } from '../../storybook/TextStyles';

import BpkPicker, { BpkPickerItem, BpkPickerTrigger } from './index';

const styles = StyleSheet.create({
  picker: {
    marginBottom: spacingBase,
  },
  triggerElementWithPrice: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: {
    color: colorGreen500,
    paddingRight: spacingMd,
  },
});

class StatefulBpkPicker extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    disabled: false,
    selectedValue: null,
    style: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      value: props.selectedValue,
    };
  }

  openPicker = () => {
    this.setState({ isOpen: true });
  };

  closePicker = () => {
    this.setState({ isOpen: false });
  };

  updateValue = value => {
    this.setState({ value });
  };

  render() {
    const { disabled, selectedValue, style, ...rest } = this.props;
    const data = {
      1: 'Option 1',
      2: 'Option 2',
      3: 'Option 3',
      4: 'Option 4',
      5: 'Option 5',
      6: 'Option 6',
      7: 'Option 7',
      8: 'Option 8',
    };
    return (
      <View style={style}>
        <BpkPickerTrigger
          disabled={disabled}
          label={data[this.state.value] || 'Choose an option'}
          onPress={this.openPicker}
        />
        <BpkPicker
          isOpen={this.state.isOpen}
          onClose={this.closePicker}
          selectedValue={this.state.value}
          onValueChange={this.updateValue}
          doneLabel="Done"
          {...rest}
        >
          <BpkPickerItem label="Choose an option" />
          {Object.keys(data).map(key => (
            <BpkPickerItem key={key} value={key} label={data[key]} />
          ))}
        </BpkPicker>
      </View>
    );
  }
}

storiesOf('react-native-bpk-component-picker', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <View>
      <StorySubheading>No selected value</StorySubheading>
      <StatefulBpkPicker style={styles.picker} />

      <StorySubheading>With a selected value</StorySubheading>
      <StatefulBpkPicker selectedValue="3" style={styles.picker} />

      <StorySubheading>Disabled</StorySubheading>
      <StatefulBpkPicker disabled style={styles.picker} />

      <StorySubheading>
        Using components within BpkPickerTrigger
      </StorySubheading>
      <BpkPickerTrigger
        onPress={action('BpkPickerTrigger pressed.')}
        label={
          <View style={styles.triggerElementWithPrice}>
            <BpkText>Flight</BpkText>
            <BpkText style={styles.priceText}>EUR 100</BpkText>
          </View>
        }
      />
    </View>
  ));
