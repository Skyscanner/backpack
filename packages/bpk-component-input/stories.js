/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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
/* @flow strict */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BpkText from 'bpk-component-text';

import BpkInput, {
  propTypes as inputPropTypes,
  defaultProps as inputDefaultProps,
  type BpkInputProps,
  INPUT_TYPES,
  CLEAR_BUTTON_MODES,
} from './index';

type Props = {
  ...$Exact<$Diff<BpkInputProps, { value: string }>>,
  initialValue: string,
};

type State = {
  value: string,
};

const { value: valueProp, ...propTypes } = inputPropTypes;

class ClearableInput extends Component<Props, State> {
  static propTypes = {
    ...propTypes,
    initialValue: PropTypes.string.isRequired,
  };

  static defaultProps = {
    ...inputDefaultProps,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.initialValue,
    };
  }

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onClear = () => {
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    const { initialValue, ...rest } = this.props;

    return (
      <BpkInput
        {...rest}
        onChange={this.onChange}
        onClear={this.onClear}
        value={value}
      />
    );
  }
}

storiesOf('bpk-component-input', module)
  .add('Text value', () => (
    <BpkInput
      id="text_value"
      name="text_value"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
    />
  ))
  .add('Placeholder', () => (
    <BpkInput
      id="placeholder"
      name="placeholder"
      value=""
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
    />
  ))
  .add('Valid', () => (
    <BpkInput
      id="valid"
      name="valid"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      valid
    />
  ))
  .add('Invalid', () => (
    <BpkInput
      id="invalid"
      name="invalid"
      value="Edinbrvgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      valid={false}
    />
  ))
  .add('Disabled', () => (
    <BpkInput
      id="disabled"
      name="disabled"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      disabled
    />
  ))
  .add('Clearable', () => (
    <div>
      <BpkText tagName="p">clearButtonMode=whileEditing</BpkText>
      <ClearableInput
        id="clearable"
        name="clearable"
        initialValue="Edinburgh"
        placeholder="Enter a country, city or airport"
        clearButtonMode={CLEAR_BUTTON_MODES.whileEditing}
        clearButtonLabel="Clear field"
      />

      <BpkText tagName="p">clearButtonMode=always</BpkText>
      <ClearableInput
        id="clearable"
        name="clearable"
        initialValue="Edinburgh"
        placeholder="Enter a country, city or airport"
        valid
        clearButtonMode={CLEAR_BUTTON_MODES.always}
        clearButtonLabel="Clear field"
      />

      <BpkText tagName="p">
        clearButtonMode=whileEditing, large=true, valid=true
      </BpkText>
      <ClearableInput
        id="clearable"
        name="clearable"
        initialValue="Edinburgh"
        placeholder="Enter a country, city or airport"
        large
        valid
        clearButtonMode={CLEAR_BUTTON_MODES.whileEditing}
        clearButtonLabel="Clear field"
      />
    </div>
  ))
  .add('Email', () => (
    <BpkInput
      type={INPUT_TYPES.email}
      id="email"
      name="email"
      value=""
      onChange={action('input changed')}
      placeholder="example@example.com"
    />
  ))
  .add('Number', () => (
    <BpkInput
      type={INPUT_TYPES.number}
      id="number"
      name="number"
      value="0"
      onChange={action('input changed')}
      placeholder=""
    />
  ))
  .add('Password', () => (
    <BpkInput
      type={INPUT_TYPES.password}
      id="password"
      name="password"
      value="letmein"
      onChange={action('input changed')}
      placeholder="Please enter a password"
    />
  ))
  .add('Telephone', () => (
    <BpkInput
      type={INPUT_TYPES.tel}
      id="telephone"
      name="telephone"
      value="+441234567890"
      onChange={action('input changed')}
      placeholder="Enter your telephone number"
    />
  ))
  .add('Large', () => (
    <BpkInput
      id="large"
      name="large"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      large
    />
  ))
  .add('Docked', () => (
    <div style={{ display: 'flex' }}>
      <BpkInput
        id="large"
        name="large"
        value="Edinburgh"
        onChange={action('input changed')}
        placeholder="Enter a country, city or airport"
        large
        valid
        docked
      />
      <BpkInput
        id="large"
        name="large"
        value="Edinburgh"
        onChange={action('input changed')}
        placeholder="Enter a country, city or airport"
        large
        valid={false}
        docked
      />
      <BpkInput
        id="large"
        name="large"
        value="Edinburgh"
        onChange={action('input changed')}
        placeholder="Enter a country, city or airport"
        large
        docked
      />
      <BpkInput
        id="large"
        name="large"
        value="Edinburgh"
        onChange={action('input changed')}
        placeholder="Enter a country, city or airport"
        large
        docked
      />
    </div>
  ))
  .add('Manually docked', () => (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%' }}>
        <BpkInput
          id="large"
          name="large"
          value="Edinburgh"
          onChange={action('input changed')}
          placeholder="Enter a country, city or airport"
          large
          valid
          dockedFirst
        />
      </div>
      <div style={{ width: '100%' }}>
        <BpkInput
          id="large"
          name="large"
          value="Edinburgh"
          onChange={action('input changed')}
          placeholder="Enter a country, city or airport"
          large
          valid={false}
          dockedMiddle
        />
      </div>
      <div style={{ width: '100%' }}>
        <BpkInput
          id="large"
          name="large"
          value="Edinburgh"
          onChange={action('input changed')}
          placeholder="Enter a country, city or airport"
          large
          dockedMiddle
        />
      </div>
      <div style={{ width: '100%' }}>
        <BpkInput
          id="large"
          name="large"
          value="Edinburgh"
          onChange={action('input changed')}
          placeholder="Enter a country, city or airport"
          large
          dockedLast
        />
      </div>
    </div>
  ));
