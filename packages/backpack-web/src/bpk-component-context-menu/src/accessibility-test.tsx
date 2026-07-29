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

import BpkContextMenu from './BpkContextMenu';
import { CONTEXT_MENU_ITEM_VARIANTS } from './common-types';

// When the menu opens, Ark/Zag initialises Floating UI's autoUpdate which
// subscribes a ResizeObserver to reposition the panel on size changes.
// JSDOM doesn't implement ResizeObserver, so any test that opens the menu
// throws "ReferenceError: ResizeObserver is not defined" before reaching
// its assertion. This no-op stub satisfies the API; no real repositioning
// is needed in tests.
global.ResizeObserver = class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
};

// axe config shared across all tests: disable the `region` rule because the
// portalled positioner appends to document.body outside any landmark, which is
// by design for a floating overlay and not a violation of the component's own
// accessibility contract.
const axeConfig = { rules: { region: { enabled: false } } };

describe('BpkContextMenu accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues (closed)', async () => {
    render(
      <BpkContextMenu.Root>
        <BpkContextMenu.Trigger aria-label="Save to trip">
          <span>♥</span>
        </BpkContextMenu.Trigger>
        <BpkContextMenu.Content>
          <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>,
    );
    // BpkContextMenuContent renders in a Portal appended to document.body,
    // so axe must scan document.body rather than the render container.
    const results = await axe(document.body, axeConfig);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues (open)', async () => {
    render(
      <BpkContextMenu.Root open>
        <BpkContextMenu.Trigger aria-label="Save to trip">
          <span>♥</span>
        </BpkContextMenu.Trigger>
        <BpkContextMenu.Content>
          <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
          <BpkContextMenu.Item value="christmas">
            Christmas shopping
          </BpkContextMenu.Item>
          <BpkContextMenu.Separator />
          <BpkContextMenu.Item value="new-trip">
            Plan a new trip
          </BpkContextMenu.Item>
          <BpkContextMenu.Item value="quick-save">
            Quick save
          </BpkContextMenu.Item>
          <BpkContextMenu.Separator />
          <BpkContextMenu.Item
            value="remove"
            variant={CONTEXT_MENU_ITEM_VARIANTS.destructive}
          >
            Remove
          </BpkContextMenu.Item>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>,
    );
    const results = await axe(document.body, axeConfig);
    expect(results).toHaveNoViolations();
  });
});

describe('BpkContextMenu.SaveTrigger accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues (closed)', async () => {
    render(
      <BpkContextMenu.Root>
        <BpkContextMenu.SaveTrigger aria-label="Save to trip" />
        <BpkContextMenu.Content>
          <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>,
    );
    const results = await axe(document.body, axeConfig);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues (open)', async () => {
    render(
      <BpkContextMenu.Root open>
        <BpkContextMenu.SaveTrigger aria-label="Save to trip" />
        <BpkContextMenu.Content>
          <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
          <BpkContextMenu.Item value="new-trip">Plan a new trip</BpkContextMenu.Item>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>,
    );
    const results = await axe(document.body, axeConfig);
    expect(results).toHaveNoViolations();
  });
});
