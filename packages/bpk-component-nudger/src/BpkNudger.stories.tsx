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

import { Component } from 'react';

import { iconSizeLg, lineHeightBase } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action, BpkDarkExampleWrapper } from '../../../examples/bpk-storybook-utils';
import { withAlignment } from '../../bpk-component-icon';
import AccountIcon from '../../bpk-component-icon/lg/account';
import BpkLabel from '../../bpk-component-label';
import { cssModules } from '../../bpk-react-utils';

import BpkNudger from './BpkNudger';

import type { BUTTON_TYPES } from './common-types';
import type { Meta } from '@storybook/react';

import STYLES from './BpkNudger.stories.module.scss';

const getClassName = cssModules(STYLES);

const AlignedAccountIcon = withAlignment(AccountIcon, lineHeightBase, iconSizeLg);

class NudgerContainer extends Component<
  { id: string, buttonType: keyof typeof BUTTON_TYPES },
  { value: number }
> {
  constructor(props: { id: string, buttonType: keyof typeof BUTTON_TYPES }) {
    super(props);

    this.state = {
      value: 0,
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
        <div className={labelClassName}>
          <BpkLabel id="passenger-label" htmlFor={id}>
            Number of passengers
          </BpkLabel>
        </div>
        <BpkNudger
          aria-labelledby="passenger-label"
          id={id}
          min={0}
          max={10}
          value={this.state.value}
          onValueChange={this.handleChange}
          decreaseButtonLabel="Remove passenger"
          increaseButtonLabel="Add passenger"
          buttonType={buttonType}
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
    onValueChange={action('change')}
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
    onValueChange={action('change')}
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
    onValueChange={action('change')}
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
    onValueChange={action('change')}
    decreaseButtonLabel="Decrease"
    increaseButtonLabel="Increase"
  />
);

const StatefulExample = () => (
  <NudgerContainer id="default-nudger" buttonType="secondary" />
);


const OnDarkExample = () => (
  <BpkDarkExampleWrapper>
    <NudgerContainer id="on-dark-nudger" buttonType="secondaryOnDark" />
  </BpkDarkExampleWrapper>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <WithLabelExample />
    <OnDarkExample />
  </div>
);

const meta = {
  title: 'bpk-component-nudger',
  component: BpkNudger,
} satisfies Meta;

export default meta;

export const Default = {
  render: () => <DefaultExample />,
};

export const WithLabel = {
  render: () => <WithLabelExample />,
};

export const LowerBounds = {
  render: () => <LowerBoundExample />,
};

export const UpperBounds = {
  render: () => <UpperBoundsExample />,
};

export const Stateful = {
  render: () => <StatefulExample />,
};

export const OnDarkNudger = {
  render: () => <OnDarkExample />,
};

export const VisualTest = {
  render: () => <MixedExample />,
};

export const VisualTestWithZoom = {
  render: () => <MixedExample />,
  args: {
    zoomEnabled: true,
  },
};
