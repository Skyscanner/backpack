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
import BpkNudger from '../../packages/bpk-component-nudger';
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
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

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
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
        // @ts-expect-error TS(2322): Type '{ children: string; id: string; htmlFor: str... Remove this comment to see the full error message
        // @ts-expect-error TS(2322) FIXME: Type '{ children: string; id: string; htmlFor: str... Remove this comment to see the full error message
        <BpkLabel id="passenger-label" htmlFor={id} className={labelClassName}>
          Number of passengers
        </BpkLabel>
        <BpkNudger
          aria-labelledby="passenger-label"
          id={id}
          min={0}
          max={10}
          value={this.state.value}
          onValueChange={this.handleChange}
          decreaseButtonLabel="Remove passenger"
          increaseButtonLabel="Add passenger"
          // @ts-expect-error TS(2322) FIXME: Type 'string' is not assignable to type '"secondar... Remove this comment to see the full error message
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

export {
  DefaultExample,
  WithLabelExample,
  LowerBoundExample,
  UpperBoundsExample,
  StatefulExample,
  OnDarkExample,
  MixedExample,
};
