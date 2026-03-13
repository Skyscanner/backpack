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

import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { BpkCheckboxCard, CHECKBOX_CARD_VARIANTS } from './BpkCheckboxCard';

describe('BpkCheckboxCard accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues', async () => {
    const { container } = render(
      <BpkCheckboxCard.Root
        checked={false}
        onCheckedChange={() => {}}
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
      >
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Select option</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when checked', async () => {
    const { container } = render(
      <BpkCheckboxCard.Root
        checked
        onCheckedChange={() => {}}
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
      >
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Selected option</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues when disabled', async () => {
    const { container } = render(
      <BpkCheckboxCard.Root
        checked={false}
        onCheckedChange={() => {}}
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
        disabled
      >
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Disabled option</BpkCheckboxCard.Label>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility issues with rich content', async () => {
    const { container } = render(
      <BpkCheckboxCard.Root
        checked={false}
        onCheckedChange={() => {}}
        variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
      >
        <BpkCheckboxCard.HiddenInput />
        <BpkCheckboxCard.Content>
          <BpkCheckboxCard.Label>Rich content</BpkCheckboxCard.Label>
          <BpkCheckboxCard.Description>Central location</BpkCheckboxCard.Description>
        </BpkCheckboxCard.Content>
      </BpkCheckboxCard.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
