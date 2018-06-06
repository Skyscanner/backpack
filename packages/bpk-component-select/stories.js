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

import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import BpkSelect from './index';

const getFlagUriFromCountryCode = countryCode =>
  `https://images.skyscnr.com/images/country/flag/header/${countryCode.toLowerCase()}.png`;

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
class SelectWithImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'IT',
    };
  }

  getItemByValue = () => {
    const { options } = this.props;
    return val => {
      const items = options.filter(o => o.id === val);
      if (!items.length) throw new Error('Item does not exists');
      return items[0];
    };
  };

  getItem = this.getItemByValue();

  handleChange = e => {
    const item = this.getItem(e.target.value);

    this.setState({
      selected: item.id,
    });
  };

  image = id => <img alt="Flag" src={getFlagUriFromCountryCode(id)} />;

  render() {
    const { options, ...rest } = this.props;
    return (
      <BpkSelect
        value={this.getItem(this.state.selected).id}
        {...rest}
        image={this.image(this.getItem(this.state.selected).id)}
        onChange={this.handleChange}
      >
        {options.map(o => (
          <option key={o.id} disabled={o.disabled && 'disabled'} value={o.id}>
            {o.name}
          </option>
        ))}
      </BpkSelect>
    );
  }
}

SelectWithImage.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

storiesOf('bpk-component-select', module)
  .add('Example', () => (
    <BpkSelect
      id="fruits"
      name="fruits"
      value="oranges"
      onChange={action('select changed')}
    >
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="pears">Pears</option>
      <option value="tomato" disabled>
        Tomato
      </option>
    </BpkSelect>
  ))
  .add('Invalid', () => (
    <BpkSelect
      id="invalid"
      name="invalid"
      value=""
      onChange={action('select changed')}
      valid={false}
    >
      <option value="" hidden>
        Please select...
      </option>
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="pears">Pears</option>
      <option value="tomato" disabled>
        Tomato
      </option>
    </BpkSelect>
  ))
  .add('Disabled', () => (
    <BpkSelect
      id="disabled"
      name="disabled"
      value=""
      onChange={action('select changed')}
      disabled
    >
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="pears">Pears</option>
      <option value="tomato" disabled>
        Tomato
      </option>
    </BpkSelect>
  ))
  .add('Large', () => (
    <BpkSelect
      id="large"
      name="large"
      value="oranges"
      onChange={action('select changed')}
      large
    >
      <option value="apples">Apples</option>
      <option value="oranges">Oranges</option>
      <option value="pears">Pears</option>
      <option value="tomato" disabled>
        Tomato
      </option>
    </BpkSelect>
  ))
  .add('Docked', () => (
    <div style={{ display: 'flex' }}>
      <BpkSelect
        id="large"
        name="large"
        value="oranges"
        onChange={action('select changed')}
        large
        docked
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>
          Tomato
        </option>
      </BpkSelect>
      <BpkSelect
        id="large"
        name="large"
        value="oranges"
        onChange={action('select changed')}
        large
        docked
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>
          Tomato
        </option>
      </BpkSelect>
      <BpkSelect
        id="large"
        name="large"
        value="oranges"
        onChange={action('select changed')}
        large
        valid={false}
        docked
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>
          Tomato
        </option>
      </BpkSelect>
      <BpkSelect
        id="large"
        name="large"
        value="oranges"
        onChange={action('select changed')}
        large
        docked
      >
        <option value="apples">Apples</option>
        <option value="oranges">Oranges</option>
        <option value="pears">Pears</option>
        <option value="tomato" disabled>
          Tomato
        </option>
      </BpkSelect>
    </div>
  ))
  .add('Docked with images', () => (
    <div style={{ display: 'flex' }}>
      <SelectWithImage
        large
        dockedFirst
        id="countries"
        name="countries"
        options={countries}
      />
      <SelectWithImage
        large
        dockedMiddle
        id="countries"
        name="countries"
        options={countries}
      />
      <SelectWithImage
        large
        dockedMiddle
        id="countries"
        name="countries"
        options={countries}
      />
      <SelectWithImage
        large
        dockedLast
        id="countries"
        name="countries"
        options={countries}
      />
    </div>
  ))
  .add('Manually docked', () => (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%' }}>
        <BpkSelect
          id="large"
          name="large"
          value="oranges"
          onChange={action('select changed')}
          large
          dockedFirst
        >
          <option value="apples">Apples</option>
          <option value="oranges">Oranges</option>
          <option value="pears">Pears</option>
          <option value="tomato" disabled>
            Tomato
          </option>
        </BpkSelect>
      </div>
      <div style={{ width: '100%' }}>
        <BpkSelect
          id="large"
          name="large"
          value="oranges"
          onChange={action('select changed')}
          large
          dockedMiddle
        >
          <option value="apples">Apples</option>
          <option value="oranges">Oranges</option>
          <option value="pears">Pears</option>
          <option value="tomato" disabled>
            Tomato
          </option>
        </BpkSelect>
      </div>
      <div style={{ width: '100%' }}>
        <BpkSelect
          id="large"
          name="large"
          value="oranges"
          onChange={action('select changed')}
          large
          valid={false}
          dockedMiddle
        >
          <option value="apples">Apples</option>
          <option value="oranges">Oranges</option>
          <option value="pears">Pears</option>
          <option value="tomato" disabled>
            Tomato
          </option>
        </BpkSelect>
      </div>
      <div style={{ width: '100%' }}>
        <BpkSelect
          id="large"
          name="large"
          value="oranges"
          onChange={action('select changed')}
          large
          dockedLast
        >
          <option value="apples">Apples</option>
          <option value="oranges">Oranges</option>
          <option value="pears">Pears</option>
          <option value="tomato" disabled>
            Tomato
          </option>
        </BpkSelect>
      </div>
    </div>
  ))
  .add('Manually docked with images', () => (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%' }}>
        <SelectWithImage
          large
          dockedFirst
          id="countries"
          name="countries"
          options={countries}
        />
      </div>
      <div style={{ width: '100%' }}>
        <SelectWithImage
          large
          dockedMiddle
          id="countries"
          name="countries"
          options={countries}
        />
      </div>
      <div style={{ width: '100%' }}>
        <SelectWithImage
          large
          dockedMiddle
          id="countries"
          name="countries"
          options={countries}
        />
      </div>
      <div style={{ width: '100%' }}>
        <SelectWithImage
          large
          dockedLast
          id="countries"
          name="countries"
          options={countries}
        />
      </div>
    </div>
  ))
  .add('With Image', () => (
    <SelectWithImage id="countries" name="countries" options={countries} />
  ))
  .add('With Image Large', () => (
    <SelectWithImage
      large
      id="countries"
      name="countries"
      options={countries}
    />
  ));
