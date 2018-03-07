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
import { Image, Modal, StyleSheet, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { spacingBase } from 'bpk-tokens/tokens/base.react.native';
import CenterDecorator from '../../storybook/CenterDecorator';

import { BpkDialingCodeList } from './index';
import { type Id, type Code } from './src/common-types';
import BpkDialingCodeListItem from './src/BpkDialingCodeListItem';
import BpkPhoneNumberInput, { type Props } from './src/BpkPhoneNumberInput';

const styles = StyleSheet.create({
  fullOuter: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: spacingBase,
  },
});

const { value: _ignored, ...propTypes } = BpkPhoneNumberInput.propTypes;
class StatefulBpkPhoneNumberInput extends Component<
  {
    initialValue: string,
    label: string,
    ...$Exact<$Diff<Props, { value: string }>>,
  },
  { value: string },
> {
  static propTypes = {
    ...propTypes,
    initialValue: PropTypes.string.isRequired,
  };
  static defaultProps = BpkPhoneNumberInput.defaultProps;

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
      <BpkPhoneNumberInput
        {...this.props}
        value={this.state.value}
        onChangeText={this.onChange}
      />
    );
  }
}

// Sample dialing codes, with some long ones to demonstrate how the
// component handles them.
const codes = [
  { id: 'DZ', dialingCode: '+213', name: 'Algeria' },
  { id: 'AD', dialingCode: '+376', name: 'Andorra' },
  { id: 'AU', dialingCode: '+61', name: 'Australia' },
  { id: 'BE', dialingCode: '+32', name: 'Belgium' },
  { id: 'CA', dialingCode: '+1', name: 'Canada' },
  { id: 'CD', dialingCode: '+243', name: 'Democratic Republic of the Congo' },
  { id: 'EG', dialingCode: '+20', name: 'Egypt' },
  { id: 'IS', dialingCode: '+354', name: 'Iceland' },
  {
    id: 'IPTCS',
    dialingCode: '+991',
    name:
      'International Telecommunications Public Correspondence Service trial (IPTCS)',
  },
  { id: 'IT', dialingCode: '+39', name: 'Italy' },
  { id: 'JP', dialingCode: '+81', name: 'Japan' },
  {
    id: 'VC',
    dialingCode: '+1784',
    name: 'Saint Vincent and the Grenadines',
  },
  { id: 'SE', dialingCode: '+46', name: 'Sweden' },
  { id: 'GB', dialingCode: '+44', name: 'United Kingdom' },
  { id: 'VI', dialingCode: '+1340', name: 'United States Virgin Islands' },
  { id: 'WK', dialingCode: '+99', name: 'Wakanda' },
];

const flags = {
  AU:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1280px-Flag_of_Australia_%28converted%29.svg.png',
  CA:
    'https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Flag_of_Canada.svg/1000px-Flag_of_Canada.svg.png',
  EG:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/900px-Flag_of_Egypt.svg.png',
  BE:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Belgium_%28civil%29.svg/450px-Flag_of_Belgium_%28civil%29.svg.png',
  DZ:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Algeria.svg/900px-Flag_of_Algeria.svg.png',
  CD:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/800px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png',
  IS:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Iceland.svg/800px-Flag_of_Iceland.svg.png',
  IT:
    'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Flag_of_Italy.svg/800px-Flag_of_Italy.svg.png',
  AD:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_Andorra.svg/800px-Flag_of_Andorra.svg.png',
  JP:
    'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/900px-Flag_of_Japan.svg.png',
  SE:
    'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Flag_of_Sweden.svg/800px-Flag_of_Sweden.svg.png',
  GB:
    'https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/800px-Flag_of_the_United_Kingdom.svg.png',
};

// eslint-disable-next-line react/no-multi-comp
class StatefulBpkDialingCodeList extends React.Component<
  {},
  {
    selectedId: ?Id,
  },
> {
  constructor() {
    super();
    this.state = { selectedId: 'AU' };
  }

  render() {
    return (
      <BpkDialingCodeList
        dialingCodes={codes}
        selectedId={this.state.selectedId}
        onItemPress={item => {
          action(`${item.name} selected`);
          this.setState({ selectedId: item.id });
        }}
        renderFlag={item =>
          flags[item.id] ? <Image source={{ uri: flags[item.id] }} /> : null
        }
      />
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class FullyIntegrated extends React.Component<
  { initiallySelectedId: Id, codes: Array<Code> },
  { pickerOpen: boolean, selectedId: ?Id, phoneNumber: string },
> {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: props.initiallySelectedId,
      pickerOpen: false,
      phoneNumber: '',
    };
  }

  onPhoneNumberChange = (value: string) => {
    this.setState(() => ({ phoneNumber: value }));
  };

  onItemPicked = (item: Code) => {
    this.setState(() => ({
      selectedId: item.id,
      pickerOpen: false,
    }));
  };

  openPicker = () => {
    this.setState(() => ({
      pickerOpen: true,
    }));
  };

  closePicker = () => {
    this.setState(() => ({
      pickerOpen: false,
    }));
  };

  renderFlag = item =>
    flags[item.id] ? <Image source={{ uri: flags[item.id] }} /> : null;

  render() {
    return (
      <View style={styles.fullOuter}>
        <Modal
          visible={this.state.pickerOpen}
          animationType="slide"
          onRequestClose={this.closePicker}
        >
          <BpkDialingCodeList
            dialingCodes={this.props.codes}
            onItemPress={this.onItemPicked}
            renderFlag={this.renderFlag}
            selectedId={this.state.selectedId}
          />
        </Modal>
        <BpkPhoneNumberInput
          label="Phone number"
          value={this.state.phoneNumber}
          onDialingCodePress={this.openPicker}
          // $FlowFixMe
          dialingCode={this.props.codes.find(
            code => code.id === this.state.selectedId,
          )}
          renderFlag={this.renderFlag}
          onChangeText={this.onPhoneNumberChange}
        />
      </View>
    );
  }
}

storiesOf('phone-input/Integrated', module).add(
  'Full component example',
  () => <FullyIntegrated initiallySelectedId="CA" codes={codes} />,
);

storiesOf('phone-input/BpkDialingCodeList', module).add('docs:default', () => (
  <StatefulBpkDialingCodeList />
));

storiesOf('phone-input/BpkDialingCodeListItem', module)
  .add('Standard', () => (
    <BpkDialingCodeListItem
      id="44"
      dialingCode="44"
      name="United Kingdom"
      onPress={action('Standard BpkDialingCodeListItem pressed.')}
    />
  ))
  .add('Selected', () => (
    <BpkDialingCodeListItem
      id="44"
      dialingCode="44"
      name="United Kingdom"
      onPress={action('Standard BpkDialingCodeListItem pressed.')}
      selected
    />
  ))
  .add('With flag', () => (
    <BpkDialingCodeListItem
      id="44"
      dialingCode="44"
      name="United Kingdom"
      onPress={action('Standard BpkDialingCodeListItem pressed.')}
      flag={
        <Image
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/800px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png',
          }}
        />
      }
    />
  ))
  .add('Selected with flag', () => (
    <BpkDialingCodeListItem
      id="44"
      dialingCode="44"
      name="United Kingdom"
      onPress={action('Standard BpkDialingCodeListItem pressed.')}
      selected
      flag={
        <Image
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Flag_of_the_Democratic_Republic_of_the_Congo.svg/800px-Flag_of_the_Democratic_Republic_of_the_Congo.svg.png',
          }}
        />
      }
    />
  ));

storiesOf('phone-input/BpkPhoneNumberInput', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => (
    <StatefulBpkPhoneNumberInput
      placeholder="4XX XXX XXX"
      label="Phone number"
      initialValue=""
      keyboardType="phone-pad"
      dialingCode={{ dialingCode: '+44', id: 'uk', name: 'United Kingdom' }}
      renderFlag={() => <Image source={{ uri: flags.AU }} />}
      onDialingCodePress={action('Dialing code pressed')}
    />
  ))
  .add('non-editable', () => (
    <StatefulBpkPhoneNumberInput
      label="Phone number"
      initialValue=""
      keyboardType="phone-pad"
      dialingCode={{ dialingCode: '+44', id: 'uk', name: 'United Kingdom' }}
      renderFlag={() => <Image source={{ uri: flags.AU }} />}
      editable={false}
      onDialingCodePress={action('Dialing code pressed')}
    />
  ));
