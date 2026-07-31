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

import BpkDrawerV2 from './BpkDrawerV2';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('BpkDrawerV2 accessibility tests', () => {
  it('has no accessibility violations when open', async () => {
    const { container } = render(
      <BpkDrawerV2.Root open onOpenChange={jest.fn()}>
        <BpkDrawerV2.Backdrop />
        <BpkDrawerV2.Content>
          <BpkDrawerV2.Grabber />
          <BpkDrawerV2.Header>
            <BpkDrawerV2.Title>Filters</BpkDrawerV2.Title>
            <BpkDrawerV2.CloseTrigger label="Close filters" />
          </BpkDrawerV2.Header>
          <BpkDrawerV2.Body>Drawer content</BpkDrawerV2.Body>
        </BpkDrawerV2.Content>
      </BpkDrawerV2.Root>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations with description', async () => {
    const { container } = render(
      <BpkDrawerV2.Root open onOpenChange={jest.fn()}>
        <BpkDrawerV2.Content>
          <BpkDrawerV2.Header>
            <BpkDrawerV2.Title>Filters</BpkDrawerV2.Title>
            <BpkDrawerV2.CloseTrigger label="Close filters" />
          </BpkDrawerV2.Header>
          <BpkDrawerV2.Description>
            Filter flights by stops, time, and airline.
          </BpkDrawerV2.Description>
          <BpkDrawerV2.Body>Drawer content</BpkDrawerV2.Body>
        </BpkDrawerV2.Content>
      </BpkDrawerV2.Root>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations as a side drawer', async () => {
    const { container } = render(
      <BpkDrawerV2.Root
        open
        onOpenChange={jest.fn()}
        swipeDirection="end"
      >
        <BpkDrawerV2.Backdrop />
        <BpkDrawerV2.Content draggable={false}>
          <BpkDrawerV2.Header>
            <BpkDrawerV2.Title>Navigation</BpkDrawerV2.Title>
            <BpkDrawerV2.CloseTrigger label="Close navigation" />
          </BpkDrawerV2.Header>
          <BpkDrawerV2.Body>Navigation links</BpkDrawerV2.Body>
        </BpkDrawerV2.Content>
      </BpkDrawerV2.Root>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
