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
import BpkCardV2 from '../BpkCardV2';

describe('BpkCardV2 Snapshots', () => {
  it('matches snapshot - basic card', () => {
    const { container } = render(
      <BpkCardV2>
        <BpkCardV2.Header>Card Title</BpkCardV2.Header>
        <BpkCardV2.Body>Card content goes here</BpkCardV2.Body>
        <BpkCardV2.Footer>Card footer</BpkCardV2.Footer>
      </BpkCardV2>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - split layout', () => {
    const { container } = render(
      <BpkCardV2>
        <BpkCardV2.Body split splitRatio={70}>
          <BpkCardV2.Primary>Main content area (70%)</BpkCardV2.Primary>
          <BpkCardV2.Secondary>Sidebar area (30%)</BpkCardV2.Secondary>
        </BpkCardV2.Body>
      </BpkCardV2>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - outlined variant', () => {
    const { container } = render(
      <BpkCardV2 variant="outlined">
        <BpkCardV2.Header>Outlined Card</BpkCardV2.Header>
        <BpkCardV2.Body>Content with border instead of shadow</BpkCardV2.Body>
      </BpkCardV2>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - elevated surface color', () => {
    const { container } = render(
      <BpkCardV2 bgColor="surfaceElevated">
        <BpkCardV2.Body>Elevated background surface</BpkCardV2.Body>
      </BpkCardV2>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - complex layout with all sections', () => {
    const { container } = render(
      <BpkCardV2 variant="default" bgColor="surfaceDefault">
        <BpkCardV2.Header>Product</BpkCardV2.Header>
        <BpkCardV2.Body split splitRatio={65}>
          <BpkCardV2.Primary>
            <img src="product.jpg" alt="Product" />
          </BpkCardV2.Primary>
          <BpkCardV2.Secondary>
            <h3>Description</h3>
            <p>Product details</p>
          </BpkCardV2.Secondary>
        </BpkCardV2.Body>
        <BpkCardV2.Footer>
          <button>Add to cart</button>
        </BpkCardV2.Footer>
      </BpkCardV2>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - with custom classes', () => {
    const { container } = render(
      <BpkCardV2 className="custom-card">
        <BpkCardV2.Header className="custom-header">Custom Header</BpkCardV2.Header>
        <BpkCardV2.Body className="custom-body">Custom body</BpkCardV2.Body>
      </BpkCardV2>,
    );

    expect(container).toMatchSnapshot();
  });

  it('matches snapshot - minimal card (body only)', () => {
    const { container } = render(
      <BpkCardV2>
        <BpkCardV2.Body>Minimal card with just body</BpkCardV2.Body>
      </BpkCardV2>,
    );

    expect(container).toMatchSnapshot();
  });
});
