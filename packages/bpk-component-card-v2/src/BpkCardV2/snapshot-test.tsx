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

import type { ReactElement } from 'react';

import { render } from '@testing-library/react';

import { BpkProvider } from '../../../bpk-component-layout';

import BpkCardV2 from './BpkCardV2';

const renderWithProvider = (ui: ReactElement) =>
  render(<BpkProvider>{ui}</BpkProvider>);

describe('BpkCardV2 Snapshots', () => {
  it('matches snapshot - basic card', () => {
    const { container } = renderWithProvider(
      <BpkCardV2.Root>
        <BpkCardV2.Header>Card Title</BpkCardV2.Header>
        <BpkCardV2.Body>Card content goes here</BpkCardV2.Body>
        <BpkCardV2.Footer>Card footer</BpkCardV2.Footer>
      </BpkCardV2.Root>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - multi-column layout with divider', () => {
    const { container } = renderWithProvider(
      <BpkCardV2.Root>
        <BpkCardV2.Body templateColumns="7fr auto 3fr">
          <BpkCardV2.Section>Main content area (70%)</BpkCardV2.Section>
          <BpkCardV2.Divider />
          <BpkCardV2.Section>Sidebar area (30%)</BpkCardV2.Section>
        </BpkCardV2.Body>
      </BpkCardV2.Root>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - three-column layout', () => {
    const { container } = renderWithProvider(
      <BpkCardV2.Root>
        <BpkCardV2.Body templateColumns="1fr auto 2fr auto 1fr">
          <BpkCardV2.Section>Left</BpkCardV2.Section>
          <BpkCardV2.Divider />
          <BpkCardV2.Section>Center</BpkCardV2.Section>
          <BpkCardV2.Divider />
          <BpkCardV2.Section>Right</BpkCardV2.Section>
        </BpkCardV2.Body>
      </BpkCardV2.Root>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - outlined variant', () => {
    const { container } = renderWithProvider(
      <BpkCardV2.Root variant="outlined">
        <BpkCardV2.Header>Outlined Card</BpkCardV2.Header>
        <BpkCardV2.Body>Content with border instead of shadow</BpkCardV2.Body>
      </BpkCardV2.Root>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - elevated surface color', () => {
    const { container } = renderWithProvider(
      <BpkCardV2.Root bgColor="surfaceElevated">
        <BpkCardV2.Body>Elevated background surface</BpkCardV2.Body>
      </BpkCardV2.Root>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - complex layout with all sections', () => {
    const { container } = renderWithProvider(
      <BpkCardV2.Root variant="default" bgColor="surfaceDefault">
        <BpkCardV2.Header>Product</BpkCardV2.Header>
        <BpkCardV2.Body templateColumns="65fr auto 35fr">
          <BpkCardV2.Section>
            <img src="product.jpg" alt="Product" />
          </BpkCardV2.Section>
          <BpkCardV2.Divider />
          <BpkCardV2.Section>
            <h3>Description</h3>
            <p>Product details</p>
          </BpkCardV2.Section>
        </BpkCardV2.Body>
        <BpkCardV2.Footer>
          <button type="button">Add to cart</button>
        </BpkCardV2.Footer>
      </BpkCardV2.Root>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - minimal card (body only)', () => {
    const { container } = renderWithProvider(
      <BpkCardV2.Root>
        <BpkCardV2.Body>Minimal card with just body</BpkCardV2.Body>
      </BpkCardV2.Root>,
    );

    expect(container).toMatchSnapshot();
  });
});
