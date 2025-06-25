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

import BpkCheckbox from '../../packages/bpk-component-checkbox';
import {
  action,
  BpkDarkExampleWrapper,
// @ts-expect-error Could not find a declaration file for module '../bpk-storybook-utils'.
} from '../bpk-storybook-utils';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem dolores doloremque, expedita
quaerat temporibus ipsam, ut, ipsa, velit sed assumenda suscipit dolore quod similique delectus numquam neque!
Nesciunt, voluptate, illo.`;

type Props = {
  isChecked: boolean,
  id: string,
  name: string,
  label: string,
  indeterminate?: boolean,
  valid?: boolean,
  required?: boolean,
  smallLabel?: boolean,
  isRequired?: boolean,
  white?: boolean,
  disabled?: boolean,
  onChange?: () => void,
};

type State = {
  isChecked: boolean,
};

class StatefulCheckbox extends Component<Props, State> {
  static defaultProps = {
    isChecked: false,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isChecked: props.isChecked,
    };
  }

  handleChange = () => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));
    // $FlowFixMe[incompatible-type] - ignoring as purely for storybook
    action(`Checkbox changed. Checked is now '${this.state.isChecked}'`);
  };

  render() {
    return (
      <div style={{ padding: '.25rem' }}>
        <BpkCheckbox
          className={undefined} checked={this.state.isChecked}
          onChange={this.handleChange}
          {...this.props}        />
      </div>
    );
  }
}

const DefaultExample = () => (
  <div>
    <StatefulCheckbox id="abisko" name="abisko" label="Abisko" isChecked />
    <StatefulCheckbox id="bunol" name="bunol" label="Buñol" />
  </div>
);

const IndeterminateExample = () => (
  <div>
    <StatefulCheckbox id="places" name="places" label="Places" indeterminate />
    <div style={{ marginLeft: '.25rem' }}>
      <StatefulCheckbox id="abisko" name="abisko" label="Abisko" isChecked />
      <StatefulCheckbox id="bunol" name="bunol" label="Buñol" />
    </div>
  </div>
);

const InvalidExample = () => (
  <div>
    <StatefulCheckbox
      id="abisko"
      name="abisko"
      label="Abisko"
      isChecked
      valid={false}
    />
    <StatefulCheckbox id="bunol" name="bunol" label="Buñol" valid={false} />
  </div>
);

const MultilineExample = () => (
  <StatefulCheckbox id="abisko" name="abisko" label={loremIpsum} isChecked />
);

const RequiredExample = () => (
  <StatefulCheckbox
    id="required"
    name="required"
    label="Backpack is the best design system"
    isChecked
    required
  />
);

const SmallLabelExample = () => (
  <StatefulCheckbox id="abisko" name="abisko" label="Abisko" smallLabel />
);

const SmallLabelRequiredExample = () => (
  <StatefulCheckbox
    id="abisko"
    name="abisko"
    label="Backpack is the best design system"
    smallLabel
    isRequired
  />
);

const SmallLabelInvalidExample = () => (
  <StatefulCheckbox
    id="abisko"
    name="abisko"
    label="Buñol"
    smallLabel
    valid={false}
  />
);

const WhiteExample = () => (
  <BpkDarkExampleWrapper>
    <StatefulCheckbox
      id="abisko"
      name="abisko"
      label="Abisko"
      isChecked
      white
    />
    <StatefulCheckbox id="bunol" name="bunol" label="Buñol" white />
    <StatefulCheckbox id="places" name="places" label="Places" white disabled />
  </BpkDarkExampleWrapper>
);

const DisabledExample = () => (
  <div>
    <StatefulCheckbox
      id="abisko"
      name="abisko"
      label="Abisko"
      isChecked
      disabled
    />
    <StatefulCheckbox id="bunol" name="bunol" label="Buñol" disabled />
  </div>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <IndeterminateExample />
    <InvalidExample />
    <MultilineExample />
    <DisabledExample />
    <WhiteExample />
    <RequiredExample />
    <SmallLabelExample />
    <SmallLabelRequiredExample />
    <SmallLabelInvalidExample />
  </div>
);

export {
  DefaultExample,
  IndeterminateExample,
  InvalidExample,
  MultilineExample,
  WhiteExample,
  DisabledExample,
  RequiredExample,
  SmallLabelExample,
  SmallLabelRequiredExample,
  SmallLabelInvalidExample,
  MixedExample,
};
