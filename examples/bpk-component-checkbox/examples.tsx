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

import { Component, useState } from 'react';
import type { ComponentProps } from 'react';

import BpkCheckbox, { themeAttributes } from '../../packages/bpk-component-checkbox';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkThemeProvider from '../../packages/bpk-theming';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action, BpkDarkExampleWrapper } from '../bpk-storybook-utils';

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem dolores doloremque, expedita
quaerat temporibus ipsam, ut, ipsa, velit sed assumenda suscipit dolore quod similique delectus numquam neque!
Nesciunt, voluptate, illo.`;

type CheckboxProps = ComponentProps<typeof BpkCheckbox>;

type Props = CheckboxProps & {
  isChecked?: boolean;
};

type State = {
  isChecked: boolean;
};

class StatefulCheckbox extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isChecked: props.isChecked ?? false,
    };
  }

  handleChange = () => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));
    action(`Checkbox changed. Checked is now '${this.state.isChecked}'`);
  };

  render() {
    const { isChecked: _ignored, ...rest } = this.props;
    return (
      <div style={{ padding: '.25rem' }}>
        <BpkCheckbox
          checked={this.state.isChecked}
          onChange={this.handleChange}
          {...rest}
        />
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
    required
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

// Composable API examples
const ComposableBasicExample = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ padding: '.25rem' }}>
      <BpkCheckbox
        name="composable"
        checked={checked}
        onChange={() => setChecked(!checked)}
      >
        <BpkCheckbox.Control>
          <BpkCheckbox.Indicator />
        </BpkCheckbox.Control>
        <BpkCheckbox.Label>Composable checkbox</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox>
    </div>
  );
};

const ComposableWithDescriptionExample = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ padding: '.25rem' }}>
      <BpkCheckbox
        name="composable-desc"
        checked={checked}
        onChange={() => setChecked(!checked)}
      >
        <BpkCheckbox.Control>
          <BpkCheckbox.Indicator />
        </BpkCheckbox.Control>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <BpkCheckbox.Label>Enable notifications</BpkCheckbox.Label>
          <span style={{ fontSize: '0.875rem' }}>
            Get updates about your bookings and trips
          </span>
        </div>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox>
    </div>
  );
};

const ComposableCustomLayoutExample = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div style={{ padding: '.25rem' }}>
      <BpkCheckbox
        name="composable-card"
        checked={checked}
        onChange={() => setChecked(!checked)}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'start',
            gap: '0.75rem',
            padding: '1rem',
            border: checked ? '2px solid #0062e3' : '1px solid #ddd',
            borderRadius: '0.5rem',
            backgroundColor: checked ? '#f0f7ff' : 'white',
          }}
        >
          <BpkCheckbox.Control>
            <BpkCheckbox.Indicator />
          </BpkCheckbox.Control>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <BpkCheckbox.Label>Premium seat</BpkCheckbox.Label>
            <span style={{ fontSize: '0.875rem' }}>
              Extra legroom and priority boarding
            </span>
            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>+$49.99</span>
          </div>
        </div>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox>
    </div>
  );
};

const ThemedComposableExample = () => {
  const [checked, setChecked] = useState(true);

  return (
    <BpkThemeProvider
      theme={{
        checkboxCheckedColor: '#ff0000',
      }}
      themeAttributes={themeAttributes}
    >
      <div style={{ padding: '.25rem' }}>
        <BpkCheckbox
          name="themed"
          checked={checked}
          onChange={() => setChecked(!checked)}
        >
          <BpkCheckbox.Control>
            <BpkCheckbox.Indicator />
          </BpkCheckbox.Control>
          <BpkCheckbox.Label>Themed checkbox (red)</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox>
      </div>
    </BpkThemeProvider>
  );
};

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
  ComposableBasicExample,
  ComposableWithDescriptionExample,
  ComposableCustomLayoutExample,
  ThemedComposableExample,
};
