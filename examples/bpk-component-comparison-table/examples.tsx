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

import { useState } from 'react';

import BpkButton, { BUTTON_TYPES } from '../../packages/bpk-component-button';
import ComparisonTray from '../../packages/bpk-component-comparison-table';
import { BpkSpacing, BpkVStack, BpkHStack } from '../../packages/bpk-component-layout';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';

import type { ComparisonItem } from '../../packages/bpk-component-comparison-table';

const SAMPLE_ITEMS: ComparisonItem[] = [
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
  const [items, setItems] = useState<ComparisonItem[]>([]);

  const addItem = (item: ComparisonItem) => {
    if (items.length < 3 && !items.some((i) => i.id === item.id)) {
      setItems((prev) => [...prev, item]);
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCompare = () => {
    // eslint-disable-next-line no-alert
    alert(`Comparing: ${items.map((i) => i.label).join(', ')}`);
  };

  const isAdded = (id: string) => items.some((i) => i.id === id);
  const isFull = items.length >= 3;

  return (
    <BpkVStack spacing={BpkSpacing.Lg}>
      <BpkText tagName="p" textStyle={TEXT_STYLES.bodyDefault}>
        Click the buttons below to add cars to the tray. Add at least 2 to enable Compare.
      </BpkText>

      <BpkHStack spacing={BpkSpacing.Base}>
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

      {items.length > 0 && (
        <ComparisonTray.Root
          items={items}
          onRemove={removeItem}
          onCompare={handleCompare}
        />
      )}
    </BpkVStack>
  );
};

export default InteractiveExample;
export { InteractiveExample };
