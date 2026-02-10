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

import { useState } from 'react';

import BpkCheckbox from '../../packages/bpk-component-checkbox-v2';
import { BpkVStack, BpkSpacing } from '../../packages/bpk-component-layout';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { BpkDarkExampleWrapper } from '../bpk-storybook-utils';

import type { CheckedState } from '../../packages/bpk-component-checkbox-v2';

const DefaultExample = () => {
  const [checked1, setChecked1] = useState<CheckedState>(true);
  const [checked2, setChecked2] = useState<CheckedState>(false);
  return (
    <BpkVStack gap={BpkSpacing.SM} align="flex-start">
      <BpkCheckbox.Root
        name="abisko"
        checked={checked1}
        onCheckedChange={(details) => setChecked1(details.checked)}
      >
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Abisko</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>
      <BpkCheckbox.Root
        name="bunol"
        checked={checked2}
        onCheckedChange={(details) => setChecked2(details.checked)}
      >
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Buñol</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>
    </BpkVStack>
  );
};

const RichContentExample = () => {
  const [checked, setChecked] = useState<CheckedState>(false);
  return (
    <BpkCheckbox.Root
      name="rich"
      checked={checked}
      onCheckedChange={(details) => setChecked(details.checked)}
    >
      <BpkCheckbox.Control />
      <BpkCheckbox.Content>
        <BpkCheckbox.Label>Marketing emails</BpkCheckbox.Label>
        {/* eslint-disable-next-line backpack/use-tokens */}
        <p style={{ margin: 0, fontSize: '14px', color: '#626971' }}>
          We will send you offers and updates.{' '}
          <a href="https://skyscanner.net" target="_blank" rel="noreferrer">
            Privacy policy
          </a>
        </p>
      </BpkCheckbox.Content>
      <BpkCheckbox.HiddenInput />
    </BpkCheckbox.Root>
  );
};

const IndeterminateExample = () => {
  const [childChecked, setChildChecked] = useState([true, false]);
  const allChecked = childChecked.every(Boolean);
  const someChecked = childChecked.some(Boolean) && !allChecked;

  const parentChecked: CheckedState = someChecked
    ? 'indeterminate'
    : allChecked;

  return (
    <BpkVStack gap={BpkSpacing.SM} align="flex-start">
      <BpkCheckbox.Root
        name="places"
        checked={parentChecked}
        onCheckedChange={() => {
          setChildChecked(allChecked ? [false, false] : [true, true]);
        }}
      >
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Places</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>
      <BpkVStack gap={BpkSpacing.SM} align="flex-start" marginStart={BpkSpacing.LG}>
        <BpkCheckbox.Root
          name="abisko"
          checked={childChecked[0]}
          onCheckedChange={() =>
            setChildChecked([!childChecked[0], childChecked[1]])
          }
        >
          <BpkCheckbox.Control />
          <BpkCheckbox.Label>Abisko</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox.Root>
        <BpkCheckbox.Root
          name="bunol"
          checked={childChecked[1]}
          onCheckedChange={() =>
            setChildChecked([childChecked[0], !childChecked[1]])
          }
        >
          <BpkCheckbox.Control />
          <BpkCheckbox.Label>Buñol</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox.Root>
      </BpkVStack>
    </BpkVStack>
  );
};

const InvalidExample = () => {
  const [checked1, setChecked1] = useState<CheckedState>(true);
  const [checked2, setChecked2] = useState<CheckedState>(false);
  return (
    <BpkVStack gap={BpkSpacing.SM} align="flex-start">
      <BpkCheckbox.Root
        name="abisko"
        checked={checked1}
        onCheckedChange={(details) => setChecked1(details.checked)}
        invalid
      >
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Abisko</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>
      <BpkCheckbox.Root
        name="bunol"
        checked={checked2}
        onCheckedChange={(details) => setChecked2(details.checked)}
        invalid
      >
        <BpkCheckbox.Control />
        <BpkCheckbox.Label>Buñol</BpkCheckbox.Label>
        <BpkCheckbox.HiddenInput />
      </BpkCheckbox.Root>
    </BpkVStack>
  );
};

const DisabledExample = () => (
  <BpkVStack gap={BpkSpacing.SM} align="flex-start">
    <BpkCheckbox.Root name="abisko" checked disabled>
      <BpkCheckbox.Control />
      <BpkCheckbox.Label>Abisko</BpkCheckbox.Label>
      <BpkCheckbox.HiddenInput />
    </BpkCheckbox.Root>
    <BpkCheckbox.Root name="bunol" disabled>
      <BpkCheckbox.Control />
      <BpkCheckbox.Label>Buñol</BpkCheckbox.Label>
      <BpkCheckbox.HiddenInput />
    </BpkCheckbox.Root>
  </BpkVStack>
);

const RequiredExample = () => {
  const [checked, setChecked] = useState<CheckedState>(true);
  return (
    <BpkCheckbox.Root
      name="required"
      checked={checked}
      onCheckedChange={(details) => setChecked(details.checked)}
      required
    >
      <BpkCheckbox.Control />
      <BpkCheckbox.Label>Backpack is the best design system</BpkCheckbox.Label>
      <BpkCheckbox.HiddenInput />
    </BpkCheckbox.Root>
  );
};

const WhiteExample = () => {
  const [checked1, setChecked1] = useState<CheckedState>(true);
  const [checked2, setChecked2] = useState<CheckedState>(false);
  const [checked3, setChecked3] = useState<CheckedState>(false);
  return (
    <BpkDarkExampleWrapper>
      <BpkVStack gap={BpkSpacing.SM} align="flex-start">
        <BpkCheckbox.Root
          name="abisko"
          checked={checked1}
          onCheckedChange={(details) => setChecked1(details.checked)}
          white
        >
          <BpkCheckbox.Control />
          <BpkCheckbox.Label>Abisko</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox.Root>
        <BpkCheckbox.Root
          name="bunol"
          checked={checked2}
          onCheckedChange={(details) => setChecked2(details.checked)}
          white
        >
          <BpkCheckbox.Control />
          <BpkCheckbox.Label>Buñol</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox.Root>
        <BpkCheckbox.Root
          name="error"
          checked={checked3}
          onCheckedChange={(details) => setChecked3(details.checked)}
          white
          invalid
        >
          <BpkCheckbox.Control />
          <BpkCheckbox.Label>Error</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox.Root>
        <BpkCheckbox.Root name="indeterminate" checked="indeterminate" white>
          <BpkCheckbox.Control />
          <BpkCheckbox.Label>Indeterminate</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox.Root>
        <BpkCheckbox.Root name="places" white disabled>
          <BpkCheckbox.Control />
          <BpkCheckbox.Label>Places</BpkCheckbox.Label>
          <BpkCheckbox.HiddenInput />
        </BpkCheckbox.Root>
      </BpkVStack>
    </BpkDarkExampleWrapper>
  );
};

const GroupExample = () => {
  const [value, setValue] = useState(['react']);
  return (
    <BpkCheckbox.Group
      name="framework"
      value={value}
      onValueChange={setValue}
    >
      <BpkVStack gap={BpkSpacing.SM} align="flex-start">
        {[
          { label: 'React', value: 'react' },
          { label: 'Solid', value: 'solid' },
          { label: 'Vue', value: 'vue' },
        ].map((item) => (
          <BpkCheckbox.Root key={item.value} value={item.value}>
            <BpkCheckbox.Control />
            <BpkCheckbox.Label>{item.label}</BpkCheckbox.Label>
            <BpkCheckbox.HiddenInput />
          </BpkCheckbox.Root>
        ))}
      </BpkVStack>
    </BpkCheckbox.Group>
  );
};

const MixedExample = () => (
  <BpkVStack gap={BpkSpacing.Base} align="flex-start">
    <DefaultExample />
    <IndeterminateExample />
    <InvalidExample />
    <DisabledExample />
    <WhiteExample />
    <RequiredExample />
  </BpkVStack>
);

export {
  DefaultExample,
  RichContentExample,
  IndeterminateExample,
  InvalidExample,
  DisabledExample,
  RequiredExample,
  WhiteExample,
  GroupExample,
  MixedExample,
};
