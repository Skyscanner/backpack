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

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';



import BpkButton, { BUTTON_TYPES } from '../../../bpk-component-button';
import { BpkBox, BpkProvider, BpkSpacing, BpkVStack, BpkHStack } from '../../../bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../../bpk-component-text';

import BpkComparisonTray from './BpkComparisonTray';

import type { BpkComparisonItem } from './common-types';
import type { Meta } from '@storybook/react';

const SAMPLE_ITEMS: BpkComparisonItem[] = [
  {
    id: 'vip-cars',
    label: 'VIP Cars',
    image: 'https://picsum.photos/seed/vipcars/120/60',
    imageAlt: 'VIP Cars',
  },
  {
    id: 'hertz',
    label: 'Hertz',
    image: 'https://picsum.photos/seed/hertz/120/60',
    imageAlt: 'Hertz',
  },
  {
    id: 'avis',
    label: 'Avis',
    image: 'https://picsum.photos/seed/avis/120/60',
    imageAlt: 'Avis',
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    image: 'https://picsum.photos/seed/enterprise/120/60',
    imageAlt: 'Enterprise',
  },
];

const InteractiveExample = () => {
  const [items, setItems] = useState<BpkComparisonItem[]>([]);
  const pendingFocusIndexRef = useRef<number | null>(null);

  const addItem = (newItem: BpkComparisonItem) => {
    if (items.length < 3 && !items.some((existing) => existing.id === newItem.id)) {
      setItems((prev) => [...prev, newItem]);
    }
  };

  const removeItem = (id: string) => {
    const removedIndex = items.findIndex((item) => item.id === id);
    const remaining = items.filter((item) => item.id !== id);

    if (remaining.length > 0) {
      pendingFocusIndexRef.current = removedIndex < remaining.length ? removedIndex : removedIndex - 1;
    }

    setItems(remaining);
  };

  useEffect(() => {
    if (pendingFocusIndexRef.current === null) return;

    const idx = pendingFocusIndexRef.current;
    pendingFocusIndexRef.current = null;

    const tray = document.querySelector('[data-backpack-ds-component="ComparisonTray"]');
    const removeButtons = tray?.querySelectorAll<HTMLButtonElement>(
      'button[aria-label^="Remove"]',
    );
    removeButtons?.[idx]?.focus();
  }, [items]);

  const handleCompare = () => {
    // eslint-disable-next-line no-alert
    alert(`Comparing: ${items.map((i) => i.label).join(', ')}`);
  };

  const isAdded = (id: string) => items.some((i) => i.id === id);
  const isFull = items.length >= 3;

  return (
    <BpkVStack gap={BpkSpacing.LG}>
        <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
          Click the buttons below to add cars to the tray. Add at least 2 to enable Compare.
        </BpkText>

        <BpkHStack gap={BpkSpacing.Base}>
          {SAMPLE_ITEMS.map((item) =>
            isAdded(item.id) ? (
              <BpkButton
                key={item.id}
                type={BUTTON_TYPES.destructive}
                onClick={() => removeItem(item.id)}
              >
                Remove {item.label}
              </BpkButton>
            ) : (
              <BpkButton
                key={item.id}
                type={BUTTON_TYPES.secondary}
                disabled={isFull}
                onClick={() => addItem(item)}
              >
                Add {item.label}
              </BpkButton>
            ),
          )}
        </BpkHStack>

        <BpkBox>
          {items.length > 0 && (
            <BpkComparisonTray.Root
              items={items}
              ariaLabel="Comparison tray"
              compareLabel="Compare"
              removeLabel="Remove"
              onRemove={removeItem}
              onCompare={handleCompare}
            />
          )}
        </BpkBox>
      </BpkVStack>
  );
};

const meta = {
  title: 'bpk-component-comparison-table/BpkComparisonTray',
  component: BpkComparisonTray.Root,
  decorators: [(story: () => ReactNode) => <BpkProvider>{story()}</BpkProvider>],
} satisfies Meta;

export default meta;

export const ComparisonTrayExample = {
  render: () => <InteractiveExample />,
};

export const VisualTest = {
  render: () => <InteractiveExample />,
};
