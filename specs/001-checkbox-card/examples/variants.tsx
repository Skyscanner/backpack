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

// Variant examples for BpkCheckboxCard
import { useState } from 'react';

import { BpkCheckboxCard, CHECKBOX_CARD_VARIANTS } from '../../../packages/bpk-component-checkbox-card';

export const OnCanvasDefaultVariant = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root
      checked={selected}
      onCheckedChange={setSelected}
      variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
    >
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkCheckboxCard.Stack gap="md" align="center">
          <BpkCheckboxCard.Label>On canvas default</BpkCheckboxCard.Label>
          <BpkCheckboxCard.Description>Standard background</BpkCheckboxCard.Description>
          <BpkCheckboxCard.Price price="£100" />
        </BpkCheckboxCard.Stack>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  );
};

export const OnCanvasContrastVariant = () => {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root
      checked={selected}
      onCheckedChange={setSelected}
      variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
    >
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkCheckboxCard.Stack gap="md" align="center">
          <BpkCheckboxCard.Label>On canvas contrast</BpkCheckboxCard.Label>
          <BpkCheckboxCard.Description>Contrast background, border on hover</BpkCheckboxCard.Description>
          <BpkCheckboxCard.Price price="£85" />
        </BpkCheckboxCard.Stack>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  );
};

export const OnSurfaceContrastVariant = () => {
  const [selected, setSelected] = useState(false);

  return (
    <div style={{ background: '#05203C', padding: '24px' }}>
      <BpkCheckboxCard.Root
        checked={selected}
        onCheckedChange={setSelected}
        variant={CHECKBOX_CARD_VARIANTS.onSurfaceContrast}
      >
        <BpkCheckboxCard.Control />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Stack gap="md" align="center">
            <BpkCheckboxCard.Label>On surface contrast</BpkCheckboxCard.Label>
            <BpkCheckboxCard.Description>For use on dark backgrounds</BpkCheckboxCard.Description>
            <BpkCheckboxCard.Price price="£122" />
          </BpkCheckboxCard.Stack>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>
    </div>
  );
};

export const AllVariantsSelected = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <BpkCheckboxCard.Root checked onCheckedChange={() => {}} variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}>
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkCheckboxCard.Stack gap="md" align="center">
          <BpkCheckboxCard.Label>Selected — on canvas default</BpkCheckboxCard.Label>
          <BpkCheckboxCard.Price price="£100" />
        </BpkCheckboxCard.Stack>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
    <BpkCheckboxCard.Root checked onCheckedChange={() => {}} variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}>
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content>
        <BpkCheckboxCard.Stack gap="md" align="center">
          <BpkCheckboxCard.Label>Selected — on canvas contrast</BpkCheckboxCard.Label>
          <BpkCheckboxCard.Price price="£85" />
        </BpkCheckboxCard.Stack>
      </BpkCheckboxCard.Content>
    </BpkCheckboxCard.Root>
  </div>
);
