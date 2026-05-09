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

import { BpkBox, BpkProvider, BpkSpacing } from '../../bpk-component-layout';

import BpkCollapsible from './BpkCollapsible';

describe('BpkCollapsible accessibility tests', () => {
  it('has no a11y violations when closed', async () => {
    const { container } = render(
      <BpkCollapsible.Root>
        <BpkCollapsible.Trigger>
          Toggle
          <BpkCollapsible.Indicator>v</BpkCollapsible.Indicator>
        </BpkCollapsible.Trigger>
        <BpkCollapsible.Content>Body</BpkCollapsible.Content>
      </BpkCollapsible.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no a11y violations when open', async () => {
    const { container } = render(
      <BpkCollapsible.Root defaultOpen>
        <BpkCollapsible.Trigger>
          Toggle
          <BpkCollapsible.Indicator>v</BpkCollapsible.Indicator>
        </BpkCollapsible.Trigger>
        <BpkCollapsible.Content>Body</BpkCollapsible.Content>
      </BpkCollapsible.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no a11y violations when disabled', async () => {
    const { container } = render(
      <BpkCollapsible.Root disabled>
        <BpkCollapsible.Trigger>Toggle</BpkCollapsible.Trigger>
        <BpkCollapsible.Content>Body</BpkCollapsible.Content>
      </BpkCollapsible.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no a11y violations in the onContrast variant', async () => {
    const { container } = render(
      <BpkProvider>
        <BpkBox backgroundColor="surface-contrast" padding={BpkSpacing.Base}>
          <BpkCollapsible.Root variant="onContrast" defaultOpen>
            <BpkCollapsible.Trigger>
              Toggle
              <BpkCollapsible.Indicator>v</BpkCollapsible.Indicator>
            </BpkCollapsible.Trigger>
            <BpkCollapsible.Content>Body</BpkCollapsible.Content>
          </BpkCollapsible.Root>
        </BpkBox>
      </BpkProvider>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
