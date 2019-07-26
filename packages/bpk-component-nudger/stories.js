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
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BpkLabel from 'bpk-component-label';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkNudgerStory.scss';

import BpkNudger, { BpkConfigurableNudger } from './index';

const getClassName = cssModules(STYLES);

type State = {
  value: any,
};

class NudgerContainer extends Component<{}, State> {
  constructor() {
    super();

    this.state = {
      value: 2,
    };
  }

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <BpkLabel htmlFor="my-nudger">Number of passengers</BpkLabel>
        <BpkNudger
          id="my-nudger"
          min={1}
          max={10}
          value={this.state.value}
          onChange={this.handleChange}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
        />
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class ConfigurableNudgerContainer extends Component<{}, State> {
  constructor() {
    super();

    this.state = {
      value: 'premium',
    };
  }

  handleChange = value => {
    this.setState({ value });
  };

  compareValues = (a, b): number => {
    const options = ['economy', 'premium', 'business', 'first'];
    const [aIndex, bIndex] = [options.indexOf(a), options.indexOf(b)];
    return aIndex - bIndex;
  };

  incrementValue = (a): string => {
    const options = ['economy', 'premium', 'business', 'first'];
    const [aIndex] = [options.indexOf(a) + 1];
    return options[aIndex];
  };

  decrementValue = (a): string => {
    const options = ['economy', 'premium', 'business', 'first'];
    const [aIndex] = [options.indexOf(a) - 1];
    return options[aIndex];
  };

  formatValue = (a): string => a.toString();

  render() {
    return (
      <div>
        <BpkLabel htmlFor="my-nudger">Traveller Class</BpkLabel>
        <BpkConfigurableNudger
          id="nudger"
          min="economy"
          max="first"
          value={this.state.value}
          onChange={this.handleChange}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
          compareValues={this.compareValues}
          incrementValue={this.incrementValue}
          decrementValue={this.decrementValue}
          formatValue={this.formatValue}
          inputClassName={getClassName('bpk-nudger-configurable')}
        />
      </div>
    );
  }
}

storiesOf('bpk-component-nudger', module)
  .add('Default', () => (
    <BpkNudger
      id="my-nudger"
      min={1}
      max={99}
      value={3}
      onChange={action('change')}
      decreaseButtonLabel="Decrease"
      increaseButtonLabel="Increase"
    />
  ))
  .add('Lower bounds', () => (
    <BpkNudger
      id="my-nudger"
      min={3}
      max={99}
      value={3}
      onChange={action('change')}
      decreaseButtonLabel="Decrease"
      increaseButtonLabel="Increase"
    />
  ))
  .add('Upper bounds', () => (
    <BpkNudger
      id="my-nudger"
      min={1}
      max={99}
      value={99}
      onChange={action('change')}
      decreaseButtonLabel="Decrease"
      increaseButtonLabel="Increase"
    />
  ))
  .add('Stateful example', () => <NudgerContainer />)
  .add('Outline nudger', () => (
    <div className={getClassName('bpk-nudger-outline')}>
      <BpkNudger
        id="outline-nudger"
        min={1}
        max={99}
        value={3}
        onChange={action('change')}
        decreaseButtonLabel="Decrease"
        increaseButtonLabel="Increase"
        buttonType="outline"
      />
    </div>
  ))
  .add('Configurable nudger', () => <ConfigurableNudgerContainer />);
