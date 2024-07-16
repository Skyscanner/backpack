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

/* @flow strict */

import { Component } from 'react';

import { iconSizeLg, lineHeightBase } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { withAlignment } from '../../packages/bpk-component-icon';
import AccountIcon from '../../packages/bpk-component-icon/lg/account';
import BpkLabel from '../../packages/bpk-component-label';
import BpkNudger, {
  BpkConfigurableNudger,
} from '../../packages/bpk-component-nudger';
import { cssModules } from '../../packages/bpk-react-utils';
import {
  action,
  BpkDarkExampleWrapper,
} from '../bpk-storybook-utils';

import STYLES from './BpkNudgerStory.module.scss';

const getClassName = cssModules(STYLES);

const AlignedAccountIcon = withAlignment(AccountIcon, lineHeightBase, iconSizeLg);

class NudgerContainer extends Component<
  { id: string, buttonType: string },
  { value: number },
> {
  constructor() {
    super();

    this.state = {
      value: 2,
    };
  }

  handleChange = (value: number) => {
    this.setState({ value });
  };

  render() {
    const { buttonType, id } = this.props;

    const labelClassName = getClassName(
      buttonType === 'secondaryOnDark' && 'bpk-nudger-secondary-on-dark',
    );

    return (
      <div>
        <BpkLabel id="passenger-label" htmlFor={id} className={labelClassName}>
          Number of passengers
        </BpkLabel>
        <BpkNudger
          aria-labelledby="passenger-label"
          id={id}
          min={1}
          max={10}
          value={this.state.value}
          onChange={this.handleChange}
          decreaseButtonLabel="Remove passenger"
          increaseButtonLabel="Add passenger"
          buttonType={buttonType}
        />
      </div>
    );
  }
}

const options = ['economy', 'premium', 'business', 'first'];
const compareValues = (a: string, b: string): number => {
  const [aIndex, bIndex] = [options.indexOf(a), options.indexOf(b)];
  return aIndex - bIndex;
};

const incrementValue = (a: string): string => {
  const currentIndex = options.indexOf(a);
  const newIndex = currentIndex + 1;
  if (currentIndex === -1 || newIndex >= options.length) {
    return a;
  }
  return options[newIndex];
};

const decrementValue = (a: string): string => {
  const index = options.indexOf(a) - 1;
  if (index < 0) {
    return a;
  }
  return options[index];
};

const formatValue = (a: string): string => a.toString();

class ConfigurableNudgerContainer extends Component<{}, { value: string }> {
  constructor() {
    super();

    this.state = {
      value: 'premium',
    };
  }

  handleChange = (value: string) => {
    this.setState({ value });
  };

  render() {
    return (
      <div>
        <BpkLabel id="traveller-label" htmlFor="nudger">
          Traveller Class
        </BpkLabel>
        <BpkConfigurableNudger
          id="nudger"
          aria-labelledby="traveller-label"
          min="economy"
          max="first"
          value={this.state.value}
          onChange={this.handleChange}
          decreaseButtonLabel="Decrease"
          increaseButtonLabel="Increase"
          compareValues={compareValues}
          incrementValue={incrementValue}
          decrementValue={decrementValue}
          formatValue={formatValue}
          valueClassName={getClassName('bpk-nudger-configurable')}
        />
      </div>
    );
  }
}

const DefaultExample = () => (
  <BpkNudger
    id="my-nudger"
    min={1}
    max={99}
    value={3}
    onChange={action('change')}
    decreaseButtonLabel="Decrease"
    increaseButtonLabel="Increase"
  />
);

const WithLabelExample = () => (
  <BpkNudger
    id="my-nudger"
    min={1}
    max={99}
    value={3}
    onChange={action('change')}
    decreaseButtonLabel="Decrease"
    increaseButtonLabel="Increase"
    title="Adults"
    subtitle="Aged 16+"
    icon={<AlignedAccountIcon />}
  />
);

const LowerBoundExample = () => (
  <BpkNudger
    id="my-nudger"
    min={3}
    max={99}
    value={3}
    onChange={action('change')}
    decreaseButtonLabel="Decrease"
    increaseButtonLabel="Increase"
  />
);

const UpperBoundsExample = () => (
  <BpkNudger
    id="my-nudger"
    min={1}
    max={99}
    value={99}
    onChange={action('change')}
    decreaseButtonLabel="Decrease"
    increaseButtonLabel="Increase"
  />
);

const StatefulExample = () => (
  <NudgerContainer id="default-nudger" buttonType="secondary" />
);

const ConfigurableExample = () => <ConfigurableNudgerContainer />;

const OnDarkExample = () => (
  <BpkDarkExampleWrapper>
    <NudgerContainer id="on-dark-nudger" buttonType="secondaryOnDark" />
  </BpkDarkExampleWrapper>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <WithLabelExample />
    <ConfigurableExample />
    <OnDarkExample />
  </div>
);

export {
  DefaultExample,
  WithLabelExample,
  LowerBoundExample,
  UpperBoundsExample,
  StatefulExample,
  ConfigurableExample,
  OnDarkExample,
  MixedExample,
};
