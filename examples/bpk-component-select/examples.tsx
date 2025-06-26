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

import BpkSelect from '../../packages/bpk-component-select';
import { action } from '../bpk-storybook-utils';

type StatefulBpkSelectProps = {
  large?: boolean;
  docked?: boolean;
  dockedFirst?: boolean;
  dockedMiddle?: boolean;
  dockedLast?: boolean;
  disabled?: boolean;
  valid?: boolean;
  [key: string]: any;
};

class StatefulBpkSelect extends Component<StatefulBpkSelectProps> {
  constructor(props: StatefulBpkSelectProps) {
    super(props);
    this.state = { value: 'oranges' };
  }

  onChange = (value: any) => {
    action(`BpkSelect changed. New value: ${value}`);
    this.setState({ value });
  };

  render() {
    return (
       <BpkSelect
        id="destination"
        name="destination"
        // @ts-expect-error TS(2339) FIXME: Property 'value' does not exist on type 'Readonly<... Remove this comment to see the full error message
        value={this.state.value}
        onChange={(event: any) => {
          this.onChange(event.target.value);
        }}
        {...this.props}
      >
        <option value="Karachi">Karachi</option>
        <option value="Lahore">Lahore</option>
        <option value="Faisalabad">Faisalabad</option>
        <option value="Islamabad" disabled>
          Islamabad
        </option>
      </BpkSelect>
    );
  }
}

const getFlagUriFromCountryCode = (countryCode: any) => `https://images.skyscnr.com/images/country/flag/header/${countryCode.toLowerCase()}.png`;

const countries = [
  { key: 0, id: 'AT', name: 'Austria', disabled: false },
  { key: 1, id: 'BR', name: 'Brazil', disabled: false },
  { key: 2, id: 'CN', name: 'China', disabled: false },
  { key: 3, id: 'DJ', name: 'Djibouti', disabled: false },
  { key: 4, id: 'EC', name: 'Ecuador', disabled: false },
  { key: 5, id: 'GD', name: 'Grenada', disabled: false },
  { key: 6, id: 'HT', name: 'Haiti', disabled: false },
  { key: 7, id: 'IT', name: 'Italy', disabled: false },
  { key: 8, id: 'US', name: 'USA', disabled: true },
];
class SelectWithImage extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: 'IT',
    };
  }

  getItemByValue = () => {
    // @ts-expect-error TS(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
    const { options } = this.props;
    return (val: any) => {
      const items = options.filter((o: any) => o.id === val);
      if (!items.length) throw new Error('Item does not exists');
      return items[0];
    };
  };

  getItem = this.getItemByValue();

  handleChange = (e: any) => {
    const item = this.getItem(e.target.value);

    this.setState({
      selected: item.id,
    });
  };

  image = (id: any) => <img alt="Flag" src={getFlagUriFromCountryCode(id)} />;

  render() {
    // @ts-expect-error TS(2339) FIXME: Property 'options' does not exist on type 'Readonl... Remove this comment to see the full error message
    const { options, ...rest } = this.props;
    return (
      <BpkSelect
        // @ts-expect-error TS(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
        value={this.getItem(this.state.selected).id}
        {...rest}
        // @ts-expect-error TS(2339) FIXME: Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
        image={this.image(this.getItem(this.state.selected).id)}
        onChange={this.handleChange}
      >
        {options.map((o: any) => <option key={o.id} disabled={o.disabled && 'disabled'} value={o.id}>
          {o.name}
        </option>)}
      </BpkSelect>
    );
  }
}

// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
SelectWithImage.propTypes = {
  // The following will go away with the move to TS
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const DefaultExample = () => <StatefulBpkSelect />;

const InvalidExample = () => <StatefulBpkSelect valid={false} />;

const InvalidWithImageExample = () => (
  <SelectWithImage
    // @ts-expect-error TS(2322) FIXME: Type '{ valid: boolean; id: string; name: string; ... Remove this comment to see the full error message
    valid={false}
    id="countries"
    name="countries"
    options={countries}
  />
);

const DisabledExample = () => <StatefulBpkSelect disabled />;

const LargeExample = () => <StatefulBpkSelect large />;

const DockedExample = () => (
  <div style={{ display: 'flex' }}>
    <StatefulBpkSelect large docked />
    <StatefulBpkSelect large docked />
   <StatefulBpkSelect large docked />
    <StatefulBpkSelect large docked />
  </div>
);

const DockedWithImagesExample = () => (
  <div style={{ display: 'flex' }}>
    <SelectWithImage
      // @ts-expect-error TS(2322) FIXME: Type '{ large: true; dockedFirst: true; id: string... Remove this comment to see the full error message
      large
      dockedFirst
      id="countries"
      name="countries"
      options={countries}
    />
    <SelectWithImage
      // @ts-expect-error TS(2322) FIXME: Type '{ large: true; dockedMiddle: true; id: strin... Remove this comment to see the full error message
      large
      dockedMiddle
      id="countries"
      name="countries"
      options={countries}
    />
    <SelectWithImage
      // @ts-expect-error TS(2322) FIXME: Type '{ large: true; dockedMiddle: true; id: strin... Remove this comment to see the full error message
      large
      dockedMiddle
      id="countries"
      name="countries"
      options={countries}
    />
    <SelectWithImage
      // @ts-expect-error TS(2322) FIXME: Type '{ large: true; dockedLast: true; id: string;... Remove this comment to see the full error message
      large
      dockedLast
      id="countries"
      name="countries"
      options={countries}
    />
  </div>
);

const ManuallyDockedExample = () => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: '100%' }}>
     <StatefulBpkSelect large dockedFirst />
    </div>
    <div style={{ width: '100%' }}>
      <StatefulBpkSelect large dockedMiddle />
    </div>
    <div style={{ width: '100%' }}>
      <StatefulBpkSelect large dockedMiddle />
    </div>
    <div style={{ width: '100%' }}>
      <StatefulBpkSelect large dockedLast />
    </div>
  </div>
);

const ManuallyDockedWithImagesExample = () => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: '100%' }}>
      <SelectWithImage
        // @ts-expect-error TS(2322) FIXME: Type '{ large: true; dockedFirst: true; id: string... Remove this comment to see the full error message
        large
        dockedFirst
        id="countries"
        name="countries"
        options={countries}
      />
    </div>
    <div style={{ width: '100%' }}>
      <SelectWithImage
        // @ts-expect-error TS(2322) FIXME: Type '{ large: true; dockedMiddle: true; id: strin... Remove this comment to see the full error message
        large
        dockedMiddle
        id="countries"
        name="countries"
        options={countries}
      />
    </div>
    <div style={{ width: '100%' }}>
      <SelectWithImage
        // @ts-expect-error TS(2322) FIXME: Type '{ large: true; dockedMiddle: true; id: strin... Remove this comment to see the full error message
        large
        dockedMiddle
        id="countries"
        name="countries"
        options={countries}
      />
    </div>
    <div style={{ width: '100%' }}>
      <SelectWithImage
        // @ts-expect-error TS(2322) FIXME: Type '{ large: true; dockedLast: true; id: string;... Remove this comment to see the full error message
        large
        dockedLast
        id="countries"
        name="countries"
        options={countries}
      />
    </div>
  </div>
);

const WithImageExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ id: string; name: string; options: { key: ... Remove this comment to see the full error message
  <SelectWithImage id="countries" name="countries" options={countries} />
);

const WithImageLargeExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ large: true; id: string; name: string; opt... Remove this comment to see the full error message
  <SelectWithImage large id="countries" name="countries" options={countries} />
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <InvalidExample />
    <InvalidWithImageExample />
    <DisabledExample />
    <LargeExample />
    <DockedExample />
    <ManuallyDockedExample />
  </div>
);

export {
  DefaultExample,
  InvalidExample,
  InvalidWithImageExample,
  DisabledExample,
  LargeExample,
  DockedExample,
  DockedWithImagesExample,
  ManuallyDockedExample,
  ManuallyDockedWithImagesExample,
  WithImageExample,
  WithImageLargeExample,
  MixedExample,
};
