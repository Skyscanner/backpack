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

import BpkModalV3 from './BpkModalV3';

// ResizeObserver mock required for Ark UI / Zag.js
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('BpkModalV3 accessibility tests', () => {
  it('should not have accessibility issues with default variant open', async () => {
    const { container } = render(
      <BpkModalV3.Root open onOpenChange={jest.fn()}>
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>Default modal title</BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <p>Modal content</p>
        </BpkModalV3.Content>
      </BpkModalV3.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues with sheet variant open', async () => {
    const { container } = render(
      <BpkModalV3.Root open onOpenChange={jest.fn()} type="sheet">
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>Sheet modal title</BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <p>Sheet content</p>
        </BpkModalV3.Content>
      </BpkModalV3.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues with full variant open', async () => {
    const { container } = render(
      <BpkModalV3.Root open onOpenChange={jest.fn()} type="full">
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>Full modal title</BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <p>Full screen content</p>
        </BpkModalV3.Content>
      </BpkModalV3.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues with chatbot variant open', async () => {
    const { container } = render(
      <BpkModalV3.Root open onOpenChange={jest.fn()} type="chatbot">
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>Chatbot modal title</BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <p>Chatbot content</p>
        </BpkModalV3.Content>
      </BpkModalV3.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues with Title and Description', async () => {
    const { container } = render(
      <BpkModalV3.Root open onOpenChange={jest.fn()}>
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>Modal with description</BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Description>
            This modal has an accessible description providing additional
            context.
          </BpkModalV3.Description>
          <p>Content below description</p>
        </BpkModalV3.Content>
      </BpkModalV3.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues with default CloseTrigger', async () => {
    const { container } = render(
      <BpkModalV3.Root open onOpenChange={jest.fn()}>
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>Modal title</BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close modal" />
          </BpkModalV3.Header>
          <p>Content</p>
        </BpkModalV3.Content>
      </BpkModalV3.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should not have accessibility issues with onImage CloseTrigger', async () => {
    const { container } = render(
      <BpkModalV3.Root open onOpenChange={jest.fn()}>
        <BpkModalV3.Content>
          <BpkModalV3.Title>Modal title</BpkModalV3.Title>
          <BpkModalV3.CloseTrigger label="Close modal" onImage />
          <p>Content with image overlay close button</p>
        </BpkModalV3.Content>
      </BpkModalV3.Root>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
