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

describe('BpkContextMenu accessibility tests', () => {
  it('should not have programmatically-detectable accessibility issues (closed)', async () => {
    const { container } = render(
      <BpkContextMenu.Root>
        <BpkContextMenu.Trigger aria-label="Save to trip">
          <span>♥</span>
        </BpkContextMenu.Trigger>
        <BpkContextMenu.Content>
          <BpkContextMenu.Item value="tokyo">Tokyo 2026</BpkContextMenu.Item>
        </BpkContextMenu.Content>
      </BpkContextMenu.Root>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have programmatically-detectable accessibility issues (open)', async () => {
    const { container } = render(
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
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
