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

// Edge case examples for BpkCheckboxCard
import { useState } from 'react';

import { BpkCheckboxCard, BpkCheckboxCardSimple } from '../../../packages/bpk-component-checkbox-card';
import { BpkVStack } from '../../../packages/bpk-component-layout';

export const ExtremelyLongText = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkVStack gap="bpk-spacing-md" align="center" width="100%">
          <BpkCheckboxCard.Label>
            This is an extremely long label that will definitely exceed the maximum line count and should be truncated with an ellipsis to prevent layout breaking
          </BpkCheckboxCard.Label>
          <BpkCheckboxCard.Description>
            This is also a very long description that goes on and on and on and should also be truncated after a certain number of lines to maintain a consistent card height
          </BpkCheckboxCard.Description>
          <span>£9,999</span>
        </BpkVStack>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  );
};

export const MissingLabel = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root
      checked={selected}
      onCheckedChange={setSelected}
      aria-label="Card with no visible label"
    >
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <span>£100</span>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  );
};

export const MissingPrice = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkVStack gap="bpk-spacing-sm" align="center" width="100%">
          <BpkCheckboxCard.Label>No price provided</BpkCheckboxCard.Label>
          <BpkCheckboxCard.Description>This card has no price information</BpkCheckboxCard.Description>
        </BpkVStack>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  );
};

export const OnlyLabel = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkCheckboxCard.Label>Minimal content</BpkCheckboxCard.Label>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  );
};

export const DisabledAndSelected = () => (
  <BpkCheckboxCardSimple
    checked
    onChange={() => {}}
    label="Disabled but selected"
    description="This card is selected but cannot be interacted with"
    price="£100"
    disabled
  />
);

export const SmallContainer = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ width: '200px' }}>
      <BpkCheckboxCardSimple
        checked={selected}
        onChange={setSelected}
        label="Narrow container"
        description="This card is in a small container"
        price="£100"
      />
    </div>
  );
};

export const VeryLargePrice = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCardSimple
      checked={selected}
      onChange={setSelected}
      label="Expensive option"
      description="This has a very large price"
      price="£99,999,999"
    />
  );
};
