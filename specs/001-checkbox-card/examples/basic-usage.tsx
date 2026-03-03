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

// Basic usage examples for BpkCheckboxCard
import { useState } from 'react';

import { BpkCheckboxCard, BpkCheckboxCardSimple } from '../../../packages/bpk-component-checkbox-card';

export const BasicUsage = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root
      checked={selected}
      onCheckedChange={setSelected}
    >
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkCheckboxCard.Stack gap="md" align="center">
          <BpkCheckboxCard.Label>Select this option</BpkCheckboxCard.Label>
          <BpkCheckboxCard.Price price="£100" />
        </BpkCheckboxCard.Stack>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  );
};

export const WithDescription = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root
      checked={selected}
      onCheckedChange={setSelected}
    >
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkCheckboxCard.Stack gap="md" align="center">
          <BpkCheckboxCard.Label>Premium option</BpkCheckboxCard.Label>
          <BpkCheckboxCard.Description>Includes breakfast and parking</BpkCheckboxCard.Description>
          <BpkCheckboxCard.Price price="£150" />
        </BpkCheckboxCard.Stack>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  );
};

export const UsingSimpleAPI = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCardSimple
      checked={selected}
      onChange={setSelected}
      label="Select this option"
      price="£100"
    />
  );
};

export const DisabledStates = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <BpkCheckboxCardSimple
      checked={false}
      onChange={() => {}}
      label="Disabled unselected"
      price="£100"
      disabled
    />
    <BpkCheckboxCardSimple
      checked
      onChange={() => {}}
      label="Disabled selected"
      price="£100"
      disabled
    />
  </div>
);
