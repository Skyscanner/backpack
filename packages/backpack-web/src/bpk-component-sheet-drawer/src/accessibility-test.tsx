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

import BpkSheetDrawer from './BpkSheetDrawer';

window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('BpkSheetDrawer accessibility tests', () => {
  it('has no accessibility violations when open', async () => {
    const { container } = render(
      <BpkSheetDrawer.Root open onOpenChange={jest.fn()}>
        <BpkSheetDrawer.Backdrop />
        <BpkSheetDrawer.Content>
          <BpkSheetDrawer.Grabber />
          <BpkSheetDrawer.Header>
            <BpkSheetDrawer.Title>Filters</BpkSheetDrawer.Title>
            <BpkSheetDrawer.CloseTrigger label="Close filters" />
          </BpkSheetDrawer.Header>
          <BpkSheetDrawer.Body>Drawer content</BpkSheetDrawer.Body>
        </BpkSheetDrawer.Content>
      </BpkSheetDrawer.Root>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations with description', async () => {
    const { container } = render(
      <BpkSheetDrawer.Root open onOpenChange={jest.fn()}>
        <BpkSheetDrawer.Content>
          <BpkSheetDrawer.Header>
            <BpkSheetDrawer.Title>Filters</BpkSheetDrawer.Title>
            <BpkSheetDrawer.CloseTrigger label="Close filters" />
          </BpkSheetDrawer.Header>
          <BpkSheetDrawer.Description>
            Filter flights by stops, time, and airline.
          </BpkSheetDrawer.Description>
          <BpkSheetDrawer.Body>Drawer content</BpkSheetDrawer.Body>
        </BpkSheetDrawer.Content>
      </BpkSheetDrawer.Root>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no accessibility violations as a side drawer', async () => {
    const { container } = render(
      <BpkSheetDrawer.Root
        open
        onOpenChange={jest.fn()}
        swipeDirection="end"
      >
        <BpkSheetDrawer.Backdrop />
        <BpkSheetDrawer.Content draggable={false}>
          <BpkSheetDrawer.Header>
            <BpkSheetDrawer.Title>Navigation</BpkSheetDrawer.Title>
            <BpkSheetDrawer.CloseTrigger label="Close navigation" />
          </BpkSheetDrawer.Header>
          <BpkSheetDrawer.Body>Navigation links</BpkSheetDrawer.Body>
        </BpkSheetDrawer.Content>
      </BpkSheetDrawer.Root>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});
