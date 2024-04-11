/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import { Component } from 'react';

import BpkBannerAlert, {
  ALERT_TYPES,
} from '../../packages/bpk-component-banner-alert';
import BpkInput, {
  propTypes as inputPropTypes,
  defaultProps as inputDefaultProps,
  INPUT_TYPES,
  CLEAR_BUTTON_MODES,
} from '../../packages/bpk-component-input';
import BpkLabel from '../../packages/bpk-component-label';
import { cssModules } from '../../packages/bpk-react-utils';
import { action } from '../bpk-storybook-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const { value: valueProp, ...propTypes } = inputPropTypes;

class ClearableInput extends Component {
  static propTypes = {
    ...propTypes,
    initialValue: PropTypes.string.isRequired,
  };

  static defaultProps = {
    ...inputDefaultProps,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue,
    };
  }

  onChange = (e) => {
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

const TextExample = () => (
  <form>
    <BpkLabel htmlFor="text_value">Search country, city or airport</BpkLabel>
    <BpkInput
      id="text_value"
      name="text_value"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
    />
  </form>
);

const PlaceholderExample = () => (
  <form>
    <BpkLabel htmlFor="placeholder">Search country, city or airport</BpkLabel>
    <BpkInput
      id="placeholder"
      name="placeholder"
      value=""
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
    />
  </form>
);

const ValidExample = () => (
  <form>
    <BpkLabel htmlFor="valid">Search country, city or airport</BpkLabel>
    <BpkInput
      id="valid"
      name="valid"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      valid
    />
  </form>
);

const InvalidExample = () => (
  <form>
    <BpkLabel htmlFor="invalid">Search country, city or airport</BpkLabel>
    <BpkInput
      id="invalid"
      name="invalid"
      value="Edinbrvgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      valid={false}
    />
  </form>
);

const DisabledExample = () => (
  <form>
    <BpkLabel htmlFor="disabled">Search country, city or airport</BpkLabel>
    <BpkInput
      id="disabled"
      name="disabled"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      disabled
    />
  </form>
);

const ClearableExample = () => (
  <div>
    <BpkLabel htmlFor="input_clearable">Clearable while editing</BpkLabel>
    <ClearableInput
      id="clearable_clearable"
      name="clearable_clearable"
      initialValue="Edinburgh"
      placeholder="Enter a country, city or airport"
      clearButtonMode={CLEAR_BUTTON_MODES.whileEditing}
      clearButtonLabel="Clear field"
    />

    <BpkLabel htmlFor="input_clearable_always">Always Clearable</BpkLabel>
    <ClearableInput
      id="input_clearable_always"
      name="input_clearable_always"
      initialValue="Edinburgh"
      placeholder="Enter a country, city or airport"
      valid
      clearButtonMode={CLEAR_BUTTON_MODES.always}
      clearButtonLabel="Clear field"
    />

    <BpkLabel htmlFor="input_large_valid_clearable">
      Large, valid clearable while editing
    </BpkLabel>
    <ClearableInput
      id="input_large_valid_clearable"
      name="input_large_valid_clearable"
      initialValue="Edinburgh"
      placeholder="Enter a country, city or airport"
      large
      valid
      clearButtonMode={CLEAR_BUTTON_MODES.whileEditing}
      clearButtonLabel="Clear field"
    />
  </div>
);

const EmailInputExample = () => (
  <form>
    <BpkLabel htmlFor="email">Enter booking email</BpkLabel>
    <BpkInput
      type={INPUT_TYPES.email}
      id="email"
      name="email"
      value="example@example.com"
      onChange={action('input changed')}
      placeholder="example@example.com"
    />
  </form>
);

const NumberInputExample = () => (
  <form>
    <BpkLabel htmlFor="number">Enter number of travellers</BpkLabel>
    <BpkInput
      type={INPUT_TYPES.number}
      id="number"
      name="number"
      value="0"
      onChange={action('input changed')}
      placeholder=""
    />
  </form>
);

const PasswordInputExample = () => (
  <form>
    <BpkLabel htmlFor="password">Enter a password</BpkLabel>
    <BpkInput
      type={INPUT_TYPES.password}
      id="password"
      name="password"
      value="letmein"
      onChange={action('input changed')}
      placeholder="Please enter a password"
    />
  </form>
);

const TelephoneInputExample = () => (
  <form>
    <BpkLabel htmlFor="telephone">Enter contact telephone number</BpkLabel>
    <BpkInput
      type={INPUT_TYPES.tel}
      id="telephone"
      name="telephone"
      value="+441234567890"
      onChange={action('input changed')}
      placeholder="Enter your telephone number"
    />
  </form>
);

const LargeInputExample = () => (
  <form>
    <BpkLabel htmlFor="large">Search country, city or airport</BpkLabel>
    <BpkInput
      id="large"
      name="large"
      value="Edinburgh"
      onChange={action('input changed')}
      placeholder="Enter a country, city or airport"
      large
    />
  </form>
);

const DockedExample = () => (
  <div>
    <div className={getClassName('bpk-forms__viewport-alert')}>
      <BpkBannerAlert
        type={ALERT_TYPES.WARN}
        message="These are only suitable for larger viewports - try viewing on a desktop device."
      />
    </div>
    <form
      className={getClassName(
        'bpk-forms__form',
        'bpk-forms__form--desktop-only',
      )}
    >
      <div>
        <BpkLabel
          htmlFor="input_origin"
          className={getClassName('bpk-forms__place')}
        >
          From
        </BpkLabel>
        <BpkLabel
          htmlFor="input_destination"
          className={getClassName('bpk-forms__place')}
        >
          To
        </BpkLabel>
        <BpkLabel
          htmlFor="input_outbound"
          className={getClassName('bpk-forms__date')}
        >
          Departure date
        </BpkLabel>
        <BpkLabel
          htmlFor="input_inbound"
          className={getClassName('bpk-forms__date')}
        >
          Return date
        </BpkLabel>
      </div>
      <div>
        <BpkInput
          id="input_origin"
          name="input_origin"
          value="Edinburgh"
          onChange={action('orign input changed')}
          className={getClassName('bpk-forms__place')}
          dockedFirst
          large
        />
        <BpkInput
          id="input_destination"
          name="input_destination"
          value=""
          onChange={action('destination input changed')}
          className={getClassName('bpk-forms__place')}
          dockedMiddle
          large
        />
        <BpkInput
          id="input_outbound"
          name="input_outbound"
          value={new Date(2020, 3, 15).toLocaleDateString()}
          onChange={action('outbound date input changed')}
          className={getClassName('bpk-forms__date')}
          dockedMiddle
          large
        />
        <BpkInput
          id="input_inbound"
          name="input_inbound"
          value={new Date(2020, 3, 16).toLocaleDateString()}
          onChange={action('inbound date input changed')}
          className={getClassName('bpk-forms__date')}
          dockedLast
          large
        />
      </div>
    </form>
    <form
      className={getClassName(
        'bpk-forms__form',
        'bpk-forms__form--desktop-only',
      )}
    >
      <div>
        <BpkLabel
          htmlFor="input_hotels_destination"
          className={getClassName('bpk-forms__hotels-destination')}
        >
          Destination or hotel name
        </BpkLabel>
        <BpkLabel
          htmlFor="input_checkin"
          className={getClassName('bpk-forms__date')}
        >
          Check-in
        </BpkLabel>
        <BpkLabel
          htmlFor="input_checkout"
          className={getClassName('bpk-forms__date')}
        >
          Check-out
        </BpkLabel>
      </div>
      <div>
        <BpkInput
          id="input_hotels_destination"
          name="input_hotels_destination"
          value=""
          onChange={action('hotels destination input changed')}
          className={getClassName('bpk-forms__hotels-destination')}
          dockedFirst
          large
        />
        <BpkInput
          id="input_checkin"
          name="input_checkin"
          value={new Date(2020, 3, 15).toLocaleDateString()}
          onChange={action('checkin date input changed')}
          className={getClassName('bpk-forms__date')}
          dockedMiddle
          large
        />
        <BpkInput
          id="input_checkout"
          name="input_checkout"
          value={new Date(2020, 3, 16).toLocaleDateString()}
          onChange={action('checkout date input changed')}
          className={getClassName('bpk-forms__date')}
          dockedLast
          large
        />
      </div>
    </form>
  </div>
);

const ManuallyDockedExample = () => (
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
);

const MixedExample = () => (
  <div>
    <TextExample />
    <PlaceholderExample />
    <ValidExample />
    <InvalidExample />
    <InvalidExample />
    <DisabledExample />
    <ClearableExample />
    <LargeInputExample />
    <DockedExample />
  </div>
);

export {
  TextExample,
  PlaceholderExample,
  ValidExample,
  InvalidExample,
  DisabledExample,
  ClearableExample,
  EmailInputExample,
  NumberInputExample,
  PasswordInputExample,
  TelephoneInputExample,
  LargeInputExample,
  DockedExample,
  ManuallyDockedExample,
  MixedExample,
};
